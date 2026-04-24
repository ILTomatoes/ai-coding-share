// slide-20.js — P20 AI PUA Trap
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 20,
  title: '陷阱：AI 会 PUA 你'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("⚠️ 陷阱：AI 会'PUA'你", {
    x: 0.5, y: 0.3, w: 8.5, h: 0.6,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Title underline
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 0.95, w: 3.5, h: 0,
    line: { color: theme.red, width: 2 }
  });

  // Three red cards
  // Card 1
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 2.9, h: 1.2,
    fill: { color: theme.light },
    line: { color: theme.red, width: 1 },
    rectRadius: 0
  });
  slide.addText("永远自信满满\n即使方向错误", {
    x: 0.5, y: 1.2, w: 2.9, h: 1.2,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.red, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Card 2
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.55, y: 1.2, w: 2.9, h: 1.2,
    fill: { color: theme.light },
    line: { color: theme.red, width: 1 },
    rectRadius: 0
  });
  slide.addText("语气笃定逻辑自洽\n容易被说服", {
    x: 3.55, y: 1.2, w: 2.9, h: 1.2,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.red, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Card 3
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.6, y: 1.2, w: 2.9, h: 1.2,
    fill: { color: theme.light },
    line: { color: theme.red, width: 1 },
    rectRadius: 0
  });
  slide.addText("不会犹豫\n不会说我不确定", {
    x: 6.6, y: 1.2, w: 2.9, h: 1.2,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.red, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 2.55, w: 9.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Bottom examples
  slide.addText([
    { text: "A2A：AI 全程自信造轮子，46 次提交无犹豫\n", options: { fontSize: 14, color: theme.text, fontFace: "Microsoft YaHei", bold: true } },
    { text: "权限过滤：AI 保留逻辑的理由听起来完全合理，但缺失业务上下文", options: { fontSize: 14, color: theme.muted, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.5, y: 2.7, w: 9.0, h: 1.5,
    valign: "top", margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("20", {
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
  pres.writeFile({ fileName: "slide-20-preview.pptx" });
}

module.exports = { createSlide, slideConfig };