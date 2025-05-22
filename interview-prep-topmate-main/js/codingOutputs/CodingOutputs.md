## 1.

```js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

<details>
<summary>Solution</summary>

```js
console.log(0.1 + 0.2); //0.3
console.log(0.1 + 0.2 == 0.3); //false, because adding 0.1 + 0.2 prints 0.30000000000000004
```

- To mitigate such issues, especially in comparisons, **it's often recommended to check if the numbers are "close enough" to each other rather than exactly equal**.
- This can be done by defining a small threshold (epsilon) and checking if the absolute difference between the numbers is smaller than this threshold.

```js
const a = 0.1 + 0.2;
const b = 0.3;
const epsilon = 0.000001; // Define a small threshold
console.log(Math.abs(a - b) < epsilon); // Use this to check for "equality"
```

</details>

---

## 2.

### i)

```js
(function () {
  var a = (b = 3);
})();

console.log('a defined? ' + (typeof a !== 'undefined'));
console.log('b defined? ' + (typeof b !== 'undefined'));
```

<details>
<summary>Solution</summary>

```js
console.log('a defined? ' + (typeof a !== 'undefined')); //false
console.log('b defined? ' + (typeof b !== 'undefined')); //true
```

</details>

### ii)

```js
'use strict';
(function () {
  var a = (b = 3);
})();

console.log('a defined? ' + (typeof a !== 'undefined'));
console.log('b defined? ' + (typeof b !== 'undefined'));
```

<details>
<summary>Solution</summary>

```js
// because use strict doesn't allow you to declare global variables, here b is a global variable
ReferenceError: b is not defined
```

</details>

---

## 3.

```js
function foo1() {
  return {
    bar: 'hello',
  };
}

function foo2() {
  return;
  {
    bar: 'hello';
  }
}

console.log('foo1 returns:');
console.log(foo1());
console.log('foo2 returns:');
console.log(foo2());
```

<details>
<summary>Solution</summary>

```js
//undefined is returned for foo2() function invocation because return adds a semi colon next to it as nothing is added in that same line. So it expects it as undefined.

console.log('foo1 returns:'); //foo1 returns:
console.log(foo1()); //{"bar": "hello"}
console.log('foo2 returns:'); //foo2 returns:
console.log(foo2()); //undefined
```

</details>

---

## 4.

```js
(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
})();
```

<details>
<summary>Solution</summary>

```js
1;
4;
3;
2; //logs after 1 second delay
```

</details>

---

## 5. Will this work?

```js
var x = 10,
  y = 11,
  z = x + y;
```

<details>
<summary>Solution</summary>

```js
// Yes, the code snippet you provided will work in JavaScript.
var x = 10, // Declares a variable x and assigns it the value 10
  y = 11, // Declares a variable y and assigns it the value 11
  z = x + y; // Declares a variable z and assigns it the value of x + y, which is 21
```

```js
// this doesn't work as per your expectations because of type coercion
var x = '10', // x is a string
  y = 11,
  z = x + y; // z becomes "1011", not 21
```

</details>

---

## 6. find second largest number from Array

<details>
<summary>Solution</summary>

```js
// Approach 1: Sorting
function findSecondLargest(nums) {
  let uniqueNums = [...new Set(nums)]; // Remove duplicates
  uniqueNums.sort((a, b) => b - a); // Sort in descending order
  return uniqueNums[1]; // Return the second element
}

const arr = [1, 3, 4, 5, 0, 2, 4, 5]; // Example array
console.log(findSecondLargest(arr)); // Output: 4
```

- Using `-Infinity` as the initial value for max and secondMax is a strategic choice in JavaScript when trying to find the largest or second-largest numbers in an array. **<u>This choice ensures that any number in the array, regardless of how large or small (including negative numbers), will be greater</u>** than `-Infinity`

```js
// Approach 2: for-of loop
function findSecondLargest(nums) {
  let max = -Infinity,
    secondMax = -Infinity;
  for (let num of nums) {
    if (num > max) {
      secondMax = max; // Update second max before updating max
      max = num;
    } else if (num > secondMax && num < max) {
      // Update second max if num is between max and secondMax
      secondMax = num;
    }
  }
  return secondMax;
}

