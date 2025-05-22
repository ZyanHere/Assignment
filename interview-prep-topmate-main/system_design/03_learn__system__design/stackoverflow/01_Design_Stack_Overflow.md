# **Frontend System Design: Stack Overflow**

> [Watch on Youtube](https://www.youtube.com/watch?v=Uo9yD9XqyWc)

---

### **Introduction**

You might think it’s just a simple Q&A platform,

- but it has many **interesting features** that we will explore today.
- Let’s dive in!

The structure of the design includes four main parts:

1. **Introduction**
   - Preparing information for the design.
   - Finding references.
   - Asking clarifying questions.
2. **Architecture**
   - High-level architecture.
   - Data model.
   - Core technologies (e.g., **real-time updates**).
3. **Domain-specific topics**
   - Search, text editor, etc.
4. **Common topics for web applications**
   - **Security**, **performance**, **accessibility**, and others.

---

### **References and Unique Features**

- Example references: **Quora**, **other Q&A sites**.
- What distinguishes Stack Overflow?
  - **Focus on code** as a core feature.

---

### **Initial Clarifications**

- Which features should we focus on?
  - **Feed**, **post creation**, **post search**, **likes**, and **subscriptions**.
- **Notifications**:
  - Through browser, email, or on-page.
- **Offline support?**
  - **No need** for offline mode.
- **Mobile app or responsive web design?**
  - The site should work on **all devices**, no mobile app for now.
- **User roles?**
  - Two roles: **normal user** and **moderator** (moderator functions out of scope for now).
- **Text editor requirements?**
  - Support for:
    - **Basic formatting**, **code blocks**, and **images** (no file attachments).

---

### **Functional vs Non-Functional Requirements**

- **Functional Requirements**:

  - **Feed**: Display posts with sorting options.
  - **Search**: Users can search posts with parameters.
  - **Post Creation**: Users can ask questions.
  - **Comments**: Users can answer or comment on questions.
  - **Votes**: Users can like or dislike posts and comments.

- **Non-Functional Requirements**:
  - **Real-time updates**.
  - **Device adaptation**: Responsive design.
  - **Performance**: Fast and smooth.
  - **Accessibility**: For users with disabilities.
  - **Security**: Mitigate vulnerabilities.
  - **Localization**: Support multiple languages.

---

### **High-Level Architecture**

We will use the **MVC pattern** (**Model-View-Controller**) for the architecture.

#### **Technologies**:

- **WebSockets** for real-time updates.
- **CDN**: For faster delivery of static files.
- **Relational DB**: Due to closely coupled entities.

---

#### **Components**

- **View**: Responsible for the user interface:

  - **Feed Page**: Displays posts (default view).
  - **Post Page**: Shows individual posts and discussions.
  - **New Post Page**: Includes the **text editor** for creating posts.

- **Controller**: Handles **business logic**:

  - User events (e.g., clicks, keyboard inputs).
  - Saving and polling post drafts.
  - Updating data in real-time.

- **Model**: Includes:
  - **REST API Model**: Handles network operations.
  - **WebSocket Model**: Manages WebSocket connections.
  - **Notification Model**: Handles notifications.

---

### **Rendering Approaches**

- **Client-Side Rendering (CSR)**:

  - Pros: Easy to develop, smooth transitions.
  - Cons: Poor SEO, slow initial load.

- **Server-Side Rendering (SSR)**:
  - Pros: Great SEO, fast initial load.
  - Cons: Slow transitions, harder to maintain.

#### **Proposed Solution**:

- Use **CSR + Pre-rendering** for a balance of **SEO** and **smooth transitions**.

---

### **Data Model**

- **Post**:
  - Fields: Author, tags, comments, likes/dislikes.
- **User**:
  - Fields: Role (user/moderator), liked/disliked posts, info fields.
- **Tag**:
  - Fields: Tag name, associated posts.
- **Comment**:
  - Fields: Comments/answers, likes/dislikes.

---

### **Pagination**

- **Types**:
  - **Cursor-Based**: For feeds (infinite scrolling).
  - **Offset-Based**: For search results and comments.

---

### **API Design**

- Use **versioning** for API endpoints:
  - Prefer versioning in **HTTP headers** over the URL.

---

### **Real-Time Updates**

- Use **WebSockets**:
  - Pros: Bi-directional communication, better browser support, developer familiarity.
  - Alternatives:
    - **Short Polling**: Inefficient, high overhead.
    - **Long Polling**: Improved but still suboptimal.
    - **Server-Sent Events (SSE)**: Limited browser support.

---

### Structured Transcription for Video Content

---

- Importance of advanced search for Q&A sites: Simple search by post title isn't effective.
- Solution: Integrate a search template into the search input to provide more flexibility.
- Example: Typing `[author: John Doe]` in the search input retrieves posts authored by John Doe. Square bracket syntax will be parsed server-side to filter results.
- Though initially challenging, this method becomes intuitive and faster with practice, especially for a programmer-centric audience.
- Add a tips panel to guide users in using advanced search functionality.

---

#### **Text Editor Features**

- Basic formatting: Bold, italic, underline, code blocks, lists, links, and images.
- **Text formats to consider**:
  1. **HTML**:
     - Common and straightforward to implement.
     - Advantages: No need for preview mode; flexible and feature-rich.
     - Disadvantages: Deprecated `execCommand`, browser inconsistencies, high maintenance, and complexity.
  2. **Markdown**:
     - Developer-friendly, portable, and easy to read/write.
     - Advantages: Simplicity, familiarity, and cross-platform compatibility.
     - Disadvantages: Requires a preview mode, has a learning curve, and lacks advanced formatting.
  3. **CommonMark**:
     - Standardized Markdown variant with fewer ambiguities.
     - Advantages: Extensibility, compatibility with Markdown parsers, and support for custom syntax.
     - Disadvantages: Inherits Markdown limitations, slightly more complex, less widespread.

---

#### **Workflow for CommonMark-Based Editor**

1. User edits text using CommonMark.
2. CommonMark text is converted to sanitized HTML via a parser.
3. Preview mode displays the sanitized HTML.
4. Published content is saved in the database (both raw CommonMark and HTML versions).
5. Images:
   - Stored via third-party hosting (e.g., Imgur) for simplicity.
   - Considerations include cost-effectiveness and reduced maintenance.

---

#### **Drafts and Autosave**

- Drafts prevent loss of progress due to interruptions.
- Autosave every 10–60 seconds to balance server load and minimize data loss.
- Store drafts on the server for device-independent access, with a retention period of one week.

---

#### **Notifications**

- Real-time updates for comments, subscriptions, etc., using push notifications.
- **Process**:
  1. Push subscription object obtained and stored server-side.
  2. Notifications delivered via a service worker, even when the page is closed.
- Users can opt for email notifications or disable notifications entirely.

---

#### **Security Measures**

- **Common vulnerabilities**: XSS and SQL injection.
- **Sanitization**:
  - Convert CommonMark to HTML and sanitize before saving to the database.
  - Store both raw CommonMark and sanitized HTML for performance optimization.
- **HTTPS**:
  - Encrypt data in transit.
  - Enable HSTS for secure connections.
- Implement spam detection, rate limiting, and content security policies.

---

#### **Performance Optimization**

1. **Network Performance**:
   - Use CDNs with SSL support.
   - Implement HTTP/2, image compression, and lazy loading.
2. **UI Performance**:
   - Virtualize lists and skeleton loaders.
   - Optimize animations and use scalable icons.
3. **JavaScript & CSS**:
   - Reduce DOM operations, split bundles, and prioritize lightweight CSS structures.

---

#### **Accessibility**

- Ensure compatibility with screen readers via semantic HTML, ARIA roles, and alt attributes.
- Maintain sufficient contrast ratios and large clickable areas.
- Advanced techniques: Skip-to-content buttons and ARIA live regions for announcements.

---

#### **Localization**

- Default language: English.
- Translation via community contributions using the i18next format for simplicity.
- No internal translation team due to limited resources.

---

#### **Device Adaptation**

- Optimize for smaller screens using responsive design and touch-friendly elements.
- Prioritize content over decorative elements on mobile devices.

---

#### **Conclusion**

- Functional requirements: Advanced search, real-time updates, and a user-friendly text editor.
- Non-functional requirements: Security, accessibility, localization, and device adaptability.
- Performance and scalability addressed across the stack.

---
