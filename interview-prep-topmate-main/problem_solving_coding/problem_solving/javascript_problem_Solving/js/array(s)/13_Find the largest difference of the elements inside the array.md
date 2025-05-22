## Find the largest difference

```js
largestDiff([-1, 2, 3, 10, 9]);
// 11,  obviously Math.abs(-1 - 10) is the largest

largestDiff([]);
// 0

largestDiff([1]);
// 0
```

**Approach Taken**

1. accept the arrayParam
2. get the max and min values from an array using for loop
3. return Math.abs(max-min)

```js
function largestDiff(nums) {
  if (nums.length <= 1) {
    return 0;
  }

  // Initialize max and min with the first element
  let max = nums[0];
  let min = nums[0];

  // Iterate through the array to find the max and min
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
    if (nums[i] < min) {
      min = nums[i];
    }
  }

  return Math.abs(max - min);
}

// Test cases
console.log(largestDiff([-1, 2, 3, 17, 9])); // 18
console.log(largestDiff([])); // 0
console.log(largestDiff([1])); // 0
```
