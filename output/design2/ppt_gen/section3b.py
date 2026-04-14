"""PPT P34-P41: Harness Engineering 实践"""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

import utils


def add_slides(prs):
    """生成 P34-P41 共8页幻灯片"""

    # ==================== P34 什么是 Harness Engineering ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '什么是 Harness Engineering？')

    # 定义大字
    utils.add_text(slide, 1.8, 2.8, 30.27, 1.5,
                   'Harness = 为 AI 搭建的"工作脚手架"',
                   font_size=24, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    # 四个要素卡片 2x2
    card_w = 14.0
    card_h = 3.5
    gap_x = 2.27  # 30.27 - 14*2 = 2.27
    gap_y = 0.5
    start_y = 4.5

    # 第一行
    utils.add_card(slide, 1.8, start_y, card_w, card_h,
                   '规范文件', ['CLAUDE.md — 项目导航与核心约定',
                                'rules/ — 核心约束（自动加载）'],
                   title_color=utils.ACCENT_BLUE, content_size=11)

    utils.add_card(slide, 1.8 + card_w + gap_x, start_y, card_w, card_h,
                   '权限配置', ['settings.json — 控制工具调用权限',
                                'settings.local.json — 本地权限管理'],
                   title_color=utils.ACCENT_BLUE, content_size=11)

    # 第二行
    row2_y = start_y + card_h + gap_y
    utils.add_card(slide, 1.8, row2_y, card_w, card_h,
                   '自定义技能', ['Skills — 可复用的自动化操作',
                                  '将高频操作封装为快捷命令'],
                   title_color=utils.ACCENT_BLUE, content_size=11)

    utils.add_card(slide, 1.8 + card_w + gap_x, row2_y, card_w, card_h,
                   '工作流配置', ['Plan — 任务规划与拆解',
                                  'Worktree — 并行开发隔离'],
                   title_color=utils.ACCENT_BLUE, content_size=11)

    # 底部目标
    utils.add_text(slide, 1.8, 16.8, 30.27, 1.2,
                   '让 AI 在你的项目里工作得又快又准',
                   font_size=20, color=utils.TEXT_LIGHT, bold=True, alignment='center')

    utils.add_page_num(slide, 34)

    # ==================== P35 Harness 的三大支柱 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'Harness 的三大支柱')

    # 上方大字
    utils.add_text(slide, 1.8, 2.8, 30.27, 1.2,
                   'Harness = 让你的项目对 AI 友好',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    # 三个支柱卡片
    pillar_w = 9.5
    pillar_h = 7.5
    pillar_gap = 0.9  # (30.27 - 9.5*3) / 2
    pillar_y = 4.3

    utils.add_card(slide, 1.8, pillar_y, pillar_w, pillar_h,
                   '上下文工程',
                   ['给 AI 正确的信息',
                    '',
                    'rules — 核心约束文件',
                    'CLAUDE.md — 项目导航',
                    '知识库 — 参考资料'],
                   title_color=utils.ACCENT_BLUE, content_size=12,
                   border_top_color=utils.ACCENT_BLUE)

    utils.add_card(slide, 1.8 + pillar_w + pillar_gap, pillar_y, pillar_w, pillar_h,
                   '架构约束',
                   ['让 AI 在框架内工作',
                    '',
                    '技术栈限制',
                    '目录结构约定',
                    '编码规范约束'],
                   title_color=utils.ACCENT_GREEN, content_size=12,
                   border_top_color=utils.ACCENT_GREEN)

    utils.add_card(slide, 1.8 + (pillar_w + pillar_gap) * 2, pillar_y, pillar_w, pillar_h,
                   '熵管理',
                   ['防止混乱累积',
                    '',
                    '定期清理规则文件',
                    '精简过时约束',
                    '代码评审反馈'],
                   title_color=utils.ACCENT_YELLOW, content_size=12,
                   border_top_color=utils.ACCENT_YELLOW)

    utils.add_page_num(slide, 35)

    # ==================== P36 Harness 搭建：起步（混乱期）====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'Harness 搭建：没有系统化的代价（aip-portal 教训）', font_size=22)

    # 四个症状卡片 2x2，红色边框
    card_w = 14.0
    card_h = 3.2
    gap_x = 2.27
    gap_y = 0.6
    start_y = 3.5

    utils.add_card(slide, 1.8, start_y, card_w, card_h,
                   'AI 每次会话都在"重新认识项目"',
                   ['缺少系统化的上下文注入，AI 反复犯同样的错误',
                    '每次新会话都要重新解释项目架构和约定'],
                   title_color=utils.ACCENT_RED, content_size=11,
                   border_color=utils.ACCENT_RED)

    utils.add_card(slide, 1.8 + card_w + gap_x, start_y, card_w, card_h,
                   'rules 膨胀到 6000+ 行',
                   ['规则越多，AI 反而越"懵"',
                    '冗余和矛盾的规则让 AI 无所适从'],
                   title_color=utils.ACCENT_RED, content_size=11,
                   border_color=utils.ACCENT_RED)

    row2_y = start_y + card_h + gap_y
    utils.add_card(slide, 1.8, row2_y, card_w, card_h,
                   '犯错 → 加规则 → 再犯错 → 恶性循环',
                   ['头痛医头，脚痛医脚',
                    '规则不断堆积但没有系统化整理'],
                   title_color=utils.ACCENT_RED, content_size=11,
                   border_color=utils.ACCENT_RED)

    utils.add_card(slide, 1.8 + card_w + gap_x, row2_y, card_w, card_h,
                   '权限配置混乱',
                   ['settings.local.json 累积 58 条允许规则',
                    '权限过于宽松，存在误操作风险'],
                   title_color=utils.ACCENT_RED, content_size=11,
                   border_color=utils.ACCENT_RED)

    # 底部教训
    utils.add_text(slide, 1.8, 16.5, 30.27, 1.2,
                   '没有 Harness 的 AI 编程，靠的是个人"手感"',
                   font_size=20, color=utils.ACCENT_RED, bold=True, alignment='center')

    utils.add_page_num(slide, 36)

    # ==================== P37 Harness 搭建：转折 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '转折：痛定思痛，四个关键动作')

    # 四步卡片横向排列
    step_w = 7.0
    step_h = 7.0
    step_gap = 0.35  # (30.27 - 7*4) / 3
    step_y = 3.2

    steps = [
        ('1. 规范精简', ['6000+ 行 → 272 行',
                         '',
                         '大清理运动',
                         '删除冗余和过时规则',
                         '保留核心约束'], utils.ACCENT_BLUE),
        ('2. 分层架构', ['rules/ + docs/ 双层结构',
                         '',
                         'rules/ — 核心约束（自动加载）',
                         'docs/ — 详细规范（按需引用）',
                         '职责清晰，互不干扰'], utils.ACCENT_GREEN),
        ('3. 复盘机制', ['每次踩坑完善规范',
                         '',
                         '不只是修 bug',
                         '而是完善 Harness',
                         '让同类问题不再发生'], utils.ACCENT_YELLOW),
        ('4. 权限收敛', ['只保留必要权限配置',
                         '',
                         '从 58 条精简到必要条目',
                         '减少误操作风险',
                         '权限最小化原则'], utils.ACCENT_RED),
    ]

    for i, (title, lines, color) in enumerate(steps):
        x = 1.8 + i * (step_w + step_gap)
        utils.add_card(slide, x, step_y, step_w, step_h,
                       title, lines,
                       title_color=color, content_size=11,
                       border_top_color=color)

    # 底部连接箭头提示
    utils.add_text(slide, 1.8, 16.5, 30.27, 1.0,
                   '四个动作相互配合，形成 Harness 建设闭环',
                   font_size=14, color=utils.TEXT_GRAY, alignment='center')

    utils.add_page_num(slide, 37)

    # ==================== P38 知识体系三层架构 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '知识体系三层架构')

    # 三层金字塔（从上到下，不同宽度的矩形）
    layer_y = 3.2
    layer_gap = 0.4
    layer_h = 3.8

    # 第一层（顶部，小）
    l1_w = 16.0
    l1_x = 1.8 + (30.27 - l1_w) / 2
    utils.add_card(slide, l1_x, layer_y, l1_w, layer_h,
                   '全局层  (~/.claude/)',
                   ['通用规则、个人偏好、MCP 工具配置',
                    '所有项目共享，提供跨项目的一致性基础'],
                   title_color=utils.ACCENT_BLUE, content_size=12,
                   border_top_color=utils.ACCENT_BLUE)

    # 第二层（中部，中）
    l2_w = 24.0
    l2_x = 1.8 + (30.27 - l2_w) / 2
    layer_y2 = layer_y + layer_h + layer_gap
    utils.add_card(slide, l2_x, layer_y2, l2_w, layer_h,
                   '项目层  (项目 .claude/)',
                   ['CLAUDE.md（23行）+ rules/（272行）+ settings.local.json',
                    '项目专属约束，随项目版本管理，团队可共享'],
                   title_color=utils.ACCENT_GREEN, content_size=12,
                   border_top_color=utils.ACCENT_GREEN)

    # 第三层（底部，大）
    l3_w = 30.27
    l3_x = 1.8
    layer_y3 = layer_y2 + layer_h + layer_gap
    utils.add_card(slide, l3_x, layer_y3, l3_w, layer_h,
                   '会话层  (对话中)',
                   ['临时约束、特定任务指导、即时反馈',
                    '一次性使用，不持久化，适合探索性任务'],
                   title_color=utils.ACCENT_YELLOW, content_size=12,
                   border_top_color=utils.ACCENT_YELLOW)

    # 右侧标注
    note_x = l1_x + l1_w + 0.3
    utils.add_text(slide, note_x, 3.8, 5.0, 0.6, '← 最轻',
                   font_size=10, color=utils.TEXT_GRAY)
    utils.add_text(slide, l3_x + l3_w - 5.0, layer_y3 + 0.3, 5.0, 0.6, '最重 →',
                   font_size=10, color=utils.TEXT_GRAY, alignment='right')

    utils.add_page_num(slide, 38)

    # ==================== P39 Harness 搭建：结果 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'Harness 成型后的改善')

    # 三个改善卡片（绿色）
    card_w = 9.5
    card_h = 5.5
    card_gap = 0.9
    card_y = 3.5

    utils.add_card(slide, 1.8, card_y, card_w, card_h,
                   'AI 编码准确率稳定提升',
                   ['Harness 为 AI 提供了准确的',
                    '项目上下文和技术约束，',
                    '显著减少了"幻觉"和',
                    '不符合项目规范的代码输出。'],
                   title_color=utils.ACCENT_GREEN, content_size=12,
                   border_top_color=utils.ACCENT_GREEN)

    utils.add_card(slide, 1.8 + card_w + card_gap, card_y, card_w, card_h,
                   '重复性错误逐步减少',
                   ['通过复盘机制将教训',
                    '沉淀到 rules 中，',
                    '同类问题不再重复出现，',
                    '形成持续改进的闭环。'],
                   title_color=utils.ACCENT_GREEN, content_size=12,
                   border_top_color=utils.ACCENT_GREEN)

    utils.add_card(slide, 1.8 + (card_w + card_gap) * 2, card_y, card_w, card_h,
                   '新会话快速上手',
                   ['知识已沉淀在 Harness 中，',
                    '新会话无需重新解释',
                    '项目背景，即可高效',
                    '进入工作状态。'],
                   title_color=utils.ACCENT_GREEN, content_size=12,
                   border_top_color=utils.ACCENT_GREEN)

    # 数据证据
    utils.add_text(slide, 1.8, 14.5, 30.27, 1.0,
                   '259 次提交中，rules 相关提交集中在 4 月初仅 9 天；之后趋于稳定',
                   font_size=12, color=utils.TEXT_GRAY, alignment='center')

    # 底部结论
    utils.add_text(slide, 1.8, 16.0, 30.27, 1.2,
                   'Harness 到了稳定期后，维护成本很低',
                   font_size=18, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_page_num(slide, 39)

    # ==================== P40 补充案例：aip-gateway ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '补充案例：aip-gateway（主动系统化）')

    # 流程图（四个节点，横向）
    node_w = 5.5
    node_h = 1.5
    arrow_w = 1.2
    node_gap = arrow_w
    total_flow_w = node_w * 4 + arrow_w * 3
    flow_start_x = 1.8 + (30.27 - total_flow_w) / 2
    flow_y = 3.2

    nodes = [
        ('qoder 编写 PRD', utils.ACCENT_BLUE),
        ('转化为技术 Spec', utils.ACCENT_GREEN),
        ('Claude Code\n多轮审阅 (v1→v1.9)', utils.ACCENT_YELLOW),
        ('Agent Team 编码', utils.ACCENT_RED),
    ]

    for i, (text, color) in enumerate(nodes):
        x = flow_start_x + i * (node_w + node_gap)
        utils.add_flow_node(slide, x, flow_y, node_w, node_h, text,
                            fill_color=color, font_size=11)
        if i < 3:
            arrow_x = x + node_w
            utils.add_arrow_right(slide, arrow_x, flow_y + 0.45,
                                  width=arrow_w, height=0.6, color=utils.TEXT_GRAY)

    # 项目数据卡片（两列）
    data_y = 5.5
    data_w = 14.0
    data_h = 3.0
    data_gap_x = 2.27

    utils.add_card(slide, 1.8, data_y, data_w, data_h,
                   '项目数据',
                   ['AMG 核心模块：59 个 Java 文件，仅 2 天完成',
                    '技术栈：Spring WebFlux + R2DBC + Redis Reactive（响应式全链路）'],
                   title_color=utils.ACCENT_BLUE, content_size=11)

    utils.add_card(slide, 1.8 + data_w + data_gap_x, data_y, data_w, data_h,
                   'Harness 配置',
                   ['CLAUDE.md：237 行，含架构说明、A2A 协议决策记录',
                    '设计文档：v1→v1.9 共 9 轮迭代审阅'],
                   title_color=utils.ACCENT_GREEN, content_size=11)

    # 底部总结
    utils.add_text(slide, 1.8, 16.0, 30.27, 1.2,
                   '没有经历混乱期，从一开始就是系统化的',
                   font_size=18, color=utils.ACCENT_GREEN, bold=True, alignment='center')

    utils.add_page_num(slide, 40)

    # ==================== P41 aip-portal vs aip-gateway 对比 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '两种 Harness 建设路径对比')

    # 对比表格
    headers = ['维度', 'aip-portal（被动建设）', 'aip-gateway（主动建设）']
    rows = [
        ['建设方式', '先踩坑再补规范', 'Day 1 就建规范'],
        ['混乱期', '经历约 2 个月', '基本没有'],
        ['rules/', '3 个文件，272 行', '集中在 CLAUDE.md（237 行）'],
        ['工作流', 'worktree 并行，24 个', 'PRD → Spec → 审阅 → 编码'],
        ['提交数', '259 次', '209 次'],
        ['Java 文件', '281 个', '584 个（含 18 个插件）'],
    ]
    col_widths = [5.0, 12.635, 12.635]

    utils.add_table(slide, 1.8, 3.2, 30.27, headers, rows, col_widths, row_h=1.3)

    # 底部启示
    utils.add_text(slide, 1.8, 16.3, 30.27, 1.2,
                   '有了方法论之后，新项目可以少走很多弯路',
                   font_size=20, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_page_num(slide, 41)
