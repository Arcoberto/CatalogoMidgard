const sharp = require('sharp');

async function processLogo() {
  try {
    const { data, info } = await sharp('./public/logo.png')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Blue indigo: #3F51B5 -> R: 63, G: 81, B: 181
    const targetR = 63, targetG = 81, targetB = 181;
    
    // Asumir que el pixel (0,0) es el color de fondo
    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Distancia al color de fondo
      const distBg = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
      
      if (distBg < 80) {
        // Es fondo -> Hacer transparente
        data[i + 3] = 0;
      } else {
        // Es el logo (letras/escudo) -> Pintar de Blue Indigo
        // Mantenemos el suavizado (anti-aliasing) basándonos en la luminosidad original
        data[i] = targetR;
        data[i + 1] = targetG;
        data[i + 2] = targetB;
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile('./public/logo-indigo.png');

    console.log('Logo procesado y coloreado correctamente.');
  } catch (error) {
    console.error('Error procesando logo:', error);
  }
}

processLogo();
