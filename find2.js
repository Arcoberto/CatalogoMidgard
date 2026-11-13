const fs = require('fs');
const lines = fs.readFileSync('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
for (const line of lines) {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) {
      const step = parseInt(stepMatch[1], 10);
      if (step >= 2291 && step <= 2310) {
          if (line.includes('const s1_x') && line.includes('rot:')) {
             const match = line.match(/const s1_x.*?Math\.PI \/ 2, 0\] \}\);/s);
             if (match) {
                 console.log('--- FINAL CHAIRS AROUND 2300 ---');
                 console.log(match[0]);
             }
          }
      }
  }
}
