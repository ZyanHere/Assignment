# Front End System Design: Facebook News Feed

**[Watch on Youtube](https://www.youtube.com/watch?v=5vyKhm2NTfw)**

### **Problem: Designing Facebook News Feed**

- **Common Problem:** Often asked in interviews.
- **Objective:** Design a solution within 15 minutes.

---

### **Plan of Action**

1. **General Requirements**
2. **Specific Requirements**
3. **Component Architecture**
4. **Data Entities**
5. **Data API**
6. **Data Store**
7. **Infinite Scroll**
8. **Optimization**
9. **Accessibility**

---

### **Step 1: General Requirements**

- **Feature Goal:**
  - Infinite scrollable news feed.
  - Stories based on user subscriptions (e.g., groups, pages, friends).
- **User Actions:**
  - Share stories with links, images, videos.
  - Post stories with comments and attachments (links, images, videos).

---

### **Step 2: Specific Requirements**

- **Functional Requirements:**
  - Accessible across a wide range of devices.
  - Inclusive of accessibility features for users with disabilities.

---

### **Step 3: Component Architecture**

- **Core Components:**
  - **Story Component:**
    - Includes avatar, title, posting date, text, images.
    - Control panel: Like, Comment, Share.
  - **Comment Section:**
    - Comment list.
    - Comment input box.
- **Mockup Description:**
  - News feed = List of stories.
  - Dependency Graph helps visualize data flow.

---

### **Step 4: Data Entities**

- **Key Entities:**
  - **Story:**
    - ID, comments, media (links/videos), creation date, content, origin.
  - **Comment:**
    - ID, media type, author (user ID), content, creation date.
  - **Media:**
    - Type (link, video, etc.), URL.

**Code Representation:**

```typescript
type Story = {
  id: number;
  comments: Comment[];
  media: Media[];
  createdAt: number; // Timestamp
  content: string;
  origin: { type: string; name: string };
};

type Comment = {
  id: number;
  media: Media[];
  author: string; // User ID
  content: string;
  createdAt: number; // Timestamp
};

type Media = {
  type: string; // Link, video, etc.
  url: string;
};
```

---

### **Step 5: Data API**

- **API Endpoints:**

  - **`GET /posts`:** Fetch posts.
    - Parameters: `userID`, `excludeComments`, `timestamp`, `pageSize`, `minID`.
  - **`POST /posts`:** Create a post.
    - Parameters: `userID`, `postData`.
  - **`POST /comments`:** Create a comment.
    - Parameters: `userID`, `postID`, `commentData`.

- **Techniques:**
  - REST API for scalability and caching benefits.
  - GraphQL as an alternative for complex data selection.

---

### **Step 6: Data Store**

- **Organization:**
  - Store data in a normalized and flattened structure for efficient access.
  - Use a map structure indexed by IDs (e.g., `feedID`).
- **Example:**
  - Fetch data using IDs and pass only required data to components.
- **Edge Cases:**
  - Handling new stories dynamically while scrolling.

**Techniques for Real-Time Updates:**

- **Long Polling:** High latency and traffic overhead.
- **WebSockets:** Real-time but doesn’t support HTTP/2.
- **Server-Side Events:**
  - Uses HTTP/2 for efficient, binary data streaming.
  - Preferred solution.

---

### **Step 7: Infinite Scroll**

- **Feature Overview:**
  - Continuous scrolling loads new data at the viewport’s edges.
  - Ideal for entertainment content like Facebook’s news feed.
- **Implementation:**
  - Use **Intersection Observer API** to detect viewport intersections with top/bottom sentinels.
  - Maintain a sliding window of elements for performance optimization.
    - Example: Constantly replace off-screen stories with new ones.

---

### **Step 8: Optimization**

- **Performance Goals:**
  - Prevent excessive DOM elements from slowing down devices.
  - Maintain constant DOM size with sliding window implementation.

---

### **Step 9: Accessibility**

- **Ensure Features Are:**
  - Usable across a wide range of devices.
  - Accessible to users with disabilities.

---

#### **Infinite Scroll Design**

1. **Window Management**:

   - Show a fixed range of items (e.g., 10 stories).
   - Shift the range dynamically as the user scrolls.
   - Data outside the viewport (future or past) is loaded only as needed, maintaining performance.

2. **Performance Optimization**:
   - Constant DOM node updates reduce browser rendering costs.
   - Visible data is updated efficiently while invisible data remains unloaded.

---

#### **Optimization Strategies**

1. **Network Performance**:

   - **Assets Optimization**: Compress resources (gzip, Brotli).
   - **Image Handling**:
     - Use modern formats like WebP.
     - Optimize images dynamically via a service based on viewport dimensions.
     - Employ CDNs and geolocation for faster delivery.
   - **HTTP/2 Multiplexing**: Allows parallel resource loading, reducing the need for bundling.

2. **Rendering Performance**:

   - Server-side rendering (SSR) for faster initial content display.
   - Inline critical CSS and scripts to reduce render-blocking.
   - Load non-critical resources asynchronously or with deferred loading.

3. **JavaScript Performance**:
   - Reduce computation and execute asynchronously.
   - Use web workers for intensive calculations.
   - Cache results to minimize redundant operations.

---

#### **Accessibility**

1. **Visual Impairments**:
   - Support colorblind-friendly themes and high contrast modes.
   - Use ARIA attributes for screen readers to announce content changes.
2. **Interactive Elements**:
   - Provide keyboard shortcuts for navigation (e.g., scroll, new post, menu).
   - Ensure images have descriptive alt attributes.

---

#### **User Experience Enhancements**

1. **Lazy Loading**:
   - Load images or resources only when they are about to enter the viewport.
2. **Perceived Performance**:
   - Use placeholders or loaders to create an impression of faster loading.
3. **Offline Support**:
   - Enable PWA features like offline caching via service workers.

---

### **What Could Be Improved**

1. **Detailing Edge Cases**:
   - Handling slow networks or unexpected disconnections.
   - Error states when API data fails to load.
2. **Accessibility Testing**:
   - Suggest tools or frameworks for auditing (e.g., Lighthouse, axe-core).
3. **Data Analytics**:
   - Briefly touch on integrating user behavior analysis to optimize the infinite scroll experience.

---
