// slide-43.js — P42 Tip2: 先建立认知，再让AI干活
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addTextBlock } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 43,
  title: '技巧二：先建立认知，再让AI干活'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "技巧二：先建立认知，再让AI干活");

  // Big blue quote banner
  slide.addShape("rect", {
    x: 0.7, y: 1.05, w: 8.6, h: 0.75,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1.5 },
    rectRadius: 0.05,
  });
  slide.addText("你的认知边界 = AI效率上限", {
    x: 0.7, y: 1.05, w: 8.6, h: 0.75,
    fontSize: 26, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // ── Left-right comparison cards ──
  const compY = 2.1;
  const compW = 4.1;
  const compH = 2.3;
  const gap = 0.25;

  // LEFT: Red card — 不了解领域
  slide.addShape("rect", {
    x: 0.7, y: compY, w: compW, h: compH,
    fill: { color: COLORS.WARN_BG },
    line: { color: COLORS.RED, width: 1 },
    rectRadius: 0.04,
  });
  // Red accent bar
  slide.addShape("rect", {
    x: 0.7, y: compY, w: compW, h: 0.05,
    fill: { color: COLORS.RED },
  });
  // Cross mark + title
  slide.addText([
    { text: "✘ ", options: { fontSize: 20, bold: true, color: COLORS.RED } },
    { text: "不了解领域直接干", options: { fontSize: 16, bold: true, color: COLORS.TEXT_WHITE } },
  ], {
    x: 0.9, y: compY + 0.15, w: compW - 0.4, h: 0.5,
    fontFace: FONTS.CN, valign: "middle", margin: 0,
  });
  // Data: A2A 16天 141026行废弃
  slide.addText([
    { text: "A2A 项目\n", options: { fontSize: 13, color: COLORS.TEXT_WHITE, breakLine: true } },
    { text: "16 天 → ", options: { fontSize: 15, bold: true, color: COLORS.RED } },
    { text: "141,026 行", options: { fontSize: 15, bold: true, color: COLORS.RED } },
    { text: " 全部废弃", options: { fontSize: 13, color: COLORS.TEXT_GREY } },
  ], {
    x: 0.9, y: compY + 0.75, w: compW - 0.4, h: 1.3,
    fontFace: FONTS.CN, valign: "top", margin: 0,
  });

  // RIGHT: Green card — 先调研2小时
  const rightX = 0.7 + compW + gap;
  slide.addShape("rect", {
    x: rightX, y: compY, w: compW, h: compH,
    fill: { color: COLORS.GREEN_BG },
    line: { color: COLORS.GREEN, width: 1 },
    rectRadius: 0.04,
  });
  // Green accent bar
  slide.addShape("rect", {
    x: rightX, y: compY, w: compW, h: 0.05,
    fill: { color: COLORS.GREEN },
  });
  // Check mark + title
  slide.addText([
    { text: "✔ ", options: { fontSize: 20, bold: true, color: COLORS.GREEN } },
    { text: "先调研2小时再编码", options: { fontSize: 16, bold: true, color: COLORS.TEXT_WHITE } },
  ], {
    x: rightX + 0.2, y: compY + 0.15, w: compW - 0.4, h: 0.5,
    fontFace: FONTS.CN, valign: "middle", margin: 0,
  });
  // Data: SDK 3天 1786行
  slide.addText([
    { text: "SDK 项目\n", options: { fontSize: 13, color: COLORS.TEXT_WHITE, breakLine: true } },
    { text: "3 天 → ", options: { fontSize: 15, bold: true, color: COLORS.GREEN } },
    { text: "1,786 行", options: { fontSize: 15, bold: true, color: COLORS.GREEN } },
    { text: " 全部可用", options: { fontSize: 13, color: COLORS.TEXT_GREY } },
  ], {
    x: rightX + 0.2, y: compY + 0.75, w: compW - 0.4, h: 1.3,
    fontFace: FONTS.CN, valign: "top", margin: 0,
  });

  // Bottom note
  slide.addShape("rect", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.45,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });
  slide.addText("新领域先让AI帮你调研梳理认知，再编码", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.45,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 43);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-43-preview.pptx" });
}

module.exports = { createSlide, slideConfig };