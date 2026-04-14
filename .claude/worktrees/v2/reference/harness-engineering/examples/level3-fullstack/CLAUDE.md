# Level 3: 多 Agent 全栈项目

这是一个展示高级 Harness 工程技术的示例项目，使用多 Agent 架构和自动化反馈循环。

## 项目特点

- ✅ 多 Agent 架构（Planner + Generator + Evaluator）
- ✅ Agent 定义文件（.claude/agents/）
- ✅ 可复用技能（.claude/skills/）
- ✅ 自动化工作流脚本
- ✅ 可观测性集成
- ✅ 熵管理自动化

## 项目结构

```
level3-fullstack/
├── CLAUDE.md                    # 项目入口
├── .claude/                     # Claude Code 配置
│   ├── agents/                 # Agent 定义
│   │   ├── planner.md         # 规划师 Agent
│   │   ├── generator.md       # 生成器 Agent
│   │   └── evaluator.md       # 评估器 Agent
│   └── skills/                 # 可复用技能
│       ├── create-api-endpoint/
│       ├── add-database-model/
│       └── write-tests/
├── scripts/                     # 自动化脚本
│   ├── run-harness.sh         # 主工作流
│   ├── pre-commit-check.sh    # 提交前检查
│   ├── run-evaluator.py       # 运行评估
│   └── entropy-cleanup.py     # 熵管理
├── plans/                       # 任务计划
├── evals/                       # 评估报告
├── backend/                     # 后端代码
├── frontend/                    # 前端代码
└── docs/                        # 文档
```

## 多 Agent 架构

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Planner   │────▶│  Generator  │────▶│  Evaluator  │
│  (规划师)    │     │   (生成器)   │     │   (评估器)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
       ▲                                         │
       └─────────────────────────────────────────┘
                    (反馈循环)
```

### Agent 职责

1. **Planner（规划师）**
   - 理解产品需求
   - 分解为可执行的技术任务
   - 制定执行计划

2. **Generator（生成器）**
   - 按照计划实现功能
   - 一次完成一个任务
   - 自评估后交给 Evaluator

3. **Evaluator（评估器）**
   - 严格检查代码质量
   - 给出改进建议
   - 决定通过或返回修改

## 快速开始

### 手动运行多 Agent 流程

```bash
# 1. 让 Planner 制定计划
# 对 Claude 说："你现在是 Planner Agent，请阅读 docs/feature-request.md 并制定任务计划"

# 2. 让 Generator 执行
# 对 Claude 说："你现在是 Generator Agent，请实现 plans/current-task.md 中的任务"

# 3. 让 Evaluator 评估
# 对 Claude 说："你现在是 Evaluator Agent，请评估刚才的代码实现"
```

### 自动化运行

```bash
# 运行完整 Harness 工作流
./scripts/run-harness.sh
```

## 工作原理

### 1. 任务规划阶段

Planner 读取产品需求，输出到 `plans/current-task.md`：

```markdown
# 任务计划

## 目标
实现用户认证功能

## 任务列表
- [ ] 创建 User 模型
- [ ] 实现密码哈希
- [ ] 创建登录 API
- [ ] 创建注册 API
- [ ] 添加 JWT 认证

## 依赖关系
任务 3、4 依赖任务 1、2
任务 5 依赖任务 3

## 验收标准
- [ ] 用户可以注册
- [ ] 用户可以登录
- [ ] 受保护路由需要认证
```

### 2. 代码生成阶段

Generator 按照计划逐个实现任务：
- 读取当前任务
- 实现功能
- 运行测试
- 标记完成
- 继续下一个

### 3. 评估阶段

Evaluator 检查代码并输出到 `evals/current-task.md`：

```markdown
# 评估报告

## 总体评分：3/4

## 各维度评分
- 正确性：4/4
- 规范性：3/4
- 健壮性：3/4
- 可测试性：2/4

## 问题列表
1. 缺少单元测试
2. 错误处理不完整

## 是否通过：否
## 建议：补充测试后重新评估
```

### 4. 反馈循环

如果评估不通过：
1. Generator 根据反馈修改
2. 重新提交给 Evaluator
3. 直到通过或达到最大迭代次数

## 技能系统

技能是可复用的指令模板：

```
.claude/skills/
├── create-api-endpoint/
│   ├── skill.md          # 技能说明
│   └── template.py       # 代码模板
├── add-database-model/
│   ├── skill.md
│   └── template.py
└── write-tests/
    ├── skill.md
    └── template.py
```

使用技能：
> "使用 create-api-endpoint 技能，创建一个获取用户列表的 API"

## 熵管理

定期运行清理脚本：

```bash
# 检查文档一致性
python scripts/entropy-cleanup.py --check-docs

# 检查代码规范
python scripts/entropy-cleanup.py --check-style

# 检查未使用的代码
python scripts/entropy-cleanup.py --check-dead-code

# 运行所有检查
python scripts/entropy-cleanup.py --all
```

## 给 Claude 的示例指令

### 使用特定 Agent

> "你现在是 Planner Agent。请帮我规划一个任务管理系统的功能，输出到 plans/task-system.md"

### 使用技能

> "使用 create-api-endpoint 技能，创建一个 POST /api/tasks 端点，接收 title 和 description"

### 运行评估

> "你现在是 Evaluator Agent。请评估 backend/src/api/tasks.py 的代码质量"

## 学习要点

通过这个示例，你可以学习到：

1. **如何设计多 Agent 系统**
   - Agent 职责分离
   - Agent 间通信机制
   - 反馈循环设计

2. **如何实现自动化工作流**
   - 脚本编写
   - 状态管理
   - 错误处理

3. **如何设计技能系统**
   - 技能模板
   - 参数化
   - 复用机制

4. **如何实现熵管理**
   - 一致性检查
   - 自动化清理
   - 定期维护

## 注意事项

多 Agent 架构适合：
- ✅ 大型项目
- ✅ 复杂功能
- ✅ 需要严格质量控制的场景

不适合：
- ❌ 小型项目（ overhead 太高）
- ❌ 快速原型
- ❌ 简单任务

## 参考

- [Anthropic - Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/)
