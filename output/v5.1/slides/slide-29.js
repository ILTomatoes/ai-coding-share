/**
 * Slide 29 — P29 SDD Results
 * SDD 成果
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addDataCard, addCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "SDD 成果");

  // ── Three big data cards ──
  const cardW = 2.6;
  const cardH = 1.0;
  const cardY = 1.15;
  const gap = 0.25;
  const totalW = cardW * 3 + gap * 2;
  const startX = (LAYOUT.W - totalW) / 2;

  addDataCard(slide, startX, cardY, cardW, cardH,
    "59个", "Java文件", {
      numColor: COLORS.ACCENT_BLUE, numSize: 28,
      borderColor: COLORS.ACCENT_BLUE,
    }
  );

  addDataCard(slide, startX + cardW + gap, cardY, cardW, cardH,
    "仅2天", "完成", {
      numColor: COLORS.GREEN, numSize: 28,
      borderColor: COLORS.GREEN,
    }
  );

  addDataCard(slide, startX + (cardW + gap) * 2, cardY, cardW, cardH,
    "13,093行", "代码 / 71个文件", {
      numColor: COLORS.YELLOW, numSize: 28,
      borderColor: COLORS.YELLOW,
    }
  );

  // ── Middle comparison: two cards ──
  const compCardW = 4.0;
  const compCardH = 1.2;
  const compY = 2.45;
  const compGap = 0.3;
  const compStartX = (LAYOUT.W - compCardW * 2 - compGap) / 2;

  addCard(slide, compStartX, compY, compCardW, compCardH,
    "aip-server", [
      "靠'经验+设计到位'",
      "个人能力驱动",
    ], {
      accentColor: COLORS.ACCENT_BLUE,
      titleColor: COLORS.ACCENT_BLUE,
      titleSize: 13,
      descSize: 11,
    }
  );

  addCard(slide, compStartX + compCardW + compGap, compY, compCardW, compCardH,
    "aip-gateway", [
      "靠'系统化SDD流程'",
      "方法论驱动",
    ], {
      accentColor: COLORS.GREEN,
      titleColor: COLORS.GREEN,
      titleSize: 13,
      descSize: 11,
    }
  );

  // ── Bottom text (13pt, blue) ──
  addTextBlock(slide, LAYOUT.MARGIN_L, 3.95, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.35,
    "同样的结果，但SDD的方式可复制、可团队化", {
      fontSize: 13, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE,
      align: "center", valign: "middle",
    }
  );

  // ── Bottom quote (24pt, blue, bold) ──
  addTextBlock(slide, LAYOUT.MARGIN_L, 4.4, LAYOUT.W - LAYOUT.MARGIN_L - LAYOUT.MARGIN_R, 0.5,
    "规范先行，代码自动", {
      fontSize: 24, fontFace: FONTS.CN, color: COLORS.ACCENT_BLUE, bold: true,
      align: "center", valign: "middle",
    }
  );

  addPageNumber(slide, 29);
}

module.exports = { createSlide };
