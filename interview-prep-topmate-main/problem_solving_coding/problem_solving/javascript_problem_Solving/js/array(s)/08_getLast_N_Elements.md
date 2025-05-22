## Get Last N elements

**Approach Taken**

1. Math.max(0, array.length - n)
2. array.slice(aboveCondition) will return one number (ex: 6)
3. if array.slice(6) that means it will return the elements starting from index 6 to last (ex: index 6 over below is 7, so 7 to 11 is logged on console)

```js
function getLastNElements(array, n) {
  // Math.max(0, 11-5) is 6 that turns into array.slice(6) that turns into slicing from index 6 to last (ex: index 6 is 7, so 7 to 11 is logged on console)
  return n >= 0 ? array.slice(Math.max(0, array.length - n)) : [];
}

// Test
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
console.log(getLastNElements(myArray, 5)); // Output: [ 7, 8, 9, 10, 11]
```
