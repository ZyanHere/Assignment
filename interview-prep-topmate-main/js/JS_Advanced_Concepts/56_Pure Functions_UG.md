#### Pure Functions are those functions that are deterministic in nature

<i>If you gonna pass same set of arguments, you would be expecting same set of outputs</i>

```js
function areaOfRectangle(length, width) {
  return length * width
}
console.log(areaOfRectangle(10, 20))
console.log(areaOfRectangle(10, 20))
```

---

#### Impure Function

<i>Same set of arguments are passed but we are not going to get same set of outputs</i>

```js
function test(length, width) {
  const temp = Math.floor(Math.random() * 10)
  return length * width * temp
}

console.log(test(10, 20))
console.log(test(10, 20))
```

<i>Real time scenario for Impure Function is a function that is calling a api (which is indeterministic)</i>

---

#### Question 1:

```js
let output = console.log("Hello World")
console.log("Output is" + output)
```

<details>
<summary>Solution</summary>

```js
- console.log is a function
- console.log as a function always returns undefined
- As it always returning undefined, it is a deterministic function (always returns same value)
- That is why console.log is a pure function
```

</details>

---

#### Question 2:

```js
function areaOfRectangle(length, breadth) {
  console.log(" Area is " + length * breadth)
  return length * breadth
}
areaOfRectangle(2, 4)
```

<details>
<summary>Solution</summary>

```js
- console.log is a function
- Adding console.log makes a function Impure (Side Effect)
- As it always returning undefined, it is a deterministic function (always returns same value)
- That is why console.log is a pure function
```

</details>

---

#### Question 3: (Array.filter method is pure or not)

```js
const words = ["spray", "destruction"]
const result = words.filter((word) => word.length > 6)
console.log(result)
```

<details>
<summary>Solution</summary>

```js
- pure function
- Since words.filter is not enclosed in any function (words.filter) is pure function.
```

</details>

---

#### Question 4:

```js
function uncommonGeek() {
  const words = ["spray", "destruction"]
  const result = words.filter((word) => word.length > 6)
  console.log(result) // Output will be ['destruction']
}
```

<details>
<summary>Solution</summary>

```js
- uncommonGeek is not a pure function
- Since words.filter is not enclosed in any function (words.filter) is pure function.
```

</details>

---

#### Question 5 : Why pure functions are essential

<details>
<summary>Solution</summary>

1. Deterministic
2. Memoization

```js
- Due to they are deterministic in nature they are very useful in the long run.
- As they are not going to change the outputs, it can be used at multiple places in your project.
- When we are calling something we will be checking if that value already exists in the memory or not

Ex: if we know that same values are passed everytime, then we rather store them instead of computing
```

</details>


-----

#### Few more 

- Functional Programming is built on pure functions logic.
- Pure Function is something that doesn't have a side effect and it's a fucntion that always returns the exact same thing every time you give it the same inputs so every single time you call this function with same input will always gonna give you the same output.
- A pure function only depends on its inputs

#### Example 1 (Not a Pure Function)

- This function relies on external information, it's affecting the things outside of the function because with the pure function a function is going to take in some inputs and it's only going to operate on those inputs in order to create the output

```js
const array = [1, 2, 3]

function addElementToArray(element) {
  array.push(element)
}
```

#### Example 2 (Not a Pure Function)

- This function has a side effect as it is changing the input here
- With a pure function you never want to change the inputs that you're adding into the element

```js
const array = [1, 2, 3]

function addElementToArray(a, element) {
  a.push(element)
}
```

#### Example 3 (A Pure Function)

```js
const array = [1, 2, 3]

function addElementToArray(a, element) {
  return [...a, element]
}
```

- No matter how many times we call the function, you can see it always going to return exact same thing

![image](https://user-images.githubusercontent.com/42731246/215322085-a5b899ff-1f32-4a25-8fbf-8ccd22ffa1eb.png)

#### Example 4 (Not a Pure Function)

- Even though it is using the same exact inputs it actually returns the different output each time
- With a pure function you never want to change the inputs that you're adding into the element
- So even though we are using only inputs we get and we're not affecting outside of our function since our function actually gives a different result every single time we call it with the same inputs it's no longer a pure function.
- It has to always return the same output every time you give it the same inputs

```js
const array = [1, 2, 3]

function addElementToArray(a, element) {
  return [...a, element, Math.random()]
}
```

![image](https://user-images.githubusercontent.com/42731246/215322247-aa76563f-491a-4d32-b74a-5a6e9d0ee316.png)
