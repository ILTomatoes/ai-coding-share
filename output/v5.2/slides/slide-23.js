// slide-23.js — P23 What is SDD
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 23,
  title: '什么是 SDD？'
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
  slide.addText("什么是 SDD？", {
    x: 0.4, y: 0.15, w: 4.0, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: text, bold: true, align: "left", valign: "middle"
  });

  // Blue border card: SDD = Specification-Driven Development
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 0.75, w: 9.2, h: 0.55,
    fill: { color: theme.light },
    line: { color: theme.secondary, width: 2 },
    rectRadius: 0.08
  });
  slide.addText("SDD = Specification-Driven Development", {
    x: 0.5, y: 0.75, w: 9.0, h: 0.55,
    fontSize: 16, fontFace: "Calibri",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle"
  });

  // Big bold blue statement
  slide.addText("先写说明书，再让AI写代码", {
    x: 0.4, y: 1.45, w: 9.2, h: 0.65,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle"
  });

  // Left red card: ❌ 氛围编程
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.25, w: 4.4, h: 0.95,
    fill: { color: "1A0505" },
    line: { color: red, width: 1.5 },
    rectRadius: 0.06
  });
  slide.addText([
    { text: "❌ 氛围编程\n", options: { fontSize: 14, bold: true, color: red } },
    { text: "凭感觉 → AI猜着写 → 修几小时", options: { fontSize: 12, color: "C9D1D9" } }
  ], {
    x: 0.5, y: 2.28, w: 4.2, h: 0.85,
    fontFace: "Microsoft YaHei",
    align: "center", valign: "middle"
  });

  // Right green card: ✅ SDD
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 2.25, w: 4.4, h: 0.95,
    fill: { color: "0D2B15" },
    line: { color: green, width: 1.5 },
    rectRadius: 0.06
  });
  slide.addText([
    { text: "✅ SDD\n", options: { fontSize: 14, bold: true, color: green } },
    { text: "规范第一，代码第二", options: { fontSize: 12, color: "C9D1D9" } }
  ], {
    x: 5.3, y: 2.28, w: 4.2, h: 0.85,
    fontFace: "Microsoft YaHei",
    align: "center", valign: "middle"
  });

  // Spec analogy row
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.35, w: 9.2, h: 0.45,
    fill: { color: theme.light },
    line: { color: border, width: 1 },
    rectRadius: 0.05
  });
  slide.addText("Spec 是建筑图纸    AI 是施工队", {
    x: 0.5, y: 3.35, w: 9.0, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle"
  });

  // Four elements row
  const elements = [
    { emoji: "🎯", label: "目标与价值", x: 0.4 },
    { emoji: "🔧", label: "上下文约束", x: 2.8 },
    { emoji: "⚙️", label: "功能逻辑", x: 5.2 },
    { emoji: "✅", label: "验证标准(TDD基因)", x: 7.5 }
  ];

  elements.forEach(el => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: el.x, y: 3.95, w: 2.2, h: 0.75,
      fill: { color: theme.light },
      line: { color: border, width: 1 },
      rectRadius: 0.06
    });
    slide.addText(el.emoji + " " + el.label, {
      x: el.x + 0.05, y: 3.95, w: 2.1, h: 0.75,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: text, bold: true,
      align: "center", valign: "middle"
    });
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("23", {
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
  pres.writeFile({ fileName: "slide-23-preview.pptx" });
}

module.exports = { createSlide, slideConfig };