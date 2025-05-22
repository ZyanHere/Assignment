# Netflix Frontend System Design - Part 1

[Watch on Youtube](https://www.youtube.com/watch?v=1XCL81J9VwY)

---


- Offline support requires substantial data.
- Example: Google Docs supports offline with large-scale images and data through **indexDB**.
- IndexDB supports querying and optimization for offline mode.
- Sliding windows and thumbnails for images improve performance and efficiency.
---
### Focus: 
- Understanding frontend systems like Netflix and their customization strategies.


- Netflix homepage basics: 
  - Movies, recommendations, and thumbnails based on user preferences.
- Emphasis on meeting product requirements to ensure customer satisfaction.

---
### Approach: 

- Engineers should focus on fulfilling **customer-centric requirements**.
- The importance of integrating backend and frontend to create an exceptional product.
---

### Frontend customization overview:
  - Netflix’s homepage is user-specific with configurable **UI and profiles**.
  - Features like parental control and personalized content.

- Focus on **demand-side features** like user interface, recommendation system, and homepage configuration.

---

### **Functional Requirements:**
  - Hero section with background image/video.
  - Categories with carousels showcasing:
    - **Thumbnails** (portrait/landscape views).
    - **Top 10 trending items** dynamically configured.
  - Hover previews for quick content snippets.
  - Detailed pages for series and movies.

---

### **Non-Functional Requirements:**
  - Performance optimization for heavy media (images, videos).
  - Compatibility across devices (mobile, desktop).
  - **Configurable UI** for unique user experiences.
  - Localization and multi-language support.
  - Extensive **A/B testing** capabilities.

---

### Critical priorities: Performance and configurable UI.
- Device-specific resolution management to enhance user experience.

### Components and strategies:
  - Breaking down the page into reusable **React components**.
  - Performance strategies: resource hinting (e.g., prefetch, preload).

---

### **Asset Optimization:**
  - Video and image strategies:
    - Using formats like **webp** for images.
    - Efficient previews using **sprites** for thumbnails.
  - Strategic preloading with **HTTP/2** for multiplexing.

### Video Previews:
  - Using **Base64 blobs** for short clips to ensure personalization.
  - Advantages: Enhanced security, efficient caching.

### Caching strategies:
  - IndexDB for offline support and querying.
  - Reduces dependency on frequent API calls.

### **Lazy Loading:**
  - Prioritizing content loading based on user interaction.
  - Examples: Infinite scrolling, carousels.

### **Device Pixel Ratio (DPR):**
  - Tailoring image resolution based on device capabilities.
  - Using query parameters for optimal CDN delivery.

### **Configurable UI:**
  - Components driven by DSL (Domain Specific Language).
  - Separation of configuration, data, and UI components.

### API Expectations:
  - Skeleton loading with dynamic DSL-based data.
  - Metadata (e.g., titles, URLs, language descriptions).
  - Pagination for managing content efficiently.

---

### **Code Block Examples**

#### **IndexDB Initialization**
```javascript
const request = indexedDB.open("NetflixDB", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("content", { keyPath: "id" });
};

request.onsuccess = (event) => {
  console.log("Database initialized");
};

request.onerror = (event) => {
  console.error("Error initializing IndexDB", event);
};
```

#### **Lazy Loading Example**
```html
<img
  src="low-res-placeholder.jpg"
  data-src="high-res-image.jpg"
  class="lazy-load"
  alt="Movie Thumbnail"
/>
<script>
  const lazyImages = document.querySelectorAll(".lazy-load");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => observer.observe(img));
</script>
```

---

### **Table Format Example**

| **Feature**              | **Description**                              |
|--------------------------|----------------------------------------------|
| Hero Section             | Displays background video/image.             |
| Categories               | Organized carousels for recommendations.    |
| Hover Previews           | Snippets on hovering over thumbnails.        |
| Configurable UI          | Dynamic user-specific layout generation.     |
| Localization             | Multi-language and region-specific content. |

---

