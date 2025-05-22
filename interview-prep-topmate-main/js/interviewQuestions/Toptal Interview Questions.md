#### 1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

- In Javascript, the `Arrays` are technically objects,

```js
type of [] === "object" //  true;
```

- the value `null` is considered an object type in Javascript.

```js
typeof null === 'object' //true
```

- While functions are callable objects in javascript, This means that while functions can be invoked, they still have properties and methods like any other object. (Ex: call, bind methods)

```js
typeof function () {} // "function"
```

```js
typeof function () {} === 'object' // false
```

##### There are three ways to avoid these pitfalls

###### 1. Basic Object Check:

```js
if (bar !== null && typeof bar === 'object' && !(bar instanceof Array)) {
  // bar is an object
}
```

###### 2. Object.prototype.toString:

```js
if(Object.prototype.toString.call(bar) === "[object Object]")

// bar is an object
```

###### 3. constructor:

```js
if (bar && bar.constructor === Object) {
  // bar is an plain object
}
```

##### Problems with using constructor property:

<strong>Inheritance:</strong> If you're working with objects that might have been created through custom constructors or classes then they will not match the basic `Object` constructor. <strong>if you have a class `Foo` an instance of `Foo` would fail the above check even though it's an object.</strong>

<strong>Modified Constructor:</strong> The constructor property can be changed, making it a potentially unreliable way to check for an object's type.

<strong>Objects from different Windows:</strong> If you are working in a browser env with multiple frames or windows, objects from one frame will have a different constructor than objects from another frame.

##### Examples:

```js
// Plain Objects
let obj1 = {}
console.log(obj1.constructor === Object) // true

let obj2 = new Object()
console.log(obj2.constructor === Object) // true
```

```js
// Arrays
let arr = []
console.log(arr.constructor === Object) // false
```

```js
function MyClass() {}
let myInstance = new MyClass()
console.log(myInstance.constructor === Object) // false
```

```js
let str = new String('hello')
console.log(str.constructor === Object) // false

let num = new Number(10)
console.log(num.constructor === Object) // false
```

---

```js
// Plain Objects
let obj1 = {}
console.log(Object.prototype.toString.call(obj1)) // "[object Object]"

let obj2 = new Object()
console.log(Object.prototype.toString.call(obj2)) // "[object Object]"
```

```js
// Arrays
let arr = []
console.log(Object.prototype.toString.call(arr)) // "[object Array]"
```

```js
function MyClass() {}
let myInstance = new MyClass()
console.log(Object.prototype.toString.call(myInstance)) // "[object Object]"
```

```js
let str = new String('hello')
console.log(Object.prototype.toString.call(str)) // "[object String]"

let num = new Number(10)
console.log(Object.prototype.toString.call(num)) // "[object Number]"
```

---

#### 2. What will the code below output to the console and why?

```js
;(function () {
  var a = (b = 3)
})()

console.log('a defined? ' + (typeof a !== 'undefined'))
console.log('b defined? ' + (typeof b !== 'undefined'))
```

<details>
<summary>View Answer</summary>

false
true

```js
typeof a // "undefined"
typeof b // "number"
```

</details>

---

#### 3.Output ?

```js
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this
    console.log('outer func:  this.foo = ' + this.foo)
    console.log('outer func:  self.foo = ' + self.foo)(function () {
      console.log('inner func:  this.foo = ' + this.foo)
      console.log('inner func:  self.foo = ' + self.foo)
    })()
  },
}
myObject.func()
```

<details>
<summary>View Answer</summary>

```js
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```

##### In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.

##### In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner function, whereas the reference to the local variable self remains in scope and is accessible there.

</details>

---

#### 4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

- This technique creates a closure around the entire contents of the file which, perhaps most importantly creates a private nampespace and thereby helps avoid potential name clashes between different JS modules and libraries.

---

#### 5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

- Was introduced in ES5 to write more reliable and maintainable JS code.

Here are the significance and benefits of using `use strict`

- <strong>Catches common coding errors:</strong>
- <strong>Prevents the use of potentially confusing features:</strong>
- <strong>this will be undefined instead of gloabl Window object:</strong>
- <strong>Disallows duplicate parameter names</strong>
- <strong>Makes eval safer</strong>
- <strong>Prevents octal syntax</strong>
- <strong>Performance improvements</strong>

---

#### 6. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

```js

const isPalindrome = (str)=>{
for(let i = 0; j<str.length -1 ; i< j; i++, j--){
if(str[i]! == str[j]) return false
return true;
}
}

```

---

#### 7 . Write a sum method which will work properly when invoked using either syntax below.

```js
console.log(sum(2, 3)) // Outputs 5
console.log(sum(2)(3)) // Outputs 5
```

```js
const sum = (a, b) => (b !== undefined ? a + b : (b) => sum(a + b))
```

---

#### 8. Consider the following code snippet and guess what happens for the below scenarios

```js
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Button ' + i))
  btn.addEventListener('click', function () {
    console.log(i)
  })
  document.body.appendChild(btn)
}
```

a) What gets logged to the console when the user clicks on `Button 4` and why?

- It always logs Button 5 everytime no matter whatever the button user clicks.

```js
This is because at the point `onclick` method is invoked (for any buttons) the for loop has already completed and the variable `i` already has a value of `5`
```

