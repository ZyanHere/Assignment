# [Front-End System Design] - Design a Poll Widget

## [Watch on Youtube](https://www.youtube.com/watch?v=lO6GyCvbDm8)

---

#### **Introduction**

- **Topic:** Designing a Facebook-style poll widget.
- **Goal:** Design a poll widget for creating polls and voting on multiple or single options.

#### **System Design Plan**

1. **General Requirements**
2. **Functional Requirements**
3. **Component Architecture**
4. **Property Design and API Design**
5. **State Design**
6. **Optimization**
7. **Accessibility**
8. **Extensibility**

---

#### **General Requirements**

1. **Voting functionality**:
   - Users can vote and revoke.
   - Multiple answers and single answer options supported.
2. **Read-only mode:**
   - If the user is not logged in, they can only view results.
3. **Customization:**
   - Enable component customization:
     - **CSS API**
     - **Render customization** (custom user-defined render function).
4. **NPM distribution:**
   - Component must be distributable as an **NPM package**.
5. **Embeddable integration:**
   - Provide embeddable options for integration into external websites (e.g., via iframe).

---

#### **Functional Requirements**

1. **Device support:**
   - Wide range of devices: mobiles, tablets, and desktops.
2. **Customizable options:**
   - Provide:
     - Rendering functions
     - CSS extensions
     - Callback functions
3. **Callback for votes:**
   - Example: Send data to the server upon voting.
4. **Modes of operation:**
   - **Static mode:** No server required, handles only client-side.
   - **Asynchronous mode:** Works with server data.

---

#### **Component Architecture**

- **Widget Elements:**
  - **Title**
  - **Options list**
  - **Vote/Revoke button**
- **Customizable options:**
  - Default options provided, but users can replace them with custom render functions.

##### **Dependency Graph**

- **Root Component:** Poll Widget
  - **Children Components:**
    - Poll Title
    - Options List
    - Vote/Revoke Button
      - Option Item
      - View Item (Customizable)

---

#### **Property Design and API Design**

##### **Poll Props**

```typescript
interface PollProps {
  options: Option[]; // Array of poll options
  title: string; // Poll title
  readOnly?: boolean; // Read-only mode
  onVote?: (options: Option[]) => void; // Callback when user votes
  renderEditItem?: (option: Option) => HTMLElement; // Render function for edit mode
  renderReadItem?: (option: Option) => HTMLElement; // Render function for read mode
}
```

##### **Option Object**

```typescript
interface Option {
  votes: number; // Number of votes
  order: number; // Order of the option
  name: string; // Option name
}
```

##### **Widget API**

```typescript
interface PollAPI {
  initialize(props: PollProps): void; // Reinitialize with new props
  destroy(): void; // Destroy the widget
}
```

---

#### **State Design**

- **State elements:**
  - **Options:** Array of poll options.
  - **Root Element:** Keeps track of the root DOM element.
  - **Elements Array:** Reusable DOM elements for optimization.
- **Data flow:**
  - Title passed from state to title component.
  - Options passed to options list and subsequently to option items.

---

#### **Optimization**

##### **Network**

- Minify **JS** and **CSS** assets.
- Use **zipping** and **Brotli** compression.
- Serve assets via a **CDN** for faster delivery.
- Provide **ES5** and **ES6** bundles to reduce polyfill overhead.
- Split the package into modular bundles:
  - Core
  - Theming
  - Utilities

##### **Rendering**

- Avoid re-rendering:
  - **Reuse DOM elements** instead of recreating them.
- Use **CSS animations** for smoother transitions.
- Implement skeleton loaders or placeholders for better UX.

##### **JavaScript**

- Use **event delegation**:
  - Listen for events on the root element.
  - Use data attributes to identify clicked elements.

---

#### **Accessibility**

1. **Use rem units**:
   - Ensure support for custom browser settings.
2. **Keyboard shortcuts:**
   - Navigate between options.
   - Vote or revoke with shortcuts.
3. **HTML5 semantics:**
   - Use semantic elements (`form`, `input`) instead of `div` for better screen reader support.
4. **ARIA attributes:**
   - Provide `aria-label` and `aria-description` for options.
   - Use `aria-live` for announcing changes dynamically.

---

#### **Extensibility**

1. **CSS API:**
   - Allow users to customize classes for:
     - Option items
     - Read-only items
     - Titles
2. **ES6 inheritance:**
   - Extend component functionality via class inheritance.
3. **Render functions:**
   - Use custom render functions for selectable and read-only items.

---

#### **Embeddable Integration**

1. **Embeddable routes:**
   - Create a dedicated application route for the poll widget.
   - Example: `/embed/poll/{pollId}`
2. **Integration options:**
   - **Iframe-based:** Provide a script to embed via an iframe.
   - **Provider services:** Register with embedding services (e.g., Embedly).

---

#### **Conclusion**

- Designed a fully functional poll widget with support for:
  - Customization
  - Accessibility
  - Optimization
  - Extensibility
  - Embeddable integration

---
