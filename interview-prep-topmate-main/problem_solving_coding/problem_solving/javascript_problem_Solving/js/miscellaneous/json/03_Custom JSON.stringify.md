### JSON.stringify

```js
function stringify(data) {
  // re-use across checks for consistency
  const type = typeof data;
  
  // Handle primitive types
  if (type !== 'object' || data === null) {
    if (type === 'string') {
      return `"${data}"`;
    }
    if (type === 'number' || type === 'boolean') {
      if (data === Infinity || data === -Infinity || data !== data) {  // NaN check
        return 'null';
      }
      return String(data); // example output "42", "true"
    }
    if (type === 'bigint') {
      throw new Error('Do not know how to serialize a BigInt at JSON.stringify');
    }
    if (data === null || type === 'undefined') {
      return 'null';
    }
    if( type === 'symbol' || type === 'function'){
      return undefined;
    }
  }
  // Handle dates
  if (data instanceof Date) {
    return `"${data.toISOString()}"`;
  }
  // Handle arrays and objects
  const isArray = Array.isArray(data);
  const results = [];
  if (isArray) {
    for (const item of data) {
     // Handle Symbol in array - convert to "null"
      results.push(typeof item === 'symbol' ? 'null' : stringify(item));
    }
    // convert each item to a string and join with commas.
    // Example: stringify([1, "text", true]) returns "[1,"text",true]"
    return `[${results.join(',')}]`;
  } else {
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        results.push(`"${key}":${stringify(value)}`);
      }
    }
    // convert each key-value pair to a "key:value" string and join with commas.
    // Example: stringify({ a: 1, b: "text", c: false }) returns "{"a":1,"b":"text","c":false}"
    return `{${results.join(',')}}`;
  }
}
```