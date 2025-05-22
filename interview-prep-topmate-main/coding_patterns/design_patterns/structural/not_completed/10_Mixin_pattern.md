## Mixin pattern


- A mixin is an object that provides methods or properties that **can be `shared` among different classes**. 
- This allows for **`reusable` functionality** <ins>**without using**</ins> **`inheritance`**.

```js
// Traditional way of implementing Mixin Pattern

// Mixin object definition with reusable methods
var Mixin = {
  // Method to start an engine
  startEngine: function() {
    console.log(`${this.name} engine started`);
  },
  // Method to stop an engine
  stopEngine: function() {
    console.log(`${this.name} engine stopped`);
  }
};

// Car class definition
function Car(name) {
  this.name = name; // Set the car's name
}

// Function to apply mixin to a target object
function applyMixin(target, mixin) {
  // Iterate over properties in mixin
  for (var key in mixin) {
    // Only copy if property is part of the mixin (not inherited)
    if (mixin.hasOwnProperty(key)) {
      target.prototype[key] = mixin[key];
    }
  }
}

// Applying the mixin to Car class
applyMixin(Car, Mixin);

// Usage example

// Create a new Car instance
var myCar = new Car('Toyota');

// Call mixin methods on Car instance
myCar.startEngine(); // Output: Toyota engine started
myCar.stopEngine(); // Output: Toyota engine stopped
```

----

## ES6 Way:

```js
// ES6 way of implementing Mixin Pattern

// Mixin object definition with reusable methods
const Mixin = {
  // Method to start an engine
  startEngine() {
    console.log(`${this.name} engine started`);
  },
  // Method to stop an engine
  stopEngine() {
    console.log(`${this.name} engine stopped`);
  }
};

// Function to apply mixin to a target class
function applyMixin(target, mixin) {
  // Get property names from mixin
  Object.keys(mixin).forEach(key => {
    // Assign each property to target's prototype
    target.prototype[key] = mixin[key];
  });
}

// Car class definition
class Car {
  // Constructor to initialize car's name
  constructor(name) {
    this.name = name;
  }
}

// Applying the mixin to Car class
applyMixin(Car, Mixin);

// Usage example

// Create a new Car instance
const myCar = new Car('Toyota');

// Call mixin methods on Car instance
myCar.startEngine(); // Output: Toyota engine started
myCar.stopEngine(); // Output: Toyota engine stopped
```