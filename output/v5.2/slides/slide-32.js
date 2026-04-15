// slide-32.js — P31 Portal Project
const { COLORS, FONTS, LAYOUT } = require('./theme');
const { addSlideTitle, addSubtitle, addPageNumber, addCard, addDataCard, addTextBlock } = require('./helpers');

const slideConfig = {
  type: 'content',
  index: 32,
  title: '案例：aip-portal 智能体门户'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "案例：aip-portal 智能体门户");

  // Project description card
  addCard(slide, LAYOUT.MARGIN_L, 1.0, 8.6, 0.65,
    "企业级 Agent 管理平台",
    [
      "统一管理数字员工、Agent注册、技能编排、消息通道、运营监控",
    ],
    { accentColor: COLORS.ACCENT_BLUE, titleColor: COLORS.ACCENT_BLUE }
  );

  // Tech stack text
  slide.addText("Spring Boot 2.7.18 + MyBatis Plus + PostgreSQL + Java 17  |  Maven多模块 + Feign + 多数据源", {
    x: LAYOUT.MARGIN_L, y: 1.85, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.EN,
    color: COLORS.CODE_GREEN, align: "center", valign: "middle", margin: 0,
  });

  // Five data cards in a row
  const dataY = 2.4;
  const dataW = 1.6;
  const dataH = 1.2;
  const dataGap = 0.15;

  const dataItems = [
    { number: "259", label: "次提交", opts: { numColor: COLORS.ACCENT_BLUE } },
    { number: "72", label: "天开发", opts: { numColor: COLORS.GREEN } },
    { number: "281", label: "个Java文件", opts: { numColor: COLORS.YELLOW } },
    { number: "57", label: "个文档", opts: { numColor: COLORS.ACCENT_BLUE } },
    { number: "4", label: "人协作", opts: { numColor: COLORS.GREEN } },
  ];

  dataItems.forEach((item, i) => {
    const dx = LAYOUT.MARGIN_L + i * (dataW + dataGap);
    addDataCard(slide, dx, dataY, dataW, dataH, item.number, item.label, item.opts);
  });

  // Yellow bottom text
  slide.addShape("rect", {
    x: LAYOUT.MARGIN_L, y: 3.85, w: 8.6, h: 0.4,
    fill: { color: COLORS.WARN_BG },
    line: { color: COLORS.YELLOW, width: 1 },
    rectRadius: 0.04,
  });
  slide.addText("这个项目经历了 Harness 从无到有的完整演化", {
    x: LAYOUT.MARGIN_L, y: 3.85, w: 8.6, h: 0.4,
    fontSize: 14, fontFace: FONTS.CN,
    color: COLORS.YELLOW, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Page badge
  addPageNumber(slide, 32);

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
  pres.writeFile({ fileName: "slide-32-preview.pptx" });
}

module.exports = { createSlide, slideConfig };