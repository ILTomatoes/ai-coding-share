# 任务管理器 - 项目指南

## 基本信息
- 语言：Python 3.11+
- 项目类型：命令行工具

## 常用命令
- 运行：`python src/main.py`
- 测试：`python -m pytest tests/ -v`
- 类型检查：`mypy src/`
- 格式化：`black src/ tests/`
- 检查代码风格：`ruff check src/ tests/`

## 项目结构
```
.
├── src/
│   ├── __init__.py
│   ├── main.py          # 程序入口
│   └── task_manager.py  # 核心逻辑
├── tests/
│   ├── __init__.py
│   └── test_task_manager.py
├── tasks.json           # 数据存储（自动创建）
├── requirements.txt
└── pyproject.toml
```

## 代码规范
- 使用类型注解（Type Hints）
- 函数必须有 docstring，说明功能、参数、返回值
- 变量用 snake_case（如 user_name, task_list）
- 类用 PascalCase（如 TaskManager）
- 常量用 UPPER_SNAKE_CASE

## 重要规则
1. 所有用户输入必须验证，给出清晰的错误提示
2. 不要硬编码敏感信息
3. 捕获异常时记录日志，不要静默吞掉错误
4. 数据文件操作要处理文件不存在的情况
5. 所有公共函数必须有单元测试

## 数据格式
tasks.json 格式：
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "任务标题",
      "completed": false,
      "created_at": "2024-01-15T10:30:00"
    }
  ],
  "next_id": 2
}
```
