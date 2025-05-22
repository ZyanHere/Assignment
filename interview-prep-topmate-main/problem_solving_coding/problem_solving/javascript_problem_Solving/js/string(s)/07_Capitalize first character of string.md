## Capitalize first word of the String

<strong>Approach Taken:</strong>

- Using regex pattern we can achieve this
- forwardSlash (/) says that it is starting or ending your code
- \b matches the position where a new word starts
- \w matches the first word character immediately after the word boundary
- g is a global flag, meaning the above pattern will be searched for throughout the entire string (not just the first occurrence).

```js
function captilizeFirstOccurrence(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

console.log(captilizeFirstOccurrence('hello world! this is a test string.')); //Hello World! This Is A Test String.
```
