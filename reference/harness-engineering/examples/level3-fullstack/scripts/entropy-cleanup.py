#!/usr/bin/env python3
"""
熵管理脚本
定期检查并修复代码库的"熵"（混乱度）
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any


class EntropyChecker:
    """熵检查器"""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.issues: List[Dict[str, Any]] = []

    def check_documentation_consistency(self) -> bool:
        """检查文档与代码一致性"""
        print("\n📚 检查文档一致性...")
        
        # 检查 CLAUDE.md 中引用的文件是否存在
        claude_md = self.project_root / "CLAUDE.md"
        if claude_md.exists():
            content = claude_md.read_text(encoding="utf-8")
            
            # 查找引用的文件路径
            file_refs = re.findall(r'`([^`]+\.(py|ts|tsx|md))`', content)
            for ref, _ in file_refs:
                file_path = self.project_root / ref
                if not file_path.exists():
                    self.issues.append({
                        "type": "doc_inconsistency",
                        "severity": "warning",
                        "message": f"CLAUDE.md 引用的文件不存在: {ref}",
                        "file": "CLAUDE.md"
                    })
                    print(f"  ⚠️  引用文件不存在: {ref}")

        return len([i for i in self.issues if i["type"] == "doc_inconsistency"]) == 0

    def check_code_style(self) -> bool:
        """检查代码风格"""
        print("\n🎨 检查代码风格...")
        
        # 运行 ruff 检查
        try:
            result = subprocess.run(
                ["ruff", "check", str(self.project_root)],
                capture_output=True,
                text=True
            )
            if result.returncode != 0:
                self.issues.append({
                    "type": "code_style",
                    "severity": "error",
                    "message": "代码风格检查失败",
                    "details": result.stdout
                })
                print("  ❌ 代码风格检查失败")
                return False
            else:
                print("  ✓ 代码风格检查通过")
                return True
        except FileNotFoundError:
            print("  ⚠️  未找到 ruff，跳过代码风格检查")
            return True

    def check_type_consistency(self) -> bool:
        """检查类型一致性"""
        print("\n🔍 检查类型一致性...")
        
        try:
            result = subprocess.run(
                ["mypy", str(self.project_root)],
                capture_output=True,
                text=True
            )
            if result.returncode != 0:
                self.issues.append({
                    "type": "type_check",
                    "severity": "error",
                    "message": "类型检查失败",
                    "details": result.stdout
                })
                print("  ❌ 类型检查失败")
                return False
            else:
                print("  ✓ 类型检查通过")
                return True
        except FileNotFoundError:
            print("  ⚠️  未找到 mypy，跳过类型检查")
            return True

    def check_dead_code(self) -> bool:
        """检查未使用的代码"""
        print("\n💀 检查死代码...")
        
        # 简单的未使用导入检查
        try:
            result = subprocess.run(
                ["ruff", "check", "--select", "F401", str(self.project_root)],
                capture_output=True,
                text=True
            )
            if result.stdout:
                lines = result.stdout.strip().split('\n')
                for line in lines:
                    if 'F401' in line:
                        self.issues.append({
                            "type": "dead_code",
                            "severity": "warning",
                            "message": f"未使用的导入: {line}",
                        })
                print(f"  ⚠️  发现 {len(lines)} 个未使用的导入")
                return False
            else:
                print("  ✓ 未发现死代码")
                return True
        except FileNotFoundError:
            print("  ⚠️  未找到 ruff，跳过死代码检查")
            return True

    def check_naming_consistency(self) -> bool:
        """检查命名一致性"""
        print("\n🏷️  检查命名一致性...")
        
        # 检查常见的命名不一致
        inconsistent_patterns = [
            (r'user_id', r'userId', "user_id vs userId"),
            (r'task_id', r'taskId', "task_id vs taskId"),
        ]
        
        python_files = list(self.project_root.rglob("*.py"))
        issues_found = []
        
        for pattern1, pattern2, desc in inconsistent_patterns:
            count1 = 0
            count2 = 0
            
            for file in python_files:
                content = file.read_text(encoding="utf-8")
                count1 += len(re.findall(pattern1, content))
                count2 += len(re.findall(pattern2, content))
            
            if count1 > 0 and count2 > 0:
                issues_found.append(f"{desc}: snake_case ({count1}) vs camelCase ({count2})")
        
        if issues_found:
            for issue in issues_found:
                self.issues.append({
                    "type": "naming_inconsistency",
                    "severity": "warning",
                    "message": issue
                })
            print(f"  ⚠️  发现 {len(issues_found)} 个命名不一致问题")
            return False
        else:
            print("  ✓ 命名一致性良好")
            return True

    def generate_report(self) -> str:
        """生成检查报告"""
        report_lines = [
            "# 熵管理检查报告",
            f"\n生成时间: {datetime.now().isoformat()}",
            f"\n## 摘要",
            f"\n- 总问题数: {len(self.issues)}",
            f"- 错误: {len([i for i in self.issues if i['severity'] == 'error'])}",
            f"- 警告: {len([i for i in self.issues if i['severity'] == 'warning'])}",
            "\n## 详细问题",
        ]
        
        for i, issue in enumerate(self.issues, 1):
            report_lines.append(f"\n### 问题 {i}")
            report_lines.append(f"- 类型: {issue['type']}")
            report_lines.append(f"- 严重程度: {issue['severity']}")
            report_lines.append(f"- 描述: {issue['message']}")
            if 'file' in issue:
                report_lines.append(f"- 文件: {issue['file']}")
            if 'details' in issue:
                report_lines.append(f"- 详情:\n```\n{issue['details']}\n```")
        
        if not self.issues:
            report_lines.append("\n✓ 未发现任何问题！")
        
        return '\n'.join(report_lines)

    def run_all_checks(self) -> bool:
        """运行所有检查"""
        print("=" * 50)
        print("🔧 开始熵管理检查")
        print("=" * 50)
        
        checks = [
            self.check_documentation_consistency,
            self.check_code_style,
            self.check_type_consistency,
            self.check_dead_code,
            self.check_naming_consistency,
        ]
        
        results = [check() for check in checks]
        
        # 生成报告
        report = self.generate_report()
        report_file = self.project_root / "entropy-report.md"
        report_file.write_text(report, encoding="utf-8")
        
        print("\n" + "=" * 50)
        if all(results) and not self.issues:
            print("✅ 所有检查通过！")
        else:
            print(f"⚠️  发现 {len(self.issues)} 个问题")
            print(f"📄 详细报告: {report_file}")
        print("=" * 50)
        
        return all(results) and not self.issues


def main():
    parser = argparse.ArgumentParser(description="熵管理脚本")
    parser.add_argument(
        "--check-docs",
        action="store_true",
        help="检查文档一致性"
    )
    parser.add_argument(
        "--check-style",
        action="store_true",
        help="检查代码风格"
    )
    parser.add_argument(
        "--check-types",
        action="store_true",
        help="检查类型一致性"
    )
    parser.add_argument(
        "--check-dead-code",
        action="store_true",
        help="检查死代码"
    )
    parser.add_argument(
        "--check-naming",
        action="store_true",
        help="检查命名一致性"
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="运行所有检查"
    )
    
    args = parser.parse_args()
    
    # 确定项目根目录
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    checker = EntropyChecker(project_root)
    
    # 如果没有指定检查项，默认运行所有
    if not any([
        args.check_docs,
        args.check_style,
        args.check_types,
        args.check_dead_code,
        args.check_naming,
        args.all
    ]):
        args.all = True
    
    if args.all:
        success = checker.run_all_checks()
    else:
        if args.check_docs:
            checker.check_documentation_consistency()
        if args.check_style:
            checker.check_code_style()
        if args.check_types:
            checker.check_type_consistency()
        if args.check_dead_code:
            checker.check_dead_code()
        if args.check_naming:
            checker.check_naming_consistency()
        
        # 生成报告
        report = checker.generate_report()
        report_file = project_root / "entropy-report.md"
        report_file.write_text(report, encoding="utf-8")
        print(f"\n📄 报告已保存: {report_file}")
        
        success = len(checker.issues) == 0
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
