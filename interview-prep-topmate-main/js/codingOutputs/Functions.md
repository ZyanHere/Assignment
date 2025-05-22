### Question 1:

```js
console.log(square)
console.log(square(5))

const square = function (n) {
  return n * n
}
```

<details>
<summary>Solution</summary>

Reference Error: Cannot access 'square' before initialization
<i>you won't next line of console.log before the it is run time error.</i>

</details>

---

### Question 2:

```js
console.log(square)
console.log(square(5))

var square = function (n) {
  return n * n
}
```

<details>
<summary>Solution</summary>

undefined
Reference Error: Cannot access 'square' before initialization

Reason for Reference Error : <i> function block is not hoisted</i>

</details>

---

### Question 3:

```js
function test(theObject) {
  theObject.make = "Toyota"
}
const car_details = {
  make: "Honda",
  model: "Accord",
  year: 1998,
}
console.log("car_details.make 1", car_details.make)
test(car_details)
console.log("car_details.make 2" + car_details.make)
```

<details>
<summary>Solution</summary>

Honda
Toyota

</details>

---

### Question 4:

```js
var num1 = 20,
  num2 = 3,
  name = "Chamakh"
function getScore() {
  var num1 = 2,
    num2 = 3
  function add() {
    return name + " scored " + (num1 + num2)
  }
  return add()
}
console.log(getScore())
```

<details>
<summary>Solution</summary>

Chamakh scored 5

Reason: when the name collision happens then local scope variables are taken into consideration

</details>

---

### Question 5:

```js
function addSquares(a, b) {
  function square(x) {
    return x * x
  }
  return square(a) + square(b)
}
const a = addSquares(2, 3)
const b = addSquares(3, 4)
const c = addSquares(4, 5)
console.log(a, b, c)
```

<details>
<summary>Solution</summary>

13, 25, 41

</details>

---

### Question 6:

```js
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z)
    }
    C(3)
  }
  B(2)
}
A(1)
```

<details>
<summary>Solution</summary>

6

</details>

---
