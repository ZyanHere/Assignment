## SOLID principles



- The `SOLID` principles <ins>**are a set of five**</ins> design guidelines 
- This will help developers create software that is easier to `understand`, `maintain`, and `extend`.
- can be applied in JavaScript development <ins>**to improve code quality and modularity**</ins>. 

#### 1. Single Responsibility Principle (SRP)

<ins>**Principle**:</ins> 
  - A class <ins>**should have one, and only one**</ins>, reason to change.

<ins>**Problem it solves**:</ins>  
  - SRP <ins>**reduces** the complexity of code</ins>, making it easier to maintain and less susceptible to bugs because changes in one part of the system are less likely to affect other parts.

```js
// Bad practice: 
// A class that handles both user data management and JSON serialization
class UserData {
    constructor(user) {
        this.user = user;
    }

    saveUser() {
        // Save the user data to a database
    }

    serializeUser() {
        return JSON.stringify(this.user);
    }
}

// Good practice: 
// Separate classes with single responsibilities
class UserData {
    constructor(user) {
        this.user = user;
    }

    saveUser() {
        // Save the user data to a database
    }
}

class UserSerializer {
    static serialize(user) {
        return JSON.stringify(user);
    }
}
```
----

#### 2. Open/Closed Principle (OCP)

<ins>**Principle**:</ins> 
  - Software entities should be open for extension, but closed for modification.  

<ins>**Problem it solves**:</ins>  
  -  This principle helps in <ins>managing future changes and new functionalities in an application **without altering existing code**</ins>, thus reducing the risk of introducing bugs.

```js
// Bad practice: A function that is modified every time a new shape is added
function drawShape(shape) {
    if (shape.type === 'circle') {
        drawCircle(shape.radius);
    } else if (shape.type === 'square') {
        drawSquare(shape.side);
    }
}

// Good practice: Use polymorphism to handle different shapes
class Shape {
    draw() {}
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    draw() {
        drawCircle(this.radius);
    }
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    draw() {
        drawSquare(this.side);
    }
}

function drawShape(shape) {
    shape.draw();
}
```
---

#### 3. Liskov Substitution Principle (LSP)

<ins>**Principle**:</ins> 
- `Objects` in a program **should be replaceable** with `instances` of their subtypes without altering the correctness of the program.

<ins>**Problem it solves**:</ins>  

- It ensures that **<ins>a subclass can stand in for its base class without errors**</ins>, leading to enhanced reliability and modularity in code.

```js
// Bad practice: Subclass changes the behavior of the base class in a way that can lead to errors
class Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Cannot fly");
    }
}

// Good practice: Correct hierarchy
class Bird {
    // Common bird behavior
}

class FlyingBird extends Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    // Penguins cannot fly, no fly method here
}
```

---

#### 4. Interface Segregation Principle (ISP)
<ins>**Principle**:</ins> 
  - No client should be forced to depend on methods it does not use.

<ins>**Problem it solves**:</ins>  
- Prevents the design of "fat" interfaces **that have too many responsibilities**, which can lead to `bloated` and `confusing` implementations in classes.

```js
// Bad practice: An interface with too many responsibilities
class Worker {
    work() {}
    eat() {}
}

class HumanWorker extends Worker {
    work() {
        console.log("Working");
    }

    eat() {
        console.log("Eating lunch");
    }
}

class RobotWorker extends Worker {
    work() {
        console.log("Robot working");
    }

    eat() {
        // Robots do not eat, but must implement this method
    }
}

// Good practice: Separated interfaces
class Workable {
    work() {}
}

class Eatable {
    eat() {}
}

class HumanWorker implements Workable, Eatable {
    work() {
        console.log("Working");
    }

    eat() {
        console.log("Eating lunch");
    }
}

class RobotWorker implements Workable {
    work() {
        console.log("Robot working");
    }
}
```

---

#### 5. Dependency Inversion Principle (DIP)
<ins>**Principle**:</ins> 
  - High-level modules should not depend on low-level modules. Both should depend on abstractions.

<ins>**Problem it solves**:</ins>  
- DIP **helps in <ins>reducing the dependencies between the components</ins> of an application**, which simplifies `updates` and `maintenance`. 
- It `enables` high-level modules to remain unaffected by changes in low-level modules and their implementation.

```js
// BAD PRACTICE CODE

// Low-level module
class EmailService {
    sendEmail(message, recipient) {
        // Sends email to the recipient
        console.log(`Sending an email to ${recipient}: ${message}`);
    }
}

// High-level module
// In this example, high-level modules directly depend on low-level modules, 
// leading to tight coupling and reduced flexibility.
class NotificationService {
    constructor() {
        this.emailService = new EmailService();
    }

    notify(message, recipient) {
        this.emailService.sendEmail(message, recipient);
    }
}

// Usage
const notifier = new NotificationService();
notifier.notify("Hello, your order has been shipped!", "customer@example.com");
```

----

```js
// GOOD PRACTICE

// Abstraction
class MessageService {
    send(message, recipient) {}
}

// Low-level module
class EmailService extends MessageService {
    send(message, recipient) {
        // Sends email to the recipient
        console.log(`Sending an email to ${recipient}: ${message}`);
    }
}

// High-level module
class NotificationService {
    constructor(messageService) {
        this.messageService = messageService;
    }

    notify(message, recipient) {
        this.messageService.send(message, recipient);
    }
}

// Usage
const emailService = new EmailService();
const notifier = new NotificationService(emailService);
notifier.notify("Hello, your order has been shipped!", "customer@example.com");
```



-----------

### While the SOLID principles were originally formulated in the context of object-oriented programming, many of the underlying concepts can be applied to <ins>functional programming (FP)</ins> as well.


<ins>**1. Single Responsibility Principle (SRP):**</ins> Pure functions, a core concept in FP, inherently follow SRP because they take input and produce output without side effects.

```js
// Good
const add = (a, b) => a + b
const square = (x) => x * x
```

<ins>**2. Open/Closed Principle (OCP)**:</ins> In FP, functions can be open for extension by using higher-order functions, which take functions as arguments or return them. You can extend functionalities without modifying existing functions.

```js
const multiply = (factor) => (number) => number * factor
const double = multiply(2)
```

<ins>**3. Liskov Substitution Principle (LSP)**:</ins> In FP, if a function expects a certain kind of function as an argument, any function that matches the expected signature should be able to replace it without issues.

```js
const execute = (fn, value) => fn(value)

const increment = (x) => x + 1
const decrement = (x) => x - 1

execute(increment, 5) // 6
execute(decrement, 5) // 4
```

<ins>**4. Interface Segregation Principle (ISP)**:</ins> In FP, you can think of this in terms of function signatures. Don't force a function to accept more parameters than it needs. Use currying and partial application to create simpler function interfaces.

```js
// Instead of:
const drawCircle = (x, y, color, radius) => {
  /*...*/
}

// Use:
const drawCircle = (x, y) => (color) => (radius) => {
  /*...*/
}
```

<ins>**5. Dependency Inversion Principle (DIP)**:</ins> In FP, rather than depending on specific concrete implementations, functions should depend on other functions passed as arguments (higher-order functions).

```js
const fetchData = (fetchImplementation, url) => fetchImplementation(url)

// Using the native fetch:
fetchData(fetch, 'https://api.example.com/data')

// Using a mock fetch for testing:
const mockFetch = (url) => Promise.resolve({ data: 'mockData' })
fetchData(mockFetch, 'https://api.example.com/data')
```

-----