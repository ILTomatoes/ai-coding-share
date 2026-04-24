// slide-26.js — P26 SDD Practice
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 26,
  title: 'SDD 实践：从PRD到代码'
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
  slide.addText("SDD 实践：从PRD到代码", {
    x: 0.4, y: 0.15, w: 5.0, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true, align: "left", valign: "middle"
  });

  // Flow diagram — 4 horizontal steps
  const steps = [
    { label: "qoder 编写PRD", color: theme.accent, x: 0.3, w: 2.2 },
    { label: "转化为技术Spec\n4796行", color: theme.secondary, x: 2.7, w: 2.2 },
    { label: "Claude Code\n多轮审阅\nv1→v1.9", color: green, x: 5.1, w: 2.2 },
    { label: "Agent Team\n编码", color: text, x: 7.5, w: 2.0 }
  ];

  steps.forEach(step => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: step.x, y: 0.8, w: step.w, h: 1.0,
      fill: { color: theme.light },
      line: { color: step.color, width: 2 },
      rectRadius: 0.08
    });
    slide.addText(step.label, {
      x: step.x + 0.05, y: 0.82, w: step.w - 0.1, h: 0.96,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: step.color, bold: true,
      align: "center", valign: "middle"
    });
  });

  // Arrow connectors
  const arrowPositions = [
    { x: 2.5, w: 0.2 },
    { x: 4.9, w: 0.2 },
    { x: 7.3, w: 0.2 }
  ];
  arrowPositions.forEach(a => {
    slide.addText("→", {
      x: a.x, y: 1.1, w: a.w, h: 0.4,
      fontSize: 18, fontFace: "Calibri",
      color: theme.secondary, bold: true,
      align: "center", valign: "middle"
    });
  });

  // Process detail cards below
  const details = [
    { title: "规范先行", desc: "4796行技术Spec覆盖架构、数据模型、API、插件机制", emoji: "📋", x: 0.4 },
    { title: "审阅到位", desc: "Claude Code 9轮迭代，三轮审阅纠正架构/技术栈/数据模型", emoji: "🔍", x: 3.4 },
    { title: "代码自动", desc: "Agent Team 按Spec拆分任务，自动完成编码实现", emoji: "🤖", x: 6.4 }
  ];

  details.forEach(d => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: d.x, y: 2.1, w: 2.8, h: 1.1,
      fill: { color: theme.light },
      line: { color: border, width: 1 },
      rectRadius: 0.06
    });
    slide.addText([
      { text: d.emoji + " " + d.title + "\n\n", options: { fontSize: 14, bold: true, color: theme.secondary } },
      { text: d.desc, options: { fontSize: 10, color: text } }
    ], {
      x: d.x + 0.1, y: 2.15, w: 2.6, h: 1.0,
      fontFace: "Microsoft YaHei",
      align: "left", valign: "top"
    });
  });

  // Bottom blue summary banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.45, w: 9.2, h: 0.45,
    fill: { color: "0D2847" },
    line: { color: theme.secondary, width: 1 },
    rectRadius: 0.05
  });
  slide.addText("规范先行 → 审阅到位 → 代码自动", {
    x: 0.5, y: 3.45, w: 9.0, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("26", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
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
  pres.writeFile({ fileName: "slide-26-preview.pptx" });
}

module.exports = { createSlide, slideConfig };