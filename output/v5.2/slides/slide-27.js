// slide-27.js — P27 Spec Iterations
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 27,
  title: 'Spec 的九轮迭代'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  const green = "3FB950";
  const red = "F85149";
  const text = "E6EDF3";
  const muted = "8B949E";
  const border = "30363D";

  // Title
  slide.addText("Spec 的九轮迭代（v1.0 → v1.9）", {
    x: 0.4, y: 0.15, w: 7.0, h: 0.5,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: text, bold: true, align: "left", valign: "middle"
  });

  // Left timeline panel
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 0.8, w: 4.6, h: 3.6,
    fill: { color: theme.light },
    line: { color: border, width: 1 },
    rectRadius: 0.08
  });

  // Timeline entries
  const timeline = [
    { version: "v1.0 - v1.2", desc: "基础框架搭建", color: theme.secondary, y: 0.95 },
    { version: "v1.3 - v1.5", desc: "审阅反馈修正", color: theme.accent, y: 1.6 },
    { version: "v1.6", desc: "重大定位调整!", color: red, y: 2.25 },
    { version: "v1.7 - v1.8", desc: "技术栈修正", color: theme.secondary, y: 2.9 },
    { version: "v1.9", desc: "综合修复 & 定稿", color: green, y: 3.55 }
  ];

  // Vertical timeline line
  slide.addShape(pres.shapes.LINE, {
    x: 1.5, y: 1.1, w: 0, h: 2.8,
    line: { color: theme.secondary, width: 2 }
  });

  timeline.forEach(t => {
    // Timeline dot
    slide.addShape(pres.shapes.OVAL, {
      x: 1.38, y: t.y + 0.15, w: 0.24, h: 0.24,
      fill: { color: t.color }
    });
    // Version label
    slide.addText(t.version, {
      x: 1.7, y: t.y, w: 2.5, h: 0.25,
      fontSize: 12, fontFace: "Calibri",
      color: t.color, bold: true,
      align: "left", valign: "middle"
    });
    // Description
    slide.addText(t.desc, {
      x: 1.7, y: t.y + 0.25, w: 2.8, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: text,
      align: "left", valign: "middle"
    });
  });

  // Right git commit sequence (code block style)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 0.8, w: 4.3, h: 3.6,
    fill: { color: "0D1117" },
    line: { color: border, width: 1.5 },
    rectRadius: 0.08
  });

  // Header bar for code block
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.35, y: 0.85, w: 4.2, h: 0.35,
    fill: { color: "1C2128" },
    line: { color: border, width: 0.5 },
    rectRadius: 0.05
  });
  slide.addText("git log --oneline", {
    x: 5.4, y: 0.85, w: 4.1, h: 0.35,
    fontSize: 10, fontFace: "Calibri",
    color: muted, align: "left", valign: "middle"
  });

  // Git commit entries
  const commits = [
    { hash: "a1b2c3d", msg: "feat: 初始Spec v1.0框架", color: green },
    { hash: "e4f5g6h", msg: "refactor: v1.3 审阅修正", color: theme.accent },
    { hash: "i7j8k9l", msg: "fix: v1.5 数据模型修正", color: theme.secondary },
    { hash: "m0n1o2p", msg: "refactor: v1.6 重大定位调整", color: red },
    { hash: "q3r4s5t", msg: "fix: v1.7 技术栈API修正", color: theme.secondary },
    { hash: "u6v7w8x", msg: "fix: v1.8 R2DBC兼容修正", color: theme.accent },
    { hash: "y9z0a1b", msg: "feat: v1.9 综合修复定稿", color: green }
  ];

  let commitY = 1.35;
  commits.forEach(c => {
    slide.addText([
      { text: c.hash + " ", options: { fontSize: 10, color: theme.accent, fontFace: "Calibri" } },
      { text: c.msg, options: { fontSize: 10, color: text, fontFace: "Microsoft YaHei" } }
    ], {
      x: 5.5, y: commitY, w: 4.0, h: 0.33,
      align: "left", valign: "middle"
    });
    commitY += 0.35;
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.secondary }
  });
  slide.addText("27", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 11, fontFace: "Calibri",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "0D1117", secondary: "2F81F7", accent: "E3B341",
    light: "161B22", bg: "0D1117"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-27-preview.pptx" });
}

module.exports = { createSlide, slideConfig };