
### Composition Polyfill

**reduceRight**: 
- The reduceRight method in JavaScript is used to apply a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value


```js
// Define the individual functions
const addFive = (x) => x + 5;
const subtractTwo = (x) => x - 2;
const multiplyFour = (x) => x * 4;

// Compose function: Takes functions as arguments and returns a new function
function compose(...funcs) {
  return function (value) {
    return funcs.reduceRight((acc, func) => func(acc), value);
  };
}

// Create a composed function
const evaluate = compose(addFive, subtractTwo, multiplyFour);

// Usage
console.log(evaluate(5)); // When you call evaluate(5), it first applies multiplyFour, then subtractTwo, and finally addFive to the input value (5), resulting in the final computed value.

```