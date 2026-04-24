/**
 * Slide 9 — P9 A2A Adapter Background
 * 案例二：A2A 适配器背景 + 红色警告卡片
 */
const { COLORS, FONTS, LAYOUT } = require("./theme");
const {
  addSlideTitle, addPageNumber, addCard, addTextBlock,
} = require("./helpers");

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.BG_DARK };

  addSlideTitle(slide, "案例二：A2A 适配器（一场代价惨痛的返工）");

  // ── LEFT (50%): Background info ──
  const leftX = LAYOUT.MARGIN_L;
  const leftW = 4.6;

  addTextBlock(slide, leftX, 1.3, leftW, 0.4,
    "背景信息", {
      fontSize: 16, color: COLORS.TEXT_WHITE, bold: true,
    }
  );

  const bullets = [
    "需求：适配 Google A2A 协议，实现智能体间通信",
    "项目：aip-gateway 智能体消息网关",
    "领域陌生：团队此前未接触过 A2A 协议规范",
  ];
  bullets.forEach((text, i) => {
    addTextBlock(slide, leftX + 0.15, 1.9 + i * 0.5, leftW - 0.3, 0.45,
      "\u2022 " + text, {
        fontSize: 13, color: COLORS.TEXT_GREY,
      }
    );
  });

  // ── RIGHT (45%): RED warning card ──
  const rightX = 5.6;
  const rightW = 3.7;

  addCard(slide, rightX, 1.3, rightW, 2.3,
    "\u26A0\uFE0F 关键问题",
    [
      "让 AI 根据协议文档直接编码",
      "",
      "自己对 A2A 不了解，",
      "无法判断 AI 输出是否正确",
    ],
    {
      accentColor: COLORS.RED,
      titleColor: COLORS.RED,
      descColor: COLORS.TEXT_WHITE,
      titleSize: 14,
      descSize: 13,
    }
  );

  addPageNumber(slide, 9);
}

module.exports = { createSlide };
