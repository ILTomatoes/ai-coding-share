# Claude Code 使用全景分析

> 基于 `~/.claude/` 目录和关联项目的深度挖掘结果

---

## 一、使用概况

### 基本数据

| 指标 | 数据 |
|------|------|
| 活跃项目数 | **50+** 个（含 worktree） |
| 核心项目数 | **10+** 个（独立项目） |
| 会话总数 | **793+** 个 |
| 使用起始时间 | 2025 年 1 月 20 日 |
| 日均消息 | 1000-6000 条 |
| 日均工具调用 | 169-923 次 |
| .claude 目录总大小 | 322 MB |

### 项目分布

```
D:\GitCode\
├── GitLab/                     # 企业项目（10 个仓库）
│   ├── aip-portal              # ★ 核心项目，AI 门户后端（256 commits）
│   ├── aip-gateway             # AI 网关服务，基于 Apache ShenYu（201 commits）
│   ├── aip-server              # AI RAG 服务器（2,378 commits）
│   ├── aip-web                 # 前端 React 应用（3,522 commits）
│   ├── rag-server-py           # RAG 服务器 Python 实现（1,040 commits）
│   ├── agent-server            # 智能体服务器（269 commits）
│   ├── agent-portal-web        # 智能体门户前端（71 commits）
│   ├── integration-platform    # 集成平台（367 commits）
│   └── deploy/                 # 部署配置（Docker/K8s）
│
├── Self-dev/                   # 个人开发与学习（6 个项目）
│   ├── ai-coding-practice      # AI 编程练习
│   ├── ai-coding-share         # 本次分享项目
│   ├── personal-study-project  # 个人学习（Python 等）
│   ├── agent-portal            # 智能体门户开发
│   ├── tech-research-md-agui   # AG-UI 协议研究（20 篇文档）
│   └── my-ideas-bid-assistant  # 竞价助手
│
├── Open-source-code/           # 开源分析（8 个项目）
│   ├── adp                     # AI 数据平台
│   ├── nanobot                 # 轻量 AI 助手框架
│   ├── ag-ui                   # AG-UI 协议
│   ├── cherry-studio           # AI 助手应用
│   ├── a2a-protocol            # Agent-to-Agent 协议
│   ├── shenyu                  # Apache ShenYu 网关
│   ├── MiroFish                # 数据可视化
│   └── datart                  # 数据分析工具
│
├── Gitee/                      # 日常开发（4 个仓库）
│   ├── java_daily_works        # Java Demo
│   ├── source-code-reading     # 源码阅读笔记
│   ├── daliy-docs              # 日常文档
│   └── mind_mapping            # 思维导图
│
└── Basic-lib/                  # 基础库
```

---

## 二、技术栈全景

### 后端（主力）
- **语言**: Java 8 / Java 17
- **框架**: Spring Boot 2.7.18, Spring WebFlux (Reactor)
- **ORM**: MyBatis Plus 3.4.2
- **数据库**: PostgreSQL, Neo4j（图数据库）
- **网关**: Apache ShenYu
- **构建**: Maven 多模块

### 前端
- **框架**: React, Vue 3
- **构建**: Webpack

### AI/数据
- **协议**: A2A（Agent-to-Agent）, AG-UI
- **RAG**: 自研 + Dify
- **模型**: OpenAI API, Claude API
- **Python**: FastAPI, LangGraph, LangChain

### 部署
- **容器**: Docker, Kubernetes
- **对象存储**: MinIO
- **CI/CD**: GitLab CI

---

## 三、使用 Claude Code 的项目分类

### 第一梯队：深度使用（有完整的 .claude 配置 + memory + rules）

| 项目 | 特点 | 配置亮点 |
|------|------|----------|
| **aip-portal** | 最活跃，24 个 worktree | 完整三层知识体系、3 次复盘记录、rules 从 5500→272 行 |
| **aip-gateway** | A2A 协议适配器 | Spring WebFlux 响应式编程，30+ 会话 |
| **ai-coding-share** | 本次分享 | 经验总结素材库 |

### 第二梯队：项目级配置（有 CLAUDE.md + rules）

| 项目 | 特点 |
|------|------|
| **aip-server** | HTTPS 配置、接口参数扩展 |
| **rag-server-py** | Python RAG 服务 |
| **ai-coding-practice** | ETF 监控、Learning Tutor Agent |
| **personal-study-project** | Python 学习路径、Learning Tutor Skill |
| **agent-portal** | 智能体门户版本 3 |

### 第三梯队：研究探索（会话记录为主）

| 项目 | 研究方向 |
|------|----------|
| **tech-research-md-agui** | AG-UI 协议完整文档体系（20 篇） |
| **tech-research-md-apache-calcite** | Apache Calcite 数据库框架 |
| **open-source-analysis-*** | 多个开源项目分析 |
| **nanobot/adp** | 开源项目源码解读 |

