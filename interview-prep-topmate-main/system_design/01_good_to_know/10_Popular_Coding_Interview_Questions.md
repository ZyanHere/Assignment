
# Popular Coding Interview Questions For Frontend

[Watch on Youtube](https://www.youtube.com/watch?v=c_kVh_-gQtI)

---

- **Google-like Type Ahead:**
  - Start typing something, get suggestions dynamically.
  - Considerations:
    - Debounce API calls.
    - Display design ethics.
    - Filtering on the client side.

---

- **Google-like Day Calendar:**
  - Display grids for 24 hours, manage meetings data effectively.
  - Challenges include overlapping and multiple day meetings.

---

- **Spreadsheet Design:**
  - Mimicking Microsoft Excel or Google Sheets.
  - Drag and drop functionality.
  - Implement formulas affecting multiple rows/columns.

```javascript
// Example Code for Cell Calculation
function calculateCellValue(cellFormula) {
    // Parse and evaluate cell formula
    return eval(cellFormula);
}
```
---

- **Dynamic Form Rendering:**
  - Render forms based on JSON configuration.
  - Handle validations dynamically (e.g., min length, valid pin code).

---

- **Investment Progress Bar:**
  - Various approaches include CSS animations, JavaScript `setInterval` or `requestAnimationFrame`.

```css
/* Example CSS Animation */
@keyframes progress {
    from { width: 0%; }
    to { width: 100%; }
}
```

---

- **Star Rating Widget:**
  - Handle partial ratings like 4.7 stars with precision.

---

- **Twitter-like Text Area:**
  - Adding @mentions, emojis, character limits.

---

- **To-Do Application:**
  - Filter tasks by active/completed.
  - Optimize rendering performance.

---

- **E-commerce Cart Page:**
  - API integration for pricing, discounts.
  - Handle dynamic total calculations.

---

- **Pagination and Sorting:**
  - Implement backend and frontend pagination.

---

- **Tic-Tac-Toe Game:**
  - Extend to n x n grid.
  - Optimize winner detection to O(1).

---
