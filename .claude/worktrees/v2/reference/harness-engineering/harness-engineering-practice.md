# Harness Engineering 实操篇：从零开始，让 Harness 随项目"生长"

> **前置阅读**：[Harness Engineering 完全指南](./harness-engineering-guide.md)（了解基本概念）  
> **本文定位**：从"知道是什么"到"知道怎么做"的实操手册  
> **核心理念**：Harness 不是一次性工程，而是随项目演进逐步生长的有机体

---

## 目录

1. [核心方法论：Harness 是"长"出来的](#第一章核心方法论harness-是长出来的)
2. [从零生长：一个项目的 Harness 演进全记录](#第二章从零生长一个项目的-harness-演进全记录)
3. [实操技巧：把 AI 的错误变成你的资产](#第三章实操技巧把-ai-的错误变成你的资产)
4. [存量改造：给已有项目装上 Harness](#第四章存量改造给已有项目装上-harness)
5. [Claude Code 操作手册](#第五章claude-code-操作手册)
6. [快速行动清单](#第六章快速行动清单)

---

## 第一章：核心方法论——Harness 是"长"出来的

### 1.1 为什么"一步到位"行不通

很多文章会告诉你：创建 CLAUDE.md，写上项目规则，加上架构文档，然后就可以开始了。

**这是错误的。**

原因很简单：

1. **你不知道 AI 会犯什么错** —— 在项目开始时，你无法预测 AI 在你的项目中会犯哪些具体错误
2. **过度约束会降低效率** —— 太多的规则会让 AI 的输出变得保守、僵化
3. **项目本身在变化** —— 项目结构、技术选型、团队规范都在演进中

这就像给还没出生的孩子准备好大学课本——时机不对，内容也不对。

### 1.2 生长式 Harness 的核心循环

Harness 的正确建设方式是一个**反馈驱动的迭代循环**：

```
  ┌──────────────────────────────────────────────┐
  │                                              │
  │   ① 让 AI 做任务（尽量少约束）              │
  │          ↓                                   │
  │   ② 观察 AI 的输出（代码、架构决策）         │
  │          ↓                                   │
  │   ③ 发现问题（哪些地方不符合你的期望）       │
  │          ↓                                   │
  │   ④ 分析根因（是缺上下文？还是缺规则？）     │
  │          ↓                                   │
  │   ⑤ 添加最小约束（只解决当前问题）           │
  │          ↓                                   │
  │   ⑥ 验证效果（让 AI 重新做同类任务）         │
  │          ↓                                   │
  │   回到 ①，循环往复                          │
  │                                              │
  └──────────────────────────────────────────────┘
```

**关键原则：每次只添加解决当前问题的最小约束。**

这不是偷懒，这是工程纪律。每一条规则都应该有一个具体的"事故"作为来源，否则它就是猜测。

### 1.3 Harness 的三个生长阶段

| 阶段 | 项目状态 | Harness 内容 | 触发条件 |
|------|---------|-------------|---------|
| **种子期** | 刚创建 / 单模块 | 一个 CLAUDE.md，10行以内 | 项目启动 |
| **生长期** | 多模块 / 多人 | 分层文档 + 架构约束 + 工具链 | AI 开始犯"结构性"错误 |
| **成熟期** | 复杂系统 | 多 Agent + 自动反馈 + 熵管理 | 单 Agent 无法胜任 |

接下来，我会通过一个完整的项目案例，**逐步展示每个阶段的具体操作**。

### 1.4 种子期的黄金法则：从三行开始

你的第一个 CLAUDE.md 应该只有三行：

```markdown
# TaskFlow

Python CLI 任务管理工具。使用 SQLite 存储，Click 做 CLI 框架。
代码风格遵循 PEP 8，测试用 pytest。
```

为什么是三行？因为这三行回答了 AI 最需要知道的三个问题：
1. **这是什么项目？**（TaskFlow —— 任务管理工具）
2. **用了什么技术？**（Python + SQLite + Click）
3. **怎样算"写得好"？**（PEP 8 + pytest）

其他的一切——架构规则、命名约定、禁止事项——**等 AI 犯了错再加**。

---

## 第二章：从零生长——一个项目的 Harness 演进全记录

> 以下通过一个虚构但典型的项目 **TaskFlow**，完整展示 Harness 从 3 行到 300+ 行的生长过程。
> 每一条规则的添加，都对应一个真实的"AI 犯错 → 人类修正 → Harness 进化"事件。

### 2.1 Day 1：项目启动（种子期）

#### 项目背景
你要做一个命令行任务管理工具：`taskflow add "买菜"`、`taskflow list`、`taskflow done 1`。

#### 操作步骤

**Step 1：创建项目骨架**

```
taskflow/
├── CLAUDE.md          ← 只有这一个 Harness 文件
├── src/
│   └── main.py
├── tests/
│   └── test_main.py
├── pyproject.toml
└── requirements.txt
```

**Step 2：写下最小 CLAUDE.md**

```markdown
# TaskFlow

Python CLI 任务管理工具。使用 SQLite 存储，Click 做 CLI 框架。
代码风格遵循 PEP 8，测试用 pytest。
```

**Step 3：让 AI 开始工作**

你对 Claude Code 说：
> "实现 taskflow add 命令，接受一个字符串参数作为任务描述，保存到 SQLite 数据库"

AI 生成了代码，能跑。但是……

#### 第一次犯错：AI 把数据库文件放在了项目根目录

AI 创建了 `taskflow.db` 在项目根目录。你更希望它在 `~/.taskflow/data.db`。

**分析根因**：AI 缺少关于"数据存储位置"的上下文。

**添加约束**：

```markdown
# TaskFlow

Python CLI 任务管理工具。使用 SQLite 存储，Click 做 CLI 框架。
代码风格遵循 PEP 8，测试用 pytest。

## 数据存储
- 数据库路径：~/.taskflow/data.db
- 首次运行时自动创建目录
```

**效果**：从此以后，AI 写的所有涉及数据库路径的代码都正确了。

> **📝 生长记录**：CLAUDE.md 从 3 行 → 6 行。触发原因：数据库路径错误。

#### 第二次犯错：AI 在 main.py 里混了所有逻辑

一周后，项目有了 `add`、`list`、`done`、`delete` 四个命令。AI 把所有逻辑写在一个 600 行的 `main.py` 里。

**分析根因**：AI 不知道你想要什么项目结构。它默认的策略是"怎么方便怎么来"。

**添加约束**：

```markdown
## 项目结构
- src/cli.py     → Click 命令定义（薄层，不含业务逻辑）
- src/service.py → 业务逻辑
- src/db.py      → 数据库操作
- src/models.py  → 数据模型

命令文件只做参数解析和调用 service 层，不要直接操作数据库。
```

然后你要求 AI 按这个结构重构现有代码。

**效果**：后续添加新功能时，AI 自动遵循了这个分层结构。

> **📝 生长记录**：CLAUDE.md 从 6 行 → 16 行。触发原因：代码结构混乱。

### 2.2 Week 2-4：功能增长（种子期 → 生长期过渡）

#### 第三次犯错：AI 的错误处理风格不一致

有的地方用 `try/except` 打印错误，有的地方用 `sys.exit(1)`，有的地方用 `click.echo` 加红色。

**添加约束**：

```markdown
## 错误处理
- CLI 层：用 click.echo(click.style(msg, fg='red')) 显示错误，然后 raise SystemExit(1)
- Service 层：raise 自定义异常（TaskNotFoundError, DuplicateTaskError）
- DB 层：让 sqlite3 异常自然冒泡到 Service 层
```

> **📝 生长记录**：CLAUDE.md 从 16 行 → 24 行。触发原因：错误处理不一致。

#### 第四次犯错：AI 写的测试不 mock 数据库

AI 写的测试直接操作真实数据库文件，测试之间互相干扰，偶尔 CI 会失败。

**添加约束**：

```markdown
## 测试规范
- 所有测试使用 tmp_path fixture 创建临时数据库
- 不使用全局的 data.db
- 每个测试函数独立，不依赖执行顺序
- 测试文件命名：test_<模块名>.py
```

> **📝 生长记录**：CLAUDE.md 从 24 行 → 31 行。触发原因：测试不稳定。

#### 此时的 CLAUDE.md 完整内容

```markdown
# TaskFlow

Python CLI 任务管理工具。使用 SQLite 存储，Click 做 CLI 框架。
代码风格遵循 PEP 8，测试用 pytest。

## 数据存储
- 数据库路径：~/.taskflow/data.db
- 首次运行时自动创建目录

## 项目结构
- src/cli.py     → Click 命令定义（薄层，不含业务逻辑）
- src/service.py → 业务逻辑
- src/db.py      → 数据库操作
- src/models.py  → 数据模型

命令文件只做参数解析和调用 service 层，不要直接操作数据库。

## 错误处理
- CLI 层：用 click.echo(click.style(msg, fg='red')) 显示错误，然后 raise SystemExit(1)
- Service 层：raise 自定义异常（TaskNotFoundError, DuplicateTaskError）
- DB 层：让 sqlite3 异常自然冒泡到 Service 层

## 测试规范
- 所有测试使用 tmp_path fixture 创建临时数据库
- 不使用全局的 data.db
- 每个测试函数独立，不依赖执行顺序
- 测试文件命名：test_<模块名>.py
```

**注意看**：31 行，每一行都有来源。没有任何"预防性"规则。

### 2.3 Month 2：进入生长期（加入 Web API）

项目需要加一个 REST API，让其他工具也能操作任务。技术栈新增 FastAPI。

#### 触发事件：单个 CLAUDE.md 开始不够用

当你让 AI 实现 API 时，它：
- 在 API 路由里直接调用了 `db.py` 的函数（跳过了 service 层）
- 用了和 CLI 不一样的错误处理方式
- 返回的 JSON 字段命名和 CLI 输出不一致

问题不再是"单个规则缺失"，而是**信息太多，AI 在单个文件里找不到重点**。

#### 生长动作：拆分文档结构

```
taskflow/
├── CLAUDE.md              ← 全局规则（精简为核心原则）
├── src/
│   ├── cli/
│   │   ├── CLAUDE.md      ← CLI 层专属规则
│   │   └── ...
│   ├── api/
│   │   ├── CLAUDE.md      ← API 层专属规则
│   │   └── ...
│   ├── service/
│   │   └── ...
│   └── db/
│       └── ...
├── tests/
│   ├── CLAUDE.md          ← 测试专属规则
│   └── ...
└── docs/
    └── ARCHITECTURE.md    ← 架构决策记录
```

**新的根 CLAUDE.md**（精简后）：

```markdown
# TaskFlow

CLI + REST API 的任务管理工具。

## 技术栈
- CLI: Click | API: FastAPI | DB: SQLite | Test: pytest
- Python 3.11+, 代码风格 PEP 8

## 核心架构原则
- **分层调用**：CLI/API → Service → DB，不可跨层
- **Service 层是唯一的业务逻辑层**：CLI 和 API 都调用相同的 Service 函数
- **自定义异常**：所有业务错误用自定义异常表达（见 src/exceptions.py）

## 数据模型
Task: id(int), title(str), status(enum: pending/done), created_at(datetime), updated_at(datetime)

详细规范见各子目录的 CLAUDE.md。
```

**src/api/CLAUDE.md**：

```markdown
# API 层开发规范

## 路由规范
- RESTful 风格：GET /tasks, POST /tasks, PATCH /tasks/{id}, DELETE /tasks/{id}
- 所有路由在 router.py 中定义，使用 APIRouter
- 路由函数只做：参数验证 → 调用 service → 格式化响应

## 错误处理
- Service 层异常 → 对应 HTTP 状态码映射：
  - TaskNotFoundError → 404
  - DuplicateTaskError → 409
  - ValidationError → 422
- 使用 FastAPI exception_handler 统一处理

## 响应格式
- 字段名用 snake_case
- 日期格式 ISO 8601
- 列表接口返回 { "items": [...], "total": int }
```

**tests/CLAUDE.md**：

```markdown
# 测试规范

## 通用规则
- 使用 tmp_path 创建临时数据库，测试间完全隔离
- 每个测试函数独立，不依赖执行顺序
- 文件命名：test_<模块名>.py

## API 测试
- 使用 FastAPI TestClient
- 测试完整的请求-响应周期
- 覆盖正常路径和所有错误路径

## 测试数据
- 使用 pytest fixtures 创建测试数据
- 不使用随机数据（保证可复现）
```

> **📝 生长记录**：从 1 个 CLAUDE.md（31行）→ 1 个根文件 + 3 个子文件。触发原因：AI 在单文件中找不到相关上下文，频繁跨层调用。

### 2.4 Month 4：进入成熟期（多 Agent 协作）

项目继续演进：要加上定时提醒功能、任务分类、优先级排序、自然语言输入（"明天下午三点提醒我开会"）。

#### 触发事件：单次对话无法完成复杂任务

你发现让 AI 在一次对话中完成"添加自然语言日期解析功能"非常困难：
- 它需要同时修改 CLI 参数、Service 层逻辑、数据库 schema、测试
- 中途容易忘记之前的决策
- 生成的代码前后不一致

#### 生长动作：引入任务拆解 + 多步骤工作流

**新增 docs/ARCHITECTURE.md**（架构决策文档）：

```markdown
# TaskFlow 架构

## 系统架构图

```
用户输入 → CLI/API（解析层）→ Service（业务层）→ DB（存储层）
                                    ↑
                              NLP Parser（自然语言解析）
```

## 架构决策记录 (ADR)

### ADR-001：为什么用 SQLite 而不是 PostgreSQL
- 场景：单用户 CLI 工具
- 决策：SQLite，零配置，数据文件随项目走
- 代价：不支持并发写入（当前场景不需要）

### ADR-002：自然语言日期解析策略
- 场景：用户输入 "明天下午三点"
- 决策：使用 dateparser 库，不自建
- 原因：成熟库覆盖多语言、多格式，维护成本低
```

**新增工作流约束**（根 CLAUDE.md 追加）：

```markdown
## 复杂任务工作流
当任务涉及多个模块时，必须：
1. 先输出实施计划（哪些文件需要改，改动顺序）
2. 按"DB → Model → Service → CLI/API → Test"的顺序实施
3. 每改完一层，先跑该层的测试，通过后再改下一层
4. 最后跑全量测试

## 数据库变更规则
- 所有 schema 变更必须通过迁移脚本（scripts/migrations/）
- 不可直接修改建表 SQL
- 迁移脚本命名：001_add_priority_column.sql
```

#### 引入自动化检查（Harness 的"免疫系统"）

**新增 scripts/pre-commit-check.sh**：

```bash
#!/bin/bash
# Harness 自动检查：确保 AI 的改动不破坏核心约束

# 检查1：Service 层不应该 import click 或 fastapi
if grep -r "import click\|from click\|import fastapi\|from fastapi" src/service/; then
  echo "❌ Service 层不应该依赖 CLI 或 API 框架"
  exit 1
fi

# 检查2：DB 层不应该 import service
if grep -r "from.*service import\|import.*service" src/db/; then
  echo "❌ DB 层不应该反向依赖 Service 层"
  exit 1
fi

# 检查3：所有新增的.py文件必须有对应的测试文件
echo "✅ 所有检查通过"
```

**在 CLAUDE.md 中引用**：

```markdown
## 自动化检查
- 提交前运行 scripts/pre-commit-check.sh
- 该脚本检查分层架构约束：Service 层不依赖 CLI/API，DB 层不反向依赖 Service
- 所有 PR 必须通过此检查
```

> **📝 生长记录**：新增架构文档、工作流约束、自动化检查脚本。触发原因：复杂任务中 AI 频繁跨层、忘记前置决策。

### 2.5 Harness 生长时间线总览

```
Day 1          Week 2         Week 4         Month 2        Month 4
  │              │              │              │              │
  ▼              ▼              ▼              ▼              ▼
┌──────┐   ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌────────────┐
│3 行   │   │16 行     │  │31 行      │  │分层文档    │  │架构约束    │
│最小   │   │+ 结构    │  │+ 错误处理 │  │+ 子目录   │  │+ 自动检查  │
│种子   │   │  约束    │  │+ 测试规范 │  │  CLAUDE.md│  │+ 工作流   │
└──────┘   └──────────┘  └───────────┘  └───────────┘  └────────────┘
  种子期 ──────────────────→  生长期 ────────→  成熟期
```

**每次生长的共同模式**：
1. AI 犯了一个你不想看到的错误
2. 你分析这个错误的根因
3. 你添加**最小的、最具体的**约束来防止这类错误
4. 你让 AI 重新做同类任务，验证约束有效

**这就是 Harness 的"生长"——它不是被设计出来的，而是被经验喂养出来的。**

---

## 第三章：实操技巧——把 AI 的错误变成你的资产

### 3.1 错误分类与应对策略

不是所有 AI 犯的错误都值得加入 Harness。以下是分类框架：

| 错误类型 | 示例 | 频率 | 应对策略 |
|---------|------|------|---------|
| **上下文缺失** | 不知道该用哪个库 | 几乎每次 | 在 CLAUDE.md 写明技术栈 |
| **规则不明** | 不知道你的命名偏好 | 前几次 | 犯过一次就加规则 |
| **架构偏离** | 跨层调用、循环依赖 | 项目变大后 | 分层文档 + 自动检查 |
| **一致性漂移** | 同一件事做法不同 | 多次对话后 | 统一规范 + 具体示例 |
| **幻觉** | 编造不存在的 API | 随机发生 | 明确列出可用的API/工具 |
| **偶发错误** | 少了一个逗号 | 偶尔 | **不要加规则**，直接修复 |

> **黄金法则：如果一个错误只发生一次且不太可能再发生，直接修复它，不要加规则。过多规则带来的阅读成本比偶发错误更大。**

### 3.2 如何把错误转化为有效约束

#### 坏的约束 vs 好的约束

**❌ 坏的约束**（模糊、不可操作）：

```markdown
- 写高质量的代码
- 注意错误处理
- 保持代码整洁
- 遵循最佳实践
```

AI 看到这些约束会怎么做？和没看到一样。因为这些描述太模糊了，无法指导具体行为。

**✅ 好的约束**（具体、可验证）：

```markdown
- 所有 public 函数必须有 docstring，格式为 Google Style
- HTTP 错误响应格式：{"error": {"code": "TASK_NOT_FOUND", "message": "..."}}
- 数据库查询必须用参数化查询（cursor.execute("... WHERE id=?", (id,))），禁止字符串拼接
- 新增 API 端点必须同时添加 OpenAPI 描述（summary + description）
```

#### 约束转化公式

```
错误现象 → 根因分析 → 你期望的行为 → 最小约束文本
```

**实例**：

| 错误现象 | 根因 | 期望行为 | 约束文本 |
|---------|------|---------|---------|
| AI 用了 print() 做日志 | 不知道项目用什么日志方案 | 用 logging 模块 | `日志用 logging 模块，不用 print。级别：DEBUG/INFO/ERROR` |
| AI 给变量起名 `data`、`result` | 命名习惯不明确 | 有意义的变量名 | `变量名要说明内容：用 task_list 不用 data，用 db_connection 不用 conn` |
| AI 把配置硬编码 | 不知道配置管理方式 | 统一配置管理 | `配置项放 config.py，通过环境变量覆盖。敏感信息（API Key）只用环境变量` |

### 3.3 文档长度与信息密度的平衡

#### CLAUDE.md 的理想长度

| 项目规模 | 根 CLAUDE.md | 子目录 CLAUDE.md | 总 Harness 文档量 |
|---------|-------------|-----------------|-----------------|
| 小型（< 5 文件） | 10-30 行 | 无 | < 30 行 |
| 中型（5-20 文件） | 30-60 行 | 各 15-30 行 | < 200 行 |
| 大型（20+ 文件） | 40-80 行 | 各 20-40 行 | < 500 行 |

**超过这个范围说明你的约束不够精炼，或者项目该拆分了。**

#### 信息密度的技巧

**1. 用"做/不做"对比代替长段描述**：

```markdown
## 导入规范
- ✅ from src.service.task_service import create_task
- ❌ from src.service import *
- ❌ import src.service.task_service
```

这比写一段话"导入时应该使用 from ... import 语法精确导入需要的函数或类，避免使用通配符导入或模块级别导入"有效10倍。

**2. 用代码模板代替规则描述**：

与其写"Service 层函数应该接受简单参数，返回领域对象，处理业务异常"，不如：

```markdown
## Service 层函数模板
```python
def create_task(title: str, priority: int = 0) -> Task:
    """创建新任务。"""
    if not title.strip():
        raise ValidationError("任务标题不能为空")
    task = Task(title=title.strip(), priority=priority)
    return db.save_task(task)
```
```

**3. 优先级标注**：

```markdown
## 规则（按重要性排列）
### 🔴 必须遵守
- 分层架构：CLI/API → Service → DB，不可跨层

### 🟡 强烈建议
- 新功能先写测试，再写实现

### 🟢 有则更好
- Commit message 用约定式提交（feat:、fix:、docs:）
```

### 3.4 建立有效的反馈循环

反馈循环是 Harness 能持续进化的核心机制。有四种主要方式：

#### 方式一：对话内即时反馈（最常用）

当 AI 生成的代码不符合预期时：
1. 不要直接改代码
2. 告诉 AI **哪里不对**和**为什么不对**
3. 让 AI 自己修正
4. 如果同类问题出现第二次，加入 CLAUDE.md

```
你："这个函数直接操作了数据库，违反了分层原则。请改为调用 service 层。"
AI：修正代码
你：（记录：这类跨层调用问题出现了第2次，待观察）
——下次又出现——
你：加入 CLAUDE.md："所有 API 路由函数只能调用 service 层函数，不能直接 import db 层"
```

#### 方式二：代码审查驱动（系统性）

每次 AI 完成一个功能后，做一次快速审查：

```markdown
审查清单：
□ 是否遵循了分层架构？
□ 是否有对应的测试？
□ 错误处理是否符合规范？
□ 是否引入了新的依赖？（需要更新 requirements.txt）
□ 是否修改了数据库 schema？（需要迁移脚本）
```

#### 方式三：自动化检查（持续性）

```python
# scripts/harness_check.py
"""Harness 约束自动检查器"""
import ast
import sys
from pathlib import Path

def check_layer_violations():
    """检查分层架构违规"""
    violations = []

    # API 层不应该直接 import db
    for py_file in Path("src/api").rglob("*.py"):
        tree = ast.parse(py_file.read_text())
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                if node.module and "db" in node.module:
                    violations.append(f"{py_file}: API 层直接 import 了 DB 层")

    return violations

if __name__ == "__main__":
    violations = check_layer_violations()
    if violations:
        for v in violations:
            print(f"❌ {v}")
        sys.exit(1)
    print("✅ 所有 Harness 约束检查通过")
```

#### 方式四：周期性 Harness 审计（定期）

每隔 2-4 周回顾一次 CLAUDE.md：

1. **删除过时规则**：技术栈变了、项目结构调整了、某些规则不再适用
2. **合并重复规则**：多次迭代可能产生了重复或矛盾的规则
3. **评估有效性**：哪些规则确实减少了 AI 的错误？哪些形同虚设？
4. **检查遗漏**：最近有没有反复纠正 AI 的同类问题，但还没加入 Harness？

> **关键原则：Harness 也有"保质期"。不再适用的规则要及时删除，否则它们会变成噪音，降低有效规则的信号强度。**

---

## 第四章：存量改造——给已有项目装上 Harness

> 这是很多人最头疼的问题：项目已经存在了，代码已经写了几千行，现在要让 AI 助手参与进来，怎么建 Harness？

### 4.1 存量改造的核心思路

**不要试图一次性为整个项目建立完整的 Harness。**

存量项目改造遵循"诊断 → 最小介入 → 逐步完善"的医学思维：

```
  ① 诊断：让 AI 做一个小任务，观察它犯什么错
  ② 最小介入：只添加解决当前问题的约束
  ③ 扩大范围：让 AI 做更多类型的任务
  ④ 逐步完善：每次犯错都让 Harness 长一点
```

### 4.2 实战案例：ETF 监控系统的 Harness 改造

> 以下基于一个真实的 Streamlit + AKShare + SQLite 项目，展示存量改造的具体步骤。

#### 项目现状

```
etf-monitor/
├── .claude/
│   ├── commands/quick-commit.md   ← 已有！说明之前用过 Claude
│   └── settings.local.json        ← 已配置工具权限
├── app.py                          ← Streamlit 主文件
├── config.py                       ← ⚠️ 含硬编码 API Token
├── utils/
│   ├── data_fetcher.py            ← 数据获取
│   ├── database.py                ← SQLite 操作
│   └── scheduler.py               ← APScheduler 定时任务
├── requirements.txt
└── test_*.py                       ← 少量测试
```

**特点**：
- 已有 `.claude/` 配置（说明已经在用 Claude Code）
- 没有 CLAUDE.md（AI 每次都在"裸奔"）
- `config.py` 硬编码了 API Token（安全隐患）
- 代码量不大（~500行），但模块间耦合

#### Step 1：诊断性任务

先让 AI 做一个小任务来暴露问题：

> "请为 etf-monitor 添加一个功能：支持导出选中 ETF 的历史数据为 CSV 文件"

观察 AI 的输出，它大概率会：
- ❌ 在 `app.py` 里直接写导出逻辑（不知道有 utils/ 分层）
- ❌ 硬编码文件路径（不知道项目的数据目录在哪）
- ❌ 直接 import config 中的常量（不知道配置管理方式）
- ✅ 能正确使用 Streamlit 的下载按钮（这是通用知识）

#### Step 2：创建最小 CLAUDE.md

基于诊断结果，写第一版 CLAUDE.md：

```markdown
# ETF Monitor

Streamlit 应用，监控 ETF 基金数据。使用 AKShare 获取数据，SQLite 存储，APScheduler 定时更新。

## 项目结构
- app.py：Streamlit 页面（UI 逻辑）
- config.py：配置常量（ETF 列表、更新间隔、数据库路径）
- utils/data_fetcher.py：从 AKShare 获取数据
- utils/database.py：SQLite CRUD 操作
- utils/scheduler.py：后台定时任务

## 开发规范
- 新功能涉及数据处理：加在 utils/ 对应模块中
- UI 相关改动：在 app.py 中修改
- 数据目录：data/（已在 .gitignore 中）
- ⚠️ config.py 中的 TUSHARE_TOKEN 即将迁移为环境变量，新代码不要依赖它
```

这只是一个起点——大概 15 行，专注于"AI 最需要知道的信息"。

#### Step 3：逐步完善

在后续使用中，每次 AI 犯错就追加规则：

**犯错：AI 修改 config.py 时暴露了 Token**
```markdown
## 安全规范
- API Token 通过环境变量获取：os.environ.get("TUSHARE_TOKEN")
- 不在代码中硬编码任何 token 或密钥
- .env 文件已加入 .gitignore
```

**犯错：AI 创建的新 Streamlit 组件样式不统一**
```markdown
## UI 规范
- 使用 st.sidebar 放置筛选控件
- 图表用 Plotly（st.plotly_chart），不用 matplotlib
- 数据表格用 st.dataframe，启用 use_container_width=True
```

**犯错：AI 直接修改了数据库 schema 没有考虑数据迁移**
```markdown
## 数据库变更
- 修改表结构前先备份 data/etf_monitor.db
- 提供迁移脚本，不要直接 ALTER TABLE
```

### 4.3 实战案例：学习导师系统的 Harness 改造

> 这是一个更复杂的项目：LangGraph + FastAPI + 多 Agent 架构，已有 2000+ 行代码。

#### 项目现状

```
learning-tutor/
├── app/
│   ├── agents/              ← 3 个 LangGraph Agent
│   │   ├── tutor_agent.py      （GPT-4.1, 苏格拉底式教学）
│   │   ├── assessor_agent.py   （GPT-4o-mini, 多维评估）
│   │   └── curriculum_planner.py（课程规划，拓扑排序）
│   ├── api/                 ← FastAPI 路由
│   ├── core/                ← 核心工具
│   ├── db/                  ← SQLAlchemy 模型
│   ├── memory/              ← LangChain Memory
│   └── schemas/             ← Pydantic 模型
├── frontend/
│   ├── cli/                 ← Typer CLI
│   └── web/                 ← Streamlit Web
├── config/
│   ├── settings.py          ← Pydantic BaseSettings（好的实践！）
│   └── constants.py
├── tests/                   ← 有测试框架但覆盖率低
├── docs/
│   └── ARCHITECTURE.md      ← 有架构文档！
├── pyproject.toml           ← 配置了 Black, isort, mypy
└── README.md
```

**优势**（已有的好基础）：
- 清晰的目录结构和分层设计
- Pydantic BaseSettings 管理配置（环境变量注入）
- 有架构文档和 README
- 配置了代码质量工具（Black, isort, mypy）

**缺失**：
- 没有 CLAUDE.md（AI 不知道项目约定）
- Agent 间的协作规则没有文档化
- 各 Agent 使用的模型和策略缺乏说明

#### Step 1：利用项目已有资产

这个项目的关键不同在于：**它已经有好的架构，只是没有告诉 AI**。

所以改造策略不是"从零建设"，而是"把隐性知识显性化"。

**方法：让 AI 先阅读项目，然后你修正它的理解。**

> "请阅读 learning-tutor 项目的代码结构，总结你对项目架构的理解，特别是：
> 1. 三个 Agent 分别做什么
> 2. 数据流是怎么走的
> 3. 你认为修改代码时需要注意什么"

AI 会给出它的理解，然后你修正错误、补充遗漏。这个过程本身就是在创建 CLAUDE.md 的素材。

#### Step 2：创建根 CLAUDE.md

```markdown
# Learning Tutor

苏格拉底式 AI 学习导师。通过引导式对话帮助用户掌握知识。

## 技术栈
- 后端：FastAPI + LangGraph + SQLAlchemy
- LLM：GPT-4.1（对话）| Claude 3.5 Sonnet（内容生成）| GPT-4o-mini（快速评估）
- 数据库：SQLite（开发）/ PostgreSQL（生产）+ ChromaDB（向量检索）
- 前端：Streamlit（Web）+ Typer（CLI）
- 工具链：Black + isort + mypy + pytest

## 核心架构
三个 Agent 通过 LangGraph 协作：
1. **TutorAgent**（tutor_agent.py）：主对话，苏格拉底方法引导学生
2. **AssessorAgent**（assessor_agent.py）：评估学生回答，多维度打分
3. **CurriculumPlanner**（curriculum_planner.py）：规划学习路径，拓扑排序处理依赖

调用链：用户输入 → TutorAgent（对话）→ AssessorAgent（评估）→ CurriculumPlanner（调整路径）

## 关键约定
- 配置管理：config/settings.py（Pydantic BaseSettings），所有 API Key 通过环境变量
- 模型选择：对话用高能力模型(GPT-4.1)，辅助任务用轻量模型(GPT-4o-mini)
- 学习阶段：EXPLORATION → EXPLANATION → PRACTICE → VERIFICATION → ADVANCEMENT
- 掌握阈值：0.8（config/settings.py 中的 default_mastery_threshold）

## 修改代码时注意
- Agent 文件只负责 LLM 交互逻辑，不直接操作数据库
- 数据库操作在 app/db/ 中，通过 SQLAlchemy ORM
- 新增 API 端点在 app/api/ 的对应 router 中
- 代码格式化：提交前运行 black . && isort .
```

#### Step 3：为 Agent 目录创建专属指南

```markdown
# app/agents/CLAUDE.md

## Agent 开发规范

### 模型选择
- 需要深度推理的任务 → GPT-4.1（temperature=0.7）
- 需要精确评估的任务 → GPT-4o-mini（temperature=0.3）
- 需要内容生成的任务 → Claude 3.5 Sonnet

### Agent 状态管理
- 每个 Agent 使用 TypedDict 定义状态（如 TutorState, AssessorState）
- 状态在 LangGraph 节点间传递，不使用全局变量
- 状态中必须包含 user_id 用于隔离不同用户

### 评估权重（assessor_agent.py）
修改评估权重时要同时更新：
1. assessor_agent.py 中的 WEIGHT_* 常量
2. tests/ 中对应的测试期望值
3. docs/ARCHITECTURE.md 中的说明

### 禁止事项
- 不要在 Agent 中直接创建数据库连接
- 不要修改 LangGraph 的 State 类型定义时遗漏下游 Agent 的适配
- 不要硬编码模型名称，统一从 config/settings.py 读取
```

> **存量改造的核心原则：不是从零建设，而是把项目已有的"隐性知识"转化为 AI 可理解的"显性规则"。**

### 4.4 存量改造中的常见问题

#### Q1：要不要用 /memory 命令先生成一堆项目记忆？

**不建议一次性生成大量记忆。** 原因：
- AI 生成的记忆往往是"正确但无用"的（比如"这个项目用 Python"）
- 真正有价值的是**你的决策和偏好**，而不是代码结构的机械描述
- 大量低质量记忆会稀释高质量信号

**推荐做法**：
1. 手动写 CLAUDE.md（10-20 行起步），专注于"AI 不看代码就猜不到的信息"
2. 然后正常使用 AI 做开发任务
3. 每次 AI 犯错时，判断是否需要加规则
4. 每 2-4 周清理一次，删除无效规则

#### Q2：已有的 README.md 和 ARCHITECTURE.md 够用吗？

**不够，但很有价值。** 区别：
- **README.md** 面向人类读者，讲"这个项目是什么"
- **ARCHITECTURE.md** 面向人类读者，讲"这个项目怎么设计的"
- **CLAUDE.md** 面向 AI，讲"你在这个项目里应该怎么做"

CLAUDE.md 的内容更偏向**操作指令**：不是解释为什么这么设计，而是告诉 AI "你必须这样做"。

但已有的 README 和 ARCHITECTURE.md 可以作为 CLAUDE.md 的信息来源——从中提炼出对 AI 有指导意义的关键信息。

#### Q3：项目代码质量不高，要先重构再加 Harness 吗？

**不要。** 先加 Harness，再用 Harness 辅助重构。

策略：
1. 先为**现状**写 CLAUDE.md（如实描述当前的架构，即使它不完美）
2. 在 CLAUDE.md 中标注**技术债务**和**计划中的改进**
3. 让 AI 在遵循现有架构的前提下做改动
4. 逐步用 AI 辅助重构，每次重构后更新 CLAUDE.md

```markdown
## 技术债务（计划中）
- [ ] config.py 中的 Token 硬编码 → 迁移为环境变量
- [ ] app.py 超过 500 行 → 拆分为多个页面模块
- [ ] 缺少 CI/CD → 添加 GitHub Actions

## 当前架构（临时）
注意：app.py 目前是单体结构，所有页面逻辑都在里面。
重构完成前，新页面仍然加在 app.py 中，使用函数分隔。
```

---

## 第五章：Claude Code 操作手册

### 5.1 CLAUDE.md 配置最佳实践

#### 文件放置位置

```
项目根目录/
├── CLAUDE.md              ← Claude Code 自动读取的入口文件
├── .claude/
│   ├── settings.local.json ← 工具权限配置
│   └── commands/           ← 自定义斜杠命令
│       └── quick-commit.md
├── src/
│   ├── api/
│   │   └── CLAUDE.md      ← 子目录规范（AI 进入该目录时自动加载）
│   └── ...
└── docs/
    └── ARCHITECTURE.md     ← CLAUDE.md 中可以引用
```

**关键机制**：
- Claude Code 在开始对话时自动读取根目录的 `CLAUDE.md`
- 当 AI 访问子目录中的文件时，会同时读取该子目录的 `CLAUDE.md`
- 这实现了**渐进式信息披露**：AI 只在需要时才获取特定模块的详细规范

#### CLAUDE.md 的信息结构

推荐的信息排列顺序（从最重要到最次要）：

```markdown
# 项目名称
一句话描述。                           ← ① 身份信息

## 技术栈
关键技术列表                            ← ② 技术上下文

## 核心架构 / 项目结构
分层说明、模块关系                      ← ③ 结构地图

## 开发规范
命名、格式、错误处理等                  ← ④ 行为规则

## 禁止事项
明确的"不要做"清单                     ← ⑤ 红线（最容易犯的错）
```

为什么这个顺序？因为 AI 处理长文本时，**开头的信息影响力最大**。把最关键的信息放在前面。

### 5.2 使用 Claude Code Harness 插件

如果安装了 [claude-code-harness](https://github.com/Chachamaru127/claude-code-harness) 插件，你有以下工作流命令：

#### /harness-setup：初始化项目 Harness

```
> /harness-setup

插件会：
1. 扫描项目结构
2. 分析技术栈
3. 生成初始 CLAUDE.md 草稿
4. 创建 .claude/ 配置目录
```

**⚠️ 重要**：不要直接使用生成的 CLAUDE.md。你应该：
1. 阅读生成的内容
2. 删除"正确但无用"的信息（如"这个项目有 package.json"）
3. 补充 AI 无法从代码推断的信息（你的偏好、决策原因、禁止事项）
4. 精简到 30 行以内

#### /harness-plan：规划复杂任务

```
> /harness-plan 添加用户认证功能

插件会：
1. 分析当前项目结构
2. 读取 CLAUDE.md 中的架构约束
3. 生成分步实施计划
4. 列出需要修改的文件和预期改动
```

这是做复杂功能前的关键步骤——先计划，再执行。

#### /harness-work：按计划执行

```
> /harness-work step 1

按照 harness-plan 生成的计划，逐步执行每个步骤。
每步完成后会自动：
- 运行相关测试
- 检查 Harness 约束
- 提示你审查
```

#### /harness-review：代码审查

```
> /harness-review

检查最近的改动是否符合 Harness 约束：
- 分层架构是否被破坏
- 命名规范是否遵循
- 测试是否充分
- 是否引入了新的技术债务
```

### 5.3 自定义命令的妙用

在 `.claude/commands/` 中创建自定义命令，可以把常用的 Harness 操作封装起来：

**`.claude/commands/add-feature.md`**：

```markdown
# 添加新功能

参数: $ARGUMENTS（功能描述）

请按以下步骤为项目添加新功能：

1. 阅读 CLAUDE.md 了解项目架构和规范
2. 分析新功能涉及的模块
3. 先写测试（描述期望行为）
4. 按 DB → Service → API/CLI → UI 的顺序实现
5. 每层实现后运行对应测试
6. 全部完成后运行全量测试
7. 更新 CLAUDE.md（如果新功能引入了新的架构模式）
```

使用时：`/add-feature 支持任务标签功能`

**`.claude/commands/harness-audit.md`**：

```markdown
# Harness 审计

请审查当前项目的 Harness 体系：

1. 阅读所有 CLAUDE.md 文件
2. 对比实际代码，检查：
   - 哪些规则已经过时（项目结构变了但规则没更新）
   - 哪些常见问题还没有对应规则
   - 有没有规则互相矛盾
3. 输出审计报告，包含：
   - 建议删除的规则
   - 建议新增的规则
   - 建议修改的规则
```

使用时：每 2-4 周运行一次 `/harness-audit`

### 5.4 Agent Memory vs CLAUDE.md

Claude Code 的 Memory 功能和 CLAUDE.md 有什么区别？如何配合使用？

| 维度 | CLAUDE.md | Agent Memory |
|------|-----------|-------------|
| **存储位置** | 项目目录中的文件 | Claude 平台云端 |
| **作用范围** | 当前项目 | 跨所有项目 |
| **版本控制** | ✅ Git 管理 | ❌ 无版本控制 |
| **团队共享** | ✅ 代码仓库共享 | ❌ 个人使用 |
| **适合存储** | 项目规范、架构约束 | 个人偏好、工作习惯 |

**推荐策略**：
- **CLAUDE.md**：所有项目相关的约束（架构、规范、禁止事项）
- **Agent Memory**：个人通用偏好（如"我喜欢 Google Style docstring"、"回复我用中文"）

**不要把项目约束存在 Agent Memory 里**——因为它无法版本控制、无法团队共享、也容易在跨项目时产生冲突。

---

## 第六章：快速行动清单

### 新项目（从零开始）

```
□ 1. 创建 CLAUDE.md，写 3 行（项目名、技术栈、代码风格）
□ 2. 让 AI 实现第一个功能
□ 3. 审查 AI 输出，记录不符合预期的地方
□ 4. 把高频问题转化为 CLAUDE.md 中的规则
□ 5. 重复 2-4，直到 AI 的输出稳定符合你的期望
□ 6. 项目变大后：拆分子目录 CLAUDE.md
□ 7. 项目变复杂后：添加架构文档和自动化检查
```

### 存量项目（已有代码）

```
□ 1. 让 AI 做一个诊断性小任务，观察它犯什么错
□ 2. 创建 CLAUDE.md（15-20 行），重点描述：
     - 项目是什么
     - 技术栈
     - 项目结构（各目录/文件的职责）
     - AI 最需要知道的 2-3 条规则
□ 3. 让 AI 重新做诊断任务，验证效果
□ 4. 正常开发，每次 AI 犯错就追加规则
□ 5. 每 2-4 周做一次 Harness 审计（删除过时规则、补充遗漏）
```

### Harness 规则质量检查

写完一条新规则后，用这三个问题检验：

```
✓ 这条规则是否源自一次具体的 AI 犯错事件？
  → 如果不是，它很可能是"预防性猜测"，先不加。

✓ AI 读到这条规则后，行为是否会明确改变？
  → 如果不会（比如"写高质量代码"），这条规则无效。

✓ 这条规则是否可以被验证（自动或手动）？
  → 如果完全不可验证，考虑改写为更具体的形式。
```

---

## 结语：Harness 工程的本质

Harness 工程不是一个"项目配置"任务，而是一种**持续的工程实践**。

它的本质是：**建立你和 AI 之间的工作契约，然后随着合作的深入不断修订这份契约。**

就像带一个新人入职：
- 第一天你给他看项目文档
- 他犯了错你告诉他为什么不对
- 过了一个月他知道了大部分规矩
- 但偶尔还是需要提醒
- 你把最重要的规矩写进了团队 Wiki

AI 助手也是一样。只是它的"团队 Wiki"叫 CLAUDE.md，它的"入职文档"叫架构说明，它的"代码规范"是自动化检查脚本。

**起步时给三行规则，用起来再加，犯错了就补。这就是 Harness 工程的全部秘密。**