const arr = [1, 3, 4, 5, 0, 2, 4, 5]; // Example array
console.log(findSecondLargest(arr)); // Output: 4
```

</details>

---

## 7.

```js
let i;

for (i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

<details>
<summary>Solution</summary>

```js
3;
3;
3;
```

#### Reason:

- The loop increments `i` after each iteration until `i` is no longer less than 3. The final value of `i` after the loop finishes is 3.
- After about 100 milliseconds, the scheduled functions start executing. However, by this time, the loop has completed, and the value of i has been updated to 3.
- **Since the functions capture the `i` variable by reference (not by value), <u>all of them log the final value of i, which is 3</u>**.

```js
// to get the expected output, make sure to declare let i=0; inside for loop
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

```js
0;
1;
2;
```

</details>

---

## 8.

```js
function sum(a, b, c) {
  return a + b + c;
}

function sum(a, b) {
  return a + b;
}

var result = sum(1, 2, 3);
console.log(result);
```

<details>
<summary>Solution</summary>

```js
3;
```

#### Reason:

- When you call sum(1, 2, 3), it uses the <u>second sum function</u>,
- because the first `sum` function <u>has been overwritten by the second declaration</u>
- Since the second sum function only accepts two parameters, **<u>it ignores the third parameter (3 in this case) and calculates the sum of the first two parameters only**</u>.
</details>

---

## 9.

Javascript is by default a synchronous

![image](https://user-images.githubusercontent.com/42731246/149968745-ec192ac9-2ba5-4ddf-8d0a-65d4f88d32b4.png)

using Browser API's to offload the tasks
![image](https://user-images.githubusercontent.com/42731246/149968037-2d87d91a-2666-4adf-a135-3873e833fb75.png)

---

## 10. setInterval keeps on running until we kill the process

![image](https://user-images.githubusercontent.com/42731246/149972934-d770c51d-22b3-4a49-85db-1b5db28a60a5.png)

---

## 11. listen is asynchronous so it keeps on running,

Every time you hit the request on the browser, you get that logged in as (request event)

![image](https://user-images.githubusercontent.com/42731246/149973561-26003a5b-e3c6-43b6-9e2f-728459bc5bff.png)

---

## 12.Blocking code in callbacks (async code),

Cons: Not only /about page will take time to load, but this now affects other page routes also getting blocked (Home page route)

![image](https://user-images.githubusercontent.com/42731246/149974975-7415bcff-3c8a-4887-9629-5e3b60c2e58f.png)

---

## 13. What is the output?

```js
a = 10;

console.log(a);

var a = 20;
```

<details>
<summary>Solution</summary>

10

</details>

---

## 14

```js
var obj1 = { type: 'Fiat', model: '500', color: 'white' };
var obj2 = obj1;
obj2.model = '600';
console.log(obj1);
console.log(obj2);
```

<details>
<summary>Solution</summary>

```js
{
    "type": "Fiat",
    "model": "600",
    "color": "white"
}
{
    "type": "Fiat",
    "model": "600",
    "color": "white"
}
```

</details>

---

## 15. let variable (Does it allow ?)

```js
let a = 10;
let a = 20;
```

![image](https://user-images.githubusercontent.com/42731246/151492543-669e6cdd-3443-4929-be10-1ce173521f80.png)

---

## 16. Type coercion

```js
console.log(1 + '12');
console.log(0 - '10');
console.log('11' + 1);
console.log('10' + -1);
```

<details>
<summary>Solution</summary>

```js
112;
-10;
111;
10 - 1;
```

</details>

---

## 17

```js
let a = 10;

function func() {
  console.log(a);
}

func();
```

<details>
<summary>Solution</summary>

```js
10;
```

</details>

---

## 18. With use strict

```js
'use strict';

var a = 10;

console.log(a);

var a = 20;
```

<details>
<summary>Solution</summary>

```js
10;
```

</details>

---

## 19 Without use strict

```js
var a = 10;

console.log(a);

var a = 20;

console.log(a);
```

<details>
<summary>Solution</summary>

```js
10;
20;
```

</details>

---

## 20 Callback Example

```js
function func(callback) {
  let fname = 'Singh';
  callback(fname); // Pass the fname as an argument to the callback function
}

func(function (name) {
  // The callback function now expects an argument
  console.log(name); // This will log "Singh"
});
```

---

## 21. Remove Duplicates from an array

```js
let array = [1, 1, 3, 6, 5, 6];
```

<details>
<summary>Solution</summary>

```js
let array = [1, 1, 3, 6, 5, 6];
let result = [...new Set(array)];
console.log(result);
```

</details>

---

## 22.

```js
const a = '12';
a = 11;
console.log(a);
```

<details>
<summary>Solution</summary>

```js
 TypeError: Assignment to constant variable.
```

</details>

---

## 23. Object Mutation

```js
const Employee = {
  firstname: 'John',
  lastname: 'Doe',
};
Employee.firstname = 'Singh';
console.log(Employee.firstname);
```

<details>
<summary>Solution</summary>

```js
Singh;
```

</details>

---

## 24. CSS (Most Important)

`div, p`: **<u>Applies the same styling properties to both</u>** div elements and p elements, regardless of their relationship in the document.

`div + p`: <u>**Selects the first p element that is placed immediately after each div element**</u>, where both share the same parent.

`div ~ p`: <u>**Selects all p elements that are siblings of a div element</u>** and come after it in the document.

`div > p`: <u>**Selects all p elements that are immediate children of a div element**.</u>

---

## 25. sum of the even numbers (which has to be squared)

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

<details>
<summary>Solution</summary>

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter the even numbers, square them, and then sum them up
const sum = array
  .filter((num) => num % 2 === 0) // Filter out the even numbers
  .map((num) => num * num) // Square each even number
  .reduce((sum, num) => sum + num, 0); // Sum them up

console.log(sum); // Output the sum
```

</details>

---

## 26. What will this print ?

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filteredItems = array.filter(() => 0);
console.log(filteredItems);
```

<details>
<summary>Solution</summary>

```js
[];
```

</details>

---

## 27. Print the value based on the query params and second key value pair (&)

```js
const url =
  'https://codesandbox.io/s/little-darkness-qsymi?file=/src/index.js:205-267&name=saiteja';
```

<details>
<summary>Solution</summary>

```js
const url =
  'https://codesandbox.io/s/little-darkness-qsymi?file=/src/index.js:205-267&name=saiteja';

// Create a URL object to easily access search params
const urlObj = new URL(url);

// Get the value of the 'name' parameter
const name = urlObj.searchParams.get('name');

console.log(name); // Output the value of the 'name' parameter
```

</details>

---

## 28

```js
var objA = { prop1: 42 };
var objB = objA;
objB.prop1 = 90;
console.log(objA);
```

<details>
<summary>Solution</summary>

```js
{
    "prop1": 90
}
```

</details>

---

## 29

```js
(function () {
  var objA = new Object({ foo: 'foo' });
  var objB = new Object({ foo: 'foo' });
  console.log(objA == objB);
  console.log(objA === objB);
})();
```

<details>
<summary>Solution</summary>

```js
//because they are comparing references, not the content of the objects.
// If you want to compare the objects by their content, you would need to perform a deep comparison of each property within the objects.
false;
false;
```

Here's a simple way to perform a deep equality check using JSON serialization, with the caveat that this method doesn't work well with functions, undefined properties, or objects containing circular references:

```js
(function () {
  var objA = new Object({ foo: 'foo' });
  var objB = new Object({ foo: 'foo' });
  console.log(JSON.stringify(objA) === JSON.stringify(objB)); // true if objects have the same content
})();
```

</details>

---

## 30

i)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

<details>
<summary>Solution</summary>

```js
3;
3;
3;
```

</details>

---

#### ii) you want 0, 1, 2 using `var` keyword

<details>
<summary>Solution</summary>

```js
for (var i = 0; i < 3; i++) {
  function inner(i) {
    setTimeout(() => console.log(i), 1);
  }
  inner(i);
}
```

</details>

---

## 31

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

<details>
<summary>Solution</summary>

```js
0;
1;
2;
```

</details>

---

## 32.

```js
var x = { name: 10 };
var y = { ...x };
y.name = 20;

console.log(x);
console.log(y);
```

<details>
<summary>Solution</summary>

```js
{
    "name": 10
}
{
    "name": 20
}
```

</details>

---

## 33.

```js
var a = 2;
a++;
console.log(a);
const d = [1, 2, 3];
d.push(5);
console.log(d);
const b = 2;
b++;
console.log(b);
const c = [2];
c[0]++;
console.log(c);
```

<details>
<summary>Solution</summary>

```js
var a = 2;
a++;
console.log(a); // 3
const d = [1, 2, 3];
d.push(5);
console.log(d); // [1,2,3,5]
const b = 2;
b++;
console.log(b); // TypeError: Assignment to constant variable
const c = [2]; //nothing prints from this line
c[0]++;
console.log(c);
```

</details>

---

## 34

```js
var a = b();
console.log(a);
var c = d();
function b() {
  return c;
}
console.log(a);
var d = function () {
  return b();
};
```

<details>
<summary>Solution</summary>

```js
undefined
TypeError: d is not a function
```

</details>

---

## 35.

```js
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log('outer func: this.foo = ' + this.foo);
    console.log('outer func: self.foo = ' + self.foo);
    (function () {
      console.log('inner func: this.foo = ' + this.foo);
      console.log('inner func: self.foo = ' + self.foo);
    })();
  },
};
myObject.func();
```

<details>
<summary>Solution</summary>

```js
outer func: this.foo = bar
outer func: self.foo = bar
inner func: this.foo = undefined
inner func: self.foo = bar
```

</details>

---

## 36.

```js
var output = (function (x) {
  delete x;

  return x;
})(0);

