### Composition:

- Is the idea that any sort of data transformation that we do should be obvious.
- We have **_data that gets processed by a function_** that outputs some sort of data, **_and that data gets processed by another function_** that outputs that data in a new form and so on and so forth.

```js
data that gets processed ---> Into one fn ---> outputs some data ---> data gets processed into Function 2 fn ---> which outputs some data
```

- In the below example, it first processes g(data) and then outputs some sort of data, and this data is processed by f(output) and this outputs some data
```js
const compose = (f, g) => (data) => f(g(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);

multiplyBy3AndAbsolute(-50);
```

---

### Pipe

- Instead of going right to left, it goes left to right

```js
const compose = (f, g) => (data) => f(g(data));
const pipe = (f, g) => (data) => g(f(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = pipe(multiplyBy3, makePositive); // makePositive runs last because after f(data), g will be invoked

multiplyBy3AndAbsolute(-50);
```

### Example

```js
fn1(fn2(fn3(50)));
compose(fn1, fn2, fn3)(50);
pipe(fn3, fn2, fn1)(50);
```

----------

### arity

- means the number of arguments that a function takes

----


