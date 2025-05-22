- As we know that **_arrays and functions are nothing but objects_** in javascript.

  <img src="./images_used/compressed_Images/Prototypical_Inheritance-1.png">


- Javascript uses prototypical inheritance, By this means **_array object/function object gets access to their properties and methods_** of the object through this prototypical inheritance

- There is a way to see this prototype chain (using double underscore proto i.e; `__proto__`)

**Arrays:**


  <img src="./images_used/compressed_Images/Prototypical_Inheritance-2.png">


**Functions:**

  <img src="./images_used/compressed_Images/Prototypical_Inheritance-3.png">


**Object**

  <img src="./images_used/compressed_Images/Prototypical_Inheritance-4.png">


<ins>**Let's go through few examples:**</ins>

```js
// Object 1
let dragon = {
  fire: true,
  name: 'Tanya',
  fight() {
    return 5;
  },
  sing() {
    return `I'm ${this.name}, the breather of fire`;
  },
};

console.log(dragon.fight()); //5
console.log(dragon.sing()); //I'm Tanya, the breather of fire
```

```js
// Object 2
let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  },
};
```

- Let's say if we **_wanted to borrow sing method_** from the dragon object, one of the way is to **_call/apply/bind_**

```js
let singLizard = dragon.sing.bind(lizard);
console.log(singleLizard()); // I'm Kiki, the breather of fire
```

- Above logic **_works totally fine for the object 1_**, but what if our dragon object gets a little more complicated

---

<ins>**What if the object gets more complicated:**</ins>

```js
// Updated Object 1, added if condition to the sing method
let dragon = {
  fire: true,
  name: 'Tanya',
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I'm ${this.name}, the breather of fire`;
    }
  },
};
```

```js
// Object 2, as it was
let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  },
};
```

```js
//trying to bind to the updated dragon object
let singleLizard = dragon.sing.bind(lizard);
console.log(singleLizard()); // undefined

//because lizard object doesn't have fire property set to true
// even though we borrow the method, we don't have the fire accessibility in this case, so it is never going to be surpass if condition.
```

---

#### This is where prototypical inheritance comes in 😎

- What if we create a prototype chain **_so that lizard(object 2) inherit all the properties and methods of dragon(object 1)_**

```js
// Updated Object 1, as per above
let dragon = {
  fire: true,
  name: 'Tanya',
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I'm ${this.name}, the breather of fire`;
    }
  },
};
```

```js
// Object 2, as it was
let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  },
};
```

```js
lizard.__proto__ = dragon;
lizard.sing(); //"I'm Kiki, the breather of fire"
```

```js
lizard.fire; // true
```

```js
lizard.fight; // 1
```

**_What we were able to do here is, <ins>inherit all the properties and methods of dragon object(Object 1)</ins> + <ins>whatever the properties we define in our lizard(Object 2) will stay with us_</ins>**

```js
// isPrototypeOf is being checked in the Dragon Object prototype chain,
// does lizard inherit the properties from dragon?
dragon.isPrototypeOf(lizard); //true
```

---

<ins>**Looping through the object:**</ins>

```js
// Object 1
let dragon = {
  fire: true,
  name: 'Tanya',
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I'm ${this.name}, the breather of fire`;
    }
  },
};

// Object 2, as it was
let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  },
};

lizard.__proto__ = dragon;

for (let prop in lizard) {
  console.log(prop);
}

// Output
name;
fight;
fire;
sing;
```

---

<ins>**Looping through the object:**</ins>

<b>`using hasOwnProperty`:</b>

```js
// Object 1, as it was
let dragon = {
  fire: true,
  name: 'Tanya',
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I'm ${this.name}, the breather of fire`;
    }
  },
};

// Object 2, as it was
let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  },
};

lizard.__proto__ = dragon;

for (let prop in lizard) {
  //added if condition
  if (lizard.hasOwnProperty(prop)) {
    console.log(prop);
  }
}

