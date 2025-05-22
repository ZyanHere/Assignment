## **Front-End System Design - Design Infinite Scroll**

**Source:** [Watch on Youtube](https://youtu.be/IOJOUaKuj6M?si=9O8D1UK6ZMyS2X6S)

---

#### Introduction

- **Task:** Implement Infinite Scroll.
- **Approach**:
  - Step 1: Define the problem clearly.
  - This is not a product design; focus on the **Minimum Viable Product (MVP)**.
  - **Goal:** Create a scrollable list.

---

#### MVP Requirements

- The list:
  - Should render enough items to fill the viewport.
  - Appears as though all items are rendered.
  - Actually renders the **minimum number of elements possible**.
- Features:
  - Support both **top** and **bottom scrolling**.
  - **Connect to a data source** for appending items.

---

#### General Overview

- Infinite Scroll Example: **Twitter**
  - List items don’t overflow beyond the visible viewport.
  - Scrolling fast shows a white screen momentarily.
  - System appends new items at the bottom and removes items at the top.
  - Think of it as a **sliding window**.

---

#### Visualizing the Layout

- Components:
  - **Content Area**: Full list of items.
  - **Viewport**: Visible section of the list.
  - **Scroll Container**: The actual container where scrolling occurs.
- Render logic:
  - Fill the scroll container with minimal elements.
  - Remove DOM nodes that are no longer visible.

---

#### Rendering Strategy

- Add items to the viewport with proper spacing:
  - Render items incrementally (e.g., Item 1, Item 2, Item 3).
  - Overlap items slightly if necessary to ensure smooth transitions.
- Remove items that are no longer visible to optimize performance.

---

#### Adding Buffers

- Use a **buffer** to account for:
  - Fast scrolling with inertia.
  - A portion of the container height (e.g., half above and half below) for pre-loading items.

---

#### Determining Add/Remove Logic

- Compare:
  - **Visible Content Area** vs. **Buffer Zones** (top and bottom).
  - Keep track of:
    - **Visible Top** and **Bottom Positions.**
    - **Scroll Top** and **Client Height**.

---

#### Class Definition for Infinite Scroll

- Define a class: `InfiniteScroll`
  - **Constructor**:
    - Accepts an element (`HTMLDivElement`) and a data list.
    - Supports a custom item renderer function.
  - Add `scroll` event listener:
    - Trigger `rearrange` method on scroll.

---

#### Rearrange Logic

- Rearrange method:
  - Checks if:
    - Visible content is outside the buffer zones.
    - Additional items need to be added (top or bottom).
    - Extra items need to be removed.
  - Methods:
    - `appendTop` and `appendBottom`: Add items to respective zones.
    - `removeTop` and `removeBottom`: Remove excess items.

---

#### Adding Items

- Add logic:
  - If items are missing, append them to the top or bottom.
  - Adjust:
    - Padding of the content area.
    - Visible content indices (top and bottom).
  - Optimize reflows:
    - Render items invisibly before appending them.

---

#### Removing Items

- Remove logic:
  - If items exceed buffer zones, remove them.
  - Adjust:
    - Padding of the content area.
    - Visible content indices (top and bottom).

---

#### Optimizations

1. **Cache Item Heights:**
   - Avoid repeated DOM access by memorizing item heights.
   - Perform calculations programmatically.
2. **Handle Data Fetching:**
   - Support API calls for fetching new data when scrolling to the bottom.
   - Maintain flags to prevent redundant API calls.
3. **Lazy Load Media:**
   - Defer loading of images until they are within the visible viewport.

---

#### Advanced Implementation Notes

- Consider implementing a **custom scroll handler**:
  - Manage scroll position with a coordinate system.
  - Handle inertia for smooth scrolling.
- Ensure minimal reflows:
  - Use padding adjustments to avoid layout shifts.

---

#### Conclusion

- Infinite Scroll is a complex feature requiring careful attention to:
  - Rendering optimization.
  - Scroll behavior handling.
  - Performance considerations.
- Suggestions for improvement:
  - Pre-compute item dimensions.
  - Avoid redundant rendering or data fetching.
  - Write clean and modular code.

---
