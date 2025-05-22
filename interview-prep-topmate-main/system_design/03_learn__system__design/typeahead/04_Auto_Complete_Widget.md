# Autocomplete Widget / Typeahead Widget

[Watch on YouTube](https://www.youtube.com/watch?v=H5ppQxxi3YQ)

---

### **Introduction**


- This is a commonly asked **frontend system design question**.
- Autocomplete widgets are widely used:
  - Google
  - Facebook
  - Numerous other platforms
- **Purpose:** Enhances search experience by providing suggestions relevant to the user's query.

---

### **Overview**

- **Discussion Topics:**
  - Technical requirements
  - Component architecture
  - APIs to expose to widget consumers
  - Data flow management
  - Cache design
  - Optimizations
  - Accessibility

#### **Basic Requirements**
- **Return top suggestions** based on user input.
- Suggestions should be ordered by:
  - User input recency
  - User input frequency
- **Focus areas:**
  - Extensibility of the component
  - Performance
  - User experience
- **Ensure:** Cross-browser compatibility.

---

### **Component Architecture**

- **Main components:**
  1. Autocomplete component (parent)
  2. Input element (child)
  3. Suggestions list (child)

#### **Details:**
- **Autocomplete component**: Orchestrates everything.
- **Input element**: Controlled component that takes user input.
- **Suggestions list**: Outputs a list of items.
  - Handles views for:
    - No matching suggestions
    - Errors
    - Data loading

#### **Properties of Autocomplete Component:**

| Property            | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `resultUrl`         | Endpoint for loading data.                                                 |
| `onChange`          | Triggered when user input changes.                                         |
| `onConfirm`         | Triggered when a suggestion is confirmed.                                  |
| `onClose`           | Triggered when the close button is clicked.                                |
| `onBlur`            | Triggered when user clicks outside the widget.                            |
| `itemRenderer`      | Defines the appearance of suggestion items (e.g., name, type, industry).   |
| `numResults`        | Specifies the number of results to display.                                |
| `inputRenderer`     | Customizes the input field appearance.                                     |
| `suggestionRenderer`| Customizes how suggestions appear.                                         |
| `loadingRenderer`   | Defines loading visuals.                                                   |
| `debounceInterval`  | Specifies debounce time for requests.                                      |

---

### **Data Flow and API Design**

- **Data Loading Strategies:**
  - Use a `GET` API to fetch suggestions.
  - **Bottleneck:** Network request/response time.

#### **Optimizations:**
- **Preload important data:** Reduces latency.
- **Client-side cache:**
  - Serve data from cache.
  - On cache miss, fetch from server.
  - Update cache with server response.
- **Debounce and throttle requests:**
  - Prevent excessive server calls.

- **React Implementation:**
  - Create a `useDebounce` hook.
  - Use `useEffect` for handling debounced search term changes.

#### **Handling Multiple Requests:**
- **Scenario:** User types quickly, causing multiple asynchronous responses.
- **Solutions:**
  1. Track the last query and ignore outdated responses.
  2. Include the search term in responses for validation.

---

### **Client-Side Cache Design**

- **Basic Structure:**
  - Use a `Map` (key-value pair).
  - **Key:** Search term
  - **Value:** Array of matches

#### **Optimized Structure:**
- Use an **ID-based data structure:**
  - Avoids duplication.
  - Example:
    - Results array contains IDs pointing to actual data.

#### **Storage Options:**
- Use **IndexedDB**:
  - Unlimited storage capacity.
  - Pre-warm cache for instant first query.

---

### **Other Optimizations**

- **Handle large responses:**
  - Implement pagination or infinite scroll.
- **Accessibility Criteria:**
  - Follow guidelines from [GitHub Repository](#).

---
