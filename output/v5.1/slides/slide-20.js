/**
 * Slide 20 — ⚠️ 陷阱：AI 会'PUA'你 (AI Will PUA You)
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
  addSlideTitle(slide, "⚠️ 陷阱：AI 会'PUA'你");

  // Three RED accent cards in a row
  const cardW = 2.6;
  const cardH = 1.2;
  const cardY = 1.15;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const cardTexts = [
    "永远自信满满，即使方向错误",
    "语气笃定、逻辑自洽，很容易被'说服'",
    "不会犹豫，不会说'我不确定'",
  ];

  cardTexts.forEach((text, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, text, [], {
      accentColor: COLORS.RED,
      titleColor: COLORS.RED,
      titleSize: 12,
    });
  });

  // Case examples section
  const caseY = 2.75;

  // "案例回扣：" label
  addTextBlock(slide, LAYOUT.MARGIN_L, caseY, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "案例回扣：", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.TEXT_WHITE, bold: true,
    });

  // Case example 1
  addTextBlock(slide, LAYOUT.MARGIN_L + 0.2, caseY + 0.45, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R - 0.4, 0.45,
    "A2A：AI全程自信地造了一个轮子，46次提交，没有任何犹豫", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
    });

  // Case example 2
  addTextBlock(slide, LAYOUT.MARGIN_L + 0.2, caseY + 0.9, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R - 0.4, 0.45,
    "权限过滤：AI保留这些逻辑时的理由'完全合理'，但缺失了业务上下文", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
    });

  addPageNumber(slide, 20);
}

module.exports = { createSlide };
