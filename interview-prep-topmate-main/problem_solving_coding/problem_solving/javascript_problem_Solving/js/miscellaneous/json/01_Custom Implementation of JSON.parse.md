### JSON.Parse Polyfill

```js
function parse(str) {
  if (str === '') throw Error('Invalid JSON format');

  // Validate and delegate to appropriate parse function
  if (isPrimitive(str)) return parsePrimitive(str);
  if (isString(str)) return parseString(str);
  if (isArray(str)) return parseArray(str);
  if (isObject(str)) return parseObject(str);

  throw Error('Invalid JSON format');
}

// Helper function to parse primitive values
function parsePrimitive(str) {
  if (str === 'null') return null;
  if (str === 'true') return true;
  if (str === 'false') return false;
  if (!isNaN(str)) return Number(str); // Check for valid number
  throw Error('Invalid JSON format');
}

// Helper function to parse JSON strings
function parseString(str) {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1);
  }
  throw Error('Invalid JSON format: Expected string in double quotes');
}

// Helper function to parse JSON arrays, with validation for trailing commas
function parseArray(str) {
  if (str === '[]') return []; // Empty array case

  const result = [];
  let value = '';
  let depth = 0;
  let inString = false;

  // Validate trailing comma
  if (str[str.length - 2] === ',')
    throw Error('Invalid JSON format: Trailing comma in array');

  for (let i = 1; i < str.length - 1; i++) {
    const char = str[i];

    if (char === '"') inString = !inString;

    if (!inString) {
      if (char === '[' || char === '{') depth++;
      if (char === ']' || char === '}') depth--;

      if (char === ',' && depth === 0) {
        result.push(parse(value.trim()));
        value = '';
        continue;
      }
    }

    value += char;
  }

  // Push last element, if present
  if (value.trim() !== '') result.push(parse(value.trim()));

  return result;
}

// Helper function to parse JSON objects, with validation for trailing commas
function parseObject(str) {
  if (str === '{}') return {}; // Empty object case

  const result = {};
  let key = '';
  let value = '';
  let isParsingKey = true;
  let depth = 0;
  let inString = false;

  // Validate trailing comma
  if (str[str.length - 2] === ',')
    throw Error('Invalid JSON format: Trailing comma in object');

  for (let i = 1; i < str.length - 1; i++) {
    const char = str[i];

    if (char === '"') inString = !inString;

    if (!inString) {
      if (char === '{' || char === '[') depth++;
      if (char === '}' || char === ']') depth--;

      if (char === ':' && depth === 0) {
        isParsingKey = false;
        continue;
      }

      if (char === ',' && depth === 0) {
        result[parse(key.trim())] = parse(value.trim());
        key = '';
        value = '';
        isParsingKey = true;
        continue;
      }
    }

    if (isParsingKey) {
      key += char;
    } else {
      value += char;
    }
  }

  // Handle last key-value pair
  if (key) result[parse(key.trim())] = parse(value.trim());

  return result;
}

// Utility function to check if the string is a JSON primitive (null, true, false, or a number)
function isPrimitive(str) {
  return str === 'null' || str === 'true' || str === 'false' || !isNaN(str);
}

// Utility function to check if the string is a JSON string (wrapped in double quotes)
function isString(str) {
  return str[0] === '"' && str[str.length - 1] === '"';
}

// Utility function to check if the string is a JSON array (wrapped in square brackets)
function isArray(str) {
  return str[0] === '[' && str[str.length - 1] === ']';
}

// Utility function to check if the string is a JSON object (wrapped in curly braces)
function isObject(str) {
  return str[0] === '{' && str[str.length - 1] === '}';
}

console.log(parse('[{"a":{"b":{"c":[1],"d":"BFE,dev"}}},null,"str"]')); 

// [ { a: { b: { c: [ 1 ], d: 'BFE,dev' } } }, null, 'str' ]
```
