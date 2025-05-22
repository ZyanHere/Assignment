## Array.at()

**Definition**: takes an integer value and returns the item at that index, allowing for both positive and negative integers. Negative integers count back from the last item in the array.

```js
//syntax:
at(index);
```

<strong>Approach Taken:</strong>

1. index is passed as part of the param, if it is negative then index = this.length + index
2. similarly if index is still negative or index >= this.length (simply return undefined)
3. `core logic is :` return this[index]

```js
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    // If index is negative, calculate positive index from the end
    if (index < 0) {
      index = this.length + index;
    }

    // Return undefined for out of range indices
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    // Return the item at the computed index
    return this[index];
  };
}

// Tests
const fruits = ['apple', 'banana', 'cherry', 'date'];
console.log(fruits.at(1)); // "banana"
console.log(fruits.at(-2)); // "cherry"
console.log(fruits.at(4)); // undefined
console.log(fruits.at(-5)); // undefined
```