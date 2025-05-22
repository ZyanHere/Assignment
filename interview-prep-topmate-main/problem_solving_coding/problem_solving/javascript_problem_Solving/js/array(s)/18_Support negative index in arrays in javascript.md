```js
function getElement(arr, index) {
  return index < 0 ? arr[arr.length + index] : arr[index];
}

// Example usage
const myArray = [10, 20, 30, 40, 50];

console.log(getElement(myArray, -1)); // Outputs 50 (last element)
console.log(getElement(myArray, -2)); // Outputs 40 (second to last element)
```
