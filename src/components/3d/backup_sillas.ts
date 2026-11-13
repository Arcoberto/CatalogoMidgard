// =======================================================================================
// RESPALDO DE LAS POSICIONES FINALES DE LAS SILLAS (CALIBRACIÓN MANUAL EXACTA)
// Fecha: 20 de Julio de 2026
// =======================================================================================
// Estas posiciones contemplan la asimetría del pivote de la Silla en SketchUp, por
// lo cual las sillas opuestas mantienen un desfase matemático preciso para verse alineadas.

export const FINAL_CHAIR_POSITIONS = {
  // SILLA 1 (Lado A)
  s1_x: 0.65, // Punto medio exacto calibrado
  s1_z: 0.1,
  
  // SILLA 2 (Lado C) - Frente a silla 1
  s2_x: 0.25,
  s2_z: -1.3,
  
  // SILLA 3 (Lado A)
  s3_x: 1.65,
  s3_z: 0.1,
  
  // SILLA 4 (Lado C) - Frente a silla 3
  s4_x: 1.25,
  s4_z: -1.3,
  
  // SILLA 5 (Cabecera D)
  cab1_x: 1.95,
  cab1_z: -0.75, // Alineada en Z con la silla 6 compensando rotación inversa
  
  // SILLA 6 (Cabecera B)
  cab2_x: -0.15,
  cab2_z: -0.35,
};
