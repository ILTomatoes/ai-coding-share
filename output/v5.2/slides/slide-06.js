const { createSlide, slideConfig } = (() => {
  const slideConfig = { page: 6 };

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
    slide.addText("协作模式 — 人与 AI 的分工", {
      x: 0.4, y: 0.25, w: 7.5, h: 0.55,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: text, bold: true,
    });

    // ---- Horizontal Flow ----
    // 4 steps arranged horizontally with arrows
    const flowY = 1.25;
    const boxH = 0.65;
    const boxW = 1.85;
    const arrowW = 0.35;
    const startX = 0.5;
    const gap = 0.15;

    // Step positions
    const steps = [
      { label: "🧑 人设计原型", color: theme.secondary, bgColor: theme.light },
      { label: "🧑 人设计表结构\n(AI参与)", color: theme.secondary, bgColor: theme.light },
      { label: "🤖 AI编码", color: green, bgColor: "1A3A1A" },
      { label: "🧑 人评审&测试", color: theme.secondary, bgColor: theme.light },
    ];

    steps.forEach((step, i) => {
      const x = startX + i * (boxW + arrowW + gap);

      // Card background
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: flowY, w: boxW, h: boxH,
        fill: { color: step.bgColor },
        line: { color: step.color, width: 1.5 },
        rectRadius: 0.04,
      });

      // Step text
      slide.addText(step.label, {
        x: x, y: flowY, w: boxW, h: boxH,
        fontSize: 13, fontFace: "Microsoft YaHei",
        color: step.color, bold: true,
        align: "center", valign: "middle",
      });

      // Arrow between steps (not for last)
      if (i < steps.length - 1) {
        const arrowX = x + boxW + gap / 2;
        slide.addShape(pres.shapes.LINE, {
          x: arrowX, y: flowY + boxH / 2,
          w: arrowW, h: 0,
          line: { color: theme.accent, width: 2, dashType: "solid" },
          flipH: false,
        });
        // Arrow head triangle (small)
        slide.addShape(pres.shapes.LINE, {
          x: arrowX + arrowW - 0.1, y: flowY + boxH / 2 - 0.08,
          w: 0.1, h: 0.16,
          line: { color: theme.accent, width: 2 },
          flipV: false,
        });
      }
    });

    // ---- Three Principles ----
    const princY = 2.6;
    const princH = 0.55;
    const princW = 2.7;
    const princGap = 0.3;
    const princStartX = 0.5;

    const principles = [
      { icon: "🎯", text: "人负责定方向", sub: "把控架构与边界" },
      { icon: "⚡", text: "AI负责跑量", sub: "批量编码与实现" },
      { icon: "🔍", text: "及时评审小步验证", sub: "每步提交检查" },
    ];

    principles.forEach((p, i) => {
      const x = princStartX + i * (princW + princGap);

      // Principle card
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: princY, w: princW, h: princH,
        fill: { color: theme.light },
        line: { color: border, width: 0.75 },
        rectRadius: 0.04,
      });

      // Icon + main text
      slide.addText(`${p.icon} ${p.text}`, {
        x: x + 0.1, y: princY, w: princW - 0.2, h: 0.32,
        fontSize: 15, fontFace: "Microsoft YaHei",
        color: theme.accent, bold: true,
        align: "center", valign: "middle",
      });

      // Sub text
      slide.addText(p.sub, {
        x: x + 0.1, y: princY + 0.3, w: princW - 0.2, h: 0.22,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: muted, align: "center", valign: "middle",
      });
    });

    // ---- Divider line between flow and principles ----
    slide.addShape(pres.shapes.LINE, {
      x: 0.5, y: 2.35, w: 9.0, h: 0,
      line: { color: border, width: 0.5, dashType: "dash" },
    });

    // ---- Bottom insight bar ----
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 3.7, w: 9.0, h: 0.55,
      fill: { color: theme.light },
      line: { color: theme.secondary, width: 1 },
      rectRadius: 0.04,
    });

    slide.addText("核心要点：人在决策位，AI在执行位，评审是安全阀", {
      x: 0.5, y: 3.7, w: 9.0, h: 0.55,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: text, bold: true, align: "center", valign: "middle",
    });

    // ---- Page Badge (circle) ----
    slide.addShape(pres.shapes.OVAL, {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fill: { color: theme.accent },
    });
    slide.addText("6", {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
    });
  }

  return { createSlide, slideConfig };
})();

module.exports = { createSlide, slideConfig };