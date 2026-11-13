const fs = require('fs');
const buffer = fs.readFileSync('public/models/Silla.glb');

const magic = buffer.toString('utf8', 0, 4);
if (magic !== 'glTF') {
  console.log('Not a valid glTF file.');
  process.exit(1);
}

const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

let offset = 12;
while (offset < length) {
  const chunkLength = buffer.readUInt32LE(offset);
  const chunkType = buffer.toString('utf8', offset + 4, offset + 8);
  
  if (chunkType === 'JSON') {
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const json = JSON.parse(jsonStr);
    
    console.log("=== NODES ===");
    if (json.nodes) {
      json.nodes.forEach((n, i) => {
        let matInfo = '';
        if (n.mesh !== undefined && json.meshes && json.meshes[n.mesh]) {
          const mesh = json.meshes[n.mesh];
          const matIndices = mesh.primitives.map(p => p.material).filter(m => m !== undefined);
          if (matIndices.length > 0) {
            const matNames = matIndices.map(mi => json.materials[mi] ? json.materials[mi].name : 'unknown');
            matInfo = `(Mesh ${mesh.name || 'unnamed'}, Mats: ${matNames.join(', ')})`;
          }
        }
        console.log(`Node ${i}: ${n.name || 'unnamed'} ${matInfo}`);
      });
    }
    
    console.log("\n=== MATERIALS ===");
    if (json.materials) {
      json.materials.forEach((m, i) => {
        console.log(`Material ${i}: ${m.name || 'unnamed'}`);
      });
    }
    
    break;
  }
  
  offset += 8 + chunkLength;
}
