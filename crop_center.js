const sharp = require('sharp');
const fs = require('fs');

async function extractCenterLogo() {
  try {
    const inputPath = './public/logo.png';
    const outputPath = './public/logo_center.png';
    
    // Get image dimensions
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate crop box (cut 20% from left and right)
    const cropWidth = Math.floor(metadata.width * 0.6); // keep 60% of width
    const leftOffset = Math.floor(metadata.width * 0.2); // skip 20%
    const cropHeight = metadata.height;
    const topOffset = 0;

    await sharp(inputPath)
      .extract({ left: leftOffset, top: topOffset, width: cropWidth, height: cropHeight })
      .trim() // trim again just in case
      .toFile(outputPath);
      
    console.log('Logo cropped successfully.');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

extractCenterLogo();
