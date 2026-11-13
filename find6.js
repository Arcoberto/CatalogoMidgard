const fs = require('fs');
const lines = fs.readFileSync('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let found = false;
for (const line of lines) {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) {
      const step = parseInt(stepMatch[1], 10);
      if (step >= 3560 && step <= 3584) {
          if (line.includes('TableViewer3D.tsx') && line.includes('CodeContent')) {
             console.log('FOUND FULL WRITE AT ' + step + '!');
             fs.writeFileSync('RESTORE.txt', line);
             found = true;
          }
      }
  }
}
if(!found) console.log('Not found');
