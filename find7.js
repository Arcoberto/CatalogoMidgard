const fs = require('fs');
const lines = fs.readFileSync('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let block = [];
let recording = false;
for (const line of lines) {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) {
      const step = parseInt(stepMatch[1], 10);
      if (step >= 2290 && step <= 2310) {
          if (line.includes('const s1_x') && line.includes('cab2_x')) {
             const match = line.match(/(const s1_x.*?Math\.PI \/ 2, 0\] \}\);)/s);
             if (match) {
                 console.log('--- BLOCK FOUND ---');
                 console.log(match[1]);
                 fs.writeFileSync('CHAIRS_RESTORE.txt', match[1]);
                 break;
             }
          }
      }
  }
}
