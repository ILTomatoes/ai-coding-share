/**
 * Slide 50 — Q&A (Thank You)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Big centered "感谢聆听"
  slide.addText("感谢聆听", {
    x: 1, y: 1.6, w: 8, h: 1.0,
    fontSize: 40, fontFace: FONTS.CN,
    color: COLORS.TEXT_WHITE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // "Q & A" in blue
  slide.addText("Q & A", {
    x: 1, y: 2.8, w: 8, h: 0.8,
    fontSize: 28, fontFace: FONTS.EN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // Bottom contact placeholder
  slide.addText("联系方式占位符", {
    x: 1, y: 4.6, w: 8, h: 0.4,
    fontSize: 12, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY,
    align: "center", valign: "middle",
    margin: 0,
  });

  // NO page number badge on this slide
}

module.exports = { createSlide };
