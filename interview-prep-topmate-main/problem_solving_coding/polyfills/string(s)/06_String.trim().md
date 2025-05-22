## String.prototype.trim()

**Definition**: removes whitespace from both ends of this string and returns a new string, without modifying the original string.

```js
//syntax:
trim();
```

<strong>Approach Taken:</strong>

1. this.replace is nothing but "StringYouWantToTrim".replace(regexExpression)

2. Regular Expression **(/^\s+|\s+$/g)**

- **^:** This denotes the start of the string.
- **\s+:** \s matches any whitespace character (like spaces, tabs, newlines). The + sign means "one or more", so `\s+ matches one or more consecutive whitespace characters`.
- **|:** This is the logical OR operator in regular expressions. It separates different parts of the regex, allowing for multiple patterns to be matched.
- **\s+dollarSymbol:** Similar to the first part, but `dollar denotes the end of the string`. So \s+$ matches one or more consecutive whitespace characters at the end of the string.
- **g:** This is a flag that stands for "global". It allows the regex to match all occurrences in the string, not just the first one.

- The second argument in the .replace() method is an empty string ''. This means that every match found by the regex will be `replaced with an empty string`, effectively removing it.

```js
String.prototype.customTrim = function () {
  return this.replace(/^\s+|\s+$/g, '');
};

// Example usage:
const myString = '   Hello, world!   ';
const trimmedString = myString.customTrim();

console.log(trimmedString); // Output: "Hello, world!"
```
