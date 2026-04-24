/**
 * Slide 14 — P14 Part 1 Wrap: Comparison
 * "两个案例，两种结局"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "两个案例，两种结局");

  // LEFT card — GREEN accent
  addCard(slide, 0.7, 1.2, 4.1, 2.6, "✅ aip-server", [
    "设计清晰 + 边界明确",
    "人定方向，AI 跑量",
    "5天，80个接口，质量可靠",
  ], {
    accentColor: COLORS.GREEN,
    titleColor: COLORS.GREEN,
    titleSize: 14,
    descSize: 11,
  });

  // RIGHT card — RED accent
  addCard(slide, 5.2, 1.2, 4.1, 2.6, "❌ A2A 适配器", [
    "方向不明 + 盲目信任",
    "没有调研就动手",
    "16天返工，98.7%代码废弃",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 14,
    descSize: 11,
  });

  // Bottom blue question
  slide.addText("什么时候该信任 AI？如何系统地让 AI 编程越来越高效？", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.6,
    fontSize: 18, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  addPageNumber(slide, 14);
}

module.exports = { createSlide };
