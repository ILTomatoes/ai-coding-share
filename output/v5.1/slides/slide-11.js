/**
 * Slide 11 — P11 Crash Scene 1
 * "翻车现场（一）— AI 造了个轮子"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addWarningBox,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "翻车现场（一）— AI 造了个轮子");

  // LEFT card — RED accent
  addCard(slide, 0.7, 1.2, 4.1, 2.6, "❌ 自研方案", [
    "从零开始编码，全程自信输出",
    "16天，46次提交，141,026行代码",
    "看似完整，实则走弯路",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 14,
    descSize: 11,
  });

  // RIGHT card — GREEN accent
  addCard(slide, 5.2, 1.2, 4.1, 2.6, "✅ 官方 SDK 方案", [
    "发现 a2aproject/a2a-java",
    "3天完成，仅 1,786行",
    "稳定性、兼容性有保障",
  ], {
    accentColor: COLORS.GREEN,
    titleColor: COLORS.GREEN,
    titleSize: 14,
    descSize: 11,
  });

  // Bottom warning box
  addWarningBox(slide, 0.7, 4.15, 8.6, 0.7,
    "⚠️ AI 不会主动告诉你'有更好的方案'，方向是你定的，AI 不负责纠偏",
    { fontSize: 12 }
  );

  addPageNumber(slide, 11);
}

module.exports = { createSlide };
