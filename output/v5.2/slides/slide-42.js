// slide-42.js — P41 Tip1: 小步快跑，持续验证
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addFlowNode, addRightArrow, addDownArrow, addTextBlock } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 42,
  title: '技巧一：小步快跑，持续验证'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "技巧一：小步快跑，持续验证");

  // ── Cycle: 设计 → 实现 → 测试 (3 connected flow nodes) ──
  const cycleY = 1.1;
  const nodeW = 1.5;
  const nodeH = 0.55;
  const nodeGapX = 0.6;
  const nodes = [
    { label: "设计", color: COLORS.ACCENT_BLUE },
    { label: "实现", color: COLORS.GREEN },
    { label: "测试", color: COLORS.YELLOW },
  ];

  // Calculate layout: 3 nodes with arrows between them
  const totalNodesW = nodes.length * nodeW + (nodes.length - 1) * nodeGapX;
  const startX = (LAYOUT.W - totalNodesW) / 2;

  nodes.forEach((n, i) => {
    const nx = startX + i * (nodeW + nodeGapX);
    addFlowNode(slide, nx, cycleY, nodeW, nodeH, n.label, {
      borderColor: n.color,
      textColor: n.color,
      fontSize: 14,
    });

    // Arrow between nodes
    if (i < nodes.length - 1) {
      addRightArrow(slide, nx + nodeW + 0.05, cycleY + 0.15, nodeGapX - 0.1, 0.25, COLORS.TEXT_GREY);
    }
  });

  // Curved arrow from 测试 back to 设计 (down arrow then left arrow)
  const lastNodeX = startX + 2 * (nodeW + nodeGapX);
  const firstNodeX = startX;

  // Down arrow from last node
  addDownArrow(slide, lastNodeX + nodeW / 2 - 0.12, cycleY + nodeH + 0.05, 0.25, 0.35, COLORS.TEXT_GREY);
  // Horizontal line back (using a thin rect)
  slide.addShape("rect", {
    x: firstNodeX + nodeW / 2 - 0.12, y: cycleY + nodeH + 0.4, w: lastNodeX + nodeW / 2 - firstNodeX - nodeW / 2 + 0.24, h: 0.04,
    fill: { color: COLORS.TEXT_GREY },
  });
  // Up arrow back to first node
  slide.addShape("upArrow", {
    x: firstNodeX + nodeW / 2 - 0.12, y: cycleY + nodeH + 0.1, w: 0.25, h: 0.35,
    fill: { color: COLORS.TEXT_GREY },
    line: { width: 0 },
  });

  // ── Three key points ──
  const pointsY = 2.3;
  const points = [
    { text: "AI生成快，错误也快，贪多更慢", color: COLORS.RED },
    { text: "每完成模块就验证，不让错误堆积", color: COLORS.GREEN },
    { text: "遇到问题再磨刀，不提前过度设计", color: COLORS.YELLOW },
  ];

  points.forEach((pt, i) => {
    const py = pointsY + i * 0.45;
    // Bullet dot
    slide.addShape("oval", {
      x: 0.85, y: py + 0.12, w: 0.12, h: 0.12,
      fill: { color: pt.color },
    });
    slide.addText(pt.text, {
      x: 1.05, y: py, w: 4.5, h: 0.38,
      fontSize: 14, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: false,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // ── Gray note box: aip-portal early mistake ──
  const noteY = 3.85;
  slide.addShape("rect", {
    x: 0.7, y: noteY, w: 8.6, h: 0.7,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });
  slide.addText([
    { text: "教训：", options: { color: COLORS.TEXT_GREY, bold: true, fontSize: 13 } },
    { text: "aip-portal早期一次做大模块导致批量返工", options: { color: COLORS.TEXT_GREY, fontSize: 13 } },
  ], {
    x: 0.85, y: noteY, w: 8.3, h: 0.7,
    fontFace: FONTS.CN, align: "left", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 42);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-42-preview.pptx" });
}

module.exports = { createSlide, slideConfig };