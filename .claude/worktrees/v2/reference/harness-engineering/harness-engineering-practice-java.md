# Harness Engineering 实操篇（Java 版）：从零开始，让 Harness 随 Spring Boot 项目"生长"

> **前置阅读**：[Harness Engineering 完全指南](./harness-engineering-guide.md)（了解基本概念）  
> **本文定位**：面向 Java / Spring Boot 开发者的 Harness 实操手册  
> **核心理念**：Harness 不是一次性工程，而是随项目演进逐步生长的有机体

---

## 目录

1. [核心方法论：Harness 是"长"出来的](#第一章核心方法论harness-是长出来的)
2. [从零生长：一个 Spring Boot 项目的 Harness 演进全记录](#第二章从零生长一个-spring-boot-项目的-harness-演进全记录)
3. [实操技巧：把 AI 的错误变成你的资产](#第三章实操技巧把-ai-的错误变成你的资产)
4. [存量改造：给已有 Java 项目装上 Harness](#第四章存量改造给已有-java-项目装上-harness)
5. [Claude Code 操作手册](#第五章claude-code-操作手册)
6. [快速行动清单](#第六章快速行动清单)

---

## 第一章：核心方法论——Harness 是"长"出来的

### 1.1 为什么"一步到位"行不通

很多文章会告诉你：创建 CLAUDE.md，写上项目规则，加上架构文档，然后就可以开始了。

**这是错误的。**

原因很简单：

1. **你不知道 AI 会犯什么错** —— 在项目开始时，你无法预测 AI 在你的 Spring Boot 项目中会犯哪些具体错误
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

接下来，我会通过一个完整的 Spring Boot 项目案例，**逐步展示每个阶段的具体操作**。

### 1.4 种子期的黄金法则：从三行开始

你的第一个 CLAUDE.md 应该只有三行：

```markdown
# TaskFlow

Spring Boot REST API 任务管理服务。使用 JPA + H2/MySQL 存储。
Java 17+，代码风格遵循 Google Java Style，测试用 JUnit 5 + MockMvc。
```

为什么是三行？因为这三行回答了 AI 最需要知道的三个问题：
1. **这是什么项目？**（TaskFlow —— 任务管理服务）
2. **用了什么技术？**（Spring Boot + JPA + H2/MySQL）
3. **怎样算"写得好"？**（Google Java Style + JUnit 5）

其他的一切——架构规则、命名约定、禁止事项——**等 AI 犯了错再加**。

---

## 第二章：从零生长——一个 Spring Boot 项目的 Harness 演进全记录

> 以下通过一个虚构但典型的项目 **TaskFlow**，完整展示 Harness 从 3 行到 300+ 行的生长过程。
> 每一条规则的添加，都对应一个真实的"AI 犯错 → 人类修正 → Harness 进化"事件。

### 2.1 Day 1：项目启动（种子期）

#### 项目背景
你要做一个任务管理 REST API：`POST /api/tasks`、`GET /api/tasks`、`PATCH /api/tasks/{id}`、`DELETE /api/tasks/{id}`。

#### 操作步骤

**Step 1：用 Spring Initializr 创建项目骨架**

```
taskflow/
├── CLAUDE.md                    ← 只有这一个 Harness 文件
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/example/taskflow/
│   │   │   ├── TaskflowApplication.java
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   └── entity/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/com/example/taskflow/
└── .gitignore
```

**Step 2：写下最小 CLAUDE.md**

```markdown
# TaskFlow

Spring Boot REST API 任务管理服务。使用 JPA + H2/MySQL 存储。
Java 17+，代码风格遵循 Google Java Style，测试用 JUnit 5 + MockMvc。
```

**Step 3：让 AI 开始工作**

你对 Claude Code 说：
> "实现创建任务的 API：POST /api/tasks，接受 JSON body 包含 title 字段，保存到数据库并返回创建的任务"

AI 生成了代码，能跑。但是……

#### 第一次犯错：AI 把业务逻辑写在了 Controller 里

AI 在 `TaskController` 中直接调用了 `TaskRepository`，跳过了 Service 层。所有的参数校验、业务规则都堆在 Controller 里。

**分析根因**：AI 缺少关于"分层架构"的上下文。对于简单 CRUD，AI 倾向于走最短路径。

**添加约束**：

```markdown
# TaskFlow

Spring Boot REST API 任务管理服务。使用 JPA + H2/MySQL 存储。
Java 17+，代码风格遵循 Google Java Style，测试用 JUnit 5 + MockMvc。

## 分层架构
- Controller：只做参数接收、调用 Service、返回响应，不含业务逻辑
- Service：所有业务逻辑在此，通过接口定义（如 TaskService 接口 + TaskServiceImpl）
- Repository：继承 JpaRepository，只做数据访问
- Entity：JPA 实体类，映射数据库表
```

**效果**：从此以后，AI 生成的代码自动遵循三层架构。

> **📝 生长记录**：CLAUDE.md 从 3 行 → 9 行。触发原因：业务逻辑写在 Controller。

#### 第二次犯错：AI 直接返回 Entity 对象给前端

AI 把 JPA Entity 直接作为 API 响应返回，导致数据库字段（如 `createdAt`、内部 ID 策略）直接暴露给前端。

**分析根因**：AI 不知道你要求 DTO/VO 分离。

**添加约束**：

```markdown
## 数据传输
- API 请求用 XxxRequest DTO（如 CreateTaskRequest）
- API 响应用 XxxResponse VO（如 TaskResponse）
- Entity 不直接暴露给 Controller 层
- DTO/VO 放在 dto/ 包下
```

然后你要求 AI 重构现有代码，引入 DTO 层。

**效果**：后续 AI 自动为每个 API 创建对应的 Request/Response 类。

> **📝 生长记录**：CLAUDE.md 从 9 行 → 15 行。触发原因：Entity 直接暴露给前端。

### 2.2 Week 2-4：功能增长（种子期 → 生长期过渡）

#### 第三次犯错：AI 的异常处理风格不一致

有的地方 `throw new RuntimeException`，有的地方返回 `ResponseEntity.status(404).body(...)`，有的地方用 `@ResponseStatus` 注解。

**添加约束**：

```markdown
## 异常处理
- 业务异常继承自定义基类 BusinessException（含 errorCode + message）
- 常见异常：TaskNotFoundException, DuplicateTaskException
- Controller 层不 try-catch，由全局 @RestControllerAdvice 统一处理
- 错误响应格式：{"code": "TASK_NOT_FOUND", "message": "任务不存在", "timestamp": "..."}
```

> **📝 生长记录**：CLAUDE.md 从 15 行 → 22 行。触发原因：异常处理方式混乱。

#### 第四次犯错：AI 写的测试不隔离、不用 MockBean

AI 写测试时直接启动完整 Spring Context、连真实数据库，测试又慢又互相依赖。

**添加约束**：

```markdown
## 测试规范
- Controller 测试：用 @WebMvcTest + MockMvc + @MockBean 注入 Service
- Service 测试：用 @ExtendWith(MockitoExtension.class) + @Mock/@InjectMocks
- Repository 测试：用 @DataJpaTest + 内嵌 H2
- 测试类命名：XxxTest（单元测试）、XxxIntegrationTest（集成测试）
- 每个测试方法独立，不依赖执行顺序
```

> **📝 生长记录**：CLAUDE.md 从 22 行 → 30 行。触发原因：测试慢且不稳定。

#### 此时的 CLAUDE.md 完整内容

```markdown
# TaskFlow

Spring Boot REST API 任务管理服务。使用 JPA + H2/MySQL 存储。
Java 17+，代码风格遵循 Google Java Style，测试用 JUnit 5 + MockMvc。

## 分层架构
- Controller：只做参数接收、调用 Service、返回响应，不含业务逻辑
- Service：所有业务逻辑在此，通过接口定义（如 TaskService 接口 + TaskServiceImpl）
- Repository：继承 JpaRepository，只做数据访问
- Entity：JPA 实体类，映射数据库表

## 数据传输
- API 请求用 XxxRequest DTO（如 CreateTaskRequest）
- API 响应用 XxxResponse VO（如 TaskResponse）
- Entity 不直接暴露给 Controller 层
- DTO/VO 放在 dto/ 包下

## 异常处理
- 业务异常继承自定义基类 BusinessException（含 errorCode + message）
- 常见异常：TaskNotFoundException, DuplicateTaskException
- Controller 层不 try-catch，由全局 @RestControllerAdvice 统一处理
- 错误响应格式：{"code": "TASK_NOT_FOUND", "message": "任务不存在", "timestamp": "..."}

## 测试规范
- Controller 测试：用 @WebMvcTest + MockMvc + @MockBean 注入 Service
- Service 测试：用 @ExtendWith(MockitoExtension.class) + @Mock/@InjectMocks
- Repository 测试：用 @DataJpaTest + 内嵌 H2
- 测试类命名：XxxTest（单元测试）、XxxIntegrationTest（集成测试）
- 每个测试方法独立，不依赖执行顺序
```

**注意看**：30 行，每一行都有来源。没有任何"预防性"规则。

### 2.3 Month 2：进入生长期（加入前端 + 微服务拆分）

项目需要加上用户认证（Spring Security + JWT）和通知模块。原来的单体开始变大。

#### 触发事件：单个 CLAUDE.md 开始不够用

当你让 AI 实现 Spring Security 集成时，它：
- 在 Controller 里直接做权限判断（跳过了 Security Filter）
- 用了和已有 API 不一致的响应格式
- JWT 的 secret 硬编码在 Java 代码中

问题不再是"单个规则缺失"，而是**信息太多，AI 在单个文件里找不到重点**。

#### 生长动作：拆分文档结构

```
taskflow/
├── CLAUDE.md                          ← 全局规则（精简为核心原则）
├── src/main/java/com/example/taskflow/
│   ├── controller/
│   │   └── CLAUDE.md                  ← Controller 层规范
│   ├── service/
│   │   └── CLAUDE.md                  ← Service 层规范
│   ├── security/
│   │   └── CLAUDE.md                  ← 安全模块规范
│   └── config/
├── src/test/
│   └── CLAUDE.md                      ← 测试规范
└── docs/
    └── ARCHITECTURE.md                ← 架构决策记录
```

**新的根 CLAUDE.md**（精简后）：

```markdown
# TaskFlow

任务管理 REST API，支持用户认证和任务 CRUD。

## 技术栈
- Spring Boot 3.2 + Java 17
- Spring Data JPA + MySQL（生产）/ H2（测试）
- Spring Security + JWT 认证
- Maven 构建，JUnit 5 + Mockito 测试

## 核心架构原则
- **三层架构**：Controller → Service → Repository，不可跨层
- **Service 层是唯一的业务逻辑层**：Controller 不含业务逻辑，Repository 不含业务规则
- **DTO 隔离**：Controller 层只接触 DTO/VO，不直接操作 Entity
- **统一异常处理**：@RestControllerAdvice 全局处理，Controller 不 try-catch

## 数据模型
Task: id(Long), title(String), status(TaskStatus枚举: PENDING/DONE), createdAt, updatedAt
User: id(Long), username(String), email(String), password(String/BCrypt)

## 配置管理
- application.yml：通用配置
- application-dev.yml / application-prod.yml：环境配置
- 敏感信息（JWT secret、DB密码）通过环境变量注入，不硬编码

详细规范见各子目录的 CLAUDE.md。
```

**controller/CLAUDE.md**：

```markdown
# Controller 层开发规范

## 路由规范
- RESTful 风格：资源名复数（/api/tasks, /api/users）
- 统一前缀 /api/v1/
- 使用 @RestController + @RequestMapping

## 方法签名
- 请求参数用 @Valid + XxxRequest DTO
- 返回值用 ResponseEntity<XxxResponse> 或 ResponseEntity<PageResponse<XxxResponse>>
- 分页接口用 Pageable 参数

## 权限控制
- 通过 @PreAuthorize 注解声明权限，不在代码中手动判断
- 获取当前用户通过 @AuthenticationPrincipal，不直接读 SecurityContext

## 错误处理
- Controller 不做 try-catch
- 参数校验失败由 @Valid 自动触发 MethodArgumentNotValidException
- 业务异常由 GlobalExceptionHandler 统一处理
```

**src/test/CLAUDE.md**：

```markdown
# 测试规范

## 测试分层
- Controller 测试（@WebMvcTest）：验证 HTTP 请求/响应、参数校验、安全配置
- Service 测试（Mockito）：验证业务逻辑，Mock 所有外部依赖
- Repository 测试（@DataJpaTest）：验证自定义查询、复杂 SQL
- 集成测试（@SpringBootTest）：端到端验证核心流程

## 通用规则
- 测试方法命名：should_预期结果_when_条件（如 should_return404_when_taskNotFound）
- 使用 @DisplayName 添加中文描述
- 测试间完全隔离：每个测试 @Transactional 自动回滚

## 测试数据
- 使用 @Sql 或 TestEntityManager 准备数据
- 不依赖其他测试的数据
- 不使用随机数据（保证可复现）
```

> **📝 生长记录**：从 1 个 CLAUDE.md（30行）→ 1 个根文件 + 3 个子文件。触发原因：AI 在单文件中找不到相关上下文，安全配置和业务代码交叉混乱。

### 2.4 Month 4：进入成熟期（微服务 + 事件驱动）

项目拆分为微服务架构：task-service、user-service、notification-service，通过 RabbitMQ 通信。

#### 触发事件：单次对话无法完成跨服务任务

你发现让 AI 在一次对话中完成"任务完成后发送通知"非常困难：
- 它需要同时修改 task-service 的事件发送、RabbitMQ 配置、notification-service 的消费者
- 中途容易忘记消息格式约定
- 生成的代码前后不一致

#### 生长动作：引入任务拆解 + 多步骤工作流

**新增 docs/ARCHITECTURE.md**（架构决策文档）：

```markdown
# TaskFlow 架构

## 系统架构图

```
                    ┌─── task-service ───┐
  客户端 → Gateway →├─── user-service ───┤→ MySQL
                    └─── notification ───┘
                            ↑
                       RabbitMQ（事件总线）
```

## 架构决策记录 (ADR)

### ADR-001：为什么从单体拆分为微服务
- 场景：通知模块独立扩展需求，任务服务和用户服务发布节奏不同
- 决策：拆分为 3 个 Spring Boot 服务
- 代价：引入分布式复杂性（事务、一致性）

### ADR-002：服务间通信方式
- 场景：任务完成后需要触发通知
- 决策：RabbitMQ 异步事件（而非 REST 同步调用）
- 原因：解耦服务，notification-service 故障不影响任务操作

### ADR-003：数据库策略
- 每个服务独立数据库 schema（逻辑隔离）
- 不允许跨服务直接查数据库
- 需要其他服务数据时通过 Feign Client 调用 API
```

**新增工作流约束**（根 CLAUDE.md 追加）：

```markdown
## 复杂任务工作流
当任务涉及多个模块/服务时，必须：
1. 先输出实施计划（哪些服务需要改，改动顺序）
2. 按 "Entity → Repository → Service → Controller → Test" 的顺序实施每个服务
3. 跨服务改动按 "事件定义 → 生产者 → 消费者" 的顺序
4. 每改完一个服务，先跑该服务的测试
5. 最后跑集成测试

## 数据库变更规则
- 所有 schema 变更必须通过 Flyway 迁移脚本
- 脚本放在 src/main/resources/db/migration/
- 命名：V1__create_task_table.sql, V2__add_priority_column.sql
- 不可手动修改已执行过的迁移脚本
```

#### 引入自动化检查（Harness 的"免疫系统"）

**新增 ArchUnit 架构测试**：

```java
// src/test/java/com/example/taskflow/ArchitectureTest.java

@AnalyzeClasses(packages = "com.example.taskflow")
class ArchitectureTest {

    @ArchTest
    static final ArchRule controllers_should_not_access_repositories =
        noClasses().that().resideInAPackage("..controller..")
            .should().accessClassesThat().resideInAPackage("..repository..")
            .because("Controller 必须通过 Service 层访问数据，不可跨层");

    @ArchTest
    static final ArchRule services_should_not_depend_on_controllers =
        noClasses().that().resideInAPackage("..service..")
            .should().dependOnClassesThat().resideInAPackage("..controller..")
            .because("Service 层不应该反向依赖 Controller 层");

    @ArchTest
    static final ArchRule entities_should_not_be_returned_by_controllers =
        noMethods().that().areDeclaredInClassesThat().resideInAPackage("..controller..")
            .should().haveRawReturnType(resideInAPackage("..entity.."))
            .because("Controller 应该返回 DTO/VO，不应直接返回 Entity");
}
```

**在 CLAUDE.md 中引用**：

```markdown
## 自动化架构检查
- 使用 ArchUnit 强制分层约束（见 ArchitectureTest.java）
- mvn test 会自动运行架构检查
- 规则：Controller 不访问 Repository、Service 不依赖 Controller、Controller 不返回 Entity
- 所有 PR 必须通过架构检查
```

> **📝 生长记录**：新增架构文档、工作流约束、ArchUnit 自动化检查。触发原因：微服务架构下 AI 频繁跨层、忘记前置决策。

### 2.5 Harness 生长时间线总览

```
Day 1          Week 2         Week 4         Month 2        Month 4
  │              │              │              │              │
  ▼              ▼              ▼              ▼              ▼
┌──────┐   ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌────────────┐
│3 行   │   │15 行     │  │30 行      │  │分层文档    │  │架构约束    │
│最小   │   │+ DTO     │  │+ 异常处理 │  │+ 子目录   │  │+ ArchUnit  │
│种子   │   │  分层    │  │+ 测试规范 │  │  CLAUDE.md│  │+ Flyway    │
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

不是所有 AI 犯的错误都值得加入 Harness。以下是 Java/Spring Boot 项目的分类框架：

| 错误类型 | 典型示例 | 频率 | 应对策略 |
|---------|---------|------|---------|
| **上下文缺失** | 不知道用哪个 Spring Starter | 几乎每次 | 在 CLAUDE.md 写明技术栈和依赖 |
| **规则不明** | 不知道你用 Lombok 还是手写 getter | 前几次 | 犯过一次就加规则 |
| **架构偏离** | Controller 直接调 Repository | 项目变大后 | 分层文档 + ArchUnit |
| **一致性漂移** | 有的用 @Autowired 有的用构造器注入 | 多次对话后 | 统一规范 + 代码示例 |
| **幻觉** | 编造不存在的 Spring Boot 配置项 | 随机发生 | 明确列出关键配置项 |
| **偶发错误** | 少了一个 @Override | 偶尔 | **不要加规则**，直接修复 |

> **黄金法则：如果一个错误只发生一次且不太可能再发生，直接修复它，不要加规则。过多规则带来的阅读成本比偶发错误更大。**

### 3.2 如何把错误转化为有效约束

#### 坏的约束 vs 好的约束

**❌ 坏的约束**（模糊、不可操作）：

```markdown
- 写高质量的 Java 代码
- 注意异常处理
- 保持代码整洁
- 遵循 Spring Boot 最佳实践
```

AI 看到这些约束会怎么做？和没看到一样。因为这些描述太模糊了，无法指导具体行为。

**✅ 好的约束**（具体、可验证）：

```markdown
- 依赖注入统一用构造器注入（配合 @RequiredArgsConstructor），不用 @Autowired 字段注入
- HTTP 错误响应格式：{"code": "TASK_NOT_FOUND", "message": "...", "timestamp": "2024-01-01T00:00:00Z"}
- 数据库查询用 Spring Data JPA 方法命名查询或 @Query(JPQL)，禁止原生 SQL 拼接
- 新增 REST 端点必须在 Controller 方法上添加 @Operation（Swagger 描述）
```

#### 约束转化公式

```
错误现象 → 根因分析 → 你期望的行为 → 最小约束文本
```

**Java/Spring Boot 常见实例**：

| 错误现象 | 根因 | 期望行为 | 约束文本 |
|---------|------|---------|---------|
| AI 用 @Autowired 字段注入 | 不知道团队偏好 | 构造器注入 | `依赖注入：构造器注入 + @RequiredArgsConstructor，不用 @Autowired` |
| AI 用 System.out.println | 不知道日志方案 | 用 SLF4J | `日志用 @Slf4j（Lombok）+ log.info/error，不用 System.out` |
| AI 把配置写在代码里 | 不知道配置方式 | application.yml | `配置项放 application.yml，用 @Value 或 @ConfigurationProperties 读取。密钥只用环境变量` |
| AI 返回 Entity 给前端 | 不知道 DTO 规范 | DTO 分离 | `Controller 返回 DTO/VO，用 MapStruct 做 Entity↔DTO 转换` |
| AI 写了 2000 行的 Service | 不知道拆分标准 | 单一职责 | `Service 类不超过 300 行。超过时按业务维度拆分（如 TaskQueryService / TaskCommandService）` |

### 3.3 文档长度与信息密度的平衡

#### CLAUDE.md 的理想长度

| 项目规模 | 根 CLAUDE.md | 子目录 CLAUDE.md | 总 Harness 文档量 |
|---------|-------------|-----------------|-----------------|
| 小型（单模块 Spring Boot） | 10-30 行 | 无 | < 30 行 |
| 中型（多模块 / 前后端分离） | 30-60 行 | 各 15-30 行 | < 200 行 |
| 大型（微服务 / 多团队） | 40-80 行 | 各 20-40 行 | < 500 行 |

**超过这个范围说明你的约束不够精炼，或者项目该拆分了。**

#### 信息密度的技巧

**1. 用"做/不做"对比代替长段描述**：

```markdown
## 依赖注入
- ✅ @RequiredArgsConstructor + private final XxxService xxxService;
- ❌ @Autowired private XxxService xxxService;
- ❌ new XxxServiceImpl() 手动创建
```

这比写一段话"依赖注入应该使用构造器注入方式，配合 Lombok 的 @RequiredArgsConstructor 注解"有效10倍。

**2. 用代码模板代替规则描述**：

与其写"Service 层方法应该有事务注解，接受 DTO 参数，返回 VO 对象，处理业务异常"，不如：

```markdown
## Service 层方法模板
```java
@Transactional
public TaskResponse createTask(CreateTaskRequest request) {
    if (taskRepository.existsByTitle(request.getTitle())) {
        throw new DuplicateTaskException("任务已存在: " + request.getTitle());
    }
    Task task = taskMapper.toEntity(request);
    task = taskRepository.save(task);
    return taskMapper.toResponse(task);
}
```
```

**3. 优先级标注**：

```markdown
## 规则（按重要性排列）
### 🔴 必须遵守
- 三层架构：Controller → Service → Repository，不可跨层
- 不在代码中硬编码密钥和密码

### 🟡 强烈建议
- 新功能先写测试，再写实现（TDD）
- Entity 和 DTO 之间用 MapStruct 转换

### 🟢 有则更好
- Commit message 用约定式提交（feat:、fix:、docs:）
- 方法上加 Javadoc 注释
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
你："这个 Controller 直接注入了 TaskRepository，违反了分层原则。请改为注入 TaskService。"
AI：修正代码
你：（记录：这类跨层调用问题出现了第2次，待观察）
——下次又出现——
你：加入 CLAUDE.md："Controller 只能注入 Service，不能直接注入 Repository"
```

#### 方式二：代码审查驱动（系统性）

每次 AI 完成一个功能后，做一次快速审查：

```markdown
审查清单：
□ 是否遵循了三层架构？（Controller → Service → Repository）
□ 是否有对应的测试？（单元 + 集成）
□ 异常处理是否走全局 @RestControllerAdvice？
□ 是否引入了新的依赖？（需要更新 pom.xml）
□ 是否修改了数据库 schema？（需要 Flyway 迁移脚本）
□ 新 API 是否有 Swagger 文档？
```

#### 方式三：ArchUnit 自动化检查（持续性）

```java
@AnalyzeClasses(packages = "com.example.taskflow")
class HarnessArchitectureTest {

    @ArchTest
    static final ArchRule layer_dependencies = layeredArchitecture()
        .consideringAllDependencies()
        .layer("Controller").definedBy("..controller..")
        .layer("Service").definedBy("..service..")
        .layer("Repository").definedBy("..repository..")
        .layer("Entity").definedBy("..entity..")
        .layer("DTO").definedBy("..dto..")
        .whereLayer("Controller").mayOnlyAccessLayers("Service", "DTO")
        .whereLayer("Service").mayOnlyAccessLayers("Repository", "Entity", "DTO")
        .whereLayer("Repository").mayOnlyAccessLayers("Entity");

    @ArchTest
    static final ArchRule no_field_injection =
        noFields().should().beAnnotatedWith(Autowired.class)
            .because("使用构造器注入，不使用 @Autowired 字段注入");

    @ArchTest
    static final ArchRule services_should_have_interface =
        classes().that().resideInAPackage("..service.impl..")
            .should().implement(resideInAPackage("..service.."))
            .because("Service 实现类必须实现对应接口");
}
```

这比 Shell 脚本检查**强得多**——它是编译时的、精确的、可持续运行的。

#### 方式四：周期性 Harness 审计（定期）

每隔 2-4 周回顾一次 CLAUDE.md：

1. **删除过时规则**：技术栈变了、项目结构调整了、某些规则不再适用
2. **合并重复规则**：多次迭代可能产生了重复或矛盾的规则
3. **评估有效性**：哪些规则确实减少了 AI 的错误？哪些形同虚设？
4. **检查遗漏**：最近有没有反复纠正 AI 的同类问题，但还没加入 Harness？

> **关键原则：Harness 也有"保质期"。不再适用的规则要及时删除，否则它们会变成噪音，降低有效规则的信号强度。**

---

## 第四章：存量改造——给已有 Java 项目装上 Harness

> 这是很多人最头疼的问题：项目已经存在了，代码已经写了几万行，现在要让 AI 助手参与进来，怎么建 Harness？

### 4.1 存量改造的核心思路

**不要试图一次性为整个项目建立完整的 Harness。**

存量项目改造遵循"诊断 → 最小介入 → 逐步完善"的医学思维：

```
  ① 诊断：让 AI 做一个小任务，观察它犯什么错
  ② 最小介入：只添加解决当前问题的约束
  ③ 扩大范围：让 AI 做更多类型的任务
  ④ 逐步完善：每次犯错都让 Harness 长一点
```

### 4.2 实战案例：传统 SSM 电商后台的 Harness 改造

> 以下基于一个典型的 Spring MVC + MyBatis + MySQL 电商后台系统，展示存量改造的具体步骤。

#### 项目现状

```
mall-admin/
├── src/main/java/com/mall/
│   ├── controller/           ← Spring MVC Controller
│   ├── service/              ← 业务逻辑（部分直接操作 DAO）
│   ├── dao/                  ← MyBatis Mapper 接口
│   ├── entity/               ← 实体类（部分直接暴露给前端）
│   ├── config/               ← Spring 配置类
│   ├── util/                 ← 工具类（一个 2000 行的 CommonUtil）
│   └── interceptor/          ← 拦截器
├── src/main/resources/
│   ├── mapper/               ← MyBatis XML 映射文件
│   ├── application.yml       ← ⚠️ 含硬编码数据库密码
│   └── static/               ← 静态资源
├── pom.xml
└── src/test/                  ← 几乎没有测试
```

**特点**：
- 没有 CLAUDE.md（AI 每次都在"裸奔"）
- `application.yml` 里硬编码了数据库密码（安全隐患）
- 没有 DTO 层，Entity 直接返回给前端
- `CommonUtil` 是个 2000 行的"万能工具类"
- 几乎没有单元测试
- 代码量 ~15000 行

#### Step 1：诊断性任务

先让 AI 做一个小任务来暴露问题：

> "请为 mall-admin 添加一个功能：商品列表支持按价格区间筛选"

观察 AI 的输出，它大概率会：
- ❌ 在 Controller 里直接写 SQL 查询条件拼接（不知道项目用 MyBatis）
- ❌ 直接修改 Entity 添加字段（不知道 Entity 是和数据库表映射的）
- ❌ 不写测试（不知道项目的测试策略）
- ✅ 能正确使用 @RequestParam 接收参数（这是通用知识）

#### Step 2：创建最小 CLAUDE.md

基于诊断结果，写第一版 CLAUDE.md：

```markdown
# Mall Admin

Spring Boot 电商后台管理系统。Spring MVC + MyBatis + MySQL。

## 技术栈
- Spring Boot 2.7 + Java 11
- MyBatis（XML映射文件在 resources/mapper/）
- MySQL 8.0
- 无前端框架（Thymeleaf 模板 + jQuery）

## 项目结构
- controller/：Spring MVC 控制器，返回 JSON 或页面
- service/：业务逻辑层（接口 + impl 分离）
- dao/：MyBatis Mapper 接口，对应 resources/mapper/*.xml
- entity/：数据库实体类

## 关键约定
- 新增数据库查询：在 Mapper 接口声明方法 + mapper XML 写 SQL
- 不用 JPA/Hibernate，本项目用 MyBatis
- ⚠️ application.yml 中的数据库密码即将迁移为环境变量，新代码不要依赖硬编码值
```

这只是一个起点——大概 16 行，专注于"AI 最需要知道的信息"。

#### Step 3：逐步完善

在后续使用中，每次 AI 犯错就追加规则：

**犯错：AI 在 Service 实现类中直接 new 了另一个 Service**
```markdown
## 依赖注入
- 所有依赖通过 Spring 注入（@Autowired 或构造器），不要手动 new
- Service 间可以互相注入，但要注意避免循环依赖
```

**犯错：AI 用 MyBatis 注解写 SQL，没发现项目用 XML**
```markdown
## MyBatis 使用
- SQL 写在 resources/mapper/ 下的 XML 文件中
- 不用 @Select/@Insert 等注解方式
- 复杂查询用 <if>/<choose> 动态 SQL
- 分页用 PageHelper 插件（已配置）
```

**犯错：AI 直接返回 Entity 列表，包含敏感字段（如密码 hash）**
```markdown
## 数据返回
- 列表 API 返回 VO 对象，不直接返回 Entity
- 特别注意：User 相关查询必须排除 password 字段
- 使用 BeanUtils.copyProperties 或手动映射
```

### 4.3 实战案例：Spring Cloud 微服务系统的 Harness 改造

> 这是一个更复杂的项目：Spring Cloud + Nacos + Gateway + Feign，已有 5 个微服务，代码量 50000+ 行。

#### 项目现状

```
order-platform/
├── gateway-service/           ← Spring Cloud Gateway
├── user-service/              ← 用户服务
│   ├── src/main/java/com/platform/user/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/       ← Spring Data JPA
│   │   ├── entity/
│   │   ├── dto/              ← 有 DTO！
│   │   ├── feign/            ← Feign Client
│   │   └── config/
│   └── src/main/resources/
├── order-service/             ← 订单服务
├── product-service/           ← 商品服务
├── payment-service/           ← 支付服务
├── common/                    ← 公共模块
│   ├── common-core/          ← 基础类、工具
│   ├── common-security/      ← 安全配置
│   └── common-swagger/       ← Swagger 配置
├── pom.xml                    ← 父 POM
├── README.md                  ← 有 README！
└── docs/
    ├── API.md                 ← 有 API 文档！
    └── deploy.md
```

**优势**（已有的好基础）：
- 清晰的微服务拆分和目录结构
- 有 common 公共模块提取共性
- 有 DTO 层分离
- 有 README 和 API 文档

**缺失**：
- 没有 CLAUDE.md（AI 不知道微服务间的协作规则）
- 服务间的调用约定没有文档化
- 各服务应该用哪些 common 模块缺乏说明

#### Step 1：利用项目已有资产

这个项目的关键不同在于：**它已经有好的架构，只是没有告诉 AI**。

所以改造策略不是"从零建设"，而是"把隐性知识显性化"。

**方法：让 AI 先阅读项目，然后你修正它的理解。**

> "请阅读 order-platform 项目的代码结构，总结你对微服务架构的理解，特别是：
> 1. 五个服务各自的职责
> 2. 服务间如何通信
> 3. common 模块分别提供什么能力
> 4. 你认为修改代码时需要注意什么"

AI 会给出它的理解，然后你修正错误、补充遗漏。这个过程本身就是在创建 CLAUDE.md 的素材。

#### Step 2：创建根 CLAUDE.md

```markdown
# Order Platform

电商订单平台，Spring Cloud 微服务架构。

## 技术栈
- Spring Boot 3.1 + Spring Cloud 2022 + Java 17
- 注册中心：Nacos
- 网关：Spring Cloud Gateway
- 服务调用：OpenFeign
- 数据库：MySQL 8 + Spring Data JPA + Flyway
- 缓存：Redis（Spring Cache）
- 构建：Maven 多模块

## 服务清单
| 服务 | 职责 | 端口 |
|------|------|------|
| gateway-service | API 网关，路由 + 鉴权 | 8080 |
| user-service | 用户注册/登录/信息管理 | 8081 |
| order-service | 订单创建/查询/状态管理 | 8082 |
| product-service | 商品 CRUD + 库存管理 | 8083 |
| payment-service | 支付对接 + 回调处理 | 8084 |

## 核心约定
- **服务间通信**：通过 OpenFeign Client，不直接查其他服务的数据库
- **公共模块**：common-core（基础类）、common-security（JWT鉴权）、common-swagger
- **配置管理**：Nacos 配置中心，敏感信息通过环境变量注入
- **数据库迁移**：每个服务独立 Flyway 迁移（resources/db/migration/）
- **API 版本**：统一 /api/v1/ 前缀

## 修改代码时注意
- 修改 common 模块后，所有依赖它的服务都要重新验证
- 新增 Feign Client 时要在 common-core 中定义接口
- 不要跨服务直接访问数据库
```

#### Step 3：为核心服务创建专属指南

```markdown
# order-service/CLAUDE.md

## 订单服务开发规范

### 核心流程
下单流程：校验库存(Feign→product-service) → 创建订单 → 扣减库存 → 创建支付单(Feign→payment-service)

### 状态机
OrderStatus: PENDING → PAID → SHIPPED → COMPLETED / CANCELLED
- 状态变更必须通过 OrderStateMachine，不要直接 setStatus()
- 每次状态变更记录到 order_status_log 表

### Feign 调用
- 调用 product-service：使用 ProductFeignClient（定义在 common-core）
- 调用 payment-service：使用 PaymentFeignClient
- 所有 Feign 调用必须有 fallback 降级处理

### 禁止事项
- 不要在 order-service 中直接查 user 表或 product 表
- 不要在 Controller 中做订单状态校验，统一在 Service 层
- 不要跳过状态机直接修改订单状态
```

> **存量改造的核心原则：不是从零建设，而是把项目已有的"隐性知识"转化为 AI 可理解的"显性规则"。**

### 4.4 存量改造中的常见问题

#### Q1：要不要用 /memory 命令先生成一堆项目记忆？

**不建议一次性生成大量记忆。** 原因：
- AI 生成的记忆往往是"正确但无用"的（比如"这个项目用 Spring Boot"）
- 真正有价值的是**你的决策和偏好**，而不是代码结构的机械描述
- 大量低质量记忆会稀释高质量信号

**推荐做法**：
1. 手动写 CLAUDE.md（10-20 行起步），专注于"AI 不看代码就猜不到的信息"
2. 然后正常使用 AI 做开发任务
3. 每次 AI 犯错时，判断是否需要加规则
4. 每 2-4 周清理一次，删除无效规则

#### Q2：已有的 README.md 和 API 文档够用吗？

**不够，但很有价值。** 区别：
- **README.md** 面向人类读者，讲"这个项目是什么"
- **API.md** 面向人类读者，讲"接口怎么调用"
- **CLAUDE.md** 面向 AI，讲"你在这个项目里应该怎么做"

CLAUDE.md 的内容更偏向**操作指令**：不是解释为什么这么设计，而是告诉 AI "你必须这样做"。

但已有的 README 和 API 文档可以作为 CLAUDE.md 的信息来源——从中提炼出对 AI 有指导意义的关键信息。

#### Q3：项目代码质量不高，要先重构再加 Harness 吗？

**不要。** 先加 Harness，再用 Harness 辅助重构。

策略：
1. 先为**现状**写 CLAUDE.md（如实描述当前的架构，即使它不完美）
2. 在 CLAUDE.md 中标注**技术债务**和**计划中的改进**
3. 让 AI 在遵循现有架构的前提下做改动
4. 逐步用 AI 辅助重构，每次重构后更新 CLAUDE.md

```markdown
## 技术债务（计划中）
- [ ] CommonUtil 2000 行 → 按职责拆分（StringUtil、DateUtil、HttpUtil）
- [ ] Entity 直接返回前端 → 引入 DTO/VO 层 + MapStruct
- [ ] application.yml 硬编码密码 → 迁移到 Nacos 配置中心
- [ ] 缺少单元测试 → 逐步补充核心 Service 的测试

## 当前架构（临时）
注意：部分 Service 直接操作了 DAO 和返回 Entity。
重构完成前，新代码也遵循这个模式，但新增 API 要求使用 VO 返回。
```

#### Q4：多模块 Maven 项目，CLAUDE.md 放哪里？

```
order-platform/
├── CLAUDE.md              ← 全局：微服务整体架构、通信规则
├── common/
│   └── CLAUDE.md          ← 公共模块修改注意事项
├── order-service/
│   └── CLAUDE.md          ← 订单服务专属规范
├── user-service/
│   └── CLAUDE.md          ← 用户服务专属规范
└── ...
```

**原则**：Claude Code 在处理某个服务的代码时，会读取根 CLAUDE.md + 该服务的 CLAUDE.md，形成"全局 + 局部"的双层规范。

---

## 第五章：Claude Code 操作手册

### 5.1 CLAUDE.md 配置最佳实践

#### 文件放置位置（Java 项目）

```
项目根目录/
├── CLAUDE.md                        ← Claude Code 自动读取的入口文件
├── .claude/
│   ├── settings.local.json           ← 工具权限配置
│   └── commands/                     ← 自定义斜杠命令
│       ├── add-feature.md
│       └── code-review.md
├── src/main/java/com/example/
│   ├── controller/
│   │   └── CLAUDE.md                ← Controller 层规范
│   ├── service/
│   │   └── CLAUDE.md                ← Service 层规范
│   └── ...
├── src/test/
│   └── CLAUDE.md                    ← 测试规范
└── docs/
    └── ARCHITECTURE.md               ← CLAUDE.md 中可以引用
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
Spring Boot 版本、Java 版本、核心依赖    ← ② 技术上下文

## 核心架构 / 项目结构
分层说明、模块关系                      ← ③ 结构地图

## 开发规范
命名、注入方式、异常处理等               ← ④ 行为规则

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
1. 扫描项目结构（识别 Maven/Gradle、Spring Boot 版本）
2. 分析技术栈（识别 JPA/MyBatis、安全框架）
3. 生成初始 CLAUDE.md 草稿
4. 创建 .claude/ 配置目录
```

**⚠️ 重要**：不要直接使用生成的 CLAUDE.md。你应该：
1. 阅读生成的内容
2. 删除"正确但无用"的信息（如"这个项目有 pom.xml"）
3. 补充 AI 无法从代码推断的信息（你的偏好、决策原因、禁止事项）
4. 精简到 30 行以内

#### /harness-plan：规划复杂任务

```
> /harness-plan 添加用户认证功能（Spring Security + JWT）

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
- 运行 mvn test 验证
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

请按以下步骤为 Spring Boot 项目添加新功能：

1. 阅读 CLAUDE.md 了解项目架构和规范
2. 分析新功能涉及的模块和层
3. 如果涉及数据库变更，先写 Flyway 迁移脚本
4. 按 Entity → Repository → Service → Controller 的顺序实现
5. 为每层编写对应测试
6. 运行 mvn test 确保所有测试通过
7. 运行 ArchUnit 架构测试确保无违规
8. 更新 CLAUDE.md（如果新功能引入了新的架构模式）
```

使用时：`/add-feature 支持任务标签功能（多对多关系）`

**`.claude/commands/harness-audit.md`**：

```markdown
# Harness 审计

请审查当前 Spring Boot 项目的 Harness 体系：

1. 阅读所有 CLAUDE.md 文件
2. 对比实际代码，检查：
   - 哪些规则已经过时（依赖版本变了、架构调整了）
   - 哪些常见问题还没有对应规则
   - 有没有规则互相矛盾
   - ArchUnit 测试是否覆盖了所有 CLAUDE.md 中的架构规则
3. 输出审计报告，包含：
   - 建议删除的规则
   - 建议新增的规则
   - 建议新增的 ArchUnit 测试
```

使用时：每 2-4 周运行一次 `/harness-audit`

**`.claude/commands/add-api.md`**（Java 项目专用）：

```markdown
# 添加 REST API

参数: $ARGUMENTS（API 描述，如"GET /api/v1/tasks/{id}/comments 获取任务评论列表"）

请按以下步骤添加新的 REST API：

1. 阅读 CLAUDE.md 和 controller/CLAUDE.md
2. 创建/更新 DTO：XxxRequest（入参）+ XxxResponse（出参）
3. 创建/更新 Entity（如需新表，先写 Flyway 迁移）
4. 创建/更新 Repository（JPA 方法 或 @Query）
5. 在 Service 接口中声明方法，在 ServiceImpl 中实现
6. 在 Controller 中添加端点，加上 @Operation（Swagger 描述）
7. 编写测试：Controller(@WebMvcTest) + Service(Mockito)
8. 运行 mvn test -pl 当前模块
```

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
- **Agent Memory**：个人通用偏好（如"我用 IntelliJ IDEA"、"回复我用中文"、"我偏好构造器注入"）

**不要把项目约束存在 Agent Memory 里**——因为它无法版本控制、无法团队共享、也容易在跨项目时产生冲突。

---

## 第六章：快速行动清单

### 新项目（Spring Boot 从零开始）

```
□ 1. 用 Spring Initializr 创建项目
□ 2. 创建 CLAUDE.md，写 3 行（项目名、技术栈、代码规范）
□ 3. 让 AI 实现第一个 CRUD API
□ 4. 审查 AI 输出，记录不符合预期的地方
□ 5. 把高频问题转化为 CLAUDE.md 中的规则
□ 6. 重复 3-5，直到 AI 的输出稳定符合你的期望
□ 7. 项目变大后：拆分子目录 CLAUDE.md + 添加 ArchUnit 测试
□ 8. 微服务后：每个服务独立 CLAUDE.md + 根目录全局规范
```

### 存量项目（已有 Java 代码）

```
□ 1. 让 AI 做一个诊断性小任务，观察它犯什么错
□ 2. 创建 CLAUDE.md（15-20 行），重点描述：
     - 项目是什么 + 技术栈（Spring Boot版本、ORM框架、构建工具）
     - 项目结构（各 package 的职责）
     - AI 最需要知道的 2-3 条规则（如"用 MyBatis 不用 JPA"）
□ 3. 让 AI 重新做诊断任务，验证效果
□ 4. 正常开发，每次 AI 犯错就追加规则
□ 5. 项目稳定后添加 ArchUnit 架构测试固化规则
□ 6. 每 2-4 周做一次 Harness 审计（删除过时规则、补充遗漏）
```

### Harness 规则质量检查

写完一条新规则后，用这三个问题检验：

```
✓ 这条规则是否源自一次具体的 AI 犯错事件？
  → 如果不是，它很可能是"预防性猜测"，先不加。

✓ AI 读到这条规则后，行为是否会明确改变？
  → 如果不会（比如"写高质量代码"），这条规则无效。

✓ 这条规则是否可以被验证（自动或手动）？
  → 如果可以用 ArchUnit 自动验证，立即加一个架构测试。
```

### Java 项目专属检查项

```
✓ 是否明确了 ORM 框架？（JPA / MyBatis / MyBatis-Plus）
  → AI 最容易在这里犯错，因为三者写法完全不同。

✓ 是否明确了依赖注入方式？（构造器 / @Autowired / @Resource）
  → 不统一会导致风格混乱。

✓ 是否明确了构建工具和常用命令？
  → mvn clean package -DskipTests 还是 gradle build？

✓ 是否说明了配置文件结构？
  → application.yml 的 profile 策略、Nacos 配置中心使用方式。
```

---

## 结语：Harness 工程的本质

Harness 工程不是一个"项目配置"任务，而是一种**持续的工程实践**。

它的本质是：**建立你和 AI 之间的工作契约，然后随着合作的深入不断修订这份契约。**

就像带一个新人入职你的 Spring Boot 项目：
- 第一天你告诉他"我们用 JPA，不用 MyBatis"
- 他写了个 @Autowired 字段注入，你告诉他"我们用构造器注入"
- 过了一个月他知道了大部分规矩
- 但偶尔还是会把 Entity 直接返回给前端
- 你把最重要的规矩写进了项目 Wiki 和 ArchUnit 测试

AI 助手也是一样。只是它的"项目 Wiki"叫 CLAUDE.md，它的"架构约束"叫 ArchUnit 测试，它的"代码检查"叫 CI/CD Pipeline。

**起步时给三行规则，用起来再加，犯错了就补，能自动化就自动化。这就是 Java 项目 Harness 工程的全部秘密。**
