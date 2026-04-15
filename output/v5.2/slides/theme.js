/**
 * Shared theme and color constants for AI Coding Practice PPT v5.2.
 * Design system: dark tech theme, sharp & compact, 10" x 5.625"
 * All colors are 6-char hex WITHOUT # prefix (PptxGenJS requirement).
 */

// Theme object (passed from compile.js, extended here)
const theme = {
  primary: "0D1117",
  secondary: "2F81F7",
  accent: "E3B341",
  light: "161B22",
  bg: "0D1117",
  text: "E6EDF3",
  muted: "8B949E",
  border: "30363D",
  green: "3FB950",
  red: "F85149",
};

// Extended color constants matching design system
const COLORS = {
  BG_DARK:      "0D1117",  // primary / background
  CARD_BG:      "161B22",  // light / card background
  BORDER:       "30363D",  // border
  ACCENT_BLUE:  "2F81F7",  // secondary / bright blue
  GREEN:        "3FB950",  // success green
  RED:          "F85149",  // warning red
  YELLOW:       "E3B341",  // accent / caution yellow
  TEXT_WHITE:   "E6EDF3",  // text / body text white
  TEXT_GREY:    "8B949E",  // muted / secondary text
  CODE_GREEN:   "7EE787",  // code text
  TABLE_HDR:    "162436",  // table header bg
  DARK_ROW1:    "161B22",  // table odd row
  DARK_ROW2:    "0D1117",  // table even row
  WARN_BG:      "2D1A0A",  // warning card bg (dark orange)
  GREEN_BG:     "0A2E14",  // green highlight bg
};

// Font settings — Calibri for English per design system
const FONTS = {
  CN: "Microsoft YaHei",
  EN: "Calibri",
  CODE: "Consolas",
};

// Layout constants (inches, 10" x 5.625" slide)
const LAYOUT = {
  W: 10,
  H: 5.625,
  MARGIN_L: 0.7,
  MARGIN_R: 0.7,
  MARGIN_T: 0.6,
  MARGIN_B: 0.5,
};

module.exports = { theme, COLORS, FONTS, LAYOUT };