/**
 * Slide 41 — Claude Code: AI 编程的终端工具
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addCard } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "Claude Code — AI 编程的终端工具");

  // 2x2 grid of feature cards
  const cardW = 4.0;
  const cardH = 1.6;
  const gapX = 0.5;
  const gapY = 0.3;
  const startX = LAYOUT.MARGIN_L;
  const startY = 1.1;

  const cards = [
    {
      title: "🖥️ 终端零距离",
      desc: ["直接在终端工作，与项目代码零距离"],
    },
    {
      title: "🔄 全流程闭环",
      desc: ["支持读取、编辑、执行，全流程闭环"],
    },
    {
      title: "📋 自动加载上下文",
      desc: ["自动加载 CLAUDE.md 和 rules/，理解项目上下文"],
    },
    {
      title: "🚀 高级功能",
      desc: ["Plan模式 / Worktree并行 / Agent Team 协作等"],
    },
  ];

  cards.forEach((card, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    addCard(slide, x, y, cardW, cardH, card.title, card.desc, {
      accentColor: COLORS.ACCENT_BLUE,
      titleSize: 14,
      descSize: 11,
    });
  });

  addPageNumber(slide, 41);
}

module.exports = { createSlide };
