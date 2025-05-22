### Factory Functions

- Our Functions that act like factories, **_they create objects for us_**.

```js
// a function that creates objects for us
function createElf(name, weapon) {
  return {
    name,
    weapon,
    attack() {
      return 'attack with ' + weapon;
    },
  };
}

const peter = createElf('Peter', 'stones');
peter.attack(); // 'attack with stones'

const sam = createElf('Sam', 'fire');
sam.attack(); // 'attack with fire'
```

<ins>**Summary**</ins>: We avoided repetitive code, but there is still a problem here.

- What if we had 1000 createElf invocations which would require space in our memory to store the same data especially for attack method which is same and we would be seeing 1000 attack functions in different places in memory for each createElf function invocation

---

### Object.create

- Solution for the above problem is using **_Object.create_**

```js
const createElfObj = {
  attack() {
    return 'attack with ' + this.weapon;
  },
};
function createElf(name, weapon) {
  let newElf = Object.create(createElfObj);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter = createElf('Peter', 'stones');
console.log(peter.attack()); // 'attack with stones'

const sam = createElf('Sam', 'fire');
console.log(sam.attack()); // 'attack with fire'
```

<u> **_Note_**</u> : Even though Object.create solves our problem, developers used another technique in the past which we might be seeing in lot of our codebase.

---

### Constructor Functions

**_Constructor Functions_** are the ones which we would see in most of the codebase instead of **_Object.create_**

```js
// Constructor Functions
function CreateElf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

const peter = new CreateElf('peter', 'stones');
const sam = new CreateElf('sam', 'fire');
console.log(sam.name); // 'sam'

//this points to the object we are going to create (ex: peter, sam on the left side I mean)
```

**removing new keyword results in TypeError, as we cannot read properties (ex: name, weapon in our case)**

<img src="./images_used/Object_Oriented_Programming-1.png">


**If you remember, prototype becomes useful with these native constructor functions**
**_e.g. refer screenshot_**


<img src="./images_used/Object_Oriented_Programming-2.png">

So that is the reason we can now do prototype for our constructor function CreateElf

```js
//adding prototype chain to constructor function
CreateElf.prototype.attack = function () {
  return 'attack with' + this.weapon;
};

//this refers to the one which calls, (whatever on left of the dot I mean)
```

```js
//FINAL CODE 😊😊
// Constructor Functions
function CreateElf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

CreateElf.prototype.attack = function () {
  return 'attack with ' + this.weapon;
};

const peter = new CreateElf('peter', 'stones');
👉// console.log(peter.prototype) // undefined 👈
console.log(peter.attack()); // 'attack with stones'

const sam = new CreateElf('sam', 'fire');
console.log(sam.attack()); // 'attack with fire'
```

<u>**Summary**</u>:

- We're able to **use constructor functions** `instead` of something like **Object.create**.

- **_This constructor function creates a new object, returns a new object and also modifies `this` keyword means to whatever object calls us_**.

- So instead of this pointing out to the global object, it is going to point to the calling object **_(ex: const peter or const sam in our case )_** 😃😃

- when we are trying to invoke peter.attack() function, originally peter doesn't have attack as its own method, but it's going up to the prototype chain and this prototype is going to have attack method

---

#### Few Examples


<img src="./images_used/Object_Oriented_Programming-3.png">


---

### ES6 Classes

```js
class CreateElf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return 'attack with ' + this.weapon;
  }
}

const peter = new CreateElf('peter', 'stones');
👉console.log(peter instanceof CreateElf); //true👈
console.log(peter.attack()); // 'attack with stones'

const sam = new CreateElf('sam', 'fire');
console.log(sam.attack()); // 'attack with fire'
```

---

### this - 4 ways:

```js
// 1. new keyword
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('Xavier', 55);
console.log(person1);

/*
{
    "name": "Xavier",
    "age": 55
}
*/
```

```js
// 2. implicit binding
const person = {
  name: 'Karen',
  age: 40,
  hi() {
    console.log('hi' + this.name); //this refers to be object person
  },
};
```

```js
// 3. explicit binding, using bind, call, apply to tell this keyword to be a specific thing (in our case `this is window`)
const person = {
  name: 'Karen',
  age: 40,
  hi: function () {
    console.log('hi' + this.setTimeout);
  }.bind(window),
};
console.log(person.hi); //hifunction setTimeout() { [native code] }
```

```js
//4. arrow functions
const person = {
  name: 'Karen',
  age: 40,
  hi: function () {
    👉var inner = () => {👈
      console.log('hi ' + this.name); //hi Karen
    };
    return inner();
  },
};

person.hi();
```

##### Another Coding Sample Example

```js
// Using regular functions

const person = {
  name: 'Karen',
  age: 40,
  hi: function () {
    👉var inner = function () {👈
      console.log('hi ' + this.name); //hi undefined
    };
    return inner();
  },
};

person.hi();
```

---

### Inheritance

```js
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return 'attack with ' + this.weapon;
  }
}

class Elf extends Character {
  constructor(name, weapon, type) {
    super(name, weapon);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }

  makeFort() {
    return 'strongest fort in the world made';
  }
}

const dolby = new Elf('Dolby', 'cloth', 'house');
console.log(dolby.attack());

const shrek = new Ogre('Shrek', 'club', 'green');
console.log(shrek.makeFort()); //strongest fort in the world made
```

---

### 4 Pillars of OOPS

<img src="./images_used/Object_Oriented_Programming-4.png">


#### 1. Polymorphism

```js
class Animal {
  makeSound() {
    console.log('Some animal sound!');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Woof!');
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('Meow!');
  }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound(); // Outputs: Woof!
cat.makeSound(); // Outputs: Meow!
```

---

#### 2. Abstraction

```js
class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error(
        'Abstract class "Shape" cannot be instantiated directly.'
      );
    }
  }

  area() {
    throw new Error('You have to implement the method area!');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.area()); // Outputs: 78.53981633974483
```
---

#### 3. Encapsulation

```js
class BankAccount {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited ${amount}, balance is now ${this.#balance}`);
    }
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew ${amount}, balance is now ${this.#balance}`);
    } else {
      console.log('Insufficient funds');
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500); // Deposited 500, balance is now 1500
account.withdraw(200); // Withdrew 200, balance is now 1300
console.log(account.getBalance()); // Outputs: 1300
// account.#balance; // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

#### ii)
```js
// WITHOUT USING # syntax
function BankAccount(initialBalance) {
  // The 'balance' variable is private because it's not exposed directly.
  let balance = initialBalance;

  // Public methods have access to the private 'balance' variable due to closures.
  return {
    deposit: function (amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposited ${amount}, balance is now ${balance}`);
      }
    },
    withdraw: function (amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Withdrew ${amount}, balance is now ${balance}`);
      } else {
        console.log('Insufficient funds');
      }
    },
    getBalance: function () {
      return balance;
    },
  };
}

const account = BankAccount(1000);
account.deposit(500); // Deposited 500, balance is now 1500
account.withdraw(200); // Withdrew 200, balance is now 1300
console.log(account.getBalance()); // Outputs: 1300
// balance is not accessible from here, it's private
```
---
