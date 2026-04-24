/**
 * Slide 10 — P10 What Happened (Timeline)
 * 垂直时间线 + 右侧大数字对比
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "发生了什么");

  // ── Timeline (left 65%) ──
  const timelineX = LAYOUT.MARGIN_L;
  const circleX = timelineX;
  const textX = circleX + 0.45;
  const textW = 5.4;

  const timelineItems = [
    { emoji: "\u{1F7E2}", text: "第1天：让 AI 根据 A2A 协议文档直接编码", color: COLORS.GREEN },
    { emoji: "\u{1F534}", text: "第1-2周：AI '高效'产出大量代码（46次提交，16天）", color: COLORS.RED },
    { emoji: "\u{1F534}", text: "关键问题：无法判断 AI 输出是否符合协议", color: COLORS.RED },
    { emoji: "\u{1F534}", text: "深入调研：发现有官方 Java SDK（a2aproject/a2a-java）", color: COLORS.RED },
    { emoji: "\u{1F7E2}", text: "推倒重来：用 SDK 3天搞定", color: COLORS.GREEN },
  ];

  const startY = 1.3;
  const stepY = 0.72;
  const circleSize = 0.22;

  // Vertical line connecting circles
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

    // Timeline text
    addTextBlock(slide, textX, cy - 0.03, textW, 0.35,
      item.text, {
        fontSize: 12, color: COLORS.TEXT_WHITE, bold: false,
      }
    );
  });

  // ── RIGHT: Big red number comparison ──
  const rightX = 6.8;
  const rightW = 2.8;

  addTextBlock(slide, rightX, 1.5, rightW, 0.65,
    "141,026行 \u2192 1,786行", {
      fontSize: 28, color: COLORS.RED, bold: true, align: "center",
    }
  );

  addTextBlock(slide, rightX, 2.3, rightW, 0.5,
    "代码量缩减 98.7%", {
      fontSize: 18, color: COLORS.RED, align: "center",
    }
  );

  addPageNumber(slide, 10);
}

module.exports = { createSlide };
