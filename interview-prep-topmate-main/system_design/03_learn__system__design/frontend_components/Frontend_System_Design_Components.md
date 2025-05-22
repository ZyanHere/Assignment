# Frontend System Design Components

**[Watch on YouTube](https://www.youtube.com/watch?v=44mOnnt5pic)**

---


- Frontend development often begins with aspirations of creating cool UIs, animations, or games.
- However, it evolves to include:
  - **Micro Frontends**
  - **Accessibility**
  - **Caching and Optimization**
  - **Performance**
  - **Search Engine Optimization (SEO)**
  - **Offline Support**


---

### **Frontend Engineer Responsibilities**

**Key Aspects:**

- Deciding architectural patterns
- Handling protocols
- Ensuring availability and consistency
- Managing security and optimization
- Implementing logging and monitoring
- Testing systems comprehensively

**Misconceptions:** Non-frontend developers often oversimplify UI development as just fetching and displaying API data.

**Case Study:**

- **Scenario:** Indian samosa stall owner wants to enhance customer experience.
- **Requirements:**
  - Private seating for meetings
  - Roadside seating
  - Water areas for aesthetics

**Outcome:**

- Attempting to fit all requirements into one system leads to chaos.
- In technical terms, this is akin to **Monolithic Frontend Development**.

---

### **Monolithic vs. Micro Frontend**

**Monolithic Frontend:**

- Involves a single codebase.
- Difficult to scale and maintain.

**Micro Frontend:**

- Divides the UI into smaller, maintainable parts.
- Each area is handled by dedicated teams or technologies.
- Technologies include:
  - **React**
  - **Vue.js**
  - **jQuery** (legacy)

**Micro Frontend Implementation:**

1. **iFrames**
2. **Web Components**
3. **Module Federation** (React-specific)
4. **Route-Based Micro Apps**

---

### **Communication Protocols**


**Key Concepts:**

1. **Long Polling:**
   - Frequent server checks for updates.
   - Inefficient due to repeated requests.

2. **WebSocket:**
   - Persistent, bi-directional connection.
   - Ideal for real-time applications like chat systems.

3. **Server-Sent Events (SSE):**
   - Server pushes updates to the client.
   - Commonly used for notifications.

**Use Cases:**

- **Long Polling:** Analytics and data-heavy scenarios.
- **WebSocket:** Real-time collaborative tools like Google Docs.
- **SSE:** Social media notifications.

---

### **Offline Support**

**Scenario:**

- Network issues or server downtime require offline functionality.
- Solutions include:
  - **Cached data**: Display previously accessed data.
  - **Service Workers**: Enable offline-first behavior.

**Examples:**

- Google Docs offline mode.
- Service Workers for caching assets and enabling offline interactions.

---

### **Accessibility**

**Challenges:**

- Customers with disabilities may face issues with language, vision, or hearing.

**Solutions:**

1. Keyboard accessibility: Proper tab order for navigation.
2. Screen readers: Leverage HTML5 semantics for better compatibility.
3. Color contrast: Ensure readability for vision-impaired users.

---

### **Consistency**

**Scenario:**

- Different browsers and operating systems cause inconsistent behavior.

**Solutions:**

1. **CSS Normalization:** Ensure styles render consistently.
2. **Polyfills:** Add missing JavaScript functionality.
3. **Design Systems:**
   - Examples: Material UI, Fluent UI, Ant Design.
   - Standardize components and behavior.

---

### **Credibility and Trust**

**Search Engine Optimization (SEO):**

1. **On-Page Optimization:**
   - Titles, descriptions, metadata.
   - Content quality and performance.

2. **Off-Page Techniques:**
   - Backlinks.
   - Ads using Google Tag Manager and Facebook Ads.

---

### **Logging and Monitoring**

**Key Areas:**

1. **Error Logging:** Detect and resolve bugs.
2. **User Tracking:** Analyze user behavior.
3. **Feature Utilization:** Monitor feature adoption.
4. **Infrastructure Monitoring:** Ensure scalability and availability.

**Tools:**

- **Error Logging:** Sentry, TrackJS
- **User Tracking:** Amplitude, LogRocket
- **Monitoring:** Google Analytics

---

### **Caching and Client-Side Databases**

**Caching Techniques:**

1. **HTTP Caching:** For static assets like images, CSS, and JS.
2. **In-Memory Caching:** Temporarily store data for faster access.
3. **State Management Libraries:** Redux, Context API.

**Client-Side Databases:**

- Local Storage
- Session Storage
- IndexedDB

---

### **Security**

**Key Considerations:**

1. **Authentication and Authorization:** Ensure requests are legitimate.
2. **Content Security Policies (CSPs):** Prevent cross-site scripting (XSS).
3. **Cross-Origin Resource Sharing (CORS):** Restrict resource sharing.
4. **DDoS Prevention:** Safeguard against malicious attacks.

---

### **Performance and Optimization**

**Key Techniques:**

1. **Asset Optimization:** Minify JS, CSS, and images.
2. **Server-Side Rendering (SSR):** Reduce client-side rendering time.
3. **Web Vitals:** Monitor and measure performance.

**Perceived Performance:**

- Ensure optimizations are visible to users.
- Prioritize user experience.

---

### **Testing**

**Types of Testing:**

1. **Unit Testing:** Verify individual components.
2. **Integration Testing:** Ensure modules work together.
3. **End-to-End Testing:** Test the entire user flow.

**Tools:**

- **Unit Testing:** Jest, Mocha, Chai
- **Integration and E2E Testing:** Cypress, Selenium, Playwright

---
