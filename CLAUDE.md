# 项目背景
我需要为部门同事讲解交流我在 AI 编程方面的经验和实践，主题为《Java开发中的 AI 协作编程实践》
预计时长1.5小时，本项目中，我需要制作PPT材料及全过程文案。

听众为部门开发人员，其中30%有一定ai编程经验，期待一定进阶提升内容；60%左右刚开始实践ai编程，期待听到一些经验教训、期待得到技巧提升。10%左右尚未全面切换到ai编程。

计划：演讲内容大部分围绕一些java项目的实践经历进行，也可以少量引入一些其他项目实践。

# 项目目录
- my-ideas 存放我的一些想法片段，和我的一些工作记录片段
- reference 目录下存放我日常收集的一些ai编程方面的参考资料
- output 存放输出的产物，如ppt，文案脚本等。

# 项目案例信息搜集方法

当需要从实际项目中搜集演讲素材时，按以下步骤操作：

## 1. 定位 Git 提交范围
让用户提供关键 commit ID（起始和结束），然后分析提交范围：
```bash
# 查看提交列表
git log --oneline <start>..<end>
# 查看提交数量
git log --oneline <start>..<end> | wc -l
# 查看时间范围
git log --format="%ai" <start>..<end> | head -1 / tail -1
# 查看跨越天数
git log --format="%ai" <start>..<end> | cut -c1-10 | sort -u
# 查看变更统计
git diff --shortstat <start>..<end>
# 查看特定模块变更
git diff --stat <start>..<end> | grep "模块路径"
# fix 提交数量
git log --oneline <start>..<end> | grep -c "fix"
```

## 2. 查看 .claude 项目配置
从项目目录的 `.claude/` 中获取 Harness 配置：
- `CLAUDE.md`：项目导航和核心约定
- `rules/`：核心约束文件（行数、内容、结构）
- `settings.local.json`：权限配置

## 3. 查看 Claude 记忆和复盘记录
在 `C:\Users\10179\.claude\projects\` 下查找项目记忆：
- 项目路径编码规则：`D:\GitCode\gitlab\aip-server` → `D--GitCode-gitlab-aip-server`
- `memory/MEMORY.md`：记忆索引
- `memory/feedback-*.md`：复盘记录（含"做对了/做错了/改进方向"）
- `memory/rules-file-management.md`：rules 管理经验
- `sessions-index.json`：会话索引（可了解会话数量）

## 4. 查看 Git 历史中的文件状态
查看特定历史 commit 下的文件结构：
```bash
# 列出某 commit 下的文件
git ls-tree -r <commit> --name-only .claude/rules/
# 查看文件大小
git ls-tree -r <commit> --long .claude/rules/
# 找最大文件
git ls-tree -r <commit> --long .claude/rules/ | sort -rn -k4 | head -10
```

## 5. 关联项目目录
实际项目位置：
- `D:\GitCode\gitlab\aip-server` — AI 智能平台后端服务
- `D:\GitCode\gitlab\aip-portal` — 智能体门户
- `D:\GitCode\gitlab\aip-gateway` — 智能体消息网关

