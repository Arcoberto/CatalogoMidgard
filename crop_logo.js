const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  try {
    const inputPath = './public/logo.png';
    const outputPath = './public/logo_processed.png';
    
    console.log('Processing logo...');
    
    // Trim whitespace/background and change color if needed
    // Assuming we want to extract the logo and make it indigo
    await sharp(inputPath)
      .trim() // Trims borders
      .toFile(outputPath);
      
    console.log('Logo cropped successfully.');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