console.log(output);
```

<details>
<summary>Solution</summary>

```js
0;
```

</details>

---

## 37 How to empty an array

```js
let a = [1, 6, 8, 9];
```

<details>
<summary>Solution</summary>

```js
//1
a.length = 0;

//2
a = [];

//3
a.splice(0, a.length);

//4
while (a.length) {
  a.shift();
}

//5
Array.from(a.fill());
```

</details>

---

## 38 only print defined values

```js
let b = [1, 2, , 4, 5];

// output should be [1, 2, 4, 5]
```

<details>
<summary>Solution</summary>

```js
//1
// This will filter out any undefined slots in the array
let cleanedArray = b.filter((item) => item !== undefined);

console.log(cleanedArray); // Output will be [1, 2, 4, 5]

//2 -> Shortcut
let cleanedArray = b.filter(Boolean);

console.log(cleanedArray); // Output will be [1, 2, 4, 5]
```

</details>

---

## 39 Nested Arrays

```js
let a = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

// output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

<details>
<summary>Solution</summary>

```js
let a = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

// Flattens the array completely
let flatArray = a.flat(Infinity);

console.log(flatArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

</details>

---

## 40

```js
const arr = [1, 2, undefined, NaN, null, false, true, '', 'abc', 3];
console.log(arr.filter(Boolean)); //[1, 2, true, 'abc', 3]

