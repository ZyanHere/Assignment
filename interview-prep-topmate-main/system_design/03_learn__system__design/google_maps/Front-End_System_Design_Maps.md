# Front-End System Design - Maps

[Watch on Youtube](https://www.youtube.com/watch?v=kNVrTzOMIIY)

---

### Introduction

- **Topic:** Front-end system design for maps.
- **Overview:**
  - Functional and non-functional requirements.
  - Components and interfaces.
  - Data structure and pathfinding algorithms.
  - Stability and performance considerations.

---

## Functional Requirements

### Key Features

1. **Detailed Map Display:**
   - Provides a clear view of the area of interest.
2. **Real-Time Positioning:**
   - Displays the user’s current location on the map.
3. **Markers and Routes:**
   - Enhance user experience with markers, routes, and other elements.
4. **Interactive Navigation:**
   - Users can zoom and pan to explore different areas.
5. **Search Locations:**
   - Enables users to find specific locations easily.
6. **Popups and Info Windows:**
   - Show details about locations upon interaction.
7. **Route Planning:**
   - Allows users to plan and view routes between locations.

---

## Non-Functional Requirements

### Key Features

1. **Performance:**
   - Fast loading times and responsiveness.
2. **Accessibility:**
   - Usable by everyone, including people with disabilities.
3. **Localization:**
   - Support multiple languages and regional content.

---

## Components

### Main Components

1. **Map Parent Component:**
   - Manages the overall map display.
2. **Location Pointer:**
   - Indicates the user’s current position.
3. **Markers:**
   - Represent points of interest.
4. **Search:**
   - Provides an input field for location search.
5. **Pathfinding:**
   - Displays routes between points.
6. **Tooltip:**
   - Offers additional information on hover.

---

## Data Structure

### Tile Management

1. **Client-Side Tiles:**
   - Simple SVG files displayed on the map.
2. **Server-Side Storage:**
   - Tiles stored as static files in a structured file system.
   - Updated weekly or as needed.
3. **Scalability:**
   - Use cloud storage (e.g., S3) for large-scale tile management.

### Shortest Pathfinding Algorithms

1. **Dijkstra’s Algorithm:**
   - **Advantages:**
     - Simple and intuitive.
     - Guarantees the shortest path in graphs with non-negative weights.
   - **Disadvantages:**
     - Inefficient for large graphs with many nodes and edges.
2. **A\* Algorithm:**
   - **Advantages:**
     - Uses heuristics for efficient pathfinding.
     - Prioritizes nodes closer to the goal.
   - **Disadvantages:**
     - Requires a good heuristic function.
     - May not guarantee the shortest path if the heuristic is not admissible.

---

## Accessibility Features

### Key Features

1. **Orientation Flexibility:**
   - Works seamlessly in both portrait and landscape modes.
2. **Input Purpose Identification:**
   - Clearly defines input fields for assistive technologies.
3. **Minimum Contrast Ratio:**
   - Ensures readability with a contrast ratio of at least 4.5:1.
4. **Screen Reader Support:**
   - Provides a numbered list of places for easy navigation.
5. **Feedback Mechanisms:**
   - Use vibrations or sounds to confirm user actions.

---

## Performance Optimizations

### Techniques

1. **Tile Caching:**
   - Cache frequently accessed tiles using service workers.
2. **Debouncing User Interactions:**
   - Optimize repeated actions like panning and zooming.
3. **Virtual Scrolling:**
   - Load and render only the visible tiles.
4. **Lazy Loading:**
   - Delay loading non-critical elements and tiles.
5. **SVG Optimization:**
   - Compress and optimize SVG files for faster load times.
6. **Web Workers:**
   - Offload heavy computations like pathfinding to keep the main thread responsive.
7. **CDN Usage:**
   - Utilize a CDN to efficiently deliver tiles and static resources.

---
