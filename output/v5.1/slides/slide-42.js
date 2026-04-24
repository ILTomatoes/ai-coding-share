/**
 * Slide 42 — cc-switch: Claude Code 配置切换工具
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addSlideTitle, addSubtitle, addPageNumber, addCard } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // Title
  addSlideTitle(slide, "cc-switch — Claude Code 配置切换工具");

  // Subtitle
  addSubtitle(slide, "快速切换不同的 Claude Code 配置（模型选择、权限设置等）");

  // Three scenario cards vertically
  const cardW = LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R;
  const cardH = 1.1;
  const gapY = 0.25;
  const startX = LAYOUT.MARGIN_L;
  const startY = 1.55;

  const scenarios = [
    {
      title: "📁 不同项目需要不同配置",
      desc: ["Java 项目 vs 前端项目，规范、依赖、工具链各不相同"],
      accentColor: COLORS.ACCENT_BLUE,
    },
    {
      title: "🧩 复杂任务用强模型，简单任务用快模型",
      desc: ["按任务难度动态切换，平衡质量与速度"],
      accentColor: COLORS.GREEN,
    },
    {
      title: "👥 团队成员共享配置",
      desc: ["统一团队规范，减少'在我机器上能跑'的问题"],
      accentColor: COLORS.YELLOW,
    },
  ];

  scenarios.forEach((item, i) => {
    const y = startY + i * (cardH + gapY);
    addCard(slide, startX, y, cardW, cardH, item.title, item.desc, {
      accentColor: item.accentColor,
      titleSize: 14,
      descSize: 11,
      descColor: COLORS.TEXT_GREY,
    });
  });

  addPageNumber(slide, 42);
}

module.exports = { createSlide };
