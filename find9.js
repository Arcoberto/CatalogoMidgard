const fs = require('fs');
const lines = fs.readFileSync('C:/Users/el_ar/.gemini/antigravity/brain/30fca770-cfa0-4f60-a464-ac8974e8f8e7/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
for (const line of lines) {
  if (line.includes('"step_index"')) {
      const step = parseInt(line.match(/"step_index":(\d+)/)[1], 10);
      if (step >= 2200 && step <= 2310 && line.includes('const s5_x') && line.includes('const cab1_x')) {
          try {
              const data = JSON.parse(line);
              let content = '';
              if (data.tool_calls) {
                  for (const tc of data.tool_calls) {
                      if (tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
                          content += JSON.stringify(tc.args);
                      }
                  }
              }
              if (data.content) content += data.content;
              
              if (content.includes('const s5_x')) {
                  fs.appendFileSync('CHAIRS_LOG.txt', '--- STEP ' + step + ' ---\n' + content + '\n');
              }
          } catch(e) {}
      }
  }
}
