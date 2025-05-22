#### 1. Nullish Coalescing Operator
- In JavaScript, the nullish coalescing operator (??) ***returns the right-hand side operand*** <ins>***when the left-hand side operand is*** `null` or `undefined`</ins>, and otherwise returns the left-hand side operand.
- If the provided argument is 0 then it is considered as 0 instead of returning the right-hand side operand

##### Example:

```js
function calculatePrice(price, taxes, description) {
  taxes = taxes ?? 0.05
  description = description ?? "Default item"
  const total = price * (1 + taxes)
  console.log(`${description} With Tax: $${total}`)
}
calculatePrice(100, 0.07, "My item")
calculatePrice(100, 0, "My other item")
calculatePrice(100, undefined, "")
```

<details>
<summary>
Solution
</summary>

```js
My item With Tax: $107
My other item With Tax: $100
With Tax: $105
```

</details>

---

#### 2. Styling console.log

- Syntax: Add %c before the text you want to style and then pass the second property to your console.log (which is nothing but your CSS styles )

- Ex: console.log("%c Hello SaiTeja", "color: blue")

```js
function calculatePrice(price, taxes, description) {
  taxes = taxes ?? 0.05
  description = description ?? "Default item"
  const total = price * (1 + taxes)
  console.log(
    `%c${description} With Tax: $${total}`,
    "font-weight: bold; color: red"
  )
}
calculatePrice(100, 0.07, "My item")
calculatePrice(100, 0, "My other item")
calculatePrice(100, undefined, "")
```

<img width="356" alt="image" src="https://user-images.githubusercontent.com/42731246/214549203-6ac4aede-b5c0-441a-9f56-d2c7bb98774e.png">

---

```js
// First %c makes font bolder, second %c makes font green (comma is provided not semi-colon)

Ex: console.log("%c With Tax: %c $107", "font-weight: bold", "color: green")

console.log(
  `%c${description} With Tax: %c $${total}`,
  "font-weight: bold",
  "color: green"
)
```

<img width="353" alt="image" src="https://user-images.githubusercontent.com/42731246/214549994-2673a701-7ae9-40bd-9fa7-e001aa6b7612.png">

---

#### 3. Optional Chaining

- Syntax: question mark and dot (?.) to check if the object property is existing or not.
- Can be used for functions also (Ex: kyle.printName?.())

##### Original Code

```js
class Person {
  constructor(name, address, hobbies) {
    this.name = name
    this.address = address
    this.hobbies = hobbies
  }

  print() {
    console.log(this)
  }
}

function printPersonStreet(person) {
  console.log(person.address.street)
}

const kyle = new Person(
  "Kyle",
  { street: "12345 main st", city: "Somewhere" },
  ["Bowling", "Weight Lifting"]
)

kyle.print()

printPersonStreet(kyle)
```

<details>

<summary>Solution</summary>

```js
{name: "Kyle", address: {street: "12345 main st", city: "Somewhere"}, hobbies: ["Bowling", "Weight Lifting"]}
12345 main st
```

![image](https://user-images.githubusercontent.com/42731246/214819454-4c5b4cdb-a4e4-45a9-be5a-16abd8d0b569.png)

</details>

---

##### What if we pass undefined instead of street

```js
class Person {
  constructor(name, address, hobbies) {
    this.name = name
    this.address = address
    this.hobbies = hobbies
  }

  print() {
    console.log(this)
  }
}

function printPersonStreet(person) {
  console.log(person.address.street)
}

// street is passed as undefined
const kyle = new Person("Kyle", undefined, ["Bowling", "Weight Lifting"])

kyle.print()

printPersonStreet(kyle)
```

![image](https://user-images.githubusercontent.com/42731246/214820745-35a20e96-b0e8-4c78-830e-85607af92965.png)

---

##### What if we pass undefined instead of kyle in the printPersonStreet function

```js
class Person {
  constructor(name, address, hobbies) {
    this.name = name
    this.address = address
    this.hobbies = hobbies
  }

  print() {
    console.log(this)
  }
}

function printPersonStreet(person) {
  console.log(person.address.street)
}

// street is passed as undefined
const kyle = new Person("Kyle", undefined, ["Bowling", "Weight Lifting"])

kyle.print()

printPersonStreet(undefined)
```

![image](https://user-images.githubusercontent.com/42731246/214905842-a67f26ee-8c7e-46f3-8213-88e452716400.png)

---

<details>
<summary>
Solution for above errors
</summary>

```js
console.log(person?.address?.street)
```

</details>

---

#### 4. Object Short-hand

- If key and value of the object shares the same name then you can provide only key

ex:

```js
const name = "Kyle",
const favoriteFood = "Rice"
const kyle = {name: name, favoriteFood:favoriteFood}

// U can write the above liner as below liner
const kyle = {name, favoriteFood}

```

![image](https://user-images.githubusercontent.com/42731246/214910321-43bcd8ee-7b47-4578-a300-dfba328c8d4f.png)

---

#### 5. Fastest way to load Javascript

- Notes already provided in a separate file
- Refer to the <strong>Fastest way to load JS.md</strong> file
