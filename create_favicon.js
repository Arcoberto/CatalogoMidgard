const sharp = require('sharp');
const fs = require('fs');

async function createFavicon() {
  try {
    const inputPath = './public/logo-indigo.png';
    const outputPath = './src/app/icon.png';
    
    // Create a 512x512 transparent square and fit the logo inside it
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: 56,
        bottom: 56,
        left: 56,
        right: 56,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath);
      
    console.log('Favicon created successfully.');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
