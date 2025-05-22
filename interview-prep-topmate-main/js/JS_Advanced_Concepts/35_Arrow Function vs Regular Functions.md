#### 1.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrow() {
    setTimeout(() => {
      console.log('Arrow ' + this.name);
    }, 100);
  }

  printNamedFunction() {
    setTimeout(function () {
      console.log('Function ' + this.name);
    }, 100);
  }
}

let person = new Person('Bob');
person.printNameArrow();
person.printNamedFunction();
```

<details>
<summary>Solution</summary>

```js
Arrow Bob
Function
```

**Reason:**

- `Arrow` functions do not have their own this context; instead, they inherit this from the surrounding code where they are defined
- `this` inside printNameArrow's arrow function **refers to the instance of the Person class (i.e., person)**.
- Therefore, when person.printNameArrow() is called, **_it correctly accesses person's name property_** and prints "Arrow Bob".

- `Traditional functions` have their **own this context**, which, **in the case of a function passed to setTimeout, is set to the global object** (window in a web browser, global in Node.js) or undefined in strict mode.
- Because **there's no name property on the global object** (or it's not the expected value), it prints **"Function undefined"** (or just "Function " if not in strict mode and the global object doesn't have a name property).

</details>

---

#### 2.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrow() {
    console.log('Arrow ' + this.name);
  }

  printNamedFunction() {
    console.log('Function ' + this.name);
  }
}

let person = new Person('Bob');
person.printNameArrow();
person.printNamedFunction();
```

<details>
<summary>Solution</summary>

```js
Arrow Bob
Function Bob
```

#### Reason:

- "Arrow Bob" because `this` refers to the person instance.
- Since `this` method is **directly invoked on the person instance** and there's no change in the this context caused by setTimeout or any other mechanism, it **correctly logs "Function Bob"**.

</details>

---

#### Example 1 (better to use Arrow Functions in this case)

```js
// this and e.target are exactly the same in Regular function
document.addEventListener('click', function (e) {
  console.log('Regular Function', this, e.target);
});

// this keyword in Arrow defaults to the outer context, for ex: Window
document.addEventListener('click', (e) => {
  console.log('ARROW Function', this, e.target);
});
```

#### Example 2 (better to use Regular Functions in this case)

- this in the below case is window

```js
const person = {
  firstName: 'Kyle',
  lastName: 'Cook',
  printName: () => {
    console.log(`${this.firstName}${this.lastName}`);
  },
};

person.printName();
```

<details>
<summary>Solution</summary>

```js
undefined undefined
```

</details>

---

```js
const person = {
  firstName: 'Kyle',
  lastName: 'Cook',
  printName() {
    console.log(`${this.firstName}${this.lastName}`);
  },
};

person.printName();
```

<details>
<summary>Solution</summary>

```js
Kyle Cook
```

</details>
