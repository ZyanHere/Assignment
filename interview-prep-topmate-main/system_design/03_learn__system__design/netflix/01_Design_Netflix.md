# **Frontend System Design: Video Streaming Service (Netflix)**

**[Watch on Youtube](https://www.youtube.com/watch?v=fFTWZwLvFqA)**

---

## **Introduction**

- Today's topic: Designing a **video streaming service** like **YouTube** or **Netflix**.
- Examples to consider:
  - Hulu
  - Netflix
  - Amazon Prime Video

### **Key Initial Clarifications**

- Difference between **streaming service** and **live streaming service**:
  - **Streaming Service**: Pre-recorded video content on demand. Examples:
    - Movies on Netflix
    - Videos on YouTube
  - **Live Streaming Service**: Real-time video delivery (e.g., sports events, news broadcasts, vlogs).

---

## **Clarifying Questions with the Interviewer**

- **Scope of Design**:
  - Frontend and API.
- **Content Type**:
  - Movies and TV shows.
- **Live Streaming Support**:
  - No.
- **Supported Platforms**:
  - Desktop, mobile, tablets, and all modern browsers.
- **Offline Features**:
  - Yes, allow users to download and watch videos offline.
- **Search Functionality**:
  - Support search by **movie**, **actors**, and **genre**.
- **Main Page Content**:
  - Everything relevant for the user.
- **Multilingual Support**:
  - Default: **English**.
  - Add more languages in the future.

---

## **Requirements**

### **Functional Requirements**

1. **Main Page**:
   - Popular movies.
   - Personalized recommendations.
2. **Search Bar**:
   - Support search by movies, genres, and actors.
3. **Video Player**:
   - Plays selected movies or TV shows.

### **Non-Functional Requirements**

- **Device Support**: Wide range of devices.
- **Responsive UI**: Adapt to different screen sizes.
- **Performance**: Fast and efficient.
- **Accessibility**: Usable by people with disabilities.
- **Language**:
  - Default: English.
  - Prepared for future multilingual support.
- **Content Protection**:
  - Prevent unauthorized access.
- **Offline Functionality**:
  - Videos available for download.

---

## **UI Design**

- **Main UI Components**:
  - **Main Page**:
    - Search bar.
    - Promotional movie section.
    - Related movies and TV shows.
  - **Search Component**:
    - Organized results by:
      - Movies
      - Actors

---

## **High-Level Architecture**

### **Client-Side Components**

1. **View Layer (UI)**:
   - Components:
     - Main Page
     - Search Bar
     - Player
   - Handles **UI rendering**.
2. **Controller**:
   - Manages **user events** (typing, clicks).
   - Acts as a proxy between the **model** and **view**.
3. **Model/Storage**:
   - Manages data:
     - **Client state**: Dynamic, session-dependent data.
     - **Responses**: Immutable, cached data.

### **Server Assumptions**

- **App Server**:
  - Handles all backend requests.
  - Assumed to exist and function correctly.

---

## **Rendering Approaches**

### **Client-Side Rendering (CSR)**

- **Advantages**:
  - Smooth transitions between pages.
  - Easy to develop.
- **Disadvantages**:
  - Slower time-to-interactive on low-performance devices.
  - SEO challenges.

### **Server-Side Rendering (SSR)**

- **Advantages**:
  - Faster initial loading.
  - Better SEO compatibility.
- **Disadvantages**:
  - Higher development costs.
  - Slower page transitions.

### **Hydration**

- Combines CSR and SSR:
  - **Initial HTML**: Rendered server-side.
  - **Interactive Elements**: Added with JavaScript.
- **Pros**:
  - Faster initial load.
  - Smooth transitions.
- **Cons**:
  - Potential delay before interactivity is available.

---

## **API Design**

### **REST API**

- **Advantages**:
  - Flexible, widely adopted.
- **Disadvantages**:
  - May require multiple endpoints for varied client needs.

### **GraphQL**

- **Advantages**:
  - Single endpoint supports varied data needs.
  - Reduces server load and improves performance.
- **Use Case**:
  - Fetch different field sets for various clients.

### **Recommended Approach**

- **Hybrid**:
  - REST API for authentication and video streaming.
  - GraphQL for flexible data fetching.

---

## **Video Delivery**

### **Progressive Downloading vs Streaming**

- **Progressive Downloading**:
  - Default HTML5 video method.
  - **Advantages**:
    - Easy to implement.
  - **Disadvantages**:
    - Limited security.
    - No fast-seeking support.
- **Streaming**:
  - Video streamed directly to users.
  - **Advantages**:
    - Secure.
    - Adaptive bitrate streaming supported.
  - **Disadvantages**:
    - Harder to develop and maintain.

### **Streaming Protocols**

- **HLS**:
  - Widely supported by browsers.
- **MPEG-DASH**:
  - Codec agnostic but less supported.
- **Recommendation**:
  - Support both HLS and MPEG-DASH for maximum compatibility.

---

## **Adaptive Bitrate Streaming (ABR)**

- Dynamically adjusts:
  - Bitrate
  - Resolution
  - Other video parameters
- Ensures smooth playback by responding to network conditions.

- **Advantages:**

  - Provides a smooth experience by adapting video quality to user network conditions.
  - Ensures smooth playback.
  - Offers fast start time.

- **Disadvantages:**
  - Harder to implement.
  - Increases costs due to the need to store and deliver multiple representations of a video.

---

# Offline Mode

### **Features of Offline Mode:**

- Users can download videos to watch offline.
- Interface accessible without an internet connection.
- Prompt users to navigate to the "Downloaded" section when offline.
- Display current network status.

### **Questions and Answers:**

1. **How to protect videos from theft?**

   - Store videos on the user's device with encryption.
   - Use **Encrypted Media Extensions (EME):**
     - EME calls **Content Decryption Module (CDM)** built into browsers.
     - CDM requests a license key from a DRM (Digital Rights Management) server.
     - The license key decrypts the video content for playback.

2. **What features should be available offline?**

   - Service Workers to handle network states and cache responses.
   - Store static files in **Cache API** and meta content in **IndexedDB**:
     - **Why not Local Storage?**
       - Small capacity.
       - Doesn’t support binary files.
       - Synchronous and slow API.

3. **How much video can users upload?**
   - Based on browser storage capacity.
   - Assume an average file size of **500 MB to 10 GB**.
   - Default allocation: **100 GB** (enough for several movies/episodes).
   - Allow users to adjust storage limits.

---

# Progressive Web Applications (PWA)

### **What is a PWA?**

- Applications built with web technologies.
- Works online and offline.
- Installable with a standalone icon.
- Functions like a browser tab outside the browser.

### **PWA Requirements:**

1. **HTTPS** for secure connections.
2. **Service Workers** for offline functionality.
3. **Web Manifest** to provide site information.

### **Limitations:**

- Browser support varies:
  - Safari for iOS and iPadOS.
  - Chrome for macOS.

---

# Internationalization and Localization

### **Definitions:**

- **Internationalization:** Adapting applications for different languages and regions.
- **Localization:** Cultural adaptations for specific regions.

### **Important Considerations:**

- Support multiple languages, including right-to-left (RTL) scripts like Arabic.
- Implement a **Translation Management System (TMS)** if a dedicated translation team is unavailable.

### **General Recommendations:**

- Predict user language preferences.
- Adjust text direction and formatting for RTL languages.
- Avoid string concatenation and text in images.
- Use logical properties like `margin-inline-start` instead of directional properties.

### **Translation Format Options:**

1. **JSON:** Easy to read/write and supported by most TMS.
2. **ICU:** More powerful but less flexible.
3. **Gettext:** Good TMS support but less versatile.

---

# Accessibility

### **Best Practices:**

- Use semantic tags and ARIA attributes when necessary.
- Add `alt` attributes for images.
- Mark decorative elements with `role="presentation"`.
- Ensure interactive elements are keyboard and touch-friendly.

---

# Device Support and Performance

### **Optimization Tips:**

- Optimize images for smaller screens.
- Add focus events alongside hover events.
- Prioritize main content on small screens.
- Avoid heavy animations and aggressive preloading.

### **Carousel Data Loading:**

- Use **cursor-based pagination** instead of preloading all data.

---

# Security

### **Key Vulnerabilities to Address:**

1. **Cross-Site Scripting (XSS):** Prevent injection attacks.
2. **Cross-Site Request Forgery (CSRF):** Secure forms and sessions.
3. **Clickjacking:** Use framebusting techniques.
4. **HTTPS:** Encrypt all communication.

---

# High-Level Design Overview

### **System Components:**

- **Auth API** and **GraphQL API** for managing queries.
- **Response Cache** for storing responses and meta files.
  - Use **IndexedDB** for persistent storage.
- **Service Workers** for offline functionality.
- **Content Delivery Network (CDN):**
  - Stores media files and assets for minimal latency.

### **DRM Integration:**

- Video content encrypted and decrypted via DRM servers.
- Offline playback supported with persistent licenses (valid for limited durations).

---

# Conclusion

### **Features Covered:**

- Wide device support with optimized video and image quality.
- Localization and RTL language support.
- Secure against common vulnerabilities.
- Encrypted video content for protection.
- PWA support as a lightweight alternative to native apps.

---
