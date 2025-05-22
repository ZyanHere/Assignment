## Array.fill()

**Definition**: changes all elements within a range of indices in an array to a static value. It returns the modified array.

```js
//syntax:
fill(value, start, end);
```

<strong>Approach Taken:</strong>

1. provide default values for the params (ex: start = 0, end = this.length)
2. if start is less than 0, then `start = this.length + start`
3. if it is still less than 0 then return 0 or start (using ternary)
4. if end is less than 0, then same logic `this.length + end`
5. perform a basic for loop (in a  little different way)
Ex: instead of i=0 it is i=start, and add i<end && i<this.length
6. core logic is : arrayElement = param1 (ex: this[i] = value)

```js
if (!Array.prototype.customFill) {
  Array.prototype.customFill = function (value, start = 0, end = this.length) {
    // Handle negative indices
    if (start < 0) {
      start = this.length + start;
      start = start < 0 ? 0 : start; // Handle case where start is still negative
    }

    if (end < 0) {
      end = this.length + end;
    }

    // customFill the array with the given value from start to end index
    for (let i = start; i < end && i < this.length; i++) {
      this[i] = value;
    }

    return this;
  };
}

console.log([1, 2, 3].customFill(4)); // [4, 4, 4]
console.log([1, 2, 3].customFill(4, 1)); // [1, 4, 4]
console.log([1, 2, 3].customFill(4, 1, 2)); // [1, 4, 3]
console.log([1, 2, 3].customFill(4, 1, 1)); // [1, 2, 3]
console.log([1, 2, 3].customFill(4, 3, 3)); // [1, 2, 3]
console.log([1, 2, 3].customFill(4, -3, -2)); // [4, 2, 3]
console.log([1, 2, 3].customFill(4, NaN, NaN)); // [1, 2, 3]
console.log([1, 2, 3].customFill(4, 3, 5)); // [1, 2, 3]
```
