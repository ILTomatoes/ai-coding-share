// slide-22.js — P22 Section Divider Part 3
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 22,
  title: 'Part 03 系统化提升'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  const green = "3FB950";
  const text = "E6EDF3";
  const muted = "8B949E";

  // "Part 03" top label
  slide.addText("Part 03", {
    x: 0.6, y: 0.4, w: 2.0, h: 0.5,
    fontSize: 16, fontFace: "Calibri",
    color: theme.accent, bold: true,
    align: "left", valign: "middle"
  });

  // Decorative line under Part label
  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.9, w: 1.6, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // Large center title "系统化提升"
  slide.addText("系统化提升", {
    x: 0.6, y: 1.4, w: 8.8, h: 1.8,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: text, bold: true,
    align: "center", valign: "middle"
  });

  // Subtitle "SDD 与 Harness 实践"
  slide.addText("SDD 与 Harness 实践", {
    x: 0.6, y: 3.3, w: 8.8, h: 0.8,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: false,
    align: "center", valign: "middle"
  });

  // Bottom accent line
  slide.addShape(pres.shapes.LINE, {
    x: 3.5, y: 4.4, w: 3.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("22", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 11, fontFace: "Calibri",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-22-preview.pptx" });
}

module.exports = { createSlide, slideConfig };