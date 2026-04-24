// slide-21.js — P21 Key Question
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 21,
  title: '关键问题：怎么让 AI 稳定输出高质量代码？'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("关键问题：怎么让 AI 稳定输出高质量代码？", {
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

  // 5-node downward chain with arrows
  const chainX = 0.6;
  const nodeW = 8.8;
  const nodeH = 0.5;
  const arrowH = 0.25;
  const startY = 1.15;
  const stepH = nodeH + arrowH;

  // Node 1: 把擅长的事交给AI
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chainX, y: startY, w: nodeW, h: nodeH,
    fill: { color: theme.light },
    line: { color: theme.secondary, width: 0.75 },
    rectRadius: 0
  });
  slide.addText("把擅长的事交给 AI", {
    x: chainX, y: startY, w: nodeW, h: nodeH,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Arrow 1 → 2
  slide.addText("→", {
    x: chainX, y: startY + nodeH, w: nodeW, h: arrowH,
    fontSize: 18, fontFace: "Calibri",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // Node 2: 但AI会PUA你
  const n2Y = startY + stepH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chainX, y: n2Y, w: nodeW, h: nodeH,
    fill: { color: theme.light },
    line: { color: theme.red, width: 0.75 },
    rectRadius: 0
  });
  slide.addText("但 AI 会 PUA 你", {
    x: chainX, y: n2Y, w: nodeW, h: nodeH,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.red, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Arrow 2 → 3
  slide.addText("→", {
    x: chainX, y: n2Y + nodeH, w: nodeW, h: arrowH,
    fontSize: 18, fontFace: "Calibri",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // Node 3: 靠个人判断力够吗？
  const n3Y = startY + 2 * stepH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chainX, y: n3Y, w: nodeW, h: nodeH,
    fill: { color: theme.light },
    line: { color: theme.accent, width: 0.75 },
    rectRadius: 0
  });
  slide.addText("靠个人判断力够吗？", {
    x: chainX, y: n3Y, w: nodeW, h: nodeH,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Arrow 3 → 4
  slide.addText("→", {
    x: chainX, y: n3Y + nodeH, w: nodeW, h: arrowH,
    fontSize: 18, fontFace: "Calibri",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // Node 4: 单靠经验不可持续不可复制
  const n4Y = startY + 3 * stepH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chainX, y: n4Y, w: nodeW, h: nodeH,
    fill: { color: theme.light },
    line: { color: theme.muted, width: 0.75 },
    rectRadius: 0
  });
  slide.addText("单靠经验，不可持续不可复制", {
    x: chainX, y: n4Y, w: nodeW, h: nodeH,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.muted, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Arrow 4 → 5
  slide.addText("→", {
    x: chainX, y: n4Y + nodeH, w: nodeW, h: arrowH,
    fontSize: 18, fontFace: "Calibri",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // Node 5: 团队协作项目复杂怎么办？
  const n5Y = startY + 4 * stepH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chainX, y: n5Y, w: nodeW, h: nodeH,
    fill: { color: theme.light },
    line: { color: theme.text, width: 0.75 },
    rectRadius: 0
  });
  slide.addText("团队协作、项目复杂怎么办？", {
    x: chainX, y: n5Y, w: nodeW, h: nodeH,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.text, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Bottom big blue conclusion
  slide.addText("我们需要一套系统化的方法 →", {
    x: 0.5, y: 4.65, w: 9.0, h: 0.55,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("21", {
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
  pres.writeFile({ fileName: "slide-21-preview.pptx" });
}

module.exports = { createSlide, slideConfig };