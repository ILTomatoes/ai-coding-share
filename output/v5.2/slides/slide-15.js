// slide-15.js — P15 Section Divider Part 2
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 15,
  title: '反思'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Left accent bar (secondary color)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.6, w: 0.08, h: 3.8,
    fill: { color: theme.secondary },
    rectRadius: 0
  });

  // Top small — "Part 02" (accent color)
  slide.addText("Part 02", {
    x: 0.6, y: 0.8, w: 2, h: 0.5,
    fontSize: 16, fontFace: "Calibri",
    color: theme.accent, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Large center — "反思" (fontSize:48, white, bold)
  slide.addText("反思", {
    x: 0.6, y: 1.6, w: 8, h: 1.4,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: theme.text, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Subtitle muted — "从案例到洞察"
  slide.addText("从案例到洞察", {
    x: 0.6, y: 3.2, w: 8, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.muted, align: "left", valign: "middle",
    margin: 0
  });

  // Decorative line under subtitle
  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 3.9, w: 4.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Page badge (circle x:9.3 y:5.1 w:0.4 h:0.4, fill:theme.accent, white number)
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("15", {
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
    bg: "0D1117",
    text: "E6EDF3",
    muted: "8B949E",
    border: "30363D",
    green: "3FB950",
    red: "F85149"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-15-preview.pptx" });
}

module.exports = { createSlide, slideConfig };