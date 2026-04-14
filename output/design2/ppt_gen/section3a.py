"""生成 PPT Part 3 前半部分：P22-P33（共12页）"""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

import utils
from utils import (
    new_slide, add_text, add_multiline, add_page_title, add_page_num,
    add_card, add_rounded_rect, add_big_number, add_flow_node,
    add_arrow_right, add_arrow_down, add_section_divider, add_table,
    add_code_block, add_rect,
    ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED, ACCENT_YELLOW,
    TEXT_LIGHT, TEXT_GRAY, CARD_BG, CARD_BORDER, CODE_GREEN, WHITE,
    DARKER_BG, MARGIN_L, CONTENT_W, SLIDE_W, SLIDE_H,
)
from pptx.dml.color import RGBColor


def add_slides(prs):
    """生成 P22-P33"""

    # ========== P22 Part 3 标题页 ==========
    add_section_divider(prs, 'Part 03', '系统化提升', 'SDD 与 Harness 实践')

    # ========== P23 什么是 SDD ==========
    slide = new_slide(prs)
    add_page_title(slide, '什么是 SDD？')

    # 定义卡片
    add_rounded_rect(slide, MARGIN_L, 3.0, CONTENT_W, 2.0, CARD_BG, ACCENT_BLUE, 2)
    add_text(slide, MARGIN_L + 0.5, 3.2, CONTENT_W - 1.0, 1.6,
             'SDD = Specification-Driven Development（规范驱动开发）',
             font_size=20, color=ACCENT_BLUE, bold=True, alignment='center')

    # 对比区域
    add_text(slide, MARGIN_L, 5.5, 6, 0.8, '对比理解：',
             font_size=16, color=TEXT_LIGHT, bold=True)

    # 传统开发
    add_rounded_rect(slide, MARGIN_L, 6.5, 14.5, 1.6, CARD_BG, CARD_BORDER)
    add_text(slide, MARGIN_L + 0.4, 6.6, 14, 0.6,
             '传统开发：规范是文档，人看文档写代码',
             font_size=14, color=TEXT_GRAY)

    # AI编程
    add_rounded_rect(slide, MARGIN_L + 15.5, 6.5, 14.5, 1.6, CARD_BG, ACCENT_BLUE)
    add_text(slide, MARGIN_L + 15.9, 6.6, 14, 0.6,
             'AI 编程：规范是"AI 的行为边界"，直接决定输出质量',
             font_size=14, color=TEXT_LIGHT)

    # 类比三行
    add_text(slide, MARGIN_L, 9.0, 6, 0.8, '一个类比：',
             font_size=16, color=TEXT_LIGHT, bold=True)

    # 没有规范
    add_rounded_rect(slide, MARGIN_L, 10.0, 9.2, 2.5, CARD_BG, ACCENT_RED)
    add_text(slide, MARGIN_L + 0.4, 10.2, 8.4, 0.6,
             '没有规范', font_size=16, color=ACCENT_RED, bold=True)
    add_text(slide, MARGIN_L + 0.4, 10.9, 8.4, 1.2,
             '= 新员工自由发挥（不可控）',
             font_size=14, color=TEXT_GRAY)

    # 有规范
    add_rounded_rect(slide, MARGIN_L + 10.3, 10.0, 9.2, 2.5, CARD_BG, ACCENT_GREEN)
    add_text(slide, MARGIN_L + 10.7, 10.2, 8.4, 0.6,
             '有规范', font_size=16, color=ACCENT_GREEN, bold=True)
    add_text(slide, MARGIN_L + 10.7, 10.9, 8.4, 1.2,
             '= 新员工按章办事（可预期）',
             font_size=14, color=TEXT_GRAY)

    # AI
    add_rounded_rect(slide, MARGIN_L + 20.6, 10.0, 9.5, 2.5, CARD_BG, ACCENT_BLUE)
    add_text(slide, MARGIN_L + 21.0, 10.2, 8.7, 0.6,
             'AI 就是那个"超级新员工"',
             font_size=16, color=ACCENT_BLUE, bold=True)
    add_text(slide, MARGIN_L + 21.0, 10.9, 8.7, 1.2,
             '能力极强，但需要明确的行为边界',
             font_size=14, color=TEXT_GRAY)

    add_page_num(slide, 23)

    # ========== P24 SDD 三层体现 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'SDD 三层体现')

    # 三个横向卡片（从上到下递进）
    card_w = CONTENT_W - 1.5
    card_h = 3.6

    # 项目级规范
    add_card(slide, MARGIN_L, 3.0, card_w, card_h,
             '项目级规范', [
                 'CLAUDE.md + rules/ = 员工手册',
                 '所有会话共享，每次自动加载',
                 '定义项目架构、编码约束、常用命令等核心规范',
             ],
             title_color=ACCENT_BLUE, border_top_color=ACCENT_BLUE,
             title_size=16, content_size=13)

    add_arrow_down(slide, SLIDE_W / 2 - 0.3, 6.6, 0.6, 0.6, ACCENT_BLUE)

    # 任务级规范
    add_card(slide, MARGIN_L, 7.3, card_w, card_h,
             '任务级规范', [
                 'Plan、PRD = 任务说明书',
                 '特定功能的约束，一次性使用',
                 '针对某个功能点定义详细的需求和实现约束',
             ],
             title_color=ACCENT_GREEN, border_top_color=ACCENT_GREEN,
             title_size=16, content_size=13)

    add_arrow_down(slide, SLIDE_W / 2 - 0.3, 10.9, 0.6, 0.6, ACCENT_GREEN)

    # 会话级引导
    add_card(slide, MARGIN_L, 11.6, card_w, card_h,
             '会话级引导', [
                 '对话中的约束和纠正 = 日常工作指导',
                 '实时交互中补充的临时约束',
                 '即时修正 AI 行为，逐步沉淀为项目级规范',
             ],
             title_color=ACCENT_YELLOW, border_top_color=ACCENT_YELLOW,
             title_size=16, content_size=13)

    # 右侧标注
    add_text(slide, MARGIN_L + card_w - 4, 4.6, 4, 0.6,
             '持久化 / 全局生效', font_size=11, color=ACCENT_BLUE, alignment='right')
    add_text(slide, MARGIN_L + card_w - 4, 8.9, 4, 0.6,
             '临时 / 任务范围', font_size=11, color=ACCENT_GREEN, alignment='right')
    add_text(slide, MARGIN_L + card_w - 4, 13.2, 4, 0.6,
             '即时 / 实时生效', font_size=11, color=ACCENT_YELLOW, alignment='right')

    add_page_num(slide, 24)

    # ========== P25 案例：aip-portal 全貌 ==========
    slide = new_slide(prs)
    add_page_title(slide, '案例项目：aip-portal 智能体门户')

    # 上方定位
    add_text(slide, MARGIN_L, 2.8, CONTENT_W, 0.8,
             '企业级 Agent 管理平台',
             font_size=16, color=TEXT_GRAY, alignment='center')

    # 技术栈
    add_rounded_rect(slide, MARGIN_L + 1, 3.8, CONTENT_W - 2, 1.4, CARD_BG, CARD_BORDER)
    add_text(slide, MARGIN_L + 1.5, 3.95, CONTENT_W - 3, 1.0,
             'Spring Boot 2.7.18 + MyBatis Plus + PostgreSQL + Java 17  |  Maven 多模块 + Feign + 多数据源',
             font_size=13, color=TEXT_LIGHT, alignment='center')

    # 五个数字大卡片
    num_w = 5.5
    num_gap = 0.7
    total_num_w = num_w * 5 + num_gap * 4
    num_start = MARGIN_L + (CONTENT_W - total_num_w) / 2

    add_big_number(slide, num_start, 5.8, '259', '提交', num_size=38, width=num_w)
    add_big_number(slide, num_start + num_w + num_gap, 5.8, '72', '天活跃开发', num_size=38, width=num_w)
    add_big_number(slide, num_start + (num_w + num_gap) * 2, 5.8, '281', 'Java 文件', num_size=38, width=num_w)
    add_big_number(slide, num_start + (num_w + num_gap) * 3, 5.8, '57', '文档', num_size=38, width=num_w)
    add_big_number(slide, num_start + (num_w + num_gap) * 4, 5.8, '4', '人协作', num_size=38, width=num_w)

    # 分隔线
    add_rect(slide, MARGIN_L, 9.8, CONTENT_W, 0.02, CARD_BORDER)

    # 底部业务模块
    add_text(slide, MARGIN_L, 10.2, 6, 0.6,
             '业务模块：', font_size=13, color=TEXT_LIGHT, bold=True)

    modules = ['数字员工', '系统管理', '运营中心', '智能助理', '外部集成', '公共组件', 'SQL 版本管理']
    mod_w = 3.8
    mod_gap = 0.3
    mod_start = MARGIN_L
    for i, mod in enumerate(modules):
        x = mod_start + i * (mod_w + mod_gap)
        add_rounded_rect(slide, x, 11.0, mod_w, 1.2, CARD_BG, ACCENT_BLUE, 1)
        add_text(slide, x, 11.15, mod_w, 0.9, mod,
                 font_size=12, color=ACCENT_BLUE, alignment='center')

    add_page_num(slide, 25)

    # ========== P26 Rules 演化总览 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'Rules 的演化：从混乱到精炼')

    # 5个矩形柱模拟演化曲线
    bar_w = 4.5
    bar_gap = 1.2
    bar_start = MARGIN_L + 1.5

    # Phase 1: 5487行，黄色，中等高度约6cm
    h1 = 6.0
    y1 = 3.5 + (8.0 - h1)
    add_rect(slide, bar_start, y1, bar_w, h1, ACCENT_YELLOW)
    add_text(slide, bar_start, y1 + 0.2, bar_w, 0.6, '5487 行',
             font_size=14, color=DARKER_BG, bold=True, alignment='center')
    add_text(slide, bar_start, y1 + 0.9, bar_w, 0.6, 'Phase 1',
             font_size=12, color=DARKER_BG, alignment='center')

    # Phase 2: ~6000行，红色，最高约8cm
    h2 = 8.0
    y2 = 3.5
    add_rect(slide, bar_start + bar_w + bar_gap, y2, bar_w, h2, ACCENT_RED)
    add_text(slide, bar_start + bar_w + bar_gap, y2 + 0.2, bar_w, 0.6, '~6000 行',
             font_size=14, color=WHITE, bold=True, alignment='center')
    add_text(slide, bar_start + bar_w + bar_gap, y2 + 0.9, bar_w, 0.6, 'Phase 2',
             font_size=12, color=WHITE, alignment='center')

    # Phase 2.5: 红色，约7cm，标注根因
    h25 = 7.0
    y25 = 3.5 + (8.0 - h25)
    add_rect(slide, bar_start + (bar_w + bar_gap) * 2, y25, bar_w, h25, ACCENT_RED)
    add_text(slide, bar_start + (bar_w + bar_gap) * 2, y25 + 0.2, bar_w, 0.6, '根因',
             font_size=14, color=WHITE, bold=True, alignment='center')
    add_text(slide, bar_start + (bar_w + bar_gap) * 2, y25 + 0.9, bar_w, 1.0,
             'paths: **.java', font_size=11, color=WHITE, alignment='center')
    add_text(slide, bar_start + (bar_w + bar_gap) * 2, y25 + 1.7, bar_w, 0.6, 'Phase 2.5',
             font_size=12, color=WHITE, alignment='center')

    # Phase 3: ~3300行，黄色，约4cm
    h3 = 4.0
    y3 = 3.5 + (8.0 - h3)
    add_rect(slide, bar_start + (bar_w + bar_gap) * 3, y3, bar_w, h3, ACCENT_YELLOW)
    add_text(slide, bar_start + (bar_w + bar_gap) * 3, y3 + 0.2, bar_w, 0.6, '~3300 行',
             font_size=14, color=DARKER_BG, bold=True, alignment='center')
    add_text(slide, bar_start + (bar_w + bar_gap) * 3, y3 + 0.9, bar_w, 0.6, 'Phase 3',
             font_size=12, color=DARKER_BG, alignment='center')

    # Phase 4: 272行，绿色，最低约1cm
    h4 = 1.2
    y4 = 3.5 + (8.0 - h4)
    add_rect(slide, bar_start + (bar_w + bar_gap) * 4, y4, bar_w, h4, ACCENT_GREEN)
    add_text(slide, bar_start + (bar_w + bar_gap) * 4, y4 + 0.1, bar_w, 0.5, '272 行',
             font_size=13, color=WHITE, bold=True, alignment='center')

    # Phase 4 标签（在柱子外面标注）
    add_text(slide, bar_start + (bar_w + bar_gap) * 4, y4 - 0.6, bar_w, 0.5,
             'Phase 4', font_size=12, color=ACCENT_GREEN, alignment='center')
    add_text(slide, bar_start + (bar_w + bar_gap) * 4, y4 - 1.1, bar_w, 0.5,
             '稳定', font_size=12, color=ACCENT_GREEN, bold=True, alignment='center')

    # 每个柱下方概括
    summary_y = 12.0
    summaries = [
        ('能想到的都塞进去', ACCENT_YELLOW),
        ('踩坑就加规则', ACCENT_RED),
        ('发现 paths: **.java', ACCENT_RED),
        ('开始精简', ACCENT_YELLOW),
        ('精炼稳定', ACCENT_GREEN),
    ]
    for i, (txt, clr) in enumerate(summaries):
        x = bar_start + i * (bar_w + bar_gap)
        add_text(slide, x, summary_y, bar_w, 0.6, txt,
                 font_size=11, color=clr, alignment='center')

    # 底部趋势箭头
    add_text(slide, MARGIN_L, 13.5, CONTENT_W, 0.8,
             '从 5487 行到 272 行 — 压缩率 95%，Token 消耗大幅降低',
             font_size=14, color=ACCENT_GREEN, bold=True, alignment='center')

    add_page_num(slide, 26)

    # ========== P27 Rules 演化：Phase 1-2 混乱与膨胀 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'Phase 1-2：混乱与膨胀')

    col_w = 14.3
    col_gap = 1.5

    # 左栏 Phase 1
    add_card(slide, MARGIN_L, 3.0, col_w, 8.5,
             'Phase 1：把能想到的都塞进去',
             [
                 '',
                 '5487 行，20 个文件',
                 '',
                 '把能想到的规范全部塞进 rules/',
                 '',
                 '命名、架构、异常处理、日志……全部堆在一起',
                 '',
                 'X  Token 消耗巨大',
                 'X  关键规则被淹没在海量文本中',
                 'X  AI 无法区分重要和不重要的规则',
             ],
             title_color=ACCENT_YELLOW, border_top_color=ACCENT_YELLOW,
             title_size=15, content_size=13)

    # 右栏 Phase 2
    add_card(slide, MARGIN_L + col_w + col_gap, 3.0, col_w, 8.5,
             'Phase 2：踩坑就加规则，越加越多',
             [
                 '',
                 '~6000+ 行，24 个文件',
                 '',
                 '每次 AI 犯错，就加一条规则',
                 '',
                 '规则数量持续膨胀，彼此矛盾',
                 '',
                 'X  Token 爆炸，单次会话消耗飙升',
                 'X  AI 经常忽略关键规则',
                 'X  规则越多，AI 遵循率越低',
             ],
             title_color=ACCENT_RED, border_top_color=ACCENT_RED,
             title_size=15, content_size=13)

    # 底部红色警示框
    warn_y = 12.2
    add_rounded_rect(slide, MARGIN_L + 2, warn_y, CONTENT_W - 4, 2.0,
                     RGBColor(0x2D, 0x12, 0x12), ACCENT_RED, 2)
    add_text(slide, MARGIN_L + 2.5, warn_y + 0.3, CONTENT_W - 5, 1.4,
             '恶性循环 — 犯错 -> 加规则 -> 再犯错 -> 再加规则 -> ……',
             font_size=16, color=ACCENT_RED, bold=True, alignment='center')

    add_page_num(slide, 27)

    # ========== P28 Rules 演化：Phase 3-4 清理与精炼 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'Phase 3-4：清理与精炼')

    col_w = 14.3
    col_gap = 1.5

    # 左栏 Phase 3
    add_card(slide, MARGIN_L, 3.0, col_w, 8.5,
             'Phase 3：大刀阔斧删减',
             [
                 '',
                 '删掉 2714 行（近 50%）',
                 '',
                 '关键认知：',
                 '  规范不是越多越好',
                 '  rules/ 是 token 预算管理，不是 wiki',
                 '  详细文档移到 docs/ 目录',
                 '',
                 '只保留 AI 每次会话必须知道的约束',
             ],
             title_color=ACCENT_YELLOW, border_top_color=ACCENT_YELLOW,
             title_size=15, content_size=13)

    # 右栏 Phase 4
    add_card(slide, MARGIN_L + col_w + col_gap, 3.0, col_w, 8.5,
             'Phase 4：精炼至稳定',
             [
                 '',
                 '最终 272 行（压缩率 95%）',
                 '',
                 '核心策略：',
                 '  rules/ 只放 AI 必须知道的约束',
                 '  CODE-STYLE.md 做索引，不堆细节',
                 '  详细规范放 docs/code-style/ 按需引用',
                 '',
                 '质量稳定，Token 可控',
             ],
             title_color=ACCENT_GREEN, border_top_color=ACCENT_GREEN,
             title_size=15, content_size=13)

    # 底部时间线
    tl_y = 12.5
    add_rect(slide, MARGIN_L + 3, tl_y + 0.3, CONTENT_W - 6, 0.04, ACCENT_BLUE)

    tl_items = [
        (MARGIN_L + 3, '04-01', '精简 rules'),
        (MARGIN_L + 10, '04-02', '整理分类'),
        (MARGIN_L + 18, '04-09', '规范移至 docs'),
    ]
    for x, date, desc in tl_items:
        add_rounded_rect(slide, x, tl_y + 0.05, 0.6, 0.6, ACCENT_BLUE, None)
        add_text(slide, x - 1, tl_y + 0.8, 2.6, 0.5, date,
                 font_size=11, color=ACCENT_BLUE, alignment='center')
        add_text(slide, x - 2, tl_y + 1.3, 4.6, 0.5, desc,
                 font_size=11, color=TEXT_GRAY, alignment='center')

    add_text(slide, MARGIN_L, 14.8, CONTENT_W, 0.6,
             '仅 9 天完成从混乱到精炼的完整重构',
             font_size=13, color=ACCENT_GREEN, alignment='center')

    add_page_num(slide, 28)

    # ========== P29 Rules 最终形态：文件结构对比 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'Rules 最终形态')

    col_w = 14.3
    col_gap = 1.5

    # Before 红色边框卡片
    add_card(slide, MARGIN_L, 3.0, col_w, 5.5,
             'Before',
             [
                 '',
                 '5487 行，20 个文件',
                 '所有规范堆在一个目录',
                 '每次全部加载，Token 消耗巨大',
                 '关键约束被海量文本淹没',
             ],
             title_color=ACCENT_RED, border_top_color=ACCENT_RED,
             title_size=15, content_size=13)

    # After 绿色边框卡片 + 代码块
    add_card(slide, MARGIN_L + col_w + col_gap, 3.0, col_w, 5.5,
             'After',
             title_color=ACCENT_GREEN, border_top_color=ACCENT_GREEN,
             title_size=15, content_size=13)

    code_text = (
        '.claude/rules/ (核心约束，自动加载)\n'
        '  |-- ARCHITECTURE.md  (124 行)\n'
        '  |-- CODE-STYLE.md    (14 行)\n'
        '  +-- testing.md       (134 行)\n'
        '\n'
        'docs/code-style/ (详细规范，按需引用)\n'
        '  |-- 01-naming.md     (130 行)\n'
        '  ...共 8 个文档，838 行'
    )
    add_code_block(slide, MARGIN_L + col_w + col_gap + 0.3, 4.3, col_w - 0.6, 4.0,
                   code_text, font_size=10)

    # 底部对比总结
    add_rounded_rect(slide, MARGIN_L, 9.2, CONTENT_W, 2.5, CARD_BG, ACCENT_GREEN, 2)
    add_text(slide, MARGIN_L + 0.5, 9.4, CONTENT_W - 1, 0.6,
             '核心思路：分层管理', font_size=15, color=ACCENT_GREEN, bold=True)

    compare_items = [
        ('rules/ 核心约束', '272 行，每次自动加载', ACCENT_GREEN),
        ('docs/code-style/ 详细规范', '838 行，AI 按需查阅', ACCENT_BLUE),
    ]
    for i, (label, desc, clr) in enumerate(compare_items):
        y = 10.2 + i * 0.7
        add_text(slide, MARGIN_L + 1.5, y, 8, 0.6, label,
                 font_size=13, color=clr, bold=True)
        add_text(slide, MARGIN_L + 12, y, 16, 0.6, desc,
                 font_size=13, color=TEXT_GRAY)

    add_page_num(slide, 29)

    # ========== P30 Rules 演化的关键经验 ==========
    slide = new_slide(prs)
    add_page_title(slide, 'Rules 演化的关键经验')

    # 三条经验卡片，横排
    card_w = 9.5
    card_gap = 0.6
    card_y = 3.2
    card_h = 6.5

    experiences = [
        ('1', 'rules/ 是 token 预算管理，不是 wiki',
         ['每一行都要有价值', 'AI 每次会话都要读取全部 rules/', '无用的行 = 浪费 Token = 降低质量'],
         ACCENT_BLUE),
        ('2', '规范不是越多越好，而是越精炼越好',
         ['少即是多', '272 行比 5487 行效果好得多', '关键约束突出，AI 遵循率更高'],
         ACCENT_GREEN),
        ('3', '每次踩坑都是完善规范的机会',
         ['复盘驱动改进', '犯错后分析原因，补充到 rules/', '形成"踩坑-复盘-规范"的正循环'],
         ACCENT_YELLOW),
    ]

    for i, (num, title, points, clr) in enumerate(experiences):
        x = MARGIN_L + i * (card_w + card_gap)
        add_card(slide, x, card_y, card_w, card_h,
                 f'  {num}', [title, ''] + points,
                 title_color=clr, border_top_color=clr,
                 title_size=28, content_size=12)

    # 底部时间线
    tl_y = 11.0
    add_rect(slide, MARGIN_L + 2, tl_y + 0.3, CONTENT_W - 4, 0.04, ACCENT_BLUE)

    timeline_items = [
        (MARGIN_L + 2, '04-01', '优化 rules'),
        (MARGIN_L + 8.5, '04-01', '精简规则'),
        (MARGIN_L + 15, '04-02', '整理分类'),
        (MARGIN_L + 21.5, '04-09', '规范移 docs'),
    ]
    for x, date, desc in timeline_items:
        add_rounded_rect(slide, x, tl_y + 0.05, 0.6, 0.6, ACCENT_BLUE, None)
        add_text(slide, x - 1, tl_y + 0.8, 2.6, 0.5, date,
                 font_size=10, color=ACCENT_BLUE, alignment='center')
        add_text(slide, x - 1.5, tl_y + 1.3, 3.6, 0.5, desc,
                 font_size=10, color=TEXT_GRAY, alignment='center')

    add_text(slide, MARGIN_L, 13.0, CONTENT_W, 0.6,
             '9 天趋于稳定 — 规范驱动 + 复盘迭代 = 高效 rules 管理',
             font_size=13, color=ACCENT_GREEN, alignment='center')

    add_page_num(slide, 30)

    # ========== P31 SDD 落地：CLAUDE.md ==========
    slide = new_slide(prs)
    add_page_title(slide, 'SDD 落地：CLAUDE.md（极简导航）')

    col_w = 14.3
    col_gap = 1.5

    # 左侧说明
    left_x = MARGIN_L
    add_text(slide, left_x, 3.2, col_w, 0.6,
             'aip-portal 的 CLAUDE.md 仅 23 行',
             font_size=16, color=ACCENT_BLUE, bold=True)

    add_multiline(slide, left_x + 0.3, 4.2, col_w - 0.6, 6.0,
                  [
                      '它是导航页，不是百科全书',
                      '',
                      '不在 CLAUDE.md 里堆砌内容',
                      '',
                      '只放三件事：',
                      '  1. 项目定位（一句话）',
                      '  2. 文档索引（指向详细规范）',
                      '  3. 常用命令（快速启动）',
                      '',
                      'AI 需要时自行查阅详细文档',
                  ],
                  font_size=13, color=TEXT_LIGHT, line_spacing=1.0)

    # 右侧代码块
    code_text = (
        '# aip-portal\n'
        '\n'
        '## 项目定位\n'
        '企业级 Agent 管理平台（一句话）\n'
        '\n'
        '## 文档索引\n'
        '- 架构约束：.claude/rules/ARCHITECTURE.md\n'
        '- 编码规范：.claude/rules/CODE-STYLE.md\n'
        '  （详细规范见 docs/code-style/）\n'
        '\n'
        '## 常用命令\n'
        'mvn clean compile -pl bootstrap ...'
    )
    add_code_block(slide, MARGIN_L + col_w + col_gap, 3.0, col_w, 8.0,
                   code_text, font_size=11)

    # 底部总结
    add_rounded_rect(slide, MARGIN_L + 2, 12.0, CONTENT_W - 4, 1.5,
                     CARD_BG, ACCENT_BLUE, 1)
    add_text(slide, MARGIN_L + 2.5, 12.2, CONTENT_W - 5, 1.0,
             'CLAUDE.md = 导航索引，让 AI 快速定位所需规范，而不是把所有内容都塞进去',
             font_size=14, color=TEXT_LIGHT, alignment='center')

    add_page_num(slide, 31)

    # ========== P32 SDD 落地：ARCHITECTURE.md ==========
    slide = new_slide(prs)
    add_page_title(slide, 'SDD 落地：ARCHITECTURE.md（架构约束）')

    # 说明
    add_text(slide, MARGIN_L, 2.8, CONTENT_W, 0.6,
             'aip-portal 的 ARCHITECTURE.md（124 行），每次会话自动加载',
             font_size=13, color=TEXT_GRAY)

    # 四个要点卡片 2x2 布局
    card_w = 14.3
    card_h = 3.8
    col_gap = 1.5
    row_gap = 0.8

    points = [
        ('Maven 模块划分', [
            'bootstrap（启动模块）',
            'sql-migration-starter（SQL 版本管理）',
            '清晰的模块边界定义',
        ], ACCENT_BLUE),
        ('SQL 版本管理策略', [
            '开发环境：禁用 Flyway',
            '发版阶段：SQL 冻结',
            '生产环境：自动执行迁移',
        ], ACCENT_GREEN),
        ('分页查询方案', [
            'TypedSearchParam 统一查询参数',
            'PageResult 统一返回结构',
            'QueryWrapperUtil 工具类封装',
        ], ACCENT_YELLOW),
        ('RBAC 权限模型', [
            '菜单树结构管理',
            'JSON 权限字段存储',
            '细粒度权限控制',
        ], ACCENT_RED),
    ]

    positions = [
        (MARGIN_L, 3.8),
        (MARGIN_L + card_w + col_gap, 3.8),
        (MARGIN_L, 3.8 + card_h + row_gap),
        (MARGIN_L + card_w + col_gap, 3.8 + card_h + row_gap),
    ]

    for (x, y), (title, lines, clr) in zip(positions, points):
        add_card(slide, x, y, card_w, card_h, title, lines,
                 title_color=clr, border_top_color=clr,
                 title_size=14, content_size=12)

    # 底部总结
    add_rounded_rect(slide, MARGIN_L + 2, 13.5, CONTENT_W - 4, 1.5,
                     CARD_BG, ACCENT_BLUE, 1)
    add_text(slide, MARGIN_L + 2.5, 13.7, CONTENT_W - 5, 1.0,
             'AI 每次会话都知道项目核心架构约定，不再重复犯架构层面的错误',
             font_size=14, color=TEXT_LIGHT, alignment='center')

    add_page_num(slide, 32)

    # ========== P33 SDD 落地：CODE-STYLE.md ==========
    slide = new_slide(prs)
    add_page_title(slide, 'SDD 落地：CODE-STYLE.md（仅 14 行的索引）')

    col_w = 14.3
    col_gap = 1.5

    # 左侧设计理念
    left_x = MARGIN_L
    add_text(slide, left_x, 3.2, col_w, 0.6,
             '设计理念', font_size=16, color=ACCENT_BLUE, bold=True)

    add_multiline(slide, left_x + 0.3, 4.0, col_w - 0.6, 5.0,
                  [
                      '不在 rules/ 里放编码细节',
                      '',
                      '而是索引到 docs/code-style/ 下的 8 个专题文档',
                      '',
                      'AI 只在需要时才加载具体规范',
                      '',
                      '这样既保证了 Token 效率，',
                      '又不丢失编码规范的完整性',
                  ],
                  font_size=13, color=TEXT_LIGHT, line_spacing=1.0)

    # 右侧两色说明
    right_x = MARGIN_L + col_w + col_gap
    right_w = col_w

    # 核心约束 - 自动加载
    add_card(slide, right_x, 3.2, right_w, 2.8,
             '核心约束 -> 自动加载（每次会话）',
             [
                 'CODE-STYLE.md（14 行索引）',
                 'AI 每次启动自动读取',
             ],
             title_color=ACCENT_GREEN, border_top_color=ACCENT_GREEN,
             title_size=13, content_size=12)

    # 详细规范 - 按需加载
    add_card(slide, right_x, 6.3, right_w, 2.8,
             '详细规范 -> 按需加载（AI 自行查阅）',
             [
                 'docs/code-style/ 下的 8 个文档',
                 'AI 遇到具体场景时自动查阅',
             ],
             title_color=ACCENT_BLUE, border_top_color=ACCENT_BLUE,
             title_size=13, content_size=12)

    # 底部文档列表
    add_text(slide, MARGIN_L, 9.8, 6, 0.6,
             'docs/code-style/ 8 个专题文档：',
             font_size=13, color=TEXT_LIGHT, bold=True)

    docs = [
        '01-naming.md', '02-exception.md', '03-logging.md', '04-response.md',
        '05-controller.md', '06-service.md', '07-mapper.md', '08-convention.md',
    ]
    doc_w = 7.0
    doc_gap = 0.4
    doc_h = 1.0
    for i, doc in enumerate(docs):
        row = i // 4
        col = i % 4
        x = MARGIN_L + col * (doc_w + doc_gap)
        y = 10.6 + row * (doc_h + 0.3)
        add_rounded_rect(slide, x, y, doc_w, doc_h, CARD_BG, CARD_BORDER, 1)
        add_text(slide, x + 0.2, y + 0.1, doc_w - 0.4, 0.7, doc,
                 font_size=11, color=CODE_GREEN, font_name='Courier New')

    add_page_num(slide, 33)
