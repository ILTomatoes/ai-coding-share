/**
 * Slide 47 — 进阶：搭建项目级 Harness (Quick Start for Advanced)
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addCard,
} = require("./helpers");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "进阶：搭建项目级 Harness");

  // Three numbered cards
  const cardW = 2.6;
  const cardH = 2.0;
  const cardY = 1.15;
  const gap = 0.3;
  const startX = (LAYOUT.W - 3 * cardW - 2 * gap) / 2;

  const cards = [
    {
      title: "1. 搭建 Harness 分层结构",
      lines: [
        "CLAUDE.md（导航，20-30行）",
        "rules/ARCHITECTURE.md（架构约束）",
        "docs/（详细规范，按需引用）",
      ],
    },
    {
      title: "2. 尝试 Worktree 并行开发",
      lines: [
        "aip-portal 用了24个worktree",
        "多任务互不干扰",
        "每个 worktree 独立上下文",
      ],
    },
    {
      title: "3. 建立复盘习惯",
      lines: [
        "踩坑 → 补规范 → 定期精简",
        "形成正向循环",
        "团队共享经验沉淀",
      ],
    },
  ];

  cards.forEach((card, i) => {
    addCard(slide, startX + i * (cardW + gap), cardY, cardW, cardH, card.title, card.lines, {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.ACCENT_BLUE,
      titleSize: 12,
      descSize: 10,
      descColor: COLORS.TEXT_GREY,
    });
  });

  // Bottom note
  slide.addText("从个人习惯到团队规范，Harness 是可复制的 AI 协作基础设施", {
    x: LAYOUT.MARGIN_L, y: 4.5, w: LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, h: 0.4,
    fontSize: 11, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY, align: "center",
    margin: 0,
  });

  addPageNumber(slide, 47);
}

module.exports = { createSlide };