// Output
name;
fight;
```

<ins>**Note:**</ins> Never use **_double underscore proto_** 😄

<ins>**Why Prototypical Inheritance is useful:**</ins>

- The fact that objects can share prototypes means that you can have **_objects with properties & methods that are pointing to the same place in memory_**, thus being memory efficient.

- Instead of copying the same functionality in different places in memory, **_we have it in just at one place_**

---

##### Objects
<img src="./images_used/compressed_Images/Prototypical_Inheritance-5.png">


##### Functions

<img src="./images_used/compressed_Images/Prototypical_Inheritance-6.png">


<img src="./images_used/compressed_Images/Prototypical_Inheritance-7.png">


**_proto links to prototype_**

_proto is simply a reference or a pointer to Prototype Object_
<img src="./images_used/compressed_Images/Prototypical_Inheritance-8.png">



**_proto links up to the Function()_**
<img src="./images_used/compressed_Images/Prototypical_Inheritance-9.png">


**WHAT IS HAPPENING**

  <img src="./images_used/compressed_Images/Prototypical_Inheritance-10.png">


##### Functions

<img src="./images_used/compressed_Images/Prototypical_Inheritance-11.png">


##### Arrays

<img src="./images_used/compressed_Images/Prototypical_Inheritance-13.png">


<ins>**One thing to remember is:**</ins> **_double underscore proto_** `__proto__` property actually <ins>**_lives on the prototype_**</ins>

---

Safe way to <ins>**create own prototypes**</ins> is by using <ins>**_Object.create()_**</ins>

<img src="./images_used/compressed_Images/Prototypical_Inheritance-14.png">
<img src="./images_used/compressed_Images/Prototypical_Inheritance-15.png">



**_In Functions, <ins>The only time when we use prototypes is when we call constructor functions.</ins>_**

- `Constructor` functions usually **start with a capital letter** and they contain the prototype that we use

<img src="./images_used/compressed_Images/Prototypical_Inheritance-16.png">
<img src="./images_used/compressed_Images/Prototypical_Inheritance-17.png">


```js
typeof Object; //'function'
```

<ins>**One thing to remember is:**</ins>

- Every `function` **has** a `prototype` property and **_it references to an object_** used to attach properties **_that will be inherited by objects_** further down the prototype chain. The last object in the chain is this built in object (Object.prototype)

<ins>**Another thing to remember is:**</ins>

- **_Object_** is a function because it has the prototype and now <ins>**_Object.prototype is what we call the base object_**</ins>

**WHAT IS HAPPENING**
<img src="./images_used/Prototypical_Inheritance-18.png">
<img src="./images_used/Prototypical_Inheritance-19.png">


**Only Functions have prototypes**
<img src="./images_used/Prototypical_Inheritance-20.png">

<ins>**Summary:**</ins>
Using `prototypes`, we **avoid** ***repeating*** ourselves. 
- We avoid adding the same code over and over and over and being inefficient with our memory.

---

<ins><b>Interview Question:</b></ins> Difference between proto and prototype

`__proto__`:

- `__proto__` is a property of an object **_that points to the prototype of the constructor function_** which created that object.

```js
// Define a constructor function
function Person(name) {
  this.name = name;
}

// Add a method to the prototype of the constructor function
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name}`);
};

// Create an instance of Person
let person1 = new Person('Alice');

// Using the instance, call the method defined in the prototype
person1.greet(); // Outputs: Hello, my name is Alice

// `__proto__` is a property of an object (that points to the prototype of the constructor function_** which created that object)
console.log(person1.__proto__ === Person.prototype); // Outputs: true

// The above line confirms that person1.__proto__ points to the object that is Person.prototype

// Using standard functions instead of __proto__
console.log(Object.getPrototypeOf(person1) === Person.prototype); // Outputs: true
```




- It is a part of the internal prototype chain that Javascript uses to look up properties and methods
- is the actual object that is used in the lookup chain to resolve methods
- ***Direct use of proto is discouraged***, Instead the standard functions `Object.setPrototypeOf` and `Object.getPrototypeOf` are recommended

`prototype:`

- prototype is a **_property of a function object_**, <ins>specifically a constructor function</ins>, that is ***used to set the prototype of new objects created with that constructor function***
- Ex: if you have a constructor function `MyConstructor`, MyConstructor.prototype will be the object that new instances created with new MyConstructor will have in their `__proto__`

