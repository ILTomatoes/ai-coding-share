// slide-16.js — P16 What We Saw
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 16,
  title: '从案例中看到了什么'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("从案例中看到了什么", {
    x: 0.5, y: 0.3, w: 8.5, h: 0.6,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Title underline
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 0.95, w: 3.5, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // Review line 1 — aip-server success
  slide.addText("aip-server 成功：人给了清晰设计和边界", {
    x: 0.5, y: 1.15, w: 9, h: 0.35,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.green, align: "left", valign: "middle",
    margin: 0
  });

  // Review line 2 — A2A failure
  slide.addText("A2A 失败：人没有给方向", {
    x: 0.5, y: 1.55, w: 9, h: 0.35,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.red, align: "left", valign: "middle",
    margin: 0
  });

  // Divider line
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 2.0, w: 9.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Center big blue — "AI 的效率是确定的，不确定的是人的引导"
  slide.addText("AI 的效率是确定的，不确定的是人的引导", {
    x: 0.5, y: 2.3, w: 9.0, h: 1.2,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Bottom text
  slide.addText("同一个 AI，同一个开发者，结果天壤之别", {
    x: 0.5, y: 3.7, w: 9.0, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("16", {
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
  pres.writeFile({ fileName: "slide-16-preview.pptx" });
}

module.exports = { createSlide, slideConfig };