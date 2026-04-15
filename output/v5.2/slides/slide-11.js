/**
 * Slide 11 — P11 Wheel Reinvention
 * "翻车现场（一）— AI 造了个轮子"
 * Badge: 11
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addWarningBox,
} = require("./helpers");

const slideConfig = { pageNum: 11 };

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "翻车现场（一）— AI 造了个轮子");

  // LEFT card — RED accent (自研方案)
  addCard(slide, 0.7, 1.2, 4.1, 2.6, "❌ 自研方案", [
    "从零编码，全程自信输出",
    "16天，46次提交，141,026行",
    "看似完整，实则弯路",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 14,
    descSize: 11,
  });

  // RIGHT card — GREEN accent (官方SDK)
  addCard(slide, 5.2, 1.2, 4.1, 2.6, "✅ 官方 SDK 方案", [
    "a2aproject/a2a-java",
    "3天完成，仅 1,786行",
    "稳定性、兼容性保障",
  ], {
    accentColor: COLORS.GREEN,
    titleColor: COLORS.GREEN,
    titleSize: 14,
    descSize: 11,
  });

  // Bottom warning box
  addWarningBox(slide, 0.7, 4.15, 8.6, 0.7,
    "⚠️ AI不会主动告诉你有更好方案，方向是你定的AI不负责纠偏",
    { fontSize: 12 }
  );

  addPageNumber(slide, 11);
}

module.exports = { createSlide, slideConfig };