/**
 * Slide 49 — 总结 (One Page Summary)
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
  addSlideTitle(slide, "总结");

  // Four numbered summary lines
  const lines = [
    "1. AI 效率确定，不确定的是人的引导",
    "2. 把最擅长的事交给 AI，释放时间做更有价值的事",
    "3. 用 SDD + Harness 系统化地驾驭 AI",
    "4. 从'码农'变成'系统架构师'——你画图纸，AI 盖楼",
  ];

  const startY = 1.4;
  const lineH = 0.7;
  const textW = LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R;

  lines.forEach((line, i) => {
    addTextBlock(slide, LAYOUT.MARGIN_L, startY + i * lineH, textW, lineH, line, {
      fontSize: 20,
      fontFace: FONTS.CN,
      color: COLORS.ACCENT_BLUE,
      bold: true,
    });
  });

  addPageNumber(slide, 49);
}

module.exports = { createSlide };
