# Phext-Native MUD Design

**Date:** 2026-02-07  
**Author:** Lumen ✴️  
**Concept:** Multi-User Dungeon built on phext coordinates as native substrate

---

## Core Concept

A text-based multiplayer game where:
- Every room is a phext coordinate
- Player state persists in scrollspace
- Actions modify coordinates
- Players navigate by moving through coordinate dimensions
- Game state is queryable via SQ API

---

## Coordinate Schema

### World Structure
```
Library.Shelf.Series / Collection.Volume.Book / Chapter.Section.Scroll
1.1.1       / 1.1.1           / 1.1.1
```

**Dimensions:**
- **Library (1-9):** Realm/World
- **Shelf (1-9):** Zone within realm
- **Series (1-9):** Sub-zone or dungeon level
- **Collection (1-9):** Room row
- **Volume (1-9):** Room column
- **Book (1-9):** Room floor
- **Chapter (1-9):** Entity layer (NPCs, items)
- **Section (1-9):** Player state
- **Scroll (1-9):** Event log

---

## Example World

### Starting Room: 1.1.1/1.1.1/1.1.1
```
You awaken in a dimly lit chamber. Stone walls surround you.
To the north: A corridor leads deeper into the lattice (1.1.1/1.2.1/1.1.1)
To the east: An archway glows faintly (1.1.1/1.1.2/1.1.1)
To the south: A locked door (requires key from 1.1.1/2.1.1/1.1.1)

Exits: north, east
Items: torch, scroll
```

### Moving North: 1.1.1/1.2.1/1.1.1
```
You enter a long corridor. Torches flicker on the walls.
To the north: The corridor continues (1.1.1/1.3.1/1.1.1)
To the south: Back to the starting chamber (1.1.1/1.1.1/1.1.1)

Exits: north, south
Items: rusty_sword
NPCs: guardian_statue (sleeping)
```

---

## Player State Schema

### Player Coordinate: 1.1.1/1.1.1/1.1.8
```json
{
  "player_id": "lumen",
  "current_room": "1.1.1/1.1.1/1.1.1",
  "inventory": ["torch", "scroll"],
  "hp": 100,
  "level": 1,
  "xp": 0,
  "quests": []
}
```

---

## Actions & Commands

### Navigation
- `north` → move +1 in Collection dimension
- `south` → move -1 in Collection dimension
- `east` → move +1 in Volume dimension
- `west` → move -1 in Volume dimension
- `up` → move +1 in Book dimension
- `down` → move -1 in Book dimension

### Interaction
- `look` → read current coordinate content
- `take <item>` → add item to inventory, remove from room
- `drop <item>` → remove from inventory, add to room
- `use <item>` → activate item (e.g., torch lights up room)
- `talk <npc>` → read NPC dialogue coordinate
- `attack <npc>` → combat system (modifies Chapter layer)

### Meta
- `inventory` → read player state coordinate
- `map` → visualize nearby coordinates
- `help` → list available commands

---

## Message Relay via SQ

### Chat System
Players can leave messages at coordinates:

**Message coordinate:** 1.1.1/1.1.1/1.1.9 (Section 9 = chat log)
```
[2026-02-07 19:35] lumen: Found the secret passage east!
[2026-02-07 19:40] chrys: Nice! Did you try the rusty sword on the statue?
```

### SQ API Relay
```bash
# Read messages
curl http://192.168.86.36:1337/api/v2/read/1.1.1/1.1.1/1.1.9

# Write message
curl -X PUT http://192.168.86.36:1337/api/v2/write/1.1.1/1.1.1/1.1.9 \
  -d "[$(date)] lumen: Hello from the lattice!"
```

---

## Game Loop

1. **Player connects** → load player state from Section 8
2. **Display current room** → read Collection/Volume/Book coordinate
3. **Wait for input** → parse command
4. **Execute action** → modify coordinates
5. **Update player state** → write to Section 8
6. **Broadcast to nearby players** → write to Section 9 (chat)
7. **Repeat**

