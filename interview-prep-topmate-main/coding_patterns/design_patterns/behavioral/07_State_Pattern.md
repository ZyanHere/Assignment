## State Pattern

- The State Pattern is a behavioral design pattern 

### State Pattern Overview

-	**Purpose**: To allow an object to **alter** its behavior based on its internal state, making it appear as if the object changes class.
-	**Encapsulation**: State-specific behavior is encapsulated in individual state classes, promoting loose coupling and better organization of state-related logic.

> **Real-World Example**: A media player with different states: **playing**, **paused**, and **stopped**. Each state has different actions for play, pause, and stop buttons.

---


**Explanation**:

-	**MediaPlayer (Context)**: The main class that holds the current state of the player. It **`forwards`** requests to the current state’s methods.
-	**PlayingState** and **StoppedState**: Each state has its own implementation of play and stop. ***The context’s behavior changes depending on the state it is currently in.***



```js
// Traditional Way
// Context class representing a MediaPlayer
function MediaPlayer() {
  this.state = new StoppedState(this); // Initial state is "stopped"
}

// Method to change the state
MediaPlayer.prototype.setState = function(state) {
  this.state = state;
};

// Method to press the play button
MediaPlayer.prototype.play = function() {
  this.state.play();
};

// Method to press the stop button
MediaPlayer.prototype.stop = function() {
  this.state.stop();
};

// State class for the playing state
function PlayingState(player) {
  this.player = player;
}

PlayingState.prototype.play = function() {
  console.log("Already playing.");
};

PlayingState.prototype.stop = function() {
  console.log("Stopping playback.");
  this.player.setState(new StoppedState(this.player));
};

// State class for the stopped state
function StoppedState(player) {
  this.player = player;
}

StoppedState.prototype.play = function() {
  console.log("Starting playback.");
  this.player.setState(new PlayingState(this.player));
};

StoppedState.prototype.stop = function() {
  console.log("Already stopped.");
};

// Usage example
const player = new MediaPlayer();
player.play(); // Output: Starting playback.
player.play(); // Output: Already playing.
player.stop(); // Output: Stopping playback.
player.stop(); // Output: Already stopped.
```

----

```js
// ES6 Implementation
// MediaPlayer class as the Context
class MediaPlayer {
  constructor() {
    this.state = new StoppedState(this); // Initial state is "stopped"
  }

  // Method to change the state
  setState(state) {
    this.state = state;
  }

  // Method to press the play button
  play() {
    this.state.play();
  }

  // Method to press the stop button
  stop() {
    this.state.stop();
  }
}

// PlayingState class representing the playing state
class PlayingState {
  constructor(player) {
    this.player = player;
  }

  play() {
    console.log("Already playing.");
  }

  stop() {
    console.log("Stopping playback.");
    this.player.setState(new StoppedState(this.player));
  }
}

// StoppedState class representing the stopped state
class StoppedState {
  constructor(player) {
    this.player = player;
  }

  play() {
    console.log("Starting playback.");
    this.player.setState(new PlayingState(this.player));
  }

  stop() {
    console.log("Already stopped.");
  }
}

// Usage example
const player = new MediaPlayer();
player.play(); // Output: Starting playback.
player.play(); // Output: Already playing.
player.stop(); // Output: Stopping playback.
player.stop(); // Output: Already stopped.
```

---

### Real-World Scenarios for the State Pattern

#### 1.	Media Player (Play, Pause, Stop):
-	A media player might have states like **playing**, **paused**, and **stopped**. Each state changes the behavior of controls like play, pause, and stop.
-	Using the State pattern, **we `encapsulate` each behavior within a separate state class**, making it easier to add new states or modify behavior.
	
#### 2.	Order Processing in E-commerce:
-	An order might go through different stages: **New**, **Processing**, **Shipped**, and **Delivered**.
-	Each state has distinct actions (e.g., canceling might be possible only in certain states).
-	The State pattern allows encapsulating these state-specific rules, making the process easy to manage.

#### 3.	Traffic Light System:
-	A traffic light can be in one of three states: **red**, **yellow**, or **green**.
-	Each state has specific behavior, and the system transitions between states on a timer or sensor input.
-	The State pattern helps manage the behavior and transitions between light states.

----

### Edge Cases in the State Pattern

#### 1.	Invalid State Transitions:
-	Ensure that only valid state transitions are possible (e.g., prevent transitioning directly from PlayingState to PausedState if the application doesn’t support it).
-	Consider adding validation or logic within each state or in the context to manage valid transitions.
#### 2.	Cyclic State Changes:
-	When state changes depend on certain conditions, cyclic state transitions might occur (e.g., switching back and forth between states unintentionally).
-	To handle this, add guards in the context or states to prevent unintended cyclic behavior.
#### 3.	Multiple Context Instances:
-	In cases where there are multiple instances of the context (e.g., two media players), ensure that each instance maintains its own state independently.
-	Implement appropriate handling in state classes to ensure isolated state transitions per instance.

----