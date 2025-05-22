## Find the first two numbers that sum up to 0

```js
// Example Input

findTwo([1, 2, 3, -1]);
// [0,3]

findTwo([1, 2, 3, -1, -2, 0]);
// [0,3] or [1,4] or [5, 5]

findTwo([1, 2, 3, 4]);
// null
```

**Approach Taken**

1. maintain a set
2. perform a basic for loop on the array
3. check if the set has negative numbers (ex: yourSet.has(-nums[i]))
4. if it is present then return[arrayParam.indexOf(-nums[i]) , iterationVariable]
5. if if condition is not true, outside to this simply keep on adding the nums[i] (ex: yourSet.add(nums[i]))
6. outside the for loop, return null

```js
function findTwo(nums) {
  // Create a set to store numbers
  let numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (numSet.has(-nums[i])) {
      // nums[i] is -1,-2,-3 inside the if condition, as it fails the if condition, numSet.add(nums[i]) is performed
      //nums[i] is -1 as per the iteration i=3, so -nums[i] at iteration 3 will be positive 3
      return [nums.indexOf(-nums[i]), i]; //`indexOf positive 3`, `indexOf iteration` will be the returned output
    }
    // Add the current number to the set
    numSet.add(nums[i]);
  }

  // If no such pair exists, return null
  return null;
}

// Test cases
console.log(findTwo([1, 2, 3, -1])); // [0,3]
console.log(findTwo([1, 2, 3, -1, -2, 0])); // [0,3] (it may vary based on which pair is found first)
console.log(findTwo([1, 2, 3, 4])); // null
console.log(findTwo([0, 1, 0, 4])); // [0, 2]
```
