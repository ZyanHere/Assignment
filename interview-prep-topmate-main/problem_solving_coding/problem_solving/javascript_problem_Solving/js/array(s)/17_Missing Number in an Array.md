## Missing Number in an Array

**Approach Taken**

1. basic for loop
2. sum = sum + array[i]
3. core logic is outside the for loop: `return (array.length x (array.length + 1))/2 - sum` (ex: (9x10)/2 - sum)

```js
let missingNumber = function (nums) {
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
  }
  return (nums.length * (nums.length + 1)) / 2 - sum
}

// One Line Solution:
let missingNumber = (inputArr) =>
  (inputArr.length * (inputArr.length + 1)) / 2 -
  inputArr.reduce((acc, currentValue) => acc + currentValue);

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
```
