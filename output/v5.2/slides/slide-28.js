// slide-28.js — P28 Review Findings: 三轮审阅，发现了什么？
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addTextBlock } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 28,
  title: '三轮审阅，发现了什么？'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "三轮审阅，发现了什么？");

  // ── Table: 3 data rows + header ──
  const tableX = 0.7;
  const colW = [1.6, 3.5, 3.5];
  const rowH = 0.65;
  const headerH = 0.5;
  const tableY = 1.1;

  // Header row
  slide.addShape("rect", {
    x: tableX, y: tableY, w: 8.6, h: headerH,
    fill: { color: COLORS.TABLE_HDR },
    line: { color: COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });
  const hdrCols = ["维度", "AI 原始设计（跑偏）", "审阅修正（纠偏）"];
  hdrCols.forEach((txt, ci) => {
    const cx = tableX + colW.slice(0, ci).reduce((a, b) => a + b, 0);
    const color = ci === 1 ? COLORS.RED : (ci === 2 ? COLORS.GREEN : COLORS.ACCENT_BLUE);
    slide.addText(txt, {
      x: cx + 0.08, y: tableY, w: colW[ci] - 0.16, h: headerH,
      fontSize: 13, fontFace: FONTS.CN,
      color: color, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Data rows
  const dataRows = [
    { dim: "架构定位", wrong: "AMG定位偏移被设计成独立服务", fix: "重新定位为数字员工门户消息层" },
    { dim: "技术栈", wrong: "误用Spring Boot 3.x API", fix: "修正为2.7.17与现有网关一致" },
    { dim: "数据模型", wrong: "三层关系模型表述不清", fix: "明确de_catalog→digital_employee→ops_channel" },
  ];

  dataRows.forEach((row, ri) => {
    const ry = tableY + headerH + ri * (rowH + 0.04);
    const bgColor = ri % 2 === 0 ? COLORS.DARK_ROW1 : COLORS.DARK_ROW2;

    slide.addShape("rect", {
      x: tableX, y: ry, w: 8.6, h: rowH,
      fill: { color: bgColor },
      line: { color: COLORS.BORDER, width: 0.5 },
      rectRadius: 0.03,
    });

    // Dimension column
    slide.addText(row.dim, {
      x: tableX + 0.08, y: ry, w: colW[0] - 0.16, h: rowH,
      fontSize: 13, fontFace: FONTS.CN,
      color: COLORS.YELLOW, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    // Wrong column
    slide.addText(row.wrong, {
      x: tableX + colW[0] + 0.08, y: ry, w: colW[1] - 0.16, h: rowH,
      fontSize: 12, fontFace: FONTS.CN,
      color: COLORS.RED,
      align: "center", valign: "middle", margin: 0,
    });
    // Fix column
    slide.addText(row.fix, {
      x: tableX + colW[0] + colW[1] + 0.08, y: ry, w: colW[2] - 0.16, h: rowH,
      fontSize: 12, fontFace: FONTS.CN,
      color: COLORS.GREEN,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Blue big insight banner
  const bannerY = tableY + headerH + 3 * (rowH + 0.04) + 0.2;
  slide.addShape("rect", {
    x: 0.7, y: bannerY, w: 8.6, h: 0.55,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1.5 },
    rectRadius: 0.06,
  });
  slide.addText("审阅不是走形式，每次审阅都在防止'AI高效跑偏'", {
    x: 0.7, y: bannerY, w: 8.6, h: 0.55,
    fontSize: 18, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Yellow callback banner
  const cbY = bannerY + 0.65;
  slide.addShape("rect", {
    x: 0.7, y: cbY, w: 8.6, h: 0.45,
    fill: { color: COLORS.WARN_BG },
    line: { color: COLORS.YELLOW, width: 1 },
    rectRadius: 0.06,
  });
  slide.addText("回扣Part2—这就是系统化地防止AI PUA你", {
    x: 0.7, y: cbY, w: 8.6, h: 0.45,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 28);

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
  pres.writeFile({ fileName: "slide-28-preview.pptx" });
}

module.exports = { createSlide, slideConfig };