/**
 * Slide 24 — P24 SDD Four-Phase Workflow
 * "SDD 四阶段工作流"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addFlowNode, addRightArrow,
  addCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "SDD 四阶段工作流");

  // 4 horizontal flow nodes with subtitles
  const phases = [
    { emoji: "\uD83D\uDCDD", name: "Specify", sub: "\u5B9A\u4E49", desc: "\u5199\u6E05\u695A\u505A\u4EC0\u4E48\u548C\u4E3A\u4EC0\u4E48" },
    { emoji: "\uD83C\uDFD7\uFE0F", name: "Plan", sub: "\u8BA1\u5212", desc: "\u786E\u5B9A\u6280\u672F\u67B6\u6784\u548C\u5B9E\u73B0\u8DEF\u5F84" },
    { emoji: "\u2702\uFE0F", name: "Task", sub: "\u4EFB\u52A1", desc: "\u62C6\u89E3\u4E3A\u53EF\u6267\u884C\u7684\u539F\u5B50\u4EFB\u52A1" },
    { emoji: "\uD83E\uDD16", name: "Implement", sub: "\u5B9E\u73B0", desc: "AI\u6309\u56FE\u7EB8\u5E72\u6D3B\uFF0C\u4EBA\u5BA1\u6838\u9A8C\u8BC1" },
  ];

  const nodeW = 1.5;
  const nodeH = 0.65;
  const arrowW = 0.3;
  const arrowH = 0.25;
  const totalW = 4 * nodeW + 3 * arrowW;
  const startX = 0.7;
  const nodeY = 1.05;

  phases.forEach((phase, i) => {
    const x = startX + i * (nodeW + arrowW);

    // Flow node box
    slide.addShape("rect", {
      x, y: nodeY, w: nodeW, h: nodeH,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.ACCENT_BLUE, width: 1.5 },
      rectRadius: 0.03,
    });
    slide.addText(phase.emoji + " " + phase.name, {
      x, y: nodeY, w: nodeW, h: 0.35,
      fontSize: 13, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });
    slide.addText(phase.sub, {
      x, y: nodeY + 0.3, w: nodeW, h: 0.35,
      fontSize: 10, fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY,
      align: "center", valign: "top",
      margin: 0,
    });

    // Description below the node
    addTextBlock(slide, x, nodeY + nodeH + 0.08, nodeW, 0.55,
      phase.desc, {
        fontSize: 10, fontFace: FONTS.CN, color: COLORS.TEXT_GREY,
        align: "center", valign: "top",
      });

    // Right arrow between nodes
    if (i < phases.length - 1) {
      addRightArrow(slide,
        x + nodeW + 0.02,
        nodeY + nodeH / 2 - arrowH / 2,
        arrowW - 0.04,
        arrowH,
        COLORS.ACCENT_BLUE
      );
    }
  });

  // Right side: 3 benefit cards (vertically stacked)
  const benefitX = 7.85;
  const benefitW = 1.75;
  const benefitH = 0.85;
  const benefitGap = 0.15;
  const benefitStartY = 1.0;

  const benefits = [
    "\uD83D\uDD52 \u53EF\u9884\u6D4B\u6027\n\u52A8\u624B\u524D\u5C31\u77E5\u9053\u6539\u54EA\u4E9B\u6587\u4EF6\u3001\u600E\u4E48\u6539",
    "\u2705 \u9AD8\u8D28\u91CF\nSpec\u5F3A\u5236\u5305\u542B\u6D4B\u8BD5\u6807\u51C6 \u2192 TDD\u57FA\u56E0",
    "\uD83D\uDCD6 \u6613\u7EF4\u62A4\n\u7B54\u6848\u5728Spec\u91CC\uFF0C\u4E0D\u5728\u4EE3\u7801\u5806\u91CC",
  ];

  benefits.forEach((text, i) => {
    addCard(slide, benefitX, benefitStartY + i * (benefitH + benefitGap),
      benefitW, benefitH, text, [], {
        accentColor: COLORS.GREEN,
        titleColor: COLORS.GREEN,
        titleSize: 10,
        showAccent: true,
      });
  });

  // Bottom quote — centered, bold blue
  addTextBlock(slide, 0.7, 4.3, 8.6, 0.6,
    "\u4ECE'\u7801\u519C'\u53D8\u6210'\u7CFB\u7EDF\u67B6\u6784\u5E08'\u2014\u2014\u4F60\u753B\u56FE\u7EB8\uFF0CAI \u76D6\u697C", {
      fontSize: 20, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE,
      bold: true, align: "center", valign: "middle",
    });

  addPageNumber(slide, 24);
}

module.exports = { createSlide };
