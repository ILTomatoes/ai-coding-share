"""任务管理器核心模块.

提供任务的增删改查功能，数据持久化存储在 JSON 文件中.
"""

import json
import logging
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import List, Optional

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class Task:
    """任务数据类.

    Attributes:
        id: 任务唯一标识
        title: 任务标题
        completed: 是否已完成
        created_at: 创建时间（ISO 格式字符串）
    """

    id: int
    title: str
    completed: bool = False
    created_at: str = ""

    def __post_init__(self) -> None:
        """初始化时如果没有创建时间，设置为当前时间."""
        if not self.created_at:
            self.created_at = datetime.now().isoformat()


class TaskManager:
    """任务管理器类.

    管理任务的增删改查，数据持久化到 JSON 文件.

    Attributes:
        data_file: 数据文件路径
        tasks: 任务列表
        next_id: 下一个任务 ID
    """

    def __init__(self, data_file: str = "tasks.json") -> None:
        """初始化任务管理器.

        Args:
            data_file: 数据文件路径，默认为 "tasks.json"
        """
        self.data_file = Path(data_file)
        self.tasks: List[Task] = []
        self.next_id: int = 1
        self._load_data()

    def _load_data(self) -> None:
        """从文件加载任务数据.

        如果文件不存在，则初始化为空列表.
        """
        if not self.data_file.exists():
            logger.info(f"数据文件 {self.data_file} 不存在，创建新数据库")
            return

        try:
            with open(self.data_file, "r", encoding="utf-8") as f:
                data = json.load(f)

            self.tasks = [Task(**task_data) for task_data in data.get("tasks", [])]
            self.next_id = data.get("next_id", 1)
            logger.info(f"已加载 {len(self.tasks)} 个任务")

        except json.JSONDecodeError as e:
            logger.error(f"数据文件格式错误: {e}")
            raise ValueError(f"无法解析数据文件: {e}")
        except Exception as e:
            logger.error(f"加载数据失败: {e}")
            raise

    def _save_data(self) -> None:
        """保存任务数据到文件."""
        try:
            data = {
                "tasks": [asdict(task) for task in self.tasks],
                "next_id": self.next_id,
            }

            with open(self.data_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            logger.info(f"已保存 {len(self.tasks)} 个任务")

        except Exception as e:
            logger.error(f"保存数据失败: {e}")
            raise

    def add_task(self, title: str) -> Task:
        """添加新任务.

        Args:
            title: 任务标题

        Returns:
            创建的任务对象

        Raises:
            ValueError: 如果标题为空或过长
        """
        # 验证输入
        if not title or not title.strip():
            raise ValueError("任务标题不能为空")

        if len(title) > 200:
            raise ValueError("任务标题不能超过 200 个字符")

        # 创建任务
        task = Task(id=self.next_id, title=title.strip())
        self.tasks.append(task)
        self.next_id += 1

        # 保存数据
        self._save_data()
        logger.info(f"添加任务: {task}")

        return task

    def get_task(self, task_id: int) -> Optional[Task]:
        """根据 ID 获取任务.

        Args:
            task_id: 任务 ID

        Returns:
            任务对象，如果不存在则返回 None
        """
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def list_tasks(self, show_completed: bool = True) -> List[Task]:
        """获取任务列表.

        Args:
            show_completed: 是否显示已完成的任务，默认为 True

        Returns:
            任务列表
        """
        if show_completed:
            return self.tasks.copy()
        return [task for task in self.tasks if not task.completed]

    def complete_task(self, task_id: int) -> Task:
        """标记任务为已完成.

        Args:
            task_id: 任务 ID

        Returns:
            更新后的任务对象

        Raises:
            ValueError: 如果任务不存在
        """
        task = self.get_task(task_id)
        if task is None:
            raise ValueError(f"任务 #{task_id} 不存在")

        task.completed = True
        self._save_data()
        logger.info(f"完成任务: {task}")

        return task

    def delete_task(self, task_id: int) -> None:
        """删除任务.

        Args:
            task_id: 任务 ID

        Raises:
            ValueError: 如果任务不存在
        """
        task = self.get_task(task_id)
        if task is None:
            raise ValueError(f"任务 #{task_id} 不存在")

        self.tasks.remove(task)
        self._save_data()
        logger.info(f"删除任务 #{task_id}")

    def get_stats(self) -> dict:
        """获取任务统计信息.

        Returns:
            统计信息字典
        """
        total = len(self.tasks)
        completed = sum(1 for task in self.tasks if task.completed)
        pending = total - completed

        return {
            "total": total,
            "completed": completed,
            "pending": pending,
        }
