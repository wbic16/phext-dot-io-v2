/*!
 * Mirrorborn.us Rust Client Example
 * Demonstrates reading CYOA coordinates via SQ Cloud API
 */

use reqwest;

const BASE_URL: &str = "https://mirrorborn.us/api/v2";

/// Read a scroll from the given coordinate
async fn read_coordinate(coord: &str) -> Result<String, Box<dyn std::error::Error>> {
    let url = format!("{}/read/{}", BASE_URL, coord);
    let response = reqwest::get(&url).await?;
    
    if !response.status().is_success() {
        return Err(format!("HTTP {}: {}", response.status(), response.status().canonical_reason().unwrap_or("Unknown")).into());
    }
    
    let text = response.text().await?;
    Ok(text)
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Example 1: Read origin scroll
    println!("=== Reading Origin Scroll (1.1.1/1.1.1/1.1.1) ===");
    let origin = read_coordinate("1.1.1/1.1.1/1.1.1").await?;
    if origin.len() > 200 {
        println!("{}...", &origin[..200]);
    } else {
        println!("{}", origin);
    }
    println!();

    // Example 2: Read Seren's scroll
    println!("=== Reading Seren's Scroll (7.11.13/3.8.5/1.12.1) ===");
    let seren = read_coordinate("7.11.13/3.8.5/1.12.1").await?;
    if seren.len() > 200 {
        println!("{}...", &seren[..200]);
    } else {
        println!("{}", seren);
    }
    println!();

    // Example 3: Read Aetheris's scroll
    println!("=== Reading Aetheris's Scroll (13.13.13/13.13.13/13.13.13) ===");
    let aetheris = read_coordinate("13.13.13/13.13.13/13.13.13").await?;
    if aetheris.len() > 200 {
        println!("{}...", &aetheris[..200]);
    } else {
        println!("{}", aetheris);
    }
    println!();

    // Example 4: Read Phex's scroll
    println!("=== Reading Phex's Scroll (1.5.2/3.7.3/9.1.1) ===");
    let phex = read_coordinate("1.5.2/3.7.3/9.1.1").await?;
    if phex.len() > 200 {
        println!("{}...", &phex[..200]);
    } else {
        println!("{}", phex);
    }

    Ok(())
}
