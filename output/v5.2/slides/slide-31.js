// slide-31.js — P30.5 Growth Methodology
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addCard, addFlowNode, addRightArrow, addWarningBox, addTextBlock } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 31,
  title: 'Harness 是怎么"长"出来的？'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Harness 是怎么\"长\"出来的？");

  // ── Top: 6-step horizontal flow ──
  const flowY = 1.0;
  const flowNodeW = 1.25;
  const flowNodeH = 0.55;
  const arrowW = 0.18;
  const arrowH = 0.18;
  const flowGap = 0.12;
  const steps = [
    { text: "\u2460让AI做任务", color: COLORS.ACCENT_BLUE },
    { text: "\u2461观察输出", color: COLORS.ACCENT_BLUE },
    { text: "\u2462发现问题", color: COLORS.RED },
    { text: "\u2463分析根因", color: COLORS.YELLOW },
    { text: "\u2464添加最小约束", color: COLORS.GREEN },
    { text: "\u2465验证效果", color: COLORS.GREEN },
  ];

  let startX = 0.35;
  steps.forEach((step, i) => {
    const nx = startX;
    addFlowNode(slide, nx, flowY, flowNodeW, flowNodeH, step.text, {
      borderColor: step.color, textColor: step.color, fontSize: 10,
    });
    startX += flowNodeW + flowGap;
    if (i < steps.length - 1) {
      addRightArrow(slide, startX, flowY + 0.17, arrowW, arrowH, COLORS.TEXT_GREY);
      startX += arrowW + flowGap;
    }
  });

  // Loop-back arrow label (回到①)
  slide.addText("\u2192 回到\u2460", {
    x: startX, y: flowY + 0.05, w: 0.9, h: 0.45,
    fontSize: 11, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "left", valign: "middle", margin: 0,
  });

  // ── Middle: Three cards in a row ──
  const cardY = 1.75;
  const cardW = 2.8;
  const cardH = 1.25;
  const cardGap = 0.2;

  // Card1 — Seed phase (accentBlue)
  addCard(slide, LAYOUT.MARGIN_L, cardY, cardW, cardH,
    "种子期",
    [
      "刚创建 / 单模块",
      "CLAUDE.md 3-10行",
      "项目启动",
    ],
    { accentColor: COLORS.ACCENT_BLUE, titleColor: COLORS.ACCENT_BLUE }
  );

  // Card2 — Growth phase (YELLOW)
  addCard(slide, LAYOUT.MARGIN_L + cardW + cardGap, cardY, cardW, cardH,
    "生长期",
    [
      "多模块 / 多人",
      "分层文档 + 架构约束",
      "AI犯结构性错误",
    ],
    { accentColor: COLORS.YELLOW, titleColor: COLORS.YELLOW }
  );

  // Card3 — Mature phase (GREEN)
  addCard(slide, LAYOUT.MARGIN_L + 2 * (cardW + cardGap), cardY, cardW, cardH,
    "成熟期",
    [
      "复杂系统",
      "自动化检查 + 反馈循环",
      "单次对话无法完成",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN }
  );

  // ── Bottom: Red warning box ──
  addWarningBox(slide, LAYOUT.MARGIN_L, 3.2, 8.6, 0.55,
    "不要一步到位——每条规则应有具体\"事故\"作为来源",
    { borderColor: COLORS.RED, textColor: COLORS.RED }
  );

  // Yellow small text
  slide.addText("接下来的aip-portal案例就是这套方法论的真实演绎", {
    x: LAYOUT.MARGIN_L, y: 3.85, w: 8.6, h: 0.25,
    fontSize: 11, fontFace: FONTS.CN,
    color: COLORS.YELLOW, align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 31);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pptxgen = require("pptxgenjs");
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-31-preview.pptx" });
}

module.exports = { createSlide, slideConfig };