/**
 * Slide 15 — P15 Part 2 Section Divider
 * "反思 — 从案例到洞察"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSectionDivider } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Section divider — no page number
  addSectionDivider(slide, "Part 02", "反思", "从案例到洞察");
}

module.exports = { createSlide };
