/**
 * Slide 45 — 技巧三：协作模式选择矩阵
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addStyledTable,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "技巧三：协作模式选择矩阵");

  // Table
  const headers = ["场景", "推荐模式", "说明"];
  const rows = [
    ["明确的小任务", "直接对话", "给清楚需求，AI直接做"],
    ["复杂功能开发", "Plan 模式", "先让AI规划，确认后执行"],
    ["多任务并行", "Worktree + Agent Team", "隔离开发，互不干扰"],
    ["新领域探索", "调研先行", "先让AI帮你建认知"],
    ["代码评审", "只读模式", "AI读代码，人做决策"],
  ];

  const tableW = LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R;
  addStyledTable(slide, LAYOUT.MARGIN_L, 1.2, tableW, headers, rows, {
    colW: [2.5, 2.8, 3.3],
    rowH: 0.55,
  });

  addPageNumber(slide, 45);
}

module.exports = { createSlide };
