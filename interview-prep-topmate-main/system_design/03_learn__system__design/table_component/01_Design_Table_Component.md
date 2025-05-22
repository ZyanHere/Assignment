# Frontend System Design: Table Component

**Source:** [Watch on Youtube ](https://www.youtube.com/watch?v=gjbHOi58sRw)

---

- **Focus:** Designing a great, flexible component instead of a complete web application.
- **Goals:**
  - Build a component usable across various applications by different teams.
  - Explore:
    - Component architecture.
    - High-level design problems.
    - Specific features of the component.
    - Broader topics like **performance** and **accessibility**.

---

## **UI Component vs. Web Application**

- **UI Components:**

  - Smaller in scope, requiring high attention to detail.
  - Prioritize **developer experience** alongside user experience.
  - Focus on modularity and reusability.
  - Delve into:
    - Component state.
    - Lifecycle.
    - Behavior.

- **Web Applications:**
  - Prioritize **user experience** for intuitive interfaces.
  - Consider holistic architecture, including front-end and back-end interactions.

---

## **Questions to Gather Requirements**

1. **Should we support different types of columns?**
   - Yes, including customizable cells.
2. **What data manipulation features are needed?**
   - Sorting, filtering, pagination, and customizable operations.
3. **Should it support export and import?**
   - Yes, **exporting to XLS and CSV** formats.
4. **Client-side or server-side rendering?**
   - Focus on **client-side rendering** for simplicity.
5. **Who is the audience?**
   - Internal use now, but **open-source plans** for the future.

---

## **Functional Requirements**

- **Column Types:**
  - Default types: Text, number, date, and checkbox.
- **Data Manipulation:**
  - Sorting and filtering by parameters.
  - Pagination support.
- **Exporting:**
  - Enable data export to various formats for download.

---

## **Non-Functional Requirements**

- **Accessibility:**
  - Must accommodate users with disabilities.
- **Flexibility:**
  - Allow customization to suit diverse teams and companies.
- **Performance:**
  - Handle unpredictable usage scenarios across devices.
- **Localization:**
  - Support translations into multiple languages.

---

## **Component Architecture**

- **Key Parts:**
  - **View:** Divided into:
    - **Header:** Includes filters.
    - **Body:** Displays data in rows and cells.
    - **Footer:** May include pagination.
  - **Controller:**
    - Handles logic, e.g., preparing input data and handling user events.
  - **No Model:** Data is expected from external sources.

---

## **Design Considerations**

- **Two Experiences:**
  - **User Experience (UX):** For end-users interacting with the UI.
  - **Developer Experience (DX):** For developers configuring the component.
- **Customization:**
  - **Custom Cells:** Allow clients to pass custom components for rendering.

---

## **Design Goals**

- **Key Goals:**
  - High customizability.
  - Accessibility.
  - High performance.
- **Excluded Features:**
  - All-browser support.
  - Offline mode.
  - Mobile adaptation.

---

## **Distribution Options**

- **NPM:**
  - Flexibility for dependency management.
  - Best for complex applications.
- **CDN:**
  - Quick integration via script tags.
  - Ideal for simple websites.
- **Recommendation:** Support **both approaches**.

---

## **Filters and Bookmarks**

### **Filter Types**

- **Default Filter:** Value matches the cell.
- **Checkbox Filter:** True/false selection.
- **Range Filter:** Two inputs, suitable for dates and numbers.
- **Multi-Select Filter:** Allows multiple selections.

### **Bookmarks**

- **Purpose:** Save specific table view settings (e.g., filters, sorting).
- **Storage Options:**
  - **Local Storage:** Persistent but device-specific.
  - **Database:** Requires client integration.

---

## **Customization Features**

- **Resizable Columns:**
  - Allow users to adjust column widths using drag-and-drop.
- **Tooltips:**
  - Shown when column widths are too small.

---

## **Event Delegation**

- **Definition:** Use a single handler for multiple elements via a shared ancestor.
- **Advantages:**
  - Improves performance.
  - Simplifies addition/removal of elements.

---

## **Performance Optimization**

- **Virtualization:**
  - Only render visible rows + buffer for smooth scrolling.
- **Row Buffer:** Configurable for performance tuning.
- **UI Performance Enhancements:**
  - Use skeletons with shimmer effects.
  - Lightweight icons and fonts.

---

## **General Accessibility**

- **Resizable Columns:**
  - Add **ARIA roles** and properties:
    - `aria-label`, `aria-labeledby`.
    - `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- **Focusable Splitters:** Use the `separator` role for enhanced accessibility.

---

## Semantic Texts and Accessibility

- Use **semantic texts** to enhance clarity and accessibility.
- **Correct ARIA attributes and roles** should be implemented for all interactive elements.
- Interactive elements should include **focus** and **hover styles**.
- Elements without titles (e.g., icon buttons) should have:

  - `aria-label`
  - `aria-labelledby`

- Optional features to consider:
  - **High contrast themes**
  - **Right-to-left (RTL) direction** for Arabic and similar languages

### Grid Component Notes:

- Most text content in the grid is user-provided and does **not require translation**.
- However, other text such as button labels and ARIA attributes **must be translated**.

---

## Translation and Language Management

- Default language: **English**
- **General approach:**
  - Store labels in **separate packages** to avoid loading unnecessary assets.
  - Load only the required language data (e.g., German) to reduce data size.

---

## Security Considerations

### General Security

- While sensitive user data is not handled, **security remains critical**.
- Be aware of the security rules of applications using the component, e.g., **Content Security Policy (CSP)**.
- Warn clients about potential impacts of their CSP configurations.

### Exporting Data

- Risks when exporting to CSV for apps like Excel or Google Sheets:
  - **Cells starting with certain symbols are treated as formulas.**
  - Mitigation:
    - Warn clients to remove or modify these symbols.
    - Add safeguards to prevent formula execution.

### Component Safety

- Primary concern: **Execution of malicious code on the page**.
- **Mitigation:**
  - Use tools like **SonarQube**:
    - Tests against standards like **CWE**, **SANS Top 25**, and **OWASP Top 10**.

---

## Rendering Models and Flexibility

### Default: Client-Side Rendering (CSR)

- All data is downloaded and manipulated on the client side.
- Advantages:

  - Simplicity of development
  - Minimal server load

- **Disadvantages:**
  - Inefficient for large data sets or low-performance devices.
  - Data-heavy operations can slow down user experience.

---

### Alternative Rendering Models

#### Server-Side Rendering (SSR)

- Data is manipulated on the **server side**.
- Benefits:
  - High performance for large data sets.
  - Lazy data loading: Users fetch fragments instead of all data at once.
- **Responsibilities for front-end developers:**
  - Fetch and display data from the server.

#### Infinite Row Model

- Similar to SSR but uses **cursor-based pagination** instead of offset-based.
- **Advantages:**
  - Avoids processing skipped rows in large datasets.
  - Prevents inaccurate page windows.
- **Challenges:**
  - Harder to implement compared to traditional SSR.

---

## Summary of Grid Component Features

- **Supported Data Types:**

  - Dates, numbers, checkboxes
  - Custom cell formatters and render functions

- **Functionalities:**

  - Sorting and filtering
  - Client-side pagination
  - Data export in multiple formats

- **Security Features:**

  - Protection against malicious code during export

- **Customization:**

  - Flexible configurations for cells, sorting, and filtering

- **Performance Optimization:**

  - Smooth performance on low-end devices
  - Option to disable animations and adjust pre-rendered buffer size

- **Accessibility:**

  - Resizable columns for usability
  - Compatibility with assistive technologies

- **Translation:**
  - Multilingual support with modular language packages

---