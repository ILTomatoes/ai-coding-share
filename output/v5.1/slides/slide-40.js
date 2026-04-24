/**
 * Slide 40 — Part 4 Section Divider
 * "工具链与实战技巧"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSectionDivider } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSectionDivider(
    slide,
    "Part 04",
    "工具链与实战技巧",
    "可以立即带走的东西"
  );
}

module.exports = { createSlide };
