/**
 * Slide 04 - Case 1: aip-server Overview
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide({ bkgd: COLORS.BG_DARK });
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "\u6848\u4f8b\u4e00\uff1aaip-server \u9879\u76ee\u6982\u89c8");

  // LEFT side (40%): Project info
  const leftX = LAYOUT.MARGIN_L;
  const leftW = 3.5;

  addTextBlock(slide, leftX, 1.2, leftW, 0.45, "aip-server", {
    fontSize: 20,
    color: COLORS.ACCENT_BLUE,
    bold: true,
  });

  addTextBlock(slide, leftX, 1.7, leftW, 0.35, "AI \u667a\u80fd\u5e73\u53f0\u540e\u7aef\u670d\u52a1", {
    fontSize: 14,
    color: COLORS.TEXT_GREY,
  });

  addTextBlock(slide, leftX, 2.1, leftW, 0.6, "\u4f01\u4e1a\u7ea7\u667a\u80fd\u4f53\u7ba1\u7406\u3001\u77e5\u8bc6\u5e93\u3001\u6570\u636e\u5206\u6790\u5e73\u53f0", {
    fontSize: 14,
    color: COLORS.TEXT_GREY,
  });

  // RIGHT side (55%): Three data cards stacked
  const rightX = 4.6;
  const rightW = 4.9;
  const cardH = 0.95;
  const cardGap = 0.15;

  // Card 1: Stats
  addCard(slide, rightX, 1.2, rightW, cardH, "\u9879\u76ee\u89c4\u6a21", [
    "100 \u4e2a Controller | 11 \u4e2a\u4e1a\u52a1\u6a21\u5757 | 2394 \u6b21\u63d0\u4ea4",
  ], {
    titleSize: 13,
    descSize: 11,
  });

  // Card 2: Tech stack
  addCard(slide, rightX, 1.2 + cardH + cardGap, rightW, cardH, "\u6280\u672f\u6808", [
    "Spring Boot 2.7.18 + MyBatis Plus 3.4.2",
    "+ PostgreSQL + Java 17",
  ], {
    titleSize: 13,
    descSize: 11,
  });

  // Card 3: Multi datasource
  addCard(slide, rightX, 1.2 + (cardH + cardGap) * 2, rightW, cardH, "\u591a\u6570\u636e\u6e90", [
    "PostgreSQL + Neo4j + Dremio",
    "Feign \u5fae\u670d\u52a1\u8c03\u7528",
  ], {
    titleSize: 13,
    descSize: 11,
  });

  // Page number
  addPageNumber(slide, 4);
}

module.exports = { createSlide };
