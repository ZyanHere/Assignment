## Most Frequently occurring character in a string

**Approach Taken**

1. maintain an obj, maxCount variable (number), and a result array
2. for of loop on stringParam to get each and every character
3. check this character inside the obj.. Ex: `obj[eachAndEveryChar] = (obj[eachAndEveryChar]||0)+ 1`
4. if your charCount is more than maxCount then maxCount will hold that new value.
5. If both are having same value, we need to push both into result array.

```js
function mostRepeatedChar(inputStr) {
  let charCount = {};
  let maxCount = 0;
  let result = [];

  for (let char of inputStr) {
    charCount[char] = (charCount[char] || 0) + 1;

    if (charCount[char] > maxCount) {
      maxCount = charCount[char];
      result = [char];
    } else if (charCount[char] === maxCount) {
      result.push(char);
    }
  }
  return result;
}

console.log('most repeated char count', mostRepeatedChar('abcdeee'));
console.log('most repeated char count', mostRepeatedChar('abcccdeee'));
```
