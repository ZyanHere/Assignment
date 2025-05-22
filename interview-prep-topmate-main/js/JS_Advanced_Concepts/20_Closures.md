## Closures

We have closures in javascript because of these two things:

**1. function()**
**2. Lexical Scope**

**_Closures is simply <ins>a combination of function and the lexical scope environment</ins> from which it was declared._**

<ins><b>Note:</b></ins>

- Closures <ins>**_allow a function to access variables_** from an enclosing scope or environment, **_even after it is closed and executed_**</ins>.

- ##### Closure is <ins>when you have a function defined inside of another function, _that inner function has access to the variables and scope of the outer function even if the outer function finishes executing and those variables are no longer accessible outside of that function_</ins>."

```js
function a() {
  var grandpa = 'grandpa';
  return function () {
    var father = 'father';
    return function () {
      var son = 'son';
      return `${grandpa} > ${father} > ${son}`;
    };
  };
}
console.log(a()()()); // grandpa > father > son

// a and b are `Higher order functions` because they return functions
// whereas c is a normal function because it returns someValue at the end
```

- **_The beauty of the closure is even after the `function a` is invoked and executed and popped off from the call stack, `function b and function c` can still access `function a` variable_**

- The javascript engine will make sure that the **_function has access to all the variables outside of the function with this closure_**.

- So **instead of garbage collected**, JS engine sees that **_these functions formed as a closure_** and thereby putting them into the closure box after invocation.
- Instead of c checking the variables in the GOC(Global Execution Context), **_it checks first in the Closure box_** and when it finds them in the box, it returns them.

---

#### Lexical Scope

- Lexical Scope **defines how variable names are resolved** in nested functions.
- So if we have a child function inside a parent function **_then the child function will have access to the variables defined in the parent function and also has access to the global scope_**
- <ins>**This is often confused with the closure**</ins>, Lexical Scope is just a important part of the Closure.

##### Example 1 (Lexical Scope)

```js
//global scope
let x = 1;

const parentFunction = () => {
  // local scope
  let myValue = 2;
  console.log(x); //1
  console.log(myValue); //2

  const childFunction = () => {
    console.log((x += 5)); //6
    console.log((myValue += 1)); //3
  };
  childFunction();
};

parentFunction();
```

---

#### Closure:

- A **closure** is **_a function having access to the parent scope, <ins>even after the parent function is closed.</ins>_**

- <strong>Another Definition:</strong> A closure is created when we define a function, not when a function is executed.

##### Example 2 (Closure)

- Although the parent function has already returned and it is already closed but the child function still has access to the scope
- That makes the myValue variable a private variable
- If I log the result() for more than once then it will increment the values

```js
//global scope
let x = 1;

const parentFunction = () => {
  // local scope
  let myValue = 2;
  console.log(x); //1
  console.log(myValue); //2

  const childFunction = () => {
    console.log((x += 5)); //6
    console.log((myValue += 1)); //3
  };
  return childFunction;
};

const result = parentFunction(); // calls only parent function and it is closed here
console.log(result); // logs the entire the innner function
result(); // returns child function
```

---

##### Example 3 (Closures with IIFE)

- IIFE (Immediately Invoked Function Expression)
- If you don't invoke the **privateCounter** then it only logs as initial value : 0 (because it is immediately invoked function expression)
- If you log the **privateCounter**() then it will start printing the inner function

```js
const privateCounter = (() => {
  let count = 0;
  console.log(`intial value : ${count}`);
  return () => {
    count += 1;
    console.log(count);
  };
})();

privateCounter();
```

---

##### Example 3 (Closures with IIFE)

- As it is IIFE it directly logs out the initial credits (without invoking credits() function)
- as you keep on invoking credits() function, it will start decrementing the credits

```js
  cont credits = ((num)=>{
  let credits = num;
  console.log(`inital credits value: ${credits}`)
  return ()=>{
    credits-=1;
    if(credits > 0 ){
      console.log(`playing game, ${credits} credits remaining`)
    }
    if(credits <=0){
      console.log('not enough credits')
    }
  }})(3)

  credits()

```

```js
//Example 1
function callFunc() {
  const callMe = 'Hi!';
  setTimeout(function () {
    console.log(callMe); //after 4seconds logs Hi!
  }, 4000);
}

callFunc();
```

```js
//Example 2, by the time setTimeout is back for execution, it has the value of callMe variable
function callFunc() {
  setTimeout(function () {
    console.log(callMe); //after 4seconds logs Hi!
  }, 4000);
  const callMe = 'Hi!';
}

callFunc();
```

#### Closures Advantages

##### 1. Memory Efficient

```js
// Normal Function
function heavyDuty(index) {
  const bigArray = new Array(7000).fill('emoji');
  console.log('Created');
  return bigArray[index];
}

console.log(heavyDuty(688));
console.log(heavyDuty(688));
console.log(heavyDuty(688));

// Output:
Created;
emoji;
Created;
emoji;
Created;
emoji;
```

