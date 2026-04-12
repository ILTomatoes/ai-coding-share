"""任务管理器命令行入口.

提供交互式命令行界面管理任务.
"""

import sys
from typing import NoReturn

from task_manager import TaskManager, Task


def print_help() -> None:
    """打印帮助信息."""
    help_text = """
任务管理器 - 可用命令:

  add <标题>       添加新任务
  list             列出所有任务
  pending          列出未完成任务
  done <ID>        标记任务为已完成
  delete <ID>      删除任务
  stats            显示统计信息
  help             显示帮助
  quit             退出程序

示例:
  add 完成 Harness 工程文档
  list
  done 1
"""
    print(help_text)


def print_tasks(tasks: list[Task]) -> None:
    """打印任务列表.

    Args:
        tasks: 任务列表
    """
    if not tasks:
        print("暂无任务")
        return

    print("\n任务列表:")
    print("-" * 60)
    print(f"{'ID':<6}{'状态':<8}{'标题'}")
    print("-" * 60)

    for task in tasks:
        status = "✓" if task.completed else "○"
        print(f"{task.id:<6}{status:<8}{task.title}")

    print("-" * 60)


def main() -> NoReturn:
    """主函数，运行交互式命令行界面."""
    print("欢迎使用任务管理器！输入 'help' 查看可用命令。")
    print("-" * 60)

    manager = TaskManager()

    while True:
        try:
            # 获取用户输入
            user_input = input("\n> ").strip()

            if not user_input:
                continue

            # 解析命令
            parts = user_input.split(maxsplit=1)
            command = parts[0].lower()
            args = parts[1] if len(parts) > 1 else ""

            # 执行命令
            if command == "quit" or command == "exit":
                print("再见！")
                sys.exit(0)

            elif command == "help":
                print_help()

            elif command == "add":
                if not args:
                    print("错误：请提供任务标题")
                    print("用法: add <标题>")
                    continue

                try:
                    task = manager.add_task(args)
                    print(f"✓ 已添加任务 #{task.id}: {task.title}")
                except ValueError as e:
                    print(f"错误: {e}")

            elif command == "list":
                tasks = manager.list_tasks(show_completed=True)
                print_tasks(tasks)

            elif command == "pending":
                tasks = manager.list_tasks(show_completed=False)
                print_tasks(tasks)

            elif command == "done":
                if not args:
                    print("错误：请提供任务 ID")
                    print("用法: done <ID>")
                    continue

                try:
                    task_id = int(args)
                    task = manager.complete_task(task_id)
                    print(f"✓ 已完成任务 #{task.id}: {task.title}")
                except ValueError as e:
                    print(f"错误: {e}")

            elif command == "delete":
                if not args:
                    print("错误：请提供任务 ID")
                    print("用法: delete <ID>")
                    continue

                try:
                    task_id = int(args)
                    manager.delete_task(task_id)
                    print(f"✓ 已删除任务 #{task_id}")
                except ValueError as e:
                    print(f"错误: {e}")

            elif command == "stats":
                stats = manager.get_stats()
                print("\n统计信息:")
                print(f"  总任务数: {stats['total']}")
                print(f"  已完成:   {stats['completed']}")
                print(f"  待完成:   {stats['pending']}")

            else:
                print(f"未知命令: {command}")
                print("输入 'help' 查看可用命令")

        except KeyboardInterrupt:
            print("\n再见！")
            sys.exit(0)
        except Exception as e:
            print(f"发生错误: {e}")


if __name__ == "__main__":
    main()
