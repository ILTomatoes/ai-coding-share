// slide-05.js — P5 Module Focus - 聚焦技能工具模块（logic/tool）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  title: '聚焦技能工具模块（logic/tool）'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Page title
  slide.addText("聚焦技能工具模块（logic/tool）", {
    x: 0.3, y: 0.3, w: 9.4, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // Top stats line
  slide.addText("5 个 Controller，约 80 个 API 端点，8 个核心实体", {
    x: 0.3, y: 1.15, w: 9.4, h: 0.45,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: "8B949E", align: "left", valign: "middle",
    margin: 0
  });

  // Five equal-width cards
  const cards = [
    { title: "代码库管理", controller: "LtCodeRepoController" },
    { title: "MCP 服务", controller: "LtMcpController" },
    { title: "扩展插件", controller: "LtExtensionPluginController" },
    { title: "OpenAPI", controller: "LtOpenapiController" },
    { title: "工作流", controller: "LtTaskflowController" }
  ];

  const startX = 0.3;
  const cardW = 1.78;
  const cardGap = 0.14;
  const cardH = 2.8;
  const cardY = 1.85;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardW + cardGap);

    // Card background — light
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.light }
    });

    // Accent border top strip
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: 0.06,
      fill: { color: theme.accent }
    });

    // Card title
    slide.addText(card.title, {
      x: cx + 0.1, y: cardY + 0.25, w: cardW - 0.2, h: 0.6,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: "E6EDF3", bold: true,
      align: "center", valign: "middle",
      margin: 0
    });

    // Controller name
    slide.addText(card.controller, {
      x: cx + 0.1, y: cardY + 0.95, w: cardW - 0.2, h: 0.8,
      fontSize: 11, fontFace: "Calibri",
      color: "8B949E", align: "center", valign: "middle",
      margin: 0
    });

    // Small decorative icon placeholder (circle with number)
    slide.addShape(pres.shapes.OVAL, {
      x: cx + (cardW - 0.4) / 2, y: cardY + 1.85, w: 0.4, h: 0.4,
      fill: { color: theme.secondary, transparency: 70 }
    });
    slide.addText(String(i + 1), {
      x: cx + (cardW - 0.4) / 2, y: cardY + 1.85, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
      margin: 0
    });
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("5", {
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
  pres.writeFile({ fileName: "slide-05-preview.pptx" });
}

module.exports = { createSlide, slideConfig };