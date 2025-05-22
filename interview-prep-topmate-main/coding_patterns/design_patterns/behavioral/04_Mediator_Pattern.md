## Mediator Design Pattern
- The Mediator pattern provides a central point of communication for different components, <ins>promoting **`loose coupling`**</ins>.
- It allows components to **interact with each other `indirectly` through a `mediator object`** rather than directly.
- This helps in **`reducing`** the dependencies between components and simplifies communication between them.

```js
// Traditional way

// Mediator constructor function
function Mediator() {
  // Initialize an empty array to hold participants
  this.participants = []; 
}

// Register method for the Mediator
Mediator.prototype.register = function(participant) {
  // Add the participant to the array
  this.participants.push(participant); 
  // Set the mediator reference in the participant
  participant.setMediator(this); 
};

// Send method for the Mediator
Mediator.prototype.send = function(message, from, to) {
  if (to) {
    // If a specific recipient is provided, send the message directly
    to.receive(message, from);
  } else {
    // If no specific recipient, broadcast the message to all participants
    this.participants.forEach(participant => {
      // Exclude the sender from receiving their own message
      if (participant !== from) { 
        participant.receive(message, from);
      }
    });
  }
};

// Participant constructor function
function Participant(name) {
  // Set the participant's name
  this.name = name;
  // Initialize the mediator reference as null
  this.mediator = null; 
}

// Method to set the mediator for the participant
Participant.prototype.setMediator = function(mediator) {
  // Set the mediator reference
  this.mediator = mediator; 
};

// Method for the participant to send a message
Participant.prototype.send = function(message, to) {
  // Use the mediator to send the message
  this.mediator.send(message, this, to); 
};

// Method for the participant to receive a message
Participant.prototype.receive = function(message, from) {
  // Log the message with sender and recipient names
  console.log(`${from.name} to ${this.name}: ${message}`); 
};

// Usage example

// Create a new Mediator instance
const mediator = new Mediator();

// Create a new Participant named Alice
const alice = new Participant('Alice'); 

// Create a new Participant named Bob
const bob = new Participant('Bob'); 

// Create a new Participant named Charlie
const charlie = new Participant('Charlie'); 

// Register Alice with the mediator
mediator.register(alice); 

// Register Bob with the mediator
mediator.register(bob); 

// Register Charlie with the mediator
mediator.register(charlie); 

// Alice sends a direct message to Bob
alice.send('Hello, Bob!', bob); 
// Output: Alice to Bob: Hello, Bob!

// Bob sends a direct message to Alice
bob.send('Hi, Alice!', alice); 
// Output: Bob to Alice: Hi, Alice!

// Charlie broadcasts a message to everyone
charlie.send('Hello, everyone!'); 
// Output: Charlie to Alice: Hello, everyone!
// Output: Charlie to Bob: Hello, everyone!
```


### ES6:

```js
// ES6 way of implementing Mediator Pattern

// Mediator class definition
class Mediator {
  // Constructor initializes an empty array for participants
  constructor() {
    this.participants = [];
  }

  // Method to register participants to the mediator
  register(participant) {
    // Add participant to the participants array
    this.participants.push(participant);
    // Set this mediator as the participant's mediator
    participant.setMediator(this);
  }

  // Method to send messages between participants
  send(message, from, to) {
    // If a specific recipient is provided
    if (to) {
      // Send message directly to the specified recipient
      to.receive(message, from);
    } else {
      // If no specific recipient, broadcast message to all participants
      this.participants.forEach(participant => {
        // Exclude the sender from receiving their own message
        if (participant !== from) {
          participant.receive(message, from);
        }
      });
    }
  }
}

// Participant class definition
class Participant {
  // Constructor initializes the participant with a name and null mediator
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }

  // Method to set the mediator for the participant
  setMediator(mediator) {
    // Set the mediator reference
    this.mediator = mediator;
  }

  // Method for the participant to send a message
  send(message, to) {
    // Use the mediator to send the message
    this.mediator.send(message, this, to);
  }

  // Method for the participant to receive a message
  receive(message, from) {
    // Log the received message with sender and recipient names
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

// Usage example

// Create a new Mediator instance
const mediator = new Mediator();
// Create new Participants
const alice = new Participant('Alice');
const bob = new Participant('Bob');
const charlie = new Participant('Charlie');

// Register participants with the mediator
mediator.register(alice);
mediator.register(bob);
mediator.register(charlie);

// Alice sends a direct message to Bob
alice.send('Hello, Bob!', bob); 
// Output: Alice to Bob: Hello, Bob!

// Bob sends a direct message to Alice
bob.send('Hi, Alice!', alice); 
// Output: Bob to Alice: Hi, Alice!

// Charlie broadcasts a message to everyone
charlie.send('Hello, everyone!'); 
// Output: Charlie to Alice: Hello, everyone!
// Output: Charlie to Bob: Hello, everyone!
```