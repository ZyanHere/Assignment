## String Compression

**Approach Taken**

1. maintain count variable, and do the count++ inside the for loop
2. core logic is to check if the param[i] !== param[i+1], if both are not same then your output = output + param[i] + count (ex: ''+a+4)

```js
function stringCompression(str) {
  if (str.length == 0) {
    console.log('Please enter valid string.');
    return;
  }
  var output = '';
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    count++;
    if (str[i] != str[i + 1]) {
      //if a is not equal to b when str[i+1] is undefined or a new character itself (ex: b or c)
      output += str[i] + count; //a+4
      count = 0;
    }
  }
  return output;
}
console.log(stringCompression('')); //Please enter valid string.
console.log(stringCompression('aaaa')); //a4
console.log(stringCompression('aaaabbc')); //a4b2c1
console.log(stringCompression('aaaabbcaabb')); //a4b2c1a2b2
```