const arr1 = [1, 2, undefined, NaN, null, false, true, '', 'abc', 3];
console.log(arr1.filter(!Boolean));
```

<details>
<summary>Solution</summary>

```js
const arr = [1, 2, undefined, NaN, null, false, true, '', 'abc', 3];
console.log(arr.filter(Boolean));

//This operation evaluates to false because !Boolean (the negation of a truthy value, which the Boolean function is considered to be) is false.
// Therefore, when you try to pass !Boolean to .filter(), you're essentially trying to pass a boolean value (false) instead of a function, which is why you get the error "boolean false is not a function."
const arr1 = [1, 2, undefined, NaN, null, false, true, '', 'abc', 3];
console.log(arr1.filter(!Boolean));
```

</details>

---

## 41

```js
var a = 3;
var b = {
  a: 9,
  b: ++a,
};
console.log(a + b.a + ++b.b);
```

<details>
<summary>Solution</summary>

```js
18;
```

1. var a = 3; sets a to 3.

2. In the object b, a is set to 9. This does not affect the variable a defined outside; they are two separate entities.

3. Still inside object b, b: ++a is evaluated. The prefix increment ++a increases a by 1 before assigning it to b.b, making a now 4 and b.b also 4.

4. At this point:

The standalone variable a is 4.
The object b looks like this: { a: 9, b: 4 }.
console.log(a + b.a + ++b.b); computes the sum:

- a is 4.
- `b.a` is 9.
- `++b.b` is a prefix increment of `b.b`, so `b.b` is increased to 5 before it's added to the sum.
  Therefore, the calculation is 4 + 9 + 5, which equals 18.

</details>

---

## 42. What will be the output of the code below?

```js
function foo() {
  return "I'm the outer function";
}

