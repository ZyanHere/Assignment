## Count the number of vowels in a given string

**Approach Taken**

1. Create a variable string containing all the vowels and create a variable string containing all the vowels (Ex: "aeiouAEIOU")
2. one for loop for str.length, another for loop inside the first for loop (2nd for loop is to vowels.length)
3. Core logic is: If the character is a vowel, increment a counter(ex: char[i] === vowel[j]) count++ and break

Here's the code for the above logic:

```javascript
let a = 'saiteja';
let vowels = 'aeiouAEIOU'; // considering both lowercase and uppercase vowels
let count = 0;

for (let i = 0; i < a.length; i++) {
  for (let j = 0; j < vowels.length; j++) {
    if (a[i] === vowels[j]) {
      count++;
      break;
    }
  }
}

console.log(count); // Outputs: 3
```

---

## Another trick question related to vowels

```js
function printUsedVowels(inputStr) {
  let vowels = 'aeiouAEIOU';
  let usedVowels = '';

  for (let i = 0; i < inputStr.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      // Below condition is true for a,e,i because these three are part of string saiteja
      if (inputStr[i] === vowels[j]) {
        // Check if the vowel is already identified (ex: ''.indexOf(indexOfaChar) is not present then usedVowels will store that char)
        if (usedVowels.indexOf(inputStr[i]) === -1) {
          usedVowels += inputStr[i];
        }
      }
    }
  }
  return `Used vowels are ${usedVowels} and their length is ${usedVowels.length}`;
}

console.log(printUsedVowels('saiteja')); //Used vowels are aie and their length is 3
```

##### Solution 2 Using Set and join

```js
let a = 'saiteja';
// Outputs: "aie"

function usedVowels(inputStr) {
  let vowels = new Set('aeiouAEIOU'); // {a, e, i, o, u ....}
  let resultSet = new Set();

  for (let char of inputStr) {
    if (vowels.has(char)) {
      resultSet.add(char);
    }
  }

  const usedVowelsStr = [...resultSet].join('');
  return `Used vowels are ${usedVowelsStr} and their length is ${usedVowelsStr.length}`;
}
console.log(usedVowels(a)); //Used vowels are aie and their length is 3
```