b) Provide one or more alternate implementations that will work as expected.

```js
// Solution 1: Closures with IIFE

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Button ' + i))
  btn.addEventListener(
    'click',
    (function (i) {
      return function () {
        console.log(i)
      }
    })(i)
  )
  document.body.appendChild(btn)
}
```

```js
// Solution 2: IIFE with Anonymous function

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Button ' + i))(function (i) {
    btn.addEventListener('click', function () {
      console.log(i)
    })
  })(i)
  document.body.appendChild(btn)
}
```

```js
// Solution 3: ES6

for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Button ' + i))
  btn.addEventListener('click', function () {
    console.log(i)
  })
  document.body.appendChild(btn)
}
```

---

#### 9. Consider the following code snippet what will be the output?

```js
var arr1 = 'john'.split('')
var arr2 = arr1.reverse()
var arr3 = 'jones'.split('')
arr2.push(arr3)
console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1))
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1))
```

<details>
<summary>View Answer</summary>

```js
var arr1 = 'john'.split('') // ['j', 'o', 'h', 'n']
var arr2 = arr1.reverse() // this will reverse the arr1 and arr2 // ['n', 'h', 'o', 'j']
var arr3 = 'jones'.split('') // ['j', 'o', 'n', 'e', 's']
arr2.push(arr3) // arr2, arr1 = ['n', 'h', 'o', 'j', ['j', 'o', 'n', 'e', 's']]
console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1))
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1))
```

<b>Note:</b> When you pass an array directly to console.log, it will try to display the array in its most "natural" form.

- Concatenating an array to a string. When you do this, JavaScript will coerce the array to its string representation. The default string representation of an array is its elements joined by commas. So, the array ['j', 'o', 'n', 'e', 's'] becomes the string 'j,o,n,e,s'.

</details>

---

#### 10. Consider the following code snippet what will be the output?

```js
console.log(1 + '2' + '2')
console.log(1 + +'2' + '2')
console.log(1 + -'1' + '2')
console.log(+'1' + '1' + '2')
console.log('A' - 'B' + '2')
console.log('A' - 'B' + 2)
```

<details>
<summary>View Answer</summary>

```js
'122'
'32'
'02'
'112'
'NaN2'
NaN // any operator applied to NaN with any other numeric operand will still yield NaN.
```

</details>

---

#### 11. Consider the following code snippet what will be the output?

```js
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name
  },
}

var stoleSecretIdentity = hero.getSecretIdentity

console.log(stoleSecretIdentity())
console.log(hero.getSecretIdentity())
```

<details>
<summary>View Answer</summary>

```js
undefined // stoleSecretIdentity() is being invoked in the global context (i.e., the window object) where the \_name property does not exist.
John Doe
```

</details>

---

#### 12. Consider the following code snippet what will be the output?

```js
var length = 10
function fn() {
  console.log(this.length)
}

var obj = {
  length: 5,
  method: function (fn) {
    fn()
    arguments[0]()
  },
}

obj.method(fn, 1)
```

<details>
<summary>View Answer</summary>

```js
10
2
```

- A global variable length is declared and initialized with the value 10.
  function fn() { console.log(this.length); }

- A function fn is declared which logs the length property of its context (this).
  An object obj is declared with two properties:

- length: which has a value of 5.
- method: which is a function that accepts another function fn as its argument.
  Inside the method function:

- fn();: This calls the passed function fn. Since it's called without any specific context, in non-strict mode, this inside fn will refer to the global object (which is window in browsers). Therefore, this.length inside fn will refer to the global length variable, which is 10. So, the output will be 10.

- arguments [0] ();: The arguments object represents the functions arguments. - arguments [0] refers to the first argument passed to the method function, which is the function fn. When you call a function through the arguments object, the context (this) is the arguments object itself. The arguments object has a length property that indicates the number of arguments passed to the function. In this case, two arguments (fn and 1) are passed to the method function, so arguments.length is 2. Therefore, the output will be 2.

obj.method(fn, 1);

This calls the method function of the obj object, passing the function fn and the number 1 as arguments.

</details>

---

#### 13. Consider the following code snippet what will be the output?

```js
console.log(1 < 2 < 3)
console.log(3 > 2 > 1)
```

<details>
<summary>View Answer</summary>

```js
true
false
```

</details>

---

#### 14. Consider the following code snippet what will be the output?

```js
typeof undefined == typeof NULL
```

<details>
<summary>View Answer</summary>

```js
true

// typeof NULL 'undefined'
// typeof undefined 'undefined'
```

</details>

---

#### 15. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.?

<details>
<summary>View Answer</summary>

```js
function isInteger(x) {
  return Number.isInteger(x)
}
```

```js
// realtime example
function addToCart(item, quantity) {
  if (!Number.isInteger(quantity)) {
    console.error('Invalid quantity. Please enter a whole number.')
    return
  }

  // If valid, proceed to add the item to the cart
  // ... rest of the code ...
}

// Usage
addToCart('laptop', 2) // Valid
addToCart('shoe', 3.7) // Invalid quantity. Please enter a whole number.
addToCart('book', 2.0) // Valid, because 2.0 is equivalent to 2 in JavaScript
```

</details>
