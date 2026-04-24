/**
 * Slide 36 — P36 Phase 3-4: Cleanup and Refinement
 * Phase 3-4：清理与精炼
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
  addSlideTitle(slide, "Phase 3-4：清理与精炼");

  // Two side-by-side cards
  const cardW = 4.0;
  const cardH = 2.2;
  const cardY = 1.3;
  const gap = 0.4;
  const leftX = LAYOUT.MARGIN_L;
  const rightX = leftX + cardW + gap;

  // Left card — Phase 3 (YELLOW accent)
  addCard(slide, leftX, cardY, cardW, cardH,
    "Phase 3：删掉2714行",
    [
      "\u2022 意识到：规范不是越多越好",
      "\u2022 rules/是token预算管理，不是wiki",
      "\u2022 详细文档移到docs/",
    ],
    {
      accentColor: COLORS.YELLOW,
      titleColor: COLORS.TEXT_WHITE,
      descColor: COLORS.TEXT_GREY,
      titleSize: 12,
      descSize: 11,
    });

  // Right card — Phase 4 (GREEN accent)
  addCard(slide, rightX, cardY, cardW, cardH,
    "Phase 4：最终272行（压缩率95%）",
    [
      "\u2022 只保留AI必须知道的约束",
      "\u2022 质量稳定，Token可控",
    ],
    {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.TEXT_WHITE,
      descColor: COLORS.TEXT_GREY,
      titleSize: 12,
      descSize: 11,
    });

  // Bottom timeline
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.1, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "2026-04-01: 精简rules \u2192 04-09: 规范移至docs\uff08仅9天完成重构\uff09", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, align: "center",
    });

  addPageNumber(slide, 36);
}

module.exports = { createSlide };
