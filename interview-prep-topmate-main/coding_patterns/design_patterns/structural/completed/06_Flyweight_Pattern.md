## Flyweight Pattern

- Allows **sharing `common` parts of state** between multiple objects to **conserve** **`memory`**.


```js
// Traditional way

// Flyweight class definition
function Flyweight(make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
}

// FlyweightFactory class definition to manage flyweights
var FlyweightFactory = (function () {
  // Storage for flyweight objects
  var flyweights = {};

  // Method to get or create a flyweight
  return {
    get: function (make, model, processor) {
      // Generate key based on flyweight properties
      var key = make + model + processor;
      // If flyweight doesn't exist, create it
      if (!flyweights[key]) {
        flyweights[key] = new Flyweight(make, model, processor);
      }
      // Return the existing or new flyweight
      return flyweights[key];
    },
    // Method to get the count of flyweights
    getCount: function () {
      // Return the number of keys in the flyweights object
      return Object.keys(flyweights).length;
    }
  };
})();

// Computer class definition
function Computer(make, model, processor, memory, tag) {
  // Use the flyweight for common properties
  this.flyweight = FlyweightFactory.get(make, model, processor);
  // Store unique properties directly in the instance
  this.memory = memory;
  this.tag = tag;
}

// Usage example

// Creating a large number of computers
var computers = [];
function addComputer(make, model, processor, memory, tag) {
  computers.push(new Computer(make, model, processor, memory, tag));
}

// Adding computers with shared properties
addComputer('Dell', 'XPS 13', 'Intel', '16GB', 'C1');
addComputer('Dell', 'XPS 13', 'Intel', '16GB', 'C2');
addComputer('HP', 'Envy', 'Intel', '8GB', 'C3');
addComputer('HP', 'Envy', 'Intel', '8GB', 'C4');
addComputer('Apple', 'MacBook Pro', 'M1', '16GB', 'C5');

// Output the count of flyweight objects
console.log('Flyweight count:', FlyweightFactory.getCount());
// Flyweight count: 3
```

----

## ES6 way

```js
// ES6 way of implementing Flyweight Pattern

// Flyweight class definition
class Flyweight {
  constructor(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
  }
}

// FlyweightFactory class definition to manage flyweights
class FlyweightFactory {
  constructor() {
    // Storage for flyweight objects
    this.flyweights = {};
  }

  // Method to get or create a flyweight
  get(make, model, processor) {
    // Generate key based on flyweight properties
    const key = `${make}-${model}-${processor}`;
    // If flyweight doesn't exist, create it
    if (!this.flyweights[key]) {
      this.flyweights[key] = new Flyweight(make, model, processor);
    }
    // Return the existing or new flyweight
    return this.flyweights[key];
  }

  // Method to get the count of flyweights
  getCount() {
    // Return the number of keys in the flyweights object
    return Object.keys(this.flyweights).length;
  }
}

// Computer class definition
class Computer {
  constructor(make, model, processor, memory, tag) {
    // Use the flyweight for common properties
    this.flyweight = FlyweightFactory.get(make, model, processor);
    // Store unique properties directly in the instance
    this.memory = memory;
    this.tag = tag;
  }
}

// Create a single instance of FlyweightFactory
const flyweightFactory = new FlyweightFactory();

// Usage example

// Creating a large number of computers
const computers = [];
function addComputer(make, model, processor, memory, tag) {
  computers.push(new Computer(make, model, processor, memory, tag));
}

// Adding computers with shared properties
addComputer('Dell', 'XPS 13', 'Intel', '16GB', 'C1');
addComputer('Dell', 'XPS 13', 'Intel', '16GB', 'C2');
addComputer('HP', 'Envy', 'Intel', '8GB', 'C3');
addComputer('HP', 'Envy', 'Intel', '8GB', 'C4');
addComputer('Apple', 'MacBook Pro', 'M1', '16GB', 'C5');

// Output the count of flyweight objects
console.log('Flyweight count:', flyweightFactory.getCount());
// Flyweight count: 3
```