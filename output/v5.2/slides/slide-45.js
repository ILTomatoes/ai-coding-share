// slide-45.js — P42 Tip2 Research First: 先建立认知，再让AI干活
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addTextBlock, addCard } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 45,
  title: '技巧二：先建立认知，再让AI干活'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "技巧二：先建立认知，再让AI干活");

  // Big blue quote: "你的认知边界 = AI效率上限"
  slide.addShape("rect", {
    x: 0.7, y: 1.2, w: 8.6, h: 0.8,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1.5 },
    rectRadius: 0.05,
  });
  slide.addText("你的认知边界 = AI效率上限", {
    x: 0.7, y: 1.2, w: 8.6, h: 0.8,
    fontSize: 28, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Left-right comparison
  const compY = 2.35;
  const compW = 4.15;
  const compH = 2.2;
  const gap = 0.3;

  // LEFT: ❌ 不了解领域直接干
  slide.addShape("rect", {
    x: 0.7, y: compY, w: compW, h: compH,
    fill: { color: COLORS.WARN_BG },
    line: { color: COLORS.RED, width: 1 },
    rectRadius: 0.03,
  });
  // Red accent bar
  slide.addShape("rect", {
    x: 0.7, y: compY, w: compW, h: 0.05,
    fill: { color: COLORS.RED },
  });
  // Cross mark + title
  slide.addText([
    { text: "✘ ", options: { fontSize: 18, bold: true, color: COLORS.RED } },
    { text: "不了解领域直接干", options: { fontSize: 16, bold: true, color: COLORS.TEXT_WHITE } },
  ], {
    x: 0.9, y: compY + 0.15, w: compW - 0.4, h: 0.5,
    fontFace: FONTS.CN, valign: "middle", margin: 0,
  });
  // Data: A2A 16天 141,026行废弃
  slide.addText([
    { text: "A2A 项目\n", options: { fontSize: 13, color: COLORS.TEXT_WHITE, breakLine: true } },
    { text: "16 天 → ", options: { fontSize: 14, bold: true, color: COLORS.RED } },
    { text: "141,026 行", options: { fontSize: 14, bold: true, color: COLORS.RED } },
    { text: " 全部废弃", options: { fontSize: 13, color: COLORS.TEXT_GREY } },
  ], {
    x: 0.9, y: compY + 0.7, w: compW - 0.4, h: 1.3,
    fontFace: FONTS.CN, valign: "top", margin: 0,
  });

  // RIGHT: ✅ 先调研2小时
  slide.addShape("rect", {
    x: 0.7 + compW + gap, y: compY, w: compW, h: compH,
    fill: { color: COLORS.GREEN_BG },
    line: { color: COLORS.GREEN, width: 1 },
    rectRadius: 0.03,
  });
  // Green accent bar
  slide.addShape("rect", {
    x: 0.7 + compW + gap, y: compY, w: compW, h: 0.05,
    fill: { color: COLORS.GREEN },
  });
  // Check mark + title
  slide.addText([
    { text: "✔ ", options: { fontSize: 18, bold: true, color: COLORS.GREEN } },
    { text: "先调研2小时再编码", options: { fontSize: 16, bold: true, color: COLORS.TEXT_WHITE } },
  ], {
    x: 0.7 + compW + gap + 0.2, y: compY + 0.15, w: compW - 0.4, h: 0.5,
    fontFace: FONTS.CN, valign: "middle", margin: 0,
  });
  // Data: SDK 3天 1,786行
  slide.addText([
    { text: "SDK 项目\n", options: { fontSize: 13, color: COLORS.TEXT_WHITE, breakLine: true } },
    { text: "3 天 → ", options: { fontSize: 14, bold: true, color: COLORS.GREEN } },
    { text: "1,786 行", options: { fontSize: 14, bold: true, color: COLORS.GREEN } },
    { text: " 全部可用", options: { fontSize: 13, color: COLORS.TEXT_GREY } },
  ], {
    x: 0.7 + compW + gap + 0.2, y: compY + 0.7, w: compW - 0.4, h: 1.3,
    fontFace: FONTS.CN, valign: "top", margin: 0,
  });

  // Bottom note
  slide.addShape("rect", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.45,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });
  slide.addText("💡 新领域先让AI帮你调研梳理认知，再编码", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.45,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Page number badge
  addPageNumber(slide, 45);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7",
    accent: "E3B341", light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-45-preview.pptx" });
}

module.exports = { createSlide, slideConfig };