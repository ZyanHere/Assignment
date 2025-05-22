# Asset Performance Optimization for Web Apps

---

[Watch on YouTube Video](https://www.youtube.com/watch?v=9JDlZxR8gVw)

---

## **Introduction**

- Specifically, we focus on **asset optimization** for:
  - **Images**
  - **Videos**
  - **Fonts**
  - **CSS**
  - **JavaScript**
- Objective: Boost application performance by managing assets efficiently.


### **Key Areas Covered**
- Image Compression
- Lazy Loading
- Progressive Enhancement
- Client HTTP Hint
- Responsive and Adaptive Images
- Blur Effects

---

## **Image Optimization**

### **Techniques for Images**

- **Compression Techniques**:
  - Tools: 
    - [JPG Optimizer](https://jpg-optimizer.com)
    - [TinyPNG](https://tinypng.com)
    - [Optimizilla](https://optimizilla.com)

- **Lazy Loading**:
  ```html
  <img src="image.jpg" loading="lazy" alt="Optimized Image">
  ```

- **Progressive Enhancement**:
  - Use WebP as the primary format, fallback to JPEG/PNG.

- **Responsive Images**:
  ```html
  <picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="fallback.jpg" alt="Responsive Image">
  </picture>
  ```

- **Device Pixel Ratio (DPR)**:
  ```javascript
  const DPR = window.devicePixelRatio;
  // Logic to load high-quality images based on DPR
  ```

- **Blur Effects**:
  - Use a small placeholder image with blur applied:
    ```css
    .placeholder {
      filter: blur(5px);
    }
    ```

---

## **Video Optimization**

### **Techniques for Videos**

- **Replace GIFs with Videos**:
  ```html
  <video autoplay loop muted>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
  </video>
  ```

- **Responsive Poster Images**:
  ```html
  <video poster="poster.jpg" controls>
    <source src="video.webm" type="video/webm">
  </video>
  ```

- **Streaming Techniques**:
  - Stream videos in chunks for better performance.

- **Audio Management**:
  - Load audio tracks separately for localization.

---

## **Font Optimization**

### **Techniques for Fonts**

- **Font Display Descriptor**:
  ```css
  @font-face {
    font-family: 'CustomFont';
    src: url('custom-font.woff2') format('woff2');
    font-display: swap;
  }
  ```

- **Data URI**:
  ```css
  @font-face {
    font-family: 'EncodedFont';
    src: url(data:font/woff2;base64,AAEAAAALAIAAA...) format('woff2');
  }
  ```

- **Font Face Observer**:
  ```javascript
  const font = new FontFaceObserver('CustomFont');
  font.load().then(() => {
    document.documentElement.classList.add('font-loaded');
  });
  ```

- **Subset Fonts**:
  - Use tools to remove unused glyphs and optimize font files.

---

## **CSS Optimization**

### **Critical CSS Rendering**
- Load critical styles inline:
  ```html
  <style>
    /* Critical CSS */
    body { margin: 0; padding: 0; }
  </style>
  ```

### **Lazy Loading Non-Critical CSS**
```html
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
```

---

## **JavaScript Optimization**

### **Async vs Defer**

| Attribute | Behavior |
|-----------|----------|
| **Async** | Loads in parallel, executed immediately. |
| **Defer** | Loads in parallel, executed after HTML parsing. |

```html
<script src="script.js" async></script>
<script src="script.js" defer></script>
```

### **Web Workers**

- Offload heavy computations:
  ```javascript
  const worker = new Worker('worker.js');
  worker.postMessage({ task: 'heavy-computation' });
  worker.onmessage = (event) => {
    console.log('Result:', event.data);
  };
  ```

---

#### Adaptive Media Loading

- **Adaptive Techniques:**
  - Adjust based on network speed, device memory, and CPU cores.
  - Use properties like:
    - **navigator.connection.saveData**
    - **navigator.deviceMemory**
    - **navigator.hardwareConcurrency**

```javascript
if (navigator.connection.saveData) {
  // Load smaller or fewer images/videos
}
```
---

## **Conclusion**

- Covered optimization techniques for:
  - **Images**
  - **Videos**
  - **Fonts**
  - **CSS**
  - **JavaScript**

---