---

## 四、使用演进历程

### 阶段 1：探索期（2025.01 - 2026.03）
- 初步接触 Claude Code
- 在多个项目中尝试使用
- 积累基本使用经验
- 主要活动：aip-server 配置、gateway 开发、开源分析

### 阶段 2：深度实践期（2026.03 - 2026.04 上旬）
- aip-portal 项目全面采用 Claude Code
- 建立完整的 rules/ 知识体系
- 开始使用 worktree 并行开发
- 经历"蜜月期→翻车期→有序期"的典型过程
- 关键事件：rules 从 5500 行精简到 272 行

### 阶段 3：成熟期（2026.04 中旬至今）
- 建立系统化的工作流（Plan 模式 → Sub Agent → Agent Team）
- 开发自定义技能（guided-learning-tutor、retrospect）
- 使用 Agent Teams 进行多 Agent 协作
- 开始做经验分享准备

---

## 五、核心项目深度案例

### 案例 1：aip-portal（AI 门户后端）

**项目定位**: 企业级 AI 智能体门户，数字员工管理平台

**架构**:
```
aip-portal (Maven 多模块)
├── employee/       # 员工管理（数字员工 CRUD）
├── system/         # 系统管理（用户、角色、权限 RBAC）
├── operations/     # 运营管理（审核、反馈统计）
├── assistant/      # 智能助理（80万+ 行，最大模块）
├── external/       # 外部集成（ShenYu 网关、消息渠道）
└── common/         # 公共组件
```

**Claude Code 使用亮点**:
- 24 个 worktree 并行开发不同模块
- 完整的三层知识体系（全局 → 项目 → 会话）
- 3 次深度复盘，每次都提炼出可复用规则
- rules/ 从"大杂烩"到"精简索引"的演变

### 案例 2：aip-gateway（AI 网关）

**项目定位**: 基于 Apache ShenYu 的 AI 服务网关

**核心开发内容**:
- A2A 协议适配器插件开发
- SSE 流式响应修复
- 配置管理重构（从按智能体分组到按后端分组）
- JSON-RPC 2.0 规范符合性修复

**技术挑战**:
- Spring WebFlux 响应式编程
- SSE 事件格式包装
- 多种认证方式支持

### 案例 3：AG-UI 协议研究

**项目定位**: AG-UI 协议的完整学习和 Java SDK 开发

**产出**: 21 篇深度文档
```
00-AG-UI学习指南.md
01-AG-UI简介.md → 20-Java-SDK实战案例.md
AG-UI协议新手指南.md
```

**使用模式**: Claude Code 作为学习伙伴，系统化解读协议规范

### 案例 4：Learning Tutor Agent

**项目定位**: 多 Agent 架构的智能学习系统

**架构**:
```
TutorAgent (GPT-4.1)     → 主对话，苏格拉底方法引导
AssessorAgent (GPT-4o-mini) → 评估学生回答
CurriculumPlanner         → 学习路径规划
```

**技术栈**: LangGraph + FastAPI + TypedDict

---

## 六、Claude Code 配置体系

### 全局配置 (`~/.claude/`)

```
~/.claude/
├── CLAUDE.md              # 全局规则（Git 规范、配置级别、Shell 规范）
├── settings.json          # 主配置（API、权限、实验功能）
├── skills/                # 自定义技能
│   ├── guided-learning-tutor/  # 学习引导导师
│   └── retrospect/             # 复盘技能
├── teams/                 # 团队配置
│   └── digital-employee-team   # 数字员工门户重构团队
├── tasks/                 # 任务列表（95 个）
├── projects/              # 50 个项目记忆
├── plugins/               # 插件市场
└── history.jsonl          # 全局历史（1MB）
```

### 权限配置特点

**允许的操作（66 条白名单）**:
- Git 全套操作（status/log/diff/add/commit/push 等）
- Maven 构建（compile/test/package）
- 文件读写操作
- 数据库操作（PostgreSQL）
- 浏览器自动化（Playwright MCP）
- Web 搜索

**禁止的操作**:
- `git reset --hard`
- `git rebase`
- `rm -rf`
- 任何 `--force` 操作

**权限模式**: plan 模式（需确认后才执行）

### MCP 服务器

| 服务 | 用途 |
|------|------|
| Apifox MCP | API 文档集成（项目 ID: 5623238） |
| Playwright MCP | 浏览器自动化、系统调研 |
| Web Reader | 网页内容抓取 |

### 插件生态

| 插件 | 版本 | 状态 |
|------|------|------|
| superpowers | v4.0.3 | 已安装（AI 辅助开发工具集） |
| claude-mem | v9.0.12 | 已安装（记忆管理） |
| jdtls-lsp | v1.0.0 | 已安装（Java 语言服务器） |

---

*分析日期：2026-04-13*
