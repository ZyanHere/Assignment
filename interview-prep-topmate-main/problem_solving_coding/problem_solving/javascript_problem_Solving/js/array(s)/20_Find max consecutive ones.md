### Find the maximum consecutive Ones

```js
function findMaxConsecutiveOnes(nums) {
  let maxCount = 0;
  let currentCount = 0;

  for (let num of nums) {
    if (num === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }

  return maxCount;
}

// Example usage
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // Output: 2
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 1, 1])); // Output: 4
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1])); // Output: 9
```
