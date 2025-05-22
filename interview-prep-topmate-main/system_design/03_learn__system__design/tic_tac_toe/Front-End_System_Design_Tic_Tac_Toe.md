# Front-End System Design - Tic Tac Toe

[Watch on Youtube](https://www.youtube.com/watch?v=kEir8jkj4Hs)

---

### Introduction

- **Overview:**
  - Discussing **front-end system design** for Tic Tac Toe.
  - Topics: Functional Requirements, Non-Functional Requirements, Assumptions, Interfaces, APIs, Optimization, Algorithms, and Accessibility.
- Tic Tac Toe is a **2-player game** played on a 3x3 grid.

---

## Functional Requirements

### Key Features

1. **Multiplayer Capability:**
   - Play against the computer or another user.
2. **Game Initiation:**
   - Users can choose who starts the game.
3. **Time Limits:**
   - Each move is time-bound for fluid gameplay.
4. **Customization:**
   - Users can customize board size and select icons.
5. **Termination and Replay:**
   - Option to end the game and replay.

---

## Non-Functional Requirements

### Key Features

1. **Performance:**
   - Fast response times, especially for larger boards or network play.
2. **Accessibility:**
   - Game should be usable by people with disabilities.

---

## Assumptions

### Context

- User login and profile setup are already implemented.
- Users find each other before the game starts.

---

## Interfaces

### Game Interfaces

1. **Game Setup Interface:**
   - **Fields:**
     - `size`: Positive integer defining board width and height.
     - `timeLimitPerMove`: Seconds allowed for a move (positive integer).
     - `playerIDs`: Array of two IDs representing participants (or a unique ID for the computer).
2. **Game Interface:**
   - Extends **Game Setup**.
   - **Fields:**
     - `gameID`: ID of the game session.
     - `moves`: Sequence of moves with player ID and board position.
     - `status`: Current state of the game (e.g., in-progress, win, draw).

### User Interface

- **Fields:**
  - `ID`: Unique user identifier.
  - `name`: User name.
  - `photoURL`: URL to the user’s avatar.
  - `rating`: Numerical rating for matchmaking.

### Other Structures

1. **Position Type:**
   - Defines position on the board using zero-based row and column indices.
2. **Game Status:**
   - Possible values: Pending, In-Progress, Win, Draw, Completed.
3. **Icons:**
   - Identifiers for icons players can choose.

---

## API Design

### Communication Approaches

1. **REST API:**
   - Suitable for game setup and browsing.
   - Limitations: May cause unnecessary traffic with polling.
2. **Short Polling:**
   - Regularly checks for updates but can be inefficient.
3. **Server-Sent Events:**
   - One-way communication from server to client, ideal for real-time updates.
   - Limitations: Cannot handle bi-directional interaction.
4. **WebSockets:**
   - Ideal for real-time, bi-directional communication.

### Unified Approach

- Use **REST API** for setting up games.
- Use **WebSockets** for:
  - Game listings.
  - Real-time gameplay.
- Ensures seamless real-time interaction with fewer communication strategies.

### Endpoints

1. **API/Game/Init:**
   - Input: Game Setup object.
   - Output: `gameID`.
2. **WebSocket Endpoint:**
   - Handles:
     - Game listings.
     - Real-time game state updates.

---

## Optimization

### Techniques

1. **Compression:**
   - Use Brotli for modern browsers and Gzip for older ones.
2. **Responsive Images:**
   - Use WebP format and responsive techniques (e.g., `<picture>` tag).
3. **Code Splitting:**
   - Load necessary code on demand.
4. **CSS Optimization:**
   - Use critical CSS and preload important styles.
5. **Efficient Algorithms:**
   - **Winning Algorithm:**
     - Use variables (`rows`, `columns`, `diagonal`, `anti-diagonal`).
     - Update variables based on moves.
     - Check if any variable totals to 3 (win) or -3 (loss).

---

## Accessibility

### Features

1. **Adjustable Settings:**
   - Allow users to save preferences for future visits.
2. **Responsive UI:**
   - Ensure elements are accessible on all devices.
3. **Alt Text:**
   - Add descriptive alt text for images.
4. **Disable Animations:**
   - Provide options to disable motion animations.
5. **Focus Indicators:**
   - Ensure visible focus outlines.
6. **Screen Reader Support:**
   - Make all actions accessible and understandable for screen readers.
7. **Advanced Features:**
   - Consider voice commands for inclusive gaming.

---
