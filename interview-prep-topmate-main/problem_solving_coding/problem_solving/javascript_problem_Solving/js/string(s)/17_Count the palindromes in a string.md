## Count the palindromes in a string
```js
function countPalindromes(inputStr) {
  let inputArr = inputStr.split(' '); //ex: ['madam', 'racecar'...]
  let palindromeCount = 0;

  inputArr.forEach((element) => {
    if (isPalindromeFunc(element)) {
      palindromeCount++;
    }
  });

  return palindromeCount; //ex: 6
}

function isPalindromeFunc(element) {
  const length = element.length; //ex: 'madam'.length = 5
  // i=0 to i<2
  for (let i = 0; i < length / 2; i++) {
    if (element[i] !== element[length - 1 - i]) {
      return false;
    }
  }
  return true;
}

// Example usage
const exampleString = 'madam racecar apple kayak level nayan malayalam';
console.log(countPalindromes(exampleString)); // Output: 6

```
