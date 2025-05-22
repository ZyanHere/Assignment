### This was another tech round concentrating on React and JS both and it lasted for 30-45m

- Pseudo classes
- Div > p
- Flex vs grid
- URL vs URI
- REST vs SOAP
- Redux stages
- Async calls in functional based and class based(componentDidUpdate, useEffect hook)
- Fetch and axios
- Modules pattern
- Best practices while coding
- [1,2,3] + [2,3,4] = [1,2,32,3,4]
- Empty an array and tried delete keyword
- Array.slice
- Null vs undefined and typeof null is object and type of undefined is undefined

---

## SOLID principles

While the SOLID principles were originally formulated in the context of object-oriented programming, many of the underlying concepts can be applied to functional programming (FP) as well.

<b>1. Single Responsibility Principle (SRP):</b> Pure functions, a core concept in FP, inherently follow SRP because they take input and produce output without side effects.

```js
// Good
const add = (a, b) => a + b
const square = (x) => x * x
```

<b>2. Open/Closed Principle (OCP) :</b> In FP, functions can be open for extension by using higher-order functions, which take functions as arguments or return them. You can extend functionalities without modifying existing functions.

```js
const multiply = (factor) => (number) => number * factor
const double = multiply(2)
```

<b>3. Liskov Substitution Principle (LSP):</b> In FP, if a function expects a certain kind of function as an argument, any function that matches the expected signature should be able to replace it without issues.

```js
const execute = (fn, value) => fn(value)

const increment = (x) => x + 1
const decrement = (x) => x - 1

execute(increment, 5) // 6
execute(decrement, 5) // 4
```

<b>4. Interface Segregation Principle (ISP):</b> In FP, you can think of this in terms of function signatures. Don't force a function to accept more parameters than it needs. Use currying and partial application to create simpler function interfaces.

```js
// Instead of:
const drawCircle = (x, y, color, radius) => {
  /*...*/
}

// Use:
const drawCircle = (x, y) => (color) => (radius) => {
  /*...*/
}
```

<b>5. Dependency Inversion Principle (DIP):</b> In FP, rather than depending on specific concrete implementations, functions should depend on other functions passed as arguments (higher-order functions).

```js
const fetchData = (fetchImplementation, url) => fetchImplementation(url)

// Using the native fetch:
fetchData(fetch, 'https://api.example.com/data')

// Using a mock fetch for testing:
const mockFetch = (url) => Promise.resolve({ data: 'mockData' })
fetchData(mockFetch, 'https://api.example.com/data')
```

---

- Callback hell and solution
- Put vs post
- jwt

### Had HR round after this

### Final verdict: Selected
