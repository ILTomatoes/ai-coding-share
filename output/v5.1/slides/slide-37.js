/**
 * Slide 37 — P37 Final Form: Three-Layer Architecture
 * Harness 最终形态
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
  addSlideTitle(slide, "Harness 最终形态");

  // Two comparison cards
  const cardW = 4.0;
  const cardH = 2.5;
  const cardY = 1.2;
  const gap = 0.4;
  const leftX = LAYOUT.MARGIN_L;
  const rightX = leftX + cardW + gap;

  // Left card — Before (RED accent)
  addCard(slide, leftX, cardY, cardW, cardH,
    "❌ Before（Phase 1）",
    [
      "5487行，20个文件",
      "所有规范堆在一个目录",
      "每次全部加载",
    ],
    {
      accentColor: COLORS.RED,
      titleColor: COLORS.RED,
      descColor: COLORS.TEXT_GREY,
      titleSize: 12,
      descSize: 11,
    });

  // Right card — After (GREEN accent)
  addCard(slide, rightX, cardY, cardW, cardH,
    "✅ After（Phase 4）",
    [
      ".claude/rules/ 核心约束，自动加载",
      "  ARCHITECTURE.md (124行)",
      "  CODE-STYLE.md (14行)",
      "  testing.md (134行)",
      "docs/code-style/ 详细规范，按需引用",
      "  01-naming.md ... 共8个文档，838行",
    ],
    {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.GREEN,
      descColor: COLORS.CODE_GREEN,
      titleSize: 12,
      descSize: 10,
    });

  // Bottom design principle
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.2, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.45,
    "核心约束 → 自动加载（每次会话）  |  详细规范 → 按需加载（AI自行查阅）", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true, align: "center",
    });

  addPageNumber(slide, 37);
}

module.exports = { createSlide };
