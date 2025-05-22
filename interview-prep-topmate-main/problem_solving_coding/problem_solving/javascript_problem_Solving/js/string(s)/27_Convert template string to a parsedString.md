## i) Convert given templatestring to a parsedString

### Example input:

```js
"my name is {{name}}", "{"name":"John"}"
```

### Expected output:

```js
'my name is John';
```

### PS: the second input is in string format, we need to convert to Object reference before working on it

---

```js
// ACTUAL CODE STARTS
function parseTemplateString(templateString, dataString) {
  // Parse the data string to an object
  let data;
  try {
    data = JSON.parse(dataString);
  } catch (error) {
    throw new Error('Invalid JSON string provided');
  }

  // Replace the placeholders with actual values
  return templateString.replace(/{{(\w+)}}/g, (match, key) => {
    if (data.hasOwnProperty(key)) {
      return data[key];
    }
    // Return the original placeholder if the key is not found in the data object
    return match;
  });
}

// Example usage
const templateString = "my name is {{name}}";
const dataString = '{"name":"Saiteja"}';

try {
  const result = parseTemplateString(templateString, dataString);
  console.log(result); // Output: 'my name is Saiteja'
} catch (error) {
  console.error(error.message);
}
```

### Explanation:

- **`/{{(\w+)}}/g`** is the regular expression used to find placeholders in the template string.
- **`{{ and }}`** are the literal characters that define the **`start`** and **`end`** of a placeholder.
- **`(\w+)`** is a capturing group that **matches** **`one`** or **`more`** word characters (letters, digits, or underscores). This group captures the key inside the placeholder.
- The **`g`** flag indicates a global search, meaning the regular expression will find all matches in the template string, not just the first one.