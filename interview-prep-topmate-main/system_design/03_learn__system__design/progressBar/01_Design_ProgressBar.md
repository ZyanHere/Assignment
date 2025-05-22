# **Frontend System Design: Designing a Progress Bar**

**Source:** [Watch on Youtube](https://youtu.be/21ZgaFSRc_4?si=CdTFIasLZJ_J7YTo)

---

### Introduction

- **designing a progress bar**, inspired by a system design interview question.
- Emphasizes that while progress bars may seem simple, **real-world implementation is more complex**, showcasing skills to the interviewer.

---

### Understanding Progress Bars\*\*

- **Key question**: "What is a progress bar?"
  - Commonly used for tracking processes:
    - Upload/download tasks.
    - **Monitoring API calls** (focus for this video).
- **Objective**: Design a progress bar for API call tracking.
  - Displays when API calls are active.
  - Hides for fast, trivial requests.
  - Handles overlapping API requests effectively.

---

### Analyzing Real Cases

- Progress bar should:
  - Start when **slow API requests** occur (e.g., lasting more than 2 units).
  - Stop when all API calls are completed.
  - Handle overlapping API requests gracefully.
- **Key requirements**:
  - Only trigger progress bar for requests exceeding a delay threshold.
  - Set progress to **100% when all API requests finish**.
  - Avoid abrupt hiding—ensure a smooth transition.

---

### Specifying the Scope

- **Scope to cover**:
  - When to **start** and **end** progress bar for slow requests.
  - How to **handle overlapping requests**.
  - **Expose APIs** for other modules to interact with the progress bar.
- **Scope to exclude**:
  - Animations and transitions (handled by interactive designers).
  - Handling timeouts (delegated to the API module).

---

### Assumptions

- **Average API response times**:
  - Default delay threshold: **150–200ms**.
  - API timeout: **60 seconds** (maximum wait time at 95% progress).
- Design progress bar to:
  - Stop at 95% for slow requests until completion.
  - Gradually transition to 100% upon completion.

---

### High-Level Design

1. **Two components**:
   - **UI Layer**:
     - Defines progress bar styles and states.
   - **Logic Layer**:
     - Tracks API calls and triggers state changes.
2. **Progress bar states**:
   - **Idle (0%)**: No active API calls.
   - **Loading (up to 95%)**: Ongoing calls.
   - **Completed (100%)**: All calls finished.
3. **Structure**:
   - **DOM**: Container and bar elements.
   - **API exposure**: Methods for modules to start/end loading.

---

### Key Challenges

- **State Management**:
  - Three states: `Idle`, `Loading`, `Completed`.
  - Ensure proper state transitions:
    - **Start Load**:
      - Increment API count.
      - Transition to `Loading` if necessary.
    - **End Load**:
      - Decrement API count.
      - Transition to `Completed` or back to `Idle`.
  - Handle overlaps and delays effectively.
- **Animation and Timing**:
  - Smooth transitions between states.
  - Handle `95% pause` gracefully.

---

### Trade-Offs and Alternatives

- **Custom Events**: Replace `import/export` for better modularity.
- **Fancier Progress Bar**:
  - Enhanced animations and dynamic speed adjustments.
  - Improved user experience for long-running requests.
- **Shadow DOM**: Isolate styles for robustness.

---

## **Implementation Steps**

### **UI Design**

**JSX Structure**:

```jsx
//ProgressBar.jsx
import { useState, useEffect } from 'react';
import '../components/ProgressBar.css';

export default function Progressbar() {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // we are continuously checking if filled is 100 or not, if it is less than 100 then it keeps on running
    if (filled < 100 && isRunning) {
      const id = setTimeout(() => setFilled((prev) => prev + 2), 250);
      setTimeoutId(id);
      //  if filled is 100, just stop the +2 logic and simply make the state false
    } else if (filled === 100) {
      // Optionally handle completion here
      setIsRunning(false);
    }
    return () => clearTimeout(timeoutId);
  }, [filled, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    //clearing the timeout we are setting as part of the setTimeout
    clearTimeout(timeoutId);
    setFilled(0);
    setIsRunning(false);
  };

  return (
    <div>
      {/* progress bar div */}
      <div className='progressbar'>
        <div
          className={`progressbar-filled ${isRunning ? 'is-running' : ''}`}
          //ex: style="width: 98%"
          style={{ width: `${filled}%` }}
        ></div>
        <span className='progressPercent'>{filled}%</span>
      </div>

      {/* buttons */}
      <button className='btn' onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button className='btn' onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button className='btn' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
```

```css
/* ProgressBar.css */

.progressbar {
  position: relative;
  overflow: hidden;
  width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #eee;
}

.progressPercent {
  font-weight: 600;
  font-family: 'Franklin Gothic Medium';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #eee;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
}

.btn {
  display: block;
  margin: 5rem auto;
  border: none;
  border-radius: 3px;
  outline: none;
  width: 100px;
  height: 40px;
  background-color: #937dc2;
  transition: box-shadow 0.5s;
  font-size: 16px;
  font-family: arial;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  -webkit-box-shadow: inset 100px 0 0 0 #7c54d1;
  box-shadow: inset 100px 0 0 0 #7c54d1;
}

.progressbar-filled {
  height: 100%;
  background-color: #a66cff;
  transition: width 0.5s;
}
```
