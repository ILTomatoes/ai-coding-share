/**
 * Slide 13 — P13 Case 2 Summary
 * "方向错了，效率越高代价越大"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addPageNumber, addFlowNode, addRightArrow,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Center big text
  slide.addText("方向错了，效率越高代价越大", {
    x: 1.0, y: 1.0, w: 8.0, h: 0.8,
    fontSize: 32, fontFace: FONTS.CN,
    color: COLORS.RED, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // 4 horizontal flow nodes with arrows
  const nodeW = 1.9;
  const nodeH = 0.7;
  const arrowW = 0.5;
  const arrowH = 0.3;
  const totalW = nodeW * 4 + arrowW * 3;
  const startX = (LAYOUT.W - totalW) / 2;
  const nodeY = 3.0;
  const arrowY = nodeY + (nodeH - arrowH) / 2;

  const nodes = [
    { text: "对领域不了解", border: COLORS.YELLOW },
    { text: "没有先建立认知", border: COLORS.YELLOW },
    { text: "盲目信任 AI", border: COLORS.RED },
    { text: "AI 高效跑偏", border: COLORS.RED },
  ];

  let curX = startX;
  for (let i = 0; i < nodes.length; i++) {
    addFlowNode(slide, curX, nodeY, nodeW, nodeH, nodes[i].text, {
      borderColor: nodes[i].border,
      textColor: COLORS.TEXT_WHITE,
    });
    curX += nodeW;

    if (i < nodes.length - 1) {
      addRightArrow(slide, curX, arrowY, arrowW, arrowH, COLORS.TEXT_GREY);
      curX += arrowW;
    }
  }

  addPageNumber(slide, 13);
}

module.exports = { createSlide };
