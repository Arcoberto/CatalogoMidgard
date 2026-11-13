const fs = require('fs');
const lines = fs.readFileSync('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
  const stepMatch = lines[i].match(/"step_index":(\d+)/);
  if (stepMatch && parseInt(stepMatch[1], 10) < 3500) {
      if (lines[i].includes('s1_x') && lines[i].includes('chairsCount') && lines[i].includes('positions.push')) {
         const match = lines[i].match(/const s1_x.*?Math\.PI \/ 2, 0\] \}\);/s);
         if (match) {
             console.log('LATEST CHAIRS BEFORE 3500:');
             console.log(match[0]);
             break;
         }
      }
  }
}
