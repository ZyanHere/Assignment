# Front-End System Design - Slider Component

[Watch on Youtube](https://www.youtube.com/watch?v=g_Nhu3u0_t0)

---

### Introduction

- Topic: **Frontend System Design for Slider**.
- **What is a Slider?**
  - A tool that lets users select a value within a range.
  - Decided to design a **custom slider** rather than using the basic browser slider.
- **Types of Sliders:**
  1. Video Slider.
  2. Histogram Slider.
  3. Simple Slider.
- Focus: Designing a single slider.

---

## Functional Requirements

### Functional Features

1. **Immediate Interaction:**
   - Slider responds instantly when moved.
2. **Value Limits:**
   - Min and Max values clearly marked.
3. **Vertical Layout:**
   - Support vertical and horizontal orientations.
4. **Step Support:**
   - Step attribute defines interval between numbers.
   - Slider snaps to nearest step.
5. **Adaptability:**
   - Supports both left-to-right and right-to-left layouts.
6. **Thumb Size:**
   - Ensure the slider thumb is easily visible.
7. **Hover Indication:**
   - Visual change when hovering over the slider.
8. **Disabled State Handling:**
   - Slider does not respond if disabled.

---

## Non-Functional Requirements

1. **Responsive Design:**
   - Works well on all devices.
2. **Browser Compatibility:**
   - Functional across different web browsers.
3. **Accessibility:**
   - Usable with assistive technologies.
4. **Fast Response:**
   - No delays during user interactions.

---

## User Interface (UI)

### Slider Elements

- **Track:**
  - Horizontal line representing the slider.
  - Divided into active (filled) and inactive (plain) sections.
- **Thumb:**
  - Small circle draggable to adjust value.
- **Tick Marks:**
  - Small lines along the track to indicate intervals.
- **Value Indicator:**
  - Speech bubble above the thumb displaying the current value.
- **Min/Max Labels:**
  - Labels on the left and right ends of the track.

---

## Component Interface

### Interface Definition

- **Fields:**
  - `id` (string): Reference the slider element.
  - `name` (string): Reference for JavaScript.
  - `type` (string): `single` or `min-max`.
  - `value` (number, optional): Required for single-thumb slider.
  - `minValue` and `maxValue` (number, optional): Define range.
  - `step` (number, optional): Interval between steps.
  - `shouldShowMinMaxValues` (boolean): Display min/max labels.
  - `valuePosition` (string): Position of the value indicator (e.g., top, left, right).
  - `isVertical` (boolean): Vertical or horizontal slider.
  - `shouldSnap` (boolean): Snap thumb to the nearest step.
  - `isDisabled` (boolean): Disable slider.
  - `thumb` (function, optional): Custom thumb element.
  - `trackStyle` and `stepStyle` (CSS properties): Style customizations.
  - **Events:**
    - `onChange`: Triggered after value changes.
    - `onStart`: Triggered when sliding starts.
    - `onEnd`: Triggered when sliding ends.

---

## Optimizations

### Performance Improvements

1. **Media Queries:**
   - Adjust slider size based on screen size.
2. **CSS Supports Rule:**
   - Write CSS tailored to browser capabilities.
3. **Throttling:**
   - Control animation updates for smoother performance.
4. **Minify and Compress:**
   - Reduce file size for faster loading.
5. **Animation Approaches:**
   - Use `transform: translate` for performance over `left` property.

---

## Accessibility

### Key Features

1. **Keyboard Navigation:**
   - Fully operable using a keyboard.
2. **Contrast:**
   - Ensure sufficient contrast for visibility.
3. **Orientation:**
   - Support both portrait and landscape modes.
4. **Screen Reader Compatibility:**
   - Announce name, type, min/max values, and current value.
5. **Error Identification:**
   - Clearly indicate and describe errors.
6. **Focus Indicators:**
   - Ensure focus is visible for UI elements.

---
