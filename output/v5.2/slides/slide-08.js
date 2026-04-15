const { createSlide, slideConfig } = (() => {
  const slideConfig = { page: 8 };

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
    slide.addText("案例一：小结", {
      x: 0.4, y: 0.2, w: 4, h: 0.5,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: text, bold: true,
    });

    // ---- Center Big Quote ----
    const quoteY = 1.3;
    const quoteH = 1.2;
    const quoteW = 8.5;

    // Quote background card
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.75, y: quoteY, w: quoteW, h: quoteH,
      fill: { color: theme.light },
      line: { color: theme.secondary, width: 2 },
      rectRadius: 0.05,
    });

    // Quote text - secondary color, fontSize 32 bold
    slide.addText("设计到位 + 边界清晰 = AI 效率拉满", {
      x: 0.75, y: quoteY, w: quoteW, h: quoteH,
      fontSize: 32, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true,
      align: "center", valign: "middle",
    });

    // Decorative left quote mark
    slide.addText("\"", {
      x: 0.45, y: quoteY + 0.15, w: 0.4, h: 0.6,
      fontSize: 40, fontFace: "Calibri",
      color: theme.secondary, bold: true,
      align: "center", valign: "top",
    });

    // Decorative right quote mark
    slide.addText("\"", {
      x: 9.15, y: quoteY + 0.45, w: 0.4, h: 0.6,
      fontSize: 40, fontFace: "Calibri",
      color: theme.secondary, bold: true,
      align: "center", valign: "top",
    });

    // ---- Three Support Points ----
    const suppY = 2.85;
    const suppH = 1.3;
    const suppW = 2.8;
    const suppGap = 0.3;
    const suppStartX = 0.5;

    const supports = [
      {
        icon: "📐",
        title: "表结构设计清晰",
        desc: "AI有明确边界",
        detail: "清晰的领域模型和表结构\n为AI提供了明确的编码边界",
      },
      {
        icon: "🔍",
        title: "及时评审小步验证",
        desc: "质量可控",
        detail: "每次提交都进行评审\n小步迭代确保方向正确",
      },
      {
        icon: "🎯",
        title: "人把控方向",
        desc: "AI堆砌工作量",
        detail: "人做决策，AI做执行\n分工明确效率最大化",
      },
    ];

    supports.forEach((s, i) => {
      const x = suppStartX + i * (suppW + suppGap);

      // Support card
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: suppY, w: suppW, h: suppH,
        fill: { color: theme.light },
        line: { color: border, width: 0.75 },
        rectRadius: 0.04,
      });

      // Icon + Title
      slide.addText(`${s.icon}  ${s.title}`, {
        x: x + 0.12, y: suppY + 0.08, w: suppW - 0.24, h: 0.35,
        fontSize: 14, fontFace: "Microsoft YaHei",
        color: theme.accent, bold: true, valign: "middle",
      });

      // Desc (green highlight)
      slide.addText(s.desc, {
        x: x + 0.12, y: suppY + 0.42, w: suppW - 0.24, h: 0.28,
        fontSize: 13, fontFace: "Microsoft YaHei",
        color: green, bold: true, align: "center", valign: "middle",
      });

      // Detail
      slide.addText(s.detail, {
        x: x + 0.12, y: suppY + 0.72, w: suppW - 0.24, h: 0.55,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: muted, align: "center", valign: "top",
      });
    });

    // ---- Page Badge (circle) ----
    slide.addShape(pres.shapes.OVAL, {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fill: { color: theme.accent },
    });
    slide.addText("8", {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
    });
  }

  return { createSlide, slideConfig };
})();

module.exports = { createSlide, slideConfig };