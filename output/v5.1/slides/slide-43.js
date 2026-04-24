/**
 * Slide 43 — 技巧一：小步快跑，持续验证
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addFlowNode,
  addRightArrow,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "技巧一：小步快跑，持续验证");

  // 3 cycle flow nodes: 设计 → 实现 → 测试 → back to 设计
  const nodeW = 1.8;
  const nodeH = 0.55;
  const arrowW = 0.5;
  const arrowH = 0.25;
  const totalW = nodeW * 3 + arrowW * 2;
  const startX = (LAYOUT.W - totalW) / 2;
  const flowY = 1.15;

  const flowNodes = [
    { text: "设计", borderColor: COLORS.ACCENT_BLUE },
    { text: "实现", borderColor: COLORS.GREEN },
    { text: "测试", borderColor: COLORS.YELLOW },
  ];

  flowNodes.forEach((node, i) => {
    const x = startX + i * (nodeW + arrowW);
    addFlowNode(slide, x, flowY, nodeW, nodeH, node.text, {
      borderColor: node.borderColor,
      fillColor: COLORS.CARD_BG,
      textColor: COLORS.TEXT_WHITE,
      fontSize: 13,
    });

    // Right arrow between nodes
    if (i < flowNodes.length - 1) {
      addRightArrow(
        slide,
        x + nodeW + 0.05,
        flowY + nodeH / 2 - arrowH / 2,
        arrowW - 0.1,
        arrowH,
        COLORS.TEXT_GREY
      );
    }
  });

  // Loop-back arrow: from 测试 back to 设计 (downward curved hint)
  // Use a text label to indicate the cycle
  addTextBlock(slide, startX + nodeW * 2 + arrowW * 2 + 0.1, flowY + 0.1, 1.2, nodeH - 0.1,
    "↩ 循环", {
      fontSize: 12,
      fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY,
      align: "left",
      valign: "middle",
    });

  // Three key points
  const points = [
    "• AI 生成快 → 错误积累也快 → 一次贪多反而更慢",
    "• 每完成一个模块就验证，而不是全部完成后再测",
    "• 遇到问题再'磨刀'，不提前过度设计",
  ];

  const pointsY = 2.1;
  const pointsGap = 0.38;
  points.forEach((point, i) => {
    addTextBlock(slide, LAYOUT.MARGIN_L, pointsY + i * pointsGap,
      LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
      point, {
        fontSize: 13,
        fontFace: FONTS.CN,
        color: COLORS.TEXT_WHITE,
      });
  });

  // Bottom lesson (grey, centered)
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.5,
    LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "aip-portal 早期一次做大模块导致批量返工", {
      fontSize: 11,
      fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY,
      align: "center",
      valign: "middle",
    });

  addPageNumber(slide, 43);
}

module.exports = { createSlide };
