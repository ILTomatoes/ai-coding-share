// slide-24.js — P24 SDD Workflow
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 24,
  title: 'SDD 四阶段工作流'
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
  slide.addText("SDD 四阶段工作流", {
    x: 0.4, y: 0.15, w: 4.0, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true, align: "left", valign: "middle"
  });

  // Horizontal 4-node flow
  const flowNodes = [
    { emoji: "📝", label: "Specify", sub: "编写规范", x: 0.4, w: 2.0 },
    { emoji: "🏗️", label: "Plan", sub: "设计方案", x: 2.6, w: 2.0 },
    { emoji: "✂️", label: "Task", sub: "拆分任务", x: 4.8, w: 2.0 },
    { emoji: "🤖", label: "Implement", sub: "自动编码", x: 7.0, w: 2.0 }
  ];

  flowNodes.forEach(node => {
    // Node box
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: node.x, y: 0.85, w: node.w, h: 0.9,
      fill: { color: theme.light },
      line: { color: theme.secondary, width: 1.5 },
      rectRadius: 0.08
    });
    slide.addText([
      { text: node.emoji + " " + node.label + "\n", options: { fontSize: 16, bold: true, color: theme.secondary } },
      { text: node.sub, options: { fontSize: 11, color: muted } }
    ], {
      x: node.x + 0.05, y: 0.87, w: node.w - 0.1, h: 0.85,
      fontFace: "Microsoft YaHei",
      align: "center", valign: "middle"
    });
  });

  // Arrow connectors between nodes
  const arrows = [
    { x1: 2.4, x2: 2.6 },
    { x1: 4.6, x2: 4.8 },
    { x1: 6.8, x2: 7.0 }
  ];
  arrows.forEach(a => {
    slide.addShape(pres.shapes.LINE, {
      x: a.x1, y: 1.3, w: a.x2 - a.x1, h: 0,
      line: { color: theme.secondary, width: 2, dashType: "solid" },
      flipH: false
    });
  });

  // Right 4 benefit cards (2x2 grid on the right side)
  const benefits = [
    { emoji: "🔮", label: "可预测性", desc: "输出可控", x: 5.5, y: 2.0 },
    { emoji: "✅", label: "高质量(TDD)", desc: "内置测试", x: 7.6, y: 2.0 },
    { emoji: "📖", label: "易维护", desc: "规范即文档", x: 5.5, y: 2.85 },
    { emoji: "💰", label: "ROI答疑", desc: "给新同事讲>5分钟就写Spec", x: 7.6, y: 2.85 }
  ];

  benefits.forEach(b => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: b.x, y: b.y, w: 1.9, h: 0.7,
      fill: { color: theme.light },
      line: { color: border, width: 1 },
      rectRadius: 0.06
    });
    slide.addText([
      { text: b.emoji + " " + b.label + "\n", options: { fontSize: 11, bold: true, color: text } },
      { text: b.desc, options: { fontSize: 9, color: muted } }
    ], {
      x: b.x + 0.05, y: b.y, w: 1.8, h: 0.7,
      fontFace: "Microsoft YaHei",
      align: "center", valign: "middle"
    });
  });

  // Left side description area
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.0, w: 4.9, h: 1.55,
    fill: { color: theme.light },
    line: { color: border, width: 1 },
    rectRadius: 0.06
  });
  slide.addText([
    { text: "SDD 核心流程\n\n", options: { fontSize: 13, bold: true, color: theme.secondary } },
    { text: "1. Specify — 用自然语言描述需求\n", options: { fontSize: 11, color: text } },
    { text: "2. Plan — 让AI基于规范设计方案\n", options: { fontSize: 11, color: text } },
    { text: "3. Task — 将方案拆分为可执行任务\n", options: { fontSize: 11, color: text } },
    { text: "4. Implement — Agent 自动完成编码\n", options: { fontSize: 11, color: text } }
  ], {
    x: 0.5, y: 2.05, w: 4.7, h: 1.45,
    fontFace: "Microsoft YaHei",
    align: "left", valign: "top"
  });

  // Bottom blue banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.75, w: 9.2, h: 0.45,
    fill: { color: "0D2847" },
    line: { color: theme.secondary, width: 1 },
    rectRadius: 0.05
  });
  slide.addText("从'码农'变成'系统架构师'——你画图纸，AI盖楼", {
    x: 0.5, y: 3.75, w: 9.0, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("24", {
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
  pres.writeFile({ fileName: "slide-24-preview.pptx" });
}

module.exports = { createSlide, slideConfig };