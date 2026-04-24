/**
 * Slide 18 — 核心洞察：把最擅长的事交给 AI (Core Insight)
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
  addSlideTitle(slide, "核心洞察：把最擅长的事交给 AI");

  // Two comparison lines
  addTextBlock(slide, LAYOUT.MARGIN_L, 1.15, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "❌ 常见想法：先把不擅长的交给 AI，自己做好擅长的", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.RED, bold: true,
    });

  addTextBlock(slide, LAYOUT.MARGIN_L, 1.55, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "✅ 实际经验：先把最擅长的事交给 AI", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.GREEN, bold: true,
    });

  // Three numbered cards (blue accent)
  const cardW = 2.6;
  const cardH = 1.5;
  const cardY = 2.15;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const cards = [
    "1. 擅长 = 你能准确验收 → 质量有保障",
    "2. 这些工作对个人无成长价值，属于纯工作量堆叠",
    "3. 释放时间 → 投入到研究、设计、架构等创造性工作",
  ];

  cards.forEach((text, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, text, [], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.TEXT_WHITE,
      titleSize: 11,
    });
  });

  // Bottom grey example
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.1, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "aip-server 案例：表结构是我擅长的 → AI 编码我能准确评审", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, align: "center",
    });

  addPageNumber(slide, 18);
}

module.exports = { createSlide };
