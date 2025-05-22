# Frontend System Design (Autosuggestion / Typeahead)

[Watch on YouTube](https://www.youtube.com/watch?v=6YrkXWFgiV8)

---

- One of the most popular **system design questions** in front-end interviews: **Design a scalable autocomplete/typeahead component**.
- **Features:**
  - Loading indicators.
  - Keyboard navigation.
  - Highlighting matching text in results.
  - Caching results for performance optimization.
  - Support for both **dynamic** (API-based) and **static** data.

---

### **Requirements Gathering**

#### **Functional Requirements:**

1. **Real-Time Suggestions:**
   - Display suggestions as the user types.
2. **Dynamic and Static Data Support:**
   - Fetch data via API or use locally stored data.
3. **Debouncing:**
   - Optimize API calls by reducing frequency.
4. **Keyboard Navigation:**
   - Enable navigation through results using arrow keys.
5. **Highlight Matches:**
   - Highlight input text within results.
6. **Customizable:**
   - Props like `onChange`, `onBlur`, and `onFocus` for customization.
7. **Custom Loader:**
   - Support for user-defined loading indicators.

#### **Non-Functional Requirements:**

1. **Performance:**
   - Efficient handling of multiple simultaneous operations.
2. **Responsiveness:**
   - Adapt to various screen sizes.
3. **Security:**
   - Protect against cross-site scripting attacks.
4. **Caching:**
   - Store results to reduce redundant API calls.
5. **Accessibility:**
   - Keyboard navigation, screen reader support.
6. **Compatibility:**
   - Cross-browser compatibility.

---

### **High-Level Design (HLD)**

#### **Flow Diagram:**
1. **Input Handling:**
   - Debounce the user’s input.
2. **Cache Check:**
   - If cached, use stored results.
3. **API Call (if needed):**
   - Fetch results from the API if cache is unavailable.
   - **On Success:**
     - Update the cache.
     - Render suggestions.
   - **On Failure:**
     - Display error message.
4. **Highlight Matches:**
   - Emphasize matching text within results.

#### **Diagram Example:**
- Input → Debounce → Cache Check → API Call → Render Results → Highlight Matches

---

### **Low-Level Design (LLD)**

#### **Key Props:**
- `placeholder`: Placeholder text for the input box.
- `fetchSuggestions`: Asynchronous function to fetch suggestions from API.
- `dataKey`: Key for extracting result data (e.g., `name`).
- `customLoader`: Custom JSX for the loading indicator.
- `onSelect`: Callback for when a suggestion is selected.
- `onChange`, `onBlur`, `onFocus`: Event handlers.
- `staticData`: Static array of suggestions.
- `customStyles`: Style customization.

#### **Components:**
1. **Autocomplete:**
   - Handles input, debouncing, and result rendering.
2. **SuggestionsList:**
   - Renders the list of suggestions.
3. **useCache:**
   - Custom hook for managing cache logic.

---

### **Implementation**

#### **Project Setup:**

```bash
npx create-react-app autosuggestion-component
cd autosuggestion-component
npm install
```

#### **Folder Structure:**
```
src/
├── components/
│   ├── Autocomplete.jsx
│   ├── SuggestionsList.jsx
├── hooks/
│   └── useCache.js
├── styles.css
├── App.jsx
└── index.js
```

---

### **Debouncing**

- **Debouncing:** Limits execution of a function by waiting for a specific delay after user input.
- Example: Typing "JavaScript" triggers a single API call only after the user stops typing for a few milliseconds.

#### **Debouncing Implementation:**
- Use **Lodash** library.

```bash
npm install lodash
```

**Example Code:**
```javascript
import debounce from "lodash/debounce";

const getSuggestionsDebounced = debounce(getSuggestions, 300);
useEffect(() => {
  if (inputValue.length > 1) {
    getSuggestionsDebounced(inputValue);
  }
}, [inputValue]);
```

---

### **Advanced Features**

#### **Keyboard Navigation:**
- Navigate suggestions using arrow keys.

#### **Caching:**
- Store results locally to reduce API calls.

#### **Accessibility:**
- Implement ARIA tags for screen reader support.

---

### **Optimization**

- **Performance Enhancements:**
  - Debouncing input.
  - Efficient cache management.
- **Security:**
  - Sanitize user inputs to prevent XSS attacks.

---

### **Conclusion**

- A solid implementation includes debouncing, caching, accessibility, and keyboard navigation.