```js
// With Closures
function heavyDuty2() {
  const bigArray = new Array(7000).fill('emoji');
  console.log('Closures');
  return function (index) {
    return bigArray[index];
  };
}

const getHeavyDuty = heavyDuty2();
console.log(getHeavyDuty(688));
console.log(getHeavyDuty(888));

// Output:
Closures;
emoji;
emoji;
```

##### 2. Data Encapsulation

- by hiding the main logic data and showing only the non-priority ones

```js
function Counter() {
  let count = 0; // Private variable

  //returning only three functions, so we can only access them, thereby making count variable as a hidden variable
  return {
    increment: function () {
      count += 1;
    },
    decrement: function () {
      count -= 1;
    },
    getCount: function () {
      return count;
    },
  };
}

const myCounter = Counter(); // Create a new counter instance

myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // Output: 2

myCounter.decrement();
console.log(myCounter.getCount()); // Output: 1

// Direct access to 'count' variable is not possible
// console.log(myCounter.count); // Undefined
```

#### Examples Code Snippets:

```js
//output only once
let view;
function initialize() {
  let called = 0;
  return function () {
    if (called > 0) {
      return;
    } else {
      view = 'view';
      called++;
      console.log('view has been set')
    }
  };
}
const startOnce = initialize()
startOnce();
startOnce();
startOnce();
console.log(view)

//Output: even though we invoked 3 times, it outputs only once
view has been set
view
```

```js
//using var with setTimeout + IIFE's

const array1 = [1, 2, 3, 4];
for (var i = 0; i < array1.length; i++) {
  (function (index) {
    setTimeout(function () {
      console.log("I'm at index " + array1[index]);
    }, 1000);
  })(i);
}

// Output:
// I'm at index 1
// I'm at index 2
// I'm at index 3
// I'm at index 4
```

---

#### Counter dilemma using Closures

```js
function test() {
  let count = 0;
  function add() {
    count = count + 1;
    return count;
  }
  return add;
}

const output = test();
console.log(output());
console.log(output());
console.log(output());
```

<details>
<summary>Solution</summary>

1
2
3

</details>

---

### Question 1: This is not a closure (lexical scope concept)

```js
function init() {
  var name = 'Uncommon Geeks';
  function displayName() {
    alert(name);
  }
  displayName();
}
init();
```

<details>
<summary>Solution</summary>

Uncommon Geeks

</details>

---

### Question 2: Using Closure

```js
function makeFunc() {
  var name = 'Uncommon Geeks';
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
```

<details>
<summary>Solution</summary>

Uncommon Geeks

</details>

---

### Question 3:

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);
console.log(add5(2));
console.log(add10(2));
```

<details>
<summary>Solution</summary>

7
12

</details>

---

### Question 4:

```js
(function testA(a) {
  return (function testB(b) {
    console.log(a);
  })(1);
})(0);
```

<details>
<summary>Solution</summary>

0

</details>

---

### Question 5:

```js
function test() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, 1000);
  }
}

test();
```

<details>
<summary>Solution</summary>

3
3
3

<strong>Reason:</strong>

- setTimeout formed the closure, and the value of i inside this nested block is bound with the reference of i

- After 1 second, the 3 timers gets expire and it looks for the value of i and at that moment, the value will be 3 (because i is a global scope)

</details>

---

### Question 6:

```js
function test() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, 0); // made 0
  }
}

test();
```

<details>
<summary>Solution</summary>

3
3
3

</details>

---

### Question 7:

```js
function test() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, 0);
  }
}

test();
```

<details>
<summary>Solution</summary>

0
1
2

</details>

---

### Question 8:

```js
function test() {
  for (var i = 0; i < 3; i++) {
    function test1(j) {
      setTimeout(function log() {
        console.log(j);
      }, 1000);
    }
    test1(i);
  }
}

test();
```

<details>
<summary>Solution</summary>

0
1
2

</details>

---

### Example Scenario:

```js
function outerFunction(outerVariable) {
  return function innerFunction(innerVaraible) {
    console.log("Outer Variable:" + outerVariable);
    console.log("Inner Variable:" + innerVariable);
  };
}

const newFunction = outerFunction("outside");
newFunction("inside");

// Output:
Outer Variable: outside
Inner Variable: inner
```

<strong>Code Walkthrough</strong>:

- When we first call the `outerFunction`, we have this `outerVariable` which we set to 'outside'
- The reason why we're able to access the outerVariable inside the of innerFunction is because of the `Closures`.
- When the `outerFunction` runs, the outerVariable is only available inside the `outerFunction` (but this function is done executing)

```js
//This line executes all the innerFunction code
const newFunction = outerFunction('outside');
console.log(outerVariable); // Reference Error: 'outerVariable' is not defined
```

- This is where Closures come into picture
- As innerFunction is inside the outerFunction it has this outerVariable access and <strong>it saves this outerVariable even if the function that defined this variable is no longer executed anymore or it exits out of the function</strong>. It's still gonna to keep track of the outer variable
