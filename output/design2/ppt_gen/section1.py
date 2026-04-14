import sys, os; sys.path.insert(0, os.path.dirname(__file__))
import utils
from utils import (ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED, ACCENT_YELLOW,
                   TEXT_LIGHT, TEXT_GRAY, CARD_BG, CARD_BORDER, DARKER_BG,
                   WHITE, SLIDE_W, SLIDE_H, MARGIN_L, CONTENT_W)


def add_slides(prs):
    """生成 P1-P14 共14页幻灯片"""

    # ==================== P1 封面页 ====================
    slide = utils.add_cover_page(prs)
    utils.add_page_num(slide, 1)

    # ==================== P2 开场：关于这次分享 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '关于这次分享')

    lines = [
        '\U0001f3d7  三个真实 Java 项目的 AI 协作编程经历',
        '\U0001f3a2  有成功的喜悦，也有翻车的教训',
        '\U0001f3af  目标：听完之后，你能带走一些可以马上用的东西',
    ]
    utils.add_multiline(slide, MARGIN_L, 4.5, CONTENT_W, 6, lines,
                        font_size=20, color=TEXT_LIGHT, line_spacing=1.8)

    utils.add_text(slide, MARGIN_L, 15.5, CONTENT_W, 1,
                   '预计 90 分钟 | 鼓励随时提问',
                   font_size=14, color=ACCENT_YELLOW, alignment='center')
    utils.add_page_num(slide, 2)

    # ==================== P3 Part 1 标题页 ====================
    slide = utils.add_section_divider(prs, 'Part 01', '从真实项目说起', '两个案例，两种结局')
    utils.add_page_num(slide, 3)

    # ==================== P4 案例一：aip-server 项目概览 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'aip-server 项目概览')

    # 左侧 - 项目定位
    left_w = 12
    utils.add_card(slide, MARGIN_L, 3.5, left_w, 5.0,
                   'aip-server', [
                       'AI 智能平台后端服务',
                       '企业级智能体管理、知识库、数据分析平台',
                   ],
                   title_color=ACCENT_BLUE, content_size=14)

    # 右侧 - 三行关键数据卡片
    right_l = MARGIN_L + left_w + 0.8
    right_w = CONTENT_W - left_w - 0.8
    card_h = 3.5
    gap = 0.5

    utils.add_card(slide, right_l, 3.5, right_w, card_h,
                   '关键数据', [
                       '100 个 Controller | 11 个业务模块 | 2394 次提交',
                   ],
                   title_color=ACCENT_YELLOW, content_size=13)

    utils.add_card(slide, right_l, 3.5 + card_h + gap, right_w, card_h,
                   '技术栈', [
                       'Spring Boot 2.7.18 + MyBatis Plus 3.4.2',
                       'PostgreSQL + Java 17',
                   ],
                   title_color=ACCENT_GREEN, content_size=13)

    utils.add_card(slide, right_l, 3.5 + (card_h + gap) * 2, right_w, card_h,
                   '多数据源 & 微服务', [
                       'PostgreSQL + Neo4j + Dremio',
                       'Feign 微服务调用',
                   ],
                   title_color=ACCENT_BLUE, content_size=13)

    utils.add_page_num(slide, 4)

    # ==================== P5 案例一：聚焦技能工具模块 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '聚焦技能工具模块（logic/tool）')

    # 上方说明
    utils.add_text(slide, MARGIN_L, 3.2, CONTENT_W, 0.8,
                   '5 个 Controller，约 80 个 API 端点，8 个核心实体',
                   font_size=14, color=TEXT_GRAY)

    # 五列卡片
    col_w = 5.3
    col_gap = (CONTENT_W - col_w * 5) / 4
    cards_top = 4.5
    card_h = 6.0

    controllers = [
        ('代码库管理', 'LtCodeRepoController'),
        ('MCP 服务', 'LtMcpController'),
        ('扩展插件', 'LtExtensionPluginController'),
        ('OpenAPI', 'LtOpenapiController'),
        ('工作流', 'LtTaskflowController'),
    ]
    for i, (name, ctrl) in enumerate(controllers):
        x = MARGIN_L + i * (col_w + col_gap)
        utils.add_card(slide, x, cards_top, col_w, card_h,
                       name, [ctrl],
                       title_color=ACCENT_BLUE, content_size=11,
                       content_color=TEXT_GRAY, border_top_color=ACCENT_BLUE,
                       title_size=13)
    utils.add_page_num(slide, 5)

    # ==================== P6 案例一：协作模式 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '协作模式 — 人与 AI 的分工')

    # 横向流程图：4个节点 + 3个箭头
    node_w = 5.8
    node_h = 3.0
    arrow_w = 1.2
    total_w = node_w * 4 + arrow_w * 3
    start_x = MARGIN_L + (CONTENT_W - total_w) / 2
    flow_top = 4.0

    nodes = [
        ('\U0001f9d1 人设计原型', ACCENT_BLUE),
        ('\U0001f9d1 人设计表结构', ACCENT_BLUE),
        ('\U0001f916 AI 编码', ACCENT_GREEN),
        ('\U0001f9d1 人评审 & 测试', ACCENT_BLUE),
    ]
    for i, (text, color) in enumerate(nodes):
        x = start_x + i * (node_w + arrow_w)
        utils.add_flow_node(slide, x, flow_top, node_w, node_h, text,
                            fill_color=color, font_size=14)

    # "AI参与讨论" 附注在第二个节点下方
    note_x = start_x + 1 * (node_w + arrow_w)
    utils.add_text(slide, note_x, flow_top + node_h + 0.3, node_w, 0.6,
                   '（AI 参与讨论）',
                   font_size=10, color=TEXT_GRAY, alignment='center')

    # 箭头
    for i in range(3):
        ax = start_x + (i + 1) * node_w + i * arrow_w
        utils.add_arrow_right(slide, ax, flow_top + node_h / 2 - 0.3,
                              arrow_w, 0.6, color=TEXT_GRAY)

    # 下方三条原则
    principles = [
        '\u2705 人负责"定方向"（设计、评审、验收）',
        '\u2705 AI 负责"跑量"（编码实现）',
        '\u2705 及时评审，小步验证',
    ]
    utils.add_multiline(slide, MARGIN_L + 2, 10.5, CONTENT_W - 4, 4, principles,
                        font_size=14, color=TEXT_LIGHT, line_spacing=1.8,
                        bullet_char=None)
    utils.add_page_num(slide, 6)

    # ==================== P7 案例一：关键成果 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '关键成果')

    # 顶部两个大数字卡片
    num_card_w = 14
    num_card_gap = 0.8
    num_card_h = 4.0

    utils.add_rounded_rect(slide, MARGIN_L, 3.5, num_card_w, num_card_h,
                           CARD_BG, CARD_BORDER)
    utils.add_big_number(slide, MARGIN_L, 3.8,
                         '5天', '完成 ~80 个 API 端点（29次提交，3月4-11日）',
                         num_color=ACCENT_BLUE, num_size=40, width=num_card_w)

    right_card_x = MARGIN_L + num_card_w + num_card_gap
    utils.add_rounded_rect(slide, right_card_x, 3.5, num_card_w, num_card_h,
                           CARD_BG, CARD_BORDER)
    utils.add_big_number(slide, right_card_x, 3.8,
                         '2-4倍', '效率提升（对比传统开发估计值）',
                         num_color=ACCENT_BLUE, num_size=40, width=num_card_w)

    # 中部说明
    utils.add_rounded_rect(slide, MARGIN_L, 8.2, CONTENT_W, 2.0,
                           CARD_BG, ACCENT_YELLOW)
    utils.add_text(slide, MARGIN_L + 0.5, 8.5, CONTENT_W - 1, 1.5,
                   '13 次 fix 提交（占 45%）— AI 代码有小错漏，但人在评审中及时捕获',
                   font_size=14, color=ACCENT_YELLOW, bold=True)

    # 底部成功基础
    success_items = [
        '\u2705 表结构设计清晰，AI 有明确的编码边界',
        '\u2705 每次提交后及时 Code Review，问题不过夜',
        '\u2705 人工编码约需 15-20 天，AI 协作仅用 5 天',
    ]
    utils.add_multiline(slide, MARGIN_L + 0.5, 11.0, CONTENT_W - 1, 5,
                        success_items, font_size=14, color=ACCENT_GREEN,
                        line_spacing=1.8)
    utils.add_page_num(slide, 7)

    # ==================== P8 案例一：小结 ====================
    slide = utils.new_slide(prs)
    utils.add_text(slide, 2, 4.5, CONTENT_W, 2.5,
                   '设计到位 + 边界清晰 = AI 效率拉满',
                   font_size=32, color=ACCENT_BLUE, bold=True, alignment='center')

    summary_items = [
        '\u2705 表结构设计清晰 \u2192 AI 有明确边界',
        '\u2705 及时评审，小步验证',
        '\u2705 人把控方向，AI 堆砌工作量',
    ]
    utils.add_multiline(slide, MARGIN_L + 3, 8.5, CONTENT_W - 6, 6,
                        summary_items, font_size=18, color=ACCENT_GREEN,
                        line_spacing=2.0)
    utils.add_page_num(slide, 8)

    # ==================== P9 案例二：A2A 适配器 — 项目背景 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '案例二：A2A 适配器（一场代价惨痛的返工）')

    # 左侧背景信息卡片
    left_w = CONTENT_W * 0.50
    right_w = CONTENT_W * 0.45
    card_gap = CONTENT_W - left_w - right_w

    utils.add_card(slide, MARGIN_L, 3.5, left_w, 8.0,
                   '背景信息', [
                       '需求：开发 A2A（Agent-to-Agent）协议适配器',
                       '所在项目：aip-gateway 的 a2a-wrapper 插件',
                       '背景：相对陌生的领域，没有深入调研',
                   ],
                   title_color=ACCENT_BLUE, content_size=14)

    # 右侧红色警示卡片
    right_x = MARGIN_L + left_w + card_gap
    utils.add_card(slide, right_x, 3.5, right_w, 8.0,
                   '\u26a0\ufe0f  协作方式', [
                       '让 AI 根据协议文档直接编码',
                       '',
                       '\u26a0\ufe0f 关键问题：',
                       '自己对 A2A 不了解，',
                       '无法判断 AI 输出是否正确',
                   ],
                   title_color=ACCENT_RED, content_size=14,
                   border_top_color=ACCENT_RED, content_color=ACCENT_RED)
    utils.add_page_num(slide, 9)

    # ==================== P10 案例二：发生了什么 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '发生了什么')

    # 垂直时间线 - 左侧区域
    tl_x = MARGIN_L
    node_w_tl = 14
    node_h_tl = 2.0
    arrow_h_tl = 0.6
    tl_top = 3.2
    tl_items = [
        ('\U0001f7e2 第1天：让 AI 根据 A2A 协议文档直接编码', ACCENT_GREEN),
        ('\U0001f534 第1-2周：AI "高效"产出大量代码（46次提交，16天）', ACCENT_RED),
        ('\U0001f534 关键问题：自己无法判断 AI 输出是否符合协议', ACCENT_RED),
        ('\U0001f534 深入调研：发现有官方 Java SDK（a2aproject/a2a-java）', ACCENT_RED),
        ('\U0001f7e2 推倒重来：用 SDK 3天搞定', ACCENT_GREEN),
    ]

    for i, (text, color) in enumerate(tl_items):
        y = tl_top + i * (node_h_tl + arrow_h_tl)
        utils.add_flow_node(slide, tl_x, y, node_w_tl, node_h_tl,
                            text, fill_color=color, font_size=11)
        if i < len(tl_items) - 1:
            utils.add_arrow_down(slide, tl_x + node_w_tl / 2 - 0.3,
                                 y + node_h_tl, 0.6, arrow_h_tl, color=TEXT_GRAY)

    # 右侧数字对比
    right_x = tl_x + node_w_tl + 1.5
    right_w_num = CONTENT_W - node_w_tl - 1.5

    utils.add_rounded_rect(slide, right_x, 4.5, right_w_num, 6.5,
                           CARD_BG, ACCENT_RED)
    utils.add_text(slide, right_x, 5.0, right_w_num, 1.5,
                   '141,026 行', font_size=30, color=ACCENT_RED,
                   bold=True, alignment='center')
    utils.add_text(slide, right_x, 6.8, right_w_num, 1,
                   '\u2193', font_size=28, color=TEXT_GRAY, alignment='center')
    utils.add_text(slide, right_x, 7.5, right_w_num, 1.5,
                   '1,786 行', font_size=30, color=ACCENT_GREEN,
                   bold=True, alignment='center')
    utils.add_text(slide, right_x, 9.5, right_w_num, 1,
                   '代码量缩减 98.7%',
                   font_size=14, color=ACCENT_YELLOW, alignment='center')
    utils.add_page_num(slide, 10)

    # ==================== P11 案例二：翻车现场（一）造轮子 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '翻车现场（一）— AI 造了个轮子')

    # 左右对比布局
    cmp_w = CONTENT_W * 0.47
    cmp_gap = CONTENT_W - cmp_w * 2
    cmp_top = 3.5
    cmp_h = 6.5

    # 左 - 红色边框（自研方案）
    utils.add_card(slide, MARGIN_L, cmp_top, cmp_w, cmp_h,
                   '\u274c 自研方案', [
                       '从零开始编码，全程自信输出',
                       '16 天，46 次提交，141,026 行代码',
                       '看似完整，实则走弯路',
                   ],
                   title_color=ACCENT_RED, content_size=13,
                   border_top_color=ACCENT_RED, content_color=TEXT_LIGHT)

    # 右 - 绿色边框（官方 SDK）
    right_x = MARGIN_L + cmp_w + cmp_gap
    utils.add_card(slide, right_x, cmp_top, cmp_w, cmp_h,
                   '\u2705 官方 SDK 方案', [
                       '发现 a2aproject/a2a-java',
                       '3 天完成，仅 1,786 行',
                       '稳定性、兼容性有保障',
                   ],
                   title_color=ACCENT_GREEN, content_size=13,
                   border_top_color=ACCENT_GREEN, content_color=TEXT_LIGHT)

    # 底部黄色警示框
    warn_top = cmp_top + cmp_h + 1.0
    utils.add_rounded_rect(slide, MARGIN_L, warn_top, CONTENT_W, 2.5,
                           CARD_BG, ACCENT_YELLOW)
    utils.add_text(slide, MARGIN_L + 0.5, warn_top + 0.3, CONTENT_W - 1, 2,
                   '\u26a0\ufe0f AI 不会主动告诉你"有更好的方案"，'
                   '方向是你定的，AI 不负责纠偏',
                   font_size=16, color=ACCENT_YELLOW, bold=True)
    utils.add_page_num(slide, 11)

    # ==================== P12 案例二：翻车现场（二）更多教训 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '翻车现场（二）— 三个小案例')

    # 三张并排卡片
    card_w = (CONTENT_W - 0.8 * 2) / 3
    card_gap2 = 0.8
    card_top = 3.5
    card_h2 = 12.0

    cases = [
        ('SQL 版本号错误', [
            '生成了 V2.2.14 而非 V2.2.13',
            '没有先查现有版本文件',
            '数据库迁移执行失败',
            '',
            '复盘：修改前先检查现有版本',
        ]),
        ('修改已冻结脚本', [
            '修改了已冻结的',
            'V2.2.13__init.sql',
            '已部署环境文件摘要不一致',
            '',
            '复盘：Flyway 已冻结脚本',
            '严禁修改',
        ]),
        ('权限过滤偏差', [
            '把应交给前端的逻辑',
            '保留在后端',
            '后端多了不必要的权限检查',
            '',
            '复盘：用户级权限判断',
            '交给前端',
        ]),
    ]
    for i, (title, lines) in enumerate(cases):
        x = MARGIN_L + i * (card_w + card_gap2)
        utils.add_card(slide, x, card_top, card_w, card_h2,
                       title, lines,
                       title_color=ACCENT_RED, content_size=12,
                       border_top_color=ACCENT_RED, content_color=TEXT_LIGHT,
                       title_size=13)
    utils.add_page_num(slide, 12)

    # ==================== P13 案例二：小结 ====================
    slide = utils.new_slide(prs)
    utils.add_text(slide, 2, 4.5, CONTENT_W, 2.5,
                   '方向错了，效率越高代价越大',
                   font_size=32, color=ACCENT_RED, bold=True, alignment='center')

    # 根因分析 - 箭头递进四步
    step_w = 5.5
    step_h = 2.0
    arrow_w2 = 1.0
    total_steps_w = step_w * 4 + arrow_w2 * 3
    step_start_x = MARGIN_L + (CONTENT_W - total_steps_w) / 2
    step_top = 8.5

    steps = [
        '对领域不了解',
        '没有先建立认知',
        '盲目信任 AI',
        'AI 高效跑偏',
    ]
    for i, text in enumerate(steps):
        x = step_start_x + i * (step_w + arrow_w2)
        c = ACCENT_RED if i == 3 else ACCENT_BLUE
        utils.add_flow_node(slide, x, step_top, step_w, step_h, text,
                            fill_color=c, font_size=13)

    for i in range(3):
        ax = step_start_x + (i + 1) * step_w + i * arrow_w2
        utils.add_arrow_right(slide, ax, step_top + step_h / 2 - 0.3,
                              arrow_w2, 0.6, color=TEXT_GRAY)

    utils.add_text(slide, MARGIN_L, step_top - 1.2, CONTENT_W, 0.8,
                   '根因分析', font_size=14, color=TEXT_GRAY, alignment='center')
    utils.add_page_num(slide, 13)

    # ==================== P14 Part 1 收尾：两个案例的对比 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '两个案例，两种结局')

    # 左右分栏对比
    half_w = (CONTENT_W - 1.0) / 2
    cmp_top2 = 3.5
    cmp_h3 = 9.0

    # 左 - 绿色（成功）
    utils.add_card(slide, MARGIN_L, cmp_top2, half_w, cmp_h3,
                   '\u2705 aip-server', [
                       '设计清晰 + 边界明确',
                       '人定方向，AI 跑量',
                       '5 天 80 个接口',
                       '质量可靠',
                   ],
                   title_color=ACCENT_GREEN, content_size=14,
                   border_top_color=ACCENT_GREEN, content_color=TEXT_LIGHT)

    # 右 - 红色（翻车）
    right_x2 = MARGIN_L + half_w + 1.0
    utils.add_card(slide, right_x2, cmp_top2, half_w, cmp_h3,
                   '\u274c A2A 适配器', [
                       '方向不明 + 盲目信任',
                       '没有调研就动手',
                       '17 天返工，98.7% 代码废弃',
                   ],
                   title_color=ACCENT_RED, content_size=14,
                   border_top_color=ACCENT_RED, content_color=TEXT_LIGHT)

    # 底部引出思考
    utils.add_text(slide, MARGIN_L, cmp_top2 + cmp_h3 + 1.2, CONTENT_W, 1.5,
                   '什么时候该信任 AI？如何系统地让 AI 编程越来越高效？',
                   font_size=16, color=ACCENT_BLUE, bold=True, alignment='center')
    utils.add_page_num(slide, 14)
