#!/bin/bash
# Harness 自动化工作流脚本
# 运行多 Agent 协作流程

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置
MAX_ITERATIONS=3
PLAN_FILE="plans/current-task.md"
EVAL_FILE="evals/current-task.md"

echo "========================================"
echo "    Harness 自动化工作流"
echo "========================================"
echo ""

# 检查必要文件
if [ ! -f "$PLAN_FILE" ]; then
    echo -e "${RED}错误：找不到计划文件 $PLAN_FILE${NC}"
    echo "请先让 Planner Agent 制定计划"
    exit 1
fi

# 获取当前迭代次数
ITERATION=1
if [ -f ".harness-iteration" ]; then
    ITERATION=$(cat .harness-iteration)
fi

echo -e "${YELLOW}当前迭代: $ITERATION / $MAX_ITERATIONS${NC}"
echo ""

# 阶段 1: Generator 执行
echo "========================================"
echo "阶段 1: Generator 执行"
echo "========================================"
echo ""

# 检查是否还有未完成的任务
if grep -q "\[ \]" "$PLAN_FILE"; then
    echo "发现未完成任务，Generator 开始执行..."
    # 这里会调用 Generator Agent
    # 实际使用时，需要手动或通过 API 调用 Claude
    echo -e "${YELLOW}提示：请手动运行 Generator Agent${NC}"
    echo "指令：'你现在是 Generator Agent，请实现 $PLAN_FILE 中的任务'"
    echo ""
    read -p "Generator 完成后按回车继续..."
else
    echo -e "${GREEN}所有任务已完成${NC}"
fi

# 阶段 2: Evaluator 评估
echo ""
echo "========================================"
echo "阶段 2: Evaluator 评估"
echo "========================================"
echo ""

echo "Evaluator 开始评估..."
echo -e "${YELLOW}提示：请手动运行 Evaluator Agent${NC}"
echo "指令：'你现在是 Evaluator Agent，请评估刚才的代码实现'"
echo ""
read -p "Evaluator 完成后按回车继续..."

# 阶段 3: 处理评估结果
echo ""
echo "========================================"
echo "阶段 3: 处理评估结果"
echo "========================================"
echo ""

if [ ! -f "$EVAL_FILE" ]; then
    echo -e "${RED}错误：找不到评估报告 $EVAL_FILE${NC}"
    exit 1
fi

# 检查是否通过
if grep -q "是否通过.*是" "$EVAL_FILE" || grep -q "是否通过.*yes" "$EVAL_FILE"; then
    echo -e "${GREEN}✓ 评估通过！${NC}"
    echo ""
    echo "工作流完成！"
    
    # 清理迭代计数
    rm -f .harness-iteration
    
    # 归档计划文件
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    mv "$PLAN_FILE" "plans/completed/plan_$TIMESTAMP.md"
    mv "$EVAL_FILE" "evals/completed/eval_$TIMESTAMP.md"
    
    echo "计划和评估已归档"
    exit 0
else
    echo -e "${YELLOW}评估未通过，需要修改${NC}"
    echo ""
    
    # 增加迭代计数
    ITERATION=$((ITERATION + 1))
    echo $ITERATION > .harness-iteration
    
    if [ $ITERATION -gt $MAX_ITERATIONS ]; then
        echo -e "${RED}错误：达到最大迭代次数 ($MAX_ITERATIONS)${NC}"
        echo "请人工介入检查问题"
        rm -f .harness-iteration
        exit 1
    fi
    
    echo -e "${YELLOW}进入第 $ITERATION 轮迭代${NC}"
    echo "请根据评估报告修复问题，然后重新运行此脚本"
    echo ""
    
    # 显示评估摘要
    echo "评估摘要："
    grep -A 5 "必须修复的问题" "$EVAL_FILE" || echo "（请查看 $EVAL_FILE 了解详情）"
fi

echo ""
echo "========================================"
echo "Harness 工作流暂停"
echo "========================================"
