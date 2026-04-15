// slide-48.js — P45 Advanced Advice: 进阶：搭建项目级 Harness
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 48,
  title: '进阶：搭建项目级 Harness'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "进阶：搭建项目级 Harness");

  // Three items as stacked cards
  const items = [
    {
      num: "1",
      title: "搭建 Harness 分层",
      desc: [
        { text: "CLAUDE.md", options: { bold: true, color: COLORS.ACCENT_BLUE, fontSize: 13 } },
        { text: "  20-30行核心导航", options: { color: COLORS.TEXT_GREY, fontSize: 12 } },
        { text: "  |  ", options: { color: COLORS.BORDER, fontSize: 12 } },
        { text: "rules/", options: { bold: true, color: COLORS.ACCENT_BLUE, fontSize: 13 } },
        { text: " 架构约束", options: { color: COLORS.TEXT_GREY, fontSize: 12 } },
        { text: "  |  ", options: { color: COLORS.BORDER, fontSize: 12 } },
        { text: "docs/", options: { bold: true, color: COLORS.ACCENT_BLUE, fontSize: 13 } },
        { text: " 详细规范按需", options: { color: COLORS.TEXT_GREY, fontSize: 12 } },
      ],
      accent: COLORS.ACCENT_BLUE,
    },
    {
      num: "2",
      title: "尝试 Worktree 并行",
      desc: [
        { text: "2-4 个 worktree 同时推进不同功能", options: { color: COLORS.TEXT_WHITE, fontSize: 13 } },
        { text: "\nAgent 在各自分支独立工作，互不干扰", options: { color: COLORS.TEXT_GREY, fontSize: 12 } },
      ],
      accent: COLORS.GREEN,
    },
    {
      num: "3",
      title: "建立复盘习惯",
      desc: [
        { text: "踩坑 → 补规范 → 定期精简", options: { color: COLORS.TEXT_WHITE, fontSize: 14, bold: true } },
        { text: "\n每次出问题后补一条 rule，每月清理冗余规则", options: { color: COLORS.TEXT_GREY, fontSize: 12 } },
      ],
      accent: COLORS.YELLOW,
    },
  ];

  const cardStartY = 1.1;
  const cardH = 1.25;
  const cardGap = 0.2;

  items.forEach((item, i) => {
    const cy = cardStartY + i * (cardH + cardGap);

    // Card background
    slide.addShape("rect", {
      x: 0.7, y: cy, w: 8.6, h: cardH,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.BORDER, width: 0.75 },
      rectRadius: 0.03,
    });

    // Left accent bar
    slide.addShape("rect", {
      x: 0.7, y: cy, w: 0.06, h: cardH,
      fill: { color: item.accent },
    });

    // Number circle
    const numSize = 0.35;
    slide.addShape("oval", {
      x: 0.95, y: cy + (cardH - numSize) / 2, w: numSize, h: numSize,
      fill: { color: item.accent },
    });
    slide.addText(item.num, {
      x: 0.95, y: cy + (cardH - numSize) / 2, w: numSize, h: numSize,
      fontSize: 14, fontFace: FONTS.EN,
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Title
    slide.addText(item.title, {
      x: 1.5, y: cy + 0.12, w: 7.5, h: 0.4,
      fontSize: 16, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: true,
      valign: "middle",
      margin: 0,
    });

    // Description
    slide.addText(item.desc, {
      x: 1.5, y: cy + 0.55, w: 7.5, h: 0.6,
      fontFace: FONTS.CN,
      valign: "top",
      margin: 0,
    });
  });

  // Page number badge
  addPageNumber(slide, 48);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7",
    accent: "E3B341", light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-48-preview.pptx" });
}

module.exports = { createSlide, slideConfig };