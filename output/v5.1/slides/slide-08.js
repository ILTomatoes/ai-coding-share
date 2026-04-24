/**
 * Slide 8 — P8 Case 1 Summary
 * 设计到位 + 边界清晰 = AI 效率拉满
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const { addPageNumber, addTextBlock } = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  // ── Center big text ──
  addTextBlock(slide, 0.5, 1.6, LAYOUT.W - 1.0, 0.8,
    "设计到位 + 边界清晰 = AI 效率拉满", {
      fontSize: 32, color: COLORS.ACCENT_BLUE, bold: true, align: "center",
    }
  );

  // ── Three green support lines ──
  const lines = [
    "\u2705 表结构设计清晰 \u2192 AI 有明确边界",
    "\u2705 及时评审，小步验证",
    "\u2705 人把控方向，AI 堆砌工作量",
  ];
  const lineY = 2.8;
  lines.forEach((text, i) => {
    addTextBlock(slide, 1.5, lineY + i * 0.55,
      LAYOUT.W - 3.0, 0.45,
      text, {
        fontSize: 16, color: COLORS.GREEN, align: "center",
      }
    );
  });

  addPageNumber(slide, 8);
}

module.exports = { createSlide };