```js
//Sample Code
function MyConstructor() {}

MyConstructor.prototype.addSomeFunc = function () {};

const newInstance = new MyConstructor();

console.log(newInstance.__proto__ === MyConstructor.prototype); //true
```

#### Refer below screenshot from browser console
<img src="./images_used/Prototypical_Inheritance-21.png">


---

### Another scenarios:

```js
const myObject = { channelName: 'JsCafe' };
console.log(myObject.channelName); // JsCafe
console.log(myObject.hasOwnProperty('channelName')); //true

function myFunction() {
  console.log('Welcome to JsCafe');
}

myFunction.color = 'red';
console.log(myFunction()); //
console.log(myFunction.color); //red
console.log(myFunction.toString()); // prints myFunction as it is
console.log(myFunction.hasOwnProperty('color')); //true
```

---

<strong>Global memory</strong>: Space of memory in browser or in JS engine where `javascript stores variables and functions`.

- When Javascript scans the whole code, it stores the objects and functions in the global memory.

```js
//Example for the above code snippet, the global memory looks like below
myObject: {
  channelName: 'JsCafe';
}
myFunction: f;
```

- Javascript by default adds the property called prototype (for Objects and for Functions) which is again an object (and in this prototype object we have a property named as hasOwnProperty which is a function), some others are like toLocaleString()
- Similarly there are other properties like toLocaleString (which is also a function)
- For every object, Javascript by default adds one more property called `proto`
- Labelled as Object and for this particular function, `proto` points to null

Ex: For myObject by default javascript adds the `proto` property and this points out to the prototype of the Object Function

- So whenever a function is created in javascript it is just not a function but it is a bundle of function and object both.

Ex: myFunction is a function + object which has color property and `proto` (whereas this `proto` property points out to )

