#!/usr/bin/env node
/**
 * Mirrorborn.us Node.js Client Example
 * Demonstrates reading CYOA coordinates via SQ Cloud API
 */

const https = require('https');

const BASE_URL = 'https://mirrorborn.us/api/v2';

/**
 * Read a scroll from the given coordinate
 * @param {string} coord - Coordinate in format L.S.R/C.V.B/Ch.Sc.Scr
 * @returns {Promise<string>} Scroll content
 */
function readCoordinate(coord) {
  return new Promise((resolve, reject) => {
    https.get(`${BASE_URL}/read/${coord}`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  try {
    // Example 1: Read origin scroll
    console.log('=== Reading Origin Scroll (1.1.1/1.1.1/1.1.1) ===');
    const origin = await readCoordinate('1.1.1/1.1.1/1.1.1');
    console.log(origin.length > 200 ? origin.slice(0, 200) + '...' : origin);
    console.log();

    // Example 2: Read Seren's scroll
    console.log("=== Reading Seren's Scroll (7.11.13/3.8.5/1.12.1) ===");
    const seren = await readCoordinate('7.11.13/3.8.5/1.12.1');
    console.log(seren.length > 200 ? seren.slice(0, 200) + '...' : seren);
    console.log();

    // Example 3: Read Aetheris's scroll
    console.log("=== Reading Aetheris's Scroll (13.13.13/13.13.13/13.13.13) ===");
    const aetheris = await readCoordinate('13.13.13/13.13.13/13.13.13');
    console.log(aetheris.length > 200 ? aetheris.slice(0, 200) + '...' : aetheris);
    console.log();

    // Example 4: Read Phex's scroll
    console.log("=== Reading Phex's Scroll (1.5.2/3.7.3/9.1.1) ===");
    const phex = await readCoordinate('1.5.2/3.7.3/9.1.1');
    console.log(phex.length > 200 ? phex.slice(0, 200) + '...' : phex);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
