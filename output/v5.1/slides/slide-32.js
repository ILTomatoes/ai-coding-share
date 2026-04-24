/**
 * Slide 32 — P32 Three Practice Pillars
 * Harness 的三大实践支柱
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "Harness 的三大实践支柱");

  // ── Three cards in a row ──
  const cardW = 2.75;
  const cardH = 3.6;
  const cardY = 1.1;
  const gap = 0.25;
  const totalW = cardW * 3 + gap * 2;
  const startX = (LAYOUT.W - totalW) / 2;

  // Card 1: Context Engineering (BLUE accent)
  addCard(slide, startX, cardY, cardW, cardH,
    "上下文工程", [
      "给 AI 正确的信息",
      "",
      "三层体现：",
      "  项目级（CLAUDE.md、rules/ = 员工手册）",
      "  任务级（Plan、Spec = 任务说明书）",
      "  会话级（对话约束 = 日常指导）",
    ], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.ACCENT_BLUE,
      titleSize: 13,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  // Card 2: Architecture Constraints (GREEN accent)
  addCard(slide, startX + cardW + gap, cardY, cardW, cardH,
    "架构约束", [
      "不仅口头要求，",
      "还要机械地强制执行",
      "",
      "Lint 规则",
      "CI 拦截",
    ], {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.GREEN,
      titleSize: 13,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  // Card 3: Entropy Management (YELLOW accent)
  addCard(slide, startX + (cardW + gap) * 2, cardY, cardW, cardH,
    "熵管理", [
      "防止混乱累积",
      "",
      "清理僵尸代码",
      "修复过期文档",
      "精简规则",
    ], {
      accentColor: COLORS.YELLOW,
      titleColor: COLORS.YELLOW,
      titleSize: 13,
      descSize: 10,
      descColor: COLORS.TEXT_WHITE,
    }
  );

  addPageNumber(slide, 32);
}

module.exports = { createSlide };
