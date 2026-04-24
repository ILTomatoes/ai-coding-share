const { createSlide, slideConfig } = (() => {
  const slideConfig = { page: 9 };

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
    slide.addText("案例二：A2A 适配器 — 一场代价惨痛的返工", {
      x: 0.4, y: 0.2, w: 8.5, h: 0.55,
      fontSize: 22, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true,
    });

    // ---- Left Panel (50%): Background Info ----
    const leftX = 0.5;
    const leftW = 4.5;
    const leftY = 0.95;
    const leftH = 3.8;

    // Left card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: leftX, y: leftY, w: leftW, h: leftH,
      fill: { color: theme.light },
      line: { color: border, width: 1 },
      rectRadius: 0.04,
    });

    // Section header
    slide.addText("背景信息", {
      x: leftX + 0.2, y: leftY + 0.15, w: leftW - 0.4, h: 0.35,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true,
    });

    // Separator line
    slide.addShape(pres.shapes.LINE, {
      x: leftX + 0.2, y: leftY + 0.55, w: leftW - 0.4, h: 0,
      line: { color: theme.secondary, width: 1 },
    });

    // Background items
    const bgItems = [
      { icon: "📋", text: "A2A协议适配器", sub: "实现Agent与Agent之间的通信协议" },
      { icon: "🔧", text: "aip-gateway a2a-wrapper", sub: "网关服务中的A2A协议封装模块" },
      { icon: "⚠️", text: "陌生领域未调研", sub: "对A2A协议生态缺乏前期调研" },
    ];

    bgItems.forEach((item, i) => {
      const iy = leftY + 0.75 + i * 0.95;

      // Item icon + title
      slide.addText(`${item.icon}  ${item.text}`, {
        x: leftX + 0.25, y: iy, w: leftW - 0.5, h: 0.35,
        fontSize: 14, fontFace: "Microsoft YaHei",
        color: text, bold: true, valign: "middle",
      });

      // Item subtitle
      slide.addText(item.sub, {
        x: leftX + 0.25, y: iy + 0.38, w: leftW - 0.5, h: 0.3,
        fontSize: 11, fontFace: "Microsoft YaHei",
        color: muted, valign: "middle",
      });
    });

    // ---- Right Panel (45%): Red Warning Card ----
    const rightX = 5.3;
    const rightW = 4.2;
    const rightY = 0.95;
    const rightH = 3.8;

    // Red warning card
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: rightY, w: rightW, h: rightH,
      fill: { color: "1F0D0D" },
      line: { color: red, width: 2 },
      rectRadius: 0.04,
    });

    // Warning header
    slide.addText("⚠️  错误决策", {
      x: rightX + 0.2, y: rightY + 0.2, w: rightW - 0.4, h: 0.4,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: red, bold: true, align: "center", valign: "middle",
    });

    // Separator
    slide.addShape(pres.shapes.LINE, {
      x: rightX + 0.3, y: rightY + 0.7, w: rightW - 0.6, h: 0,
      line: { color: red, width: 1 },
    });

    // Warning point 1
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX + 0.25, y: rightY + 0.9, w: rightW - 0.5, h: 1.0,
      fill: { color: "2A1212" },
      line: { color: red, width: 0.5 },
      rectRadius: 0.03,
    });

    slide.addText("让AI根据协议文档直接编码", {
      x: rightX + 0.35, y: rightY + 0.95, w: rightW - 0.7, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: red, bold: true, valign: "middle",
    });

    slide.addText("在陌生领域直接让AI编码\n没有先调研现有生态和工具", {
      x: rightX + 0.35, y: rightY + 1.35, w: rightW - 0.7, h: 0.5,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: muted, align: "center", valign: "top",
    });

    // Warning point 2
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX + 0.25, y: rightY + 2.1, w: rightW - 0.5, h: 1.0,
      fill: { color: "2A1212" },
      line: { color: red, width: 0.5 },
      rectRadius: 0.03,
    });

    slide.addText("⚠️  无法判断AI输出正确性", {
      x: rightX + 0.35, y: rightY + 2.15, w: rightW - 0.7, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: red, bold: true, valign: "middle",
    });

    slide.addText("领域知识不足导致\n无法有效评审AI的产出", {
      x: rightX + 0.35, y: rightY + 2.55, w: rightW - 0.7, h: 0.5,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: muted, align: "center", valign: "top",
    });

    // ---- Bottom insight bar ----
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.95, w: 9.0, h: 0.5,
      fill: { color: theme.light },
      line: { color: red, width: 1 },
      rectRadius: 0.04,
    });

    slide.addText("教训：陌生领域务必先调研，再决定是否让AI编码", {
      x: 0.5, y: 4.95, w: 9.0, h: 0.5,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: red, bold: true, align: "center", valign: "middle",
    });

    // ---- Page Badge (circle) ----
    slide.addShape(pres.shapes.OVAL, {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fill: { color: theme.secondary },
    });
    slide.addText("9", {
      x: 9.3, y: 5.1, w: 0.4, h: 0.4,
      fontSize: 12, fontFace: "Calibri",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle",
    });
  }

  return { createSlide, slideConfig };
})();

module.exports = { createSlide, slideConfig };