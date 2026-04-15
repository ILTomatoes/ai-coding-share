// slide-19.js — P19 Role Shift
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 19,
  title: '角色转变'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("角色转变", {
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

  // Row 1 — Past (gray)
  // Background bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.25, w: 9.0, h: 0.85,
    fill: { color: theme.light },
    line: { color: theme.border, width: 0.5 },
    rectRadius: 0
  });

  // Label
  slide.addText("过去", {
    x: 0.5, y: 1.25, w: 1.0, h: 0.85,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.muted, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Process flow — gray
  slide.addText("设计 ✍️  →  编码 💻  →  测试 🧪", {
    x: 1.5, y: 1.25, w: 7.5, h: 0.85,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.muted, align: "center", valign: "middle",
    margin: 0
  });

  // "(全自己做)" annotation
  slide.addText("(全自己做)", {
    x: 7.5, y: 1.25, w: 2.0, h: 0.85,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.muted, align: "right", valign: "bottom",
    margin: 0
  });

  // Row 2 — Now (green highlight)
  // Background bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.3, w: 9.0, h: 0.85,
    fill: { color: theme.light },
    line: { color: theme.green, width: 1 },
    rectRadius: 0
  });

  // Label
  slide.addText("现在", {
    x: 0.5, y: 2.3, w: 1.0, h: 0.85,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.green, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Process flow with green highlight on AI encoding
  slide.addText([
    { text: "设计 ✍️  →  ", options: { fontSize: 18, color: theme.text, fontFace: "Microsoft YaHei" } },
    { text: "AI编码 🤖", options: { fontSize: 18, color: theme.green, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "  →  评审测试 🔍", options: { fontSize: 18, color: theme.text, fontFace: "Microsoft YaHei" } }
  ], {
    x: 1.5, y: 2.3, w: 7.5, h: 0.85,
    align: "center", valign: "middle",
    margin: 0
  });

  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 3.4, w: 9.0, h: 0,
    line: { color: theme.border, width: 1 }
  });

  // Bottom big blue conclusion
  slide.addText("从'码农'变成'系统架构师'——你画图纸，AI盖楼", {
    x: 0.5, y: 3.6, w: 9.0, h: 1.0,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("19", {
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
  pres.writeFile({ fileName: "slide-19-preview.pptx" });
}

module.exports = { createSlide, slideConfig };