/**
 * Slide 23 — P23 What is SDD
 * "什么是 SDD？"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "什么是 SDD？");

  // Definition card
  addCard(slide, 0.7, 1.0, 8.6, 0.7,
    "SDD = Specification-Driven Development（规范驱动开发）", [], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.ACCENT_BLUE,
      titleSize: 14,
    });

  // Big centered text
  addTextBlock(slide, 0.7, 1.85, 8.6, 0.45,
    "先写说明书，再让 AI 写代码", {
      fontSize: 20, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE,
      bold: true, align: "center", valign: "middle",
    });

  // LEFT comparison card — RED accent (Vibe Coding)
  addCard(slide, 0.7, 2.45, 4.1, 1.3, "\u274C 氛围编程 Vibe Coding", [
    "\u2022 凭感觉提需求",
    "\u2022 AI 猜着写",
    "\u2022 写错花几小时修",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 11,
  });

  // RIGHT comparison card — GREEN accent (SDD)
  addCard(slide, 5.2, 2.45, 4.1, 1.3, "\u2705 SDD 规范驱动开发", [
    "\u2022 规范第一，代码第二",
    "\u2022 拒绝瞎猜",
    "\u2022 按图施工",
  ], {
    accentColor: COLORS.GREEN,
    titleColor: COLORS.GREEN,
    titleSize: 13,
    descSize: 11,
  });

  // Spec definition card
  addCard(slide, 0.7, 3.9, 8.6, 0.7,
    "Spec 是人与 AI 之间的契约，是唯一真理来源", [
      "代码只是 Spec 的'派生物'",
    ], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.TEXT_WHITE,
      titleSize: 12,
      descSize: 10,
    });

  // Bottom 4 small element labels in a row
  const labels = [
    "\uD83C\uDFAF 目标与价值",
    "\uD83D\uDD27 上下文与约束",
    "\u2699\uFE0F 功能逻辑",
    "\u2705 验证标准（自带TDD基因）",
  ];
  const labelW = 2.05;
  const labelGap = 0.2;
  const labelStartX = 0.7;
  const labelY = 4.8;

  labels.forEach((label, i) => {
    slide.addShape("rect", {
      x: labelStartX + i * (labelW + labelGap), y: labelY,
      w: labelW, h: 0.4,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.BORDER, width: 0.75 },
      rectRadius: 0.03,
    });
    slide.addText(label, {
      x: labelStartX + i * (labelW + labelGap), y: labelY,
      w: labelW, h: 0.4,
      fontSize: 10, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });
  });

  addPageNumber(slide, 23);
}

module.exports = { createSlide };
