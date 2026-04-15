// slide-02.js — P2 Opening - 关于这次分享
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 2,
  title: '关于这次分享'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Page title
  slide.addText("关于这次分享", {
    x: 0.3, y: 0.3, w: 9.4, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Three content rows with emoji icons
  const rows = [
    { emoji: "\u{1F3D7}", text: "三个真实 Java 项目的 AI 协作编程经历" },
    { emoji: "\u{1F3A2}", text: "有成功的喜悦，也有翻车的教训" },
    { emoji: "\u{1F3AF}", text: "目标：听完之后，你能带走一些可以马上用的东西" }
  ];

  const startY = 1.4;
  const rowH = 0.65;
  const gap = 0.3;

  rows.forEach((row, i) => {
    const y = startY + i * (rowH + gap);

    // Emoji icon in a small colored circle
    slide.addShape(pres.shapes.OVAL, {
      x: 0.3, y: y + 0.05, w: 0.55, h: 0.55,
      fill: { color: theme.light }
    });

    slide.addText(row.emoji, {
      x: 0.3, y: y + 0.05, w: 0.55, h: 0.55,
      fontSize: 22, align: "center", valign: "middle",
      margin: 0
    });

    // Text
    slide.addText(row.text, {
      x: 1.1, y: y, w: 8.4, h: rowH,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: "E6EDF3", align: "left", valign: "middle",
      margin: 0
    });
  });

  // Bottom yellow note bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.55, w: 9.4, h: 0.5,
    fill: { color: theme.light },
    line: { color: theme.accent, width: 1 }
  });

  slide.addText("预计 90 分钟  |  鼓励随时提问", {
    x: 0.3, y: 4.55, w: 9.4, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: false,
    align: "center", valign: "middle",
    margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("2", {
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
    bg: "0D1117"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-02-preview.pptx" });
}

module.exports = { createSlide, slideConfig };