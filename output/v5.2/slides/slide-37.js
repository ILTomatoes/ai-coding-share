// slide-37.js — P36 Key Experiences + Good/Bad Constraints
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addPageNumber, addCard, addTextBlock } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 37,
  title: 'Rules 演化的关键经验'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "Rules 演化的关键经验");

  // ── Left side: Three numbered text items ──
  const leftX = LAYOUT.MARGIN_L;
  const leftW = 4.2;
  const itemH = 0.55;
  const itemGap = 0.1;

  const experiences = [
    { num: "1", text: "rules/是token预算管理不是wiki \u2014 每一行要有价值", color: COLORS.ACCENT_BLUE },
    { num: "2", text: "规范不是越多越好越精炼越好 \u2014 少即是多", color: COLORS.YELLOW },
    { num: "3", text: "每次踩坑是完善规范的机会 \u2014 复盘驱动改进", color: COLORS.GREEN },
  ];

  experiences.forEach((exp, i) => {
    const ey = 1.0 + i * (itemH + itemGap);
    slide.addShape("rect", {
      x: leftX, y: ey, w: leftW, h: itemH,
      fill: { color: COLORS.CARD_BG },
      line: { color: exp.color, width: 0.75 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: exp.num + ". ", options: { fontSize: 18, bold: true, color: exp.color } },
      { text: exp.text, options: { fontSize: 11, color: COLORS.TEXT_WHITE } },
    ], {
      x: leftX + 0.12, y: ey, w: leftW - 0.24, h: itemH,
      fontFace: FONTS.CN, align: "left", valign: "middle", margin: 0,
    });
  });

  // ── Right side: Good/Bad constraints comparison ──
  const rightX = leftX + leftW + 0.3;
  const rightW = 4.1;
  const compY = 1.0;
  const compH = 1.8;

  // Bad constraints card (red border)
  addCard(slide, rightX, compY, rightW, compH,
    "Bad Constraints",
    [
      "\"写高质量代码\" \u2014 AI看到和没看到一样",
      "\"注意异常处理\" \u2014 模糊不可操作",
      "\"保持代码整洁\" \u2014 无法指导行为",
    ],
    { accentColor: COLORS.RED, titleColor: COLORS.RED, descColor: COLORS.RED }
  );

  // Good constraints card (green border)
  addCard(slide, rightX, compY + compH + 0.1, rightW, compH,
    "Good Constraints",
    [
      "\"@RequiredArgsConstructor不用@Autowired\" \u2014 具体可验证",
      "\"HTTP错误格式{code,message,timestamp}\" \u2014 有模板",
      "\"已冻结脚本严禁修改所有变更只走新建补丁\" \u2014 有明确来源",
    ],
    { accentColor: COLORS.GREEN, titleColor: COLORS.GREEN, descColor: COLORS.GREEN }
  );

  // ── Blue formula text ──
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L, y: 4.1, w: 8.6, h: 0.45,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1 },
    rectRadius: 0.04,
  });
  slide.addText("错误现象 \u2192 根因分析 \u2192 期望行为 \u2192 最小约束文本", {
    x: LAYOUT.MARGIN_L + 0.15, y: 4.1, w: 8.3, h: 0.45,
    fontSize: 13, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 37);

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
  pres.writeFile({ fileName: "slide-37-preview.pptx" });
}

module.exports = { createSlide, slideConfig };