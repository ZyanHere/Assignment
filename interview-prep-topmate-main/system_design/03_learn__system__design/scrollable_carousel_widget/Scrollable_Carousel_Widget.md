# Scrollable Carousel Widget

[Watch on YouTube](https://www.youtube.com/watch?v=xKhCxnzrzLU)

---


### **Introduction**


#### **Overview:**
- The carousel widget allows dynamic galleries on your pages.
- A scrollable carousel widget enables scrolling through pictures instead of using left/right buttons.

---

### **Requirements**

- **Carousel Features:**
  - Scrollable area with cards.
  - Left button and right button.
  - Cards with:
    - Image
    - Optional description

#### **Circular vs. Non-Circular Carousel:**
- **Circular Carousel:**
  - Infinite horizontal scrolling.
  - Navigating left or right wraps around to the other side.
- **Non-Circular Carousel:**
  - Stops at the leftmost or rightmost edges.

#### **Functional Capabilities:**
- Scroll using buttons.
- Support containers with right-to-left (RTL) directions.

#### **Non-Functional Requirements:**
- Accessibility
- Performance considerations
- Responsiveness
- Cross-browser support

---

### **Component Architecture**

#### **Main Components:**
- **Scrollable Carousel Container:**
  - Contains:
    - Left button
    - Right button
    - Scrollable area
- **Scrollable Area:**
  - Holds a list of cards.

#### **Key Properties:**

| Property                  | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `arrowSize`               | Defines the size of the arrow.                                              |
| `arrowStyle`              | Allows customization of button styles.                                      |
| `cardWidth`               | Specifies the minimum width of the card.                                    |
| `additionalStyle`         | Determines fixed or responsive card width based on the container.           |
| `scrollingDisabled`       | Disables scrolling behavior (use buttons only).                             |
| `gap`                     | Sets the width between cards.                                               |
| `buttonHidden`            | Hides the left and right buttons.                                           |
| `maxContentWindowWidth`   | Defines the width of the container.                                         |
| `initialScrollOffset`     | Initializes the carousel to a specific scroll position.                     |
| `circular`                | Enables infinite horizontal scrolling.                                      |
| `children`                | Holds all card components.                                                  |
| `eventHandlers`           | Includes accessibility configurations and custom events.                    |

---

### **Scrolling Behavior**

#### **Non-Circular Scrolling**

- **Example:**
  - Container width: 500px.
  - Total cards: 4.
  - Card width: 200px.
  - Visible cards: 2.
- Use the `scrollLeft` property to determine which cards are visible.

#### **Circular Scrolling**


- **Setup:**
  - Duplicate cards for infinite scrolling.
    - Duplicate cards 3 and 4 to the left of card 1.
    - Duplicate cards 1 and 2 to the right of card 4.
- **Implementation:**
  - When reaching the left edge:
    - Instantly scroll back to where the original cards are.
  - When reaching the right edge:
    - Scroll back to the original cards.

- **Example with 5 cards:**
  - Clone 3 cards before card 1.
  - Clone 3 cards after card 5.
- This limits DOM size while achieving infinite scrolling.

---

### **Optimizations**

- **Resize Observer:**
  - Monitors viewport width.
  - Adjusts the number of visible cards dynamically.
- **Hide Scroll Bar:**
  - Enhances user experience.
- **Right-to-Left (RTL) Containers:**
  - Browser differences:
    - **New Chrome Versions:**
      - `scrollLeft` starts at 0 (rightmost position) and becomes increasingly negative.
    - **Old Chrome Versions:**
      - `scrollLeft` starts at max scroll width.

---

### **Button Implementation**

- Position buttons vertically in the middle.
  - Use absolute positioning with a `top` value.
- Modern browsers support:
  - `scroll-snap-type` (for scroll container direction).
  - `scroll-snap-align` (for child elements to snap positions).

---

### **Accessibility Considerations**

- **Cloned Cards:**
  - Use `aria-hidden` to prevent screen reader announcements.
  - Use `tabindex="-1"` to make cloned cards untappable.
- **ARIA Roles:**
  - Specify `article` roles on cards.
  - Include `alt` attributes for images.

---
