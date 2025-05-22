# Front-End System Design: Typeahead Widget - YouTube

**[Watch on Youtube](https://www.youtube.com/watch?v=9aOXGE7wAZo)**

### **Introduction**

- **Topic**: Designing a **Typeahead Widget**.
  - This is a **common component** problem in interviews (Facebook, Amazon).
  - Focus on designing the **component**, not the entire product.

---

### **Component Design vs Product Design**

- **Key Difference**:
  - Product Design: Focus on APIs and data entities from the server.
  - Component Design:
    - Focus on **reusability** across the app.
    - Define the **API** and configurations for the component.

---

## **General Plan**

1. **Collect Requirements**:
   - General and Functional Requirements.
2. **Component Architecture**:
   - High-level structure.
   - Dependency graph.
3. **API Design**:
   - Define props and configurations.
4. **Store Design**:
   - State management specific to the widget.
5. **Optimization**:
   - Focus on **performance**.
6. **Accessibility**:
   - Keyboard navigation and screen reader support.

---

## **General Requirements**

1. **Search Functionality**:
   - Provides **search results** based on user input.
2. **Customizable Item Representation**:
   - The **look** of search results can be defined by the user.
3. **Support for Any Data**:
   - Works with both:
     - **Static Data** (client-side).
     - **Asynchronous Data** (server-side).
4. **Performance**:
   - Network-efficient (reduce server calls).
5. **Wide Device Support**:
   - Works across multiple devices and **keyboard-accessible**.

---

## **Functional Requirements**

1. **Network Efficiency**:
   - Avoid making requests on every keystroke.
   - Use **caching** for previous search results.
2. **Configurable Parameters**:
   - **Cache Size**: Define how many results to cache.
   - **Filter Function**: To determine search results.
   - **Item Representation**: How search results are displayed.
   - **Minimum Query Length**: Trigger search only after N characters.
3. **Accessibility**:
   - Fully keyboard accessible.
4. **Performance Optimized**:
   - Fast and lightweight.

---

## **Component Architecture**

- **High-Level Mockup**:
  - A **Search Suggestions** component containing:
    - **Input Box**: To type queries.
    - **Suggestion List**: Displays search results.
- **Component Hierarchy**:
  - **SearchSuggestion**:
    - **SearchInput**
    - **SuggestionList**
      - **SuggestionResult** _(customizable by the user)_

---

## **API Design**

### **Props Interface**:

```typescript
type Props = {
  getResults: (query: string) => Promise<T[]>;
  minQuery?: number; // Default: 3
  maxResults?: number; // Default: 10
  renderItem: (data: T) => HTMLElement;
  updateItem?: (element: HTMLElement) => void;
  cacheSize?: number; // Default: 5
  className?: string;
};
```

**`getResults`**:

- A function that accepts a query and returns a Promise of results.

**`minQuery`**:

- Minimum characters required before triggering the search.

**`maxResults`**:

- Maximum visible results at a time.

**`renderItem`**:

- A user-defined function to build the HTML structure for each result.

**`updateItem`**:

- Updates existing DOM elements to avoid re-rendering.

**`cacheSize`**:

- Defines the size of the cache (number of queries stored).

**`className`**:

- Optional custom class name for styling.

---

## **Store Design**

### State Structure:

```ts
type State = {
  resultMap: Map<string, T[]>; // Cached results
  data: T[]; // Current fetched data
  visibleData: T[]; // Currently visible results
  pageSize: number; // Number of visible results
  currentPage: number; // Current page for pagination
  cacheSize: number;
  query: string; // Current query string
};
```

**`Fetch Results`**:

- User types a query → fetches results from API or static data.

**`Cache Results`**:

- Store previous queries and results in a Fixed Map (LRU style).

**`Pagination`**:

- Display results in pages (e.g., pageSize = 10).

---

## **Optimization**

### **Three Pillars of Performance**

### **Network**

- **Debouncing**:
  - Avoid frequent API calls; debounce user input.
- **Caching**:
  - Cache recent search results **internally**.
- **Cache Timeout**:
  - Define a **time limit** for cache validity.

---

### **Rendering**

- **Virtualization**:
  - Maintain a **constant number** of DOM nodes and update data efficiently.
- **Avoid Reflows**:
  - Use **efficient CSS techniques** to minimize layout shifts.
- **CSS Animations**:
  - Prefer **CSS animations** over JavaScript animations for smoother performance.
- **Perception Optimization**:
  - Use **skeleton screens** and **placeholders** to enhance UX and improve perceived performance.

---

### **JavaScript**

- **Web Workers**:
  - Offload **heavy filtering tasks** for large static datasets to background threads.
- **Server-Side Filtering**:
  - For **large datasets**, delegate filtering to the **server** to reduce client-side computation.

---

## **Accessibility**

### **Keyboard Navigation**

- **Tabbing**:
  - Navigate through search results with the **Tab key**.
- **Shortcuts**:
  - Provide **quick access** to the search bar (e.g., **Cmd + Space**).
- **Close Shortcut**:
  - Press **Esc** to close the search suggestions.

---

### **Visual Optimization**

- Use **REM units** for consistent scaling with browser zoom settings.

---

### **Screen Reader Support**

- **`aria-live`**:
  - Announce search results **dynamically**.
- **Role Attributes**:
  - Provide **semantic roles** for search results to enhance accessibility.

---

## **Other Considerations**

- **NPM Package Distribution**:
  - Package the widget as an **NPM module** for reuse.
- **Integrations**:
  - Allow **seamless integration** into different applications.

---

## **Conclusion**

- **Summary**:
  - Designed a **Typeahead Widget** from scratch:
    - Requirements, API, Store, Optimization, and Accessibility.
---
