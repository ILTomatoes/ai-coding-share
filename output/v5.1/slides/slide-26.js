/**
 * Slide 26 — P26 SDD Practice: PRD to Code
 * "SDD 实践：从 PRD 到代码的完整流程"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addFlowNode, addRightArrow, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "SDD 实践：从 PRD 到代码的完整流程");

  // 4 horizontal flow nodes
  const steps = [
    {
      title: "\uD83D\uDCDD 编写PRD",
      borderColor: COLORS.ACCENT_BLUE,
      desc: "产品需求文档\n明确业务目标与范围",
    },
    {
      title: "\uD83D\uDCCB 转化为Spec\n4796行",
      borderColor: COLORS.ACCENT_BLUE,
      desc: "结构化技术规范\n定义接口、逻辑、约束",
    },
    {
      title: "\uD83D\uDD0D 多轮审阅\nv1\u2192v1.9",
      borderColor: COLORS.GREEN,
      desc: "反复打磨细节\n确保规范完备准确",
    },
    {
      title: "\uD83E\uDD16 Agent Team\n编码",
      borderColor: COLORS.GREEN,
      desc: "AI按规范实现\n人工审核验证",
    },
  ];

  const nodeW = 2.0;
  const nodeH = 0.7;
  const arrowW = 0.3;
  const arrowH = 0.22;
  const totalW = 4 * nodeW + 3 * arrowW;
  const startX = (LAYOUT.W - totalW) / 2;
  const nodeY = 1.3;

  steps.forEach((step, i) => {
    const x = startX + i * (nodeW + arrowW);

    // Flow node
    slide.addShape("rect", {
      x, y: nodeY, w: nodeW, h: nodeH,
      fill: { color: COLORS.CARD_BG },
      line: { color: step.borderColor, width: 1.5 },
      rectRadius: 0.03,
    });
    slide.addText(step.title, {
      x, y: nodeY, w: nodeW, h: nodeH,
      fontSize: 12, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Description text below node
    addTextBlock(slide, x, nodeY + nodeH + 0.12, nodeW, 0.7,
      step.desc, {
        fontSize: 10, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
        align: "center", valign: "top",
      });

    // Right arrow between nodes
    if (i < steps.length - 1) {
      addRightArrow(slide,
        x + nodeW + 0.01,
        nodeY + nodeH / 2 - arrowH / 2,
        arrowW - 0.02,
        arrowH,
        COLORS.ACCENT_BLUE
      );
    }
  });

  // Bottom core message
  addTextBlock(slide, 0.7, 3.9, 8.6, 0.6,
    "规范先行 \u2192 审阅到位 \u2192 代码自动", {
      fontSize: 24, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE,
      bold: true, align: "center", valign: "middle",
    });

  addPageNumber(slide, 26);
}

module.exports = { createSlide };
