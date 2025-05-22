# Design Snake & Ladder Game
[Watch on YouTube](https://www.youtube.com/watch?v=VgtD8OF6Yuw)

---

- **Topic:** Snake and Ladder Game - A popular system design interview question.
- Covering **High-Level Design (HLD)**, **Low-Level Design (LLD)**, and thought processes.


### **Common Initial Thoughts:**
  - Use React, loops for rows and columns, and basic state management.
  - Implement folder structure with components, hooks, services, APIs, and more.

### Detailed folder structure includes:
  - **Components**, **Redux**, **Hooks**, **Assets**, **API Calls**.
  - **Shared Components**, **Constants**, **Config Files**, and **Types (for TypeScript)**.

### **LLD Steps:**
  - Use boilerplate setups like CRA, Next.js, or Angular.
  - List components such as board, dice, and player.
  - Map logic for rows and columns.


### **Incorrect Approach Highlighted:**
  - Avoid jumping straight into implementation.
  - Understand system design phases like requirements, prioritization, HLD, interfaces, and implementation.

---

## Functional Requirements

- Think like a child to identify functional requirements:
  - How to start the game?
  - Where does the game begin?
  - What happens when dice is rolled?
  - Behavior of snakes and ladders (e.g., climbing or biting).
  - Winning conditions and rules.
  - Maximum players.

---

## Non-Functional Requirements

- **Key Non-Functional Requirements:**
  - Online/Offline modes.
  - Multiplayer support and player limits.
  - Performance optimization.
  - Accessibility (keyboard, gestures).
  - Platform compatibility (web, desktop, mobile).
  - Security against cheating.
  - Localization and internationalization (e.g., I18N).
  - Caching and CDNs.
  - Progressive Web App (PWA) features.

---

## High-Level Design (HLD)

- Use functional and non-functional requirements to draft HLD.
- **Key Considerations:**
  - Programming language (e.g., JavaScript).
  - DOM, Canvas, or SVG for game rendering.
  - State management and real-time functionality.
  - PWA and service workers.

---

## Low-Level Design (LLD)

- Think in terms of interfaces before implementation.
- Define entities:
  - **Dice:** Rolling and output number.
  - **Snake and Ladder:** Start/End points, interactions.
  - **Player:** Current position, status (active/inactive).
  - **Board:** Size, movement logic.

### Example Code for Interfaces
```typescript
interface Dice {
    roll(): number;
    style?: object;
}

interface Snake {
    start: [number, number];
    end: [number, number];
    style?: object;
    hasSnake(x: number, y: number): boolean;
}

interface Player {
    name: string;
    currentPosition: [number, number];
    status: "active" | "inactive";
}
```

---

## Components

- Components derived from interfaces:
  - **Game**, **Board**, **Cell**, **Snake**, **Ladder**, **Dice**, **Player**.

---

## APIs

- Suggested APIs:
  - `POST /createBoard` - Initialize the game board.
  - `POST /addPlayer` - Add new players.
  - `POST /rollDice` - Get dice value.
  - `GET /checkWinner` - Identify the winner.

---

## Key Considerations

- Use appropriate data structures for performance.
- Handle edge cases like:
  - **Multiple dice rolls.**
  - **Snake bites and ladder climbs.**
- Add animations for movements.
- Security features:
  - XSS, CSRF prevention, DDoS protection.

---

## Future Scope

- Extend functionality with:
  - Multiple dice.
  - Dynamic snake and ladder positions.
  - New rules (e.g., consecutive sixes cancel turn).

---

### Final Notes
- Focus on performance, scalability, and security.
- Design with flexibility to accommodate future changes.

---
