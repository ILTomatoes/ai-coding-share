/**
 * Slide 46 — 立即可用：新手入门三步 (Quick Start for Beginners)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
  addCodeBlock,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "立即可用：新手入门三步");

  // Three step cards in a row
  const cardW = 2.6;
  const cardH = 1.1;
  const cardY = 1.15;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const steps = [
    { title: "Step 1", desc: "从一个小模块或小项目开始", accent: COLORS.ACCENT_BLUE },
    { title: "Step 2", desc: "写好你的第一个 CLAUDE.md", accent: COLORS.YELLOW },
    { title: "Step 3", desc: "养成'设计 → AI 实现 → 验证'的习惯", accent: COLORS.GREEN },
  ];

  steps.forEach((step, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, step.title, [step.desc], {
      accentColor: step.accent,
      titleColor: step.accent,
      titleSize: 14,
      descSize: 11,
      descColor: COLORS.TEXT_WHITE,
    });
  });

  // Code block below Step 2 showing CLAUDE.md minimal template
  const codeX = startX + cardW + gap + 0.05;
  const codeY = cardY + cardH + 0.35;
  const codeW = cardW - 0.1;
  const codeH = 1.5;

  addCodeBlock(slide, codeX, codeY, codeW, codeH, [
    "# 最小化 CLAUDE.md 模板",
    "",
    "技术栈：Java 17 + Spring Boot",
    "  2.7 + PostgreSQL",
    "约定：统一分页 TypedSearchParam",
    "  + PageResult",
    "API返回：Result<T> 包装",
  ], { fontSize: 8 });

  // Label above code block
  slide.addText("CLAUDE.md 示例", {
    x: codeX, y: cardY + cardH + 0.08, w: codeW, h: 0.25,
    fontSize: 10, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    margin: 0,
  });

  // Arrow indicators between steps
  slide.addText("→", {
    x: startX + cardW, y: cardY + 0.25, w: gap, h: 0.5,
    fontSize: 20, fontFace: FONTS.EN,
    color: COLORS.TEXT_GREY, align: "center", valign: "middle",
    margin: 0,
  });
  slide.addText("→", {
    x: startX + 2 * cardW + gap, y: cardY + 0.25, w: gap, h: 0.5,
    fontSize: 20, fontFace: FONTS.EN,
    color: COLORS.TEXT_GREY, align: "center", valign: "middle",
    margin: 0,
  });

  addPageNumber(slide, 46);
}

module.exports = { createSlide };
