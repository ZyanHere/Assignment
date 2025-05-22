# **Design JIRA Sprint Board - Frontend System Design**

---

[Watch here in YouTube](https://www.youtube.com/watch?v=1tsAdkqunqQ)

---

### **Introduction**
- **Objective:** Build a Sprint board (or Kanban board).
- **Key Features:**
  - Menu on the left.
  - Main Sprint board in the center with multiple columns.
  - Create tickets inside columns.
  - Move tickets between columns.
- **Topics Covered:**
  - System design framework, requirements, architecture, API design, performance, edge cases, security, accessibility, and internationalization.

---

## **RADIO Framework Overview**

### **RADIO Framework**
- Steps to solve the design problem:
  1. Requirements.
  2. Architecture Design.
  3. Data Model.
  4. Interface Design.
  5. Optimizations.

---

## **Requirements**

### **Functional Requirements**
- UI Design:
  - Dashboard with 3-4 columns by default.
  - Sprint name displayed.
  - Add new tickets and columns.
  - Reorder tickets within columns.
  - Assign tickets to users (one user per ticket).
  - Create new columns.
- **Exclusions:**
  - Filtering tickets by author.
  - Completing Sprints.
  - Searching for tickets.

----

### **Non-Functional Requirements**
1. **Rendering Approach:**
   - Server-Side Rendering (SSR): Fast initial load, good for SEO.
   - Client-Side Rendering (CSR): Better for highly interactive applications.
   - Hybrid Approach: Combine SSR for initial load and CSR for interactivity.
2. **Responsive Design:**
   - Use media queries for adaptive layouts.
3. **Real-Time Updates:**
   - Not required; use polling for updates.
4. **Accessibility & Internationalization:**
   - Ensure compatibility and support for multiple languages.
5. **Performance & Observability:**
   - Track interactions, errors, and network performance.

---

### **Key Edge Cases**
1. **Ticket Creation:**
   - Append new tickets to the bottom of the "In Progress" column.
2. **Vertical Positioning:**
   - Maintain the order of tickets received from the server.
3. **Moving Tickets:**
   - Remove tickets from the previous column and append them to the new column.
4. **Drag-and-Drop API:**
   - Utilize draggable APIs for interaction.
5. **Infinite Scrolling:**
   - Use Intersection Observer for efficient scrolling.

---

## **UI Design**

### **Ticket UI**
- **Ticket Creation:**
  - Modal with ticket metadata (e.g., ID, description).
  - Append to the "To-Do" column upon creation.
- **Drag-and-Drop:**
  - Drag start and drag end events to update the ticket's column.

---

## **High-Level Component Design**

### **MVC Pattern**
- **Components:**
  - **Controller:** Brain of the application; communicates with the server.
  - **Model:** Client-side data store.
  - **View:** Renders UI components.
- **Workflow:**
  - Server ↔ Controller ↔ Data Model ↔ Views.
  - Sub-controllers for board and ticket management.

### **Sub-Controller Functions**
- Create a new board.
- Update existing tickets.
- Move tickets between columns using drag-and-drop events.

---

## **API Design**

### **Endpoints**
1. **Create New Ticket:**
   - **POST** `/create-ticket` with metadata (e.g., title, points, board ID).
2. **Move Ticket:**
   - **POST** `/move-ticket` with ticket ID, board ID, and target column ID.
3. **Create New Column:**
   - **POST** `/create-column` with board ID and column name.
4. **Fetch Board Data:**
   - **GET** `/get-board` with board ID, limit, and pagination.

### **Response Structure**
- **Board Metadata:** Title, description, etc.
- **Columns:** List of columns with IDs and metadata.
- **Tickets:** List of tickets mapped to column IDs.

---

## **Performance Optimizations**

### **Network Performance**
1. **Image Optimization:**
   - Use microservices for resizing and compressing images.
   - Prefer `WebP` or `JPEG` formats.
2. **Compression:**
   - Use Brotli for better compression.
3. **Caching Strategies:**
   - Utilize client-side and server-side caching.

### **Rendering Performance**
- **Server-Side Rendering:**
  - Faster initial load; use for SEO-heavy applications.
- **Virtualization:**
  - Reuse DOM nodes for infinite scrolling.
- **Lazy Loading:**
  - Load non-critical resources on demand.

----

### **JavaScript Optimizations**
1. **Bundle Splitting:**
   - Separate critical and non-critical code.
2. **Polyfills:**
   - Reduce unnecessary polyfills.
3. **CSS-in-JS:**
   - Inline styles for specific components.

---

## **Accessibility**

### **Best Practices**
1. **Screen Reader Compatibility:**
   - Use ARIA attributes (e.g., `aria-live`).
2. **Keyboard Navigation:**
   - Support tab navigation.
3. **Responsive Fonts:**
   - Use `rem` units for scalability.

---

## **Observability**

### **Key Metrics**
1. **User Interaction Tracking:**
   - Monitor views, clicks, and other interactions.
2. **Error Logging:**
   - Capture success and error logs.
3. **Performance Metrics:**
   - Track Time to Interactive (TTI) and Time to Render (TTR).

---

## **Security**

### **Front-End Security Practices**
1. **Cross-Site Scripting (XSS):**
   - Use frameworks like React for built-in sanitization.
   - DomPurify for manual sanitization.
2. **Content Security Policy (CSP):**
   - Restrict resources to trusted domains.
3. **CORS Policy:**
   - Ensure data is accessed only from allowed domains.
4. **HTTPS:**
   - Encrypt all communications.

---