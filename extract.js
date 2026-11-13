const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl')
});
let lastTableViewerContent = '';
let currentStep = 0;

rl.on('line', (line) => {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) currentStep = parseInt(stepMatch[1], 10);
  
  // We want the last state of the file before step 3585 (when the user introduced Midgard).
  // I will look for any "CodeContent" or "ReplacementContent" that mentions TableViewer3D.tsx
  // But wait, the file could have been updated using multi_replace_file_content.
  // The absolute BEST way is to just find the LAST time we wrote the FULL file before 3585.
  
  if (currentStep < 3585 && line.includes('"name":"write_to_file"') && line.includes('TableViewer3D.tsx')) {
     const jsonMatch = line.match(/"CodeContent":"(.*?)","Description"/);
     if (jsonMatch) {
         try {
             lastTableViewerContent = JSON.parse('"' + jsonMatch[1] + '"');
         } catch(e) {
         }
     }
  }
});

rl.on('close', () => {
    if (lastTableViewerContent) {
        fs.writeFileSync('TableViewer3D_RESTORED.tsx', lastTableViewerContent);
        console.log('Restored to TableViewer3D_RESTORED.tsx, length: ' + lastTableViewerContent.length);
    } else {
        console.log('No full file write found before 3585.');
    }
});
