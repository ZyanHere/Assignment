
# Design Autocomplete or Typeahead Suggestions

[Watch on Youtube](https://www.youtube.com/watch?v=IKRbWT6LqIY)

---

### Introduction
  - Topic: Autocomplete or Typeahead suggestions.
  - Popular coding interview question, often asked by companies like Google, Flipkart, and startups.
  - Focus on machine coding, optimization, and best practices.

### Key highlights:
  - Concepts like debounce, throttle, and intersection observer.
  - Mock interview conducted by Raj, a UI engineer at Flipkart.

### Importance of machine coding:
  - Entry-level screening tool.
  - Helps assess coding and problem-solving skills.

### **Problem Statement:** Build an autocomplete functionality.
  - **Tech stack:** Vanilla JS, HTML, and CSS (no frameworks).
  - **Must-Have Features:**
    - Display suggestions as user types.
    - Allow selection of suggestions.
  - **Good-To-Have Features:**
    - Performance optimizations.
    - Avoid unnecessary network calls.
    - Reusability and customization.
    - Persist previous search results.

### Expectations:
  - Design similar to Google or Flipkart search.
  - No explicit search button; suggestions appear dynamically.
  - Hardcoded data mimicking API behavior.

### **HTML Structure:**
  - Input box for search.
  - Suggestions list section.
  - Initially hidden suggestions list handled via CSS.

```html
<!-- Basic HTML structure -->
<div id="app">
  <input id="search-box" type="text" placeholder="Search here..." />
  <div id="suggestions" class="hidden"></div>
</div>
```

### **Data File:**
  - Hardcoded data of fruit names to simulate API responses.
  - Exported for use in other files.

```javascript
// data.js
export const fruits = ["Apple", "Orange", "Mango", "Banana", "Berry", "Apricot"];
```

### **Utility Function:**
  - Filters results based on input keyword.
  - Mimics API behavior with delayed response using `setTimeout`.

```javascript
// utils.js
import { fruits } from "./data";

export const getSuggestions = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().startsWith(keyword.toLowerCase())
        )
      );
    }, 1000); // Simulating network delay
  });
};
```

### **Main Script:**
  - Imports utility functions and binds event listeners to the input box.

```javascript
// index.js
import { getSuggestions } from "./utils";

document
  .getElementById("search-box")
  .addEventListener("input", async (event) => {
    const keyword = event.target.value;
    if (!keyword) return; // Reset if input is empty

    const suggestions = await getSuggestions(keyword);
    renderSuggestions(suggestions);
  });

const renderSuggestions = (suggestions) => {
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = ""; // Clear previous suggestions
  suggestionsBox.classList.remove("hidden");
  suggestions.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    suggestionsBox.appendChild(div);
  });
};
```

### **CSS Styles:**
  - Responsive styles for input box and suggestions list.

```css
/* styles.css */
#search-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#suggestions {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  display: none; /* Hidden by default */
}

#suggestions.visible {
  display: block;
}
```

### **Optimization with Debounce:**
  - Reduces the number of API calls by waiting for user inactivity.

```javascript
// utils.js
export const debounce = (func, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
```

```javascript
// index.js
import { debounce } from "./utils";

const handleInput = debounce(async (event) => {
  const keyword = event.target.value;
  if (!keyword) return;

  const suggestions = await getSuggestions(keyword);
  renderSuggestions(suggestions);
}, 500);

document.getElementById("search-box").addEventListener("input", handleInput);
```

### **Key Learnings:**
  - **Debounce vs Throttle:**
    - Debounce waits for user inactivity to execute a function.
    - Throttle limits the execution frequency of a function.

- **Improved User Experience:**
  - Handle race conditions with `AbortController`.

```javascript
// utils.js
export const getSuggestionsWithAbort = (() => {
  let controller;
  return (keyword) => {
    if (controller) controller.abort();
    controller = new AbortController();

    return fetch(`/api/suggestions?query=${keyword}`, {
      signal: controller.signal,
    }).then((response) => response.json());
  };
})();
```

---

## Concepts Explained

| Feature                | Explanation                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Debounce**           | Limits function execution until after a delay of user inactivity.          |
| **Throttle**           | Ensures a function executes at most once per specified time interval.      |
| **Intersection Observer** | Monitors an element's visibility to trigger actions like infinite scrolling. |
| **AbortController**    | Cancels in-flight API calls to prevent race conditions.                    |

---
