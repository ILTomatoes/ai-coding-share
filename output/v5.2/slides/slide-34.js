// slide-34.js — P33 Phase 1-2 with Error→Constraint Examples
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addCard, addTextBlock, addWarningBox } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 34,
  title: 'Phase 1-2：混乱与膨胀'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Phase 1-2：混乱与膨胀");

  // Two side-by-side cards
  const cardY = 0.95;
  const cardW = 4.15;
  const cardH = 2.35;
  const gap = 0.3;

  // Left card — Phase 1
  addCard(slide, LAYOUT.MARGIN_L, cardY, cardW, cardH,
    "Phase 1 — 什么都往里放",
    [
      "5487行 20文件",
      "\u274C Token消耗大 关键规则被淹没",
    ],
    { accentColor: COLORS.YELLOW, titleColor: COLORS.YELLOW }
  );

  // Three sub-cards inside Phase 1 (error→constraint conversion)
  const subY = cardY + 0.85;
  const subW = cardW - 0.24;
  const subH = 0.4;
  const subGap = 0.05;

  const errorConstraints = [
    { error: "V2.2.14\u2192V2.2.13", constraint: "涉及版本号先查已有文件" },
    { error: "修改已冻结脚本", constraint: "已冻结脚本严禁修改" },
    { error: "权限过滤偏差", constraint: "用户级权限判断交给前端" },
  ];

  errorConstraints.forEach((ec, i) => {
    const sy = subY + i * (subH + subGap);
    const sx = LAYOUT.MARGIN_L + 0.12;
    slide.addShape("rect", {
      x: sx, y: sy, w: subW, h: subH,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.ACCENT_BLUE, width: 0.75 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: ec.error, options: { fontSize: 9, color: COLORS.RED, bold: true } },
      { text: " \u2192约束: ", options: { fontSize: 9, color: COLORS.TEXT_GREY } },
      { text: ec.constraint, options: { fontSize: 9, color: COLORS.ACCENT_BLUE, bold: true } },
    ], {
      x: sx + 0.08, y: sy, w: subW - 0.16, h: subH,
      fontFace: FONTS.CN, align: "left", valign: "middle", margin: 0,
    });
  });

  // Right card — Phase 2
  addCard(slide, LAYOUT.MARGIN_L + cardW + gap, cardY, cardW, cardH,
    "Phase 2 — 踩坑就加越加越多",
    [
      "~6000+行 24文件",
      "\u274C Token爆炸",
      "每犯一个错就加一条规则",
      "规则之间相互矛盾",
    ],
    { accentColor: COLORS.RED, titleColor: COLORS.RED }
  );

  // Bottom red warning
  addWarningBox(slide, LAYOUT.MARGIN_L, 3.5, 8.6, 0.55,
    "恶性循环   犯错 \u2192 加规则 \u2192 再犯错 \u2192 再加规则 \u2026\u2026",
    { borderColor: COLORS.RED, textColor: COLORS.RED }
  );

  // Page badge
  addPageNumber(slide, 34);

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
  pres.writeFile({ fileName: "slide-34-preview.pptx" });
}

module.exports = { createSlide, slideConfig };