# Level 3: 多 Agent 全栈项目 - Harness 工程示例

这是 Harness 工程高级示例项目，展示了多 Agent 架构、自动化反馈循环和熵管理。

## 项目特点

- ✅ 多 Agent 架构（Planner + Generator + Evaluator）
- ✅ Agent 角色定义（.claude/agents/）
- ✅ 可复用技能系统（.claude/skills/）
- ✅ 自动化工作流脚本
- ✅ 熵管理自动化
- ✅ 反馈循环机制

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

## 项目结构

```
level3-fullstack/
├── CLAUDE.md                    # 项目入口
├── .claude/                     # Claude Code 配置
│   ├── agents/                 # Agent 定义
│   │   ├── planner.md         # 规划师
│   │   ├── generator.md       # 生成器
│   │   └── evaluator.md       # 评估器
│   └── skills/                 # 可复用技能
│       ├── create-api-endpoint/
│       ├── add-database-model/
│       └── write-tests/
├── scripts/                     # 自动化脚本
│   ├── run-harness.sh         # 主工作流
│   └── entropy-cleanup.py     # 熵管理
├── plans/                       # 任务计划
├── evals/                       # 评估报告
├── backend/                     # 后端代码
├── frontend/                    # 前端代码
└── docs/                        # 文档
```

## 快速开始

### 1. 手动运行多 Agent 流程

#### Step 1: Planner 制定计划

对 Claude 说：
> "你现在是 Planner Agent。请阅读 docs/feature-request.md 并制定任务计划，输出到 plans/current-task.md"

#### Step 2: Generator 执行

对 Claude 说：
> "你现在是 Generator Agent。请实现 plans/current-task.md 中的任务"

#### Step 3: Evaluator 评估

对 Claude 说：
> "你现在是 Evaluator Agent。请评估刚才的代码实现，输出到 evals/current-task.md"

#### Step 4: 反馈循环

如果评估不通过：
> "你现在是 Generator Agent。请根据 evals/current-task.md 的反馈修改代码"

重复 Step 3-4 直到评估通过。

### 2. 使用自动化脚本

```bash
# 运行完整 Harness 工作流
./scripts/run-harness.sh
```

脚本会自动：
1. 检查计划文件
2. 提示运行 Generator
3. 提示运行 Evaluator
4. 处理评估结果
5. 管理迭代次数

## Agent 详解

### Planner Agent（规划师）

**职责**：
- 理解产品需求
- 分解为技术任务
- 制定执行计划

**输出**：`plans/current-task.md`

**关键能力**：
- 任务分解
- 依赖分析
- 风险评估

### Generator Agent（生成器）

**职责**：
- 按照计划实现功能
- 遵循代码规范
- 自检查

**关键能力**：
- 代码实现
- 质量自检
- 增量开发

### Evaluator Agent（评估器）

**职责**：
- 严格检查代码质量
- 按维度评分
- 给出改进建议

**评估维度**：
1. 正确性（40%）
2. 规范性（30%）
3. 健壮性（20%）
4. 可测试性（10%）

**输出**：`evals/current-task.md`

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

**使用技能**：
> "使用 create-api-endpoint 技能，创建 POST /api/users 端点"

## 熵管理

代码库会随时间积累"熵"（混乱度）。熵管理脚本自动检查和修复：

```bash
# 运行所有检查
python scripts/entropy-cleanup.py --all

# 检查特定问题
python scripts/entropy-cleanup.py --check-docs      # 文档一致性
python scripts/entropy-cleanup.py --check-style     # 代码风格
python scripts/entropy-cleanup.py --check-types     # 类型一致性
python scripts/entropy-cleanup.py --check-dead-code # 死代码
python scripts/entropy-cleanup.py --check-naming    # 命名一致性
```

## 使用示例

### 场景 1：添加新功能

**需求**：添加用户认证功能

**流程**：
1. **Planner**：
   > "你现在是 Planner Agent。需求：添加用户认证功能，包括注册、登录、JWT。请制定计划。"

2. **Generator**（多轮）：
   > "你现在是 Generator Agent。请实现任务 1：创建 User 模型"
   > "你现在是 Generator Agent。请实现任务 2：实现密码哈希"
   > ...

3. **Evaluator**：
   > "你现在是 Evaluator Agent。请评估用户认证功能的实现"

4. **反馈循环**（如需要）：
   > "你现在是 Generator Agent。请根据评估报告修复问题"

### 场景 2：代码审查

**指令**：
> "你现在是 Evaluator Agent。请审查 backend/src/api/users.py 的代码质量"

### 场景 3：定期维护

```bash
# 每周运行一次
python scripts/entropy-cleanup.py --all
```

## 学习要点

通过这个示例，你可以学习到：

1. **多 Agent 设计**
   - 职责分离
   - 协作机制
   - 反馈循环

2. **自动化工作流**
   - 脚本编写
   - 状态管理
   - 错误处理

3. **技能系统**
   - 模板设计
   - 参数化
   - 复用机制

4. **熵管理**
   - 一致性检查
   - 自动化修复
   - 定期维护

## 注意事项

多 Agent 架构适合：
- ✅ 大型项目
- ✅ 复杂功能
- ✅ 需要严格质量控制的场景
- ✅ 团队协作

不适合：
- ❌ 小型项目（overhead 太高）
- ❌ 快速原型
- ❌ 简单任务
- ❌ 个人项目

## 演进路径

```
Level 1 (单文件) → Level 2 (分层) → Level 3 (多 Agent)
     ↓                  ↓                ↓
   个人项目          团队项目          大型项目
   简单任务          中等复杂度        高复杂度
   快速开发          规范开发          严格质量控制
```

## 参考

- [Anthropic - Harness Design](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/)
- [LangChain - Building Reliable Agents](https://blog.langchain.dev/building-reliable-agents/)
