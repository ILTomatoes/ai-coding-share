/**
 * Slide 7 — P7 Key Results
 * 关键成果：大数据卡片 + 注意事项 + 成功清单
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addDataCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "关键成果");

  // ── Two big data cards ──
  const cardY = 1.2;
  const cardW = 4.1;
  const cardH = 1.3;

  addDataCard(slide, LAYOUT.MARGIN_L, cardY, cardW, cardH,
    "5天 完成 ~80个 API 端点", "29次提交，3月4-11日",
    { numColor: COLORS.ACCENT_BLUE, numSize: 22, borderColor: COLORS.ACCENT_BLUE }
  );

  addDataCard(slide, LAYOUT.MARGIN_L + cardW + 0.4, cardY, cardW, cardH,
    "效率提升 2-4倍", "对比传统开发估计值",
    { numColor: COLORS.ACCENT_BLUE, numSize: 22, borderColor: COLORS.ACCENT_BLUE }
  );

  // ── Middle note ──
  addTextBlock(slide, LAYOUT.MARGIN_L, 2.85,
    LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.45,
    "13次 fix 提交（占45%） — AI代码有小错漏，但人在评审中及时捕获",
    { fontSize: 12, color: COLORS.YELLOW }
  );

  // ── Bottom 3 success items ──
  const successItems = [
    "\u2705 16 个数据库迁移版本，表结构清晰",
    "\u2705 8 个核心实体，边界明确",
    "\u2705 评审后更新 CLAUDE.md，持续改进",
  ];
  const successY = 3.5;
  successItems.forEach((text, i) => {
    addTextBlock(slide, LAYOUT.MARGIN_L, successY + i * 0.42,
      LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.38,
      text, { fontSize: 13, color: COLORS.GREEN }
    );
  });

  addPageNumber(slide, 7);
}

module.exports = { createSlide };
