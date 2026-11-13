"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center, useGLTF, useTexture, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { Suspense, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Helper para crear un mapeo UV plano global
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
  
  let rot = 0;
  let rx = 1, ry = 1;
  const texScale = 1.5;

  if (sy > sx && sy > sz) {
    rot = Math.PI / 2;
    rx = sy * texScale;
    ry = Math.max(sx, sz) * texScale;
  } else if (isFrame) {
    rot = Math.PI / 2;
    rx = sy * texScale;
    ry = Math.max(sx, sz) * texScale;
  } else {
    if (sx >= sz) {
      if (isTapa) {
        rot = Math.PI / 2;
        rx = sz * texScale;
        ry = sx * texScale;
      } else {
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
        rot = Math.PI / 2;
        rx = sz * texScale;
        ry = sx * texScale;
      }
    }
  }

  if (rx < 0.2) rx = 1;
  if (ry < 0.2) ry = 1;

  texture.repeat.set(rx, ry);
  texture.rotation = rot;
  texture.center.set(0.5, 0.5);
}

function RealModelTable() {
  const { model, sizeType, customLength, customWidth, finish, matColor, woodTexture, isCovered, accessories, structureStyle, activeProducts } = useConfiguratorStore();
  const ledMaterials = useRef<THREE.MeshStandardMaterial[]>([]);

  const { scene } = useGLTF('/models/Asgard.glb');

  const woodTex = useTexture({
    Roble: '/textures/roble.jpg',
    Pino: '/textures/pino.jpg',
    Chocolate: '/textures/chocolate.jpg',
    Nogal: '/textures/nogal.jpg',
    Encino: '/textures/encino.jpg',
  }) as any;

  const feltTex = useTexture({
    'Rojo': '/textures/rojo-tela.jpg',
    'Tinto': '/textures/tinto-tela.jpg',
    'Naranja': '/textures/naranja-tela.jpg',
    'Amarillo': '/textures/amarillo-tela.jpg',
    'Verde': '/textures/verde-tela.jpg',
    'Verde Esmeralda': '/textures/verdeesmeralda-tela.jpg',
    'Cyan': '/textures/cyan-tela.jpg',
    'Azul': '/textures/azulclaro-tela.jpg',
    'Azul Indigo': '/textures/azul.jpg',
    'Azul Metalico': '/textures/azulmetalico-tela.jpg',
    'Morado': '/textures/morado-tela.jpg',
    'Magenta': '/textures/magenta-tela.jpg',
    'Rosa': '/textures/rosa-tela.jpg',
    'Arena': '/textures/arena-tela.jpg',
    'Gris': '/textures/gris-tela.jpg',
    'Negro': '/textures/negro-tela.jpg',
  }) as any;

  useEffect(() => {
    const setupTex = (t: any) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.colorSpace = THREE.SRGBColorSpace;
    };
    Object.values(woodTex).forEach(setupTex);
    Object.values(feltTex).forEach(setupTex);
  }, [woodTex, feltTex]);

  const activeWood = woodTex[woodTexture] || woodTex['Pino'];
  const activeFelt = feltTex[matColor] || feltTex['Azul'];
  const finishRoughness = finish === 'Mate' ? 0.9 : finish === 'Semi-Mate' ? 0.6 : 0.2;

  const prevConfig = useRef({ wood: '', felt: '', finish: '', scene: null as any, structureStyle: '' });

  useEffect(() => {
    if (!scene) return;
    if (
      prevConfig.current.wood === woodTexture &&
      prevConfig.current.felt === matColor &&
      prevConfig.current.finish === finish &&
      prevConfig.current.structureStyle === structureStyle &&
      prevConfig.current.scene === scene
    ) {
      return;
    }

    prevConfig.current = { wood: woodTexture, felt: matColor, finish: finish, structureStyle, scene };

    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          if (mesh.geometry && !mesh.userData.normalsFixed) {
            mesh.geometry.computeVertexNormals();
            mesh.userData.normalsFixed = true;
          }

          let isTapa = false;
          let isStoredTapa = false;
          let currentCheck: THREE.Object3D | null = mesh;
          while (currentCheck) {
            const name = currentCheck.name.toLowerCase();
            if (name.includes('tapa') || name.includes('cubierta') || name.includes('superficie_mesa')) isTapa = true;
            if (name.includes('cajon') || name.includes('puestas') || name.includes('guardada')) isStoredTapa = true;
            currentCheck = currentCheck.parent;
          }

          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mat) {
            const matName = mat.name.toLowerCase();
            const meshName = mesh.name.toLowerCase();

            const applyTexture = (material: THREE.MeshStandardMaterial, newTexture: THREE.Texture, scaleOverride?: number) => {
              let needsCompile = false;
              if (material.map) {
                const clonedTex = newTexture.clone();
                if (isTapa && !isStoredTapa) {
                  applyGlobalPlanarUVs(mesh, clonedTex, scaleOverride || 1.0);
                } else {
                  applySmartUVs(mesh, clonedTex); 
                  clonedTex.offset.copy(material.map.offset);
                  if (scaleOverride) clonedTex.repeat.multiplyScalar(scaleOverride);
                }
                material.map = clonedTex;
              } else {
                material.map = newTexture;
                needsCompile = true;
              }
              material.color.set('#ffffff');
              material.metalness = 0; 
              if (needsCompile) material.needsUpdate = true;
            };

            const applySolidColor = (material: THREE.MeshStandardMaterial, colorHex: string) => {
              material.map = null;
              material.color.set(colorHex);
              material.roughness = 0.6;
              material.metalness = 0;
              material.needsUpdate = true;
            };

            if (matName.includes('madera') || meshName.includes('mesh_madera')) {
              let isStructure = false;
              let current: THREE.Object3D | null = mesh;
              while (current) {
                const name = current.name.toLowerCase();
                if (name.includes('pata') || name.includes('chambrana')) {
                  isStructure = true;
                  break;
                }
                current = current.parent;
              }

              if (isStructure && (structureStyle === 'Bicolor Blanco' || structureStyle === 'Bicolor Negro')) {
                if (!mesh.userData.clonedStructureMat) {
                  mesh.userData.clonedStructureMat = mat.clone();
                }
                mesh.material = mesh.userData.clonedStructureMat;
                applySolidColor(mesh.material as THREE.MeshStandardMaterial, structureStyle === 'Bicolor Blanco' ? '#ffffff' : '#1a1a1a');
              } else {
                if (!mesh.userData.clonedWoodMat) {
                  mesh.userData.clonedWoodMat = mat.clone();
                }
                mesh.material = mesh.userData.clonedWoodMat;
                applyTexture(mesh.material as THREE.MeshStandardMaterial, activeWood);
                (mesh.material as THREE.MeshStandardMaterial).roughness = finishRoughness;
              }
            }
            
            if (matName.includes('tapiz') || meshName.includes('mesh_tapete')) {
              if (!mesh.userData.clonedFeltMat) {
                mesh.userData.clonedFeltMat = mat.clone();
              }
              mesh.material = mesh.userData.clonedFeltMat;
              applyTexture(mesh.material as THREE.MeshStandardMaterial, activeFelt);
              (mesh.material as THREE.MeshStandardMaterial).roughness = 0.9;
            }

            if (matName.includes('luz') || meshName.includes('mesh_led_difusor')) {
              if (!mat.polygonOffset) {
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = -1;
                mat.polygonOffsetUnits = -1;
                mat.needsUpdate = true;
              }
            }
          }
        }
      });
  }, [scene, woodTexture, matColor, finish, structureStyle, activeWood, activeFelt, finishRoughness]);

  useEffect(() => {
    if (scene) {
      let cupholderIndex = 1;
      ledMaterials.current = [];
      scene.traverse((child) => {
        const nodeName = child.name.toLowerCase();

        if (nodeName.startsWith('portavasos')) {
          child.visible = cupholderIndex <= accessories.cupholder;
          cupholderIndex++;
        }

        if (nodeName.startsWith('tableros_tablero')) {
          const idStr = nodeName.replace('tableros_tablero', '');
          const id = parseInt(idStr);
          if (!isNaN(id)) {
            child.visible = id <= accessories.extension;
          }
        }

        if (nodeName.startsWith('recurso_recursos')) {
          const idStr = nodeName.replace('recurso_recursos', '');
          const id = parseInt(idStr);
          if (!isNaN(id)) {
            child.visible = id <= accessories.resourceBox;
          }
        }

        // Ocultar cualquier nodo (grupo o malla) que sea el LED
        if (nodeName.includes('luz') || nodeName.includes('led')) {
          child.visible = accessories.led && model !== 'Midgard';
        }

        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach(m => {
            const mat = m as THREE.MeshStandardMaterial;
            if (!mat) return;
            
            const matName = (mat.name || '').toLowerCase();
            if (matName.includes('luz') || nodeName.includes('luz') || nodeName.includes('led')) {
              const isLedVisible = accessories.led && model !== 'Midgard';
              mesh.visible = isLedVisible;
              if (isLedVisible) {
                mat.emissiveIntensity = 3.5; 
                ledMaterials.current.push(mat);
              } else {
                mat.emissiveIntensity = 0;
                mat.emissive.set('#000000');
              }
            }
          });
        }
      });
    }
  }, [scene, accessories.led, accessories.cupholder, accessories.extension, accessories.resourceBox, model]);

  useEffect(() => {
    if (!scene) return;
    const hasDrawer = accessories.drawer;

    scene.traverse((child) => {
      const rawName = child.name ? child.name.toLowerCase() : '';
      const cleanName = rawName.replace(/[\s_]+/g, '');
      
      const isTableStructure = (cleanName.includes('pata') || cleanName.includes('cubierta') || cleanName.includes('chambrana') || cleanName.includes('reposabrazo') || cleanName.includes('alfombra') || cleanName.includes('superficie')) && !cleanName.includes('cajon');
      
      if (isTableStructure) {
           const isMidgardNode = rawName.includes('#1') || cleanName.includes('midgard');
           const shouldBeVisible = (model === 'Midgard' && isMidgardNode) || (model === 'Asgard' && !isMidgardNode);
           
           child.visible = shouldBeVisible;
           child.traverse(c => { c.visible = shouldBeVisible; });
           
           if (!shouldBeVisible) {
               return;
           }
        }
        if (cleanName === 'cubierta' || cleanName.startsWith('cubierta') || cleanName === 'tapasprincipales' || cleanName.includes('superficie-midgard') || cleanName.includes('cubierta#1')) {
        const v = isCovered;
        child.visible = v;
        child.traverse((c) => { c.visible = v; });
      } else if (cleanName.includes('cajoncompleto') || cleanName === 'cajon' || cleanName.includes('planta1') || cleanName === 'cajonsuperficie') {
        const v = hasDrawer;
        child.visible = v;
        child.traverse((c) => { c.visible = v; });
      } else if (cleanName.includes('tapaspuestascajon')) {
        const v = hasDrawer && !isCovered;
        child.visible = v;
        child.traverse((c) => { c.visible = v; });
      } else if (cleanName.includes('macetas1') || cleanName.includes('tapaderacajon') || cleanName.includes('geom3dtapaderacajon') || cleanName.includes('maceta')) {
        const v = hasDrawer && isCovered;
        child.visible = v;
        child.traverse((c) => { c.visible = v; });
      }
    });
  }, [scene, isCovered, accessories.drawer, model]);

  useFrame((state) => {
    if (ledMaterials.current.length > 0) {
      const time = state.clock.getElapsedTime();
      const TOTAL_CYCLE = 15;
      const cycleTime = time % TOTAL_CYCLE;
      
      const color = new THREE.Color();
      
      if (cycleTime < 5) {
        color.set('#ffffff');
      } else {
        const hue = (cycleTime - 5) / 10; 
        color.setHSL(hue, 1, 0.6);
      }
      
      ledMaterials.current.forEach(mat => {
        mat.emissive.copy(color);
        mat.color.copy(color);
      });
    }
  });

  let scaleX = 1;
  let scaleZ = 1;
  if (sizeType === 'custom') {
    scaleX = customLength / 170;
    scaleZ = customWidth / 110;
  }

  return (
    <group>
      <group scale={[scaleX, 1, scaleZ]}>
        {activeProducts.table && <primitive object={scene} />}
      </group>
      {activeProducts.shelf && <ShelfModel woodTex={woodTex} />}
      {activeProducts.desk && <DeskModel woodTex={woodTex} />}
      {activeProducts.table && accessories.chairs > 0 && <ChairsGroup woodTex={woodTex} feltTex={feltTex} chairsCount={accessories.chairs} />}
    </group>
  );
}

