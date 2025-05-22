### Functional Programming

- Is all about separation of concerns, which object oriented programming does as well.
- Is all about **_packaging our code into separate chunks_** so that everything's well organized and each part of the code concerns itself with the one thing it's good at
- Functional Programming has this idea of separating concerns but they also separate data and functions. There's data and then this data gets interacted. **_But we are not going to combine both data and function as one piece or one object_**
- Have an emphasis on simplicity where data and functions are concerned (We separate them)
- Most functional programming languages **don't** have these **_concepts of classes and methods that belong to objects_**
- Instead Functions **operate** on **_data structures like arrays and objects_** rather than actually belonging to that data structure like an object

### **Goals of FP are same as OOP** 😊

<img src="./images_used/FP-1.png">




- In FP it all comes down to the concept of pure functions
- All **_objects_** created in FP are **_immutable_**

<img src="./images_used/FP-2.png">


- To give a sample example on **Immutability**, **_once something is created, it cannot be changed_**
- We avoid things like **_shared state_**, and we **_adhere_** to this **_principle of pure functions_**

### Pure Functions:

- A function **_has to always return the same output_**, given the same input, and the function cannot modify anything outside of itself **_(No Side Effects)_**

```js
// impure function (has side effects)
const array1 = [1, 2, 3];
function example1(array1) {
  array1.pop();
}

example1(array1);
console.log(array1); // [1, 2]
```

<b><u>Cons</u></b>: We are using a shared state (array1) something like a global variable that can interact with anything which can cause a lot of bugs

```js
// Pure Functions, doesn't change anything in outside world
const array = [1, 2, 3];

function removeLastItem(arr) {
  const newArray = [].concat(arr);
  newArray.pop();
  return newArray;
}

function multiplyBy2(arr) {
  return arr.map((item) => item * 2);
}

const array2 = removeLastItem(array);
const array3 = multiplyBy2(array);
console.log(array, array2, array3);
```

---

### Can everything be Pure ?

- A program cannot exist(s) without a side effect.
- console.log is a side effect
- communicate with outside world is a side effect
- Browser has to make API calls and have to interact with DOM and manipulate what's on the website.
- So the goal of FP is not to make everything pure functions, it is to minimize side effects and it is to organize your code in a way so that you isolate these side effects so that your code becomes predictable and it is easier to debug
- We wanted to build programs that are built with a bunch of very small, very reusable, predictable pure functions

---

### How do we build the perfect function ?

- A perfect function **_should do one task_** only
- We don't want a massive function, (**_just a simple function that we can test that does one thing really well_**)
- The **_function should have a return statement_**. Every function should return something from it because when we give it an input, we expect an output
- Every function **_should be pure_**, also **_means having no shared state_** with other functions.
- **_Immutable state_** where we always return a new copy of that output, we never just modify our global state
- Functions are also going to be **_composable_**.
- **_Make the Functions predictable_**. If we understand with 100% certainty what our functions do, it makes our code predictable.
- At the end of the day, **_FP is about making your code predictable_**

<img src="./images_used/FP-3.png">


---

### Idempotence:

- The idea of Idempotence is a function that always returns or does what we expect it to do

---

### Imperative vs Declarative

**Imperative Code**- Code that tells the machine what to do and how to do it.

**Declarative Code** - Tells it what to do and what should happen (doesn't tell the computer how to do things)

- ###### A computer is better at being imperative (i.e; it needs to know how to do things)

- ###### On the other side, humans are more declarative

**Example 1:**

- A **_high level language is Declarative_** because we don't need to tell where and how to store in the memory

**Example 2:**

- for loops are imperative, because we instruct everything to computer on how to do things (ex: increment after each iteration, start from 0)
- Whereas forEach is more declarative when compared

**Example 3:**

- **_jQuery_** is lot more **_imperative_** because we instruct a lot on what to do things
- Whereas **_React_** is more **_declarative_** because we don't say how to do things.

<u>**_Note_**:</u> Functional Programming is more declarative and write code that avoid side effects.

---

### Immutability:

- Not changing the data (not changing the state)
- Instead the <ins>**_idea of making copies of the state and returning a new state every time_**</ins>.

- With `object oriented programming`, there is a **high chance of mutating the data**

```js
const obj = { name: 'Saiteja' };

function clone(obj) {
  return { ...obj };
}

obj.name = 'Gatadi'; // we can mutate the name to anything else here..
```

- With `functional programming` we can ***achieve the immutability***

```js
const obj = { name: 'Saiteja' };
function clone(obj) {
  return { ...obj };
}

function updateName(obj) {
  const obj2 = clone(obj);
  obj2.name = 'Gatadi';
  return obj2;
}

const updatedObj = updateName(obj);
console.log(obj, updatedObj); // {name: 'Saiteja', name:'Gatadi'}
```

---
