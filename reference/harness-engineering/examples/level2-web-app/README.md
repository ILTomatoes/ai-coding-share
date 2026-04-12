# Level 2: Web 应用项目 - Harness 工程示例

这是 Harness 工程进阶级示例项目，展示了如何在 Web 应用项目中应用分层架构和分层文档。

## 项目特点

- ✅ 分层文档结构（全局 + 后端 + 前端）
- ✅ 架构文档（ARCHITECTURE.md）
- ✅ 后端分层架构（API → Service → Repository → Model）
- ✅ 前端组件分类（通用组件 + 业务组件）
- ✅ 依赖规则检查
- ✅ CI/CD 配置示例

## 项目结构

```
level2-web-app/
├── CLAUDE.md                 # 全局入口指南
├── docs/
│   ├── ARCHITECTURE.md       # 架构总览
│   └── API.md               # API 设计规范
├── backend/                  # 后端代码
│   ├── CLAUDE.md            # 后端开发指南
│   ├── src/
│   │   ├── api/            # API 路由层
│   │   ├── services/       # 业务逻辑层
│   │   ├── repositories/   # 数据访问层
│   │   ├── models/         # 数据模型层
│   │   └── schemas/        # Pydantic 模型
│   └── tests/
├── frontend/                 # 前端代码
│   ├── CLAUDE.md            # 前端开发指南
│   ├── src/
│   │   ├── api/            # API 调用
│   │   ├── components/     # 组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── pages/          # 页面
│   │   └── stores/         # 状态管理
│   └── tests/
└── .github/
    └── workflows/          # CI/CD 配置
```

## Harness 工程要点

### 1. 分层文档结构

不同于 Level 1 的单文件，Level 2 使用分层文档：

```
CLAUDE.md (全局入口，约 50 行)
    ↓
docs/ARCHITECTURE.md (架构总览)
    ↓
backend/CLAUDE.md (后端具体规则)
frontend/CLAUDE.md (前端具体规则)
```

**为什么分层？**
- 信息分层，AI 按需读取
- 避免单文件过大导致上下文拥挤
- 各模块规则独立，互不干扰

### 2. 后端分层架构

```
HTTP Request
    ↓
API Layer (路由、验证)
    ↓
Service Layer (业务逻辑)
    ↓
Repository Layer (数据库操作)
    ↓
Model Layer (数据模型)
```

**分层的好处**：
- 职责清晰，易于测试
- 可以 Mock 下层，独立测试上层
- AI 知道代码应该放在哪一层

### 3. 依赖规则检查

使用工具强制执行架构约束：

```bash
# 检查 API 是否直接调用 Repository
dependency-cruiser backend/src/

# 检查是否有循环依赖
madge --circular backend/src/
```

## 给 Claude 的示例指令

### 添加新功能

**场景**：添加"任务分类"功能

**指令**：
> "帮我在项目中添加任务分类功能：
> 1. 后端：创建 Category 模型、Repository、Service 和 API
> 2. 前端：创建分类选择组件，在任务创建/编辑时使用
> 3. 遵循现有的分层架构"

**预期 Claude 的行为**：
1. 阅读 `docs/ARCHITECTURE.md` 了解架构
2. 阅读 `backend/CLAUDE.md` 了解后端规范
3. 阅读 `frontend/CLAUDE.md` 了解前端规范
4. 按分层顺序实现：Model → Repository → Service → API → Frontend

### 修复 Bug

**场景**：任务删除后，前端列表没有更新

**指令**：
> "修复任务删除后列表不刷新的问题。检查 React Query 的缓存失效逻辑。"

**预期 Claude 的行为**：
1. 定位到 `frontend/src/hooks/useTasks.ts`
2. 检查 `useDeleteTask` hook 的 `onSuccess` 回调
3. 确保调用了 `queryClient.invalidateQueries`

## 学习要点

通过这个示例，你可以学习到：

1. **如何设计分层文档**
   - 全局文档作为入口
   - 架构文档描述整体设计
   - 模块文档描述具体规则

2. **如何实现分层架构**
   - 后端四层架构
   - 前端组件分类
   - 依赖方向控制

3. **如何添加架构约束**
   - 使用 dependency-cruiser
   - CI 中运行架构检查
   - 代码审查清单

4. **如何扩展功能**
   - 按分层顺序开发
   - 每层独立测试
   - 集成测试验证

## 下一步

掌握了这个 Level 2 示例后，可以查看：
- `level3-fullstack/`: 全栈项目（多 Agent 架构、自动化反馈循环）

## 参考

- [FastAPI 最佳实践](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [React 架构模式](https://react.dev/learn/thinking-in-react)
- [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser)
