## Array.sort()

```js
Array.prototype.customSort = function (compareFunction) {
  // This checks if a compareFunction is provided and if it is of type 'function'
  if (typeof compareFunction !== 'function') {
    // numbers.customSort(), strings.customSort({}) are the few examples for compareFunction!=='function'
    compareFunction = (a, b) => {
      if (a === b) return 0;
      return a < b ? -1 : 1;
    };
  }

  const merge = (left, right) => {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      const comparison = compareFunction(left[indexLeft], right[indexRight]);

      if (comparison <= 0) {
        // If the result is less than or equal to 0, it means the left element should come first,
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        //otherwise, the right element should come first.
        result.push(right[indexRight]);
        indexRight++;
      }
    }

    //result is the array where the sorted elements will be pushed.
    // These lines add any remaining elements to the result array.
    return result.concat(left.slice(indexLeft), right.slice(indexRight));
  };

  //This recursive function sorts an array.
  const mergeSort = (array) => {
    // If the array has one or zero elements, it just returns the array because it is already sorted.
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  };

  const sortedArray = mergeSort(this);
  for (let i = 0; i < this.length; i++) {
    //The sorted elements are then copied from sortedArray back to the original array.
    this[i] = sortedArray[i];
  }

  //Finally, the sorted array is returned.
  return this;
};

// Usage
let numbers = [5, 3, 8, 1, 2];
numbers.customSort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 5, 8]

let strings = ['banana', 'apple', 'orange', 'grapes'];
strings.customSort();
console.log(strings); // ['apple', 'banana', 'grapes', 'orange']
```
