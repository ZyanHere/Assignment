### Lodash Difference

```js
// input example
difference([1,2,3], [2,3]);
=> [1]

difference([1,2,3,4], [2,3,1]);
=> [4]

difference([1,2,3], [2,3,1,4]);
=> []

difference([1, ,3], [1]);
=> [3]

```

```js
// Working code
function difference(array1, array2) {
  return array1.filter((item) => !array2.includes(item));
}

// Example usage
console.log(difference([1, 2, 3], [2, 3])); // [1]
console.log(difference([1, 2, 3, 4], [2, 3, 1])); // [4]
console.log(difference([1, 2, 3], [2, 3, 1, 4])); // []
console.log(difference([1, 2, 3], [1])); // [2, 3]
```
