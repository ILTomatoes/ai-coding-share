// slide-47.js — P44 Beginner Advice: 立即可用：新手入门三步
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addPageNumber } = require("./helpers");

const slideConfig = {
  type: 'content',
  index: 47,
  title: '立即可用：新手入门三步'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  addSlideTitle(slide, "立即可用：新手入门三步");

  // Three step cards horizontal
  const stepY = 1.1;
  const stepW = 2.8;
  const stepH = 3.8;
  const stepGap = 0.2;
  const startX = 0.7;

  const steps = [
    {
      num: "1",
      title: "从一个小模块开始",
      accent: COLORS.ACCENT_BLUE,
      content: [
        { text: "不要一上来就让AI改整个项目\n", options: { fontSize: 11, color: COLORS.TEXT_WHITE, breakLine: true } },
        { text: "选一个简单、边界清晰的模块\n", options: { fontSize: 11, color: COLORS.TEXT_GREY, breakLine: true } },
        { text: "比如：一个CRUD接口、一个工具类", options: { fontSize: 11, color: COLORS.TEXT_GREY } },
      ],
    },
    {
      num: "2",
      title: "写好第一个 CLAUDE.md",
      accent: COLORS.GREEN,
      content: null, // special: mini template
    },
    {
      num: "3",
      title: "养成 设计→AI实现→验证 的习惯",
      accent: COLORS.YELLOW,
      content: [
        { text: "先想清楚要什么，再让AI干活\n", options: { fontSize: 11, color: COLORS.TEXT_WHITE, breakLine: true } },
        { text: "AI输出后必须验证，不要盲信\n", options: { fontSize: 11, color: COLORS.TEXT_GREY, breakLine: true } },
        { text: "形成闭环：设计→实现→验证→调整", options: { fontSize: 11, color: COLORS.TEXT_GREY } },
      ],
    },
  ];

  steps.forEach((step, i) => {
    const cx = startX + i * (stepW + stepGap);

    // Card background
    slide.addShape("rect", {
      x: cx, y: stepY, w: stepW, h: stepH,
      fill: { color: COLORS.CARD_BG },
      line: { color: COLORS.BORDER, width: 0.75 },
      rectRadius: 0.03,
    });

    // Accent bar at top
    slide.addShape("rect", {
      x: cx, y: stepY, w: stepW, h: 0.05,
      fill: { color: step.accent },
    });

    // Step number circle
    const circleSize = 0.4;
    slide.addShape("oval", {
      x: cx + (stepW - circleSize) / 2, y: stepY + 0.2, w: circleSize, h: circleSize,
      fill: { color: step.accent },
    });
    slide.addText(step.num, {
      x: cx + (stepW - circleSize) / 2, y: stepY + 0.2, w: circleSize, h: circleSize,
      fontSize: 18, fontFace: FONTS.EN,
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Step title
    slide.addText(step.title, {
      x: cx + 0.12, y: stepY + 0.7, w: stepW - 0.24, h: 0.45,
      fontSize: 14, fontFace: FONTS.CN,
      color: COLORS.TEXT_WHITE, bold: true,
      align: "center", valign: "middle",
      margin: 0,
    });

    // Step content — special for step 2 (mini template)
    if (i === 1) {
      // Mini CLAUDE.md template
      slide.addShape("rect", {
        x: cx + 0.12, y: stepY + 1.25, w: stepW - 0.24, h: 2.4,
        fill: { color: "0D1117" },
        line: { color: COLORS.GREEN, width: 0.75 },
        rectRadius: 0.02,
      });

      const templateLines = [
        { text: "# CLAUDE.md\n", options: { fontSize: 10, bold: true, color: COLORS.GREEN, breakLine: true, fontFace: FONTS.CODE } },
        { text: "## 技术栈\n", options: { fontSize: 10, bold: true, color: COLORS.ACCENT_BLUE, breakLine: true, fontFace: FONTS.CODE } },
        { text: "Java17 + SpringBoot2.7\n+ MyBatisPlus + PostgreSQL\n\n", options: { fontSize: 9, color: COLORS.TEXT_WHITE, breakLine: true, fontFace: FONTS.CODE } },
        { text: "## 约定\n", options: { fontSize: 10, bold: true, color: COLORS.ACCENT_BLUE, breakLine: true, fontFace: FONTS.CODE } },
        { text: "分页: TypedSearchParam\n+ PageResult\nAPI返回: Result<T>包装", options: { fontSize: 9, color: COLORS.TEXT_WHITE, fontFace: FONTS.CODE } },
      ];

      slide.addText(templateLines, {
        x: cx + 0.18, y: stepY + 1.35, w: stepW - 0.36, h: 2.2,
        valign: "top",
        margin: 0,
      });
    } else {
      // Normal content
      slide.addText(step.content, {
        x: cx + 0.12, y: stepY + 1.25, w: stepW - 0.24, h: 2.4,
        fontFace: FONTS.CN,
        valign: "top",
        margin: 0,
      });
    }
  });

  // Page number badge
  addPageNumber(slide, 47);

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7",
    accent: "E3B341", light: "161B22", bg: "0D1117",
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-47-preview.pptx" });
}

module.exports = { createSlide, slideConfig };