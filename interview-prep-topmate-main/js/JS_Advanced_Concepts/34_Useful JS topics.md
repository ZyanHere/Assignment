#### 1. What is a Set object and how does it work ?

- `Set` object <ins>**_allows you to store unique values of any type, whether they are primitive values or object references_**.</ins>

- For example we can create Set instance using the Set constructor

```js
const set1 = new Set();
const set2 = new Set(['a', 'b']);
```

- We can use the `.add()` method to add a new value to a Set instance.

- Since the add method returns the Set object, we can chain multiple add calls together.

<u><strong>Note:</strong></u> If a value already exists in the Set object, it will not be added again.

```js
set2.add('a');
```

- We can use the `has` method to check if a specific value exists in a Set instance

```js
set2.has('a'); //true
```

- We can use the `size` property to get the length of the Set instance

```js
set2.size; // returns 2
```

- The `clear` method can be used to remove all the data from a Set.

```js
set2.clear();
```

We can use <strong>Set</strong> object to remove duplicates elements from an array.

```js
const numbers = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 5];

const uniqueNumbers = [...new Set(numbers)]; // [1,2,3,4,5,6,7,8]
```

---

#### 2. What is a callback function ?

-` Callback function` is an executable code <ins>**_that is passed as an argument to other code so that it will be get exectued once the actual function finishes executing_**.</ins>

- Therefore <ins>**_a function that is passed as an argument to the other function_**> is called a callback function.</ins>

```js
<input onChange((e)=>setValue(e.target.value))/>
```

<u><strong>Note:</strong></u> The reduce, filter and map methods in arrays require a callback as a parameter.

---

#### 3. What is a ES6 module?

- `Modules` in ES6 are <ins>***used for better maintainability***</ins> and to avoid having all the code in one large file.

- Before ES6 introduced support for modules, there were two popular modules systems

- CommonJS (node.js)
- AMD(Asynchronous Module Definition)- Browser

---

```js
// Using ES6 Modules - helpers.js
export function isNull(val){
  return val === null;
}

export function isUndefined(val) {
  return val === undefined;
}
export function isNullOrUndefined(val) {
  return isNull(val) || isUndefined(val);

```

```js
import {
  isNull,
  isUndefined,
  isNullOrUndefined as isValid,
} from './helpers.js';
```

---

#### 4. What is a Promise?

- `Promises` are a fundamental concept in `asynchronous` programming, 
- A `Promise` represents a placeholder for the eventual result of an asynchronous operation. 
- Essentially, <ins>**it's an object that encapsulates the state of an operation that will complete at some point in the future, either `successfully` or with an `error`**</ins>.

#### Key Features of Promises:
- `States`: A promise can be in one of three states:
- `Pending`: The **initial state** of the promise. The operation has not completed yet.
- `Fulfilled`: The operation **completed** successfully, and the promise now holds the resulting value.
- `Rejected`: The operation **failed**, and the promise holds the reason for the failure.
- `Immutability`: Once a promise resolves to either a fulfilled or rejected state, **it cannot change its state again**. 
  - The value or the rejection reason it holds becomes immutable, and all further attempts to `resolve` or `reject` it are ineffective.

#### Creating a Promise:
```js
let promise = new Promise((resolve, reject) => {
    // Asynchronous operation code
    setTimeout(() => {
        if ("operation_successful") {
            resolve("Data retrieved");
        } else {
            reject("Error occurred");
        }
    }, 2000);
});
```
```js
//USAGE OF PROMISES (DON'T FORGET THIS😁)

promise.then((data) => {
    console.log(data);  // Handle success
}).catch((error) => {
    console.error(error);  // Handle error
});
```

---

#### 5. What is async/await and how does it work?

- `async/await` is a new method in JS **for writing async code in a synchronized fashion**. It is built on top of promises and provides higher readability.

```js
// Promises
function callApi() {
  return fetch('url/to/api/endpoint')
    .then((resp) => resp.json())
    .then((data) => {
      //do something with "data"
    })
    .catch((err) => {
      //do something with "err"
    });
}
```

```js
// async/await
async function callApi() {
  try {
    const resp = await fetch('url/to/api/endpoint');
    const data = await resp.json();
    //do something with "data"
  } catch (e) {
    //do something with "err"
  }
}
```

<u><strong>Note:</strong></u> await keyword can only be used inside an async function, Using the await keyword in any non-async function will throw an error.

