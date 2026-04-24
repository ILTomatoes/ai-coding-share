/**
 * Slide 44 — 技巧二：先建立认知，再让 AI 干活
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
  addSlideTitle(slide, "技巧二：先建立认知，再让 AI 干活");

  // Center big text: "你的认知边界 = AI 效率上限"
  addTextBlock(slide, 1.5, 1.2, 7, 0.6,
    "你的认知边界 = AI 效率上限", {
      fontSize: 22,
      fontFace: FONTS.CN,
      color: COLORS.ACCENT_BLUE,
      bold: true,
      align: "center",
      valign: "middle",
    });

  // Two comparison cards side by side
  const cardW = 4.0;
  const cardH = 1.8;
  const gapX = 0.5;
  const cardY = 2.1;
  const leftX = (LAYOUT.W - cardW * 2 - gapX) / 2;
  const rightX = leftX + cardW + gapX;

  // LEFT card (RED) - bad approach
  addCard(slide, leftX, cardY, cardW, cardH,
    "❌ 直接让AI干（不了解领域）",
    ["A2A案例 / 16天 / 141,026行废弃"],
    {
      accentColor: COLORS.RED,
      titleSize: 13,
      descSize: 12,
    }
  );

  // RIGHT card (GREEN) - good approach
  addCard(slide, rightX, cardY, cardW, cardH,
    "✅ 先调研建立认知（2小时）",
    ["用SDK / 3天 / 仅1,786行"],
    {
      accentColor: COLORS.GREEN,
      titleSize: 13,
      descSize: 12,
    }
  );

  // Bottom advice (centered)
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.2,
    LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "新领域先让 AI 帮你调研、梳理认知框架，再进入编码", {
      fontSize: 13,
      fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE,
      align: "center",
      valign: "middle",
    });

  addPageNumber(slide, 44);
}

module.exports = { createSlide };
