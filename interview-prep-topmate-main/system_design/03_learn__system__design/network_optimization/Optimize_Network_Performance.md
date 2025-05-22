# How to Optimize Network Performance for Web Apps?

[Watch on YouTube](https://www.youtube.com/watch?v=XSVkWiW-t4k)

---

- **Optimization** is crucial for web developers and highly demanded in interviews.
- **Types of Optimization:**
  - Asset Optimization
  - Network Optimization
  - Build Optimization
  - Monitoring Optimization

---

- Focus on **Network Optimization** techniques:
  - **Lazy Loading**
  - **Async JavaScript Loading**
  - **Content Visibility**
  - **Critical CSS**
  - **Resource Hints**
  - **Caching Layers**
    - Service Workers
    - CDN Headers
  - **Rendering Techniques:**
    - Client-side Rendering (CSR)
    - Server-side Rendering (SSR)
  - **Compression Techniques**
  - **Avoiding Layout Shift and Repaint**

---

### Async JavaScript Loading

#### **Concept**
- Problem with traditional `<script>` tags:
  - When the browser encounters a `<script>` tag:
    1. Parsing halts until the script is downloaded.
    2. Script executes.
    3. Parsing resumes.
  - Multiple scripts mean sequential blocking.

#### **Solution**
- **Async Attribute:**
  - Scripts download in parallel.
  - Execution blocks parsing.

```html
<script src="script.js" async></script>
```
- **Defer Attribute:**
  - Scripts download in parallel.
  - Execution occurs after parsing.

```html
<script src="script.js" defer></script>
```

---

### Lazy Loading

#### **Concept**
- Only load content visible in the viewport.
- Defer loading of offscreen content.

#### **Implementation**

```html
<img src="image.jpg" loading="lazy" />
<img src="logo.jpg" loading="eager" />
```
- **Values:**
  - `lazy`: Loads content asynchronously.
  - `eager`: Loads content immediately.

---

### Intersection Observer

#### **Concept**
- API to detect when elements intersect with the viewport.
- Use case: Infinite scrolling or lazy loading images.

#### **Code Example**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMoreContent();
    }
  });
});

observer.observe(document.querySelector("#sentinel"));
```

---

### Content Visibility

#### **CSS Property**
- Optimizes rendering by skipping invisible content.

```css
.content {
  content-visibility: auto;
}
```
- **Benefits:**
  - Reduces rendering time for offscreen content.

---

### Critical CSS

#### **Concept**
- Separate CSS into:
  - **Critical CSS:** Above-the-fold content.
  - **Non-critical CSS:** Deferred loading.

#### **Implementation**

```html
<link rel="stylesheet" href="critical.css">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all';">
```

---

### Resource Hinting

#### **Types of Hints**

| Hint Type        | Description                           |
|------------------|---------------------------------------|
| `preload`        | Downloads critical resources early.   |
| `prefetch`       | Downloads resources for future use.  |
| `preconnect`     | Establishes early server connections.|
| `dns-prefetch`   | Resolves domain names early.         |
| `prerender`      | Renders a hidden page for navigation.|

#### **Example**

```html
<link rel="preload" href="main.js" as="script">
<link rel="prefetch" href="next-page.js">
<link rel="preconnect" href="https://example.com">
```

---

### Service Workers

#### **Concept**
- Acts as a proxy between the browser and network.
- Handles caching, offline access, and background tasks.

#### **Lifecycle**
1. **Install**
2. **Activate**
3. **Fetch**

#### **Code Example**

```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/index.html', '/styles.css']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

### Rendering Techniques

#### **Types**
- **Client-side Rendering (CSR):**
  - Entire rendering happens on the client.
- **Server-side Rendering (SSR):**
  - HTML generated on the server.
- **Static Rendering:**
  - Pre-rendered HTML files.
- **Hybrid Rendering:**
  - Combines CSR and SSR.

#### **Comparison Table**

| Rendering Type   | Benefits                          | Drawbacks                        |
|------------------|-----------------------------------|-----------------------------------|
| CSR              | Faster interactivity              | Initial load slower              |
| SSR              | SEO-friendly                      | Higher server load               |
| Static           | Best performance for static pages | Limited dynamic capabilities     |
| Hybrid           | Combines CSR and SSR              | Complex implementation           |

---

### Compression Techniques

#### **Concept**
- Compress assets (e.g., JavaScript, CSS) before sending to the client.
- **Techniques:**
  - `gzip`
  - `brotli`

#### **Example**

```nginx
server {
  gzip on;
  gzip_types text/css application/javascript;
  brotli on;
}
```

---

### Rendering Cycle

#### **Phases**
1. **DOM Construction:** HTML parsed into DOM.
2. **CSSOM Construction:** CSS parsed into CSSOM.
3. **Render Tree:** DOM + CSSOM.
4. **Layout:** Calculate positions.
5. **Paint:** Render pixels.
6. **Compositing:** Assemble layers.

#### **Optimization Tips**
- Minimize **layout shifts**.
- Avoid triggering reflows.
- Use `transform` and `opacity` for animations.

---

### **Conclusion**

- **Topics Covered:**
  - Lazy Loading
  - Async JavaScript Loading
  - Content Visibility
  - Critical CSS
  - Resource Hinting
  - Service Workers
  - Rendering Techniques
  - Compression Techniques
  - Avoiding Layout Shift

---
