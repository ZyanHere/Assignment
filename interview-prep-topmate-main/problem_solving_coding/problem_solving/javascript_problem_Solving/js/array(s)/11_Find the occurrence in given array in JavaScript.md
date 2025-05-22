## Find the occurrence in given array in JavaScript

```js
Input:

[5,5,5,2,2,2,2,2,9,4]

Output:

{
  "2":5,
  "4":1,
  "5":3,
  "9":1,
}

```

```js
function countOccurrences(arr) {
  const occurrences = {};

  for (let num of arr) {
    if (!occurrences[num]) {
      occurrences[num] = 1; // If the number hasn't been counted yet, initialize it with 1
    } else {
      occurrences[num]++; // Otherwise, increment the count
    }
  }

  return occurrences;
}

const input = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
const output = countOccurrences(input);
console.log(output);
```
