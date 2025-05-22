### Find the first Duplicate in a string

**Approach Taken**

1. maintain an obj
2. for of loop on a string, you will get each and every character, if that character is found in the obj, return that char (ex: if(obj[char]) return char)
3. initially if condition doesn't get satisfied, that is why make obj[char] = true (that means inside the obj:{a: true, b: true, c: true})

```js
function firstDuplicate(str) {
  const obj = {};

  for (let char of str) {
    //initially obj is empty, so obj[0] is undefined, and this if condition doesn't get satisfied
    if (obj[char]) {
      return char;
    }
    //obj: {index1 is a: true, index2 is b: true, index3 is c: true, index4 is a, so obj[a] is true and if condition is true which return i (ex: a in our case)}
    obj[char] = true;
  }

  return null;
}

console.log(firstDuplicate('abca')); //a
```
