const fs = require('fs');
const { parse } = require('path');
// Quick hack: write a small test using gltf-pipeline or just load it in three.js headless
// Actually, it's easier to just print the gltf hierarchy. 
const code = `
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { readFileSync } from 'fs';
import * as THREE from 'three';

const data = readFileSync('public/models/Asgard.glb');
const loader = new GLTFLoader();
loader.parse(data.buffer, '', (gltf) => {
  gltf.scene.traverse(child => {
    console.log('-'.repeat(child.parent ? 2 : 0) + child.name);
  });
}, (err) => console.error(err));
`;
// Can't easily use three.js from node without setup.
// I will just use standard regex matching but print the exact JSON structure of the GLTF.
