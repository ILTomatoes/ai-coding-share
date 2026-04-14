"""Section 4: 工具链与实战技巧 (P42-P52)"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); import utils


def add_slides(prs):
    # ==================== P42 Part 4 标题页 ====================
    utils.add_section_divider(prs, 'Part 04', '工具链与实战技巧', '可以立即带走的东西')
    slide = prs.slides[-1]
    utils.add_page_num(slide, 42)

    # ==================== P43 工具介绍：Claude Code ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'Claude Code — AI 编程的终端工具')
    utils.add_page_num(slide, 43)

    card_w = 14.0
    card_h = 6.0
    gap_x = 2.27
    gap_y = 1.2
    start_x = utils.MARGIN_L
    start_y = 3.2

    # Row 1
    utils.add_card(slide, start_x, start_y, card_w, card_h,
                   '🖥️ 终端原生体验',
                   ['直接在终端工作，与项目代码零距离',
                    '无需切换窗口，所见即所得'])

    utils.add_card(slide, start_x + card_w + gap_x, start_y, card_w, card_h,
                   '🔄 全流程闭环',
                   ['支持读取、编辑、执行，一站式完成',
                    '从需求理解到代码落地全链路覆盖'])

    # Row 2
    utils.add_card(slide, start_x, start_y + card_h + gap_y, card_w, card_h,
                   '📋 项目上下文理解',
                   ['自动加载 CLAUDE.md 和 rules/',
                    '理解项目架构与编码约定'])

    utils.add_card(slide, start_x + card_w + gap_x, start_y + card_h + gap_y, card_w, card_h,
                   '🚀 高级协作功能',
                   ['Plan模式 / Worktree并行开发',
                    'Agent Team 多智能体协作'])

    # ==================== P44 工具介绍：cc-switch ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, 'cc-switch — Claude Code 配置切换工具')
    utils.add_page_num(slide, 44)

    # 定义说明
    utils.add_text(slide, utils.MARGIN_L, 3.2, utils.CONTENT_W, 1.2,
                   '快速切换不同的 Claude Code 配置（模型选择、权限设置等）',
                   font_size=16, color=utils.TEXT_LIGHT)

    # 三个场景卡片
    scene_w = 9.0
    scene_h = 8.0
    scene_gap = 1.63
    scene_x = utils.MARGIN_L
    scene_y = 5.0

    utils.add_card(slide, scene_x, scene_y, scene_w, scene_h,
                   '不同项目不同配置',
                   ['每个项目有自己的 CLAUDE.md',
                    '和 rules/ 约束',
                    '一键切换，无需手动修改'],
                   border_top_color=utils.ACCENT_BLUE)

    utils.add_card(slide, scene_x + scene_w + scene_gap, scene_y, scene_w, scene_h,
                   '按任务复杂度选模型',
                   ['复杂任务用强模型',
                    '简单任务用快模型',
                    '节省 Token，提升效率'],
                   border_top_color=utils.ACCENT_GREEN)

    utils.add_card(slide, scene_x + (scene_w + scene_gap) * 2, scene_y, scene_w, scene_h,
                   '团队配置共享',
                   ['统一团队的编码规范',
                    '共享权限和工具配置',
                    '降低协作摩擦'],
                   border_top_color=utils.ACCENT_YELLOW)

    # ==================== P45 技巧一：小步快跑，持续验证 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '技巧一：小步快跑，持续验证')
    utils.add_page_num(slide, 45)

    # 循环图：三个节点 + 箭头（水平排列后用下箭头/回连表示循环）
    node_w = 4.0
    node_h = 1.8
    arrow_w = 1.2
    arrow_h = 0.6
    flow_y = 3.5
    flow_x = utils.MARGIN_L + 4.0

    utils.add_flow_node(slide, flow_x, flow_y, node_w, node_h, '设计',
                        fill_color=utils.ACCENT_BLUE)
    utils.add_arrow_right(slide, flow_x + node_w + 0.1, flow_y + 0.6, arrow_w, arrow_h)
    utils.add_flow_node(slide, flow_x + node_w + arrow_w + 0.3, flow_y, node_w, node_h, '实现',
                        fill_color=utils.ACCENT_GREEN)
    utils.add_arrow_right(slide, flow_x + 2 * (node_w + arrow_w + 0.3) - arrow_w - 0.2,
                          flow_y + 0.6, arrow_w, arrow_h)
    utils.add_flow_node(slide, flow_x + 2 * (node_w + arrow_w + 0.3), flow_y, node_w, node_h, '测试',
                        fill_color=utils.ACCENT_YELLOW, text_color=utils.BG_COLOR)

    # 循环回连箭头提示
    utils.add_text(slide, flow_x + 2 * (node_w + arrow_w + 0.3) - 0.5, flow_y + node_h + 0.3,
                   node_w + 1, 0.8, '↩ 发现问题 → 回到设计',
                   font_size=11, color=utils.ACCENT_BLUE, alignment='center')

    # 三条要点
    points_y = 7.0
    points = [
        'AI 生成快 → 错误积累也快 → 一次贪多反而更慢',
        '每完成一个模块就验证，而不是全部完成后再测',
        '遇到问题再"磨刀"，不提前过度设计',
    ]
    utils.add_multiline(slide, utils.MARGIN_L, points_y, utils.CONTENT_W, 4.5,
                        points, font_size=14, color=utils.TEXT_LIGHT,
                        bullet_char='•', line_spacing=1.8)

    # 底部教训
    utils.add_text(slide, utils.MARGIN_L, 15.5, utils.CONTENT_W, 0.8,
                   '💡 教训：aip-portal 早期一次做大模块导致批量返工',
                   font_size=12, color=utils.TEXT_GRAY)

    # ==================== P46 技巧二：先建立认知，再让 AI 干活 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '技巧二：先建立认知，再让 AI 干活')
    utils.add_page_num(slide, 46)

    # 核心原则大字
    utils.add_text(slide, utils.MARGIN_L, 3.2, utils.CONTENT_W, 1.5,
                   '你的认知边界 = AI 效率上限',
                   font_size=28, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    # 中部对比两列
    col_w = 14.0
    col_h = 7.5
    col_gap = 2.27
    col_y = 5.2
    col_x1 = utils.MARGIN_L
    col_x2 = utils.MARGIN_L + col_w + col_gap

    utils.add_card(slide, col_x1, col_y, col_w, col_h,
                   '❌ 直接让 AI 干（不了解领域）',
                   ['案例：A2A 协议开发',
                    '耗时：16 天',
                    '',
                    '废弃代码：141,026 行',
                    '',
                    '不了解协议，AI 朝着错误方向狂奔'],
                   title_color=utils.ACCENT_RED,
                   border_top_color=utils.ACCENT_RED)

    utils.add_card(slide, col_x2, col_y, col_w, col_h,
                   '✅ 先调研建立认知（仅 2 小时）',
                   ['案例：用 SDK 方式实现',
                    '耗时：3 天',
                    '',
                    '最终代码：仅 1,786 行',
                    '',
                    '认知清晰后，AI 才能高效执行'],
                   title_color=utils.ACCENT_GREEN,
                   border_top_color=utils.ACCENT_GREEN)

    # 底部建议
    utils.add_text(slide, utils.MARGIN_L, 14.2, utils.CONTENT_W, 1.0,
                   '💡 新领域先让 AI 帮你调研、梳理认知框架，再进入编码',
                   font_size=13, color=utils.TEXT_GRAY, alignment='center')

    # ==================== P47 技巧三：协作模式选择矩阵 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '技巧三：协作模式选择矩阵')
    utils.add_page_num(slide, 47)

    headers = ['场景', '推荐模式', '说明']
    rows = [
        ['明确的小任务', '直接对话', '给清楚需求，AI 直接做'],
        ['复杂功能开发', 'Plan 模式', '先让 AI 规划，确认后执行'],
        ['多任务并行', 'Worktree + Agent Team', '隔离开发，互不干扰'],
        ['新领域探索', '调研先行', '先让 AI 帮你建认知'],
        ['代码评审', '只读模式', 'AI 读代码，人做决策'],
    ]
    utils.add_table(slide, utils.MARGIN_L, 3.5, utils.CONTENT_W, headers, rows,
                    col_widths=[8, 10, 12.27], row_h=2.0)

    # ==================== P48 快速行动建议 — 新手 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '立即可用：新手入门三步')
    utils.add_page_num(slide, 48)

    step_w = 9.0
    step_h = 12.0
    step_gap = 1.63
    step_y = 3.2
    step_x = utils.MARGIN_L

    # Step 1
    utils.add_card(slide, step_x, step_y, step_w, 3.5,
                   'Step 1：从一个小模块开始',
                   ['选择一个小模块或小项目',
                    '用 AI 完成整个开发循环',
                    '建立信心和基本协作感觉'],
                   border_top_color=utils.ACCENT_BLUE,
                   title_size=13, content_size=11)

    # Step 2
    utils.add_card(slide, step_x, step_y + 4.0, step_w, 7.5,
                   'Step 2：写好你的第一个 CLAUDE.md',
                   [],
                   border_top_color=utils.ACCENT_GREEN,
                   title_size=13)

    # CLAUDE.md 最小模板代码块
    code = [
        '# 项目导航',
        '技术栈：Java 17 + Spring Boot 2.7 + PostgreSQL',
        '',
        '# 编码约定',
        '统一分页：TypedSearchParam + PageResult',
        'API返回：Result<T> 包装',
    ]
    utils.add_code_block(slide, step_x + 0.3, step_y + 5.5, step_w - 0.6, 4.5,
                         code, font_size=10)

    # Step 3
    step3_x = step_x + step_w + step_gap
    utils.add_card(slide, step3_x, step_y, step_w, 3.5,
                   'Step 3：养成小步验证习惯',
                   ['设计 → AI 实现 → 验证',
                    '每次只推进一个小目标',
                    '发现问题立即修正方向'],
                   border_top_color=utils.ACCENT_YELLOW,
                   title_size=13, content_size=11)

    # 额外提示
    utils.add_card(slide, step3_x, step_y + 4.0, step_w, 7.5,
                   '🎯 核心心态',
                   ['AI 是你的编程搭档',
                    '你负责方向和决策',
                    'AI 负责高效执行',
                    '',
                    '不要期望一次完美',
                    '持续迭代才是正道'],
                   border_top_color=utils.ACCENT_BLUE,
                   title_size=13, content_size=11)

    # ==================== P49 快速行动建议 — 进阶者 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '进阶：搭建项目级 Harness')
    utils.add_page_num(slide, 49)

    tips_y = 3.5
    tip_h = 3.8
    tip_gap = 0.5

    # 建议 1
    utils.add_card(slide, utils.MARGIN_L, tips_y, utils.CONTENT_W, tip_h,
                   '1. 搭建 Harness 分层结构',
                   ['CLAUDE.md（导航，20-30 行） / rules/ARCHITECTURE.md（架构约束） / docs/（详细规范，按需引用）',
                    '让 AI 在动手之前就能理解项目全貌和核心约束'],
                   title_size=15, content_size=13,
                   border_top_color=utils.ACCENT_BLUE)

    # 建议 2
    utils.add_card(slide, utils.MARGIN_L, tips_y + tip_h + tip_gap, utils.CONTENT_W, tip_h,
                   '2. 尝试 Worktree 并行开发',
                   ['aip-portal 项目用了 24 个 worktree 并行推进不同功能',
                    '多个 Agent 同时工作，互不干扰，完成后合并'],
                   title_size=15, content_size=13,
                   border_top_color=utils.ACCENT_GREEN)

    # 建议 3
    utils.add_card(slide, utils.MARGIN_L, tips_y + (tip_h + tip_gap) * 2, utils.CONTENT_W, tip_h,
                   '3. 建立复盘习惯',
                   ['踩坑 → 补规范 → 定期精简',
                    '每次遇到 AI 犯错，想想是否可以在 Harness 中预防'],
                   title_size=15, content_size=13,
                   border_top_color=utils.ACCENT_YELLOW)

    # ==================== P50 快速行动建议 — 观望者 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '给观望者：从一个最小场景开始')
    utils.add_page_num(slide, 50)

    s_w = 9.0
    s_h = 8.0
    s_gap = 1.63
    s_y = 3.5
    s_x = utils.MARGIN_L

    utils.add_card(slide, s_x, s_y, s_w, s_h,
                   '🧪 场景 1：让 AI 写单元测试',
                   ['最低风险入门方式',
                    'AI 生成测试用例',
                    '你审核并运行',
                    '不影响任何业务代码'],
                   border_top_color=utils.ACCENT_GREEN,
                   content_color=utils.TEXT_LIGHT)

    utils.add_card(slide, s_x + s_w + s_gap, s_y, s_w, s_h,
                   '🔍 场景 2：让 AI 做代码评审',
                   ['只读模式，风险为零',
                    'AI 帮你发现潜在问题',
                    '你做最终决策',
                    '学习 AI 的分析思路'],
                   border_top_color=utils.ACCENT_GREEN,
                   content_color=utils.TEXT_LIGHT)

    utils.add_card(slide, s_x + (s_w + s_gap) * 2, s_y, s_w, s_h,
                   '⚡ 场景 3：让 AI 写 CRUD 接口',
                   ['快速体验效率提升',
                    '标准化程度高，AI 擅长',
                    '你只需定义接口规范',
                    '几分钟完成过去半小时的工作'],
                   border_top_color=utils.ACCENT_GREEN,
                   content_color=utils.TEXT_LIGHT)

    # 底部提示
    utils.add_text(slide, utils.MARGIN_L, 14.0, utils.CONTENT_W, 1.0,
                   '感受到效率提升后，自然会扩大使用范围',
                   font_size=14, color=utils.TEXT_GRAY, alignment='center')

    # ==================== P51 一页总结 ====================
    slide = utils.new_slide(prs)
    utils.add_page_title(slide, '总结')
    utils.add_page_num(slide, 51)

    summary_y = 3.8
    summary_gap = 2.8

    utils.add_text(slide, utils.MARGIN_L + 1.0, summary_y, utils.CONTENT_W - 2.0, 1.2,
                   '1. AI 效率确定，不确定的是人的引导',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True)

    utils.add_text(slide, utils.MARGIN_L + 1.0, summary_y + summary_gap, utils.CONTENT_W - 2.0, 1.2,
                   '2. 把最擅长的事交给 AI，释放时间做更有价值的事',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True)

    utils.add_text(slide, utils.MARGIN_L + 1.0, summary_y + summary_gap * 2, utils.CONTENT_W - 2.0, 1.2,
                   '3. 用 SDD + Harness 系统化地驾驭 AI',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True)

    utils.add_text(slide, utils.MARGIN_L + 1.0, summary_y + summary_gap * 3, utils.CONTENT_W - 2.0, 1.2,
                   '4. 从"写代码的人"变成"设计系统的人"',
                   font_size=22, color=utils.ACCENT_BLUE, bold=True)

    # ==================== P52 Q&A ====================
    slide = utils.new_slide(prs)
    utils.add_page_num(slide, 52)

    utils.add_text(slide, 3, 6.0, 28, 3.0, '感谢聆听',
                   font_size=40, color=utils.ACCENT_BLUE, bold=True, alignment='center')

    utils.add_text(slide, 3, 9.5, 28, 2.0, 'Q & A',
                   font_size=28, color=utils.TEXT_LIGHT, bold=True, alignment='center')

    utils.add_text(slide, 3, 14.5, 28, 1.0, '联系方式：[占位符]',
                   font_size=14, color=utils.TEXT_GRAY, alignment='center')
