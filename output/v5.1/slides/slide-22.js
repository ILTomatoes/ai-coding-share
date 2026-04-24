/**
 * Slide 22 — P22 Part 3 Section Divider
 * "系统化提升 — SDD 与 Harness 实践"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSectionDivider } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Section divider — no page number
  addSectionDivider(slide, "Part 03", "系统化提升", "SDD 与 Harness 实践");
}

module.exports = { createSlide };
