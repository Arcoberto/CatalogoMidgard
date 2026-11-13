// Tarifas de envío desde Guadalajara, Jalisco (Paquetería 3 Guerras).
// Clasificadas por distancia aproximada a Jalisco.

export const GDL_SHIPPING = 'Guadalajara (Zona Metropolitana)';

export const SHIPPING_RATES: { state: string; cost: number }[] = [
  { state: GDL_SHIPPING, cost: 0 },
  { state: 'Jalisco (resto del estado)', cost: 800 },

  // Colindantes / muy cercanos
  { state: 'Aguascalientes', cost: 1000 },
  { state: 'Colima', cost: 1000 },
  { state: 'Michoacán', cost: 1000 },
  { state: 'Nayarit', cost: 1000 },

  // Cercanos
  { state: 'Guanajuato', cost: 1200 },
  { state: 'Zacatecas', cost: 1200 },
  { state: 'Querétaro', cost: 1300 },
  { state: 'San Luis Potosí', cost: 1300 },

  // Distancia media
  { state: 'Ciudad de México', cost: 1500 },
  { state: 'Durango', cost: 1500 },
  { state: 'Estado de México', cost: 1500 },
  { state: 'Hidalgo', cost: 1500 },
  { state: 'Morelos', cost: 1500 },
  { state: 'Sinaloa', cost: 1500 },

  { state: 'Coahuila', cost: 1700 },
  { state: 'Guerrero', cost: 1700 },
  { state: 'Nuevo León', cost: 1700 },
  { state: 'Puebla', cost: 1700 },
  { state: 'Tlaxcala', cost: 1700 },

  // Lejanos
  { state: 'Chihuahua', cost: 1900 },
  { state: 'Oaxaca', cost: 1900 },
  { state: 'Sonora', cost: 1900 },
  { state: 'Tamaulipas', cost: 1900 },
  { state: 'Veracruz', cost: 1900 },

  { state: 'Campeche', cost: 2100 },
  { state: 'Chiapas', cost: 2100 },
  { state: 'Tabasco', cost: 2100 },

  // Más lejanos
  { state: 'Baja California', cost: 2300 },
  { state: 'Baja California Sur', cost: 2300 },
  { state: 'Quintana Roo', cost: 2300 },
  { state: 'Yucatán', cost: 2300 },
];
