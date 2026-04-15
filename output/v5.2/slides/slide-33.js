// slide-33.js — P32 Evolution Overview: Bar Chart Simulation
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addTextBlock, addCard } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 33,
  title: 'Rules 的演化：从混乱到精炼'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Rules 的演化：从混乱到精炼");

  // Trend summary line
  slide.addText("5487 \u2192 6000 \u2192 3300 \u2192 272  压缩率 95%", {
    x: LAYOUT.MARGIN_L, y: 0.95, w: 8.6, h: 0.35,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Bar chart simulation using rectangles
  const chartBaseY = 4.3;  // bottom baseline
  const chartX = 1.2;
  const barGap = 0.45;
  const barW = 1.4;

  // Scale: max ~6000 lines mapped to max height ~2.8 inches
  const scale = 2.8 / 6000;

  const bars = [
    { label: "Phase 1", lines: 5487, color: COLORS.YELLOW, tag: "5487行", tagColor: COLORS.YELLOW },
    { label: "Phase 2", lines: 6000, color: COLORS.RED, tag: "~6000行", tagColor: COLORS.RED },
    { label: "Phase 2.5", lines: 0, color: COLORS.RED, tag: "discovery", tagColor: COLORS.RED, special: "paths: **.java" },
    { label: "Phase 3", lines: 3300, color: COLORS.YELLOW, tag: "~3300行", tagColor: COLORS.YELLOW },
    { label: "Phase 4", lines: 272, color: COLORS.GREEN, tag: "272行 \u2705", tagColor: COLORS.GREEN },
  ];

  bars.forEach((bar, i) => {
    const bx = chartX + i * (barW + barGap);

    if (bar.special) {
      // Phase 2.5 — discovery label, no bar, just a red label card
      slide.addShape("rect", {
        x: bx, y: chartBaseY - 1.0, w: barW, h: 0.45,
        fill: { color: COLORS.CARD_BG },
        line: { color: COLORS.RED, width: 1 },
        rectRadius: 0.03,
      });
      slide.addText([
        { text: bar.tag, options: { fontSize: 12, bold: true, color: COLORS.RED } },
      ], {
        x: bx + 0.05, y: chartBaseY - 1.0, w: barW - 0.1, h: 0.22,
        fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
      });
      slide.addText(bar.special, {
        x: bx + 0.05, y: chartBaseY - 0.78, w: barW - 0.1, h: 0.22,
        fontSize: 10, fontFace: FONTS.CODE,
        color: COLORS.CODE_GREEN, align: "center", valign: "middle", margin: 0,
      });
    } else {
      // Normal bar
      const barH = Math.max(0.2, bar.lines * scale);
      const barTopY = chartBaseY - barH;

      slide.addShape("rect", {
        x: bx, y: barTopY, w: barW, h: barH,
        fill: { color: bar.color },
        line: { width: 0 },
        rectRadius: 0.03,
      });

      // Tag text above bar
      slide.addText(bar.tag, {
        x: bx, y: barTopY - 0.3, w: barW, h: 0.25,
        fontSize: 11, fontFace: FONTS.CN,
        color: bar.tagColor, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // Label below baseline
    slide.addText(bar.label, {
      x: bx, y: chartBaseY + 0.08, w: barW, h: 0.25,
      fontSize: 11, fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY, align: "center", valign: "middle", margin: 0,
    });
  });

  // Baseline line
  slide.addShape("rect", {
    x: chartX - 0.2, y: chartBaseY, w: 8.0, h: 0.02,
    fill: { color: COLORS.BORDER },
  });

  // Page badge
  addPageNumber(slide, 33);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pptxgen = require("pptxgenjs");
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-33-preview.pptx" });
}

module.exports = { createSlide, slideConfig };