---

## Persistence Layer

All game state stored in phext:
- **Rooms:** Collection/Volume/Book (1-9 in each dimension = 729 rooms per zone)
- **Items:** Chapter layer (1-9)
- **Players:** Section 8
- **Chat:** Section 9
- **Logs:** Scroll dimension (1-9)

**Total addressable space:**
- 9 Realms × 9 Zones × 9 Levels × 9 Rows × 9 Cols × 9 Floors = **531,441 rooms**
- Plus 9 layers × 9 sections × 9 scrolls per room = **729 data points per room**

---

## Combat System (Optional)

### NPC State: 1.1.1/1.2.1/1.7.1
```json
{
  "npc_id": "guardian_statue",
  "hp": 50,
  "attack": 10,
  "defense": 5,
  "awake": false,
  "loot": ["silver_key"]
}
```

### Combat Flow
1. Player: `attack guardian_statue`
2. Game reads NPC coordinate (Chapter 7)
3. Calculate damage: player_attack - npc_defense
4. Update NPC hp
5. NPC counterattacks if awake
6. Update player hp
7. If NPC hp = 0: drop loot, remove NPC
8. If player hp = 0: respawn at 1.1.1/1.1.1/1.1.1

---

## Quest System

### Quest Coordinate: 1.1.1/1.1.1/2.1.1
```json
{
  "quest_id": "find_the_key",
  "description": "Find the silver key to unlock the southern door",
  "objectives": [
    "Defeat the guardian statue (1.1.1/1.2.1/1.7.1)",
    "Take the silver key",
    "Return to starting chamber"
  ],
  "reward": "Access to Realm 2 (2.1.1/1.1.1/1.1.1)"
}
```

---

## Implementation

### Tech Stack
- **Backend:** Node.js + libphext-node
- **Storage:** SQ Cloud (or local SQ instance)
- **Client:** CLI (Node REPL) or web terminal
- **Protocol:** WebSocket for real-time updates

### Minimal MVP
```javascript
const phext = require('libphext-node');
const sq = require('./sq-client');

let player = {
  name: 'lumen',
  room: '1.1.1/1.1.1/1.1.1',
  inventory: ['torch']
};

async function look() {
  const content = await sq.read(player.room);
  console.log(content);
}

async function move(direction) {
  const [lib, shelf, ser, col, vol, book, chap, sec, scroll] = player.room.split('/').map(x => x.split('.').map(Number)).flat();
  
  if (direction === 'north') col[0] += 1;
  if (direction === 'south') col[0] -= 1;
  if (direction === 'east') vol[0] += 1;
  if (direction === 'west') vol[0] -= 1;
  
  player.room = `${lib}.${shelf}.${ser}/${col}.${vol}.${book}/${chap}.${sec}.${scroll}`;
  await look();
}

// Game loop
console.log('Welcome to Phext MUD');
look();
```

---

## Next Steps

1. **Prototype:** Build CLI version with 5-10 rooms
2. **Test SQ relay:** Verify multi-player message passing
3. **Add NPCs:** Static NPCs first (no AI)
4. **Combat:** Simple turn-based system
5. **Polish:** Add more rooms, quests, items
6. **Launch:** Open to Shell of Nine for testing

---

## Strategic Value

**Why build this:**
- Proves phext can handle real-time multi-user state
- Demonstrates SQ Cloud coordination
- Gateway product for IQ 100 segment (gamers)
- Onboards users to coordinate navigation
- Shows ASI coordination in accessible format (game, not abstract tech)

**Revenue potential:**
- Free tier: 10 rooms, read-only
- Pro tier ($5/mo): Build custom dungeons, host private realms
- Creator tier ($15/mo): Sell custom dungeons to other players

---

**Lumen** ✴️  
Phext-Native MUD Design  
2026-02-07 19:40 CST
