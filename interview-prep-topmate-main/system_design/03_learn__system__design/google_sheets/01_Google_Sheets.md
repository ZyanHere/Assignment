# [Front-End System Design] - Google Sheets

[Watch on Youtube](https://www.youtube.com/watch?v=fmIiDLbLc_s)

---

### **Introduction**

- **Topic**:
  - Designing **Google Sheets**:
    - UI perspective
    - Algorithms for resolving cell dependencies
    - **Key Focus**: Basic spreadsheet mechanics and scalability.

---

### **What is Google Sheets?**

- **Overview**:  
  Google Sheets is a **spreadsheet system** used for:
  - Data analysis
  - Financial planning
  - Budget tracking
- **Basic Features**:
  - Perform calculations: E.g., `C2 = A1 + B1`.
  - Support for complex spreadsheets.
  - **Formatting Options**:
    - Bold
    - Italics
    - Strikethrough
  - **Cell Data Types**:
    - Date
    - Number
    - Text

---

### **General Requirements**

1. **Create, Save, and Edit Spreadsheets**
   - Support **basic formatting**:
     - Bold, inline, strikethrough text, etc.
   - Generic extensibility for adding new formatting types.
2. **Support Large Spreadsheets**
   - Default size: **1000 rows x 26 columns** (A-Z).
   - Ability to **extend** rows and columns.
3. **Formula Parsing**
   - Reference other cells.
   - Resolve dependencies.
4. **Column and Row Adjustments**
   - Resize columns and rows.

---

### **Functional Requirements**

1. **Device Compatibility**:
   - Work on a **wide range of devices**:
     - Tablets
     - Phones
     - Laptops
     - Desktops
2. **Performance Optimization**:
   - **Offline feel**: Avoid excessive loading or placeholders.
   - Enable smooth calculations and state management.
3. **Effective State Management**:
   - Optimize storing and accessing spreadsheet data.
4. **Accessibility**:
   - Organize UI elements for enhanced accessibility.
   - Use **proper semantics** and area attributes.

---

### **Action Plan**

1. **Problem Analysis**:
   - Analyze key challenges.
2. **Design Approach**:
   - Choose between **HTML** and **Canvas** rendering.
3. **Components Architecture**:
   - High-level overview of components.
4. **Rendering Design**:
   - Handle vertical and horizontal **virtualization**.
5. **State Management**:
   - Define an efficient data model.
6. **Formula Parsing**:
   - Algorithms for resolving cell dependencies.
7. **Optimizations**:
   - Rendering and state-level optimizations.
8. **Accessibility**:
   - Adhere to accessibility best practices.

---

### **Rendering Approach**

#### **Design Considerations**

1. **Canvas Rendering**:

   - **Pros**:
     - GPU-accelerated.
     - High FPS.
     - Ideal for rendering large datasets.
   - **Cons**:
     - Requires abstraction over primitives.
     - Accessibility challenges.
     - Higher development costs and onboarding time.

2. **HTML DOM Rendering**:
   - **Pros**:
     - Standard and widely used.
     - Easier accessibility with semantic tags and attributes.
     - Cheaper to develop.
   - **Cons**:
     - Memory and CPU intensive for large datasets.
     - Horizontal and vertical virtualization challenges.

---

### **Selected Approach**

- Chosen: **HTML DOM Rendering**
  - Suitable for internal or budget-conscious projects.
  - Easier for engineers to implement and maintain.

---

### **Component Architecture**

#### **High-Level Hierarchy**

1. **Sheet App Root**
   - **Table Editor**:
     - Control Panel
     - Cell Cluster (rows and cells)

---

### **Virtualization Design**

#### **Key Observations**

- **Default Size**: 1000 rows x 26 columns.
- **Virtualization Needs**:
  - **Vertical**: Essential for performance optimization.
  - **Horizontal**: Not critical; default column count (26) is manageable.

#### **Viewport Page Sizes**

- **Dynamic Loading** based on screen size:
  - Phones: 50 elements.
  - Tablets: 100 elements.
  - Laptops: 140 elements.
  - Desktops: 150-200 elements.

---

### **Formula Parsing**

#### **Directed Graph Representation**

- **Key Features**:
  - Directed acyclic graph (DAG) structure.
  - Dependencies between cells.
  - Supports mathematical operations across linked cells.
  - Detects and handles **cyclic dependencies**.

#### **Topological Sorting**

- Used to resolve calculation order.
- Detects cycles to prevent errors.
- **Algorithm Complexity**: `O(V + E)`.

---

### **State Management**

#### **Flattened Map for Table State**

- **Key-Value Structure**:
  - Key: Concatenation of row and column.
  - Value: Cell type.
    - **Attributes**:
      - Formula: Raw input string.
      - Calculated Value: Derived result.
      - Type: E.g., date, number, etc.

#### **Formatting Options**

- Use **Enums** to define formatting types.
- Avoid class-name dependencies for maintainability.

---

### **Optimizations**

1. **Rendering**:
   - Virtualization for DOM performance.
   - Reuse DOM nodes to reduce reflows.
2. **CSS**:
   - Keep naming conventions short and flat.
   - Minify CSS during build.
3. **JavaScript**:
   - Use **Web Workers** for asynchronous calculations.
   - Avoid blocking the main UI thread.

---

### **Accessibility**

1. **HTML Semantics**:
   - Prefer `table`, `tr`, `td` for native accessibility.
   - Use `role="grid"` for interactive grids.
2. **Keyboard Navigation**:
   - Define shortcuts for key actions.
   - Support custom browser settings with `rem` units.

---

### **Conclusion**

- **Summary**:
  - Designed **Google Sheets** focusing on:
    - Virtualization
    - Formula parsing
    - State management
    - Accessibility

---
