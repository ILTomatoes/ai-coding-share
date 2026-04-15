# Harness Engineering 学习笔记

> 来源：[一文带你看懂，火爆全网的Harness Engineering到底是个啥](https://mp.weixin.qq.com/s/yI1rQHVwJqszdpadzAe_4A)
> 作者：数字生命卡兹克
> 整理日期：2026-04-15

---

## 核心公式

**Agent = Model + Harness**

> LangChain 在博客上提出的，可能是2026年关于AI工程最精辟的一句话。模型是马，Harness是缰绳，光有马不行，你还得有一整套驾驭它的系统。

## 什么是 Harness

Harness 原意是"马具"——马鞍、缰绳、嚼子那一整套东西。马速度快、力量大，但不套上缰绳就会跑偏。Harness 的作用就是把这股野蛮的力量引导到你需要的方向上。

在 AI 领域，Harness 是让 AI Agent 能安全、高效、可控地干活的**一整套约束系统**——架构边界、依赖规则、自动化测试、lint 规则、CI/CD 流水线、反馈循环机制等。

## 三个阶段的三次跃迁

AI 与人类的协作方式经历了三次进化，每个阶段对应不同的 Engineering 重点：

| 阶段 | 时间 | 核心概念 | AI 角色 | 交互模式 | 游戏类比 |
|------|------|---------|---------|---------|---------|
| 1 | 2023 | **Prompt Engineering** | 聊天机器人 | 一问一答，你说一句它回一句 | 《只狼》——每一招都得手搓 |
| 2 | 2025 | **Context Engineering** | AI 助手 | 它帮你做事，需要充足上下文 | 《金铲铲之战》——前期配置，自动战斗 |
| 3 | 2026 | **Harness Engineering** | 自主 Agent | 它自己跑，你需要约束系统 | 《全面战争》——靠编队、阵型、规则驾驭全局 |

### 关键认知

- **三个阶段不是替代关系，而是嵌套关系**：Harness Engineer 需要懂 Context Engineering，Context Engineer 需要懂 Prompt Engineering。每一层都没有过时，只是被更大的框架包裹住了。
- **控制粒度越来越粗，AI 自主度越来越高**，需要的约束方式也越来越系统化。

## Harness 的两大控制机制

Birgitta Böckeler 将 Harness 分为两类控制机制，形成一个闭环：

### 1. Guides（前馈控制 / Feedforward Controls）

在 AI 行动**之前**设好规则，让它沿着正确方向走。

- 类比：高速公路护栏——不需要每秒纠正，护栏在就行
- 举例：
  - `CLAUDE.md` 文件
  - 代码规范文档
  - 架构决策记录
  - 分层架构约束（如 OpenAI 的 Types → Config → Repo → Service → Runtime → UI 六层架构，每层只能依赖下层）
  - 权限分级（读文件可自主，删文件需确认，格式化硬盘永远禁止）

### 2. Sensors（反馈控制 / Feedback Controls）

在 AI 做完事**之后**检测它做得对不对。

- 举例：
  - 自动化测试
  - 代码 lint
  - CI 流水线

### 闭环逻辑

> 好的 Harness = Guides + Sensors，前者防患于未然，后者亡羊补牢。
>
> **每当你发现 Agent 犯了一个错误，就花时间去设计一个方案，让它永远不可能再犯同样的错误。** 这就是 Harness Engineer 的日常。

## 核心原则：约束先行

Harness Engineering 最核心的四个字。规则不是靠口头约定，是靠自动化测试来强制执行。

有了约束，速度才不会下降，架构才不会漂移。

## 关键里程碑

| 时间 | 事件 |
|------|------|
| 2022底-2023 | ChatGPT 横空出世，Prompt Engineer 年薪可达30万美金 |
| 2024下半年 | 模型越来越聪明，Prompt 技巧边际收益急速下降（Claude 3.5 Sonnet） |
| 2025年中 | Karpathy 转发：Context Engineering 放在 Prompt Engineering 之上 |
| 2025.07 | Manus 发文，系统阐述 Context Engineering |
| 2025.11 | Anthropic 博客：Claude Agent SDK = "一个强大的通用 Agent Harness" |
| 2026.02 | OpenAI 博文正式提出 Harness Engineering，团队用 Codex 五个月搭建百万行代码产品，人类手写代码量为 0 |

## 普适性思维

Harness Engineering 的思维方式不限于编程，可泛化到任何 AI 协作场景：

- **给 AI 设规则**：如写邮件时"永远不用感叹号结尾""收件人是老板语气要正式"
- **设计检查点**：如做数据分析后自动验算
- **底层思想来自控制论**：任何复杂系统的稳定运行，都依赖于反馈机制

## 驯服的类比

| 阶段 | 人类驯服自然 | AI 驯服 |
|------|------------|--------|
| 火焰 | 小心翼翼喂柴火 → **Prompt Engineering** | 你的每次输入直接决定输出 |
| 炉子 | 把火关在结构里，调节进气口和烟囱 → **Context Engineering** | 通过设计上下文来影响行为 |
| 蒸汽机 | 锅炉、气缸、调节阀、安全阀的精密系统 → **Harness Engineering** | 管的是系统怎么设计，不是火怎么烧 |

## AI 工程与古典学科的关系

| AI 概念 | 对应古典学科 |
|---------|------------|
| Harness | 控制论 |
| Skill | 分类学 |
| Prompt | 语言学 |
| Context | 信息科学 |
| Reasoning | 认知心理学 |
| 多Agent协同 | 管理学 |

## 一句话总结

> Harness Engineering 就是怎么把一股更快、更强、更不受控的力量，安全地、持续地、可复制地，引导到我们想要的方向上去。火是这样，蒸汽是这样，电是这样，核能也是这样。从我们学会用火开始那几十万年的历史，从来都是这样。只不过这一次，轮到 AI 了。
