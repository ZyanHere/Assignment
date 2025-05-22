## Supports ES6?

**Approach taken**:

- Simply write variable declarations like let foo = 0; const bar = 1;

```js
function isES6Supported() {
  try {
    // Test ES6 features
    new Function('let foo = 0; const bar = 1; () => {}; class Baz {}');
    return true;
  } catch (e) {
    return false;
  }
}

console.log(isES6Supported()); // Outputs true if ES6 is supported, false otherwise
```
