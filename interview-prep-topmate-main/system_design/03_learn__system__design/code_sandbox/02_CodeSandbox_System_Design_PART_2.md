

# CodeSandbox Frontend System Design

[Watch on Youtube](https://www.youtube.com/watch?v=o5aoJlcS8Rc)


---

**Mock Interview with Muskin (Senior Software Engineer at Microsoft)**:
- Functional Requirements:
  - Templates to get started.
  - Online editor or IDE with capabilities:
    - Extensions.
    - Code suggestion.
    - Syntax highlighting.
    - Terminal integration.
    - Real-time preview.
  - File Explorer:
    - Multi-file support.
    - File and folder creation, deletion, renaming.
    - Keyboard shortcuts.
    - Debugging capabilities.

---


**Non-Functional Requirements:**
- Application performance must be optimized.
- Real-time preview using client-side techniques.
- UI enhancements:
  - Theming support for developer experience.
- Deployment strategies allowing deployment on various platforms with one click.

---


**Tech Choices for Functional and Non-Functional Requirements:**
- **Code Editor**:
  - Use libraries like Monaco or CodeMirror.
  - Build the frontend using React for modularity and community support.
  - Limitations in onboarding for non-React developers can be managed due to React's popularity.

---

**Real-Time Preview Challenges and Solutions:**
- Problems with server dependency for real-time preview:
  - Latency issues.
  - High storage requirements.
- Solution:
  - Use **Web Workers** for language-specific compilation tasks.
  - Employ **iframes** for isolated sandbox environments.
  - Cross-communication between the iframe and parent window for real-time updates.

---

**System Architecture Overview**:
```plaintext
Sandbox Window:
- File Explorer.
- Editor Area.
- Preview Area (iframe).

Communication:
- Parent ↔ iframe.
- Editor ↔ Web Worker.
- Web Worker ↔ IndexedDB.

Storage:
- Use IndexedDB for local storage of files and compiled output.
- Service Worker for caching static assets.
```

---

**Cross-Tab Communication:**
- Use IndexedDB for persistent storage across tabs.
- Service Worker to cache static assets and ensure smooth preview updates.

---

**Saving Changes to the Server:**
- Implement hooks (e.g., on file save, periodic intervals) for saving:
  - File additions (POST).
  - File updates (PATCH with deltas).
  - File deletions (DELETE).

---

**Debugging in the Preview:**
- Console logs routed via an API to parent UI for display.
- Leverage React DevTools Inline package for debugging React components.

---

**Technical Stack Highlights:**
- **Code Editor**: Monaco Editor.
- **Preview**: Rendered in an iframe.
- **Web Workers**: Handle code transpilation (e.g., Babel).
- **IndexedDB**: Store files, metadata, and transpiled output.
- **Service Workers**: Cache static assets for improved performance.


**File Manager Operations:**
- Operations:
  - List files in the sandbox.
  - Open and edit files.
  - Create, delete, or move files.

---

### API Design
**Example API Endpoints**:

```js
GET /sandbox/{sandbox_id}/files
Response:
{
  "id": "root",
  "name": "src",
  "children": [
    {
      "id": "file_1",
      "name": "app.js",
      "type": "file",
      "content": "console.log('Hello World');"
    }
  ]
}

POST /sandbox/{sandbox_id}/files
Body:
{
  "name": "new_file.js",
  "content": "",
  "parent_id": "root"
}

DELETE /sandbox/{sandbox_id}/files/{file_id}
PATCH /sandbox/{sandbox_id}/files/{file_id}
Body:
{
  "content": "Updated code here."
}
```

---

**Extending IDE Capabilities:**
- Use APIs from Monaco/CodeMirror for adding extensions (e.g., code suggestions, syntax highlighting).

---

**Deployment Options:**
1. Eject project and deploy locally.
2. Integrate with platforms like Vercel/Netlify for seamless deployment.

---

## Conclusion
- Explored system design, tech stack, and implementation details for CodeSandbox.
- Leveraged tools like Web Workers, IndexedDB, and Service Workers for a robust solution.

