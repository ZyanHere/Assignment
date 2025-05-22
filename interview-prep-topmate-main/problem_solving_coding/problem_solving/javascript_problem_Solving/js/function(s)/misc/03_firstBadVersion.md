## First Bad version

1. First bad version means the first condition where our loop exits from iteration.
2. Maintain left and right variables
3. left will start from 1, and right will start from function invocation param (ex: 5)
4. Perform a while loop (left < right) and calculate mid.
5. if condition will be only true for greater than 4 and 5 (because of the condition we have intentionally written)

```js
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const firstBadVersion = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1;
    let right = n;
    // fails at 4 < 4
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      // if condition will be true for 4 or 5 in our case
      if (isBadVersion(mid)) {
        right = mid; // Mid might be the first bad version
      } else {
        left = mid + 1; // The first bad version must be after mid
      }
    }
    // After the loop, left should point to the first bad version
    // Check if the version pointed by left is bad
    if (isBadVersion(left)) {
      return left; // Return the first bad version
    }

    return -1; // If no bad version found, return -1
  };
};

// Example usage:
// Assuming we have a function isBadVersion defined somewhere
const isBadVersion = version => version >= 4;
const findFirstBadVersion = firstBadVersion(isBadVersion);
console.log(findFirstBadVersion(5)); // Should return 4

// Test case where no version is bad
const isBadVersionNone = version => false;
const findFirstBadVersionNone = firstBadVersion(isBadVersionNone);
console.log(findFirstBadVersionNone(5)); // Should return -1
```