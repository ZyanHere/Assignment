## Array.indexOf()

**Definition**: returns the first index at which a given element can be found in the array, or **`-1`** if it is not present

```js
//syntax:
indexOf(searchElement, fromIndex);
```

<strong>Approach Taken:</strong>

1. takes two params, one is the element you want to search and one is if index is provided to check the element at specific index
2. usually return -1, when array.length is 0, if index is provided greater than the array.length itself or when you were not able to search the element throughout the array
3. if index is greater than 0, then no worries we can just take that into consideration otherwise you have to perform array.length - Math.abs(index) and whole thing should be wrapped under Math.max
4. perform a while loop (index < length) and if this[index] === searchElement, return the index and increment the index..
5. outside the while loop return -1
6. Note: index++ should be inside the while loop (but outside the if condition)

```js
Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  //this means array here
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }
  const length = Math.max(0, this.length); // Ex: array.length

  //extra check to validate if the array is empty
  if (length === 0) {
    return -1;
  }

  //if 2nd arg is provided then fromIndex will be considered as index otherwise 0 is the index every time
  let index = fromIndex | 0;

  //if the index you want to search is more than the length of the array then return -1
  if (index >= length) {
    return -1;
  }

  // if the second arg is negative then we are subtracting array length - (Math.abs(index), 0) Ex: 3 - Math.abs(-1), 0 which results 2
  index = Math.max(index >= 0 ? index : length - Math.abs(index), 0);

  while (index < length) {
    // this is the array and we are searching for index
    if (this[index] === searchElement) {
      return index; //finally it returns index
    }
    index++;
  }
  // return -1 if the searchElement is not found as part of the array provided
  return -1;
};

// Test cases
const array = [2, 9, 9];
console.log(array.myIndexOf(2)); // Expected output: 0
console.log(array.myIndexOf(7)); // Expected output: -1
console.log(array.myIndexOf(9, 2)); // Expected output: 2
console.log(array.myIndexOf(2, -1)); // Expected output: -1
console.log(array.myIndexOf(2, -3)); // Expected output: 0
```
