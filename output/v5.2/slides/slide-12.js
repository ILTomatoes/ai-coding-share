/**
 * Slide 12 — P12 More Lessons
 * "翻车现场（二）— 三个小案例"
 * Badge: 12
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard,
} = require("./helpers");

const slideConfig = { pageNum: 12 };

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "翻车现场（二）— 三个小案例");

  const cardW = 2.7;
  const gap = 0.3;
  const startX = 0.7;
  const cardY = 1.2;
  const cardH = 2.5;

  // Card 1: SQL版本号错误
  addCard(slide, startX, cardY, cardW, cardH, "SQL版本号错误", [
    "生成了V2.2.14而非V2.2.13",
    "没有查现有版本文件",
    "迁移执行失败",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  // Card 2: 修改已冻结脚本
  addCard(slide, startX + cardW + gap, cardY, cardW, cardH, "修改已冻结脚本", [
    "改了V2.2.13__init.sql",
    "部署环境摘要不一致",
    "复盘：已冻结脚本严禁修改",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  // Card 3: 权限过滤偏差
  addCard(slide, startX + (cardW + gap) * 2, cardY, cardW, cardH, "权限过滤偏差", [
    "应交给前端的逻辑留在后端",
    "多了不必要的权限检查",
    "复盘：用户级权限交给前端",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  addPageNumber(slide, 12);
}

module.exports = { createSlide, slideConfig };