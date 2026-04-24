/**
 * Slide 35 — P35 Phase 1-2: Chaos and Expansion
 * Phase 1-2：混乱与膨胀
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
  addWarningBox,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "Phase 1-2：混乱与膨胀");

  // Two side-by-side cards
  const cardW = 4.0;
  const cardH = 2.1;
  const cardY = 1.3;
  const gap = 0.4;
  const leftX = LAYOUT.MARGIN_L;
  const rightX = leftX + cardW + gap;

  // Left card — Phase 1 (YELLOW accent)
  addCard(slide, leftX, cardY, cardW, cardH,
    "Phase 1：5487行，20个文件",
    [
      "\u2022 把能想到的都塞进去",
      "\u274C Token消耗巨大，关键规则被淹没",
    ],
    {
      accentColor: COLORS.YELLOW,
      titleColor: COLORS.TEXT_WHITE,
      descColor: COLORS.TEXT_GREY,
      titleSize: 12,
      descSize: 11,
    });

  // Right card — Phase 2 (RED accent)
  addCard(slide, rightX, cardY, cardW, cardH,
    "Phase 2：~6000+行，24个文件",
    [
      "\u2022 踩坑就加规则，越加越多",
      "\u274C Token爆炸，AI经常忽略关键规则",
    ],
    {
      accentColor: COLORS.RED,
      titleColor: COLORS.TEXT_WHITE,
      descColor: COLORS.TEXT_GREY,
      titleSize: 12,
      descSize: 11,
    });

  // Bottom warning box (red)
  const warnW = LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R;
  addWarningBox(slide, LAYOUT.MARGIN_L, 3.8, warnW, 0.6,
    "\u26A0\uFE0F 恶性循环 \u2014 犯错 \u2192 加规则 \u2192 再犯错 \u2192 再加规则\u2026\u2026", {
      borderColor: COLORS.RED,
      textColor: COLORS.RED,
      fontSize: 13,
    });

  addPageNumber(slide, 35);
}

module.exports = { createSlide };
