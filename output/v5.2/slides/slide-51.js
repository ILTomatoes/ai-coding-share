// slide-51.js — P48 Q&A Closing: 感谢聆听
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");

const slideConfig = {
  type: 'closing',
  index: 51,
  title: '感谢聆听'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Center large: "感谢聆听"
  slide.addText("感谢聆听", {
    x: 1.5, y: 1.8, w: 7, h: 1.2,
    fontSize: 48, fontFace: FONTS.CN,
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Subtitle: "Q & A"
  slide.addText("Q & A", {
    x: 1.5, y: 3.2, w: 7, h: 0.8,
    fontSize: 24, fontFace: FONTS.EN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Decorative accent line
  slide.addShape("rect", {
    x: 3.5, y: 3.05, w: 3, h: 0.04,
    fill: { color: COLORS.ACCENT_BLUE },
  });

  // No page number badge for closing slide (optional skip per spec)

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
  pres.writeFile({ fileName: "slide-51-preview.pptx" });
}

module.exports = { createSlide, slideConfig };