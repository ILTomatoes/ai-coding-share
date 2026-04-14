"""任务管理器单元测试."""

import json
import tempfile
from pathlib import Path

import pytest

from src.task_manager import TaskManager, Task


class TestTask:
    """Task 数据类测试."""

    def test_task_creation(self) -> None:
        """测试创建任务对象."""
        task = Task(id=1, title="测试任务")

        assert task.id == 1
        assert task.title == "测试任务"
        assert task.completed is False
        assert task.created_at != ""  # 应该自动设置创建时间

    def test_task_creation_with_all_fields(self) -> None:
        """测试用所有字段创建任务."""
        task = Task(id=2, title="完整任务", completed=True, created_at="2024-01-01T00:00:00")

        assert task.id == 2
        assert task.title == "完整任务"
        assert task.completed is True
        assert task.created_at == "2024-01-01T00:00:00"


class TestTaskManager:
    """TaskManager 类测试."""

    @pytest.fixture
    def temp_data_file(self):
        """创建临时数据文件."""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
            f.write('{"tasks": [], "next_id": 1}')
            temp_path = f.name
        yield temp_path
        # 清理
        Path(temp_path).unlink(missing_ok=True)

    @pytest.fixture
    def manager(self, temp_data_file):
        """创建 TaskManager 实例."""
        return TaskManager(data_file=temp_data_file)

    def test_init_creates_empty_manager(self, temp_data_file) -> None:
        """测试初始化创建空管理器."""
        manager = TaskManager(data_file=temp_data_file)

        assert manager.tasks == []
        assert manager.next_id == 1

    def test_init_loads_existing_data(self, temp_data_file) -> None:
        """测试初始化加载已有数据."""
        # 预先写入数据
        data = {
            "tasks": [
                {"id": 1, "title": "已有任务", "completed": False, "created_at": "2024-01-01T00:00:00"}
            ],
            "next_id": 2
        }
        with open(temp_data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f)

        manager = TaskManager(data_file=temp_data_file)

        assert len(manager.tasks) == 1
        assert manager.tasks[0].title == "已有任务"
        assert manager.next_id == 2

    def test_add_task_success(self, manager) -> None:
        """测试成功添加任务."""
        task = manager.add_task("新任务")

        assert task.id == 1
        assert task.title == "新任务"
        assert task.completed is False
        assert len(manager.tasks) == 1

    def test_add_task_strips_whitespace(self, manager) -> None:
        """测试添加任务时去除首尾空格."""
        task = manager.add_task("  带空格的任务  ")

        assert task.title == "带空格的任务"

    def test_add_task_empty_title_raises_error(self, manager) -> None:
        """测试添加空标题任务抛出错误."""
        with pytest.raises(ValueError, match="任务标题不能为空"):
            manager.add_task("")

    def test_add_task_whitespace_only_title_raises_error(self, manager) -> None:
        """测试添加仅包含空格的任务标题抛出错误."""
        with pytest.raises(ValueError, match="任务标题不能为空"):
            manager.add_task("   ")

    def test_add_task_long_title_raises_error(self, manager) -> None:
        """测试添加过长标题抛出错误."""
        long_title = "x" * 201
        with pytest.raises(ValueError, match="任务标题不能超过 200 个字符"):
            manager.add_task(long_title)

    def test_add_task_increments_next_id(self, manager) -> None:
        """测试添加任务后 next_id 递增."""
        manager.add_task("任务1")
        manager.add_task("任务2")

        assert manager.next_id == 3

    def test_get_task_existing(self, manager) -> None:
        """测试获取存在的任务."""
        added_task = manager.add_task("测试任务")

        retrieved_task = manager.get_task(added_task.id)

        assert retrieved_task is not None
        assert retrieved_task.title == "测试任务"

    def test_get_task_nonexistent(self, manager) -> None:
        """测试获取不存在的任务."""
        task = manager.get_task(999)

        assert task is None

    def test_list_tasks_all(self, manager) -> None:
        """测试列出所有任务."""
        manager.add_task("任务1")
        task2 = manager.add_task("任务2")
        manager.complete_task(task2.id)

        tasks = manager.list_tasks(show_completed=True)

        assert len(tasks) == 2

    def test_list_tasks_pending_only(self, manager) -> None:
        """测试仅列出未完成任务."""
        manager.add_task("未完成任务")
        task2 = manager.add_task("已完成任务")
        manager.complete_task(task2.id)

        tasks = manager.list_tasks(show_completed=False)

        assert len(tasks) == 1
        assert tasks[0].title == "未完成任务"

    def test_complete_task_success(self, manager) -> None:
        """测试成功完成任务."""
        task = manager.add_task("待完成任务")
        assert task.completed is False

        completed_task = manager.complete_task(task.id)

        assert completed_task.completed is True
        assert manager.get_task(task.id).completed is True

    def test_complete_task_nonexistent_raises_error(self, manager) -> None:
        """测试完成不存在的任务抛出错误."""
        with pytest.raises(ValueError, match="任务 #999 不存在"):
            manager.complete_task(999)

    def test_delete_task_success(self, manager) -> None:
        """测试成功删除任务."""
        task = manager.add_task("要删除的任务")
        assert len(manager.tasks) == 1

        manager.delete_task(task.id)

        assert len(manager.tasks) == 0
        assert manager.get_task(task.id) is None

    def test_delete_task_nonexistent_raises_error(self, manager) -> None:
        """测试删除不存在的任务抛出错误."""
        with pytest.raises(ValueError, match="任务 #999 不存在"):
            manager.delete_task(999)

    def test_get_stats_empty(self, manager) -> None:
        """测试空任务列表统计."""
        stats = manager.get_stats()

        assert stats == {"total": 0, "completed": 0, "pending": 0}

    def test_get_stats_with_tasks(self, manager) -> None:
        """测试有任务时的统计."""
        manager.add_task("任务1")
        task2 = manager.add_task("任务2")
        manager.complete_task(task2.id)
        manager.add_task("任务3")

        stats = manager.get_stats()

        assert stats["total"] == 3
        assert stats["completed"] == 1
        assert stats["pending"] == 2

    def test_persistence(self, manager, temp_data_file) -> None:
        """测试数据持久化."""
        # 添加任务
        manager.add_task("持久化任务")

        # 创建新的管理器实例，应该加载之前的数据
        new_manager = TaskManager(data_file=temp_data_file)

        assert len(new_manager.tasks) == 1
        assert new_manager.tasks[0].title == "持久化任务"


class TestTaskManagerEdgeCases:
    """边界情况测试."""

    def test_special_characters_in_title(self, temp_data_file) -> None:
        """测试标题中的特殊字符."""
        manager = TaskManager(data_file=temp_data_file)

        # 应该能处理各种 Unicode 字符
        task = manager.add_task("任务：测试！Hello 世界 🎉")

        assert task.title == "任务：测试！Hello 世界 🎉"

    def test_very_long_list(self, temp_data_file) -> None:
        """测试大量任务."""
        manager = TaskManager(data_file=temp_data_file)

        # 添加 100 个任务
        for i in range(100):
            manager.add_task(f"任务 {i}")

        assert len(manager.tasks) == 100
        assert manager.next_id == 101

        stats = manager.get_stats()
        assert stats["total"] == 100
