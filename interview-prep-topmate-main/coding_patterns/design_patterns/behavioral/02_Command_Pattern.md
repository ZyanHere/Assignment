## Command Pattern

The **Command Pattern** is a behavioral design pattern 
- that encapsulates a request as an object, 
- thereby allowing users to parameterize clients with `queues`, `requests`, and `operations`. 
- The Command pattern also provides support for undoable operations by storing commands for future execution or rollback.

### Command Pattern Overview

- **Purpose**: Encapsulate a request as an object, allowing you to store, queue, or log commands, and support undoable operations.
- **Decoupling**: It decouples the object that invokes the operation from the one that performs it.
- **Real-World Example**: Think of a TV remote where each button (command) can execute a specific action (turn on/off, increase volume, etc.) without knowing the details of how each action is performed.

```js
// Traditional (Using constructor functions and prototypes)

// Command interface function to enforce command structure
function Command(execute, undo) {
  this.execute = execute;
  this.undo = undo;
}

// TV Object that will receive the commands
const TV = {
  state: 'off',
  volume: 10,
  turnOn() {
    this.state = 'on';
    console.log("TV is turned ON");
  },
  turnOff() {
    this.state = 'off';
    console.log("TV is turned OFF");
  },
  increaseVolume() {
    this.volume++;
    console.log(`Volume increased to ${this.volume}`);
  },
  decreaseVolume() {
    this.volume--;
    console.log(`Volume decreased to ${this.volume}`);
  },
};

// Concrete commands
const turnOnCommand = new Command(
  () => TV.turnOn(),
  () => TV.turnOff()
);

const turnOffCommand = new Command(
  () => TV.turnOff(),
  () => TV.turnOn()
);

const increaseVolumeCommand = new Command(
  () => TV.increaseVolume(),
  () => TV.decreaseVolume()
);

const decreaseVolumeCommand = new Command(
  () => TV.decreaseVolume(),
  () => TV.increaseVolume()
);

// Remote control that will invoke the commands
function RemoteControl() {
  this.history = [];
}

RemoteControl.prototype.executeCommand = function(command) {
  command.execute();
  this.history.push(command); // Save command to history for potential undo
};

RemoteControl.prototype.undo = function() {
  const command = this.history.pop();
  if (command) {
    command.undo();
  } else {
    console.log("No commands to undo.");
  }
};

// Usage example
const remote = new RemoteControl();

remote.executeCommand(turnOnCommand);     // Output: TV is turned ON
remote.executeCommand(increaseVolumeCommand); // Output: Volume increased to 11
remote.executeCommand(increaseVolumeCommand); // Output: Volume increased to 12
remote.undo();                                // Output: Volume decreased to 11
remote.executeCommand(turnOffCommand);    // Output: TV is turned OFF
remote.undo();                                // Output: TV is turned ON
```

---

### Explanation:

-	**TV Object**: This is the receiver of commands.
-	**Concrete Commands**: We create different command objects that perform specific actions, such as turning the TV on/off or adjusting the volume. Each command has an execute method to perform the action and an undo method to reverse it.
-	**RemoteControl**: Acts as the Invoker, which triggers command execution and stores them for undoing.

----

```js
// ES6 Implementation

// TV Receiver with action methods
const TV = {
  state: 'off',
  volume: 10,
  turnOn() {
    this.state = 'on';
    console.log("TV is turned ON");
  },
  turnOff() {
    this.state = 'off';
    console.log("TV is turned OFF");
  },
  increaseVolume() {
    this.volume++;
    console.log(`Volume increased to ${this.volume}`);
  },
  decreaseVolume() {
    this.volume--;
    console.log(`Volume decreased to ${this.volume}`);
  },
};

// Command class structure
class Command {
  constructor(execute, undo) {
    this.execute = execute;
    this.undo = undo;
  }
}

// Concrete Commands for TV
const turnOnCommand = new Command(() => TV.turnOn(), () => TV.turnOff());
const turnOffCommand = new Command(() => TV.turnOff(), () => TV.turnOn());
const increaseVolumeCommand = new Command(() => TV.increaseVolume(), () => TV.decreaseVolume());
const decreaseVolumeCommand = new Command(() => TV.decreaseVolume(), () => TV.increaseVolume());

// Remote Control as Invoker
class RemoteControl {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command); // Store command in history for undo functionality
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    } else {
      console.log("No commands to undo.");
    }
  }
}

// Usage example
const remote = new RemoteControl();

remote.executeCommand(turnOnCommand);     // Output: TV is turned ON
remote.executeCommand(increaseVolumeCommand); // Output: Volume increased to 11
remote.executeCommand(increaseVolumeCommand); // Output: Volume increased to 12
remote.undo();                                // Output: Volume decreased to 11
remote.executeCommand(turnOffCommand);    // Output: TV is turned OFF
remote.undo();                                // Output: TV is turned ON
```

----

### Real-World Scenarios for Command Pattern

**1.	Home Automation Systems:**
-	Devices like lights, thermostats, and speakers in a smart home can be controlled through commands.
-	A command can turn on a light, and the system can keep a history of actions, allowing the user to undo changes (like dimming the light or adjusting the temperature).

**2.	Text Editors with Undo/Redo Functionality:**
-	Each operation (typing, deleting, formatting) is a command that can be undone/redone.
-	The Command pattern allows storing each user action in a stack, enabling an easy undo/redo history.

**3.	Macro Recording in Software:**
-	In applications like Photoshop, a user may record a sequence of commands to create a macro.
-	Each step (e.g., color adjustment, filter application) is encapsulated as a command, allowing it to be stored, repeated, or undone in sequence.

### Edge Cases in Command Pattern

**1.	Command without Undo Operation:**
- Some commands (e.g., “Send Email”) may not have a meaningful undo operation.
- You could implement a “no-op” (undo does nothing) for such commands, or handle them separately in the Invoker.

**2.	Redo Functionality:**
- Supporting redo requires an additional stack to store undone commands.
- When a command is undone, it’s moved to a redo stack, and executing any new command clears the redo stack.

**3.	Asynchronous Commands:**
- If commands involve asynchronous actions (e.g., network requests), managing execution history can be challenging.
- An approach is to wait until the async action completes before adding it to the history stack, to maintain a correct state for undo actions.

----

