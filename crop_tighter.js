const sharp = require('sharp');

async function extractCenterLogo() {
  try {
    const inputPath = './public/logo.png';
    const outputPath = './public/logo_tighter.png';
    
    // Get image dimensions
    const metadata = await sharp(inputPath).metadata();
    
    // Keep only the middle 40% (cut 30% from left, 30% from right)
    const cropWidth = Math.floor(metadata.width * 0.4);
    const leftOffset = Math.floor(metadata.width * 0.3);
    const cropHeight = metadata.height;
    const topOffset = 0;

    await sharp(inputPath)
      .extract({ left: leftOffset, top: topOffset, width: cropWidth, height: cropHeight })
      .trim()
      .toFile(outputPath);
      
    console.log('Logo tightly cropped successfully.');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

extractCenterLogo();
