/**
 * Slide 30 — P30 What is Harness Engineering
 * 什么是 Harness Engineering？
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addTextBlock, addFlowNode, addRightArrow,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "什么是 Harness Engineering？");

  // ── Center big formula ──
  addTextBlock(slide, 1.5, 1.0, 7.0, 0.55,
    "Agent = Model + Harness", {
      fontSize: 28, fontFace: FONTS.EN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    }
  );

  // ── Small annotation ──
  addTextBlock(slide, 1.0, 1.55, 8.0, 0.35,
    "模型是马，Harness 是缰绳——光有马不行，还需要一整套驾驭系统", {
      fontSize: 11, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
      align: "center", valign: "middle",
    }
  );

  // ── Definition card ──
  addCard(slide, 0.7, 2.0, 8.6, 1.0,
    "Harness 原意'马具'", [
      "马速度快、力量大，但不套上缰绳就会跑偏",
      "AI 领域：让 Agent 安全、高效、可控地干活的整套约束系统",
    ], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.TEXT_WHITE,
      titleSize: 12,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  // ── Three-phase evolution timeline (horizontal) ──
  const phaseY = 3.3;
  const nodeW = 2.5;
  const nodeH = 0.65;
  const arrowW = 0.35;
  const arrowH = 0.25;
  const totalPhaseW = nodeW * 3 + arrowW * 2;
  const phaseStartX = (LAYOUT.W - totalPhaseW) / 2;

  // Phase 1
  addFlowNode(slide, phaseStartX, phaseY, nodeW, nodeH, "2023 Prompt Engineering", {
    borderColor: COLORS.YELLOW,
    fillColor: COLORS.CARD_BG,
    textColor: COLORS.TEXT_WHITE,
    fontSize: 10,
  });

  // Arrow 1
  addRightArrow(slide, phaseStartX + nodeW, phaseY + (nodeH - arrowH) / 2, arrowW, arrowH, COLORS.TEXT_GREY);

  // Phase 2
  addFlowNode(slide, phaseStartX + nodeW + arrowW, phaseY, nodeW, nodeH, "2025 Context Engineering", {
    borderColor: COLORS.ACCENT_BLUE,
    fillColor: COLORS.CARD_BG,
    textColor: COLORS.TEXT_WHITE,
    fontSize: 10,
  });

  // Arrow 2
  addRightArrow(slide, phaseStartX + (nodeW + arrowW) * 2, phaseY + (nodeH - arrowH) / 2, arrowW, arrowH, COLORS.TEXT_GREY);

  // Phase 3
  addFlowNode(slide, phaseStartX + (nodeW + arrowW) * 2, phaseY, nodeW, nodeH, "2026 Harness Engineering", {
    borderColor: COLORS.GREEN,
    fillColor: COLORS.CARD_BG,
    textColor: COLORS.TEXT_WHITE,
    fontSize: 10,
  });

  // Sub-labels below each phase
  const subLabels = [
    { text: "一问一答", color: COLORS.YELLOW },
    { text: "给上下文帮做事", color: COLORS.ACCENT_BLUE },
    { text: "它自己跑，你约束它", color: COLORS.GREEN },
  ];

  subLabels.forEach((label, i) => {
    addTextBlock(slide,
      phaseStartX + i * (nodeW + arrowW), phaseY + nodeH + 0.05,
      nodeW, 0.3,
      label.text, {
        fontSize: 9, fontFace: FONTS.CN, color: label.color,
        align: "center", valign: "top",
      }
    );
  });

  // ── Bottom small text ──
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.75, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.3,
    "三个阶段是嵌套关系，不是替代关系", {
      fontSize: 10, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
      align: "center", valign: "middle",
    }
  );

  addPageNumber(slide, 30);
}

module.exports = { createSlide };
