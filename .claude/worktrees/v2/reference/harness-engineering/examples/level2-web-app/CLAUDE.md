# Web 应用项目 - 全局指南

## 项目概述
这是一个全栈 Web 应用项目，使用前后端分离架构。

## 技术栈
- **后端**: FastAPI + SQLAlchemy + PostgreSQL
- **前端**: React + TypeScript + Vite
- **数据库迁移**: Alembic

## 项目结构
```
.
├── CLAUDE.md              # 本文件（全局入口）
├── docs/                  # 架构文档
│   ├── ARCHITECTURE.md    # 架构总览
│   └── API.md            # API 设计规范
├── backend/               # 后端代码
│   └── CLAUDE.md         # 后端开发指南
├── frontend/              # 前端代码
│   └── CLAUDE.md         # 前端开发指南
└── .github/
    └── workflows/        # CI/CD 配置
```

## 快速开始

### 启动后端
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

### 启动前端
```bash
cd frontend
npm install
npm run dev
```

## 开发工作流
1. 阅读 `docs/ARCHITECTURE.md` 了解整体架构
2. 后端开发参考 `backend/CLAUDE.md`
3. 前端开发参考 `frontend/CLAUDE.md`
4. 提交前确保通过 CI 检查

## 架构原则
1. **前后端分离**: 通过 REST API 通信
2. **依赖分层**: 后端代码分层清晰（API → Service → Repository）
3. **类型安全**: 前后端都使用 TypeScript/Python 类型注解
4. **自动化测试**: 所有功能必须有测试覆盖
