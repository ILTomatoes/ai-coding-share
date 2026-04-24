/**
 * Shared theme and color constants for AI Coding Practice PPT.
 * All colors are 6-char hex WITHOUT # prefix (PptxGenJS requirement).
 */

// Theme object (required by PptxGenJS skill contract)
const theme = {
  primary: "0D1117",    // deep blue-black background
  secondary: "161B22",  // card background
  accent: "2F81F7",     // bright blue accent
  light: "E6EDF3",      // body text white
  bg: "0D1117"          // slide background
};

// Extended color constants
const COLORS = {
  BG_DARK:      "0D1117",  // deep blue-black
  CARD_BG:      "161B22",  // card background
  BORDER:       "30363D",  // border grey
  ACCENT_BLUE:  "2F81F7",  // bright blue
  GREEN:        "3FB950",  // success green
  RED:          "F85149",  // warning red-orange
  YELLOW:       "E3B341",  // caution yellow
  TEXT_WHITE:   "E6EDF3",  // body text
  TEXT_GREY:    "8B949E",  // secondary text
  CODE_GREEN:   "7EE787",  // code text
  TABLE_HDR:    "162436",  // table header bg
  DARK_ROW1:    "161B22",  // table odd row
  DARK_ROW2:    "0D1117",  // table even row
  WARN_BG:      "2D1A0A",  // warning card bg (dark orange)
  GREEN_BG:     "0A2E14",  // green highlight bg
};

// Font settings
const FONTS = {
  CN: "Microsoft YaHei",   // Chinese font
  EN: "Arial",              // English font
  CODE: "Consolas",         // Code font
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
