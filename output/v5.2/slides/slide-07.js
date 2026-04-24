const { createSlide, slideConfig } = (() => {
  const slideConfig = { page: 7 };

  function createSlide(pres, theme) {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };

    // Extra colors
    const green = "3FB950";
    const red = "F85149";
    const text = "E6EDF3";
    const muted = "8B949E";
    const border = "30363D";

    // ---- Title ----
    slide.addText("关键成果", {
      x: 0.4, y: 0.2, w: 4, h: 0.5,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true,
    });

    // ---- Two Big Stat Cards ----
    const cardY = 0.95;
    const cardH = 1.1;
    const cardW = 4.2;

    // Card 1: 5天 ~80个API端点
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.light },
      line: { color: theme.secondary, width: 2 },
      rectRadius: 0.05,
    });
    slide.addText("5天", {
      x: 0.6, y: cardY + 0.1, w: 1.2, h: 0.45,
      fontSize: 32, fontFace: "Calibri",
      color: theme.secondary, bold: true,
    });
    slide.addText("~80个API端点", {
      x: 1.8, y: cardY + 0.15, w: 2.8, h: 0.4,
      fontSize: 22, fontFace: "Microsoft YaHei",
      color: text, bold: true,
    });
    slide.addText("快速交付，从0到完整API层", {
      x: 0.6, y: cardY + 0.65, w: 4, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: muted,
    });

    // Card 2: 效率提升2-4倍
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.light },
      line: { color: green, width: 2 },
      rectRadius: 0.05,
    });
    slide.addText("2-4倍", {
      x: 5.4, y: cardY + 0.1, w: 1.3, h: 0.45,
      fontSize: 32, fontFace: "Calibri",
      color: green, bold: true,
    });
    slide.addText("效率提升", {
      x: 6.7, y: cardY + 0.15, w: 2.8, h: 0.4,
      fontSize: 22, fontFace: "Microsoft YaHei",
      color: text, bold: true,
    });
    slide.addText("相比传统开发模式的速度飞跃", {
      x: 5.4, y: cardY + 0.65, w: 4, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: muted,
    });

    // ---- Middle: Fix commits info ----
    const midY = 2.45;

    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: midY, w: 9.0, h: 0.75,
      fill: { color: theme.light },
      line: { color: theme.accent, width: 1.5 },
      rectRadius: 0.04,
    });

    // Left: 13次fix提交 stat
    slide.addText("13次fix提交", {
      x: 0.6, y: midY, w: 1.8, h: 0.4,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true, valign: "middle",
    });
    slide.addText("(45%)", {
      x: 2.35, y: midY, w: 0.9, h: 0.4,
      fontSize: 16, fontFace: "Calibri",
      color: theme.accent, bold: true, valign: "middle",
    });

    // Divider
    slide.addShape(pres.shapes.LINE, {
      x: 3.3, y: midY + 0.12, w: 0, h: 0.5,
      line: { color: border, width: 1 },
    });

    // Right: explanation
    slide.addText("AI有小错漏，但人评审捕获并修复", {
      x: 3.5, y: midY, w: 5.9, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: text, valign: "middle",
    });
    slide.addText("评审机制是质量的保障线", {
      x: 3.5, y: midY + 0.38, w: 5.9, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: muted,
    });

    // ---- Bottom 3 Green Checks ----
    const checkY = 3.55;
    const checkH = 0.65;
    const checkW = 2.8;
    const checkGap = 0.3;
    const checkStartX = 0.5;

    const checks = [
      { text: "16个数据库迁移版本", sub: "数据结构演进完整" },
      { text: "8个核心实体", sub: "领域模型清晰稳定" },
      { text: "评审后更新CLAUDE.md", sub: "知识持续沉淀" },
    ];

    checks.forEach((c, i) => {
      const x = checkStartX + i * (checkW + checkGap);

      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: checkY, w: checkW, h: checkH,
        fill: { color: theme.light },
        line: { color: green, width: 1 },
        rectRadius: 0.04,
      });

      // Green check icon + text
      slide.addText(`✔  ${c.text}`, {
        x: x + 0.1, y: checkY + 0.05, w: checkW - 0.2, h: 0.35,
        fontSize: 14, fontFace: "Microsoft YaHei",
        color: green, bold: true, valign: "middle",
      });

      slide.addText(c.sub, {
        x: x + 0.1, y: checkY + 0.38, w: checkW - 0.2, h: 0.25,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: muted, valign: "middle",
      });
    });

    // ---- Page Badge (circle) ----
    slide.addShape(pres.shapes.OVAL, {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fill: { color: theme.secondary },
    });
    slide.addText("7", {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fontSize: 12, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
    });
  }

  return { createSlide, slideConfig };
})();

module.exports = { createSlide, slideConfig };