# 架构设计文档

## 整体架构

```
┌─────────────────┐      HTTP/REST       ┌─────────────────┐
│                 │ ◄──────────────────► │                 │
│     前端        │                      │      后端       │
│   (React)       │                      │   (FastAPI)     │
│                 │                      │                 │
└─────────────────┘                      └────────┬────────┘
                                                  │
                                                  │ SQL
                                                  ▼
                                         ┌─────────────────┐
                                         │   PostgreSQL    │
                                         └─────────────────┘
```

## 后端架构

### 分层设计

```
┌─────────────────────────────────────┐
│           API Layer                 │  ← 路由定义、请求验证
│      (FastAPI Routers)              │
├─────────────────────────────────────┤
│         Service Layer               │  ← 业务逻辑
│      (Business Logic)               │
├─────────────────────────────────────┤
│        Repository Layer             │  ← 数据访问
│      (Database Operations)          │
├─────────────────────────────────────┤
│         Model Layer                 │  ← 数据模型
│    (SQLAlchemy Models)              │
└─────────────────────────────────────┘
```

### 依赖规则

- **API Layer** 可以调用 Service Layer
- **Service Layer** 可以调用 Repository Layer
- **Repository Layer** 可以操作 Model Layer
- **不允许反向依赖**
- **不允许跨层调用**（如 API 直接调用 Repository）

### 数据流向

```
HTTP Request
    ↓
API Router (验证输入)
    ↓
Service (业务逻辑)
    ↓
Repository (数据库操作)
    ↓
Database
    ↓
Repository
    ↓
Service
    ↓
API Router (序列化输出)
    ↓
HTTP Response
```

## 前端架构

### 目录结构

```
frontend/src/
├── api/           # API 调用封装
├── components/    # 可复用组件
│   ├── common/   # 通用组件
│   └── domain/   # 业务组件
├── hooks/         # 自定义 React Hooks
├── pages/         # 页面组件
├── stores/        # 状态管理
├── types/         # TypeScript 类型定义
└── utils/         # 工具函数
```

### 组件分类

1. **通用组件** (`components/common/`)
   - 与业务无关
   - 可复用性高
   - 例子：Button, Input, Modal

2. **业务组件** (`components/domain/`)
   - 与业务相关
   - 特定领域使用
   - 例子：UserCard, TaskList

3. **页面组件** (`pages/`)
   - 对应路由
   - 组合其他组件
   - 例子：HomePage, UserProfilePage

## API 设计规范

### RESTful 原则

- 使用名词复数形式：`/users`, `/tasks`
- 使用 HTTP 方法表示操作：
  - `GET` - 获取资源
  - `POST` - 创建资源
  - `PUT` - 更新资源（完整）
  - `PATCH` - 更新资源（部分）
  - `DELETE` - 删除资源

### URL 结构

```
/api/v1/users           # 用户列表
/api/v1/users/{id}      # 特定用户
/api/v1/users/{id}/tasks # 用户的任务
```

### 响应格式

成功响应：
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

错误响应：
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数错误",
    "details": [
      { "field": "email", "message": "无效的邮箱格式" }
    ]
  }
}
```

## 数据库设计

### 命名规范

- 表名：小写，复数形式，下划线分隔（如 `users`, `task_items`）
- 列名：小写，下划线分隔（如 `created_at`, `user_id`）
- 主键：`id`
- 外键：`<表名>_id`（如 `user_id`）
- 时间戳：`created_at`, `updated_at`

### 示例表结构

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 安全考虑

1. **认证**: JWT Token
2. **授权**: 基于角色的访问控制
3. **输入验证**: Pydantic 模型验证
4. **SQL 注入防护**: 使用 SQLAlchemy ORM
5. **XSS 防护**: 前端转义输出
6. **CSRF 防护**: 使用 SameSite Cookie

## 性能考虑

1. **数据库**: 适当添加索引
2. **API**: 实现分页
3. **前端**: 懒加载、代码分割
4. **缓存**: Redis 缓存热点数据
