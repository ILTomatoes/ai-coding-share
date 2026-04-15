// slide-36.js — P35 Three-Layer Architecture: Harness Final Form
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addCard, addTextBlock } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 36,
  title: 'Harness 最终形态'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Harness 最终形态");

  // ── Before/After comparison ──
  const compY = 1.0;
  const compW = 4.15;
  const compH = 1.5;
  const gap = 0.3;

  // Before card (red border)
  addCard(slide, LAYOUT.MARGIN_L, compY, compW, compH,
    "Before \u2014 混乱状态",
    [
      "5487行 20文件",
      "所有规范堆在一个目录",
      "每次全部加载",
    ],
    { accentColor: COLORS.RED, titleColor: COLORS.RED }
  );

  // After card (green border) — three-layer structure
  addCard(slide, LAYOUT.MARGIN_L + compW + gap, compY, compW, compH,
    "After \u2014 三层架构",
    [
      "CLAUDE.md (23行) 项目导航",
      ".claude/rules/ ARCHITECTURE.md(124行)",
      "  + CODE-STYLE.md(14行) + testing.md(134行)",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN }
  );

  // Third layer inside After card
  const layer3Y = compY + 1.2;
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L + compW + gap + 0.12, y: layer3Y, w: compW - 0.24, h: 0.25,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.CODE_GREEN, width: 0.5 },
    rectRadius: 0.02,
  });
  slide.addText("docs/code-style/ 8文档 838行 按需引用", {
    x: LAYOUT.MARGIN_L + compW + gap + 0.12, y: layer3Y, w: compW - 0.24, h: 0.25,
    fontSize: 9, fontFace: FONTS.CN,
    color: COLORS.CODE_GREEN, align: "center", valign: "middle", margin: 0,
  });

  // ── Blue design principles ──
  const principleY = 2.7;
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L, y: principleY, w: 8.6, h: 0.65,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1.5 },
    rectRadius: 0.05,
  });

  slide.addText([
    { text: "核心约束 \u2192 自动加载（每次会话）", options: { fontSize: 14, bold: true, color: COLORS.ACCENT_BLUE } },
    { text: "    |    ", options: { fontSize: 14, color: COLORS.TEXT_GREY } },
    { text: "详细规范 \u2192 按需加载（AI自行查阅）", options: { fontSize: 14, bold: true, color: COLORS.GREEN } },
  ], {
    x: LAYOUT.MARGIN_L + 0.15, y: principleY, w: 8.3, h: 0.65,
    fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
  });

  // Three-layer visual diagram below
  const layerY = 3.55;
  const layerItems = [
    { name: "CLAUDE.md", desc: "23行 项目导航", color: COLORS.ACCENT_BLUE, lines: "核心" },
    { name: "rules/", desc: "272行 必须知道的", color: COLORS.YELLOW, lines: "重要" },
    { name: "docs/", desc: "838行 按需引用", color: COLORS.GREEN, lines: "参考" },
  ];

  const layerW = 2.7;
  const layerH = 0.8;
  const layerGap = 0.2;

  layerItems.forEach((item, i) => {
    const lx = LAYOUT.MARGIN_L + i * (layerW + layerGap);
    slide.addShape("rect", {
      x: lx, y: layerY, w: layerW, h: layerH,
      fill: { color: COLORS.CARD_BG },
      line: { color: item.color, width: 1 },
      rectRadius: 0.04,
    });
    slide.addShape("rect", {
      x: lx, y: layerY, w: layerW, h: 0.05,
      fill: { color: item.color },
    });
    slide.addText([
      { text: item.name + "\n", options: { fontSize: 14, bold: true, color: item.color } },
      { text: item.desc, options: { fontSize: 10, color: COLORS.TEXT_GREY } },
    ], {
      x: lx + 0.12, y: layerY + 0.12, w: layerW - 0.24, h: layerH - 0.17,
      fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
    });
    // Badge
    slide.addText(item.lines, {
      x: lx + layerW - 0.55, y: layerY + 0.05, w: 0.45, h: 0.22,
      fontSize: 9, fontFace: FONTS.CN,
      color: item.color, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Page badge
  addPageNumber(slide, 36);

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
  pres.writeFile({ fileName: "slide-36-preview.pptx" });
}

module.exports = { createSlide, slideConfig };