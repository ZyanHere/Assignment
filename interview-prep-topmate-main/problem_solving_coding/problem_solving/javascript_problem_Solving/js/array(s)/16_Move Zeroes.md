## Move Zeroes - move all 0's to the end of it while maintaining the relative order of the non-zero elements

**Approach Taken**

1. maintain a lastNonZeroFoundAt variable (default = 0)
2. basic for loop
3. create a temp variable, (ex: temp variable simply stores the non-zero value (ex; 1, or 2 or 3))
4. then your found index (ex: 2 is found at index 3, so nums[3] = nums[lastFoundIndex])
5. nums[lastFoundIndex] = temp
6. increment the lastFoundIndex

<u><b>Summary:</b></u>

- `lastNonZeroFoundAt` keeps track of where the next non-zero element should be placed.
- Each non-zero element is swapped with the element at lastNonZeroFoundAt.

```js
function moveZeroes(nums) {
  let lastNonZeroFoundAt = 0;

  // Move all the non-zero elements to the beginning of the array
  for (let i = 0; i < nums.length; i++) {
    //checking for the non-zero numbers in the array (ex: 1, 2, 3 are non-zeros here)
    if (nums[i] !== 0) {
      //temp will store the index of 1st non-zero here (ex: 1st non-zero is 1 at index 0, so temp = 1)
      let temp = nums[i];

      //based on top condition (ex: nums[0] = nums[0] i.e 1, so nums[0] will be mutated with 1)
      nums[i] = nums[lastNonZeroFoundAt];

      // nums[0] = 0
      nums[lastNonZeroFoundAt] = temp;

      //0++ will become 1 for next iteration
      lastNonZeroFoundAt++;
    }
  }
  return nums;
}

// Example usage
// Example usage
const nums = [1, 0, 0, 2, 3];
console.log(moveZeroes(nums)); // [1, 2, 3, 0, 0]
```
