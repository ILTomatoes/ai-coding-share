/**
 * Slide 33 — P33 Case: aip-portal Overview
 * 案例项目：aip-portal 智能体门户
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addSubtitle,
  addPageNumber,
  addDataCard,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "案例项目：aip-portal 智能体门户");

  // Subtitle
  addSubtitle(slide, "企业级 Agent 管理平台");

  // Tech stack
  addTextBlock(slide, LAYOUT.MARGIN_L, 1.35, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.3,
    "Spring Boot 2.7.18 + MyBatis Plus + PostgreSQL + Java 17 | Maven多模块 + Feign + 多数据源", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, align: "center",
    });

  // 5 data cards in a row
  const cardW = 1.5;
  const cardH = 1.3;
  const gap = 0.25;
  const totalW = 5 * cardW + 4 * gap;
  const startX = (LAYOUT.W - totalW) / 2;
  const cardY = 2.1;

  const dataCards = [
    { number: "259次", label: "提交" },
    { number: "72天", label: "活跃开发" },
    { number: "281个", label: "Java文件" },
    { number: "57个", label: "文档" },
    { number: "4人", label: "协作" },
  ];

  dataCards.forEach((item, i) => {
    addDataCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, item.number, item.label, {
      numColor: COLORS.ACCENT_BLUE,
      numSize: 26,
    });
  });

  // Bottom note
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.9, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.5,
    "这个项目经历了 Harness 从无到有的完整演化", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.YELLOW, bold: true, align: "center",
    });

  addPageNumber(slide, 33);
}

module.exports = { createSlide };
