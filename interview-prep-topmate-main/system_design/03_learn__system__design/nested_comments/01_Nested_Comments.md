# Frontend System Design (Nested Comments)

[Watch on Youtube](https://www.youtube.com/watch?v=zeY1Vw1dWJk)

---

**Introduction:**
  - This is one of the most asked frontend interview questions in both big and small companies.
  - **Task**: Design scalable nested comments.
  - Features:
    - Add a new comment.
    - Upvote/downvote comments.
    - Edit/delete comments.
    - Reply to comments, forming a nested structure.
    - Sort comments by **Newest**, **Oldest**, or **Most Voted**.

### **Features in the UI**
- **New Comment:**
  - Add a comment by typing and pressing Enter.
  - Example: "New Comment" → Added instantly.
- **Upvote/Downvote:**
  - Upvote/Downvote buttons available for every comment.
- **Edit/Delete:**
  - Edit an existing comment, update text.
  - Delete comments entirely.
- **Replying:**
  - Nested replies to comments.
  - Example: "Hello" added as a reply appears under the respective comment.
- **Real-time Sorting:**
  - Example: Sorting by "Most Voted" rearranges comments in real-time.
- **Scalability:**
  - Tree traversal algorithm used behind the scenes.
  - Uses **Typescript** for strong type definitions.

---

### **Requirements**

#### **Functional Requirements:**
- **Nesting:**
  - Prepare a JSON structure to nest one comment inside another.
  - Support infinite levels of nesting.
- **Comment Management:**
  - Create new comments.
  - Reply to existing comments.
  - Edit/delete comments.
- **Voting:**
  - Upvote/downvote comments.
- **Sorting:**
  - Sort by:
    - **Newest**
    - **Oldest**
    - **Most Voted**

#### **Non-functional Requirements:**
- **Performance Optimization:**
  - Use **virtualization** to render only visible comments in the DOM.
- **Scalability:**
  - Ensure components and data are designed for scalability.
- **Security:**
  - Prevent **Cross-Site Scripting (XSS)** attacks.
- **Maintainability:**
  - Write maintainable, type-safe code using **Typescript**.
- **Accessibility:**
  - Add **ARIA tags**.
  - Support keyboard navigation.

---

### **High-Level Design (HLD)**
- **Overview:**
  - Create a basic wireframe showing:
    - **Comments Component** with features (e.g., nested replies, upvote/downvote).
    - **Sort Component** to sort comments.
  - Arrows indicate nested replies within replies.

**Diagram:**
```
- Parent Comment
  |- Reply 1
  |  |- Reply to Reply 1
  |- Reply 2
```

---

### **Low-Level Design (LLD)**
#### **Data Structure:**
- **Comment Object:**
  ```json
  {
    "id": "1",
    "content": "This is a comment",
    "votes": 10,
    "timestamp": "2024-12-22T12:00:00Z",
    "replies": []
  }
  ```

#### **Component Interface:**
- **Props:**
  - `comments`: Array of comment objects.
  - `onSubmit`: Callback for adding a new comment.
  - `onEdit`: Callback for editing a comment.
  - `onDelete`: Callback for deleting a comment.

---

### **Implementation Steps**
#### **1. Initialize Project**
```bash
npm create vite@latest
# Choose React and JavaScript
cd nested-comments
npm install
```

#### **2. Folder Structure**
```plaintext
/src
  /components
    - NestedComments.jsx
    - Comment.jsx
  /hooks
    - useCommentTree.js
  /data
    - comments.json
```

#### **3. Sample Data (comments.json)**
```json
[
  {
    "id": "1",
    "content": "This is the first comment",
    "votes": 5,
    "timestamp": "2024-12-22T10:00:00Z",
    "replies": [
      {
        "id": "2",
        "content": "This is a reply",
        "votes": 3,
        "timestamp": "2024-12-22T11:00:00Z",
        "replies": []
      }
    ]
  }
]
```

#### **4. Build NestedComments Component**
```jsx
import React, { useState } from 'react';

const NestedComments = ({ comments, onSubmit, onEdit, onDelete }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment 
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onSubmit}
        />
      ))}
    </div>
  );
};

export default NestedComments;
```

#### **5. Comment Component**
```jsx
import React, { useState } from 'react';

const Comment = ({ comment, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    onReply(comment.id, replyContent);
    setReplyContent('');
  };

  return (
    <div>
      <p>{comment.content}</p>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => onDelete(comment.id)}>Delete</button>
      <button onClick={handleReply}>Reply</button>
    </div>
  );
};

export default Comment;
```

#### **6. Tree Traversal Logic (useCommentTree Hook)**
```jsx
const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertComment = (parentId, content) => {
    const newComment = { id: Date.now().toString(), content, votes: 0, replies: [] };
    const addComment = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, replies: [...node.replies, newComment] };
        }
        return { ...node, replies: addComment(node.replies) };
      });
    };
    setComments(addComment(comments));
  };

  return { comments, insertComment };
};

export default useCommentTree;
```

---

### **Remaining Tasks**
- **Features to Implement:**
  - Voting logic (upvote/downvote).
  - Sorting by votes, date.
  - Performance optimization with virtualization.
  - Accessibility and keyboard navigation.
  - Security measures to prevent XSS.
  - TypeScript integration for better type safety.

---
