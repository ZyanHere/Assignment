## Flatten the array based on depth

**Approach Taken**:

1. function accepting nested Array with depth as default value **`1`**
2. maintaining a result array 
3. perform **`forEach`** on **`nestedArray`**, and each item should be checked with **Array.isArray and depth > 0**
4. If yes, then result.push with recursion technique and decrement the depth
5. else result.push(arrItem)


```js
// params are (nestedArray, depth = 1)
function flat(arr, depth = 1) {
  // maintain a result array to return
  let result = [];

  //perform forEach on your nestedArray
  arr.forEach((item) => {
    //if your item itself satisfies the array condition && depth > 0
    if (Array.isArray(item) && depth > 0) {
      // use recursion and core logic is (decrement the depth)
      result.push(...flat(item, depth - 1));
    } else {
      //else mean your nestedArray `item` is not an array (ex: 1)
      //else just push the item
      result.push(item);
    }
  });
  return result;
}

const arr = [1, [2], [3, [4, [5]]]];

console.log(flat(arr));
// [1, 2, 3, [4, [5]]]

console.log(flat(arr, 1));
// [1, 2, 3, [4, [5]]]

console.log(flat(arr, 2));
// [1, 2, 3, 4, [5]]

console.log(flat(arr, 3));
// [1, 2, 3, 4, 5]
```

