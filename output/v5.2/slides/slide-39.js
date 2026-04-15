// slide-39.js — P36.7 Mature Harness Panorama
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 39,
  title: 'Harness 成熟期全景——完整闭环长什么样？'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Title
  slide.addText("Harness 成熟期全景——完整闭环长什么样？", {
    x: 0.3, y: 0.15, w: 9.4, h: 0.55,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "left", valign: "middle",
    margin: 0
  });

  // ── Top: Two-column closed loop diagram ──
  // Left column — Guides层 (blue cards)
  const leftX = 0.3;
  const leftW = 4.3;
  const colY = 0.8;
  const colH = 1.55;

  slide.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: colY, w: leftW, h: colH,
    fill: { color: "0D2240" },
    line: { color: theme.secondary, width: 1 }
  });
  slide.addText("Guides层", {
    x: leftX + 0.15, y: colY + 0.08, w: leftW - 0.3, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });
  slide.addText("CLAUDE.md + rules/  |  分层文档 + 架构约束  |  权限分级 + 编码规范", {
    x: leftX + 0.15, y: colY + 0.45, w: leftW - 0.3, h: 0.95,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: "E6EDF3", align: "center", valign: "middle",
    margin: 0
  });

  // Right column — Sensors层 (green cards)
  const rightX = 5.4;
  const rightW = 4.3;

  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: colY, w: rightW, h: colH,
    fill: { color: "1A3A2A" },
    line: { color: "3FB950", width: 1 }
  });
  slide.addText("Sensors层", {
    x: rightX + 0.15, y: colY + 0.08, w: rightW - 0.3, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "3FB950", bold: true,
    align: "center", valign: "middle",
    margin: 0
  });
  slide.addText("自动化测试 JUnit/Karate  |  Sonar扫描  |  ArchUnit架构检查  |  CI流水线", {
    x: rightX + 0.15, y: colY + 0.45, w: rightW - 0.3, h: 0.95,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: "E6EDF3", align: "center", valign: "middle",
    margin: 0
  });

  // Center yellow arrow — closed loop
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.0, y: colY + colH + 0.05, w: 4.0, h: 0.35,
    fill: { color: "3A2A0A" },
    line: { color: theme.accent, width: 1.5 }
  });
  slide.addText("犯错 → 根因 → 添加约束/检查 → 永远不再犯", {
    x: 3.0, y: colY + colH + 0.05, w: 4.0, h: 0.35,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // ── Middle: Four Java tool cards ──
  const tools = [
    { emoji: "🏗️", name: "ArchUnit", desc: "架构守护" },
    { emoji: "🔍", name: "Sonar", desc: "代码扫描" },
    { emoji: "🧪", name: "Karate", desc: "接口测试" },
    { emoji: "🔄", name: "CI", desc: "自动流水线" }
  ];

  const toolY = 2.55;
  const toolW = 2.2;
  const toolGap = 0.2;
  const toolH = 0.65;
  const toolStartX = 0.3;

  tools.forEach((t, i) => {
    const tx = toolStartX + i * (toolW + toolGap);

    slide.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: toolY, w: toolW, h: toolH,
      fill: { color: theme.light },
      line: { color: "30363D", width: 1 }
    });
    slide.addText([
      { text: t.emoji + " ", options: { fontSize: 14 } },
      { text: t.name, options: { bold: true } },
      { text: " " + t.desc, options: { color: "8B949E" } }
    ], {
      x: tx + 0.1, y: toolY, w: toolW - 0.2, h: toolH,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: "E6EDF3", align: "center", valign: "middle",
      margin: 0
    });
  });

  // ── Bottom: Four vendor proof cards ──
  const proofs = [
    { vendor: "OpenAI", detail: "88个AGENTS.md\n百万行零人工" },
    { vendor: "LangChain", detail: "52.8%→66.5%" },
    { vendor: "Anthropic", detail: "生成评估分离" },
    { vendor: "共同", detail: "约束优于提示\n反馈循环·分层\n自动化一切" }
  ];

  const proofY = 3.35;
  const proofW = 2.2;
  const proofH = 0.95;

  proofs.forEach((p, i) => {
    const px = toolStartX + i * (proofW + toolGap);

    slide.addShape(pres.shapes.RECTANGLE, {
      x: px, y: proofY, w: proofW, h: proofH,
      fill: { color: theme.light },
      line: { color: "30363D", width: 1 }
    });

    // Vendor name — accent top strip
    slide.addShape(pres.shapes.RECTANGLE, {
      x: px, y: proofY, w: proofW, h: 0.06,
      fill: { color: theme.accent }
    });

    slide.addText(p.vendor, {
      x: px + 0.1, y: proofY + 0.12, w: proofW - 0.2, h: 0.25,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: "E6EDF3", bold: true,
      align: "center", valign: "middle",
      margin: 0
    });

    slide.addText(p.detail, {
      x: px + 0.1, y: proofY + 0.38, w: proofW - 0.2, h: 0.52,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: "8B949E", align: "center", valign: "middle",
      margin: 0
    });
  });

  // ── Blue big insight ──
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.45, w: 9.4, h: 0.55,
    fill: { color: "0D2240" },
    line: { color: theme.secondary, width: 1.5 }
  });
  slide.addText("从\"人读规则\"到\"机器自动执行规则\"——这才是完整的Harness闭环", {
    x: 0.5, y: 4.45, w: 9.0, h: 0.55,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true,
    align: "center", valign: "middle",
    margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("39", {
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
  pres.writeFile({ fileName: "slide-39-preview.pptx" });
}

module.exports = { createSlide, slideConfig };