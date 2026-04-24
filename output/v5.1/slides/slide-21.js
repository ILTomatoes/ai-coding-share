/**
 * Slide 21 — 关键问题 (Key Question)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addFlowNode,
  addDownArrow,
  addTextBlock,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "关键问题");

  // 5 vertical flow nodes with down arrows
  const nodeW = 5.5;
  const nodeH = 0.5;
  const arrowH = 0.2;
  const arrowW = 0.3;
  const centerX = (LAYOUT.W - nodeW) / 2;
  const startY = 1.1;
  const step = nodeH + arrowH;

  const nodes = [
    "把擅长的事交给 AI",
    "但 AI 会 PUA 你",
    "靠个人判断力够吗？",
    "单靠经验 → 不可持续、不可复制",
    "团队协作？项目复杂了怎么办？",
  ];

  nodes.forEach((text, i) => {
    const y = startY + i * step;
    addFlowNode(slide, centerX, y, nodeW, nodeH, text, {
      borderColor: COLORS.ACCENT_BLUE,
      fillColor: COLORS.CARD_BG,
      textColor: COLORS.TEXT_WHITE,
      fontSize: 13,
    });

    // Down arrow between nodes (not after the last one)
    if (i < nodes.length - 1) {
      addDownArrow(slide, centerX + nodeW / 2 - arrowW / 2, y + nodeH, arrowW, arrowH, COLORS.ACCENT_BLUE);
    }
  });

  // Bottom big conclusion
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.3, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.6,
    "我们需要一套系统化的方法 →", {
      fontSize: 24, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    });

  addPageNumber(slide, 21);
}

module.exports = { createSlide };
