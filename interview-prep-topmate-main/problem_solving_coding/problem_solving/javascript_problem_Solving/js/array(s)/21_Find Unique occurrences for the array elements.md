### Unique occurrences for array of elements

**_Approach Taken:_**

- maintain **_occurrenceMap_**,
- do **_for of loop on arr_**, and **_each element/num will be set in occurrenceMap_** `(ex: occurrenceMap.set(num, (occurrenceMap.get(num) || 0) + 1))`
- maintain **_occurrenceSet_**
- **_for of loop on occurrenceMap.values()_** and **_each count has been checked inside the occurrenceSet_** `(ex: if(occurrenceSet.has(count))), then return false`
- outside the if condition + inside the for of loop, `perform occurrenceSet.add(count)` **(REMEMBER THIS!!)**
- return `true` (which says that nothing went false and everything seems unique)

```js
function uniqueOccurrences(arr) {
  const occurrenceMap = new Map();

  // Count occurrences of each number
  for (const num of arr) {
    occurrenceMap.set(num, (occurrenceMap.get(num) || 0) + 1);
  }

  const occurrenceSet = new Set();

  // Check if all occurrences are unique
  for (const count of occurrenceMap.values()) {
    if (occurrenceSet.has(count)) {
      return false;
    }
    occurrenceSet.add(count);
  }

  return true;
}

// Example usage
console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3])); // Output: true, because 1 --> 3 times, 2 --> 2 times, 3 ---> 1 time(s) which is unique
console.log(uniqueOccurrences([1, 2])); // Output: false, because 1 ---> 1 time(s), 2 ---> 1 time(s) which is not unique
console.log(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])); // Output: true
```
