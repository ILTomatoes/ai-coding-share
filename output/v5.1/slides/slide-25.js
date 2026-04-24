/**
 * Slide 25 — P25 Case: aip-gateway AMG Module
 * "案例项目：aip-gateway 智能体消息网关"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addSubtitle, addPageNumber, addDataCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "案例项目：aip-gateway 智能体消息网关");
  addSubtitle(slide, "AMG（Agent Message Gateway）核心模块");

  // Tech stack line
  addTextBlock(slide, LAYOUT.MARGIN_L, 1.4,
    LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.3,
    "Apache ShenYu 2.6.1 + Spring WebFlux + R2DBC + Redis Reactive（响应式全链路）", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
    });

  // 4 data cards in a row
  const dataCards = [
    { number: "209\u6B21", label: "\u63D0\u4EA4" },
    { number: "584\u4E2A", label: "Java\u6587\u4EF6" },
    { number: "18\u4E2A", label: "\u63D2\u4EF6\u6A21\u5757" },
    { number: "4\u4E2A", label: "\u652F\u6301\u534F\u8BAE" },
  ];

  const cardW = 1.95;
  const cardH = 1.15;
  const cardGap = 0.25;
  const totalCardW = 4 * cardW + 3 * cardGap;
  const cardStartX = (LAYOUT.W - totalCardW) / 2;
  const cardY = 2.0;

  dataCards.forEach((dc, i) => {
    addDataCard(slide,
      cardStartX + i * (cardW + cardGap), cardY,
      cardW, cardH,
      dc.number, dc.label, {
        numColor: COLORS.ACCENT_BLUE,
        numSize: 28,
      });
  });

  // Bottom key data line
  addTextBlock(slide, 0.7, 3.7, 8.6, 0.4,
    "AMG\u6838\u5FC3\u6A21\u5757\uFF1A59\u4E2AJava\u6587\u4EF6 | 2\u5929\u5B8C\u6210 | \u8BBE\u8BA1\u6587\u6863\u4ECE v1 \u8FED\u4EE3\u5230 v1.9", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE,
      bold: true, align: "center", valign: "middle",
    });

  addPageNumber(slide, 25);
}

module.exports = { createSlide };
