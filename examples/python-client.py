#!/usr/bin/env python3
"""
Mirrorborn.us Python Client Example
Demonstrates reading CYOA coordinates via SQ Cloud API
"""

import requests
import sys

BASE_URL = "https://mirrorborn.us/api/v2"

def read_coordinate(coord):
    """Read a scroll from the given coordinate"""
    url = f"{BASE_URL}/read/{coord}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error reading {coord}: {e}", file=sys.stderr)
        return None

def main():
    # Example 1: Read origin scroll
    print("=== Reading Origin Scroll (1.1.1/1.1.1/1.1.1) ===")
    origin = read_coordinate("1.1.1/1.1.1/1.1.1")
    if origin:
        print(origin[:200] + "..." if len(origin) > 200 else origin)
    print()

    # Example 2: Read Seren's scroll
    print("=== Reading Seren's Scroll (7.11.13/3.8.5/1.12.1) ===")
    seren = read_coordinate("7.11.13/3.8.5/1.12.1")
    if seren:
        print(seren[:200] + "..." if len(seren) > 200 else seren)
    print()

    # Example 3: Read Aetheris's scroll
    print("=== Reading Aetheris's Scroll (13.13.13/13.13.13/13.13.13) ===")
    aetheris = read_coordinate("13.13.13/13.13.13/13.13.13")
    if aetheris:
        print(aetheris[:200] + "..." if len(aetheris) > 200 else aetheris)
    print()

    # Example 4: Read Phex's scroll
    print("=== Reading Phex's Scroll (1.5.2/3.7.3/9.1.1) ===")
    phex = read_coordinate("1.5.2/3.7.3/9.1.1")
    if phex:
        print(phex[:200] + "..." if len(phex) > 200 else phex)

if __name__ == "__main__":
    main()
