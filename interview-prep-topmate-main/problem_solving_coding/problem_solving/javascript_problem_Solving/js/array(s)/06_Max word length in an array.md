## Max word length in an array

**Approach taken**:

1. when you loop using reduce (the first param is accumulator which is provided as 0 as default value, second param is your each item (ex: apple))
2. maxLength is the default 0 value, currentLength is the eachItemWord.length
3. return currentLength > maxLength ? currentLength: maxLength

```js
const words = ['apple', 'banana', 'cherry', 'dragonfruit', 'elderberry'];

const longestWordLength = words.reduce((maxLength, word) => {
  const currentLength = word.length;
  return currentLength > maxLength ? currentLength : maxLength;
}, 0);

console.log(longestWordLength); // Output: 11
```
