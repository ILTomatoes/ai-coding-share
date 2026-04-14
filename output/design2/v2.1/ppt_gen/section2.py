"""Part 2 反思：从案例到洞察 (P15-P21)"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
import utils


def add_slides(prs):
    # ==================== P15 Part 2 标题页（章节分隔页）====================
    slide = utils.add_section_divider(prs, 'Part 02', '反思', '从案例到洞察')
    utils.add_page_num(slide, 15)

    # ==================== P16 从案例中看到了什么 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '从案例中看到了什么')

    # 上方两行对比回扣
    utils.add_text(slide, 3.5, 3.5, 27, 0.8,
                   'aip-server 成功：人给了清晰的设计和边界',
                   font_size=13, color=utils.ACCENT_GREEN, alignment='center')
    utils.add_text(slide, 3.5, 4.4, 27, 0.8,
                   'A2A 失败：人没有给方向，AI 高效跑偏',
                   font_size=13, color=utils.ACCENT_RED, alignment='center')

    # 中心大字
    utils.add_text(slide, 2, 7.2, 30, 2.5,
                   'AI 的效率是确定的，不确定的是人的引导',
                   font_size=24, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    # 底部补充
    utils.add_text(slide, 3.5, 11, 27, 1,
                   '同一个 AI，同一个开发者，结果天壤之别',
                   font_size=14, color=utils.TEXT_GRAY, alignment='center')

    utils.add_page_num(slide, 16)

    # ==================== P17 AI 的潜力与边界 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'AI 的潜力与边界')

    # 左卡片 - 潜力（绿色主题）
    utils.add_card(slide, 1.8, 2.8, 14, 8.5,
                   '潜力 ✅',
                   content_lines=[
                       '编码效率提升 2-4 倍',
                       '擅长重复性工作、模式化代码',
                       '趋势明确，只会越来越强',
                   ],
                   title_color=utils.ACCENT_GREEN,
                   content_color=utils.TEXT_LIGHT,
                   border_top_color=utils.ACCENT_GREEN,
                   content_size=14)

    # 右卡片 - 边界（黄色主题）
    utils.add_card(slide, 17.9, 2.8, 14, 8.5,
                   '边界 ⚠️',
                   content_lines=[
                       '不了解领域背景时容易跑偏',
                       '缺乏全局视角，可能"局部最优、全局灾难"',
                       '不会主动质疑你的设计',
                   ],
                   title_color=utils.ACCENT_YELLOW,
                   content_color=utils.TEXT_LIGHT,
                   border_top_color=utils.ACCENT_YELLOW,
                   content_size=14)

    # 底部金句
    utils.add_text(slide, 2, 13, 30, 1.5,
                   'AI 是最强执行者，但不是合格的架构师',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_page_num(slide, 17)

    # ==================== P18 核心洞察：把最擅长的事交给 AI ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '核心洞察：把最擅长的事交给 AI')

    # 上方对比两行
    utils.add_text(slide, 3, 3.2, 28, 0.8,
                   '❌ 常见想法：先把不擅长的交给 AI，自己做好擅长的',
                   font_size=13, color=utils.TEXT_GRAY, alignment='center')
    utils.add_text(slide, 3, 4.2, 28, 0.8,
                   '✅ 实际经验：先把最擅长的事交给 AI',
                   font_size=15, color=utils.ACCENT_GREEN, bold=True, alignment='center')

    # 中部三个理由卡片横排
    card_w = 9.5
    card_h = 4.5
    card_gap = 0.5
    total_w = card_w * 3 + card_gap * 2
    start_x = (utils.SLIDE_W - total_w) / 2
    card_y = 5.8

    reasons = [
        ('1', '擅长 = 你能准确验收', '→ 质量有保障'),
        ('2', '这些工作对个人无成长价值', '属于纯工作量堆叠'),
        ('3', '释放时间', '→ 投入到研究、设计、架构等创造性工作'),
    ]

    for i, (num, line1, line2) in enumerate(reasons):
        x = start_x + i * (card_w + card_gap)
        utils.add_card(slide, x, card_y, card_w, card_h,
                       f'{num}.',
                       content_lines=[line1, line2],
                       title_color=utils.ACCENT_BLUE,
                       content_color=utils.TEXT_LIGHT,
                       content_size=13)

    # 底部例证
    utils.add_text(slide, 2, 13, 30, 0.8,
                   'aip-server 案例：表结构是我擅长的 → AI 编码我能准确评审',
                   font_size=11, color=utils.TEXT_GRAY, alignment='center')

    utils.add_page_num(slide, 18)

    # ==================== P19 角色转变 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '角色转变')

    # 第一行：过去流程（灰色调）
    past_y = 4.0
    past_label = '过去'
    utils.add_text(slide, 1.8, past_y - 0.8, 3, 0.7,
                   past_label, font_size=12, color=utils.TEXT_GRAY, bold=True)

    node_w = 5.5
    node_h = 1.6
    arrow_w = 0.8
    flow_start_x = 4.5
    past_nodes = [
        ('设计 ✍️', utils.CARD_BG, utils.TEXT_GRAY),
        ('编码 💻', utils.CARD_BG, utils.TEXT_GRAY),
        ('测试 🧪', utils.CARD_BG, utils.TEXT_GRAY),
    ]
    for i, (txt, bg, tc) in enumerate(past_nodes):
        nx = flow_start_x + i * (node_w + arrow_w + 0.3)
        utils.add_flow_node(slide, nx, past_y, node_w, node_h, txt,
                            fill_color=bg, text_color=tc, font_size=13)
        if i < len(past_nodes) - 1:
            ax = nx + node_w + 0.1
            utils.add_arrow_right(slide, ax, past_y + 0.5, arrow_w, 0.5,
                                  color=utils.TEXT_GRAY)

    # 标注
    utils.add_text(slide, flow_start_x + (3 * (node_w + arrow_w + 0.3)) + 0.3,
                   past_y + 0.3, 5, 0.7,
                   '全自己做', font_size=11, color=utils.TEXT_GRAY)

    # 第二行：现在流程（绿色高亮AI编码）
    now_y = 8.5
    utils.add_text(slide, 1.8, now_y - 0.8, 3, 0.7,
                   '现在', font_size=12, color=utils.ACCENT_BLUE, bold=True)

    now_nodes = [
        ('设计 ✍️', utils.CARD_BG, utils.TEXT_LIGHT),
        ('AI 编码 🤖', utils.ACCENT_GREEN, utils.WHITE),
        ('评审测试 🔍', utils.CARD_BG, utils.TEXT_LIGHT),
    ]
    for i, (txt, bg, tc) in enumerate(now_nodes):
        nx = flow_start_x + i * (node_w + arrow_w + 0.3)
        utils.add_flow_node(slide, nx, now_y, node_w, node_h, txt,
                            fill_color=bg, text_color=tc, font_size=13)
        if i < len(now_nodes) - 1:
            ax = nx + node_w + 0.1
            utils.add_arrow_right(slide, ax, now_y + 0.5, arrow_w, 0.5,
                                  color=utils.ACCENT_BLUE)

    # 标注
    utils.add_text(slide, flow_start_x + (3 * (node_w + arrow_w + 0.3)) + 0.3,
                   now_y + 0.3, 5, 0.7,
                   'AI 分担编码', font_size=11, color=utils.ACCENT_GREEN)

    # 底部金句
    utils.add_text(slide, 2, 14, 30, 1.5,
                   '从"写代码的人"变成"设计系统的人"',
                   font_size=24, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_page_num(slide, 19)

    # ==================== P20 陷阱：AI 会"PUA"你 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '⚠️ 陷阱：AI 会"PUA"你', color=utils.ACCENT_RED)

    # 上方三个红色卡片横排
    card_w = 9.5
    card_h = 3.5
    card_gap = 0.5
    total_w = card_w * 3 + card_gap * 2
    start_x = (utils.SLIDE_W - total_w) / 2
    card_y = 3.0

    pua_traits = [
        '永远自信满满\n即使方向错误',
        '语气笃定、逻辑自洽\n很容易被"说服"',
        '不会犹豫\n不会说"我不确定"',
    ]

    for i, trait in enumerate(pua_traits):
        x = start_x + i * (card_w + card_gap)
        lines = trait.split('\n')
        utils.add_card(slide, x, card_y, card_w, card_h,
                       f'特征 {i + 1}',
                       content_lines=lines,
                       title_color=utils.ACCENT_RED,
                       content_color=utils.TEXT_LIGHT,
                       border_top_color=utils.ACCENT_RED,
                       content_size=13)

    # 下方案例回扣
    utils.add_text(slide, 2.5, 8.0, 29, 0.6,
                   '案例回扣', font_size=14, color=utils.TEXT_LIGHT, bold=True)

    utils.add_text(slide, 2.5, 8.8, 29, 0.8,
                   'A2A：AI 全程自信地造了一个轮子，46 次提交，没有任何犹豫',
                   font_size=12, color=utils.TEXT_GRAY)
    utils.add_text(slide, 2.5, 9.8, 29, 1.2,
                   '权限过滤：AI 删除逻辑时的理由"完全合理"，但缺失了业务上下文',
                   font_size=12, color=utils.TEXT_GRAY)

    utils.add_page_num(slide, 20)

    # ==================== P21 关键问题：怎么让 AI 稳定输出高质量代码？====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '关键问题')

    # 递进式推演链 - 5个节点，箭头向下
    chain_x = (utils.SLIDE_W - 18) / 2  # 居中
    chain_w = 18
    node_h = 1.2
    arrow_h = 0.7
    start_y = 3.2

    chain_items = [
        '把擅长的事交给 AI',
        '但 AI 会 PUA 你',
        '靠个人判断力够吗？',
        '单靠经验 → 不可持续、不可复制',
        '团队协作？项目复杂了怎么办？',
    ]

    for i, item in enumerate(chain_items):
        ny = start_y + i * (node_h + arrow_h + 0.1)
        node_color = utils.ACCENT_BLUE if i == 0 else utils.CARD_BG
        text_c = utils.WHITE if i == 0 else utils.TEXT_LIGHT
        utils.add_flow_node(slide, chain_x, ny, chain_w, node_h, item,
                            fill_color=node_color, text_color=text_c, font_size=14)
        if i < len(chain_items) - 1:
            ay = ny + node_h + 0.05
            utils.add_arrow_down(slide, chain_x + chain_w / 2 - 0.3, ay,
                                 0.6, arrow_h, color=utils.ACCENT_BLUE)

    # 底部大字结论
    utils.add_text(slide, 2, 15.5, 30, 1.5,
                   '我们需要一套系统化的方法 →',
                   font_size=24, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_page_num(slide, 21)
