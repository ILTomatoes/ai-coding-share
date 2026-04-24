/**
 * Compile script: combines all 50 slide modules into one PPTX.
 */
const pptxgen = require("pptxgenjs");
const { theme, COLORS, FONTS, LAYOUT } = require("./theme");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "eric";
pres.title = "Java 开发中的 AI 协作编程实践";

for (let i = 1; i <= 50; i++) {
  const num = String(i).padStart(2, "0");
  const mod = require(`./slide-${num}.js`);
  mod.createSlide(pres, theme);
}

const outPath = "./output/ai_coding_practice_v5.1.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`PPTX saved to ${outPath}`);
  console.log(`Total slides: ${pres.slides.length}`);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