function test() {
  console.log(bar);
  return foo();
  var bar = "I'm a variable";
  function foo() {
    return "I'm the inner function";
  }
}
console.log(test());
```

<details>
  <summary>View Answer</summary>
 undefined 
 I’m the inner function
</details>

---

## 43. What will be the output of the code below?

```js
const nums = [1,2,3,4,5,6,7];
nums.forEach((n) => {
    if(n%2 === 0)
      break;
    console.log(n);
});
```

<details>
  <summary>View Answer</summary>
  
##### Syntax Error ( because you cannot use break within a forEach)

```js
//correct solution would be by using loops

const nums = [1, 2, 3, 4, 5, 6, 7];

for (let n of nums) {
  if (n % 2 === 0) break;
  console.log(n);
}
```

</details>

---

## 44. What will be the output of the code below?

```js
async function foo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log('C');
}

console.log('D');
foo();
console.log('E');
```

<details>
  <summary>View Answer</summary>
Output: D, A, E, B, C
</details>

---

### 45.

```js
console.log(2 + '2' - 1);
```

<details>
<summary>Solution</summary>

```js
21 (type is 'number')
```

</details>

---

### 46.

```js
console.log([] == ![]);
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 47.

```js
console.log('5' + 3);
```

<details>
<summary>Solution</summary>

```js
53 (type is 'string')
```

</details>

---

### 48.

```js
console.log(3 == '3');
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 49. ;

```js
console.log(1 < 2 < 3);
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 50.

```js
console.log(3 < 2 < 1);
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 51.

```js
console.log(typeof NaN);
```

<details>
<summary>Solution</summary>

```js
number;
```

</details>

---

### 52.

```js
console.log(typeof typeof 1);
```

<details>
<summary>Solution</summary>

```js
string;
```

</details>

---

### 53.

```js
console.log(1 + '1' - 1);
```

<details>
<summary>Solution</summary>

```js
10;
```

</details>

---

### 54.

```js
console.log([] + [] + 'foo'.split(''));
```

<details>
<summary>Solution</summary>

```js
'f,o,o';
```

Reason:
--> [] + [] effectively becomes "" + "", which results in an empty string "".
---> 'foo'.split('') result is ["f", "o", "o"].
---> In JavaScript, when you use the + operator with a string and an array, the array is converted to its string representation before the concatenation.
---> The string representation of an array is obtained by joining its elements with commas. For the array ["f", "o", "o"], the string representation is "f,o,o".

</details>

---

### 55.

```js
var x = 0;
console.log(x++);
console.log(++x);
```

<details>
<summary>Solution</summary>

```js
0;
2;
```

</details>

---

### 58.

```js
console.log('1' - -'1');
```

<details>
<summary>Solution</summary>

```js
2;
```

---> '1' is converted to the number 1.
---> -1 negates the value of '1', turning it into -1.

---> The subtraction '1' - -1 is performed, resulting in 1 - (-1) = 2.

</details>

---

### 56.

```js
console.log(!!null);
```

<details>
<summary>Solution</summary>

```js
false;
```

</details>

---

### 57.

```js
console.log(!!undefined);
```

<details>
<summary>Solution</summary>

```js
false;
```

</details>

---

### 58.

```js
var a = { b: 1 };
var c = a;
a.b = 2;
console.log(c.b);
```

<details>
<summary>Solution</summary>

```js
2;
```

</details>

---

### 59.

```js
console.log('hello' instanceof String);
```

<details>
<summary>Solution</summary>

```js
false;
```

- In JavaScript, when you use single quotes (') or double quotes (") to create a string, you're creating a primitive string, not an instance of the String object.
- When you use the instanceof operator, it checks if an object is an instance of a specific type. In this case, 'hello' is a primitive string, not an instance of the String object.

```js
var strObject = new String('hello');
console.log(strObject instanceof String); // Output: true
```

</details>

---

### 60.

```js
console.log([] == 0);
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 61.

