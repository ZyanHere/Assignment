## HEX to RGBA Conversion

1. if the length is 3, double the chars (split each and every and map it and join)
2. core logic is parseInt(passedHex.substring(0,2), 16) for r, similarly 2,4 is for g, 4, 6 is for b

```js
function hexToRgba(hex, alpha = 1) {
  let cleanHex = hex.charAt(0) === '#' ? hex.slice(1) : hex;

  //if the length of the HEX value is 3, then we need to double it (Ex: 03F to 0033FF)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

 //Error condition
  if (cleanHex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  // core logic is yourPassedHex.substring(0,2) and wrapping this whole in parseInt (Ex: parseInt(passedHex.substring(0,2), 16))
  const rgbaConversion = (a, b) => {
    return parseInt(cleanHex.substring(a, b), 16);
  };

  const r = rgbaConversion(0, 2);
  const g = rgbaConversion(2, 4);
  const b = rgbaConversion(4, 6);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

console.log(hexToRgba('#03F', 0.5)); // Outputs: "rgba(0, 51, 255, 0.5)"
console.log(hexToRgba('#0033FF', 0.5)); // Outputs: "rgba(0, 51, 255, 0.5)"
console.log(hexToRgba('#FF6347', 0.5)); // Outputs "rgba(255, 99, 71, 0.5)"
```
