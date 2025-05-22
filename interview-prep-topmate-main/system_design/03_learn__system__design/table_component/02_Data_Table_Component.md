# Front-End System Design: Data Table Component - YouTube

**[Watch on Youtube](https://www.youtube.com/watch?v=u6jhTo13_No)**

---

### Introduction

- **Topic**: Designing a **Data Table Component**.
  - **Goal**: Create a generic, reusable, and customizable data table component.
  - Should support **different data formats** and allow extensive customization via API.

---

## **System Design Plan**

1. **General Requirements**
2. **Functional Requirements**
3. **Component Architecture**
4. **Props Design (API)**
5. **Event API**
6. **State Design**
7. **Data Flow**
8. **Optimization**
9. **Extensibility**
10. **Accessibility**

---

## **General Requirements**

1. **Support Multiple Data Formats**:
   - **String**, **Number**, **Date**, and **Custom Formats**.
2. **Custom Cell Rendering**:
   - API to allow custom rendering of data.
3. **Sorting and Filtering**:
   - Columns can be **sortable** and **filterable**.
4. **Search Functionality**:
   - Ability to **search** through data based on queries.
5. **Optional Export to CSV**:
   - Exporting data is optional and depends on the interview context.

---

## **Functional Requirements**

1. **Support Large Data Sets**:
   - Efficient handling of thousands of rows.
2. **Device Compatibility**:
   - Works across **mobile devices**, **tablets**, and **desktops**.
3. **Accessibility**:
   - Table must be **screen reader friendly**.
4. **Customizable Styling**:
   - Expose a **CSS API** for styling.
5. **Configurable Columns**:
   - Columns can be hidden, sortable, and have custom comparators.

---

## **Component Architecture**

### **High-Level View**

- The table has columns and rows.
- Each **column** can display data in a custom format.
- Supports **sorting**, **filtering**, and **custom rendering**.

### **Component Hierarchy**

```plaintext
DataTable
├── Header
│   ├── ColumnHeader (sortable, customizable)
├── RowList
│   ├── Row
│       ├── Cell (customizable content)
```

- **Header**: Displays column names and sorting controls.
- **RowList**: Contains all rows based on input data.
- **Cell**: Displays individual cell data.
- **Custom Rendering**: User can define how to display specific cell content.

---

## **Props Design (API)**

### **Props Interface**

```typescript
// DataTable Props
interface DataTableProps<T> {
  data: T[]; // Input data (generic type)
  columns: Column<T>[]; // Column descriptors
  pagination?: boolean; // Enable pagination
  pageSize?: number; // Number of rows per page
  className?: string; // Custom class for styling
}

// Column Definition
interface Column<T> {
  name: string; // Column name
  type: 'string' | 'number' | 'date' | 'custom';
  comparator?: (a: T, b: T) => number; // Custom sorting comparator
  hidden?: boolean; // Hide column
  sortable?: boolean; // Enable sorting
  render?: (datum: T) => HTMLElement; // Custom render function
  update?: (element: HTMLElement, datum: T) => HTMLElement; // Optional update function
}
```

- **`data`**: Input data array.
- **`columns`**: Describes how data is displayed in each column.
- **`pagination`**: Enables pagination.
- **`pageSize`**: Sets rows displayed per page.
- **`className`**: Adds custom styles.
- **Column Properties**:
  - `name`, `type`, `comparator`, `hidden`, `sortable`, `render`, `update`.

---

## **Event API**

### **Supported Events**

```typescript
// Event API
interface EventAPI {
  on(
    event: 'cellSelect' | 'rowSelect' | 'pageChange',
    callback: Function
  ): void;
}
```

1. **`cellSelect`**: Triggered when a cell is clicked.
2. **`rowSelect`**: Triggered when a row is selected.
3. **`pageChange`**: Triggered when pagination is updated.

---

## **State Design**

### **State Interface**

```typescript
interface State<T> {
  data: T[]; // Input data
  filteredData: T[]; // Filtered data
  sortedColumns: Array<{ column: string; order: 'asc' | 'desc' }>; // Sort state
  columns: Column<T>[]; // Column descriptors
  currentPage: number; // Current page number
  pageSize: number; // Rows per page
  elements: HTMLElement[]; // Reused DOM nodes
}
```

- **`data`**: Original input data.
- **`filteredData`**: Data after filters are applied.
- **`sortedColumns`**: Tracks sorting state.
- **`elements`**: Stores DOM nodes for reuse.

---

## **Data Flow**

### **Steps**

1. Pass input **data** and **columns** into the state.
2. Generate the **Header** using column descriptors.
3. Create **RowList** using filtered and paginated data.
4. Pass individual **datum** to `render` and update DOM nodes efficiently.
5. Use **column keys** to link data with cells.

---

## **Optimization**

### **Three Pillars of Performance**

#### **1. Network**

- **Compress Assets**: Use **Brotli** and gzip for JavaScript and CSS.
- **Serve Modern Bundles**:
  - ES6 for modern browsers.
  - ES5 fallback for older browsers.
- **Modular Imports**:
  - Allow importing specific features (core, utilities, theming).
- **Minification**: Minify CSS and JS.
- **Serve via CDN** for faster access.

#### **2. Rendering**

- **Maintain Constant DOM Nodes**:
  - Use **pagination** or **virtualization**.
- **Reuse DOM Elements**:
  - Update existing elements instead of recreating them.
- **CSS Optimization**:
  - Use a **naming convention** to avoid nested selectors.
  - Prefer **CSS animations** over JavaScript animations.
- **Perception Optimization**:
  - Use **placeholders** and **skeleton screens** for smoother UX.

#### **3. JavaScript**

- **Async Operations**:
  - Use **Web Workers** for filtering large datasets.
  - Support **server-side filtering**.
- **Event Delegation**:
  - Attach events to the root element to avoid memory leaks.

---

## **Extensibility**

1. **CSS API**:
   - Expose a customizable **CSS API** for theming.
2. **Custom Render Functions**:
   - Enable custom rendering for cells.
3. **Inheritance**:
   - Allow extending functionality via **ES6 inheritance**.

---

## **Accessibility**

1. **Semantic HTML**:
   - Use `<table>` tags instead of `<div>` for better semantics.
2. **Responsive Design**:
   - Enforce **REM units** to adapt to browser zoom settings.
3. **Keyboard Navigation**:
   - Enable navigation between rows and cells using the **Tab** key.
4. **Screen Reader Support**:
   - Use **`aria-label`** and **`aria-description`** for accessibility.
5. **Shortcuts**:
   - Provide **keyboard shortcuts** for search and filtering.

---

