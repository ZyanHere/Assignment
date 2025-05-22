### Pangram Checker

**_A pangram is a sentence that contains every letter of the alphabet at least once (Ex: we need to write a function that verifies whether every letter of the English alphabet is present in the given string)_**

```js
function isPangram(string) {
  // Convert the string to lower case and remove non-alphabetic characters
  string = string.toLowerCase().replace(/[^a-z]/g, '');

  // Create a set from the string, which will automatically remove duplicates
  const uniqueChars = new Set(string);

  // A pangram must contain at least 26 unique letters
  return uniqueChars.size === 26;
}

// Example usage
console.log(isPangram('The quick brown fox jumps over the lazy dog')); // true
console.log(isPangram('Not a pangram')); // false
```
