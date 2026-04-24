/**
 * Slide 38 — P38 Key Lessons
 * Rules 演化的关键经验
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "Rules 演化的关键经验");

  // Three lesson cards (blue accent, numbered)
  const cardW = 2.6;
  const cardH = 1.8;
  const cardY = 1.3;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const lessons = [
    "1. rules/ 是 token 预算管理，不是 wiki \u2014 每一行都要有价值",
    "2. 规范不是越多越好，而是越精炼越好 \u2014 少即是多",
    "3. 每次踩坑都是完善规范的机会 \u2014 复盘驱动改进",
  ];

  lessons.forEach((text, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, text, [], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.TEXT_WHITE,
      titleSize: 11,
    });
  });

  // Bottom timeline
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.7, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "04-01优化 → 04-01精简 → 04-02整理 → 04-09规范移docs（9天趋于稳定）", {
      fontSize: 11, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, align: "center",
    });

  addPageNumber(slide, 38);
}

module.exports = { createSlide };
