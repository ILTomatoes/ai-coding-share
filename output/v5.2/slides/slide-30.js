// slide-30.js — P30 What is Harness Engineering
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addSubtitle, addPageNumber, addCard, addTextBlock, addWarningBox, addRightArrow } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 30,
  title: '什么是 Harness Engineering？'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "什么是 Harness Engineering？");

  // Big formula: Agent = Model + Harness
  slide.addText([
    { text: "Agent = Model + Harness", options: { fontSize: 26, bold: true, color: COLORS.ACCENT_BLUE, fontFace: FONTS.EN } },
  ], {
    x: LAYOUT.MARGIN_L, y: 0.95, w: 8.6, h: 0.5,
    align: "center", valign: "middle", margin: 0,
  });

  // Subtitle analogy
  slide.addText("模型是马 Harness是缰绳——光有马不行还需要驾驭系统", {
    x: LAYOUT.MARGIN_L, y: 1.45, w: 8.6, h: 0.35,
    fontSize: 13, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY, align: "center", valign: "middle", margin: 0,
  });

  // Big text: Harness definition
  slide.addText([
    { text: "Harness = 给AI烈马套上缰绳的马具", options: { fontSize: 16, bold: true, color: COLORS.TEXT_WHITE, fontFace: FONTS.CN } },
  ], {
    x: LAYOUT.MARGIN_L, y: 1.85, w: 8.6, h: 0.35,
    align: "center", valign: "middle", margin: 0,
  });

  // Description below
  slide.addText("不是限制AI的能力，而是让AI的能力在正确方向上释放——约束即驾驭", {
    x: LAYOUT.MARGIN_L, y: 2.2, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY, align: "center", valign: "middle", margin: 0,
  });

  // Two side-by-side card columns
  const cardY = 2.55;
  const cardW = 4.15;
  const cardH = 1.15;
  const gap = 0.3;

  // Left card — Guides (前馈控制, blue border)
  addCard(slide, LAYOUT.MARGIN_L, cardY, cardW, cardH,
    "Guides 前馈控制",
    [
      "行动前设好规则",
      "CLAUDE.md 代码规范 架构决策 权限分级",
      "高速公路护栏类比——提前规划路线边界",
    ],
    { accentColor: COLORS.ACCENT_BLUE, titleColor: COLORS.ACCENT_BLUE }
  );

  // Right card — Sensors (反馈控制, green border)
  addCard(slide, LAYOUT.MARGIN_L + cardW + gap, cardY, cardW, cardH,
    "Sensors 反馈控制",
    [
      "做完后检测对不对",
      "自动化测试 Sonar代码扫描 CI流水线",
      "安检门类比——事后检测偏差",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN }
  );

  // Yellow bottom bar: 好的Harness = Guides + Sensors
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L, y: 3.85, w: 8.6, h: 0.45,
    fill: { color: COLORS.WARN_BG },
    line: { color: COLORS.YELLOW, width: 1 },
    rectRadius: 0.04,
  });
  slide.addText("好的Harness = Guides + Sensors    防患于未然 + 亡羊补牢", {
    x: LAYOUT.MARGIN_L, y: 3.85, w: 8.6, h: 0.45,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Three context rows
  const ctxY = 4.45;
  const ctxItems = [
    { icon: "\u{1F4CB}", label: "项目级", desc: "全局规则 项目骨架" },
    { icon: "\u{1F4DD}", label: "任务级", desc: "当前任务的约束" },
    { icon: "\u{1F4AC}", label: "会话级", desc: "本次对话的即时指令" },
  ];
  const ctxW = 2.8;
  ctxItems.forEach((item, i) => {
    const cx = LAYOUT.MARGIN_L + i * (ctxW + 0.1);
    slide.addShape("rect", {
      x: cx, y: ctxY, w: ctxW, h: 0.35,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.BORDER, width: 0.75 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: item.icon + " ", options: { fontSize: 12 } },
      { text: item.label + " ", options: { fontSize: 12, bold: true, color: COLORS.ACCENT_BLUE } },
      { text: item.desc, options: { fontSize: 10, color: COLORS.TEXT_GREY } },
    ], {
      x: cx + 0.08, y: ctxY, w: ctxW - 0.16, h: 0.35,
      fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
    });
  });

  // Arrows between context items
  addRightArrow(slide, LAYOUT.MARGIN_L + ctxW + 0.01, ctxY + 0.1, 0.08, 0.15, COLORS.TEXT_GREY);
  addRightArrow(slide, LAYOUT.MARGIN_L + 2 * (ctxW + 0.1) + 0.01, ctxY + 0.1, 0.08, 0.15, COLORS.TEXT_GREY);

  // Red emphasis text
  slide.addText("约束先行 — 规则靠自动化强制执行", {
    x: LAYOUT.MARGIN_L, y: 4.88, w: 8.6, h: 0.3,
    fontSize: 13, fontFace: FONTS.CN,
    color: COLORS.RED, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 30);

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
  pres.writeFile({ fileName: "slide-30-preview.pptx" });
}

module.exports = { createSlide, slideConfig };