function ShelfModel({ woodTex }: { woodTex: any }) {
  const { shelfFinish, shelfWoodTexture, structureStyle } = useConfiguratorStore();
  const { scene } = useGLTF('/models/Estante.glb');
  const finishRoughness = shelfFinish === 'Mate' ? 0.9 : shelfFinish === 'Semi-Mate' ? 0.6 : 0.2;
  
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        if (mesh.geometry && !mesh.userData.normalsFixed) {
          mesh.geometry.computeVertexNormals();
          mesh.userData.normalsFixed = true;
        }

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const meshName = (mesh.name || '').toLowerCase();

        materials.forEach((m, index) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (!mat) return;
            
          let isWood = meshName.includes('repisa') || meshName.includes('madera');
          let current: THREE.Object3D | null = mesh;
          while (current) {
            const name = (current.name || '').toLowerCase();
            if (name.includes('repisa') || name.includes('madera')) isWood = true;
            current = current.parent;
          }

          if (isWood) {
            if (!mesh.userData.clonedWoodMat) mesh.userData.clonedWoodMat = mat.clone();
            const targetMat = mesh.userData.clonedWoodMat;
            const activeWood = woodTex[shelfWoodTexture] || woodTex['Pino'];
            targetMat.map = activeWood.clone();
            targetMat.color.set('#ffffff');
            targetMat.roughness = finishRoughness;
            targetMat.metalness = 0;
            targetMat.needsUpdate = true;
            
            if (Array.isArray(mesh.material)) {
              (mesh.material as THREE.Material[])[index] = targetMat;
            } else {
              mesh.material = targetMat;
            }
          }
        });
      }
    });
  }, [scene, shelfFinish, shelfWoodTexture, woodTex, structureStyle]);

  return (
    <group position={[0, 0, -2.5]}>
      <primitive object={scene} />
    </group>
  );
}

