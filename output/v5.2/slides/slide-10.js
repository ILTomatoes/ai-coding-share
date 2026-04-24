const { createSlide, slideConfig } = (() => {
  const slideConfig = { page: 10 };

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
    slide.addText("发生了什么", {
      x: 0.4, y: 0.2, w: 4, h: 0.5,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true,
    });

    // ---- Vertical Timeline (5 nodes) ----
    // Left side timeline
    const tlX = 0.5;
    const tlW = 5.5;
    const nodeSpacing = 0.70;
    const startY = 0.95;
    const nodeH = 0.65;
    const dotR = 0.18; // circle radius

    const timeline = [
      { color: green, label: "Day1", desc: "让AI编码", detail: "拿到协议文档直接开始" },
      { color: red, label: "1-2周", desc: "AI高效产出46次提交", detail: "看似高效实则偏离方向" },
      { color: red, label: "", desc: "无法判断正确性", detail: "领域知识不足无法评审" },
      { color: red, label: "", desc: "发现官方SDK", detail: "A2A协议已有成熟SDK工具" },
      { color: green, label: "3天", desc: "用SDK搞定", detail: "基于官方SDK快速完成适配" },
    ];

    // Vertical line connecting nodes
    slide.addShape(pres.shapes.LINE, {
      x: tlX + 0.5, y: startY + dotR, w: 0, h: nodeSpacing * 4,
      line: { color: border, width: 2 },
    });

    timeline.forEach((node, i) => {
      const ny = startY + i * nodeSpacing;

      // Node circle
      slide.addShape(pres.shapes.OVAL, {
        x: tlX + 0.5 - dotR / 2, y: ny + 0.1,
        w: dotR, h: dotR,
        fill: { color: node.color },
        line: { color: node.color, width: 1 },
      });

      // Node label (time)
      if (node.label) {
        slide.addText(node.label, {
          x: tlX + 0.85, y: ny, w: 0.8, h: 0.35,
          fontSize: 12, fontFace: "Calibri",
          color: node.color, bold: true, valign: "middle",
        });
      }

      // Node description
      const descX = node.label ? tlX + 1.65 : tlX + 0.85;
      slide.addText(node.desc, {
        x: descX, y: ny, w: 3.5, h: 0.35,
        fontSize: 14, fontFace: "Microsoft YaHei",
        color: node.color === red ? red : text, bold: true, valign: "middle",
      });

      // Node detail
      slide.addText(node.detail, {
        x: descX, y: ny + 0.33, w: 3.5, h: 0.3,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: muted, valign: "middle",
      });
    });

    // ---- Right Side: Big Numbers ----
    const rightX = 6.3;
    const rightW = 3.5;
    const rightY = 0.95;
    const rightH = 2.8;

    // Big numbers card
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: rightY, w: rightW, h: rightH,
      fill: { color: "1F0D0D" },
      line: { color: red, width: 2 },
      rectRadius: 0.05,
    });

    // "141,026行 → 1,786行"
    slide.addText("141,026行", {
      x: rightX + 0.2, y: rightY + 0.2, w: rightW - 0.4, h: 0.55,
      fontSize: 28, fontFace: "Calibri",
      color: red, bold: true, align: "center", valign: "middle",
    });

    // Arrow
    slide.addText("→", {
      x: rightX + 0.2, y: rightY + 0.75, w: rightW - 0.4, h: 0.35,
      fontSize: 20, fontFace: "Calibri",
      color: theme.accent, bold: true, align: "center", valign: "middle",
    });

    // "1,786行"
    slide.addText("1,786行", {
      x: rightX + 0.2, y: rightY + 1.1, w: rightW - 0.4, h: 0.55,
      fontSize: 28, fontFace: "Calibri",
      color: green, bold: true, align: "center", valign: "middle",
    });

    // "代码量缩减98.7%"
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX + 0.3, y: rightY + 1.85, w: rightW - 0.6, h: 0.7,
      fill: { color: "2A1212" },
      line: { color: red, width: 1 },
      rectRadius: 0.03,
    });

    slide.addText("代码量缩减", {
      x: rightX + 0.3, y: rightY + 1.85, w: rightW - 0.6, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: muted, align: "center", valign: "middle",
    });

    slide.addText("98.7%", {
      x: rightX + 0.3, y: rightY + 2.2, w: rightW - 0.6, h: 0.35,
      fontSize: 26, fontFace: "Calibri",
      color: red, bold: true, align: "center", valign: "middle",
    });

    // ---- Bottom Lesson Bar ----
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.55, w: 9.0, h: 0.85,
      fill: { color: theme.light },
      line: { color: red, width: 1.5 },
      rectRadius: 0.04,
    });

    slide.addText("核心教训", {
      x: 0.7, y: 4.55, w: 1.2, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: red, bold: true, valign: "middle",
    });

    slide.addText("在陌生领域，先调研再行动。盲目让AI编码 = 高效地做错事", {
      x: 1.9, y: 4.55, w: 7.4, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: text, valign: "middle",
    });

    slide.addText("141,026行无用代码的代价，验证了\"方向比速度更重要\"", {
      x: 0.7, y: 4.95, w: 8.6, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: muted, valign: "middle",
    });

    // ---- Page Badge (circle) ----
    slide.addShape(pres.shapes.OVAL, {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fill: { color: theme.secondary },
    });
    slide.addText("10", {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fontSize: 12, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
    });
  }

  return { createSlide, slideConfig };
})();

module.exports = { createSlide, slideConfig };