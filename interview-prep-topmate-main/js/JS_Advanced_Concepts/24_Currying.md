### Currying

- is the technique of **_translating the evaluation of a function_** that takes **_multiple arguments_** into evaluating a **_sequence of functions each with a single argument_**.

- `Currying` is a process in `functional programming` in which <ins>**_we can transform a function with multiple arguments into a sequence of nesting functions_**</ins>. It returns a new function that expects the next argument inline

**Example**

```js
// Normal Func
const multiply = (a, b) => a * b;
multiply(3, 4); //12
```

```js
const multiply = (a) => (b) => a * b;
// Example Invocation: 1
multiply(3)(4); //12

// Example Invocation: 2
const multiplyBy5 = multiply(5);
console.log(multiplyBy5(4)); // 20
```

---

### Partial Application

- Partially apply a function
- Process of producing a function with a smaller number of parameters
- Means, taking a function, applying some of its arguments into the function (remembers those parameters) and then it uses `closures` to later on be called with all the rest of the arguments.

**Ex**: Instead of taking 3 or more arguments, we are giving one param once, and rest of the params for the 2nd invocation. (Call the function once and apply the rest of the arguments to it.)

- #### For the 2nd call, I expect all the arguments

```js
//curried function
const curriedFunc = (a) => (b) => (c) => a * b * c;
curriedFunc(3)(4)(5); //60
```

```js
//partial function
const normalFunc = (a, b, c) => a * b * c;
const partialMultiplyBy5 = normalFunc.bind(null, 5); // 5 applied to a, null is this context (which we don't care here)
partialMultiplyBy5(4, 10); // 40*5 is 200
```

<u>**_Summary_**</u>:

- `Currying` means <ins>**_I expect argument at a time_**</ins>.
- `Partial` means <ins>**_I expect all the arguments at second call_**</ins>.

---

#### Question 1 - Write a function that adds up two numbers using add(10)(20)

<details>
<summary>Solution</summary>

```js
function add(x) {
  return function (y) {
    return x + y;
  };
}

const output = add(10)(20);
console.log(output);
```

</details>

---

#### Question 2 - Write a function that adds up two numbers using both add(10)(20) and add(10,20)

<details>
<summary>Solution</summary>

```js
function add(x) {
  if (arguments.length > 1) {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  } else {
    return function (y) {
      return x + y;
    };
  }
}

const output = add(10)(20);
const output = add(10, 20);
console.log('With Closure', output);
console.log('Without Closure', output);
```

</details>

---

#### Question 3 - Write a simple currying function that takes infinite number of arguments.

<details>
<summary>Solution</summary>

```js
const sum = (x) => (y) => y ? sum(x + y) : x;
console.log(sum(1)(2)(3)(5)(7)());
```

## </details>

---
