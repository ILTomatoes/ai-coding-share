// slide-25.js — P25 Gateway Project
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 25,
  title: '案例：智能体消息网关 aip-gateway'
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
  slide.addText("案例：智能体消息网关 aip-gateway", {
    x: 0.4, y: 0.15, w: 6.5, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true, align: "left", valign: "middle"
  });

  // AMG core module positioning card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 0.8, w: 5.5, h: 1.1,
    fill: { color: theme.light },
    line: { color: theme.secondary, width: 1.5 },
    rectRadius: 0.08
  });
  slide.addText([
    { text: "AMG 核心模块定位\n", options: { fontSize: 14, bold: true, color: theme.secondary } },
    { text: "Agent Message Gateway — 智能体消息的统一入口与路由枢纽\n", options: { fontSize: 11, color: text } },
    { text: "连接多个 AI 智能体，处理消息分发、协议转换、插件扩展", options: { fontSize: 10, color: muted } }
  ], {
    x: 0.5, y: 0.85, w: 5.3, h: 1.0,
    fontFace: "Microsoft YaHei",
    align: "left", valign: "top"
  });

  // Tech stack card on the right
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.2, y: 0.8, w: 3.4, h: 1.1,
    fill: { color: theme.light },
    line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08
  });
  slide.addText([
    { text: "技术栈\n", options: { fontSize: 13, bold: true, color: theme.accent } },
    { text: "Spring WebFlux\n", options: { fontSize: 10, color: text } },
    { text: "R2DBC (Reactive SQL)\n", options: { fontSize: 10, color: text } },
    { text: "Redis Reactive", options: { fontSize: 10, color: text } }
  ], {
    x: 6.3, y: 0.85, w: 3.2, h: 1.0,
    fontFace: "Microsoft YaHei",
    align: "left", valign: "top"
  });

  // Three data cards
  const dataCards = [
    { value: "209", unit: "次提交", x: 0.4 },
    { value: "584", unit: "个Java文件", x: 3.4 },
    { value: "18", unit: "个插件模块", x: 6.4 }
  ];

  dataCards.forEach(card => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: card.x, y: 2.15, w: 2.8, h: 0.9,
      fill: { color: theme.light },
      line: { color: theme.secondary, width: 1 },
      rectRadius: 0.06
    });
    slide.addText([
      { text: card.value + "\n", options: { fontSize: 26, bold: true, color: theme.secondary, fontFace: "Calibri" } },
      { text: card.unit, options: { fontSize: 12, color: muted, fontFace: "Microsoft YaHei" } }
    ], {
      x: card.x + 0.1, y: 2.18, w: 2.6, h: 0.85,
      align: "center", valign: "middle"
    });
  });

  // Bottom highlight banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.35, w: 9.2, h: 0.5,
    fill: { color: "0D2B15" },
    line: { color: green, width: 1.5 },
    rectRadius: 0.06
  });
  slide.addText([
    { text: "AMG 核心 ", options: { fontSize: 14, bold: true, color: green } },
    { text: "59个文件", options: { fontSize: 14, bold: true, color: text } },
    { text: "  |  ", options: { fontSize: 14, color: muted } },
    { text: "仅2天完成", options: { fontSize: 14, bold: true, color: green } },
    { text: "  |  ", options: { fontSize: 14, color: muted } },
    { text: "v1 → v1.9", options: { fontSize: 14, color: text } }
  ], {
    x: 0.5, y: 3.35, w: 9.0, h: 0.5,
    fontFace: "Microsoft YaHei",
    align: "center", valign: "middle"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("25", {
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
  pres.writeFile({ fileName: "slide-25-preview.pptx" });
}

module.exports = { createSlide, slideConfig };