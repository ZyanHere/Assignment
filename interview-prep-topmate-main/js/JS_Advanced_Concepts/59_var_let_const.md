- ##### var - Since javascript is came into existence, var variable has been used. This a function scoped/global scoped

- ##### let, const - Since ES6 is came into existence, let variable has been used. This is a block scoped

- ##### let variables cannot be re-declared but <i>can be re-assigned</i>

- ##### const variables cannot be re-declared and re-assigned

- ##### Prefer using const variables unless until you want to change the values

---

### Example 1

```js
if (true) {
  var varVariable = 'This is true';
}
console.log(varVariable);

if (true) {
  let letVariable = 'This is true';
  console.log(letVariable);
}

console.log(letVariable);
```

<details>
<summary>Solution</summary>

```js
This is true
This is true // inside if condition
Reference Error: 'letVariable' is not defined. // outside
```

</details>

---

### Example 2

```js
if (true) {
  var varVariable = 'This is true';
}

var varVariable = 'This is false';
console.log(varVariable);
```

<details>
<summary>Solution</summary>

```js
This is false
```

</details>

---

### Example 3

```js
let letVariable = 'This is true';
let letVariable = 'This is false';
console.log(letVariable);
```

<details>
<summary>Solution</summary>

```js
Uncaught SyntaxError: Identifier 'letVariable' is already been declared
```

</details>

---

### Example 4

```js
console.log(varVariable);
```

<details>
<summary>Solution</summary>

```js
Uncaught Reference Error: 'varVariable' is not defined.
```

</details>

---

### Example 5

```js
console.log(varVariable);
var varVariable = '5';
```

<details>
<summary>Solution</summary>

undefined

</details>

---

### Example 6

```js
console.log(varVariable);
var varVariable = '5';
console.log(varVariable);
```

<details>
<summary>Solution</summary>
undefined
5

</details>

---

### Example 7

```js
console.log(letVariable);
let letVariable = '5';
console.log(letVariable);
```

<details>
<summary>Solution</summary>

Uncaught Reference Error: 'letVariable' is not defined.

</details>

---

### Example 8 (without console.log)

```js
const constVariable = '6';
let letVariable = '5';

letVariable = '7';
constVariable = '7';
```

<details>
<summary>Solution</summary>

Uncaught Type Error: Assignment to constant variable.

</details>

---

### Example 9 (const as object)

```js
const constVariable = { name: 'Bob' };

constVariable.name = 'Teja';

console.log(constVariable);
```

<details>
<summary>Solution</summary>

```js
{
  name: 'Teja';
}
```

</details>

---
