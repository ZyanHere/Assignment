## Chain of Responsibility Design Pattern

The **Chain of Responsibility (CoR)** design pattern is a behavioral pattern 
- where a <ins>**series of handler objects**</ins> are linked in a chain, 
- and ***each `handler` has the opportunity <ins>to handle a request</ins> or <ins>pass it along the chain</ins> to the next handler***. 
 
> This pattern is useful for decoupling the sender of a request from its receivers, allowing multiple 
handlers to process the request in sequence until one of them fulfills it.

### Chain of Responsibility Pattern Explanation

-	**Purpose**: To pass a request along a chain of handlers until a handler decides to process it.
-	**Loose Coupling**: The sender doesn’t need to know which handler will process the request.
-	**Real-World Example**: Support ticket handling in a tech support center where tickets are routed to the appropriate department based on severity, issue type, etc.

```js
// Handler constructor function
function Handler(level) {
  this.level = level; // Set the level at which this handler can handle the request
  this.nextHandler = null; // Reference to the next handler in the chain
}

// Method to set the next handler in the chain
Handler.prototype.setNext = function(handler) {
  this.nextHandler = handler;
  return handler;
};

// Method to handle the request
Handler.prototype.handleRequest = function(request) {
  if (this.level === request.level) {
    // If the handler's level matches the request level, handle it
    console.log(`${this.constructor.name} handled request: ${request.message}`);
  } else if (this.nextHandler) {
    // Otherwise, pass the request to the next handler in the chain
    this.nextHandler.handleRequest(request);
  } else {
    console.log("Request could not be handled.");
  }
};

// Concrete handler for low-level requests
function LowLevelHandler() {
  Handler.call(this, "low");
}
LowLevelHandler.prototype = Object.create(Handler.prototype);
LowLevelHandler.prototype.constructor = LowLevelHandler;

// Concrete handler for medium-level requests
function MediumLevelHandler() {
  Handler.call(this, "medium");
}
MediumLevelHandler.prototype = Object.create(Handler.prototype);
MediumLevelHandler.prototype.constructor = MediumLevelHandler;

// Concrete handler for high-level requests
function HighLevelHandler() {
  Handler.call(this, "high");
}
HighLevelHandler.prototype = Object.create(Handler.prototype);
HighLevelHandler.prototype.constructor = HighLevelHandler;

// Usage example
const lowHandler = new LowLevelHandler();
const mediumHandler = new MediumLevelHandler();
const highHandler = new HighLevelHandler();

// Set up the chain of responsibility
lowHandler.setNext(mediumHandler).setNext(highHandler);

// Create requests with different levels
const requests = [
  { level: "low", message: "Low-level issue." },
  { level: "medium", message: "Medium-level issue." },
  { level: "high", message: "High-level issue." },
  { level: "critical", message: "Critical-level issue (no handler for this)." }
];

// Pass requests to the chain
requests.forEach(request => lowHandler.handleRequest(request));
```

```js
// Output
LowLevelHandler handled request: Low-level issue.
MediumLevelHandler handled request: Medium-level issue.
HighLevelHandler handled request: High-level issue.
Request could not be handled.
```

----

### ES6 with Classes

```js
// Base Handler class
class Handler {
  constructor(level) {
    this.level = level;
    this.nextHandler = null;
  }

  // Method to set the next handler in the chain
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // Return for chaining
  }

  // Method to handle the request
  handleRequest(request) {
    if (this.level === request.level) {
      console.log(`${this.constructor.name} handled request: ${request.message}`);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log("Request could not be handled.");
    }
  }
}

// Concrete Handlers
class LowLevelHandler extends Handler {
  constructor() {
    super("low");
  }
}

class MediumLevelHandler extends Handler {
  constructor() {
    super("medium");
  }
}

class HighLevelHandler extends Handler {
  constructor() {
    super("high");
  }
}

// Usage example
const lowHandler = new LowLevelHandler();
const mediumHandler = new MediumLevelHandler();
const highHandler = new HighLevelHandler();

// Setting up the chain
lowHandler.setNext(mediumHandler).setNext(highHandler);

// Create requests with different levels
const requests = [
  { level: "low", message: "Low-level issue." },
  { level: "medium", message: "Medium-level issue." },
  { level: "high", message: "High-level issue." },
  { level: "critical", message: "Critical-level issue (no handler for this)." }
];

// Pass requests to the chain
requests.forEach(request => lowHandler.handleRequest(request));
```

----

### Real-world Scenarios for Chain of Responsibility:

### 1.	Technical Support System:
- Requests are classified as low, medium, or high priority.
- Low-priority requests might be handled by a chatbot.
- Medium-priority requests might be routed to a human support agent.
- High-priority requests (e.g., account suspension) go to a senior support team.
- Requests that don’t match any criteria (e.g., critical) are flagged for special review.

### 2.	Logging System:
- Different logging levels (debug, info, warn, error).
- Debug logs are handled only in development environments, while error logs go to production logs.
- Each log level handler forwards the request up the chain if it can’t handle it at its level.
	
### 3.	Form Validation:
- A sequence of validations (e.g., required fields, email format, password strength).
- Each validation handler processes its check and passes it to the next if valid.
- If one handler fails, it stops the chain and returns an error message.