### 12. Call Apply Bind:

- In order to manipulate `this` keyword, there are three important methods.
- In order to borrow methods, we can make use of call apply bind.

<ins>**Call**</ins>: underneath the hood, **all functions when created have `this` property** called `call` that **allows us to call/invoke** the function

```js
// call syntax:
Function.call(context, thisArg1, thisArg2, thisArg3);
```

**apply**: instead of a.call(), we can also use a.apply() in one of this case.

```js
// apply syntax:
Function.apply(context, [thisArg1, thisArg2, thisArg3]);
```

```js
// bind syntax:
const newFunc = Function.bind(context, thisArg1, thisArg2, thisArg3);
```

```js
function a() {
  console.log('hi'); // hi
}

a.call();
```

```js
// object 1 has heal method
const wizard = {
  name: 'Merlin',
  health: 100,
  heal() {
    return (this.health = 100);
  },
};

wizard.heal(); // 100

// object 2 is in need of heal method
const archer = {
  name: 'Robin Hood',
  health: 30,
};

// So, in order to borrow heal method from wizard object, we use `call, apply, bind`

// instead of using wizard to call heal, it uses archer to call heal
console.log('1', archer); // logs the original archer object with health 30
wizard.heal.call(archer);
console.log('2', archer); // logs the mutated archer object with health 100
```

---

```js
// object 1 has heal method
const wizard = {
  name: 'Merlin',
  health: 100,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  },
};

wizard.heal(); // 100

// object 2 is in need of heal method
const archer = {
  name: 'Robin Hood',
  health: 30,
};

// So, in order to borrow heal method from wizard object, we use `call, apply, bind`

// instead of using wizard to call heal, it uses archer to call heal
console.log('1', archer); // logs the original archer object with health 30
wizard.heal.call(archer, 50, 30);
// wizard.heal.apply(archer, [50, 30]);
// const healArcher = wizard.bind(archer, 50, 30)
// healArcher()
console.log('2', archer); // logs the mutated archer object with health 100
```