```js
console.log([] == ![]);
```

<details>
<summary>Solution</summary>

```js
true;
```

- ![] evaluates to false
- []==false evaluates to true

</details>

---

### 62.

```js
console.log(!![]);
```

<details>
<summary>Solution</summary>

```js
true;
```

</details>

---

### 63. Point to remember

- an empty array [] is considered a "truthy" value, ![] becomes !true, which evaluates to false.

##### For `console.log([] == false)`

- When comparing against a `boolean`, JavaScript first **converts the boolean to a number** (false becomes 0).
- JavaScript attempts to convert the array to a primitive value for comparison.
- For the empty array [], this conversion process effectively **turns it into an empty string ""**
- JavaScript then converts the empty string "" to a number, which results in 0.
- Final Comparison: Now the comparison is between 0 and 0, which is true


### 64. 

```js
const object1 = {
  a: 10,
  b: 20,
  c: function () {
    console.log(this.a + this.b);
  },
};
const result = object1.c;
result();
```


<details>
<summary>Solution</summary>

```js
NaN
```
Reason: this points to window and this.a is undefined (so undefined + undefined) results NaN
</details>

----

### 65. 

```js
var p = 4;
let data = {
  p: 1,
  arrow: () => {
    console.log(this.p);
  },
  nonArrow: function () {
    self = this;
    console.log(self.p);
    console.log(this.p);
    (function () {
      console.log(self.p);
      console.log(this.p);
    })();
  },
};
data.arrow();
data.nonArrow();
```

<details>
<summary>Solution</summary>

```js
4, ---> inside arrow (this.p) points to window
1, ---> inside non-arrow (self.p) points to data object
1, ---> inside non-arrow (this.p) points to data object
1, ---> inside non-arrow, IIFE (self.p) points to data object
4, ---> inside non-arrow (this.p) points to window object
```
</details>

----

### 66. 

```js
console.log(1);
 
setTimeout(() => console.log(2));
 
Promise.resolve().then(() => console.log(3));
 
Promise.resolve().then(() => setTimeout(() => console.log(4)));
 
Promise.resolve().then(() => console.log(5));
 
setTimeout(() => console.log(6));
 
console.log(7);

```

<details>
<summary>Solution</summary>

```js
1
7
3
5
2
6
4 
```

- console.log(1); - This is a synchronous operation. It logs 1 immediately.
- setTimeout(() => console.log(2)); - This schedules a macrotask to log 2. It is put into the macrotask queue (also known as the task queue) and will execute after all currently scheduled macrotasks and the current execution context is complete.
- Promise.resolve().then(() => console.log(3)); - This schedules a microtask. Microtasks are used for promises and queues that are processed at the end of the current task before the JavaScript runtime starts the next task. It will log 3 as soon as the current script finishes, but before any tasks (such as setTimeout) are executed.
- Promise.resolve().then(() => setTimeout(() => console.log(4))); - This is scheduling a microtask that itself schedules a macrotask. First, the microtask will run after the current script (to log 4 but within a setTimeout, making it a macrotask).
- Promise.resolve().then(() => console.log(5)); - This schedules another microtask to log 5, similar to the earlier promise.
- setTimeout(() => console.log(6)); - This schedules another macrotask to log 6, added to the macrotask queue.
- console.log(7); - Another synchronous operation, logs 7 immediately after 1.


</details>