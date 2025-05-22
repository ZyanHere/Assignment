#### 1. Exponential operator (\*\*)

```js
let base = 2
let exponent = 3
let result = 2 ** 3
console.log(result)
```

This operator is equivalent to Math.pow() method

```js
Math.pow(2, 3)
```

---

#### 2. Logical assignment operator (&&=, ||=)

- If the left side of the operator is truthy then it will assign it whereas logical AND will only check truthy

```js
let x = 5
x &&= 10
console.log(x) //10

// x=5 is read as truthy value and thereby assigned 10

// x=0, null, undefined then it would have logged 5 instead of 10 in the above scenario
```

```js
let x = null;
x || = 10;
console.log(x) //10

// x is treated false and it will assign 10

// if x has some value like 5 or "hello" then same would have been logged instead of 10.
```

---

#### 3. The comma operator

- Multiple expressions to be executed in a single statement

Both are actually same

```js
let x = 1,
  y = 2
```

```js
let x = 1
let y = 2
```

```js
comma operator is also used to separate multiple args
```

##### comma operator can also be used in conjunction with other operators such as the ternary operator

```js
let x = condition ? ((a = 1), (b = 2), (c = 3)) : 0
```

---

#### . Bitwise NOT operator (~)

- allow you to manipulate individual bits of a number.

- unary operator that performs bitwsise operation on its operand.

- It inverts the bits of a number (ex: 0's to 1's or vice versa)

```js
~operand
```

- Lets say you have the number 10, which is represented in binary as 1010, and you apply the Bitwise NOT operator, the result would be -11, which is represented in binary as 11111111111111111111111111110101.

##### Example:

```js
// For example, you can use the NOT operator to invert a mask and then use the AND operator (&) to clear specific bits in a number.
let number = 10
let mask = 5
let result = number & ~mask
console.log(result) //0
```

- Here, the number 10 is represented in binary as 1010 and the mask 5 is represented in binary as 0101. By using the Bitwise NOT operator to negate the mask, we invert its bits to 1010

- When we use the AND operator to combine the number and the inverted mask, all the bits that were set in the mask are cleared in the final result.

---

#### 5. Bitwise AND operator (&)

- used to perform bit level operation on numbers.

- This operator compares each bit of the first operand to the corresponding bit of the second operand and if both bits are 1, the corresponding result bit is set to 1. Otherwise, the corresponding result bit is set to 0.

```js
const a = 5 // binary : 101
const b = 3 // binary: 011
```

```js
const c = a & b // 1
```

- It results decimal value of 1 because it compares bit by bit

```js
  101
& 011
----
  001
-----
```

---

#### 6. Bitwise OR operator

- If either bit is 1, the result set to be 1 otherwise 0.

---

#### 7. Bitwise XOR operator

- allows you to perform bitwise operations on binary numbers.

- compares bit of the first number to the corresponding bit of the second number. If the bits are same, it results 0 otherwise 1

```js
let num1 = 5 // 101
let num2 = 3 // 011

let result = num1 ^ num2 // 110
console.log(result) //6
```

---

#### 8. typeof operator

- Is to determine the type of the variable or an expression.

- “number” for numbers
- “string” for strings
- “boolean” for booleans
- “function” for functions
- “object” for objects
- “undefined” for undefined values

```js
let x = 10
console.log(typeof x) // number
```

```js
typeof array results object

typeof null results object
```

```js
To check if a variable is a Array, you can use Array.isArray() method.
```

```js
let x = [1, 2, 3]
console.log(typeof x) // object

console.log(Array.isArray(x)) // true
```

```js
let x
typeof x // undefined
```

---

#### 9. instanceof operator

- to check if an object is an instance of a particular class or constructor.

- takes two operands (object, constructor)

- returns true if the object is an instance of the constructor otherwise false.

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

let person1 = new Person("John", 30)

console.log(person1 instanceof Person) //true
```

```js
let arr = [12, 2, 3]
console.log(arr instanceof Array) //true

let date = new Date()
console.log(data instanceof Data) //true
```

```js
instanceof operator only checks the prototype chain of an object.
```

- if you create an object with an object literal, it will not be an instance of the Object constructor.

- In this below example, the obj variable is an object, but it is not an instane of the Object constructor. This is because it was created with an object literal, not the Object constructor.

```js
let obj = { name: "John", age: 30 }

console.log(obj instanceof Object) //false
```

---

#### 10. in operator

- checking if an object has a specific property.

- common use of "in" is to check if an object has a certain property.

```js
var obj = { name: "John", age: 30 }

if ("name" in obj) {
  console.log(obj.name) // John
}
```

```js
var obj = { name: "John", age: 30 }

if ("toString" in obj) {
  console.log(obj.toString()) //[object Object]
}
```

---

#### 11. yield operator

- to create `iterable` `objects` and control the flow of execution in a program.

- Useful when working with `async` code

- used in conjunction with the generator function, which is a special kind of function that can be paused and resumed multiple times.

- When a generator function is called, it returns an iterator object that can be used to control the flow of execution.

- The yield operator is used within the generator function to pause the execution and return a value to the iterator.

```js
function* myGenerator() {
  yield 1
  yield 2
  yield 3
}

const iterator = myGenerator()
console.log(iterator.next().value) //1
console.log(iterator.next().value) //2
console.log(iterator.next().value) //3
console.log(iterator.next().done) //true
```

- myGenerator function used the yield operator to receive a value from the iterator.

- the first call to the next() method is used to start the execution of the generator function

- The second call in used to pass the value "Hello World" to the generator function.

```js
function* myGenerator() {
  const value = yield
  console.log(value)
}

const iterator = myGenerator()

iterator.next()
iterator.next("Hello World") // "Hello World"
```
