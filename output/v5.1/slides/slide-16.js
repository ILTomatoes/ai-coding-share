/**
 * Slide 16 — 从案例中看到了什么 (What We Saw)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addTextBlock,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "从案例中看到了什么");

  // Two comparison lines (y ~ 1.2)
  addTextBlock(slide, LAYOUT.MARGIN_L, 1.25, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "aip-server 成功：人给了清晰的设计和边界", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.GREEN, bold: true,
    });

  addTextBlock(slide, LAYOUT.MARGIN_L, 1.7, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "A2A 失败：人没有给方向，AI 高效跑偏", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.RED, bold: true,
    });

  // Center big text
  addTextBlock(slide, LAYOUT.MARGIN_L, 2.7, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.7,
    "AI 的效率是确定的，不确定的是人的引导", {
      fontSize: 26, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    });

  // Bottom grey note
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.2, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "同一个 AI，同一个开发者，结果天壤之别", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, align: "center",
    });

  addPageNumber(slide, 16);
}

module.exports = { createSlide };
