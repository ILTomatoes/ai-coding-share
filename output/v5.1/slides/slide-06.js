/**
 * Slide 6 — P6 Collaboration Mode
 * 人与 AI 的分工：4 个水平流程节点 + 底部原则
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addFlowNode, addRightArrow, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "协作模式 — 人与 AI 的分工");

  // ── 4 horizontal flow nodes ──
  const nodeY = 1.4;
  const nodeW = 1.7;
  const nodeH = 0.9;
  const gap = 0.5;   // gap between nodes (arrow space)
  const startX = 0.8;
  const positions = [];
  for (let i = 0; i < 4; i++) {
    positions.push(startX + i * (nodeW + gap));
  }

  // Node 1: Human — 设计原型
  addFlowNode(slide, positions[0], nodeY, nodeW, nodeH,
    "\u{1F9D1} 人设计原型",
    { borderColor: COLORS.ACCENT_BLUE, fillColor: COLORS.CARD_BG }
  );

  // Node 2: Human — 设计表结构 + annotation
  addFlowNode(slide, positions[1], nodeY, nodeW, nodeH,
    "\u{1F9D1} 人设计表结构",
    { borderColor: COLORS.ACCENT_BLUE, fillColor: COLORS.CARD_BG }
  );
  // Small annotation below node 2
  addTextBlock(slide, positions[1] + 0.1, nodeY + nodeH + 0.05, nodeW - 0.2, 0.25,
    "AI参与讨论", {
      fontSize: 9, color: COLORS.TEXT_GREY, align: "center", bold: false,
    });

  // Node 3: AI — 编码 (GREEN)
  addFlowNode(slide, positions[2], nodeY, nodeW, nodeH,
    "\u{1F916} AI 编码",
    { borderColor: COLORS.GREEN, fillColor: COLORS.GREEN_BG }
  );

  // Node 4: Human — 评审 & 测试
  addFlowNode(slide, positions[3], nodeY, nodeW, nodeH,
    "\u{1F9D1} 人评审 & 测试",
    { borderColor: COLORS.ACCENT_BLUE, fillColor: COLORS.CARD_BG }
  );

  // Arrows between nodes
  for (let i = 0; i < 3; i++) {
    const arrowX = positions[i] + nodeW + 0.05;
    addRightArrow(slide, arrowX, nodeY + nodeH / 2 - 0.12, 0.4, 0.24, COLORS.TEXT_GREY);
  }

  // ── Bottom 3 principles ──
  const principles = [
    "\u2705 人负责'定方向'（设计、评审、验收）",
    "\u2705 AI 负责'跑量'（编码实现）",
    "\u2705 及时评审，小步验证",
  ];
  const principlesY = 3.0;
  principles.forEach((text, i) => {
    addTextBlock(slide, LAYOUT.MARGIN_L, principlesY + i * 0.42,
      LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.38,
      text, { fontSize: 13, color: COLORS.TEXT_WHITE }
    );
  });

  addPageNumber(slide, 6);
}

module.exports = { createSlide };
