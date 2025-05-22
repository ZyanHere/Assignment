# Design a WYSIWYG Editor

[Watch on Youtube - PART 1](https://www.youtube.com/watch?v=Uzv9kV4NQ3E)
[Watch on Youtube - PART 2](https://www.youtube.com/watch?v=9Z4aHF7AZGc)

---

### Introduction

- **What is a WYSIWYG Editor?**
  - Allows editing content in a form that resembles its appearance.
  - Basic functionality: Editing block and inline style elements.
  - Advanced features: Gifs, images, videos, mentions, attachments, tables, etc.

### Key Topics Discussed

- **Requirements** and **technical options** for designing a WYSIWYG editor.
- **APIs**, **component architecture**, and **optimizations**.

---

### Requirements

- **Block Style Elements**: Examples include:
  - Headings
  - Blockquotes
  - Preformatted text
  - Figures (self-contained content)
  - Lists
  - Div elements
- **Inline Style Elements**: Support editing.
- **Undo/Redo Functionality**.
- Mention functionality using the `@` symbol.

**Non-Functional Requirements**:

- Cross-browser experience.
- Accessibility.
- Performance.

---

### Technical Options

1. **Text Area Element**:

   - **Pros**: Multi-line text input, unlimited characters, fixed-width font.
   - **Cons**: Only supports plain text, not rich text.

2. **Controlled ContentEditable**:

   - **Pros**:
     - Good cross-browser support.
     - Native support for:
       - Selection
       - Cursor behavior
       - Undo/Redo
       - Input events and accessibility.
   - **Cons**:
     - Requires custom rendering for cross-browser compatibility.
     - Needs a custom model to map editor state.

3. **Manual DOM Rendering**:
   - **Pros**: Highly customizable.
   - **Cons**:
     - No native support for undo/redo or cursor behavior.
     - Complex implementation (e.g., drawing a fake cursor).

**Recommendation**: Use **Controlled ContentEditable** for a balance of functionality and customizability.

---

### Editor State Representation

Options for representing the editor state:

1. **DOM Nodes**: Expensive in memory and operations.
2. **JavaScript Object**: Efficient and modular.

**JavaScript Object Structure**:

- **Node Tree**:
  - Root node: Represents the content editable element.
  - Child nodes: Represent elements like paragraphs, headings, links, etc.
- **Selection Object**:
  - Contains `anchor` and `focus` properties to define selection.

**Node Types**:

- **Element Nodes**:
  - Represent structural elements (e.g., paragraphs, headings).
  - Properties: `type`, `children`, `style`, etc.
- **Text Nodes**:
  - Represent text (e.g., bold, italic, underline).

---

### Undo/Redo Functionality

Two approaches to implement undo/redo:

1. **Versioning**: Store all editor states in memory.

   - **Pros**: Simple to implement.
   - **Cons**: High memory usage.

2. **Diff-Based**: Store only the differences between states.
   - **Pros**: Efficient memory usage.
   - **Cons**: Requires merging granular changes.

**Recommendation**: Use immutable data structures for consistency and efficiency.

---
