/**
 * Slide 12 — P12 Crash Scene 2
 * "翻车现场（二）— 三个小案例"
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "翻车现场（二）— 三个小案例");

  const cardW = 2.7;
  const gap = 0.3;
  const startX = 0.7;
  const cardY = 1.2;
  const cardH = 2.5;

  // Card 1: SQL 版本号错误
  addCard(slide, startX, cardY, cardW, cardH, "SQL 版本号错误", [
    "生成了V2.2.14而非V2.2.13",
    "没有先查现有版本文件",
    "数据库迁移执行失败",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  // Card 2: 修改已冻结脚本
  addCard(slide, startX + cardW + gap, cardY, cardW, cardH, "修改已冻结脚本", [
    "修改了已冻结的V2.2.13__init.sql",
    "已部署环境文件摘要不一致",
    "复盘：Flyway已冻结脚本严禁修改",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  // Card 3: 权限过滤偏差
  addCard(slide, startX + (cardW + gap) * 2, cardY, cardW, cardH, "权限过滤偏差", [
    "把应交给前端的逻辑保留在后端",
    "后端多了不必要的权限检查",
    "复盘：用户级权限判断交给前端",
  ], {
    accentColor: COLORS.RED,
    titleColor: COLORS.RED,
    titleSize: 13,
    descSize: 10,
  });

  addPageNumber(slide, 12);
}

module.exports = { createSlide };