function DeskModel({ woodTex }: { woodTex: any }) {
  const { deskFinish, deskWoodTexture, structureStyle } = useConfiguratorStore();
  const { scene } = useGLTF('/models/Escritorio.glb');
  const finishRoughness = deskFinish === 'Mate' ? 0.9 : deskFinish === 'Semi-Mate' ? 0.6 : 0.2;

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const meshName = (mesh.name || '').toLowerCase();

        materials.forEach((m, index) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (!mat) return;
          const matName = (mat.name || '').toLowerCase();
          
          let isWood = meshName.includes('madera') || meshName.includes('cubierta') || matName.includes('plywood') || matName.includes('wood');
          let current: THREE.Object3D | null = mesh;
          while (current) {
            const name = (current.name || '').toLowerCase();
            if (name.includes('madera') || name.includes('cubierta')) isWood = true;
            current = current.parent;
          }

          if (isWood) {
            if (!mesh.userData.clonedWoodMat) mesh.userData.clonedWoodMat = mat.clone();
            const targetMat = mesh.userData.clonedWoodMat;
            const activeWood = woodTex[deskWoodTexture] || woodTex['Pino'];
            targetMat.map = activeWood.clone();
            targetMat.color.set('#ffffff');
            targetMat.roughness = finishRoughness;
            targetMat.metalness = 0;
            targetMat.needsUpdate = true;
            
            if (Array.isArray(mesh.material)) {
              (mesh.material as THREE.Material[])[index] = targetMat;
            } else {
              mesh.material = targetMat;
            }
          } else {
            if (!mesh.userData.clonedMetalMat) mesh.userData.clonedMetalMat = mat.clone();
            const targetMat = mesh.userData.clonedMetalMat;
            targetMat.map = null;
            if (structureStyle === 'Bicolor Blanco') {
              targetMat.color.set('#ffffff');
            } else {
              targetMat.color.set('#1a1a1a');
            }
            targetMat.roughness = 0.8;
            targetMat.metalness = 0.5;
            targetMat.needsUpdate = true;
            
            if (Array.isArray(mesh.material)) {
              (mesh.material as THREE.Material[])[index] = targetMat;
            } else {
              mesh.material = targetMat;
            }
          }
        });
      }
    });
  }, [scene, deskFinish, deskWoodTexture, woodTex, structureStyle]);

  return (
    <group position={[1.8, 0, 0.8]}>
      <primitive object={scene} />
    </group>
  );
}

