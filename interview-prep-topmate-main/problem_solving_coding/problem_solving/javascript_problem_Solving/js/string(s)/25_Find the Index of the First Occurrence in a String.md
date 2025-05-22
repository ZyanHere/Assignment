### Find the Index of the First Occurrence in a String

- take the length of both of the params
- basic for loop with logic of i<= firstParamLength - secondParamLength
- core logic is : if(param1.substring(forLoopIndex, forLoopIndex + param2.length) === "param2Itself") then return the forLoopIndex
- return -1 (on outside the for loop)

```js
function strStr(inputStr, slicedStr) {
  if (slicedStr === '') return 0; // Edge case: empty needle

  const inputStrLength = inputStr.length;
  const slicedStrLength = slicedStr.length;

  for (let i = 0; i <= inputStrLength - slicedStrLength; i++) {
    if (inputStr.substring(i, i + slicedStrLength) === slicedStr) {
      return i;
    }
  }
  return -1;
}

// Example usage
console.log(strStr('sadbutsad', 'sad')); // Output: 0
console.log(strStr('butsad', 'sad')); // Output: 3
console.log(strStr('leetcode', 'leeto')); // Output: -1
```
