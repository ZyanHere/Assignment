## Get the maximum occurring character in a string

<strong>Approach Taken:</strong>

- given the string param, do the `for of loop` and get each and every character and` check that char exists or not in that object`.
- if it exists `do the +1 `else it has a or condition with 0
- now do another for in loop (for keys) on the object that you have stored and `check that char in that object is greater than the maxCount` (by default it is zero)
- if it is greater then maxCount will be the that value
- and maxChar is that char which you are traversing
- at last return the object with maxCount and maxChar

```js
function getMaxOccurringCharWithCount(str) {
  let maxCount = 0;
  let maxChar = '';
  const charCountMap = {};

  for (let char of str) {
    charCountMap[char] = (charCountMap[char] || 0) + 1;
  }

  for (let char in charCountMap) {
    if (charCountMap[char] > maxCount) {
      maxCount = charCountMap[char];
      maxChar = char;
    }
  }

  return {
    maxChar,
    maxCount,
  };
}

const output = getMaxOccurringCharWithCount('saiteja');
console.log('output', output); // { "maxChar": "a","maxCount": 2}
```