function ChairsGroup({ woodTex, feltTex, chairsCount }: { woodTex: any, feltTex: any, chairsCount: number }) {
  const positions: Array<{ pos: [number, number, number], rot: [number, number, number] }> = [];
  // =======================================================================================
  // ⚠️ ATENCIÓN: POSICIONES FINALES DE LAS SILLAS (NO MODIFICAR) ⚠️
  // Estas posiciones han sido calibradas manualmente y aprobadas por el usuario.
  // Cualquier cambio en esta lógica destruirá la alineación milimétrica de las sillas.
  // =======================================================================================
  // SILLA 1 (Lado A)
  const s1_x = 0.65; // Punto medio exacto entre 0.25 (muy izquierda) y 1.05 (muy derecha)
  const s1_z = 0.1;
  // SILLA 2 (Lado C)
  const s2_x = 0.25;
  const s2_z = -1.3;
  // SILLA 3 (Lado A)
  const s3_x = 1.65; 
  const s3_z = 0.1;
  // SILLA 4 (Lado C)
  const s4_x = 1.25; // Alineada exactamente frente a la Silla 3 (compensando el pivote)
  const s4_z = -1.3;
  // SILLA 5 (Cabecera D)
  const cab1_x = 1.95; 
  const cab1_z = -0.75; // Alineada en Z con la silla 6 compensando su rotación inversa
  // SILLA 6 (Cabecera B)
  const cab2_x = -0.15;
  const cab2_z = -0.35;

  if (chairsCount >= 1) positions.push({ pos: [s1_x, 0, s1_z], rot: [0, Math.PI, 0] });
  if (chairsCount >= 2) positions.push({ pos: [s2_x, 0, s2_z], rot: [0, 0, 0] });
  if (chairsCount >= 3) positions.push({ pos: [s3_x, 0, s3_z], rot: [0, Math.PI, 0] });
  if (chairsCount >= 4) positions.push({ pos: [s4_x, 0, s4_z], rot: [0, 0, 0] });
  if (chairsCount >= 5) positions.push({ pos: [cab1_x, 0, cab1_z], rot: [0, -Math.PI / 2, 0] });
  if (chairsCount >= 6) positions.push({ pos: [cab2_x, 0, cab2_z], rot: [0, Math.PI / 2, 0] });

  return (
    <group>
      {positions.map((config, index) => (
        <ChairModel 
          key={index} 
          position={config.pos} 
          rotation={config.rot} 
          woodTex={woodTex} 
          feltTex={feltTex} 
        />
      ))}
    </group>
  );
}

