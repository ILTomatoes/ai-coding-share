/**
 * Slide 27 — P27 Spec Nine Iterations
 * Spec 的九轮迭代（v1.0 → v1.9）
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addTextBlock, addCodeBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "Spec 的九轮迭代（v1.0 → v1.9）");

  // ── LEFT: Timeline (55%) ──
  const timelineX = LAYOUT.MARGIN_L;
  const circleX = timelineX;
  const textX = circleX + 0.45;
  const textW = 4.6;

  const timelineItems = [
    { version: "v1.0-v1.2", text: "基础功能 + 消息持久化 + 能力声明", color: COLORS.YELLOW },
    { version: "v1.3-v1.5", text: "审阅修复 + 架构定位调整", color: COLORS.YELLOW },
    { version: "v1.6",       text: "★ 重大定位调整 — AMG定位为数字员工门户消息层", color: COLORS.RED, bold: true },
    { version: "v1.7-v1.8", text: "技术栈修正（Spring Boot版本、R2DBC API）", color: COLORS.YELLOW },
    { version: "v1.9",       text: "三轮审阅综合修复", color: COLORS.GREEN },
  ];

  const startY = 1.2;
  const stepY = 0.72;
  const circleSize = 0.22;

  // Vertical line
  slide.addShape("rect", {
    x: circleX + circleSize / 2 - 0.015,
    y: startY + circleSize,
    w: 0.03,
    h: (timelineItems.length - 1) * stepY,
    fill: { color: COLORS.BORDER },
  });

  timelineItems.forEach((item, i) => {
    const cy = startY + i * stepY;

    // Colored circle
    slide.addShape("oval", {
      x: circleX, y: cy,
      w: circleSize, h: circleSize,
      fill: { color: item.color },
    });

    // Version label + description
    slide.addText([
      { text: item.version + "  ", options: { bold: true, color: item.color, fontSize: 11, fontFace: FONTS.EN } },
      { text: item.text, options: { bold: !!item.bold, color: COLORS.TEXT_WHITE, fontSize: 11, fontFace: FONTS.CN } },
    ], {
      x: textX, y: cy - 0.03,
      w: textW, h: 0.35,
      valign: "middle",
      margin: 0,
    });
  });

  // ── RIGHT: Code block with git commits ──
  const codeX = 5.9;
  const codeY = 1.2;
  const codeW = 3.6;
  const codeH = 3.8;

  const commitLines = [
    "feat:add-design-v1",
    "feat:add-design-v2",
    "feat:add-design-v3",
    "feat:add-design-v4",
    "feat:add-design-v5",
    "feat:add-design-v6",
    "review:round-1-fix",
    "review:round-2-fix",
    "review:round-3-fix",
    "feat:update-to-v1.9",
    "feat:implement",
  ];

  addCodeBlock(slide, codeX, codeY, codeW, codeH, commitLines, { fontSize: 9 });

  addPageNumber(slide, 27);
}

module.exports = { createSlide };
