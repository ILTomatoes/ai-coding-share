// slide-49.js — P46 Observer Advice: 给观望者：从一个最小场景开始
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 49,
  title: '给观望者：从一个最小场景开始'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "给观望者：从一个最小场景开始");

  // Three green cards horizontal
  const cards = [
    {
      icon: "🧪",
      title: "让AI写单元测试",
      desc: "最低风险\nAI只生成测试代码\n不影响业务逻辑",
      accent: COLORS.GREEN,
    },
    {
      icon: "🔍",
      title: "让AI做代码评审",
      desc: "只读模式\n风险为零\n还能学到新视角",
      accent: COLORS.GREEN,
    },
    {
      icon: "⚡",
      title: "让AI写CRUD接口",
      desc: "快速体验效率提升\n最常见的需求\n模板化程度高",
      accent: COLORS.GREEN,
    },
  ];

  const cardY = 1.1;
  const cardW = 2.8;
  const cardH = 2.8;
  const cardGap = 0.2;
  const startX = 0.7;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardW + cardGap);

    // Card background — green tinted
    slide.addShape("rect", {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.GREEN_BG },
      line: { color: COLORS.GREEN, width: 0.75 },
      rectRadius: 0.03,
    });

    // Accent bar at top
    slide.addShape("rect", {
      x: cx, y: cardY, w: cardW, h: 0.05,
      fill: { color: COLORS.GREEN },
    });

    // Icon
    slide.addText(card.icon, {
      x: cx + 0.12, y: cardY + 0.2, w: cardW - 0.24, h: 0.5,
      fontSize: 28, fontFace: "Segoe UI Emoji",
      color: COLORS.GREEN,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Title
    slide.addText(card.title, {
      x: cx + 0.12, y: cardY + 0.75, w: cardW - 0.24, h: 0.5,
      fontSize: 16, fontFace: FONTS.CN,
      color: COLORS.GREEN, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Description
    const descLines = card.desc.split("\n");
    slide.addText(
      descLines.map((line, j) => ({
        text: line,
        options: { breakLine: j < descLines.length - 1, fontSize: 12, color: COLORS.TEXT_GREY },
      })),
      {
        x: cx + 0.12, y: cardY + 1.35, w: cardW - 0.24, h: 1.3,
        fontFace: FONTS.CN,
        align: "center", valign: "top",
        margin: 0,
      }
    );
  });

  // Bottom note
  slide.addShape("rect", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.5,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.GREEN, width: 0.75 },
    rectRadius: 0.03,
  });
  slide.addText("感受到效率提升后，自然扩大使用范围", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.5,
    fontSize: 15, fontFace: FONTS.CN,
    color: COLORS.GREEN, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Page number badge
  addPageNumber(slide, 49);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7",
    accent: "E3B341", light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-49-preview.pptx" });
}

module.exports = { createSlide, slideConfig };