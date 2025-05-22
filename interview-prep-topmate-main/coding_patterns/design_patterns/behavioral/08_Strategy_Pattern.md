## Strategy Pattern

- The Strategy Pattern is a **`behavioral`** design pattern 
  - that enables selecting an algorithm’s behavior at runtime. 
  - This pattern is particularly useful when an object needs to support multiple variations of an algorithm or behavior, 
  - and the behavior can change dynamically. 
  - By defining a family of algorithms and encapsulating each one, the Strategy Pattern allows the algorithm to vary independently from the client that uses it.

### Strategy Pattern Overview

-	**Purpose**: To define a family of interchangeable algorithms or behaviors that can be selected at runtime.
-	**Encapsulation**: Each strategy (algorithm) is encapsulated in its own class, allowing flexibility and reuse.

> **Real-World Example**: Sorting algorithms in a data processing application. A client can choose between **`quicksort`**, **`mergesort`**, or **`bubblesort`** depending on the data size and characteristics.

---

**Explanation**:

-	**PaymentProcessor (Context)**: Holds a reference to a payment strategy, which it uses to process payments. The strategy can be changed dynamically.
-	**`CreditCardPayment`**, **`PayPalPayment`**, and **`BitcoinPayment`** (Strategies): Each concrete strategy class implements a specific pay method with its own behavior for processing payments.

```js
// Traditional (Using Constructor Functions and Prototypes)

// Context class: PaymentProcessor
function PaymentProcessor(strategy) {
  // Initialize with a payment strategy
  this.strategy = strategy;
}

// Method to set or change the payment strategy
PaymentProcessor.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
};

// Method to process payment with the current strategy
PaymentProcessor.prototype.processPayment = function(amount) {
  this.strategy.pay(amount);
};

// Concrete Strategy: CreditCard
function CreditCardPayment() {}

CreditCardPayment.prototype.pay = function(amount) {
  console.log(`Paying $${amount} using Credit Card.`);
};

// Concrete Strategy: PayPal
function PayPalPayment() {}

PayPalPayment.prototype.pay = function(amount) {
  console.log(`Paying $${amount} using PayPal.`);
};

// Concrete Strategy: Bitcoin
function BitcoinPayment() {}

BitcoinPayment.prototype.pay = function(amount) {
  console.log(`Paying $${amount} using Bitcoin.`);
};

// Usage example
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100); // Output: Paying $100 using Credit Card.

// Switching to a different strategy
paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(150); // Output: Paying $150 using PayPal.
```

----

Explanation:

-	**PaymentProcessor (Context)**: This class sets the current payment strategy and calls its pay method. It provides flexibility to change strategies at runtime.
-	CreditCardPayment, PayPalPayment, and BitcoinPayment (Concrete Strategies): Each class defines its unique implementation of the pay method for processing payments.

```js
// ES6 implementation

// PaymentProcessor class as the Context
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy; // Initialize with a payment strategy
  }

  // Method to set or change the payment strategy
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // Method to process payment with the current strategy
  processPayment(amount) {
    this.strategy.pay(amount);
  }
}

// Concrete Strategy: CreditCardPayment
class CreditCardPayment {
  pay(amount) {
    console.log(`Paying $${amount} using Credit Card.`);
  }
}

// Concrete Strategy: PayPalPayment
class PayPalPayment {
  pay(amount) {
    console.log(`Paying $${amount} using PayPal.`);
  }
}

// Concrete Strategy: BitcoinPayment
class BitcoinPayment {
  pay(amount) {
    console.log(`Paying $${amount} using Bitcoin.`);
  }
}

// Usage example
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100); // Output: Paying $100 using Credit Card.

// Switching to a different strategy
paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(150); // Output: Paying $150 using PayPal.
```
----

### Real-World Scenarios for the Strategy Pattern

#### 1.	Payment Processing System:
-	A payment system might support various payment methods like **credit card**, **PayPal**, and **cryptocurrency**.
-	Using the Strategy pattern, each payment method is encapsulated in a separate class, and the client (e.g., PaymentProcessor) can dynamically select the preferred payment method.

#### 2.	Sorting Algorithms:
-	A data processing application might need to sort data using different algorithms (e.g., **quicksort**, **mergesort**, **bubblesort**) depending on the dataset’s characteristics.
-	With the Strategy pattern, each sorting algorithm is a separate strategy, and the client can select the most efficient algorithm based on data size and structure.

#### 3.	Compression Strategies:
-	A file compression utility might support multiple compression algorithms (e.g., ZIP, RAR, GZIP) that vary in compression level and speed.
-	The Strategy pattern allows implementing each compression method as a separate strategy, enabling the user to choose the optimal one based on file type and size.


----

### Edge Cases in the Strategy Pattern

#### 1.	No Strategy Set:
-	If no strategy is set in the context class (e.g., PaymentProcessor), calling the processPayment method could result in an error.
-	To handle this, consider setting a default strategy or providing a meaningful error message when no strategy is set.
#### 2.	Incompatible Strategies:
-	Some contexts might have specific requirements for strategies (e.g., a strategy that only works with certain payment types).
-	One way to handle this is by validating strategies before setting them. Alternatively, interfaces or type-checking can enforce compatibility.
#### 3.	Changing Strategy Midway:
-	Switching strategies at an inappropriate time might lead to inconsistent results (e.g., in sorting, switching algorithms mid-sort can cause errors).
-	Define clear rules on when strategies can be changed, or disallow certain changes if a task is in progress.

---