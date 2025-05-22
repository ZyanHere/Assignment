### Longest substring with unique characters

***Approach Taken***:
- maintain a ***maxLength*** variable
- maintain a ***currentStr*** variable
- maintain a ***charIndex*** object
- simply do ***basic for loop on your string***, (ex: i<str.length)
- grab each and every char (ex: str[i])
- ***check if this char is already in charIndex object***, if yes mutate the currentStr (ex: currentStr = currentStr.substring(current.indexOf(char) + 1))
- else, ***currentStr = currentStr + char***
- charIndex[char] = i (ex: charIndex is an object which simply stores the index of each char)
- ***core logic is maxLength = Math.max(maxLength, currentStr.length)***
- return maxLength

```js
function longestUniqueSubstr(s) {
  let maxLength = 0; // To store the length of the longest unique substring
  let currentStr = ''; // To store the current substring with unique characters
  let charIndexMap = {}; // To store the last index of each character encountered

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // If the character is already in the current string, move the start of the string
    if (char in charIndexMap) {
      // Update the start of the current string to be the next character after the duplicate
      currentStr = currentStr.substring(currentStr.indexOf(char) + 1);
    }

    // Add the current character to the string and update its index in the map
    currentStr += char;
    charIndexMap[char] = i;

    // Update the max length if the current string is longer
    maxLength = Math.max(maxLength, currentStr.length);
  }

  return maxLength;
}

// Example usage
console.log(longestUniqueSubstr('abcabcbb')); // Output: 3 ("abc")
console.log(longestUniqueSubstr('bbbbb')); // Output: 1 ("b")
console.log(longestUniqueSubstr('pwwkew')); // Output: 3 ("wke")
```
