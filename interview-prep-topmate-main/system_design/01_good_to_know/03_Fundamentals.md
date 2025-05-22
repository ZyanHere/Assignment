# **Front End System Design Fundamentals**

**[Watch on Youtube](https://www.youtube.com/watch?v=NEzu4FD25KM)**

---

### **Introduction**

- **Objective:** Ace any front-end system design interview.
  - **Key Takeaway:** Concepts are applicable to all front-end system design interviews.
- Topics covered:
  - Rendering performance improvements.
  - HTTP protocol comparisons (GraphQL, WebSockets, REST API).
  - CLI-side model for data types and API design.
  - Optimization techniques.

### **Topics Overview**

- Detailed discussions include:
  - Tree shaking, error handling, time-to-interactive.
  - HTTP protocol comparisons: HTTP1 vs. HTTP2.
  - API design and client-side data types.
  - Framework: **RADIO** to structure interviews.

### **Friendly.com Platform**

- **Features:**
  - Comprehensive curriculum for system design and coding questions.
  - Over 100 questions with solutions, videos, and articles.
- **Discount:** 10% off with code `10off`.

---

## **RADIO Framework**

### **Framework Overview**

- **Steps in RADIO:**
  1. Requirements.
  2. High-Level Architecture.
  3. Data Flow Model.
  4. API Model.
  5. Optimizations & Performance.

---

### **Step 1: Requirements**

#### Functional Requirements:

- Define core features and platform functionalities.
  - Example: Designing a Facebook News Feed.
    - Features:
      - A feed displaying user posts (text and images).
      - Infinite scrolling for loading more content.

#### Non-Functional Requirements:

- **User Demographics:**
  - Mobile-only, web-only, or both?
- **Offline Support:**
  - Persistence of data for offline access.
- **Accessibility:**
  - High-contrast UI for visually impaired users.
- **Internationalization:**
  - Support for multiple languages.
- **Performance:**
  - Optimize latency and scalability with napkin math for expected volume.

---

### **Step 2: High-Level Architecture**

#### Key Steps:

1. **UI Design:**
   - Example: Facebook News Feed:
     - Header.
     - Post composer.
     - Feed items with content (avatar, name, post text).
2. **Component Architecture:**
   - Use **MVC Pattern:**
     - **Model:** Stores data.
     - **View:** Renders the UI.
     - **Controller:** Handles logic.
   - Data Flow:
     - API -> Controller -> Data Store -> View Layer.
   - Interaction Example:
     - Post composer updates API, which updates Data Store and Client.
3. **Design Patterns:**
   - MVC is clear and organized, separating concerns effectively.

---

### **Step 3: Data Flow Model**

#### Client-Driven Data Types:

- **Example:** Facebook News Feed
  - **Main App:**
    - User preferences.
    - Settings.
    - Feed (items, pagination).
  - **Feed Item:**
    - Type, creation date, author, content, comments.
  - **Content:**
    - Rich text (title, body, media).
    - **Server-Driven UI:**
      - Parse and render rich text dynamically.

---

### **Step 4: API Design**

#### HTTP Protocol Comparison:

1. **HTTP1:**
   - **Issues:**
     - Synchronous, limited connections.
     - Plain text response.
   - **Features:** Single TCP connection, blocking.
2. **HTTP2:**
   - **Improvements:**
     - Multiplexing for parallel requests.
     - Compressed data.
     - Supports rich media.

#### API Design Options:

1. **Polling:**
   - **Pros:** Simple, industry-standard, HTTP2 compatible.
   - **Cons:** High latency, traffic overhead.
2. **GraphQL:**
   - **Pros:** Type-safe, pulls only required data.
   - **Cons:** Long latency if over-fetching.
3. **WebSockets:**
   - **Pros:** Bi-directional communication, fast.
   - **Cons:** Harder to scale/load balance.
4. **Server-Side Events (SSE):**
   - **Pros:** Efficient, HTTP2 compatible.
   - **Cons:** Unidirectional (server-to-client).

---

### **Step 5: Optimizations & Performance**

#### Network Performance:

- **Use HTTP2:** Supports multiplexing.
- **Compression:**
  - Use Brotli compression.
- **Caching Strategies:**
  - Server and client-side caching.
- **Batch Requests:**
  - Group and send requests together.
- **Image Optimization:**
  - Serve compressed and appropriately sized images.
- **Bundle Splitting:**
  - Lazy-load code, split app and vendor bundles.

#### Rendering Performance:

- **Mobile-Friendly Design:**
  - Use media queries.
- **Avoid Race Conditions:**
  - Ensure correct request order.
- **Loading States:**
  - Improve user engagement with loaders and toasts.
- **Server-Side Rendering (SSR):**
  - Use frameworks like Next.js for faster load times.
- **Virtualization:**
  - Reuse existing DOM nodes for long lists.

#### Accessibility:

- **Font Sizes:** Use `rem` units.
- **Keyboard Navigation:** Support tabbing.
- **Contrast & Dark Mode:** Ensure readability.
- **ARIA Roles:** Ensure proper semantics for input fields.

#### Security:

1. **CORS:** Define cross-origin access policies.
2. **Rate Limiting:** Prevent DDoS attacks.
3. **XSS Prevention:** Sanitize input to prevent script injection.

---

### **Conclusion**

- The RADIO framework covers all essential aspects of front-end system design interviews.
- Focus on structured approaches and practical implementations.

---