function ChairModel({ position, rotation, woodTex, feltTex }: { position: [number, number, number], rotation: [number, number, number], woodTex: any, feltTex: any }) {
  const { finish, woodTexture, matColor } = useConfiguratorStore();
  const { scene } = useGLTF('/models/Silla.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const meshName = (mesh.name || '').toLowerCase();
        
        materials.forEach((m, index) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (!mat) return;
          const name = (mat.name || '').toLowerCase();
          
          let isWood = name.includes('madera') || name.includes('wood') || name.includes('plywood') || meshName.includes('madera') || meshName.includes('wood');
          let isFelt = name.includes('tapiz') || name.includes('tela') || name === '*2' || name.includes('carpet') || meshName.includes('tapiz') || meshName.includes('tela');
          
          // SketchUp a menudo deja las mallas sin nombre y le pone el nombre al nodo padre
          let current: THREE.Object3D | null = mesh;
          while (current) {
            const cName = (current.name || '').toLowerCase();
            if (cName.includes('madera') || cName.includes('wood')) isWood = true;
            if (cName.includes('tapiz') || cName.includes('tela')) isFelt = true;
            current = current.parent;
          }
          
          if (isWood) {
            if (!mesh.userData.clonedWoodMat) mesh.userData.clonedWoodMat = mat.clone();
            const targetMat = mesh.userData.clonedWoodMat;
            const activeWood = woodTex[woodTexture] || woodTex['Pino'];
            targetMat.map = activeWood.clone();
            targetMat.color.set('#ffffff');
            targetMat.metalness = 0;
            targetMat.needsUpdate = true;
            
            if (Array.isArray(mesh.material)) {
              (mesh.material as THREE.Material[])[index] = targetMat;
            } else {
              mesh.material = targetMat;
            }
          }
          if (isFelt) {
            if (!mesh.userData.clonedFeltMat) mesh.userData.clonedFeltMat = mat.clone();
            const targetMat = mesh.userData.clonedFeltMat;
            const activeFelt = feltTex[matColor] || feltTex['Azul'];
            targetMat.map = activeFelt.clone();
            targetMat.color.set('#ffffff');
            targetMat.metalness = 0;
            targetMat.needsUpdate = true;
            
            if (Array.isArray(mesh.material)) {
              (mesh.material as THREE.Material[])[index] = targetMat;
            } else {
              mesh.material = targetMat;
            }
          }
        });
      }
    });
  }, [clonedScene, finish, woodTexture, matColor, woodTex, feltTex]);

  return (
    <group position={position} rotation={rotation}>
      <primitive object={clonedScene} />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}





