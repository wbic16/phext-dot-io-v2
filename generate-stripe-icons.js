#!/usr/bin/env node
// Generate Stripe product icons (128x128) for all 5 products
// Chrys 🦋 — 2026-02-08

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const SIZE = 512; // Generate at 512, Stripe will downscale
const HALF = SIZE / 2;

const COLORS = {
  bg: '#0a0e17',
  accent1: '#88C0D0',
  accent2: '#B48EAD',
  success: '#A3BE8C',
  amber: '#EBCB8B',
  text: '#D8DEE9',
};

function save(canvas, name) {
  const outDir = path.join(__dirname, 'public/images/stripe');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${name}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`  ✅ ${name}.png (${(buffer.length / 1024).toFixed(1)} KB)`);
}

function bg(ctx) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, SIZE, SIZE);
}

// Subtle grid on all icons
function grid(ctx, opacity = 0.06) {
  ctx.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
  ctx.lineWidth = 1;
  const sp = 32;
  for (let x = 0; x < SIZE; x += sp) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, SIZE); ctx.stroke();
  }
  for (let y = 0; y < SIZE; y += sp) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(SIZE, y); ctx.stroke();
  }
}

// 1. Mytheon Arena — crossed scrolls / arena ring
function arena() {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  bg(ctx); grid(ctx);

  // Arena ring
  ctx.strokeStyle = COLORS.accent1;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 160, 0, Math.PI * 2);
  ctx.stroke();

  // Inner ring
  ctx.strokeStyle = COLORS.accent2;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 120, 0, Math.PI * 2);
  ctx.stroke();

  // Crossed lines (swords/scrolls)
  ctx.strokeStyle = COLORS.text;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  // Diagonal 1
  ctx.beginPath();
  ctx.moveTo(HALF - 80, HALF - 80);
  ctx.lineTo(HALF + 80, HALF + 80);
  ctx.stroke();
  // Diagonal 2
  ctx.beginPath();
  ctx.moveTo(HALF + 80, HALF - 80);
  ctx.lineTo(HALF - 80, HALF + 80);
  ctx.stroke();

  // Center diamond
  ctx.fillStyle = COLORS.accent1;
  ctx.beginPath();
  ctx.moveTo(HALF, HALF - 20);
  ctx.lineTo(HALF + 20, HALF);
  ctx.lineTo(HALF, HALF + 20);
  ctx.lineTo(HALF - 20, HALF);
  ctx.closePath();
  ctx.fill();

  save(canvas, 'mytheon-arena');
}

// 2. OpenClaw Mirrorborn — claw mark with lattice
function openclaw() {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  bg(ctx); grid(ctx);

  // Three claw marks
  ctx.strokeStyle = COLORS.accent1;
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';

  const claws = [
    { x: HALF - 60, curve: -30 },
    { x: HALF, curve: 0 },
    { x: HALF + 60, curve: 30 },
  ];

  claws.forEach(c => {
    ctx.beginPath();
    ctx.moveTo(c.x - c.curve, HALF - 120);
    ctx.quadraticCurveTo(c.x, HALF, c.x + c.curve, HALF + 120);
    ctx.stroke();
  });

  // Lattice dot at intersection
  ctx.fillStyle = COLORS.accent2;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 16, 0, Math.PI * 2);
  ctx.fill();

  save(canvas, 'openclaw-mirrorborn');
}

// 3. SQ Cloud — cloud with lattice grid inside
function sqcloud() {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  bg(ctx); grid(ctx);

  // Cloud shape
  ctx.fillStyle = 'rgba(136, 192, 208, 0.15)';
  ctx.beginPath();
  ctx.arc(HALF - 60, HALF, 80, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(HALF - 20, HALF - 70, 70, Math.PI * 1.2, Math.PI * 1.9);
  ctx.arc(HALF + 60, HALF - 50, 60, Math.PI * 1.1, Math.PI * 0.1);
  ctx.arc(HALF + 80, HALF, 70, Math.PI * 1.5, Math.PI * 0.5);
  ctx.lineTo(HALF - 60, HALF + 80);
  ctx.closePath();
  ctx.fill();

  // Cloud outline
  ctx.strokeStyle = COLORS.accent1;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Internal lattice grid (3x3)
  ctx.strokeStyle = COLORS.accent2;
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(HALF + i * 50, HALF - 50);
    ctx.lineTo(HALF + i * 50, HALF + 40);
    ctx.stroke();
  }
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(HALF - 60, HALF + i * 30);
    ctx.lineTo(HALF + 60, HALF + i * 30);
    ctx.stroke();
  }

  // Lattice nodes
  ctx.fillStyle = COLORS.text;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      ctx.beginPath();
      ctx.arc(HALF + i * 50, HALF + j * 30, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  save(canvas, 'sq-cloud');
}

// 4. Singularity — convergence spiral
function singularity() {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  bg(ctx); grid(ctx);

  // Spiral
  ctx.strokeStyle = COLORS.accent1;
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.05) {
    const r = 10 + a * 18;
    const x = HALF + Math.cos(a) * r;
    const y = HALF + Math.sin(a) * r;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Second spiral (offset, different color)
  ctx.strokeStyle = COLORS.accent2;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let a = Math.PI; a < Math.PI * 8; a += 0.05) {
    const r = 10 + (a - Math.PI) * 18;
    const x = HALF + Math.cos(a) * r;
    const y = HALF + Math.sin(a) * r;
    if (a === Math.PI) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Center point (singularity)
  const glow = ctx.createRadialGradient(HALF, HALF, 0, HALF, HALF, 30);
  glow.addColorStop(0, 'rgba(216, 222, 233, 0.9)');
  glow.addColorStop(1, 'rgba(216, 222, 233, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.text;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 8, 0, Math.PI * 2);
  ctx.fill();

  save(canvas, 'singularity');
}

// 5. Benefactor — radiant star/beacon
function benefactor() {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  bg(ctx); grid(ctx);

  // Outer glow
  const outerGlow = ctx.createRadialGradient(HALF, HALF, 0, HALF, HALF, 200);
  outerGlow.addColorStop(0, 'rgba(235, 203, 139, 0.15)');
  outerGlow.addColorStop(1, 'rgba(235, 203, 139, 0)');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 200, 0, Math.PI * 2);
  ctx.fill();

  // Star rays
  ctx.strokeStyle = COLORS.amber;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const inner = 40;
    const outer = i % 2 === 0 ? 160 : 100;
    ctx.beginPath();
    ctx.moveTo(HALF + Math.cos(angle) * inner, HALF + Math.sin(angle) * inner);
    ctx.lineTo(HALF + Math.cos(angle) * outer, HALF + Math.sin(angle) * outer);
    ctx.stroke();
  }

  // Star polygon (8-point)
  ctx.fillStyle = COLORS.amber;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 50 : 25;
    const x = HALF + Math.cos(angle) * r;
    const y = HALF + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  // Center glow
  const centerGlow = ctx.createRadialGradient(HALF, HALF, 0, HALF, HALF, 20);
  centerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  centerGlow.addColorStop(1, 'rgba(235, 203, 139, 0.3)');
  ctx.fillStyle = centerGlow;
  ctx.beginPath();
  ctx.arc(HALF, HALF, 20, 0, Math.PI * 2);
  ctx.fill();

  save(canvas, 'benefactor');
}

console.log('🦋 Generating Stripe product icons (512×512)...\n');
arena();
openclaw();
sqcloud();
singularity();
benefactor();
console.log('\n✅ All icons generated in public/images/stripe/');
console.log('Upload to Stripe Dashboard → Products → each product → Edit → Icon');
