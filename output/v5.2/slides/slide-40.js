// slide-40.js — P40 cc-switch: Claude Code 配置切换
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber, addCard } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 40,
  title: 'cc-switch — Claude Code 配置切换'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "cc-switch — Claude Code 配置切换");

  // Definition banner
  slide.addShape("rect", {
    x: 0.7, y: 1.05, w: 8.6, h: 0.55,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.ACCENT_BLUE, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText([
    { text: "cc-switch", options: { color: COLORS.ACCENT_BLUE, bold: true, fontSize: 16 } },
    { text: " = 一键切换 Claude Code 的 ", options: { color: COLORS.TEXT_WHITE, fontSize: 15 } },
    { text: "模型 / 权限 / 配置", options: { color: COLORS.YELLOW, bold: true, fontSize: 15 } },
  ], {
    x: 0.7, y: 1.05, w: 8.6, h: 0.55,
    fontFace: FONTS.CN, align: "center", valign: "middle", margin: 0,
  });

  // Three scenario cards
  const scenarios = [
    {
      title: "不同项目需要不同配置",
      desc: ["Java项目需要编码规范约束", "前端项目侧重组件约定", "一键切换无需手动改配置"],
      accentColor: COLORS.ACCENT_BLUE,
    },
    {
      title: "复杂任务用强模型\n简单任务用快模型",
      desc: ["架构设计用最强模型", "日常修改用快模型省钱", "灵活匹配任务复杂度"],
      accentColor: COLORS.GREEN,
    },
    {
      title: "团队成员共享配置",
      desc: ["统一模型和权限策略", "新人无需自行配置", "团队规范一键生效"],
      accentColor: COLORS.YELLOW,
    },
  ];

  const cardStartX = 0.7;
  const cardW = 2.8;
  const cardGap = 0.15;
  const cardY = 1.95;
  const cardH = 2.5;

  scenarios.forEach((s, i) => {
    const cx = cardStartX + i * (cardW + cardGap);
    addCard(slide, cx, cardY, cardW, cardH, s.title, s.desc, {
      accentColor: s.accentColor,
      titleSize: 14,
      descSize: 11,
    });
  });

  // Page badge
  addPageNumber(slide, 40);

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
  pres.writeFile({ fileName: "slide-40-preview.pptx" });
}

module.exports = { createSlide, slideConfig };