function StaticCenter({ children, position }: { children: React.ReactNode, position?: [number, number, number] }) {
  const innerGroupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (innerGroupRef.current) {
      const box = new THREE.Box3().setFromObject(innerGroupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      innerGroupRef.current.position.set(-center.x, -(center.y - size.y / 2), -center.z);
    }
  }, []);

  return (
    <group position={position}>
      <group ref={innerGroupRef}>
        {children}
      </group>
    </group>
  );
}

function CameraController() {
  const { activeProducts } = useConfiguratorStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    camera.position.set(3, 4, 1);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  useEffect(() => {
    const onReset = () => handleReset();
    // Vistas de cámara predefinidas: 'general' | 'frontal' | 'superior'
    const VIEWS: Record<string, { pos: [number, number, number]; target: [number, number, number] }> = {
      general: { pos: [3, 4, 1], target: [0, 0, 0] },
      frontal: { pos: [0, 1.2, 4], target: [0, 0, 0] },
      superior: { pos: [0, 6, 0.01], target: [0, 0, 0] },
    };
    const onView = (e: Event) => {
      const v = VIEWS[(e as CustomEvent<string>).detail];
      if (!v) return;
      camera.position.set(...v.pos);
      if (controlsRef.current) {
        controlsRef.current.target.set(...v.target);
        controlsRef.current.update();
      }
    };
    window.addEventListener('reset-camera', onReset);
    window.addEventListener('set-camera-view', onView);
    return () => {
      window.removeEventListener('reset-camera', onReset);
      window.removeEventListener('set-camera-view', onView);
    };
  }, [camera]);

  useEffect(() => {
    // Si solo el estante está activo, enfocarlo
    if (activeProducts.shelf && !activeProducts.table && !activeProducts.desk) {
      camera.position.set(2.5, 1.5, -0.5);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0.9, -2.5);
        controlsRef.current.update();
      }
    } else if (activeProducts.desk && !activeProducts.table && !activeProducts.shelf) {
      // Si solo el escritorio está activo, enfocarlo
      camera.position.set(3.5, 1.5, 1.5);
      if (controlsRef.current) {
        // Al reducir target X (ej: 1.4), el escritorio (que está en X=1.8) se moverá más hacia la derecha de la pantalla
        controlsRef.current.target.set(1.4, 0.5, 0.8);
        controlsRef.current.update();
      }
    } else {
      // De lo contrario, regresar a la vista de la mesa por defecto
      handleReset();
    }
  }, [activeProducts.table, activeProducts.shelf, activeProducts.desk, camera]);

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={false}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2 + 0.1}
      minDistance={1.5}
      maxDistance={9}
    />
  );
}

export function TableViewer3D() {
  const ambientLightIntensity = 0.25;
  const dirLight1Intensity = 0.65;
  const dirLight2Intensity = 0.25;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [3, 4, 1], fov: 45 }}>
        <color attach="background" args={['#e5e7eb']} />
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight 
          castShadow 
          position={[5, 5, 5]} 
          intensity={dirLight1Intensity} 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={dirLight2Intensity} />
        
        <Suspense fallback={<Loader />}>
          <StaticCenter position={[0, -0.5, 0]}>
            <RealModelTable />
          </StaticCenter>
          
          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.65} 
            scale={10} 
            blur={2.5} 
            far={4} 
            resolution={512}
          />
          <Environment preset="city" background={false} environmentIntensity={0.75} />
        </Suspense>

        <CameraController />
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
