### Check if a given string is a valid JSON without using try/catch or external libraries

```js
function looksLikeJSON(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();

  const patterns = [
    { starts: '{', ends: '}' },
    { starts: '[', ends: ']' },
  ];

  if (
    !patterns.some(
      (pattern) =>
        trimmed.startsWith(pattern.starts) && trimmed.endsWith(pattern.ends)
    )
  ) {
    return false;
  }

  return true;
}

// Test
console.log(looksLikeJSON('{"name": "Alice"}')); // Should log true
console.log(looksLikeJSON('[1, 2, 3]')); // Should log true
console.log(looksLikeJSON('Just a regular string')); // Should log false
```
