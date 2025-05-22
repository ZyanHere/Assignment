## Array.pop()

**Definition**: removes the last element from an array and returns that element. Note that this method changes the length of the array.

```js
//syntax:
pop();
```

<strong>Approach Taken:</strong>

1. get the last element of the array (ex: this[this.length - 1])
2. mutate the array length to -1 (ex: this.length = this.length-1)
3. return the lastElement

```js
if (!Array.prototype.customPop) {
  Array.prototype.customPop = function () {
    // Handle the case where the array is empty
    if (this.length === 0) {
      return undefined;
    }

    // Get the last element of the array
    const removedElement = this[this.length - 1];

    // Decrease the array length by 1, thereby removing the last element
    this.length = this.length - 1;

    // Return the removed element
    return removedElement;
  };
}

// Test
const numbers = [1, 2, 3, 4, 5];
const poppedValue = numbers.customPop();
console.log(poppedValue); // Outputs: 5
console.log(numbers); // Outputs: [1, 2, 3, 4]
```
