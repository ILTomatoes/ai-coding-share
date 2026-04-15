/**
 * Slide 14 — P14 Comparison
 * "两个案例，两种结局"
 * Badge: 14
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard,
} = require("./helpers");

const slideConfig = { pageNum: 14 };

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "两个案例，两种结局");

  // LEFT column — GREEN (aip-server success)
  addCard(slide, 0.7, 1.2, 4.1, 2.6, "✅ aip-server", [
    "设计清晰 + 边界明确",
    "人定方向，AI跑量",
    "5天80接口，质量可靠",
  ], {
    accentColor: COLORS.GREEN,
    titleColor: COLORS.GREEN,
    titleSize: 14,
    descSize: 11,
  });

  // RIGHT column — RED (A2A failure)
  addCard(slide, 5.2, 1.2, 4.1, 2.6, "❌ A2A适配器", [
    "方向不明 + 盲目信任",
    "没调研就动手",
    "16天返工，98.7%废弃",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 14,
    descSize: 11,
  });

  // Bottom blue question
  slide.addText("什么时候该信任AI？如何系统地让AI编程越来越高效？", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.6,
    fontSize: 18, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  addPageNumber(slide, 14);
}

module.exports = { createSlide, slideConfig };