# Javascript Performance Optimization
[Watch on YouTube](https://www.youtube.com/watch?v=I1b2XF8UJBs)

---


- **Topic:** Optimization technique in JavaScript.
- Discussing popular memory leaks in JavaScript and their fixes.
- Who is this for:
  - Freshers exploring JavaScript learning.
  - Seniors aiming for advanced optimizations.
  - Anyone focusing on **memory and space optimization**.
- Change in perspective promised by the end of the episode.
- Highlights:
  - Common mistakes with DOM handling, closures, global variables, timers, listeners, etc.

---

## Memory Leak 1: Accidental Global Variables

- **Key Concepts:**
  - **Window Object:** Global object accessible anywhere in your application.
  - Assigning values to the window object can lead to memory leaks.

### Example Code:
```javascript
window.a = 10;
console.log(window.a); // 10

function example() {
    b = 15; // Accidental global variable
}
example();
console.log(window.b); // 15
```

### Fix:
- Use `"use strict";` at the top of your file.
- Declare variables explicitly using `let`, `const`, or `var`.

---

## Memory Leak 2: Timers (SetInterval/SetTimeout)

- **Issue:**
  - Forgetting to clear intervals after completing the intended task.
  - Causes unnecessary DOM re-rendering.

### Example Code:
```javascript
const timer = setInterval(() => {
    const node = document.getElementById("node");
    if (node) {
        node.textContent = JSON.stringify({ name: "Saiteja Gatadi" });
    }
}, 1000);

// Fix
clearInterval(timer);
```

---

## Memory Leak 3: Event Listeners

- **Problem:**
  - Repeatedly adding event listeners without removing them.
  - Example of React hooks misuse.

### Fix:
1. Remove the listener before adding a new one.
2. Use the `once: true` option in `addEventListener`.

### Example Code:
```javascript
button.addEventListener("click", handleClick, { once: true });
```

---

## Memory Leak 4: DOM References

- **Issue:**
  - Retaining references to deleted DOM elements in global space.
- **Fix:**
  - Clean up references manually or use closures to limit the scope.

---

## Memory Leak 5: Closures

- **Issue:**
  - Unused variables in closures prevent garbage collection.
- **Example Code:**
```javascript
function closureExample() {
    let hugeData = new Array(1000).fill("data");
    return function() {
        console.log(hugeData);
    };
}
```

- **Fix:**
  - Avoid storing large data in closures unnecessarily.

---

## Memory Leak 6: References

- **Issue:**
  - Objects passed by reference can lead to unintended memory usage.
- **Fix:**
  - Nullify unused references explicitly.

---

## Memory Leak 7: Detached Windows

- **Issue:**
  - Memory not released after closing child windows.
- **Fix:**
  - Set the window reference to `null` after closing.

---

## Memory Leak 8: Promises

- **Issue:**
  - Unhandled promises can cause memory issues.
- **Fix:**
  - Always handle both `resolve` and `reject`.

---

## Memory Leak 9: Observers

- **Issue:**
  - Failing to disconnect observers like `ResizeObserver`.
- **Fix:**
  - Use `disconnect()` or `unobserve()` methods.

---

## Memory Leak 10: Infinite Scroll

- **Issue:**
  - Excessive DOM and memory usage in infinite scroll.
- **Fix:**
  - Use virtualization libraries for efficient rendering.

---
