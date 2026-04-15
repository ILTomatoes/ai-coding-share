// slide-38.js — P36.5 Sensors Next Step
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 38,
  title: 'Harness 演化的下一步'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("Harness 演化的下一步", {
    x: 0.3, y: 0.3, w: 9.4, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Blue status line — Guides & Sensors
  slide.addText([
    { text: "Guides层初步完成  ", options: { color: theme.secondary, bold: true } },
    { text: "Sensors层正在演进", options: { color: theme.secondary } }
  ], {
    x: 0.3, y: 1.15, w: 9.4, h: 0.45,
    fontSize: 16, fontFace: "Microsoft YaHei",
    align: "left", valign: "middle",
    margin: 0
  });

  // Green card — tried Karate
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.8, w: 9.4, h: 0.55,
    fill: { color: "1A3A2A" },
    line: { color: "3FB950", width: 1.5 }
  });
  slide.addText([
    { text: "✅ ", options: { color: "3FB950", fontSize: 14 } },
    { text: "已尝试 Karate 接口场景测试", options: { color: "3FB950", bold: true, fontSize: 15 } }
  ], {
    x: 0.5, y: 1.8, w: 9.0, h: 0.55,
    fontFace: "Microsoft YaHei",
    align: "left", valign: "middle",
    margin: 0
  });

  // Three horizontal cards
  const cards = [
    { emoji: "🧪", title: "自动化测试", desc: "单元+集成测试\n通过才合并" },
    { emoji: "🔍", title: "Sonar代码扫描", desc: "规范·重复·Bug·安全" },
    { emoji: "🔄", title: "CI流水线", desc: "测试+Sonar+构建\n自动化" }
  ];

  const startX = 0.3;
  const cardW = 3.0;
  const cardGap = 0.2;
  const cardY = 2.55;
  const cardH = 1.3;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardW + cardGap);

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.light },
      line: { color: "30363D", width: 1 }
    });

    // Emoji + title
    slide.addText([
      { text: card.emoji + " ", options: { fontSize: 18 } },
      { text: card.title, options: { fontSize: 16, bold: true } }
    ], {
      x: cx + 0.15, y: cardY + 0.15, w: cardW - 0.3, h: 0.45,
      fontFace: "Microsoft YaHei",
      color: "E6EDF3",
      align: "center", valign: "middle",
      margin: 0
    });

    // Description
    slide.addText(card.desc, {
      x: cx + 0.15, y: cardY + 0.65, w: cardW - 0.3, h: 0.55,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: "8B949E", align: "center", valign: "middle",
      margin: 0
    });
  });

  // Blue big insight
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.15, w: 9.4, h: 0.75,
    fill: { color: "0D2240" },
    line: { color: theme.secondary, width: 1.5 }
  });
  slide.addText([
    { text: "Guides", options: { color: theme.secondary, bold: true } },
    { text: "让人读规则  ", options: { color: "E6EDF3" } },
    { text: "Sensors", options: { color: "3FB950", bold: true } },
    { text: "让机器自动执行规则", options: { color: "E6EDF3" } },
    { text: "——两者结合才是完整闭环", options: { color: theme.accent } }
  ], {
    x: 0.5, y: 4.15, w: 9.0, h: 0.75,
    fontSize: 15, fontFace: "Microsoft YaHei",
    align: "center", valign: "middle",
    margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("38", {
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
  pres.writeFile({ fileName: "slide-38-preview.pptx" });
}

module.exports = { createSlide, slideConfig };