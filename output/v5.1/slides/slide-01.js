/**
 * Slide 01 - Cover Page
 * "Java 开发中的 AI 协作编程实践"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");

function createSlide(pres) {
  const slide = pres.addSlide({ bkgd: COLORS.BG_DARK });
  slide.background = { color: COLORS.BG_DARK };

  // Main title
  slide.addText("Java \u5f00\u53d1\u4e2d\u7684 AI \u534f\u4f5c\u7f16\u7a0b\u5b9e\u8df5", {
    x: 1.0, y: 1.6, w: 8.0, h: 1.2,
    fontSize: 44,
    fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // Subtitle
  slide.addText("\u4ece\u771f\u5b9e\u9879\u76ee\u8bf4\u8d77", {
    x: 1.0, y: 2.9, w: 8.0, h: 0.6,
    fontSize: 20,
    fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // Bottom center: presenter and date
  slide.addText("\u6f14\u8bb2\u4eba / 2026\u5e744\u6708", {
    x: 1.0, y: 4.3, w: 8.0, h: 0.4,
    fontSize: 14,
    fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // Bottom right: internal sharing label
  slide.addText("\u5185\u90e8\u4ea4\u6d41\u5206\u4eab", {
    x: 7.5, y: 5.1, w: 2.0, h: 0.3,
    fontSize: 10,
    fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY,
    align: "right",
    valign: "middle",
    margin: 0,
  });
}

module.exports = { createSlide };
