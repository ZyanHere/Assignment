# Frontend System Design | Data Table Component Design

---

[Watch on Youtube](https://www.youtube.com/watch?v=-T3Cnevueq8)

---

### Introduction

### Key Topics Discussed

- **UI and Component Architecture**
- Requirements & APIs
- Performance considerations
- Internationalization
- Accessibility
- Cross-device support

---

### Requirements Overview

- **Header and Filtering Component**: Configurable by the consumer.
- **Column Definitions**:
  - Name, width, order, sortability, editability.
  - Columns can contain either primitives or components (e.g., React, Angular, Vue).
- **Page Size Configurations**: E.g., 5 or 20 items per page.
- **Pagination Component**.
- **Row Selection**: Multi-select or single-select.

---

### Non-Functional Requirements

- **Performance**
- **Accessibility**
- **Internationalization**
- **Cross-browser and cross-device support**

---

### API and Data Flow

- Single API endpoint: `GET /products`
- Parameters:
  - Page size, skip count, filter value, sort order.
- Response: List of products with attributes based on table columns.

**Client-Side vs. Server-Side Filtering**:

- **Client-side**: Suitable for smaller datasets loaded in one API call.
- **Server-side**: Recommended for larger datasets to handle pagination and filtering.

---

### Component Architecture

- **Components**:
  - Header (with filtering)
  - Footer (with pagination)
  - Main Body (rows and column headers)
- **States**:
  - Loading, empty, no match (filtering), selected rows.

---

### Component Props and Event Handlers

- **Required Props**:
  - `columns`: Definitions including ID, name, sortability, width, etc.
  - `rows`: Data for each row.
- **Optional Props**:
  - `pagination`: JSX element for pagination.
- **Event Handlers**:
  - `onWidthChange`, `onSelectionChange`, `onSortingChange`, `onFilteringChange`.

---

### Performance Considerations

- Use **React Keys** (`keyBy` property) for reconciliation.
- **Event Delegation**:
  - Single event handler at the table level.
- Avoid multiple state updates by using a collection hook.

---

### Internationalization (i18n)

- Centralized translation file with language keys (e.g., English, Spanish, Chinese).
- Right-to-left (RTL) language support.

---

### Mobile Support

- Options:
  - Accordion rows for less important data.
  - Sticky columns for key data.
  - Hybrid design with consumer opt-in preferences.

---

### Accessibility

- Use semantic table markup.
- Define `scope` attributes for headers.
- Provide `aria-labels` for components.

---
