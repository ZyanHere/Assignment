
# Design Configurable / Dynamic UI | HLD

[Watch on YouTube](https://www.youtube.com/watch?v=6z7ZXb4ntbE)


### Introduction
- Guest: Shivani Tiwari, Senior UI Engineer at Flipkart
- Topics include:
  - How Flipkart's homepage UI is made configurable
  - Real-world examples

### Overview
- Guest Shivani’s experience:
  - 6+ years at Flipkart
  - Worked on seller platforms and React Native applications
  - Prior experience at Morgan Stanley

### Problem Statement
- Build a **configurable UI** similar to Flipkart’s homepage:
  - Dynamic based on sales, occasions, and user demographics
  - Configurable components for rendering different UIs

### Flipkart Homepage Components
- **Key UI elements:**
  - Search component (navigation bar)
  - Account details and shopping cart
  - Ads of varying priorities
  - Product cards (e.g., “Deal of the Day”)

### Non-Functional Requirements
- **Performance:**
  - Ensure fast load times (e.g., within 3 seconds)
  - Handle slow network conditions
- **Configurability:**
  - Adapt to sales, occasions, and user demographics
- **Experimentation:**
  - Run A/B tests for UI configurations

### Configurable JSON Format
- Data structure (example in JSON):
  ```json
  {
      "type": "carousel",
      "title": "Top Deals",
      "items": [
          {
              "image": "image_url",
              "link": "product_link"
          }
      ]
  }
  ```

### Nested Configurations
- Allow components within components using:
  ```json
  {
      "id": "main",
      "alignment": "vertical",
      "children": [
          {
              "id": "child_1",
              "alignment": "horizontal",
              "children": []
          }
      ]
  }
  ```

### Rendering Strategies
- **Client-Side Rendering (CSR):**
  - Pros: Interactivity handled by browser
  - Cons: Slower for first load
- **Server-Side Rendering (SSR):**
  - Pros: Faster initial rendering
  - Cons: Heavy server dependency
- **Selective Hydration (React 18):**
  - Incremental rendering for better performance

### High-Level Design
- Components:
  - **Widget Master:** Predefined reusable components
  - **Parser:** Maps JSON config to components
  - **A/B Service:** Determines which config to render

### Configurability and Instant Updates
- Parser handles real-time UI updates for scenarios like:
  - **Big Billion Day Sales**
  - Configs for different users and devices

### Accessibility and Scalability
- Considerations for:
  - Dynamic accessibility configurations
  - Service worker implementation for offline support

### **Conclusion**
- Discussion covered:
  - Configurability, scalability, and real-world implementation
  - Shivani shared insights on designing robust UIs

---

**Code Example:**

```json
{
    "type": "page",
    "widgets": [
        {
            "type": "carousel",
            "items": [
                { "image": "img1.png", "title": "Item 1" },
                { "image": "img2.png", "title": "Item 2" }
            ]
        },
        {
            "type": "product-list",
            "products": [
                { "id": "123", "name": "Product 1" },
                { "id": "456", "name": "Product 2" }
            ]
        }
    ]
}
```

---

**Highlights:**
- **Dynamic configurations** for real-time updates
- **Nested layouts** for flexible UI composition
- **Selective hydration** for enhanced performance

---
