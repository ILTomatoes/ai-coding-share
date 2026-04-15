// slide-01.js — P1 Cover Page
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: 'Java 开发中的 AI 协作编程实践'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title — center, large
  slide.addText("Java 开发中的 AI 协作编程实践", {
    x: 0.5, y: 1.8, w: 9, h: 1.4,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Subtitle — center
  slide.addText("从真实项目说起", {
    x: 0.5, y: 3.3, w: 9, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: "8B949E", align: "center", valign: "middle",
    margin: 0
  });

  // Bottom info — 演讲人 / 2026年4月
  slide.addText("演讲人 / 2026年4月", {
    x: 0.5, y: 4.5, w: 5, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "8B949E", align: "left", valign: "middle",
    margin: 0
  });

  // Right bottom small — 内部交流分享
  slide.addText("内部交流分享", {
    x: 7.0, y: 4.5, w: 2.5, h: 0.5,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "right", valign: "middle",
    margin: 0
  });

  // Decorative horizontal line
  slide.addShape(pres.shapes.LINE, {
    x: 1.0, y: 4.25, w: 8.0, h: 0,
    line: { color: "30363D", width: 1 }
  });

  // NO page number badge for cover page
  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117",
    secondary: "2F81F7",
    accent: "E3B341",
    light: "161B22",
    bg: "0D1117"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };