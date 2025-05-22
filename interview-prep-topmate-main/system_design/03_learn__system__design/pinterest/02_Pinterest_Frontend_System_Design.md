# [Front-End System Design] - Pinterest

**Source:** [Watch on Youtube](https://www.youtube.com/watch?v=3MADCVqL534)

---

- **Objective:** Design a popular platform for sharing images - **Pinterest**.
  - Pinterest allows sharing images styled as "pins".
  - Layout: **Masonry Layout** (also called **Mensa Grid**).
  - Infinite scroll loads more pins dynamically.

---

### Design Plan Overview

1. **Collect Requirements**
   - General Requirements.
   - Functional Requirements (e.g., platform support, target browsers).
2. **Component Architecture**
   - Break down the application into modular components.
3. **Masonry Layout Description**
   - Discuss how the layout is implemented in the real world.
4. **API Design**
   - Define entities and the APIs they interact with.
5. **Data Storage Layers**
   - Front-end data access and storage mechanisms.
6. **Optimization**
   - Performance and accessibility considerations.

---

### General Requirements

- **Masonry Layout Features:**
  - Pins arranged in a responsive grid.
  - Users can:
    - Hover over a pin to see details.
    - Click a pin for full details.
    - Post comments and share pins.
- **Restrictions:**
  - Only **images** (e.g., GIFs, pictures); no videos.
  - Focus depends on interview scope and time.

---

### Functional Requirements

- **Platform Support:**
  - Support 95% of modern browsers (exclude IE 11).
  - Wide device compatibility:
    - Mobile phones, tablets, desktops (adaptive design).
- **Progressive Web App (PWA) Features:**
  - Offline mode: Cache loaded pins for offline access.
  - Functionality in low-bandwidth environments.

---

### Component Architecture

- **Hierarchy:**
  - High-level: App Root → Router → Pages (e.g., Pins Feed).
  - Example Components:
    - **Pin:** Picture, menu, dropdown, details box, and comments.
    - **Comments Section:** Comment list, input box, and "show more" button.
- **Dependency Graph:**
  - Visualize how components interact and depend on each other.
  - E.g., `Pin → Pin Menu → Pin Picture → Comments`.

---

### Masonry Layout Implementation

- **Key Concepts:**

  - Infinite Scroll:
    - Pins rendered in a grid.
    - Data loading triggered when reaching the bottom of the viewport.
  - Zones:
    - **Visible Zone:** Pins currently visible.
    - **Invisible Zone:** Pins rendered but not visible.
    - **Recycle Zone:** Preloaded pins for seamless scrolling.

- **Efficiency:**
  - **Sliding Window Approach:** Replace old pins with new ones as you scroll.
  - **Absolute Positioning:** Use `transform` for efficient layout adjustments without DOM reflows.

---

### Data Entities

- **Pin Entity:**
  - ID, origin, description, title, image URL, and author.
- **Comment Entity:**
  - Author ID and content.
- **User Entity:**
  - ID and nickname.

---

### API Design

- **Endpoints:**
  1. `GET /pins`
     - Parameters: API key, user ID, timestamp cursor, min ID, include comments.
  2. `GET /comments`
     - Parameters: API key, pin ID, page size.

---

### Data Storage and Layers

- **Normalized Data Format:**
  - Store data in flat key-value pairs for efficient access.
  - E.g., Pins accessed by ID, comments by pin ID.

---

### Performance Optimization

1. **Network Performance:**

   - **Asset Compression:**
     - Apply gzip or Brotli for CSS, JS, and HTML.
   - **HTTP/2 Multiplexing:**
     - Serve multiple resources over a single connection.
   - **Image Optimization:**
     - Use WebP format and CDN caching for faster delivery.
   - **Lazy Loading:**
     - Load images and resources only when needed.

2. **Rendering Performance:**

   - Reduce **time-to-first-content**:
     - Inline critical CSS/JS.
     - Use `preconnect` and `dns-prefetch`.
   - **Placeholders:**
     - Show loading skeletons for better UX.

3. **JavaScript Performance:**
   - Minimize synchronous tasks.
   - Delegate heavy calculations to web workers.
   - Enable offline mode with service workers.

---

### Accessibility

- **Keyboard Navigation:**
  - Add shortcuts for pin actions (e.g., like, share).
- **Color Themes:**
  - Support color-blind friendly themes.
- **Screen Reader Announcements:**
  - Use ARIA live regions for real-time updates.
- **Responsive Typography:**
  - Use `rem` units for scalable fonts based on user settings.

---

### Conclusion

- This design covers:
  - Masonry Layout.
  - Component Architecture.
  - Performance and Accessibility.
- Tailor discussions to interview focus (e.g., layout, API).
