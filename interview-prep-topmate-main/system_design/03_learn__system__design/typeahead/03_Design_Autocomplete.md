# **Design Autocomplete / Typeahead - Frontend System Design**

---

[Watch here in YouTube](https://www.youtube.com/watch?v=Ntmy-z-b4pk)

---


### **Introduction**
- **Objective:** Build a typeahead/autocomplete component.
- **Example:**
  - Similar to Google’s search suggestions.
  - Displays a list of recommendations based on input.
- **Video Structure:**
  1. Clarifying Questions.
  2. Functional and Non-Functional Requirements.
  3. High-Level Component Design.
  4. React Component Design & Data Types.
  5. Expected Server Responses.
  6. Edge Cases (e.g., infinite scrolling, caching).
  7. Optimizations and Best Practices.

---

## **Part 1: Clarifying Questions**

### **Key Questions**
1. **Supported Results:**
   - What types of results should the typeahead component support?
   - Example: Two-line rows with title, subtitle, and an optional avatar.

2. **Device Compatibility:**
   - Should the component work on web, mobile, or both?
   - Consider mobile-specific design constraints (e.g., limited space).

3. **Fuzzy Search:**
   - Should the client perform fuzzy search, or will it be handled by the backend?
   - **Example Algorithm:** Levenshtein Distance.

4. **Static Data vs API-Driven:**
   - Should the component support:
     - API-driven data.
     - Static data (local client-side)?

5. **Offline Usage:**
   - Display cached results with a toast notification for offline scenarios.

---

## **Part 2: Functional and Non-Functional Requirements**

### **Functional Requirements**
- **Generalization:**
  - The component must be plug-and-play.
  - Works with static data or API-driven data.
- **Customization:**
  - Input field UI and results UI must be customizable.
- **Data Support:**
  - Support both asynchronous (API) and static data.

### **Non-Functional Requirements**
1. **Device Support:**
   - Responsive design for all screen sizes.
2. **Configurability:**
   - Allow flexibility for API and client-only implementations.
3. **Performance:**
   - Implement debouncing for keystrokes.
   - Minimize redundant network requests.
4. **Offline Usage:**
   - Leverage cached data for offline scenarios.
5. **Accessibility:**
   - Support screen readers, tab navigation, and internationalization.
6. **Observability:**
   - Include logging, tracking, and monitoring.

---

## **Part 3: High-Level Component Design**

### **MVC Pattern**
- **Controller:**
  - Acts as the brain.
  - Handles communication with the server.
  - Stores results in memory or cache.
- **Model:**
  - Client-side store for managing data.
- **View:**
  - Renders the UI and updates based on user interactions.

### **Data Flow**
1. Server → Controller → Data Store → View Layer.
2. View Layer → Controller → Data Store (for interactions).

---

## **Part 4: React Component Design**

### **Component Properties**

#### **1. Data Context**
- **Network Context:**
  - `url`: API endpoint.
  - `resultsKey`: Key to extract results (e.g., `results.data.items`).
  - `pagination`:
    - Types: Offset-based or cursor-based.
    - Options: Page, size, limit, nextCursor.
  - `retryCount`: Retry API calls on failure.
  - `timeout`: API request timeout in milliseconds.
- **Client Context:**
  - `resultsList`: Static data list.
  - `pagination`: Handle large static datasets with offset-based pagination.

#### **2. Interactions**
- Event Handlers:
  - `onChange`: Triggered during typing.
  - `onFocus`: Focus on input field.
  - `onBlur`: Blur from input field.
  - `onSelect`: Row selection event (returns row data).

#### **3. Styling Options**
- **Style Prop:** Inline JavaScript styling.
- **Class Names:** Allow custom CSS classes.
- **Result Renderer:**
  - Accepts a JSX function for custom result rendering.
- **Truncation:**
  - Default truncation for long strings (optional).

#### **4. Debouncing**
- **Enabled by Default:**
  - Prevents frequent API calls.
- **Debounce Duration:**
  - Default: 300ms (customizable).

---

## **Part 5: Expected API Response**

### **Example API Response**
- **Offset-Based Pagination:**
  ```json
  {
    "page": 1,
    "limit": 10,
    "results": [
      { "title": "Example", "subtitle": "Subtitle", "avatar": "image_url" }
    ],
    "totalPages": 5
  }
  ```
- **Cursor-Based Pagination:**
  ```json
  {
    "cursor": "abc123",
    "results": [
      { "title": "Example", "subtitle": "Subtitle", "avatar": "image_url" }
    ],
    "nextCursor": "def456"
  }
  ```

---

## **Part 6: Edge Cases**

### **Infinite Scrolling**
#### **Cursor-Based Pagination**
- **Request:**
  ```
  GET /api/items?cursor=abc123&limit=10
  ```
- **Response:**
  ```
  {
    "cursor": "abc123",
    "results": [...],
    "nextCursor": "def456"
  }
  ```
- **Pros:**
  - Real-time app support.
  - Avoids duplicate data.
- **Cons:**
  - Cannot jump to specific pages.

#### **Offset-Based Pagination**
- **Request:**
  ```
  GET /api/items?page=1&limit=10
  ```
- **Response:**
  ```
  {
    "page": 1,
    "results": [...],
    "totalPages": 5
  }
  ```
- **Pros:**
  - Simple to implement.
  - Allows jumping to specific pages.
- **Cons:**
  - Susceptible to stale data.

### **Scrolling Behavior**
- **Intersection Observer:**
  - Detects when a target node is in view.
  - Triggers data loading before reaching the end of the list.
- **Window.onScroll:**
  - Tracks every pixel scroll (less performant).

---

## **Part 7: Optimizations and Best Practices**

### **Caching**
1. **Cache TTL:**
   - Specify expiration time for cache.
2. **Eviction Policy:**
   - Use mechanisms like LRU (Least Recently Used).
3. **Storage Options:**
   - LocalStorage (limited to ~10MB).
   - IndexedDB (no storage limit).

### **Accessibility**
- Use semantic HTML:
  - `aria-labels`, `role="listbox"`, `role="combobox"`.
- Support keyboard navigation:
  - Tab index for easy focus.
- Provide high contrast and dark mode options.

---

### **Best Practices**
- **Minification:**
  - Reduce file sizes.
- **Lazy Loading:**
  - Load non-critical resources on demand.
- **Bundle Splitting:**
  - Divide app into smaller chunks.
- **Tree Shaking:**
  - Remove dead code.
- **Unit and Integration Testing:**
  - Ensure robust functionality.

---