---

#### 6. What is the difference between the spread operator and the rest operator?

- Both are having three dots as the symbol
- Spread operator converts a array into multiple elements.
- The rest operator used to destructuring the arrays and objects.(It collects all the elements and compresses them into a single element)

```js
// spread operator
function add(a, b) {
  return a + b;
}

const nums = [5, 6];
const sum = add(...nums);
console.log(sum); //11
```

```js
// rest indicates the rest of the elements
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2,3,4,5]
```

---

#### 7. What are default parameters?

- `Default parameters` are a ***new way to define default variables*** in JS, available in ES6 or Ecmascript 2015.

```js
function add(a = 0, b = 0) {
  return a + b;
}

add(1); // returns 1
```

```js
function getFirst([first, ...rest] = [0, 1]) {
  return first;
}

getFirst(); // 0
getFirst([10, 20, 30]); // 10

// objects
function getArr({ nums } = { nums: [1, 2, 3, 4] }) {
  return nums;
}
getArr(); // [1, 2, 3, 4]
getArr({ nums: [5, 4, 3, 2, 1] }); // [5,4,3,2,1]
```

#### 8. What is a wrapper object?

- Every primitive type except for null and undefined has its own wrapper object

```js

Primitive types: undefined, null, Boolean, Number, String, Symbol, BigInt

Reference Types: Object, Array, Date, RegExp (these are objects)
```

- For example if we are converting a string to .toUpperCase() it doesn't throw an error because the value of a primitive type is temporarily converted or coerced into an object, so the behaviour of the name(string) variable is similar to an object.

---

#### 9. What is the difference between implicit and explicit type conversion?

<u><strong>Implicit Type Coercion:</strong></u>

- Implicit type conversion is a method of converting a value to another type (which done automatically without manual intervention)

```js
console.log(1 + '6'); // 16 (string)
console.log(false + true); // 1 (Number)
console.log(6 * '2'); // 12  (Number)
```

<u><strong>Explicit Type Coercion:</strong></u>

- Explicit type coercion on the other hand is a method of converting a value to another type (where we need to manually perform the conversion).

```js
console.log(1 + parseInt('6')); // 7 (Number)
```

---

#### 10. What is NaN? And how do you check if a value is NaN?

- NaN is for "Not a Number", is a value in Javascript that arises as a result of numeric conversion that cannot produce a meaningful numeric value.

- When a numeric conversion yields a non-numeric value (it results to NAN)

```js
let a;

console.log(parseInt('abc')); // NaN
console.log(parseInt(null)); // NaN
console.log(parseInt(undefined)); // NaN
console.log(parseInt(++a)); // NaN
console.log(parseInt({} * 10)); // NaN
console.log(parseInt('abc' - 2)); // NaN
console.log(parseInt(0 / 0)); // NaN
console.log(parseInt('10a' * 10)); // NaN
```

<u><strong>Note:</strong></u> Javascript has a built-in isNaN method to test if a value is NaN.

```js
console.log(isNaN()); // true
console.log(isNaN(undefined)); // true
console.log(isNaN({})); // true
console.log(isNaN(String('a'))); // true
console.log(isNaN(() => {})); // true
```

- In javascript it is recommended to use the Number.isNaN() method because it genuinely checks if the value is NaN.

- Alternatively we can create our own helper function to check, NaN is the only value that is not equal to itself

```js
function checkIfNaN(value) {
  return value !== value;
}
```

---

#### 11. How can you determine if a value is an array?

- We can use the Array.isArray() method to check.

```js
console.log(Array.isArray(5)); // false
console.log(Array.isArray('')); // false
console.log(Array.isArray()); // false
console.log(Array.isArray(null)); // false
console.log(Array.isArray({ length: 5 })); // false

console.log(Array.isArray([])); // true
```

---

#### 12. How can you check if a property exists in an object?

- There are three methods to check

##### 1. in operator

```js
const o = {
  prop: 'rabbit',
  prop2: 'tiger',
};

console.log('prop' in o); // true
console.log('prop1' in o); // false
```

##### 2. hasOwnProperty method

```js
console.log(o.hasOwnProperty('prop2')); // true
console.log(o.hasOwnProperty('prop1')); // false
```

##### 2. bracket notation

```js
console.log(o['prop']); // rabbit
console.log(o['prop1']); // undefined
```