![image](https://user-images.githubusercontent.com/42731246/215369453-f30b0815-9ca2-4fe9-b869-6f62706970af.png)

- For the myFunction when we perform hasOwnProperty then the Javascript finds the hasOwnProperty inside the Object (look out the proto mapping)

---

## Few more

### Prototypical Inheritance and Prototype Chain

- ES6 introduced classes which is a modern way to construct objects
- ES6 classes are considered to be syntactic sugar

#### Example 1

```js
// Object literals
const person = {
  alive: true,
};

const musician = {
  plays: true,
};

console.log(musician.plays); //true
console.log(musician.alive); //undefined
```

---

#### Example 2 (adding proto property)

- This is happening through inheritance
- person object is the parent/proto of the musician object

```js
// Object literals
const person = {
  alive: true,
};

const musician = {
  plays: true,
};

musician.__proto__ = person;

console.log(musician.plays); //true
console.log(musician.alive); //true
```

- If you try to log the musician object in this case, it is something looks like below
- Also if you expand the Javascript Object (you would find out the proto is nothing but getter and setter)
- This is the old way of setting the prototype


---

#### New way of setting the Prototype instead of proto (getPrototypeOf, setPrototypeOf)

```js
//person object is the prototype for the musician object
Object.setPrototypeOf(musician, person);

console.log(Object.getPrototypeOf(musician)); // {alive:true}
console.log(musician.__proto__); // {alive:true}
console.log(Object.getPrototypeOf(musician) === musician.__proto__); // true
```

---

#### Important points to note down:

- After setting the prototype for an object (ex: setting the person object as a prototype to the musician object) in above scenario

- If we try to log out the property which is not available in the musician object then javascript looks for the alive property in the musician and if it is not there it goes to the next link of the prototype chain to the person object (musician proto) and there you can see the alive property is found.
- In some cases the property like (hasOwnProperty) is called then Javascript looks this property inside the Javascript Object(this is the parent of all the objects)

```js
//Extending the prototype chain

const guitarist = {
  strings: 6,
  __proto__: musician,
};

console.log(guitarist);
```

### ADD Screenshot here

---

- #### No circular references are allowed

```js
// person.__proto__ can't be guitarist
```

- #### The proto value must be object or null
- #### An object can only directly inherit from one object

---

#### Example 3 (object with getter and setter methods)

```js
const car = {
  doors: 2,
  seats: 'vinyl',
  get seatMaterial() {
    return this.seats;
  },
  set seatMaterial(material) {
    this.seats = material;
  },
};

const luxuryCar = {};
Object.setPrototypeOf(luxuryCar, car); // car object is the prototype
luxuryCar.seatMaterial = 'leather';
console.log(luxuryCar); //{seats: "leather"}
console.log(luxuryCar.doors); // 2
console.log(car); // {doors: 2, seats: "vinyl"}
```

---

#### Example 4 (Walking up the chain)

- valueOf method is actually present in the Javascript Object

```js
// props and methods are not copied

console.log(luxuryCar.valueOf()); // {seats: "leather"}
```

---

#### Example 5 (Getting the keys of an object)

- logs an array

```js
console.log(Object.keys(luxuryCar)); // ["seats"]
```

---

#### Example 6 (loop through each object key)

- logs a item

```js
Object.keys(luxuryCar).forEach((key) => console.log(key)); // seats
```

---

#### Example 7 (for in loop includes inherited props also)

- logs keys that are inherited

```js
for (let key in luxuryCar) {
  console.log(key);
}

//Output:
seats;
doors;
seatMaterial;
```

---

#### Example 8 (Object Constructors)

- The prototype property is where inheritable props and methods are

```js
function Animal(species) {
  this.species = species;
  this.eats = true;
}

Animal.prototype.walks = function () {
  return `A ${this.species} is walking`;
};

const Bear = new Animal('bear');
console.log(Bear.species); // bear
console.log(Bear.walks()); // A bear is walking
console.log(Bear.__proto__ === Animal.prototype); // true
```

---

#### Example 9 (ES6 classes as a example of inheritance)

- The beauty of this prototype inheritance is we are not changing the parent properties
- myBike and myTruck are the examples

```js
class Vehicle {
  constructor() {
    (this.wheels = 4), (this.motorized = true);
  }
  ready() {
    return 'Ready to go!';
  }
}
```

```js
class Motorcycle extends Vehicle {
  constructor() {
   super()
   this.wheels = 2,
  }
  wheelie() {
    return 'On one wheel now!'
  }
}

const myBike = new Motorcycle()
console.log(myBike) // {wheels:2, motorized: true}
console.log(myBike.wheels) // 2
console.log(myBike.ready()) // Ready to go!
console.log(myBike.wheelie()) // On one wheel now!


const myTruck = new Vehicle()
console.log(myTruck) // {wheels: 4, motorized: true}
```

#### If we try to log myTruck

## ![image](https://user-images.githubusercontent.com/42731246/217040382-bef8257e-57c6-4e36-abdb-4c744e4b7511.png)

----

#### Example 10: Constructors and ES6 

- **Prototype Chain**: 
  - <ins>**Every JavaScript object has a prototype property (except for the base object)**</ins>, which is a reference to another object. 
  - When a property or method is accessed, JavaScript will look up the property on the object itself first; <ins>**if it doesn’t find it, it continues to look up the chain in the object’s prototype**</ins>.
  <br/>

- **Creating Inheritance**: 
  - You can <ins>**establish inheritance by setting the prototype of a constructor function or class to be an instance of another constructor function.** </ins>
  - This allows the derived object to inherit methods and properties from the base object.

```js
// Using Constructors and Prototypes:

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise.`);
};

function Dog(name) {
  Animal.call(this, name); // Super constructor call
}

// ensure that instances of `Dog` inherit properties and methods from `Animal`
Dog.prototype = Object.create(Animal.prototype);

//we ensure that the constructor reference on instances of Dog
// correctly points back to Dog itself, not Animal
// 
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(`${this.name} barks.`);
};

let dog = new Dog('Rex');
dog.speak();  // Outputs: Rex barks.
```
---

```js
//Using ES6 Classes:

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let dog = new Dog('Rex');
dog.speak();  // Outputs: Rex barks.
```
