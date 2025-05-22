
# Design Whiteboard (Excalidraw, Figma, Draw.io)
[Watch on Youtube](https://www.youtube.com/watch?v=1lNJVDfsTSo)

---


Conducting a mock interview on designing a whiteboard like Excalidraw, Draw.io, Myro, OneNote, Xambord, and more.

**Guest:** Akansha, core maintainer at Excalidraw, shares insights on designing a whiteboard.

---

### **Functional Requirements**
  - Ability to draw shapes.
  - Update properties like:
    - Background.
    - Text.
  - Select and move shapes.
  - Resize and rotate shapes.
  - Zoom in/out functionality.
  - Save mockups to:
    - File system.
    - As images.

- **Collaboration:**
  - Share real-time updates with other users.

---

### **Non-Functional Requirements**
- **Persistence:**
  - Options include local storage, IndexedDB, or server-based solutions.
- **Performance:**
  - Handle large drawings efficiently without bottlenecks.
- **Security:**
  - Use encryption for collaborative data sharing.
- **Responsiveness:**
  - Adapt design to various devices.

---

### **Tech Stack**
- **Canvas API** for drawing.
- **UI Frameworks:** React, Vue, Angular.
- **Compression Libraries** for data optimization.
- **Storage APIs:** LocalStorage, IndexedDB for persistence.
- **Comparison of Canvas vs SVG:**
  - **Canvas:**
    - Better for large-scale drawings.
    - Performance optimized for rendering.
  - **SVG:**
    - Easier CSS integration.
    - DOM-based event handling.

---

### **Implementation Overview**

#### **Creating a Canvas**
```html
<canvas id="drawing-canvas" width="800" height="600"></canvas>
```

```javascript
const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
```

#### **Drawing Shapes**
```javascript
function drawRectangle(x, y, width, height) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillRect(x, y, width, height); // Draw rectangle
}
```

#### **State Management**
- Maintain an array of objects for elements:
```javascript
const elements = [
    { x: 10, y: 20, width: 100, height: 50, type: "rectangle" },
    { x: 50, y: 50, width: 150, height: 75, type: "circle" },
];
```

#### **Selection Logic**
- Detect user click coordinates and match within shape boundaries.

#### **Resizing and Moving Shapes**
- Calculate deltas for dimensions and positions.
- Update states accordingly.

#### **Zooming Functionality**
```javascript
ctx.scale(2, 2); // Example: Zooming in by 2x
```

---

### **Performance Tips**
- Use caching to store element states and avoid redrawing unnecessary components.
- Optimize rendering by limiting calculations for out-of-view elements.
- Leverage device pixel ratio (DPR) for smooth scaling.

---

### **Security Considerations**
- Use HTTPS for network communications.
- Encrypt data during collaboration for end-to-end security.

---

### **Additional Notes**
- Infinite Canvas: Support for extended drawing beyond the viewport.
- Collaboration: Real-time updates with shared data models.

---

