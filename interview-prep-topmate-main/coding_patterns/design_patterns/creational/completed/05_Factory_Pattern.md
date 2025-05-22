## Factory Pattern

- The Factory Pattern is a creational design pattern that ***<ins>provides a way to create objects without specifying the exact class of object that will be created***</ins>. 
- This pattern is particularly useful when clients are supposed to work with any of <ins>***several possible classes that share a common super class or interface***</ins>.

```js
// Traditional Factory Function
function createUser(name, role) {
  var user = {};
  user.name = name;
  user.role = role;
  user.displayInfo = function() {
    console.log(this.name + " is a " + this.role);
  };
  return user;
}

// Creating objects
var adminUser = createUser('Alice', 'Administrator');
var guestUser = createUser('Bob', 'Guest');

// Using objects
adminUser.displayInfo(); // Alice is a Administrator
guestUser.displayInfo(); // Bob is a Guest
```


```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  displayInfo() {
    console.log(`${this.name} is a ${this.role}`);
  }
}

// Factory Class
class UserFactory {
  static createUser(name, role) {
    return new User(name, role);
  }
}

// Creating objects
const adminUser = UserFactory.createUser('Alice', 'Administrator');
const guestUser = UserFactory.createUser('Bob', 'Guest');

// Using objects
adminUser.displayInfo(); // Alice is a Administrator
guestUser.displayInfo(); // Bob is a Guest
```

### Real-Time Example: Vehicle Factory

- Imagine an application for a vehicle rental service where customers can rent different types of vehicles like cars, trucks, and bikes. 


```js
//Traditional JS
function VehicleFactory() {}

VehicleFactory.prototype.createVehicle = function (type, attributes) {
  var vehicleClass = type.charAt(0).toUpperCase() + type.slice(1);
  if (typeof VehicleFactory[vehicleClass] === 'function') {
    return new VehicleFactory[vehicleClass](attributes);
  } else {
    throw new Error(vehicleClass + ' class not found');
  }
};

VehicleFactory.Car = function (attributes) {
  this.type = 'Car';
  this.color = attributes.color;
  this.doors = attributes.doors;
};

VehicleFactory.Truck = function (attributes) {
  this.type = 'Truck';
  this.color = attributes.color;
  this.towingCapacity = attributes.towingCapacity;
};

var factory = new VehicleFactory();
var car = factory.createVehicle('car', { color: 'blue', doors: 4 });
var truck = factory.createVehicle('truck', {
  color: 'red',
  towingCapacity: '3 tons',
});

console.log(car); // Car object with specified attributes
/*
{
    "type": "Car",
    "color": "blue",
    "doors": 4
}
*/

console.log(truck); // Truck object with specified attributes

// {
//     "type": "Truck",
//     "color": "red",
//     "towingCapacity": "3 tons"
// }

```
----


### ES6

```js
//ES6

class VehicleFactory {
  static createVehicle(type, attributes) {
    const VehicleClass = VehicleFactory.classes[type];
    if (!VehicleClass) {
      throw new Error(`${type} class not found`);
    }
    return new VehicleClass(attributes);
  }
}

VehicleFactory.classes = {
  car: class Car {
    constructor({ color, doors }) {
      this.type = 'Car';
      this.color = color;
      this.doors = doors;
    }
  },
  truck: class Truck {
    constructor({ color, towingCapacity }) {
      this.type = 'Truck';
      this.color = color;
      this.towingCapacity = towingCapacity;
    }
  }
};

const car = VehicleFactory.createVehicle('car', { color: 'blue', doors: 4 });
const truck = VehicleFactory.createVehicle('truck', { color: 'red', towingCapacity: '3 tons' });

console.log(car); // Car object with specified attributes
/*
{
    "type": "Car",
    "color": "blue",
    "doors": 4
}
*/

console.log(truck); // Truck object with specified attributes

// {
//     "type": "Truck",
//     "color": "red",
//     "towingCapacity": "3 tons"
// }
```