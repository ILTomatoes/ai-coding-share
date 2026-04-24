/**
 * Slide 03 - Part 1 Section Divider
 * "从真实项目说起"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSectionDivider } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide({ bkgd: COLORS.BG_DARK });

  // Section divider (no page number)
  addSectionDivider(
    slide,
    "Part 01",
    "\u4ece\u771f\u5b9e\u9879\u76ee\u8bf4\u8d77",
    "\u4e24\u4e2a\u6848\u4f8b\uff0c\u4e24\u79cd\u7ed3\u5c40"
  );
}

module.exports = { createSlide };
