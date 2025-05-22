- <strong>Scope: </strong> A set of code that has all your variables defined in it and those variables are only accessible inside that scope, anything outside that scope does not have access to those variables

#### Example 1 :

- variable b is only accessed in the function (Function scope)

```js
const a = 1

function test() {
  const b = 2
  console.log("Here is the values", a, b) // Here is the values 1 2
}

test()
console.log(a, b) // Reference Error: b is not defined
```

#### Example 2 :

```js
const a = 1

function test() {
  const b = 2
  console.log("Here is the values", a, b) // Here is the values 1 2
}

test()
console.log(a, b) // Reference Error: b is not defined
```

---

#### Example 3: Global Scope

- This is referred to as top of the file
- If you define a variable it's available in every other file that gets loaded.

![image](https://user-images.githubusercontent.com/42731246/215329474-b00b2bc4-36da-4d37-ad4f-22c0e78511a6.png)

```js
// nonModuleScript.js
const globalVar = "Global"
```

```js
// script.js
console.log(globalVar) // Global
```

---

#### Example 4: Module Scope

- This means that if you define a variable in a file <strong>it's only available within the file</strong> unless you explicitly export that out.
- In the below case, we are exporting this variable which is why we can use it this module variable

```js
// moduleScript.js
const moduleVar = "Module"
export const exportedVar = "Exported"
```

```js
// script.js
import { exportedVar } from "./moduleScript.js"
console.log(exportedVar) //Exported
console.log(expomoduleVarrtedVar) // Reference Error: moduleVar is not defined
```

---

#### Example 5: Function Scope

- variable b would print out because it is defined inside the function
- if you try to log c outside the if block, it doesn't works because of Block scope (anything that is defined inside the curly braces {})

```js
// script.js
function test() {
  const b = 2

  if (true) {
    const c = 3
  }
  console.log(b) // 2
  console.log(b, c) // Uncaught ReferenceError: c is not defined
}
test()
```

---

#### Example 6: Function Scope (with var keyword declaration)

- variable declared with var are function scope so they can be accessed anywhere inside the function

```js
// script.js
function test() {
  var b = 2

  if (true) {
    var c = 3
  }
  console.log(b) // 2
  console.log(b, c) // 2 3
}
test()
```

---

#### Example 7: Block Scope

- if you try to log c inside the if block, it works because of Block scope

```js
// script.js
function test() {
  const b = 2

  if (true) {
    const c = 3
    console.log(b, c) // 2 3
  }
}
```

---

#### Example 8: multiple variables with the same name

- this is because the block scope variable are given priority when there is a conflict

```js
// script.js
function test() {
  const c = 2

  if (true) {
    const c = 3
    console.log(c) // 3
  }
}
```

---
