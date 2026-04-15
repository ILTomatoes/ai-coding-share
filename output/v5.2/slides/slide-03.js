// slide-03.js — P3 Section Divider - 从真实项目说起
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section divider',
  index: 3,
  title: '从真实项目说起'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Decorative accent bar on left side
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.0, w: 0.08, h: 3.5,
    fill: { color: theme.secondary }
  });

  // Top small text — accent color "Part 01"
  slide.addText("Part 01", {
    x: 0.6, y: 1.3, w: 3, h: 0.5,
    fontSize: 16, fontFace: "Calibri",
    color: theme.accent, bold: false,
    align: "left", valign: "middle",
    margin: 0,
    charSpacing: 4
  });

  // Large center title
  slide.addText("从真实项目说起", {
    x: 0.6, y: 2.0, w: 8.8, h: 1.2,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: "E6EDF3", bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Subtitle — muted gray
  slide.addText("两个案例，两种结局", {
    x: 0.6, y: 3.4, w: 8.8, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: "8B949E", bold: false,
    align: "left", valign: "middle",
    margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("3", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

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
  pres.writeFile({ fileName: "slide-03-preview.pptx" });
}

module.exports = { createSlide, slideConfig };