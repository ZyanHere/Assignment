# Frontend System Design (Toast Component)

[Watch on YouTube](https://www.youtube.com/watch?v=v50uJDEFnqM)

---


### **Introduction**

- A common front-end interview question is to design a **scalable toast component**.
- **Variants:** Success, Info, Warning, Error.
- **Integration:**
  - Import the component via `useNotification` hook.
  - Specify toast **position** (e.g., `top-left`).

#### **Features:**
- Stacking behavior for multiple notifications.
- Each notification has a duration and customizable animation (e.g., slide, pop).

---

### **Requirements Gathering**

#### **Functional Requirements:**
1. **Toast Types:**
   - Success, Error, Info, Warning.
2. **Customization Options:**
   - Text, duration, animation, position.
3. **Animations:**
   - Fade, Pop, Slide (default).
4. **Positions:**
   - `top-left`, `top-right`, `bottom-left`, `bottom-right`.
5. **Close Button:**
   - Dismiss manually.
6. **Duration:**
   - Default: 3 seconds (configurable).
7. **Stacking Behavior:**
   - Notifications stack up/down based on position.
8. **Notification Queue:**
   - Display multiple notifications in order.

#### **Non-Functional Requirements:**
1. **Performance:**
   - Lightweight and efficient.
2. **Accessibility:**
   - Keyboard navigation support (e.g., focus on close button).
3. **User Experience:**
   - Smooth interactions.
4. **Compatibility:**
   - Support for modern web browsers.
5. **Scalability:**
   - Code should be maintainable and extensible for new features.

---

### **High-Level Design (HLD)**

- The **toast component**:
  - Rectangular shape.
  - Includes:
    - **Icon** (based on type).
    - **Text** (customizable).
    - **Close Button** (manual dismissal).

#### **Example:**
| Type        | Icon            | Background Color |
|-------------|-----------------|------------------|
| Success     | Tick Mark       | Green            |
| Info        | Info Symbol     | Blue             |
| Warning     | Warning Symbol  | Yellow           |
| Error       | Error Symbol    | Red              |

---

### **Low-Level Design (LLD)**

#### **Setup:**
1. Initialize a React app:
   ```bash
   npx create-react-app toast-component
   ```
2. Remove unnecessary boilerplate:
   - Delete unused files (e.g., `assets`, `index.css`).
   - Simplify `App.jsx` to a basic template.

#### **Folder Structure:**
```
src/
├── components/
│   ├── Notification.jsx
│   └── Notification.css
├── hooks/
│   └── useNotification.jsx
├── App.jsx
└── index.js
```

#### **Notification Component:**
- Basic UI for the toast notification.

```jsx
// components/Notification.jsx
import React from "react";
import "./Notification.css";

const Notification = ({ type = "info", message, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <span className="icon">{/* Render type-based icons */}</span>
      <span className="message">{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;
```

#### **Custom Hook:**
- Centralized logic for notifications.

```jsx
// hooks/useNotification.jsx
import { useState } from "react";
import Notification from "../components/Notification";

const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState(null);

  const triggerNotification = ({ type, message, duration }) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), duration || 3000);
  };

  const NotificationComponent = notification ? (
    <div className={`notification-container ${position}`}>
      <Notification {...notification} onClose={() => setNotification(null)} />
    </div>
  ) : null;

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
```

---

### **Styling**

- Define styles in `Notification.css`:

```css
/* Notification.css */
.notification {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
}

.notification.success { background-color: green; }
.notification.info { background-color: blue; }
.notification.warning { background-color: yellow; }
.notification.error { background-color: red; }

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
```

---

### **Optimizations**

- **Persistent Timer:**
  - Use `useRef` to store timer values.
- **Positioning Logic:**
  - Add CSS classes for top-right, bottom-left, etc.

```css
/* Example Positions */
.notification-container.top-right {
  position: fixed;
  top: 20px;
  right: 20px;
}
.notification-container.bottom-left {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
```

- **Advanced Features:**
  - Add **stacking behavior**.
  - Use **TypeScript** for better type safety.

---

### **Conclusion**

- Implementing animations, stacking behavior, and accessibility makes the component more robust.
