/**
 * Shared helper functions for generating PPT slides v5.2.
 * Provides reusable components: titles, cards, flow nodes, badges, etc.
 */

const { COLORS, FONTS, LAYOUT } = require("./theme");

// ─── Slide Title ───
function addSlideTitle(slide, title, opts = {}) {
  const y = opts.y || 0.3;
  slide.addText(title, {
    x: LAYOUT.MARGIN_L, y: y,
    w: LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, h: 0.55,
    fontSize: 24, fontFace: FONTS.CN,
    color: COLORS.ACCENT_BLUE, bold: true,
    margin: 0,
  });
}

// ─── Subtitle ───
function addSubtitle(slide, text, opts = {}) {
  const y = opts.y || 0.95;
  slide.addText(text, {
    x: LAYOUT.MARGIN_L, y: y,
    w: LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, h: 0.4,
    fontSize: opts.fontSize || 13,
    fontFace: FONTS.CN,
    color: opts.color || COLORS.TEXT_GREY,
    margin: 0,
  });
}

// ─── Page Number Badge (circle, right-bottom) ───
function addPageNumber(slide, pageNum) {
  slide.addShape("oval", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: COLORS.ACCENT_BLUE },
  });
  slide.addText(String(pageNum), {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: FONTS.EN,
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ─── Card with optional accent bar ───
function addCard(slide, x, y, w, h, title, descLines, opts = {}) {
  const accentColor = opts.accentColor || COLORS.ACCENT_BLUE;
  const titleColor = opts.titleColor || COLORS.TEXT_WHITE;
  const descColor = opts.descColor || COLORS.TEXT_GREY;
  const titleSize = opts.titleSize || 12;
  const descSize = opts.descSize || 10;
  const showAccent = opts.showAccent !== false;

  // Background rectangle
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.CARD_BG },
    line: { color: COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });

  // Accent bar at top
  if (showAccent && accentColor) {
    slide.addShape("rect", {
      x, y, w, h: 0.04,
      fill: { color: accentColor },
    });
  }

  // Title text
  const yOffset = showAccent ? 0.12 : 0.08;
  slide.addText(title, {
    x: x + 0.12, y: y + yOffset,
    w: w - 0.24, h: 0.35,
    fontSize: titleSize, fontFace: FONTS.CN,
    color: titleColor, bold: true,
    margin: 0,
  });

  // Description lines
  if (descLines && descLines.length > 0) {
    slide.addText(
      descLines.map((line, i) => ({
        text: line,
        options: { breakLine: i < descLines.length - 1 },
      })),
      {
        x: x + 0.12, y: y + yOffset + 0.35,
        w: w - 0.24, h: h - yOffset - 0.45,
        fontSize: descSize, fontFace: FONTS.CN,
        color: descColor,
        valign: "top",
        margin: 0,
      }
    );
  }
}

// ─── Big Number Display ───
function addBigNumber(slide, x, y, w, number, label, opts = {}) {
  const numColor = opts.numColor || COLORS.ACCENT_BLUE;
  const numSize = opts.numSize || 28;
  slide.addText(number, {
    x, y, w, h: 0.55,
    fontSize: numSize, fontFace: FONTS.EN,
    color: numColor, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });
  slide.addText(label, {
    x, y: y + 0.55, w, h: 0.3,
    fontSize: 11, fontFace: FONTS.CN,
    color: COLORS.TEXT_GREY,
    align: "center", valign: "top",
    margin: 0,
  });
}

// ─── Data Card (big number in a card) ───
function addDataCard(slide, x, y, w, h, number, label, opts = {}) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.CARD_BG },
    line: { color: opts.borderColor || COLORS.BORDER, width: 0.75 },
    rectRadius: 0.03,
  });
  addBigNumber(slide, x, y + 0.15, w, number, label, opts);
}

// ─── Flow Node ───
function addFlowNode(slide, x, y, w, h, text, opts = {}) {
  const borderColor = opts.borderColor || COLORS.ACCENT_BLUE;
  const fillColor = opts.fillColor || COLORS.CARD_BG;
  const textColor = opts.textColor || COLORS.TEXT_WHITE;
  const fontSize = opts.fontSize || 11;

  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: borderColor, width: 1.5 },
    rectRadius: 0.03,
  });
  slide.addText(text, {
    x, y, w, h,
    fontSize, fontFace: FONTS.CN,
    color: textColor, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ─── Right Arrow ───
function addRightArrow(slide, x, y, w, h, color) {
  slide.addShape("rightArrow", {
    x, y, w, h,
    fill: { color: color || COLORS.TEXT_GREY },
    line: { width: 0 },
  });
}

// ─── Down Arrow ───
function addDownArrow(slide, x, y, w, h, color) {
  slide.addShape("downArrow", {
    x, y, w, h,
    fill: { color: color || COLORS.TEXT_GREY },
    line: { width: 0 },
  });
}

// ─── Warning Box (yellow/red accent) ───
function addWarningBox(slide, x, y, w, h, text, opts = {}) {
  const borderColor = opts.borderColor || COLORS.YELLOW;
  const textColor = opts.textColor || COLORS.YELLOW;

  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.WARN_BG },
    line: { color: borderColor, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText(text, {
    x: x + 0.15, y: y + 0.08,
    w: w - 0.3, h: h - 0.16,
    fontSize: opts.fontSize || 13,
    fontFace: FONTS.CN,
    color: textColor, bold: true,
    align: "center", valign: "middle",
    margin: 0,
  });
}

// ─── Section Divider Page ───
function addSectionDivider(slide, partLabel, mainTitle, subtitle) {
  slide.background = { color: COLORS.BG_DARK };

  slide.addText(partLabel, {
    x: 1.5, y: 2.0, w: 7, h: 0.5,
    fontSize: 20, fontFace: FONTS.EN,
    color: COLORS.ACCENT_BLUE,
    align: "center", margin: 0,
  });

  slide.addText(mainTitle, {
    x: 1.5, y: 2.7, w: 7, h: 1.0,
    fontSize: 40, fontFace: FONTS.CN,
    color: COLORS.TEXT_WHITE, bold: true,
    align: "center", margin: 0,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.5, y: 3.8, w: 7, h: 0.5,
      fontSize: 18, fontFace: FONTS.CN,
      color: COLORS.TEXT_GREY,
      align: "center", margin: 0,
    });
  }
}

// ─── Simple Text Block ───
function addTextBlock(slide, x, y, w, h, text, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontSize: opts.fontSize || 14,
    fontFace: opts.fontFace || FONTS.CN,
    color: opts.color || COLORS.TEXT_WHITE,
    bold: opts.bold || false,
    align: opts.align || "left",
    valign: opts.valign || "top",
    margin: 0,
  });
}

module.exports = {
  addSlideTitle, addSubtitle, addPageNumber,
  addCard, addBigNumber, addDataCard,
  addFlowNode, addRightArrow, addDownArrow,
  addWarningBox, addSectionDivider, addTextBlock,
};