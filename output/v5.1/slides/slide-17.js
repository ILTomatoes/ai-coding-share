/**
 * Slide 17 — AI 的潜力与边界 (AI Potential & Boundaries)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
  addTextBlock,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "AI 的潜力与边界");

  const cardW = 4.0;
  const cardH = 1.8;
  const cardY = 1.1;
  const gap = 0.6;
  const leftX = (LAYOUT.W - 2 * cardW - gap) / 2;
  const rightX = leftX + cardW + gap;

  // LEFT card — Potential (GREEN accent)
  addCard(slide, leftX, cardY, cardW, cardH, "✅ 潜力",
    [
      "• 编码效率提升 2-4 倍",
      "• 擅长重复性工作、模式化代码",
      "• 趋势明确，只会越来越强",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN, descSize: 11 }
  );

  // RIGHT card — Boundaries (YELLOW accent)
  addCard(slide, rightX, cardY, cardW, cardH, "⚠️ 边界",
    [
      "• 不了解领域背景时容易跑偏",
      "• 缺乏全局视角，可能'局部最优、全局灾难'",
      "• 不会主动质疑你的设计",
    ],
    { accentColor: COLORS.YELLOW, titleColor: COLORS.YELLOW, descSize: 11 }
  );

  // Bottom quote
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.5, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.7,
    "AI 是最强执行者，但不是合格的架构师", {
      fontSize: 22, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    });

  addPageNumber(slide, 17);
}

module.exports = { createSlide };
