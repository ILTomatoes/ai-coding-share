// slide-50.js — P47 Summary: 总结
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 50,
  title: '总结'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "总结");

  // Four numbered blue statements (large)
  const statements = [
    "AI 效率确定性不确定的是人的引导",
    "把最擅长的事交给AI，释放时间做更有价值的事",
    "用 SDD + Harness 系统化驾驭 AI",
    "从码农变成系统架构师——你画图纸，AI盖楼",
  ];

  const stmtY = 1.1;
  const stmtH = 0.9;
  const stmtGap = 0.15;

  statements.forEach((stmt, i) => {
    const cy = stmtY + i * (stmtH + stmtGap);

    // Card background
    slide.addShape("rect", {
      x: 0.7, y: cy, w: 8.6, h: stmtH,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.ACCENT_BLUE, width: 1 },
      rectRadius: 0.03,
    });

    // Left accent bar
    slide.addShape("rect", {
      x: 0.7, y: cy, w: 0.06, h: stmtH,
      fill: { color: COLORS.ACCENT_BLUE },
    });

    // Number
    const numSize = 0.4;
    slide.addShape("oval", {
      x: 0.95, y: cy + (stmtH - numSize) / 2, w: numSize, h: numSize,
      fill: { color: COLORS.ACCENT_BLUE },
    });
    slide.addText(String(i + 1), {
      x: 0.95, y: cy + (stmtH - numSize) / 2, w: numSize, h: numSize,
      fontSize: 16, fontFace: FONTS.EN,
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Statement text — large, blue, bold
    slide.addText(stmt, {
      x: 1.55, y: cy, w: 7.6, h: stmtH,
      fontSize: 18, fontFace: FONTS.CN,
      color: COLORS.ACCENT_BLUE, bold: true,
      valign: "middle",
      margin: 0,
    });
  });

  // Page number badge
  addPageNumber(slide, 50);

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
  pres.writeFile({ fileName: "slide-50-preview.pptx" });
}

module.exports = { createSlide, slideConfig };