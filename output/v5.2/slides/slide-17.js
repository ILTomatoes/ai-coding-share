// slide-17.js — P17 AI Potential & Limits
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 17,
  title: 'AI 的潜力与边界'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("AI 的潜力与边界", {
    x: 0.5, y: 0.3, w: 8.5, h: 0.6,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.text, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Title underline
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 0.95, w: 3.5, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // Left green column — 潜力
  // Column background
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.2, h: 2.8,
    fill: { color: theme.light },
    line: { color: theme.green, width: 1.5 },
    rectRadius: 0
  });

  // Column header
  slide.addText("潜力 ✅", {
    x: 0.5, y: 1.25, w: 4.2, h: 0.45,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.green, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Column items
  slide.addText([
    { text: "编码效率提升 2-4 倍\n", options: { fontSize: 14, color: theme.text, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "擅长重复性工作和模式化代码\n", options: { fontSize: 14, color: theme.text, fontFace: "Microsoft YaHei" } },
    { text: "趋势明确，只会越来越强", options: { fontSize: 14, color: theme.text, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.7, y: 1.8, w: 3.8, h: 2.1,
    valign: "top", margin: 0
  });

  // Right yellow column — 边界
  // Column background
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.2, w: 4.2, h: 2.8,
    fill: { color: theme.light },
    line: { color: theme.accent, width: 1.5 },
    rectRadius: 0
  });

  // Column header
  slide.addText("边界 ⚠️", {
    x: 5.3, y: 1.25, w: 4.2, h: 0.45,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Column items
  slide.addText([
    { text: "不了解领域背景时容易跑偏\n", options: { fontSize: 14, color: theme.text, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "缺乏全局视角，局部最优全局灾难\n", options: { fontSize: 14, color: theme.text, fontFace: "Microsoft YaHei" } },
    { text: "不会主动质疑你的设计", options: { fontSize: 14, color: theme.text, fontFace: "Microsoft YaHei" } }
  ], {
    x: 5.5, y: 1.8, w: 3.8, h: 2.1,
    valign: "top", margin: 0
  });

  // Bottom big blue — conclusion
  slide.addText("AI 是最强执行者，但不是合格的架构师", {
    x: 0.5, y: 4.2, w: 9.0, h: 0.7,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("17", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 11, fontFace: "Calibri",
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
  pres.writeFile({ fileName: "slide-17-preview.pptx" });
}

module.exports = { createSlide, slideConfig };