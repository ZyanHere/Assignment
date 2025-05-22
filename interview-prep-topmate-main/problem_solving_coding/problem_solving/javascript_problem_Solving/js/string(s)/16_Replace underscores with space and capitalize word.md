## Replace underscores with space and capitalize word

```js
Input:
ui_dev_guide

output:
Ui Dev Guide

```

```js
function formatString(input) {
  return input
    .split('_') // Split the string by underscores.
    .map(
      (
        word // Capitalize the first letter of each word.
      ) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' '); // Join the words with spaces.
}

const input = 'ui_dev_guide';
const output = formatString(input);
console.log(output); // Outputs: "Ui Dev Guide"
```
