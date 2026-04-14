# Harness Engineering 完全指南：让 AI 编码助手真正为你所用

> **目标读者**：刚开始接触 AI 编码助手（如 Claude Code、Cursor、GitHub Copilot）的开发者  
> **阅读时间**：约 30 分钟  
> **收获**：理解 Harness 工程的本质，并能在自己的项目中逐步落地

---

## 目录

1. [什么是 Harness 工程（从第一性原理讲起）](#第一部分什么是-harness-工程从第一性原理讲起)
2. [Harness 工程的三大支柱](#第二部分harness-工程的三大支柱)
3. [在 Claude Code 中落地 Harness 工程](#第三部分在-claude-code-中落地-harness-工程)
4. [头部厂商的落地思路](#第四部分头部厂商的落地思路)
5. [常见陷阱和解决方案](#第五部分常见陷阱和解决方案)
6. [快速开始清单](#第六部分快速开始清单)

---

## 第一部分：什么是 Harness 工程（从第一性原理讲起）

### 1.1 为什么叫"Harness"（马具）？

想象一下这个场景：

你有一匹千里马——它跑得飞快，力气很大，能驮着很重的东西跑很远。但问题是，这匹马不知道你要去哪里。如果你让它自己跑，它可能会跑到草原吃草，可能会跑回马厩，甚至可能把你甩下来。

**Harness（马具）** 就是解决这个问题的东西——缰绳、马鞍、马镫。它们不增加马的力量，但能让马的力量用在对的方向上。

在 AI 编程的世界里：
- **马** = AI 模型（Claude、GPT-4、Codex 等）
- **Harness** = 你设计的约束、文档、反馈机制
- **骑手** = 你（人类工程师）

AI 模型非常强大，能写代码、改 bug、重构项目。但它不知道你的项目要做什么、应该遵循什么规则、什么是"好"的代码。**Harness 工程就是设计一套系统，让 AI 在正确的轨道上工作。**

### 1.2 传统编程 vs Harness 工程

让我们用一个表格来对比：

| 维度 | 传统编程 | Harness 工程 |
|------|---------|-------------|
| **人类做什么** | 写代码、调试、测试 | 设计环境、制定规则、提供反馈 |
| **AI 做什么** | 辅助补全、偶尔建议 | 写绝大部分代码 |
| **出错时怎么办** | 人类 debug | 改进 Harness，让 AI 下次不再犯 |
| **核心技能** | 算法、数据结构、框架 | 系统设计、规则制定、反馈架构 |

**关键转变**：工程师从"代码作者"变成了"系统设计师"。

这不是说人类不写代码了，而是说人类的注意力从"怎么实现这个功能"转移到了"如何让 AI 可靠地实现这类功能"。

### 1.3 Harness 工程要解决的核心问题

AI 编码助手有几个"天性"问题：

#### 问题 1：AI 会"自信地胡说"

AI 会生成看起来对但实际上错的代码。它不会告诉你"我不确定"，而是会自信地给出一个答案。

**例子**：
- 你说："给这个函数加个参数"
- AI 改了函数定义，但忘了改调用这个函数的所有地方
- 结果：代码跑不起来

#### 问题 2：AI 会偏离轨道

AI 做着做着就忘了最初的目标，开始优化一些不重要的东西，或者引入不必要的复杂度。

**例子**：
- 你说："修复这个 bug"
- AI 修复了 bug，但顺手重构了三个不相关的模块
- 结果：引入了新的 bug

#### 问题 3：上下文有限

AI 一次能"记住"的东西是有限的（上下文窗口）。当项目变大时，它会忘记早期的决策和约束。

**例子**：
- 项目开始时你说过："所有数据库操作必须用事务"
- 50 轮对话后，AI 生成了没有事务保护的代码
- 结果：数据不一致

#### 问题 4：人类注意力成为瓶颈

当 AI 能一小时生成 1000 行代码时，人类不可能逐行审查。如果每行都要人看，那 AI 带来的效率提升就被抵消了。

**Harness 工程的核心目标**：
1. **约束**：让 AI 在正确的边界内工作
2. **告知**：让 AI 随时知道该做什么
3. **验证**：自动检查 AI 的输出是否正确
4. **纠正**：当 AI 走错时，能自动或半自动地拉回来

---

## 第二部分：Harness 工程的三大支柱

根据 OpenAI、Anthropic 等公司的实践，Harness 工程可以归纳为三大支柱：

### 2.1 上下文工程（Context Engineering）

#### 什么是上下文工程？

AI 模型就像一个在考试的学生——它只能根据试卷上的信息答题。如果试卷上没写公式，它就用不了；如果题目描述不清楚，它就可能答错。

**上下文工程就是：确保 AI 在任何时候都能看到它需要的信息。**

#### 为什么这很重要？

有一个反直觉的事实：**AI 只能知道它在上下文中能看到的东西。**

- 你的 Slack 讨论？AI 看不到。
- 你的 Google Docs 文档？AI 看不到。
- 你脑子里的设计思路？AI 看不到。
- 甚至你 10 分钟前在对话里说的话？AI 可能已经"忘记"了。

**所以规则是：任何你想让 AI 遵守的东西，必须放在它能访问到的地方。**

#### AGENTS.md / CLAUDE.md：你的项目说明书

这是 Harness 工程中最简单也最有效的工具。

**AGENTS.md**（或 CLAUDE.md，取决于你用的工具）是一个放在项目根目录的 Markdown 文件。AI 编码助手会在开始工作时自动读取它。

**它应该包含什么？**

```markdown
# 项目指南

## 构建与测试
- 构建命令：`npm run build`
- 测试命令：`npm test`
- 类型检查：`npm run typecheck`

## 项目结构
- `/src/components` - React 组件
- `/src/utils` - 工具函数
- `/src/api` - API 调用

## 代码规范
- 使用 TypeScript
- 组件用 PascalCase（如 UserProfile）
- 函数用 camelCase（如 fetchUserData）
- 所有 API 调用必须处理错误

## 安全注意事项
- 不要把 API key 硬编码
- 用户输入必须验证
```

**关键原则：渐进式信息披露**

不要写一个 500 行的 AGENTS.md。AI 的注意力也是有限的，信息太多等于没有信息。

正确做法：
1. AGENTS.md 是一个"目录"，告诉 AI 去哪里找详细信息
2. 每个子目录可以有自己的 AGENTS.md，覆盖局部规则
3. 保持简洁，只放最重要的、全局适用的规则

**OpenAI 的实践**：
- 他们在项目中放了 88 个 AGENTS.md 文件
- 根目录的是"总览"，每个子系统有自己的详细规则
- 这样 AI 只需要看相关的部分，不会被无关信息干扰

#### 知识库的组织方式

一个典型的 Harness 工程知识库结构：

```
项目根目录/
├── AGENTS.md                 # 入口文件（100 行以内）
├── docs/
│   ├── ARCHITECTURE.md       # 架构总览
│   ├── DESIGN.md             # 设计规范
│   ├── SECURITY.md           # 安全规范
│   └── api/
│       └── openapi.yaml      # API 文档
├── src/
│   ├── AGENTS.md             # 源代码相关规则
│   ├── components/
│   │   └── AGENTS.md         # 组件开发规范
│   └── utils/
│       └── AGENTS.md         # 工具函数规范
└── tests/
    └── AGENTS.md             # 测试规范
```

### 2.2 架构约束（Architectural Constraints）

#### 为什么约束让 AI 更自由？

这听起来很矛盾，但确实是这样的：

- **没有约束时**：AI 可能生成任何代码，它要不断猜测"这样对吗？"，浪费很多精力在探索错误路径上
- **有约束时**：AI 知道边界在哪里，可以专注于在边界内找到最好的解决方案

**类比**：
- 没有约束 = 让你在一张白纸上画一幅画，你可能会纠结画什么、从哪里开始
- 有约束 = 让你在给定的线稿上涂色，你可以专注于怎么涂得更好

#### 如何设置架构约束？

**1. 依赖分层**

规定代码的依赖方向。例如：

```
类型定义 → 配置 → 数据层 → 业务逻辑 → UI 层
```

规则：每一层只能依赖它左边的层，不能反向依赖。

**实现方式**：
- 用工具（如 dependency-cruiser）自动检查
- 在 CI 中运行检查，违反就报错
- AI 看到报错后会自己修复

**2. 代码规范（Linting）**

不要指望 AI 记住你的代码风格。用工具强制执行：

- **ESLint / Prettier**（JavaScript/TypeScript）
- **Ruff / Black**（Python）
- **gofmt**（Go）
- **rustfmt**（Rust）

**关键**：这些检查要在 AI 提交代码前自动运行。

**3. 类型系统**

类型系统是最好的约束。一个设计良好的类型系统能让 AI 在写代码时就知道什么是对的。

**例子**：
```typescript
// 不好的设计
function process(data: any): any

// 好的设计
interface UserInput {
  email: string;
  age: number;
}

interface ProcessingResult {
  isValid: boolean;
  errors?: string[];
}

function process(data: UserInput): ProcessingResult
```

好的类型定义让 AI 一眼就知道该怎么用这个函数。

#### 机械性检查 vs 人工检查

| 检查类型 | 例子 | 谁来执行 |
|---------|------|---------|
| 机械性检查 | 格式、类型、依赖规则 | 自动化工具 |
| 人工检查 | 设计是否合理、用户体验 | 人类 |

**原则**：
- 能自动化的检查一定要自动化
- 人类只审查机器检查不了的东西
- 这样人类才能跟上 AI 的产出速度

### 2.3 熵管理（Entropy Management）

#### 什么是代码库的"熵"？

熵是物理学概念，指的是系统的混乱程度。代码库也会积累"熵"：

- **文档漂移**：文档说这样做，但代码已经不这样做了
- **命名不一致**：有的地方叫 `userId`，有的地方叫 `user_id`，有的地方叫 `uid`
- **死代码**：没人用的函数、变量、文件
- **重复代码**：同样的逻辑在多个地方实现
- **过时的依赖**：引用了新版本中已废弃的功能

#### 为什么 AI 会加剧熵的积累？

AI 不会"记得"你早期的决策。每次对话都是新的开始（或接近开始）。如果早期的约束没有被持续强制执行，AI 会逐渐偏离。

**例子**：
- 第 1 天：你告诉 AI "所有函数都要有文档字符串"
- 第 10 天：AI 生成了没有文档字符串的函数
- 第 30 天：项目里有的函数有文档，有的没有

#### 熵管理的策略

**1. 定期清理 Agent**

设置定时任务，让 AI 检查和修复：

- 文档是否与代码一致
- 是否有未使用的导入/变量
- 命名是否符合规范
- 依赖是否需要更新

**2. 一致性检查**

用工具自动检查一致性：

```bash
# 检查命名规范
npm run lint:naming

# 检查文档覆盖率
npm run lint:docs

# 检查重复代码
npm run lint:duplicates
```

**3. 版本化的约束**

把你的 Harness 也当作代码来管理：

- AGENTS.md 放在版本控制里
- 约束规则的变更要经过审查
- 可以回滚到之前的 Harness 版本

---

## 第三部分：在 Claude Code 中落地 Harness 工程

现在让我们进入实战。我会带你从最简单的开始，逐步建立一个完整的 Harness。

### 3.1 起步阶段（Level 1）：单文件项目

**场景**：你有一个简单的 Python 脚本项目，想用 Claude Code 来维护。

#### 步骤 1：创建 CLAUDE.md

在项目根目录创建 `CLAUDE.md`：

```markdown
# 项目指南

## 基本信息
- 语言：Python 3.11+
- 项目类型：命令行工具

## 常用命令
- 运行：`python main.py`
- 测试：`python -m pytest tests/`
- 类型检查：`mypy src/`
- 格式化：`black src/ tests/`

## 代码规范
- 使用类型注解
- 函数必须有 docstring
- 变量用 snake_case（如 user_name）
- 类用 PascalCase（如 UserManager）

## 项目结构
- `src/` - 源代码
- `tests/` - 测试文件
- `requirements.txt` - 依赖

## 重要规则
- 所有用户输入必须验证
- 不要硬编码敏感信息
- 捕获异常时记录日志
```

**为什么这样写？**
- 简洁明了，Claude 一眼能看完
- 包含最常用的命令，不用每次都解释
- 规则具体，没有模糊空间

#### 步骤 2：建立项目结构

```
my-project/
├── CLAUDE.md
├── requirements.txt
├── src/
│   ├── __init__.py
│   └── main.py
└── tests/
    ├── __init__.py
    └── test_main.py
```

#### 步骤 3：添加基础工具配置

**requirements.txt**：
```
pytest>=7.0.0
mypy>=1.0.0
black>=23.0.0
```

**pyproject.toml**（Python 项目配置）：
```toml
[tool.black]
line-length = 88
target-version = ['py311']

[tool.mypy]
python_version = "3.11"
strict = true
warn_return_any = true
warn_unused_configs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
```

#### 步骤 4：实战示例

假设你要创建一个"任务管理器"CLI 工具。

**你对 Claude 说**：
> "帮我创建一个简单的任务管理器，可以添加任务、列出任务、标记完成。数据存在 JSON 文件里。"

**有了 CLAUDE.md 后，Claude 会**：
1. 自动在 `src/` 下创建文件
2. 使用类型注解
3. 写 docstring
4. 处理文件不存在的情况
5. 验证用户输入

**如果没有 CLAUDE.md，Claude 可能会**：
1. 把代码直接放在根目录
2. 不写类型注解
3. 不写 docstring
4. 忘记处理边界情况

#### Level 1 检查清单

- [ ] 创建了 CLAUDE.md
- [ ] 定义了常用命令
- [ ] 建立了项目结构
- [ ] 配置了自动化工具（lint、format、test）
- [ ] 至少有一个测试文件

---

### 3.2 进阶阶段（Level 2）：Web 应用项目

**场景**：你有一个 Web 应用，有前端、后端、数据库，多个模块。

#### 核心问题

当项目变大时，一个 CLAUDE.md 就不够用了：
- 信息太多，Claude 看不过来
- 不同模块有不同的规则
- 需要更严格的架构约束

#### 解决方案：分层文档结构

```
my-web-app/
├── CLAUDE.md                 # 全局入口
├── docs/
│   ├── ARCHITECTURE.md       # 架构总览
│   ├── API.md               # API 设计规范
│   └── DATABASE.md          # 数据库规范
├── backend/
│   ├── CLAUDE.md            # 后端特定规则
│   ├── src/
│   └── tests/
├── frontend/
│   ├── CLAUDE.md            # 前端特定规则
│   ├── src/
│   └── tests/
└── shared/
    └── CLAUDE.md            # 共享代码规则
```

#### 各文件内容示例

**根目录 CLAUDE.md**：
```markdown
# My Web App - 项目指南

## 项目结构
这是一个全栈 Web 应用：
- `/backend` - FastAPI 后端
- `/frontend` - React 前端
- `/shared` - 共享类型定义

## 快速开始
1. 后端：`cd backend && pip install -r requirements.txt && uvicorn main:app`
2. 前端：`cd frontend && npm install && npm start`

## 架构原则
- 前后端通过 REST API 通信
- 共享类型定义放在 `/shared`
- 数据库迁移用 Alembic

## 详细文档
- 架构设计：见 `docs/ARCHITECTURE.md`
- API 规范：见 `docs/API.md`
- 后端细节：见 `backend/CLAUDE.md`
- 前端细节：见 `frontend/CLAUDE.md`
```

**backend/CLAUDE.md**：
```markdown
# 后端开发指南

## 技术栈
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic（迁移）

## 代码组织
```
src/
├── api/           # 路由定义
├── models/        # 数据库模型
├── schemas/       # Pydantic 模型
├── services/      # 业务逻辑
├── core/          # 配置、数据库连接
└── tests/         # 测试
```

## 开发规则
1. 所有路由必须在 `api/` 目录
2. 数据库模型必须在 `models/` 目录
3. 业务逻辑必须在 `services/` 目录，不能直接操作数据库
4. 所有 API 响应必须用 Pydantic 模型
5. 所有数据库操作必须用事务

## 添加新功能的步骤
1. 定义 Pydantic schema
2. 创建/更新数据库模型
3. 实现 service 层逻辑
4. 添加 API 路由
5. 写测试
```

**frontend/CLAUDE.md**：
```markdown
# 前端开发指南

## 技术栈
- React 18
- TypeScript
- Tailwind CSS
- React Query

## 代码组织
```
src/
├── components/    # 可复用组件
├── pages/         # 页面组件
├── hooks/         # 自定义 hooks
├── api/           # API 调用
├── types/         # 类型定义
└── utils/         # 工具函数
```

## 组件规范
- 组件文件用 PascalCase（如 UserCard.tsx）
- 每个组件一个文件
- 必须用 TypeScript 接口定义 props
- 复杂逻辑抽成 custom hook

## API 调用规范
- 所有 API 调用放在 `api/` 目录
- 用 React Query 处理数据获取
- 必须处理 loading 和 error 状态
```

#### 添加架构约束检查

**依赖检查**（backend/.dependency-cruiser.js）：
```javascript
module.exports = {
  forbidden: [
    {
      name: 'no-api-to-api',
      comment: 'API 层不能互相调用',
      from: { path: '^src/api' },
      to: { path: '^src/api', pathNot: '^src/api/index' }
    },
    {
      name: 'services-only-from-api',
      comment: '只有 API 层可以调用 services',
      from: { path: '^(?!src/api)', pathNot: '^src/services' },
      to: { path: '^src/services' }
    }
  ]
};
```

**GitHub Actions 工作流**（.github/workflows/ci.yml）：
```yaml
name: CI

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run type check
        run: cd backend && mypy src/
      - name: Run tests
        run: cd backend && pytest
      - name: Check dependencies
        run: cd backend && npx dependency-cruiser src/

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Run type check
        run: cd frontend && npx tsc --noEmit
      - name: Run linter
        run: cd frontend && npm run lint
      - name: Run tests
        run: cd frontend && npm test
```

#### Level 2 检查清单

- [ ] 分层 AGENTS.md/CLAUDE.md 结构
- [ ] 每个模块有自己的开发指南
- [ ] 架构文档（ARCHITECTURE.md）
- [ ] 自动化 CI 检查
- [ ] 依赖规则检查
- [ ] 代码审查清单

---

### 3.3 高级阶段（Level 3）：复杂全栈项目

**场景**：大型项目，需要多个 Agent 协作，长时运行任务，自动化反馈循环。

#### 核心思想：多 Agent 架构

Anthropic 的研究表明，让一个 Agent 又做又评，效果不如分开：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Planner   │────▶│  Generator  │────▶│  Evaluator  │
│  (规划师)    │     │   (生成器)   │     │   (评估器)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                                │
                      ┌─────────────────────────┘
                      ▼
               ┌─────────────┐
               │   反馈循环   │
               └─────────────┘
```

**各 Agent 职责**：
- **Planner**：理解需求，分解任务，制定计划
- **Generator**：根据计划写代码
- **Evaluator**：检查代码质量，给出改进建议

#### 实战：实现一个多 Agent Harness

**项目结构**：
```
my-large-project/
├── .claude/                    # Claude Code 配置
│   ├── agents/                 # Agent 定义
│   │   ├── planner.md
│   │   ├── generator.md
│   │   └── evaluator.md
│   └── skills/                 # 可复用技能
│       ├── create-api-endpoint/
│       ├── add-database-model/
│       └── write-tests/
├── CLAUDE.md
├── docs/
├── backend/
├── frontend/
└── scripts/                    # 自动化脚本
    ├── pre-commit-check.sh
    ├── run-evaluator.py
    └── entropy-cleanup.py
```

**Agent 定义示例**（.claude/agents/planner.md）：
```markdown
# Planner Agent

你是项目规划师。你的任务是把产品需求分解成可执行的技术任务。

## 工作流程
1. 阅读产品需求文档
2. 分析需要修改的代码模块
3. 制定执行计划，包括：
   - 任务列表
   - 依赖关系
   - 验收标准
4. 输出到 `plans/current-task.md`

## 输出格式
```markdown
# 任务计划

## 目标
[一句话描述目标]

## 任务列表
- [ ] 任务 1：...
- [ ] 任务 2：...

## 依赖关系
任务 2 依赖任务 1

## 验收标准
- [ ] 标准 1
- [ ] 标准 2

## 相关文件
- `src/models/user.py`
- `src/api/auth.py`
```

## 规则
- 每个任务必须可以在 30 分钟内完成
- 必须明确指定需要修改的文件
- 必须包含验收标准
```

**Generator Agent**（.claude/agents/generator.md）：
```markdown
# Generator Agent

你是代码生成器。你的任务是按照计划实现功能。

## 工作流程
1. 阅读 `plans/current-task.md`
2. 实现当前任务
3. 运行测试确保通过
4. 自我检查：
   - 是否符合项目规范？
   - 是否有类型注解？
   - 是否处理了错误？
5. 标记任务完成
6. 如果还有任务，继续下一个；否则通知 Evaluator

## 编码规范
[引用项目规范]

## 工具使用
- 用 `grep_code` 搜索相关代码
- 用 `read_file` 阅读文件
- 用 `search_replace` 修改代码
- 用 `run_in_terminal` 运行测试
```

**Evaluator Agent**（.claude/agents/evaluator.md）：
```markdown
# Evaluator Agent

你是代码评估器。你的任务是严格检查代码质量。

## 评估维度
1. **正确性**：代码是否实现了需求？
2. **规范性**：是否符合项目规范？
3. **健壮性**：是否处理了边界情况？
4. **可测试性**：是否容易测试？

## 评估流程
1. 阅读实现代码
2. 阅读相关测试
3. 运行测试套件
4. 检查规范符合度
5. 输出评估报告到 `evals/current-task.md`

## 评分标准
- 4 分：优秀，可以直接合并
- 3 分：良好，有小问题需要修复
- 2 分：及格，需要明显改进
- 1 分：不及格，需要重写

## 输出格式
```markdown
# 评估报告

## 总体评分：[分数]/4

## 各维度评分
- 正确性：[分数]
- 规范性：[分数]
- 健壮性：[分数]
- 可测试性：[分数]

## 问题列表
1. [问题描述] - [建议修复方式]

## 改进建议
[具体建议]

## 是否通过：[是/否]
```

## 重要原则
- 要严格，不要宽容
- 具体问题要引用代码位置
- 建议要可操作
```

#### 自动化反馈循环

**脚本：运行完整流程**（scripts/run-harness.sh）：
```bash
#!/bin/bash
set -e

echo "=== 启动 Harness ==="

# 1. Planner 制定计划
echo "[1/4] Planner 分析需求..."
claude -p "你现在是 Planner Agent。请阅读 docs/product-requirement.md 并制定任务计划。"

# 2. Generator 执行
echo "[2/4] Generator 开始编码..."
while grep -q "\[ \]" plans/current-task.md; do
    claude -p "你现在是 Generator Agent。请实现 plans/current-task.md 中的下一个任务。"
done

# 3. Evaluator 评估
echo "[3/4] Evaluator 评估代码..."
claude -p "你现在是 Evaluator Agent。请评估刚才的代码实现。"

# 4. 根据评估结果决定
echo "[4/4] 处理评估结果..."
python scripts/process-evaluation.py

echo "=== Harness 完成 ==="
```

#### 可观测性集成

让 AI 能读取系统状态：

```python
# scripts/get-system-status.py
import json
import subprocess

def get_test_status():
    result = subprocess.run(
        ["pytest", "--json-report"],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

def get_coverage():
    result = subprocess.run(
        ["coverage", "json"],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

def get_recent_errors():
    # 从日志中提取最近的错误
    pass

if __name__ == "__main__":
    status = {
        "tests": get_test_status(),
        "coverage": get_coverage(),
        "timestamp": datetime.now().isoformat()
    }
    print(json.dumps(status, indent=2))
```

#### Level 3 检查清单

- [ ] 多 Agent 架构定义
- [ ] Agent 职责分离
- [ ] 自动化工作流脚本
- [ ] 可观测性集成
- [ ] 反馈循环机制
- [ ] 熵管理自动化

---

## 第四部分：头部厂商的落地思路

现在让我们看看业界领先的公司是怎么做 Harness 工程的。他们的经验可以给我们很多启发。

### 4.1 OpenAI：100 万行代码零人工编写的实验

#### 背景

2025-2026 年，OpenAI 进行了一个大胆的实验：用 Codex Agent 构建一个生产级软件产品，目标是**零人工编写代码**。

**结果**：
- 5 个月开发周期
- 最终代码量：100 万+ 行
- 人工编写的代码：0 行
- 开发时间：约为人工开发的 1/10
- 产品状态：有内部日活用户和外部 alpha 测试用户

#### 核心思路

**1. 人类工程师的角色转变**

OpenAI 的工程师完全不写业务代码。他们的工作是：
- 设计 Harness（约束、文档、反馈机制）
- 指定意图（产品需求、架构设计）
- 提供反馈（评估 Agent 输出、改进 Harness）

**2. 三层文档架构**

OpenAI 使用了 88 个 AGENTS.md 文件，采用分层结构：

```
AGENTS.md                 # 入口（约 100 行）
docs/
├── ARCHITECTURE.md       # 架构总览
├── design-docs/          # 设计文档
├── exec-plans/           # 执行计划
│   ├── active/          # 进行中
│   ├── completed/       # 已完成
│   └── tech-debt-tracker.md
├── generated/           # 自动生成的文档
├── product-specs/       # 产品规格
└── references/          # 参考资料
```

**关键原则**：
- AGENTS.md 是"地图"，不是"百科全书"
- 渐进式信息披露
- 每个子系统有自己的 AGENTS.md

**3. 从失败中学习的方法论**

OpenAI 团队有一个核心工作流：

```
Agent 失败 → 人类分析原因 → 改进 Harness → Agent 不再犯同样错误
```

**例子**：
- 问题：Agent 经常忘记更新文档
- 解决：添加文档一致性检查到 CI
- 结果：Agent 现在会自动检查文档是否过期

**4. 机械性约束优先**

OpenAI 强调：约束应该被机械地强制执行，而不是写在文档里指望 Agent 记住。

- 架构边界用 linter 检查
- API 契约用类型系统保证
- 代码风格用 formatter 统一

### 4.2 Anthropic：多 Agent 架构与 GAN-inspired 设计

#### 背景

Anthropic 的 Labs 团队在开发前端设计技能和长时运行编码 Agent 时，发现单 Agent 架构有天花板。他们借鉴了 GAN（生成对抗网络）的思想，设计了多 Agent 架构。

#### 核心发现

**1. 自我评估的问题**

当让 Agent 评估自己的工作时，它往往会"自信地胡说"——即使代码质量一般，它也会给出正面评价。

这在主观任务（如设计）中尤其明显：
- 问 Agent："这个设计好看吗？"
- Agent："很好看！"
- 人类看："很普通..."

**2. 分离生成器和评估器**

解决方案：让不同的 Agent 负责生成和评估。

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Planner   │────▶│  Generator  │────▶│  Evaluator  │
└─────────────┘     └─────────────┘     └──────┬──────┘
       ▲                                         │
       └─────────────────────────────────────────┘
                    (反馈循环)
```

**效果**：
- 评估器可以被调得比生成器更严格
- 生成器有具体的反馈可以迭代
- 整体输出质量显著提升

#### 前端设计的 Harness

Anthropic 团队在前端设计中定义了四个评估维度：

1. **设计质量**：是否像一个整体，而不是拼凑的？
2. **原创性**：是否有定制化的设计决策，还是套模板？
3. **工艺**：技术执行（排版、间距、配色）
4. **功能性**：可用性如何？

**关键洞察**：
- 把主观判断（"好看吗？"）转化为可评估的标准（"符合这些原则吗？"）
- 用 few-shot 示例校准评估器的口味
- 迭代改进，直到达到质量阈值

#### 全栈开发的 Harness

应用到全栈开发：

**三 Agent 系统**：
1. **Planner**：分解产品规格为可执行的任务列表
2. **Generator**：一次实现一个功能，自评估后交给 QA
3. **Evaluator（QA）**：严格检查，给出改进意见

**技术细节**：
- Agent 通过文件通信（一个写，一个读）
- 使用 React + Vite + FastAPI + PostgreSQL 技术栈
- 每个 sprint 实现一个功能
- Generator 有 git 版本控制

### 4.3 Stripe：Minions 系统

#### 背景

Stripe 内部开发了一套名为"Minions"的编码 Agent 系统，现在每周能产出 1000+ 个合并的 Pull Request。

#### 工作流程

```
开发者在 Slack 发任务
        ↓
   Minion 写代码
        ↓
   Minion 跑 CI
        ↓
   Minion 开 PR
        ↓
   人类审查并合并
```

**关键点**：
- 步骤 1 到 5 之间没有人类干预
- Harness 处理所有中间步骤
- 人类只负责最后的审查和合并

#### Harness 的组成

Stripe 的 Harness 包括：
1. **任务解析**：从 Slack 消息理解需求
2. **代码生成**：在沙箱环境中写代码
3. **自动测试**：运行测试套件
4. **CI 验证**：确保通过所有检查
5. **PR 创建**：自动生成描述和变更列表

### 4.4 LangChain：中间件架构

#### 惊人的实验结果

LangChain 团队做了一个实验：
- **不改模型**，只改 Harness
- 结果：在 Terminal Bench 2.0 上从 52.8% 提升到 66.5%
- 排名从 Top 30 跳到 Top 5

#### 他们改了什么？

**1. 自验证循环**

添加预提交检查中间件：
```
Agent 请求
  ↓
PreCompletionChecklistMiddleware
  ↓
（检查：测试通过了吗？类型检查通过了吗？）
  ↓
Agent 响应
```

**2. 上下文工程**

启动时映射目录结构：
```
Agent 启动
  ↓
LocalContextMiddleware
  ↓
（生成：项目结构图、关键文件列表）
  ↓
Agent 开始工作
```

**3. 循环检测**

跟踪文件编辑历史：
```
LoopDetectionMiddleware
  ↓
检测：这个文件是否被反复修改？
  ↓
如果是 → 触发干预
```

**4. 推理三明治**

合理分配计算资源：
```
高推理 → 规划阶段
中推理 → 实现阶段
高推理 → 验证阶段
```

#### 架构优势

LangChain 的 Harness 是**中间件架构**：

```
Agent Request
  ↓
Middleware 1
  ↓
Middleware 2
  ↓
Middleware 3
  ↓
Agent Response
```

**好处**：
- 每个中间件只做一件事
- 可以独立测试和升级
- 新功能通过添加中间件实现
- 不影响核心 Agent 逻辑

### 4.5 我们能学到什么？

总结这些头部厂商的经验：

| 公司 | 核心策略 | 可借鉴点 |
|------|---------|---------|
| OpenAI | 机械约束 + 分层文档 | 用工具强制执行规则，文档分层管理 |
| Anthropic | 多 Agent 分离 | 生成和评估分离，反馈循环 |
| Stripe | 端到端自动化 | 从需求到 PR 的全流程自动化 |
| LangChain | 中间件架构 | 模块化 Harness，可组合可测试 |

**共同主题**：
1. **约束优于提示**：用工具强制执行，而不是指望 AI 记住
2. **反馈循环**：快速检测问题，快速纠正
3. **分层设计**：信息分层，渐进披露
4. **自动化一切**：减少人类成为瓶颈的环节

---

## 第五部分：常见陷阱和解决方案

在实践 Harness 工程时，有一些常见的坑。让我们提前了解，避免踩雷。

### 5.1 陷阱 1：AGENTS.md 写得太多

#### 症状
- 你的 AGENTS.md 有 500+ 行
- AI 经常"忘记"你早期的指令
- AI 开始做一些你明确说过不要做的事

#### 原因
AI 的上下文窗口是有限的。当 AGENTS.md 太长时：
1. 它占据了宝贵的上下文空间
2. AI 无法同时关注所有指令
3. 重要信息被淹没在细节中

#### 解决方案

**ETH Zurich 的研究发现**：
- LLM 生成的 AGENTS.md 反而降低性能，成本增加 20%+
- 人工写的 AGENTS.md 只有约 4% 的情况有帮助
- 原因：太多条件规则、太多工具特定指令、不相关的上下文

**正确做法**：
1. **保持简洁**：60 行以内最好
2. **渐进披露**：AGENTS.md 是目录，详细规则在子目录
3. ** universally applicable**：只放全局适用的规则
4. **避免条件规则**：不要说"如果 A 就做 X，如果 B 就做 Y"

**例子对比**：

❌ 不好的 AGENTS.md（太长）：
```markdown
# 项目指南

## 第 1 章：项目背景
[500 字项目历史]

## 第 2 章：架构详解
[每个模块的详细说明]

## 第 3 章：编码规范
[50 条具体规则]
...
```

✅ 好的 AGENTS.md（简洁）：
```markdown
# 项目指南

## 常用命令
- 构建：`npm run build`
- 测试：`npm test`

## 代码规范
- 用 TypeScript
- 组件 PascalCase，函数 camelCase
- 详见 `docs/coding-standards.md`

## 架构
- 前端：React，见 `frontend/CLAUDE.md`
- 后端：FastAPI，见 `backend/CLAUDE.md`
```

### 5.2 陷阱 2：过度工程化控制流

#### 症状
- 你的 Harness 有复杂的条件分支
- 每个新版本模型都要改 Harness
- Agent 被限制得太死，无法灵活处理

#### 原因
模型在快速进化。今天需要复杂流程才能做的事，明天模型可能直接就能做好。

**Mitchell Hashimoto 的警告**：
> "如果你过度工程化控制流，下一个模型更新会破坏你的系统。"

#### 解决方案

**原则**：
1. **优先用提示（prompting）而非控制流**
2. **让模型自己决定如何做**
3. **只在必要时干预**

**对比**：

❌ 过度控制：
```python
# 强制 Agent 按固定步骤执行
def create_feature():
    step1_plan()
    step2_write_tests()
    step3_implement()
    step4_refactor()
    step5_document()
```

✅ 灵活控制：
```markdown
# 给 Agent 的指令

实现这个功能。建议的工作流程：
1. 先理解需求
2. 写测试（可选但推荐）
3. 实现功能
4. 验证它工作正常

你可以根据实际情况调整顺序。
```

### 5.3 陷阱 3：忽视反馈循环

#### 症状
- Agent 重复犯同样的错误
- 每次都要人工纠正同样的问题
- Harness 没有随着时间改进

#### 原因
Harness 工程的核心是"从失败中学习"。如果只修代码不修 Harness，问题会反复出现。

#### 解决方案

**建立反馈循环**：

```
Agent 犯错 → 分析根本原因 → 改进 Harness → 验证改进效果
```

**具体做法**：

1. **记录失败案例**
   ```markdown
   # harness-improvements.md
   
   ## 2024-01-15
   - 问题：Agent 经常忘记处理 API 错误
   - 原因：CLAUDE.md 没有强调错误处理
   - 解决：在 CLAUDE.md 添加"所有 API 调用必须处理错误"
   - 验证：观察后续 10 个任务，是否都处理了错误？
   ```

2. **定期回顾**
   - 每周回顾 Agent 犯的错误
   - 找出模式（是某类任务容易错？还是某类规则容易被忽略？）
   - 针对性改进 Harness

3. **自动化检查**
   - 把常见错误变成自动化检查
   - 例如：如果检测到 API 调用没有 try-catch，自动提醒

### 5.4 陷阱 4：缺乏版本控制的 Harness

#### 症状
- 你的 Harness 规则经常变来变去
- 不知道某个规则是什么时候加的
- 改了规则后，之前能做的事现在不能做了

#### 原因
Harness 本身也是代码，需要版本控制。

#### 解决方案

**把 Harness 当作代码管理**：

1. **版本控制**
   ```bash
   git add CLAUDE.md
   git add docs/ARCHITECTURE.md
   git commit -m "添加 API 错误处理规范"
   ```

2. **变更审查**
   - Harness 的修改也要经过 PR 审查
   - 讨论：这个规则是否合理？是否必要？

3. **A/B 测试**
   - 对重要的 Harness 变更，可以先在小范围测试
   - 比较新旧 Harness 的效果

4. **文档化决策**
   ```markdown
   # docs/harness-decisions.md
   
   ## 为什么要求所有函数都有 docstring？
   
   **日期**：2024-01-10
   **决策**：所有公共函数必须有 docstring
   **原因**：
   - Agent 经常生成没有文档的代码
   - 导致后续 Agent 难以理解和使用
   **替代方案考虑**：
   - 用类型注解代替 docstring → 拒绝，类型注解不能说明"为什么"
   ```

### 5.5 陷阱 5：工具太多

#### 症状
- 你连接了 10 个 MCP 服务器
- AI 经常调用错误的工具
- 上下文被工具描述占满

#### 原因
每个工具都会占用上下文空间。工具太多 = 可执行代码的空间减少。

#### 解决方案

**HumanLayer 的警告**：
> "工具太多会让上下文窗口充满工具描述，把你推入'愚蠢区'（dumb zone）更快。"

**正确做法**：
1. **只连接必要的工具**
2. **按任务动态加载工具**
3. **精简工具描述**

**例子**：

❌ 不好的做法：
```
MCP 服务器：
- GitHub MCP
- Slack MCP
- Jira MCP
- Linear MCP
- Notion MCP
- Figma MCP
- ...
（共 15 个）
```

✅ 好的做法：
```
默认连接：
- 文件系统工具
- 代码搜索工具

按任务加载：
- 需要创建 Issue → 临时连接 GitHub MCP
- 需要查文档 → 临时连接 Notion MCP
```

---

## 第六部分：快速开始清单

### 6.1 最小可行 Harness 检查清单

如果你现在就想开始，这是最简单的起步清单：

- [ ] **创建 CLAUDE.md**
  - 放在项目根目录
  - 包含：常用命令、代码规范、项目结构
  - 保持 60 行以内

- [ ] **建立项目结构**
  - 清晰的目录划分
  - 一致的命名规范

- [ ] **配置自动化工具**
  - Linter（代码风格检查）
  - Formatter（自动格式化）
  - Type checker（类型检查）
  - Test runner（测试运行）

- [ ] **添加 CI 检查**
  - GitHub Actions 或类似工具
  - 每次提交自动运行检查

- [ ] **创建第一个测试**
  - 即使是很简单的测试
  - 让 AI 知道测试是项目的一部分

**时间投入**：1-2 小时  
**预期效果**：防止最常见的 Agent 错误

### 6.2 逐步升级路线图

#### 阶段 1：基础（第 1-2 周）
- [ ] 创建根目录 CLAUDE.md
- [ ] 配置基础工具链
- [ ] 建立 CI 流程

#### 阶段 2：规范（第 3-4 周）
- [ ] 添加架构文档
- [ ] 定义代码规范
- [ ] 添加架构约束检查

#### 阶段 3：分层（第 5-8 周）
- [ ] 为每个模块创建子目录 CLAUDE.md
- [ ] 建立分层文档结构
- [ ] 添加代码审查清单

#### 阶段 4：自动化（第 9-12 周）
- [ ] 添加自动化反馈循环
- [ ] 实现熵管理脚本
- [ ] 集成可观测性工具

#### 阶段 5：高级（第 13 周+）
- [ ] 实验多 Agent 架构
- [ ] 优化 Harness 性能
- [ ] 建立 Harness 指标监控

### 6.3 推荐工具和资源

#### 工具

**代码质量**：
- Python：Ruff（lint + format）、MyPy（类型检查）
- JavaScript/TypeScript：ESLint、Prettier
- Go：gofmt、golangci-lint
- Rust：rustfmt、clippy

**CI/CD**：
- GitHub Actions（免费、易用）
- GitLab CI
- CircleCI

**架构检查**：
- dependency-cruiser（JS/TS 依赖检查）
- ArchUnit（Java 架构测试）
- import-linter（Python 导入检查）

**测试**：
- pytest（Python）
- Jest（JavaScript）
- Playwright（端到端测试）

#### 学习资源

**官方资源**：
- [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/)
- [Anthropic - Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)

**社区文章**：
- [GTCode - Harness Engineering](https://gtcode.com/articles/harness-engineering/)
- [HumanLayer - Skill Issue: Harness Engineering](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- [NxCode - Complete Guide to Harness Engineering](https://www.nxcode.io/resources/news/harness-engineering-complete-guide-ai-agent-codex-2026)

**相关概念**：
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents) - 构建可靠 AI Agent 的原则
- [AGENTS.md 规范](https://github.com/AgentOps-AI/agentsmd) - 标准化 Agent 指南文件

---

## 结语

Harness 工程不是一蹴而就的。它是一个持续迭代的过程：

1. **从简单开始**：先写一个 30 行的 CLAUDE.md
2. **观察问题**：注意 AI 经常犯的错误
3. **改进 Harness**：添加约束、文档或自动化检查
4. **验证效果**：看看同样的错误是否还会发生
5. **重复迭代**：不断优化你的 Harness

记住：**Harness 的质量决定了 AI 编码助手的效果上限。**

模型会越来越强，但 Harness 的设计能力永远是人类工程师的核心竞争力。

---

**祝你的 Harness 工程之旅顺利！**

如果有问题或想分享经验，欢迎交流。

