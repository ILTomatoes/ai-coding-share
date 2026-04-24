/**
 * Slide 28 — P28 Three Review Rounds
 * 三轮审阅，发现了什么？
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addStyledTable, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "三轮审阅，发现了什么？");

  // Styled table
  const headers = ["审阅维度", "发现的问题", "修正方案"];
  const rows = [
    ["架构定位", "AMG被设计成独立服务", "重新定位为数字员工门户消息层"],
    ["技术栈", "误用 Spring Boot 3.x API", "修正为 2.7.17，与现有网关一致"],
    ["数据模型", "三层关系表述不清", "明确 de_catalog → digital_employee → ops_channel"],
  ];

  addStyledTable(slide, 0.7, 1.2, 8.6, headers, rows, {
    colW: [1.8, 3.0, 3.8],
    rowH: 0.55,
  });

  // Core message (16pt, blue, bold, centered)
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.4, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.5,
    "审阅不是走形式，每次审阅都在防止'AI 高效跑偏'", {
      fontSize: 16, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    }
  );

  // Bottom sub-message (12pt, YELLOW, centered)
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.95, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.4,
    "回扣 Part 2 — 这就是系统化地防止'AI PUA 你'", {
      fontSize: 12, fontFace: FONTS.CN, color: COLORS.YELLOW, bold: false,
      align: "center", valign: "middle",
    }
  );

  addPageNumber(slide, 28);
}

module.exports = { createSlide };
