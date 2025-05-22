## Prototype Pattern
- The Prototype Pattern in JavaScript is <ins>***useful for creating objects that can share properties and methods***</ins>.
- This pattern ***allows <ins>new objects to inherit properties</ins> from a prototype object***. 
- There are `two` main ways to implement the Prototype Pattern in JavaScript: using **traditional prototype-based inheritance** and the newer **class syntax** introduced in ES6 (ECMAScript 2015).


### Traditional Prototype Pattern: 

- Each object has a property called `prototype`. 
- When you create a new object from a constructor function, the <ins>***new object inherits all of the properties and methods***</ins> from the constructor's prototype.

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating a new Person object
var john = new Person('John Doe', 30);
john.greet(); // Outputs: Hello, my name is John Doe and I am 30 years old.
```


### Real-time Example: Extending the Prototype

- Suppose you have a Vehicle class and you want all types of vehicles (like Car) to inherit from it. 
- You can use the Prototype Pattern **to ensure all Car object share common vehicle properties and methods**, such as starting the engine.

```js
function Vehicle(engineType) {
    this.engineType = engineType;
}

Vehicle.prototype.startEngine = function() {
    console.log(`Starting the ${this.engineType} engine.`);
};

function Car(engineType, doors) {
    Vehicle.call(this, engineType); // Inherit properties
    this.doors = doors;
}

// Inherit methods
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

var myCar = new Car('petrol', 4);
myCar.startEngine(); // Outputs: Starting the petrol engine.
```
---

### ES6 Class Syntax:
- With ES6, **JavaScript introduced a new class syntax** that simplifies the creation of objects and inheritance
- Under the hood, this syntax is syntactic sugar over the existing prototype-based inheritance ***but provides a much cleaner and more readable way to achieve the same result***


```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// Creating a new Person object
const jane = new Person('Jane Doe', 25);
jane.greet(); // Outputs: Hello, my name is Jane Doe and I am 25 years old.
```

### Real-time example of ES6 Classes

```js
class Vehicle {
    constructor(engineType) {
        this.engineType = engineType;
    }

    startEngine() {
        console.log(`Starting the ${this.engineType} engine.`);
    }
}

class Car extends Vehicle {
    constructor(engineType, doors) {
        super(engineType); // Call the parent class constructor
        this.doors = doors;
    }
}

const myCar = new Car('diesel', 4);
myCar.startEngine(); // Outputs: Starting the diesel engine.
```