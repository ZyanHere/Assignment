# **[Frontend System Design] - Notion**

**[Watch on Youtube](https://www.youtube.com/watch?v=tsGarhpWOws)**

---

**Introduction**

- How to build a **Notion-like system**.
- Design an **extendable component library**.
- Support custom **Markdown syntax** for new components.
- Implement **Notion-like databases** to group pages and display them in different views (e.g., timeline, calendar).

---

## **Overview of Notion**

- **Notion** is a **web application** that:
  - Allows building custom workspaces.
  - Uses an advanced, custom Markdown syntax.
  - Enables creating **pages** with various components.

#### **Key Features**:

1. Multiple **headings** and text formatting options.
2. **Databases**:
   - Group pages together.
   - Display content in views such as timelines, calendars, and tables.

#### **Pro Tip**:

- Try Notion to better understand the system and its custom Markdown capabilities.

---

## **System Design Plan**

### **Plan Breakdown**:

1. **Collect Requirements**:
   - General Requirements.
   - Additional Requirements.
2. **Provide Mockups**:
   - High-level component hierarchy.
   - Data flow.
3. **Design Markdown Parser**:
   - Support extensible components.
4. **Database Design**:
   - Group pages into custom views (timeline, table, etc.).
5. **State Design**:
   - Manage data flow between components.
6. **API Design**:
   - Save and fetch data.
   - Enable collaborative editing (with basic conflict resolution).
7. **Optimization and Accessibility**:
   - Ensure best performance across devices.
   - Focus on accessibility.

---

## **Step 1: General Requirements**

#### **Main Goals**:

1. Implement a **custom editor** with live element transformation:
   - Automatically convert Markdown syntax into components.
2. Create an **extendable component library**:
   - Allow adding new components with Markdown support.
3. Support **Notion workspace hierarchy**:
   - Pages can have nested subpages.
4. Ensure **content accessibility**.
5. Focus on **performance**:
   - Desktop-first application.
   - Optimize for CPU and network usage.

---

## **Step 2: Advanced Functionality**

#### **Key Features**:

1. **Databases**:

   - Group pages into views such as:
     - Timeline
     - Table
     - Calendar

2. **Offline-first Support**:

   - Efficient network communication for syncing.
   - Submit **delta changes** instead of entire content.

3. **Cross-platform Compatibility**:
   - Multi-viewport support.

---

## **Mockup**

#### **UI Overview**:

1. **Left Panel**:
   - Displays workspace hierarchy (pages and subpages).
2. **Main Content Area**:
   - Editable area for adding components and text.

#### **High-Level Architecture**:

1. **Application Root**:
   - Receives the **root page ID** from global state.
   - Constructs the workspace hierarchy.
2. **Application Router**:
   - Handles navigation between pages.
3. **Page Content Renderer**:
   - Tokenizes raw content.
   - Parses tokens into components.
   - Renders the final output.

---

## **Step 3: Parsing Workflow**

#### **Key Components**:

1. **Lexer**:
   - Converts raw content into tokens.
2. **Parser**:
   - Maps tokens to rendering functions.
3. **Renderer**:
   - Outputs HTML elements for each token.

#### **Editable vs Static Areas**:

- **Editable Area**:
  - Tracks changes using `contenteditable` attribute.
  - Uses **MutationObserver** to detect updates.
- **Static Area**:
  - Cached for performance.

#### **Global State Management**:

- Uses an **event-based dispatcher**.
- Actions trigger updates to the global state.

---

## **Step 4: Component Design**

#### **Types of Components**:

1. **Visual Components**:
   - Render static elements (e.g., headings, paragraphs).
2. **Structural Components**:
   - Accept children components (e.g., sections, containers).
3. **Database Components**:
   - Display grouped pages in custom views (e.g., tables, calendars).

#### **Extensibility**:

- Each component follows a common interface:
  - Easy to add new components.
  - Reuse existing rendering logic.

---

## **Step 5: Database Design**

#### **Key Concepts**:

1. A **database** is a page containing subpages.
2. Custom views are implemented using **plugin metadata**.

#### **Supported Views**:

- Timeline
- Calendar
- Table

#### **Plugins**:

- Each plugin adds metadata for a specific view.
- Example:
  - **Timeline Plugin**:
    - `start`: Start timestamp.
    - `end`: End timestamp.
  - **Calendar Plugin**:
    - `date`: Timestamp for a specific day.
  - **Table Plugin**:
    - `columns`: Column definitions.

---

## **Step 6: API Design**

#### **Key Endpoints**:

1. **Get Page**:
   - Fetch page data by ID.
   - Include specific fields using GraphQL.
2. **Update Page**:
   - Submit delta updates instead of full content.
3. **Subscribe to Changes**:
   - Use **Server-Sent Events (SSE)** for live updates.

#### **GraphQL Advantages**:

- Single endpoint for all queries.
- Fetch only required fields.
- Simplifies state synchronization.

---

## **Step 7: Optimization**

#### **Network Optimization**:

1. Enable **HTTP/2** for parallel requests.
2. Use **Service Workers**:
   - Cache assets for offline mode.
3. Load non-critical resources with `preconnect`.
4. Optimize images:
   - Use **WebP** format.
   - Implement an image optimization service.

#### **Rendering Optimization**:

1. **CSS**:
   - Use GPU-optimized animations.
   - Avoid reflows.
2. **DOM**:
   - Minimize updates to editable areas.
   - Use virtualization for large tables.

---

## **Step 8: Accessibility**

#### **Best Practices**:

1. Use **rem** units for scalable fonts.
2. Provide **color themes** for better visibility.
3. Ensure semantic HTML:
   - Use `<input>` for fields.
   - Add `alt` attributes for images.
4. Implement **keyboard navigation**:
   - Support hotkeys and tab navigation.

---

**Conclusion**

- We’ve covered:
  - Requirements.
  - Component architecture.
  - Parsing workflow.
  - Database and state design.
  - API design and optimizations.

---
