### Roman to Integer conversion

- basic for loop on s.length (ex: 'IV'.length)
- simply maintain s[i] as current variable, s[i+1] as next variable and a result variable (of string type)
- if(current < next), result = result - current
- else, result = result + current
- return result

```js
function romanToInt(s) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const current = romanMap[s[i]];
    const next = romanMap[s[i + 1]];

    if (current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

// Example usage
console.log(romanToInt('III')); // Output: 3
console.log(romanToInt('IV')); // Output: 4
console.log(romanToInt('IX')); // Output: 9
console.log(romanToInt('LVIII')); // Output: 58
console.log(romanToInt('MCMXCIV')); // Output: 1994
```
