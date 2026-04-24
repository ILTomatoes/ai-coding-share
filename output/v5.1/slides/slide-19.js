/**
 * Slide 19 — 角色转变 (Role Transformation)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addFlowNode,
  addRightArrow,
  addTextBlock,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "角色转变");

  const nodeW = 1.8;
  const nodeH = 0.65;
  const arrowW = 0.45;
  const arrowH = 0.25;

  // ─── Row 1: Past ───
  const row1Y = 1.35;
  const row1StartX = 2.1;

  // "过去：" label
  addTextBlock(slide, LAYOUT.MARGIN_L, row1Y + 0.1, 1.2, 0.45,
    "过去：", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, bold: true,
      align: "right", valign: "middle",
    });

  // Node: 设计
  addFlowNode(slide, row1StartX, row1Y, nodeW, nodeH, "设计 ✍️", {
    borderColor: COLORS.TEXT_GREY, fillColor: COLORS.CARD_BG, textColor: COLORS.TEXT_GREY, fontSize: 12,
  });
  addRightArrow(slide, row1StartX + nodeW, row1Y + 0.2, arrowW, arrowH, COLORS.TEXT_GREY);

  // Node: 编码
  addFlowNode(slide, row1StartX + nodeW + arrowW, row1Y, nodeW, nodeH, "编码 💻", {
    borderColor: COLORS.TEXT_GREY, fillColor: COLORS.CARD_BG, textColor: COLORS.TEXT_GREY, fontSize: 12,
  });
  addRightArrow(slide, row1StartX + 2 * (nodeW + arrowW), row1Y + 0.2, arrowW, arrowH, COLORS.TEXT_GREY);

  // Node: 测试
  addFlowNode(slide, row1StartX + 2 * (nodeW + arrowW), row1Y, nodeW, nodeH, "测试 🧪", {
    borderColor: COLORS.TEXT_GREY, fillColor: COLORS.CARD_BG, textColor: COLORS.TEXT_GREY, fontSize: 12,
  });

  // Annotation: 全自己做
  addTextBlock(slide, row1StartX + 3 * (nodeW + arrowW) - arrowW + 0.15, row1Y + 0.1, 1.3, 0.45,
    "全自己做", {
      fontSize: 11, fontFace: FONTS.CN, color: COLORS.TEXT_GREY, valign: "middle",
    });

  // ─── Row 2: Now ───
  const row2Y = 2.5;

  // "现在：" label
  addTextBlock(slide, LAYOUT.MARGIN_L, row2Y + 0.1, 1.2, 0.45,
    "现在：", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "right", valign: "middle",
    });

  // Node: 设计 (blue)
  addFlowNode(slide, row1StartX, row2Y, nodeW, nodeH, "设计 ✍️", {
    borderColor: COLORS.ACCENT_BLUE, fillColor: COLORS.CARD_BG, textColor: COLORS.ACCENT_BLUE, fontSize: 12,
  });
  addRightArrow(slide, row1StartX + nodeW, row2Y + 0.2, arrowW, arrowH, COLORS.ACCENT_BLUE);

  // Node: AI 编码 (GREEN border, GREEN_BG fill)
  addFlowNode(slide, row1StartX + nodeW + arrowW, row2Y, nodeW, nodeH, "AI 编码 🤖", {
    borderColor: COLORS.GREEN, fillColor: COLORS.GREEN_BG, textColor: COLORS.GREEN, fontSize: 12,
  });
  addRightArrow(slide, row1StartX + 2 * (nodeW + arrowW), row2Y + 0.2, arrowW, arrowH, COLORS.ACCENT_BLUE);

  // Node: 评审测试 (blue)
  addFlowNode(slide, row1StartX + 2 * (nodeW + arrowW), row2Y, nodeW, nodeH, "评审测试 🔍", {
    borderColor: COLORS.ACCENT_BLUE, fillColor: COLORS.CARD_BG, textColor: COLORS.ACCENT_BLUE, fontSize: 12,
  });

  // Annotation: AI分担编码
  addTextBlock(slide, row1StartX + 3 * (nodeW + arrowW) - arrowW + 0.15, row2Y + 0.1, 1.5, 0.45,
    "AI分担编码", {
      fontSize: 11, fontFace: FONTS.CN, color: COLORS.GREEN, valign: "middle",
    });

  // Bottom quote
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.9, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.7,
    "从'码农'变成'系统架构师'——你画图纸，AI 盖楼", {
      fontSize: 22, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    });

  addPageNumber(slide, 19);
}

module.exports = { createSlide };
