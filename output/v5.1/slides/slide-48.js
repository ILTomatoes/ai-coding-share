/**
 * Slide 48 — 给观望者：从一个最小场景开始 (Quick Start for Observers)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "给观望者：从一个最小场景开始");

  // Three scenario cards with green accent
  const cardW = 2.6;
  const cardH = 1.8;
  const cardY = 1.15;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const scenarios = [
    {
      title: "场景1：让 AI 写单元测试",
      lines: ["最低风险", "无需改动业务代码", "快速验证 AI 能力"],
    },
    {
      title: "场景2：让 AI 做代码评审",
      lines: ["只读，风险为零", "学习 AI 的分析视角", "辅助发现潜在问题"],
    },
    {
      title: "场景3：让 AI 写 CRUD 接口",
      lines: ["快速体验效率提升", "模板化、可预测的工作", "结果容易验证"],
    },
  ];

  scenarios.forEach((scenario, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, scenario.title, scenario.lines, {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.GREEN,
      titleSize: 12,
      descSize: 10,
      descColor: COLORS.TEXT_GREY,
    });
  });

  // Bottom note
  slide.addText("感受到效率提升后，自然会扩大使用范围", {
    x: LAYOUT.MARGIN_L, y: 4.7, w: LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, h: 0.35,
    fontSize: 13, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY, align: "center",
    margin: 0,
  });

  addPageNumber(slide, 48);
}

module.exports = { createSlide };
