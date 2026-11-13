const fs = require('fs');
let content = fs.readFileSync('src/components/3d/TableViewer3D.tsx', 'utf8');

// Find the first occurrence of 'function RealModelTable() {'
const realModelIndex = content.lastIndexOf('function RealModelTable() {');
if (realModelIndex === -1) throw new Error('Not found');

const originalRealModelText = content.substring(realModelIndex);

// Reconstruct the clean header
const header = `"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center, useGLTF, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { Suspense, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Helper para crear un mapeo UV plano global (continuo entre varias mallas)
function applyGlobalPlanarUVs(mesh: THREE.Mesh, texture: THREE.Texture, texScale = 1.0, rotate90 = true) {
  if (!mesh.geometry.attributes.position) return;
  
  if (!mesh.userData.globalUVsGenerated) {
    mesh.geometry = mesh.geometry.clone();
    const pos = mesh.geometry.attributes.position;
    
    const uvArray = new Float32Array(pos.count * 2);
    mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
    
    const uv = mesh.geometry.attributes.uv;
    mesh.updateMatrixWorld(true);
    const v = new THREE.Vector3();
    
    for (let i = 0; i < pos.count; i++) {
       v.fromBufferAttribute(pos, i);
       v.applyMatrix4(mesh.matrixWorld);
       
       if (rotate90) {
          uv.setXY(i, v.z * texScale, v.x * texScale);
       } else {
          uv.setXY(i, v.x * texScale, v.z * texScale);
       }
    }
    uv.needsUpdate = true;
    mesh.userData.globalUVsGenerated = true;
  }
  
  texture.repeat.set(1, 1);
  texture.rotation = 0;
  texture.offset.set(0, 0);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
}

// Helpers para rotación matemática realista UV local
function applySmartUVs(mesh: THREE.Mesh, texture: THREE.Texture) {
  mesh.updateMatrixWorld(true);
  const bbox = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const sx = size.x;
  const sy = size.y;
  const sz = size.z;
  
  let isTapa = false;
  let isStoredTapa = false;
  let isFrame = false;
  let current: THREE.Object3D | null = mesh;
  while (current) {
    const name = current.name.toLowerCase();
    if (name.includes('tapa') || name.includes('cubierta') || name.includes('superficie_mesa') || name.includes('topeescritorio') || name.includes('superficieescritorio')) {
      isTapa = true;
      if (name.includes('cajon') || name.includes('puestas')) {
        isStoredTapa = true;
      }
    }
    if (name.includes('chambrana') || name.includes('reposabrazos') || name.includes('frame') || name.includes('apron') || 
       (name.includes('cajon') && !name.includes('tapa') && !name.includes('cubierta'))) {
      isFrame = true;
    }
    current = current.parent;
  }
  
  if (isTapa) {
    console.log('isTapa applied to mesh:', mesh.name, 'parent:', mesh.parent?.name);
  }
  
  let rot = 0;
  let rx = 1, ry = 1;
  const texScale = 1.5; // Ajuste general para madera

  if (sy > sx && sy > sz) {
    // Pata (vertical)
    rot = Math.PI / 2;
    rx = sy * texScale;
    ry = Math.max(sx, sz) * texScale;
  } else if (isFrame) {
    // Chambrana / Reposabrazos (Vertical grain requested by user)
    rot = Math.PI / 2;
    rx = sy * texScale;
    ry = Math.max(sx, sz) * texScale;
  } else {
    if (sx >= sz) {
      if (isTapa) {
        // Tapa escritorio: veta horizontal
        rot = Math.PI / 2;
        rx = sz * texScale; // Intercambiado por rotación 90deg
        ry = sx * texScale;
      } else {
        // Chambrana frontal
        rot = 0;
        rx = sx * texScale;
        ry = sz * texScale;
      }
    } else {
      if (isTapa) {
        rot = 0;
        rx = sx * texScale;
        ry = sz * texScale;
      } else {
        // Chambrana lateral
        rot = Math.PI / 2;
        rx = sz * texScale;
        ry = sx * texScale;
      }
    }
  }

  // Prevención de texturas estiradas en piezas pequeñas
  if (rx < 0.2) rx = 1;
  if (ry < 0.2) ry = 1;

  texture.repeat.set(rx, ry);
  texture.rotation = rot;
  texture.center.set(0.5, 0.5);
}
`;

fs.writeFileSync('src/components/3d/TableViewer3D.tsx', header + '\n' + originalRealModelText);
console.log('Fixed file');
