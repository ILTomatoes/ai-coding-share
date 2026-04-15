// slide-29.js — P29 SDD Results
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 29,
  title: 'SDD 成果'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  const green = "3FB950";
  const red = "F85149";
  const text = "E6EDF3";
  const muted = "8B949E";
  const border = "30363D";

  // Title
  slide.addText("SDD 成果", {
    x: 0.4, y: 0.15, w: 3.0, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: text, bold: true, align: "left", valign: "middle"
  });

  // Three big number cards
  const bigNumbers = [
    { value: "59", unit: "个Java文件", x: 0.4, color: theme.secondary },
    { value: "仅2天", unit: "完成核心代码", x: 3.5, color: green },
    { value: "13,093", unit: "行代码", x: 6.6, color: theme.accent }
  ];

  bigNumbers.forEach(num => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: num.x, y: 0.8, w: 2.8, h: 1.2,
      fill: { color: theme.light },
      line: { color: num.color, width: 2 },
      rectRadius: 0.08
    });
    slide.addText([
      { text: num.value + "\n", options: { fontSize: 30, bold: true, color: num.color, fontFace: "Calibri" } },
      { text: num.unit, options: { fontSize: 12, color: muted, fontFace: "Microsoft YaHei" } }
    ], {
      x: num.x + 0.1, y: 0.85, w: 2.6, h: 1.1,
      align: "center", valign: "middle"
    });
  });

  // Left-right comparison panel
  // Left: aip-server (by experience)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.25, w: 4.4, h: 1.0,
    fill: { color: "1A0505" },
    line: { color: red, width: 1.5 },
    rectRadius: 0.08
  });
  slide.addText([
    { text: "aip-server\n", options: { fontSize: 16, bold: true, color: red } },
    { text: "靠经验 — 个人能力驱动\n", options: { fontSize: 11, color: text } },
    { text: "不可复制，依赖个人水平", options: { fontSize: 10, color: muted } }
  ], {
    x: 0.5, y: 2.3, w: 4.2, h: 0.9,
    fontFace: "Microsoft YaHei",
    align: "center", valign: "middle"
  });

  // Right: aip-gateway (by SDD)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 2.25, w: 4.4, h: 1.0,
    fill: { color: "0D2B15" },
    line: { color: green, width: 1.5 },
    rectRadius: 0.08
  });
  slide.addText([
    { text: "aip-gateway\n", options: { fontSize: 16, bold: true, color: green } },
    { text: "靠 SDD — 方法论驱动\n", options: { fontSize: 11, color: text } },
    { text: "可复制，流程保障质量", options: { fontSize: 10, color: muted } }
  ], {
    x: 5.3, y: 2.3, w: 4.2, h: 0.9,
    fontFace: "Microsoft YaHei",
    align: "center", valign: "middle"
  });

  // Bottom blue summary banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.5, w: 9.2, h: 0.5,
    fill: { color: "0D2847" },
    line: { color: theme.secondary, width: 1.5 },
    rectRadius: 0.06
  });
  slide.addText("规范先行，代码自动", {
    x: 0.5, y: 3.5, w: 9.0, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("29", {
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
  pres.writeFile({ fileName: "slide-29-preview.pptx" });
}

module.exports = { createSlide, slideConfig };