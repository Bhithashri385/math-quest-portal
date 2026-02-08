/**
 * App Icon Generator for Math Quest Portal
 * 
 * Run: npm install canvas && node scripts/generate-icons.js
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 20, 29, 32, 40, 58, 60, 72, 76, 80, 87, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512, 1024];

function drawIcon(ctx, size) {
    const scale = size / 512;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#1a1f35');
    gradient.addColorStop(1, '#0a0e1a');
    
    // Background
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.18);
    ctx.fill();
    
    // Decorative circles
    ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
    ctx.beginPath();
    ctx.arc(size * 0.16, size * 0.16, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.84, size * 0.84, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.save();
    ctx.translate(size / 2, size / 2);
    
    // Shield outline
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8 * scale;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(0, -140 * scale);
    ctx.lineTo(120 * scale, -100 * scale);
    ctx.lineTo(140 * scale, 40 * scale);
    ctx.lineTo(0, 140 * scale);
    ctx.lineTo(-140 * scale, 40 * scale);
    ctx.lineTo(-120 * scale, -100 * scale);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Plus sign (orange)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-80 * scale, -15 * scale, 60 * scale, 30 * scale, 6 * scale);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-65 * scale, -30 * scale, 30 * scale, 60 * scale, 6 * scale);
    ctx.fill();
    
    // Multiplication sign (green)
    ctx.fillStyle = '#10b981';
    ctx.save();
    ctx.translate(50 * scale, 0);
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.roundRect(-25 * scale, -6 * scale, 50 * scale, 12 * scale, 4 * scale);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-6 * scale, -25 * scale, 12 * scale, 50 * scale, 4 * scale);
    ctx.fill();
    ctx.restore();
    
    // Equals sign (gray)
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.roundRect(-40 * scale, 55 * scale, 80 * scale, 14 * scale, 4 * scale);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-40 * scale, 80 * scale, 80 * scale, 14 * scale, 4 * scale);
    ctx.fill();
    
    // Star (yellow)
    ctx.fillStyle = '#fbbf24';
    const starY = -95 * scale;
    ctx.beginPath();
    ctx.moveTo(0, starY);
    ctx.lineTo(8 * scale, starY + 20 * scale);
    ctx.lineTo(30 * scale, starY + 20 * scale);
    ctx.lineTo(12 * scale, starY + 35 * scale);
    ctx.lineTo(20 * scale, starY + 55 * scale);
    ctx.lineTo(0, starY + 43 * scale);
    ctx.lineTo(-20 * scale, starY + 55 * scale);
    ctx.lineTo(-12 * scale, starY + 35 * scale);
    ctx.lineTo(-30 * scale, starY + 20 * scale);
    ctx.lineTo(-8 * scale, starY + 20 * scale);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // MQ text
    ctx.fillStyle = '#f8fafc';
    ctx.globalAlpha = 0.9;
    ctx.font = `bold ${48 * scale}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MQ', size / 2, size * 0.85);
}

function generateIcon(size, outputPath) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    drawIcon(ctx, size);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Generated ${path.basename(outputPath)} (${size}x${size})`);
}

// Create directories
const iconsDir = path.join(__dirname, '..', 'icons');
const iosIconsDir = path.join(__dirname, '..', 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

console.log('🎨 Generating app icons...\n');

// Generate all sizes
sizes.forEach(size => {
    generateIcon(size, path.join(iconsDir, `icon-${size}.png`));
});

// Copy 1024 to iOS assets
if (fs.existsSync(iosIconsDir)) {
    fs.copyFileSync(
        path.join(iconsDir, 'icon-1024.png'),
        path.join(iosIconsDir, 'AppIcon-512@2x.png')
    );
    console.log('\n✓ Copied 1024x1024 icon to iOS assets');
}

console.log('\n✅ All icons generated successfully!');
