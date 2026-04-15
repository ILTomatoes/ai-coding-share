// slide-18.js — P18 Core Insight
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 18,
  title: '核心洞察：把最擅长的事交给 AI'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("核心洞察：把最擅长的事交给 AI", {
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

  // Top comparison — two cards
  // ❌ Common misconception (left, red border)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.15, w: 4.4, h: 0.8,
    fill: { color: theme.light },
    line: { color: theme.red, width: 1 },
    rectRadius: 0
  });
  slide.addText("❌ 常见想法：先把不擅长的交给 AI", {
    x: 0.6, y: 1.15, w: 4.2, h: 0.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.red, align: "center", valign: "middle",
    margin: 0
  });

  // ✅ Real experience (right, green border)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.15, w: 4.4, h: 0.8,
    fill: { color: theme.light },
    line: { color: theme.green, width: 1 },
    rectRadius: 0
  });
  slide.addText("✅ 实际经验：先把最擅长的事交给 AI", {
    x: 5.2, y: 1.15, w: 4.2, h: 0.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.green, align: "center", valign: "middle",
    margin: 0
  });

  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 2.1, w: 9.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Three numbered cards
  // Card 1
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.25, w: 8.8, h: 0.55,
    fill: { color: theme.light },
    line: { color: theme.border, width: 0.5 },
    rectRadius: 0
  });
  slide.addText("1. 擅长 = 你能准确验收、质量保障", {
    x: 0.7, y: 2.25, w: 8.4, h: 0.55,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.text, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Card 2
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.85, w: 8.8, h: 0.55,
    fill: { color: theme.light },
    line: { color: theme.border, width: 0.5 },
    rectRadius: 0
  });
  slide.addText("2. 这些工作无成长价值，纯工作量", {
    x: 0.7, y: 2.85, w: 8.4, h: 0.55,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.text, align: "left", valign: "middle",
    margin: 0
  });

  // Card 3
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.45, w: 8.8, h: 0.55,
    fill: { color: theme.light },
    line: { color: theme.border, width: 0.5 },
    rectRadius: 0
  });
  slide.addText("3. 释放时间，投入创造性工作", {
    x: 0.7, y: 3.45, w: 8.4, h: 0.55,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.text, align: "left", valign: "middle",
    margin: 0
  });

  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 4.1, w: 9.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Bottom example
  slide.addText("aip-server 例证：表结构是我擅长的 → AI 编码我能准确评审", {
    x: 0.5, y: 4.2, w: 9.0, h: 0.55,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center", valign: "middle",
    margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("18", {
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
  pres.writeFile({ fileName: "slide-18-preview.pptx" });
}

module.exports = { createSlide, slideConfig };