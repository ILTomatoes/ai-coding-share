/**
 * Slide 34 — P34 Harness Evolution Overview (Bar Chart Simulation)
 * Rules 的演化：从混乱到精炼
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "Rules 的演化：从混乱到精炼");

  // Bar chart parameters
  const barW = 1.2;
  const gap = 0.35;
  const totalBars = 5;
  const totalW = totalBars * barW + (totalBars - 1) * gap;
  const startX = (LAYOUT.W - totalW) / 2;
  const baseY = 4.3; // bottom baseline
  const phaseY = baseY + 0.15; // phase name below baseline

  const bars = [
    { height: 1.2, color: COLORS.YELLOW, label: "5487行", phase: "Phase 1" },
    { height: 1.4, color: COLORS.RED, label: "~6000行", phase: "Phase 2" },
    { height: 0.6, color: COLORS.RED, label: "发现根因\npaths: **.java", phase: "Phase 2.5" },
    { height: 0.7, color: COLORS.YELLOW, label: "~3300行", phase: "Phase 3" },
    { height: 0.07, color: COLORS.GREEN, label: "272行 \u2705", phase: "Phase 4" },
  ];

  bars.forEach((bar, i) => {
    const x = startX + i * (barW + gap);
    const barTop = baseY - bar.height;

    // Colored rectangle (bar)
    slide.addShape("rect", {
      x: x,
      y: barTop,
      w: barW,
      h: bar.height,
      fill: { color: bar.color },
      rectRadius: 0.02,
    });

    // Label above bar
    slide.addText(bar.label, {
      x: x,
      y: barTop - 0.45,
      w: barW,
      h: 0.42,
      fontSize: 10,
      fontFace: FONTS.CN,
      color: bar.color,
      bold: true,
      align: "center",
      valign: "bottom",
      margin: 0,
    });

    // Phase name below baseline
    slide.addText(bar.phase, {
      x: x,
      y: phaseY,
      w: barW,
      h: 0.3,
      fontSize: 10,
      fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY,
      align: "center",
      valign: "top",
      margin: 0,
    });
  });

  // Baseline
  slide.addShape("rect", {
    x: startX - 0.1,
    y: baseY,
    w: totalW + 0.2,
    h: 0.02,
    fill: { color: COLORS.BORDER },
  });

  addPageNumber(slide, 34);
}

module.exports = { createSlide };
