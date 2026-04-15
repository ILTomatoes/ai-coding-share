const pptxgen = require('pptxgenjs');
const { theme } = require('./theme');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'eric';
pres.title = 'Java 开发中的 AI 协作编程实践';

// Load all 51 slide modules
for (let i = 1; i <= 51; i++) {
  const num = String(i).padStart(2, '0');
  try {
    const slideModule = require(`./slide-${num}.js`);
    slideModule.createSlide(pres, theme);
  } catch (e) {
    console.error(`Error loading slide-${num}.js:`, e.message);
  }
}

pres.writeFile({ fileName: './output/ai_coding_practice.pptx' })
  .then(() => console.log('PPTX generated successfully!'))
  .catch(err => console.error('Error:', err));