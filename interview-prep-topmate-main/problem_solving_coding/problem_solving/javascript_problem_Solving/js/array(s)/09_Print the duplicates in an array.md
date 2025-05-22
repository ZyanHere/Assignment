## Print the duplicates in an array

**Approach Taken**

1. maintain two new Set
2. if seen set has the item, add that item to duplicate set
3. else add that item to seen item
4. at the end we need to return duplicates in the **array fashion** (because it is set 😉😉)

```js
function toFindDuplicates(inputArr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of inputArr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return [...duplicates];
}
const newArray = [1, 2, 1, , 5, 3, 4, 3, 5];
const duplicateElements = toFindDuplicates(newArray); // [1, 3, 5]
console.log(duplicateElements);
```
