const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl')
});
let currentStep = 0;
let lastFullContent = '';
rl.on('line', (line) => {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) currentStep = parseInt(stepMatch[1], 10);
  
  if (currentStep <= 3585 && line.includes('TableViewer3D.tsx') && line.includes('"content":"')) {
     const match = line.match(/"content":"(.*?)"/);
     if (match && match[1].includes('export default function')) {
        lastFullContent = match[1];
     }
  }
});
rl.on('close', () => {
    if (lastFullContent) {
        console.log('Found full content, length: ', lastFullContent.length);
        try {
          fs.writeFileSync('TableViewer3D_RECOVERED.tsx', JSON.parse('"' + lastFullContent + '"'));
        } catch(e) {
          console.error(e);
        }
    } else {
        console.log('No full content found.');
    }
});
