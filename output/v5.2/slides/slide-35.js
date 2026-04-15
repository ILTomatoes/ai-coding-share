// slide-35.js — P34 Phase 3-4: Cleanup & Refinement
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addCard, addTextBlock, addWarningBox } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 35,
  title: 'Phase 3-4：清理与精炼'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Phase 3-4：清理与精炼");

  // Two side-by-side cards
  const cardY = 0.95;
  const cardW = 4.15;
  const cardH = 1.8;
  const gap = 0.3;

  // Left card — Phase 3 (yellow border)
  addCard(slide, LAYOUT.MARGIN_L, cardY, cardW, cardH,
    "Phase 3 — 删掉2714行",
    [
      "意识到规范不是越多越好",
      "rules是token预算管理不是wiki",
      "文档移 docs/",
      "只保留AI每次必须看到的",
    ],
    { accentColor: COLORS.YELLOW, titleColor: COLORS.YELLOW }
  );

  // Right card — Phase 4 (green border)
  addCard(slide, LAYOUT.MARGIN_L + cardW + gap, cardY, cardW, cardH,
    "Phase 4 — 最终272行",
    [
      "压缩率 95%",
      "只保留AI必须知道的",
      "质量稳定 Token可控",
      "从5487\u2192272 精炼到极致",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN }
  );

  // Bottom timeline text
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L, y: 3.0, w: 8.6, h: 0.5,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1 },
    rectRadius: 0.04,
  });

  const timelineSteps = [
    { date: "04-01", event: "优化" },
    { date: "04-01", event: "精简" },
    { date: "04-02", event: "整理" },
    { date: "04-09", event: "规范移docs" },
  ];

  let timelineX = LAYOUT.MARGIN_L + 0.15;
  const stepW = 2.05;
  timelineSteps.forEach((step, i) => {
    slide.addText([
      { text: step.date + " ", options: { fontSize: 13, bold: true, color: COLORS.ACCENT_BLUE } },
      { text: step.event, options: { fontSize: 13, color: COLORS.TEXT_WHITE } },
    ], {
      x: timelineX, y: 3.0, w: stepW, h: 0.5,
      fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
    });
    timelineX += stepW + 0.08;
    if (i < timelineSteps.length - 1) {
      slide.addText("\u2192", {
        x: timelineX - 0.12, y: 3.0, w: 0.22, h: 0.5,
        fontSize: 13, fontFace: FONTS.EN,
        color: COLORS.TEXT_GREY, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  // Note: 仅9天完成重构
  slide.addText("仅9天完成重构", {
    x: LAYOUT.MARGIN_L, y: 3.55, w: 8.6, h: 0.3,
    fontSize: 13, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 35);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pptxgen = require("pptxgenjs");
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-35-preview.pptx" });
}

module.exports = { createSlide, slideConfig };