/**
 * Slide 05 - Case 1: Logic/Tool Module Focus
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addSubtitle,
  addPageNumber,
  addCard,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide({ bkgd: COLORS.BG_DARK });
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "\u805a\u7126\u6280\u80fd\u5de5\u5177\u6a21\u5757\uff08logic/tool\uff09");

  // Subtitle
  addSubtitle(slide, "5 \u4e2a Controller\uff0c\u7ea6 80 \u4e2a API \u7aef\u70b9\uff0c8 \u4e2a\u6838\u5fc3\u5b9e\u4f53");

  // Five cards in a row
  const cards = [
    { title: "\u4ee3\u7801\u5e93\u7ba1\u7406", sub: "LtCodeRepoController" },
    { title: "MCP \u670d\u52a1", sub: "LtMcpController" },
    { title: "\u6269\u5c55\u63d2\u4ef6", sub: "LtExtensionPluginController" },
    { title: "OpenAPI", sub: "LtOpenapiController" },
    { title: "\u5de5\u4f5c\u6d41", sub: "LtTaskflowController" },
  ];

  const cardW = 1.5;
  const gap = 0.2;
  const startX = LAYOUT.MARGIN_L + 0.15;
  const cardY = 1.5;
  const cardH = 1.8;

  cards.forEach((card, i) => {
    const x = startX + i * (cardW + gap);

    addCard(slide, x, cardY, cardW, cardH, card.title, [card.sub], {
      accentColor: COLORS.ACCENT_BLUE,
      titleSize: 12,
      descSize: 9,
      titleColor: COLORS.ACCENT_BLUE,
      descColor: COLORS.TEXT_GREY,
    });
  });

  // Page number
  addPageNumber(slide, 5);
}

module.exports = { createSlide };
