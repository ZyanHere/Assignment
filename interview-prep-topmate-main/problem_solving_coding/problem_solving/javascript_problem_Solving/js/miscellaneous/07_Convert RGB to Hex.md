## Convert RGB to Hex

**Approach Taken**

1. core logic is : singleValue.toString(16)
2. if this converted singleValue.toString(16).length is ===1 then add '0' + convertedValue else return with convertedValue only
3. think in this way: One function rgbToHex(r,g,b), this function should return another re-usable function (ex: return '#'+ hexConversion(r) + hexConversion(g) + hexConversion(b))

```js
function componentToHex(c) {
  var hex = c.toString(16); //ex: ff or 63 or 47
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
    throw new Error('Invalid color component');
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Test the function with RGB color (255, 99, 71)
console.log(rgbToHex(255, 99, 71)); // Output: "#FF6347"
```
