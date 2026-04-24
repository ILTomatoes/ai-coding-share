/**
 * Slide 39 — P39 Two Projects Comparison
 * 两种路径对比
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle,
  addPageNumber,
  addStyledTable,
  addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "两种路径对比");

  // Styled table
  const headers = ["维度", "aip-gateway（SDD驱动）", "aip-portal（Harness演化）"];
  const rows = [
    ["核心理念", "规范先行，代码自动", "从混乱中提炼秩序"],
    ["规范建设", "Day 1就建Spec（v1→v1.9）", "踩坑后逐步建立（Phase 1→4）"],
    ["混乱期", "基本没有", "经历了约2个月"],
    ["rules/", "集中在CLAUDE.md（237行）", "分层 rules/ + docs/（272行+838行）"],
    ["开发效率", "AMG核心模块 2天", "259次提交，72天"],
  ];

  const tableW = LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R;
  addStyledTable(slide, LAYOUT.MARGIN_L, 1.2, tableW, headers, rows, {
    colW: [tableW * 0.15, tableW * 0.425, tableW * 0.425],
    rowH: 0.45,
  });

  // Bottom insight
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.3, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.45,
    "有了方法论之后，新项目可以少走很多弯路", {
      fontSize: 14, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true, align: "center",
    });

  addPageNumber(slide, 39);
}

module.exports = { createSlide };
