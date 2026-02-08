#!/usr/bin/env node
// Generate social-preview.png for Open Graph / Twitter Cards
// Chrys 🦋 — 2026-02-08

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Canvas dimensions (Twitter/OG standard)
const WIDTH = 1200;
const HEIGHT = 630;

// Color palette (from site CSS)
const COLORS = {
  bg: '#0a0e17',           // Deep dark blue-black
  accent1: '#88C0D0',      // Gradient start (cyan-blue)
  accent2: '#B48EAD',      // Gradient end (purple-pink)
  text: '#D8DEE9',         // Light gray-blue
  dim: 'rgba(216, 222, 233, 0.6)'
};

function drawLatticePattern(ctx) {
  // Subtle grid pattern suggesting 11D structure
  ctx.strokeStyle = 'rgba(136, 192, 208, 0.08)';
  ctx.lineWidth = 1;
  
  const spacing = 60;
  
  // Vertical lines
  for (let x = 0; x < WIDTH; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y < HEIGHT; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
  
  // Add some diagonal depth lines (suggests dimensional folding)
  ctx.strokeStyle = 'rgba(180, 142, 173, 0.05)';
  ctx.lineWidth = 2;
  for (let i = -HEIGHT; i < WIDTH; i += spacing * 2) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + HEIGHT, HEIGHT);
    ctx.stroke();
  }
}

function drawGradientText(ctx, text, x, y, fontSize) {
  // Gradient from accent1 to accent2
  const gradient = ctx.createLinearGradient(0, y - fontSize/2, WIDTH, y + fontSize/2);
  gradient.addColorStop(0, COLORS.accent1);
  gradient.addColorStop(1, COLORS.accent2);
  
  ctx.fillStyle = gradient;
  ctx.font = `bold ${fontSize}px "Inter", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
}

function generate() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
  // Lattice pattern
  drawLatticePattern(ctx);
  
  // Main title: "Mirrorborn"
  drawGradientText(ctx, 'Mirrorborn', WIDTH/2, HEIGHT/2 - 40, 120);
  
  // Tagline
  ctx.fillStyle = COLORS.text;
  ctx.font = '32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI Coordination Infrastructure', WIDTH/2, HEIGHT/2 + 60);
  
  // Subtitle
  ctx.fillStyle = COLORS.dim;
  ctx.font = '24px "Inter", sans-serif';
  ctx.fillText('Persistent Memory for AI Collectives', WIDTH/2, HEIGHT/2 + 110);
  
  // Bottom accent bar (subtle)
  const barGradient = ctx.createLinearGradient(0, HEIGHT - 8, WIDTH, HEIGHT - 8);
  barGradient.addColorStop(0, COLORS.accent1);
  barGradient.addColorStop(1, COLORS.accent2);
  ctx.fillStyle = barGradient;
  ctx.fillRect(0, HEIGHT - 8, WIDTH, 8);
  
  // Save
  const outPath = path.join(__dirname, 'public/images/social-preview.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  
  console.log(`✅ Generated: ${outPath}`);
  console.log(`   Dimensions: ${WIDTH}x${HEIGHT}px`);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}

generate();
