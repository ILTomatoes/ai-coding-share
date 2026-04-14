# 后端开发指南

## 技术栈
- **框架**: FastAPI
- **ORM**: SQLAlchemy 2.0
- **数据库**: PostgreSQL
- **迁移**: Alembic
- **测试**: pytest

## 项目结构
```
backend/
├── src/
│   ├── __init__.py
│   ├── main.py              # FastAPI 应用入口
│   ├── config.py            # 配置管理
│   ├── database.py          # 数据库连接
│   ├── dependencies.py      # 依赖注入
│   ├── models/              # SQLAlchemy 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/             # Pydantic 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── repositories/        # 数据访问层
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   └── task.py
│   ├── services/            # 业务逻辑层
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   └── task.py
│   └── api/                 # API 路由层
│       ├── __init__.py
│       ├── deps.py          # 路由依赖
│       ├── v1/
│       │   ├── __init__.py
│       │   ├── router.py    # v1 路由聚合
│       │   ├── users.py
│       │   └── tasks.py
│       └── router.py        # 全局路由聚合
├── tests/
│   ├── conftest.py          # pytest 配置
│   ├── test_api/            # API 测试
│   ├── test_services/       # 服务层测试
│   └── test_repositories/   # 仓库层测试
├── alembic/                 # 数据库迁移
├── requirements.txt
└── pyproject.toml
```

## 开发规则

### 1. 分层规则（重要）

**必须遵守的依赖方向**:
```
api/ → services/ → repositories/ → models/
```

- **API 层** (`api/`): 只处理 HTTP 相关逻辑（路由、请求/响应验证）
- **Service 层** (`services/`): 实现业务逻辑，协调多个 Repository
- **Repository 层** (`repositories/`): 封装数据库操作，一个模型对应一个 Repository
- **Model 层** (`models/`): 定义数据库模型

**禁止**:
- ❌ API 直接调用 Repository
- ❌ Repository 调用 Service
- ❌ 跨层调用

### 2. 添加新功能的步骤

以"添加用户任务统计功能"为例：

**Step 1**: 定义 Schema（`schemas/task.py`）
```python
class TaskStats(BaseModel):
    total: int
    completed: int
    pending: int
```

**Step 2**: 更新 Repository（`repositories/task.py`）
```python
async def get_stats_by_user(self, user_id: int) -> dict:
    # 实现统计查询
    ...
```

**Step 3**: 实现 Service（`services/task.py`）
```python
async def get_user_task_stats(self, user_id: int) -> TaskStats:
    stats = await self.task_repo.get_stats_by_user(user_id)
    return TaskStats(**stats)
```

**Step 4**: 添加 API 路由（`api/v1/tasks.py`）
```python
@router.get("/stats", response_model=TaskStats)
async def get_task_stats(
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service),
):
    return await task_service.get_user_task_stats(current_user.id)
```

**Step 5**: 写测试
- Repository 测试：测试数据库查询
- Service 测试：测试业务逻辑（mock repository）
- API 测试：测试端点（mock service）

### 3. 代码规范

**模型定义**:
```python
class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
```

**Schema 定义**:
```python
# 请求 Schema
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

# 响应 Schema
class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True
```

**Repository 模式**:
```python
class UserRepository(BaseRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, User)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.session.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
```

**Service 模式**:
```python
class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo
    
    async def create_user(self, data: UserCreate) -> User:
        # 检查邮箱是否已存在
        if await self.user_repo.get_by_email(data.email):
            raise ValueError("Email already registered")
        
        # 创建用户
        return await self.user_repo.create({...})
```

### 4. 错误处理

使用 HTTPException 返回标准错误：

```python
from fastapi import HTTPException, status

# 404 错误
raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="User not found"
)

# 400 错误
raise HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Invalid input data"
)

# 401 错误
raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid credentials",
    headers={"WWW-Authenticate": "Bearer"},
)
```

### 5. 数据库迁移

创建迁移：
```bash
alembic revision --autogenerate -m "add user table"
```

应用迁移：
```bash
alembic upgrade head
```

回滚迁移：
```bash
alembic downgrade -1
```

## 测试

### 运行测试

```bash
# 运行所有测试
pytest

# 运行特定模块
pytest tests/test_api/

# 带覆盖率报告
pytest --cov=src --cov-report=html
```

### 测试结构

```python
# tests/test_services/test_user.py
import pytest
from unittest.mock import AsyncMock

class TestUserService:
    @pytest.fixture
    def user_repo(self):
        return AsyncMock()
    
    @pytest.fixture
    def user_service(self, user_repo):
        return UserService(user_repo)
    
    async def test_create_user_success(self, user_service, user_repo):
        # Arrange
        user_repo.get_by_email.return_value = None
        user_repo.create.return_value = User(id=1, email="test@example.com")
        
        # Act
        result = await user_service.create_user(
            UserCreate(email="test@example.com", password="password123")
        )
        
        # Assert
        assert result.email == "test@example.com"
        user_repo.create.assert_called_once()
```

## 常用命令

```bash
# 安装依赖
pip install -r requirements.txt

# 启动开发服务器
uvicorn src.main:app --reload

# 运行测试
pytest

# 类型检查
mypy src/

# 代码格式化
black src/ tests/
isort src/ tests/

# 代码检查
ruff check src/ tests/
```
