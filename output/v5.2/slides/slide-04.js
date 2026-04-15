// slide-04.js — P4 Project Overview - 案例一：aip-server 项目概览
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '案例一：aip-server 项目概览'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Page title
  slide.addText("案例一：aip-server 项目概览", {
    x: 0.3, y: 0.3, w: 9.4, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Left column (40%) — Project description
  const leftX = 0.3;
  const leftW = 3.7;

  // Description card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: 1.3, w: leftW, h: 3.2,
    fill: { color: theme.light }
  });

  // Project name
  slide.addText("aip-server", {
    x: leftX + 0.15, y: 1.5, w: leftW - 0.3, h: 0.5,
    fontSize: 20, fontFace: "Calibri",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Project description text
  slide.addText([
    { text: "AI 智能平台后端服务", options: { fontSize: 16, fontFace: "Microsoft YaHei", color: "E6EDF3", breakLine: true } },
    { text: "", options: { fontSize: 10, breakLine: true } },
    { text: "企业级智能体管理、知识库、数据分析平台", options: { fontSize: 14, fontFace: "Microsoft YaHei", color: "8B949E", breakLine: true } }
  ], {
    x: leftX + 0.15, y: 2.2, w: leftW - 0.3, h: 2.0,
    valign: "top", margin: 0
  });

  // Right column (55%) — Three data cards
  const rightX = 4.3;
  const rightW = 5.4;
  const cardGap = 0.2;

  // Card 1 — Stats
  const card1Y = 1.3;
  const card1H = 0.85;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card1Y, w: rightW, h: card1H,
    fill: { color: theme.light }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card1Y, w: 0.06, h: card1H,
    fill: { color: theme.secondary }
  });
  slide.addText([
    { text: "100", options: { fontSize: 28, fontFace: "Calibri", color: theme.secondary, bold: true } },
    { text: " 个 Controller", options: { fontSize: 14, fontFace: "Microsoft YaHei", color: "8B949E" } },
    { text: "   |   ", options: { fontSize: 14, color: "30363D" } },
    { text: "11", options: { fontSize: 28, fontFace: "Calibri", color: theme.secondary, bold: true } },
    { text: " 个业务模块", options: { fontSize: 14, fontFace: "Microsoft YaHei", color: "8B949E" } },
    { text: "   |   ", options: { fontSize: 14, color: "30363D" } },
    { text: "2394", options: { fontSize: 28, fontFace: "Calibri", color: theme.secondary, bold: true } },
    { text: " 次提交", options: { fontSize: 14, fontFace: "Microsoft YaHei", color: "8B949E" } }
  ], {
    x: rightX + 0.2, y: card1Y, w: rightW - 0.4, h: card1H,
    align: "left", valign: "middle", margin: 0
  });

  // Card 2 — Tech stack
  const card2Y = card1Y + card1H + cardGap;
  const card2H = 0.85;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card2Y, w: rightW, h: card2H,
    fill: { color: theme.light }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card2Y, w: 0.06, h: card2H,
    fill: { color: "3FB950" }
  });
  slide.addText("技术栈：Spring Boot 2.7.18 + MyBatis Plus 3.4.2 + PostgreSQL + Java 17", {
    x: rightX + 0.2, y: card2Y, w: rightW - 0.4, h: card2H,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "E6EDF3", align: "left", valign: "middle",
    margin: 0
  });

  // Card 3 — Multi-datasource
  const card3Y = card2Y + card2H + cardGap;
  const card3H = 0.85;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card3Y, w: rightW, h: card3H,
    fill: { color: theme.light }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: card3Y, w: 0.06, h: card3H,
    fill: { color: theme.accent }
  });
  slide.addText("多数据源：PostgreSQL + Neo4j + Dremio  |  Feign 微服务调用", {
    x: rightX + 0.2, y: card3Y, w: rightW - 0.4, h: card3H,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "E6EDF3", align: "left", valign: "middle",
    margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("4", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117",
    secondary: "2F81F7",
    accent: "E3B341",
    light: "161B22",
    bg: "0D1117"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-04-preview.pptx" });
}

module.exports = { createSlide, slideConfig };