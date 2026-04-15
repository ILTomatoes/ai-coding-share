// slide-44.js — P43 Mode Matrix: 协作模式选择矩阵
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 44,
  title: '技巧三：协作模式选择矩阵'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "技巧三：协作模式选择矩阵");

  // ── Table: 5 data rows + header ──
  const rows = [
    ["场景类型", "推荐模式", "说明"],
    ["明确小任务", "直接对话", "给清楚需求，AI直接做"],
    ["复杂功能开发", "Plan模式", "先让AI规划，确认后执行"],
    ["多任务并行", "Worktree+Agent Team", "隔离开发，互不干扰"],
    ["新领域探索", "调研先行", "先让AI帮你建认知"],
    ["代码评审", "只读模式", "AI读代码，人做决策"],
  ];

  const tableOpts = {
    x: 0.7, y: 1.05, w: 8.6,
    fontSize: 13,
    fontFace: FONTS.CN,
    border: { type: "solid", pt: 0.75, color: COLORS.BORDER },
    colW: [2.4, 3.0, 3.2],
    rowH: [0.45, 0.55, 0.55, 0.55, 0.55, 0.55],
    autoPage: false,
  };

  // Build table cell options
  const tableCells = rows.map((row, rIdx) => {
    return row.map((cell, cIdx) => {
      const isHeader = rIdx === 0;
      const opts = {
        text: cell,
        options: {
          fontSize: isHeader ? 13 : 12,
          fontFace: FONTS.CN,
          bold: isHeader,
          color: isHeader ? COLORS.TEXT_WHITE : COLORS.TEXT_WHITE,
          align: isHeader ? "center" : (cIdx === 0 ? "center" : "left"),
          valign: "middle",
          fill: {
            color: isHeader ? COLORS.TABLE_HDR : (rIdx % 2 === 1 ? COLORS.DARK_ROW1 : COLORS.DARK_ROW2),
          },
          border: { type: "solid", pt: 0.75, color: COLORS.BORDER },
        },
      };

      // Highlight "推荐模式" column with blue
      if (!isHeader && cIdx === 1) {
        opts.options.color = COLORS.ACCENT_BLUE;
        opts.options.bold = true;
      }

      return opts;
    });
  });

  slide.addTable(tableCells, tableOpts);

  // Decorative accent dots for each row
  const accentColors = [COLORS.GREEN, COLORS.ACCENT_BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.ACCENT_BLUE];
  const dotStartY = 1.05 + 0.45; // skip header
  accentColors.forEach((color, i) => {
    slide.addShape("oval", {
      x: 0.55, y: dotStartY + i * 0.55 + 0.17, w: 0.18, h: 0.18,
      fill: { color: color },
    });
  });

  // Page badge
  addPageNumber(slide, 44);

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
  pres.writeFile({ fileName: "slide-44-preview.pptx" });
}

module.exports = { createSlide, slideConfig };