#### Following are the true about the ternary operator

<details>
<summary>Solution</summary>

```js
- Ternary operator is a substitute for an if statement
- Ternary operator is the only Javascript operator that takes three operands
- Ternary operator separates the conditional expression from the true value expression.
```

</details>

---

#### isNaN function returns true if the argument is not a number and false otherwise

<details>
<summary>Solution</summary>

```js
True
```

</details>

---

#### Is it possible to break a string in Javascript into several lines

<details>
<summary>Solution</summary>

```js
Yes, a string can be broken into multiple lines using
- a backslash at the end of first line
```

</details>

---

#### What will be the output of the following code?

```js
var a
console.log(a)
var b = null
console.log(b)
console.log(c)
```

<details>
<summary>Solution</summary>

```js
undefined
null
Error (variable  not declared will be displayed)
```

</details>

---

#### Which symbols are used for comments in JavaScript?

<details>
<summary>Solution</summary>

```js
// for single comments
/* */ for multi-line comments
```

</details>

---

#### Which of the following are looping structures in JavaScript?

<details>
<summary>Solution</summary>

```js
for, while, do-while
```

</details>

---

#### What would be the result of 3+2+"7"?

<details>
<summary>Solution</summary>

```js
57
```

</details>

---

#### All non-primitive variables in JavaScript are of the type Object.

<details>
<summary>Solution</summary>

```js
All non-primitive variables in Javascript are the type Object.
```

</details>

---

#### What does the break statement do ?

<details>
<summary>Solution</summary>

```js
break statement exists from the loop on the first occurrence because break statement is used to prematurely stopping a loop. Whenever it is encountered, the loop is stopped regradless of whether the iterations are complete or not.
```

</details>

---

#### What will be the output of the code ?

```js
var i
for (i = 0; i < 5; i++) {
  if (i === 3) {
    continue
  }
  console.log("Number is: " + i)
}
```

<details>
<summary>Solution</summary>

```js
Number is: 0

Number is: 1

Number is: 2

Number is: 4

When i==3 the iteration will be skipped and i will get incremented to 4, hence, in the output the line Number is: 3 will not be printed.

```

</details>

---

#### Primitive, Reference and Object types are three basic groups of datatypes in JavaScript.

<details>
<summary>Solution</summary>

```js
Primitive and Reference types are the two basic groups of datatypes in JavaScript.
```

</details>

---

#### What is the difference between == and === symbols in JavaScript?

<details>
<summary>Solution</summary>

```js
Don't say that == checks for same value and === checks both type and value.
Technically, it is more accurate to say == and === use identical algorithm and work same in the backend.

- The only difference is == allows coercion in the equality comparision and === don't allow coercion in the === equality.
```

</details>

---

#### What are the differences between anonymous and named functions?

<details>
<summary>Solution</summary>

```js
- Named functions have a name whereas anonymous functions don't have a name
- Named function can be called from inside itself whereas an anonymous function can't
- Named function can be called before or after declaration whereas an anonymous function can only be called after declartion.
```

</details>

---

#### What is the type of NaN?

<details>
<summary>Solution</summary>

```js
Number
```

</details>

---

#### How should you check if a variable x is NaN?

<details>
<summary>Solution</summary>

```js
isNaN(x)
```

</details>

---

#### What does 1/0 evaluate to?

<details>
<summary>Solution</summary>

```js
Infinity
```

</details>

---
