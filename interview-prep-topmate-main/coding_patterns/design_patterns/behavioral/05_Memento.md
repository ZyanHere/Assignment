## Memento Design Pattern

- The Memento Pattern is a **`behavioral`** design pattern 

### Memento Pattern Overview

-	**Purpose**: To **capture** and **save** <ins>the ***internal state of an object*** so it can be restored later, without exposing its implementation details.</ins>
-	**Encapsulation**: The object’s state is ***stored in a <ins>Memento object***</ins>, allowing other objects to save and restore it.

> -	**Real-World Example**: Think of a text editor with undo/redo functionality. Each change creates a **“snapshot”** that can be **`reverted`** to or **`reapplied`**.

----

### Explanation:

-	**TextEditor (Originator)**: The main object that holds the content (state). It can create mementos to save its current state and restore from a memento.
-	**Memento**: Stores the state of the TextEditor. This class provides no operations except returning the state to avoid altering the memento.
-	**History (Caretaker)**: Manages the stack of mementos, allowing us to perform undo operations by restoring the last saved state.


```js
// Traditional Way

// Originator class: holds the main state and creates/restores mementos
function TextEditor() {
  this.content = ''; // The state of the text editor
}

// Method to type (change state)
TextEditor.prototype.type = function(words) {
  this.content += words;
};

// Method to save the current state in a memento
TextEditor.prototype.save = function() {
  return new Memento(this.content);
};

// Method to restore state from a memento
TextEditor.prototype.restore = function(memento) {
  this.content = memento.getContent();
};

// Memento class: encapsulates the state
function Memento(content) {
  this.content = content;
}

// Method to get the saved content
Memento.prototype.getContent = function() {
  return this.content;
};

// Caretaker class: manages saving and restoring mementos
function History() {
  this.history = []; // Stack to store mementos
}

// Method to add a memento to history
History.prototype.push = function(memento) {
  this.history.push(memento);
};

// Method to get the last memento
History.prototype.pop = function() {
  return this.history.pop();
};

// Usage example
const editor = new TextEditor();
const history = new History();

editor.type("Hello, ");
history.push(editor.save()); // Save state after "Hello, "
editor.type("World!");
history.push(editor.save()); // Save state after "World!"

console.log("Current content:", editor.content); // Output: Hello, World!

// Undo to previous state
editor.restore(history.pop());
console.log("After undo:", editor.content); // Output: Hello, 

// Another undo
editor.restore(history.pop());
console.log("After another undo:", editor.content); // Output: (empty string)
```

----

**Explanation**:

-	**TextEditor (Originator)**: The editor can save its state as a memento and restore it from a memento.
-	**Memento**: This class stores a snapshot of the TextEditor’s content. It allows access to the content, but no modifications.
-	**History (Caretaker)**: The history manager saves and retrieves mementos, enabling undo functionality.


```js
// ES6 implementation

// TextEditor class as the Originator
class TextEditor {
  constructor() {
    this.content = '';
  }

  // Method to add text (changing state)
  type(words) {
    this.content += words;
  }

  // Create a new memento containing the current state
  save() {
    return new Memento(this.content);
  }

  // Restore state from a memento
  restore(memento) {
    this.content = memento.getContent();
  }
}

// Memento class to encapsulate and protect the state
class Memento {
  constructor(content) {
    this.content = content;
  }

  // Method to retrieve the stored content
  getContent() {
    return this.content;
  }
}

// History class as the Caretaker
class History {
  constructor() {
    this.history = [];
  }

  // Add a memento to the history stack
  push(memento) {
    this.history.push(memento);
  }

  // Retrieve the last memento from the history stack
  pop() {
    return this.history.pop();
  }
}

// Usage example
const editor = new TextEditor();
const history = new History();

editor.type("JavaScript ");
history.push(editor.save()); // Save state after "JavaScript "
editor.type("Design Patterns");
history.push(editor.save()); // Save state after "Design Patterns"

console.log("Current content:", editor.content); // Output: JavaScript Design Patterns

// Undo to previous state
editor.restore(history.pop());
console.log("After undo:", editor.content); // Output: JavaScript 

// Another undo
editor.restore(history.pop());
console.log("After another undo:", editor.content); // Output: (empty string)
```

---

### Real-World Scenarios for Memento Pattern

#### 1.	Text Editors with Undo/Redo:
-	Each action (typing, deleting) creates a new state snapshot.
-	The Memento pattern allows saving these snapshots, enabling the user to undo/redo actions easily.

#### 2.	Game Progress Saves:
-	Video games often allow players to save progress at specific points (e.g., checkpoints).
-	Each save point represents a memento that can restore the player’s state if they choose to load a previous save.

#### 3.	Configuration Rollbacks in Systems:
-	Systems that allow configuration changes often need to keep track of previous configurations.
-	The Memento pattern allows storing these configurations, so any update can be reverted if needed.

--- 
### Edge Cases in Memento Pattern

#### 1.	Large State Data:
-	Storing a large amount of data (e.g., saving complex object trees in memory) can consume significant resources.
-	One solution is to compress memento data or limit the number of states saved, implementing a “max history” setting.
#### 2.	Frequent State Changes:
-	In applications with frequent changes, saving every change as a memento can result in performance issues.
-	Consider saving only meaningful changes or throttling saves to reduce storage and performance overhead.

#### 3.	Partial Rollbacks:
-	Some applications may need to rollback only part of the state (e.g., just undoing recent settings, not all).
-	A modified memento that only stores partial state snapshots could address this, or implementing multiple caretakers for different state aspects.