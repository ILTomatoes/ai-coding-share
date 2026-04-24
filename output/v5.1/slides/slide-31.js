/**
 * Slide 31 — P31 Guides + Sensors
 * Harness 的核心：前馈 + 反馈闭环
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addTextBlock, addWarningBox, addFlowNode, addRightArrow,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "Harness 的核心：前馈 + 反馈闭环");

  // ── LEFT card: Guides ──
  addCard(slide, 0.7, 1.1, 4.1, 1.75,
    "Guides（前馈控制）", [
      "AI 行动之前设好规则",
      "类比：高速公路护栏",
      "CLAUDE.md、编码规范",
      "架构约束",
      "权限分级",
    ], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.ACCENT_BLUE,
      titleSize: 13,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  // ── RIGHT card: Sensors ──
  addCard(slide, 5.2, 1.1, 4.1, 1.75,
    "Sensors（反馈控制）", [
      "AI 做完之后检测对不对",
      "自动化测试",
      "代码 lint",
      "CI 流水线",
    ], {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.GREEN,
      titleSize: 13,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  // ── Middle: Loop diagram (centered flow) ──
  const loopY = 3.15;
  const loopNodeW = 1.8;
  const loopNodeH = 0.38;
  const loopArrowW = 0.3;
  const loopArrowH = 0.2;
  const loopLabels = ["Guides", "AI行动", "Sensors", "反馈优化"];
  const loopColors = [COLORS.ACCENT_BLUE, COLORS.TEXT_WHITE, COLORS.GREEN, COLORS.YELLOW];
  const totalLoopW = loopLabels.length * loopNodeW + (loopLabels.length - 1) * loopArrowW;
  const loopStartX = (LAYOUT.W - totalLoopW) / 2;

  loopLabels.forEach((label, i) => {
    const nx = loopStartX + i * (loopNodeW + loopArrowW);
    addFlowNode(slide, nx, loopY, loopNodeW, loopNodeH, label, {
      borderColor: loopColors[i],
      fillColor: COLORS.CARD_BG,
      textColor: loopColors[i],
      fontSize: 10,
    });
    if (i < loopLabels.length - 1) {
      addRightArrow(slide,
        nx + loopNodeW,
        loopY + (loopNodeH - loopArrowH) / 2,
        loopArrowW, loopArrowH,
        COLORS.TEXT_GREY
      );
    }
  });

  // ── Yellow highlight box ──
  addWarningBox(slide, 0.7, 3.65, 8.6, 0.5,
    "每发现 Agent 犯一个错误，就设计方案让它永远不再犯", {
      fontSize: 11,
      borderColor: COLORS.YELLOW,
      textColor: COLORS.YELLOW,
    }
  );

  // ── Bottom core principle (20pt, blue, bold, centered) ──
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.55, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.5,
    "约束先行——规则靠自动化强制执行，不靠口头约定", {
      fontSize: 20, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    }
  );

  addPageNumber(slide, 31);
}

module.exports = { createSlide };
