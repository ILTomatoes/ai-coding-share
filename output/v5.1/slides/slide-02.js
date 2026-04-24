/**
 * Slide 02 - Opening: "关于这次分享"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addTextBlock,
  addWarningBox,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide({ bkgd: COLORS.BG_DARK });
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "\u5173\u4e8e\u8fd9\u6b21\u5206\u4eab");

  // Three items with emoji bullets
  const items = [
    "\ud83c\udfd7\ufe0f  \u4e09\u4e2a\u771f\u5b9e Java \u9879\u76ee\u7684 AI \u534f\u4f5c\u7f16\u7a0b\u7ecf\u5386",
    "\ud83c\udfa2  \u6709\u6210\u529f\u7684\u559c\u60a6\uff0c\u4e5f\u6709\u7ffb\u8f66\u7684\u6559\u8bad",
    "\ud83c\udfaf  \u76ee\u6807\uff1a\u542c\u5b8c\u4e4b\u540e\uff0c\u4f60\u80fd\u5e26\u8d70\u4e00\u4e9b\u53ef\u4ee5\u9a6c\u4e0a\u7528\u7684\u4e1c\u897f",
  ];

  items.forEach((item, i) => {
    addTextBlock(slide, LAYOUT.MARGIN_L, 1.3 + i * 0.7, 8.6, 0.55, item, {
      fontSize: 18,
      color: COLORS.TEXT_WHITE,
    });
  });

  // Bottom yellow note
  addWarningBox(slide, LAYOUT.MARGIN_L, 4.2, 8.6, 0.55, "\u9884\u8ba1 90 \u5206\u949f | \u9f13\u52b1\u968f\u65f6\u63d0\u95ee", {
    fontSize: 14,
  });

  // Page number
  addPageNumber(slide, 2);
}

module.exports = { createSlide };
