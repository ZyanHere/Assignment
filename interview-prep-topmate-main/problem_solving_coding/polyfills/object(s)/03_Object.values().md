### Object.values:

**Definition**: returns an array of a given object's own enumerable string-keyed property `values`.

<strong>Approach Taken:</strong>

1. for-in loop (ex: for key in passedParamObj)
2. checking if the key is of own Object (ex: Object.prototype.hasOwnProperty.call(passedParamObj, key))
3. maintain an array (ex: finalArray) and push the each iteration value inside the finalArray (ex: finalArray.push(passedParamObj[key]))
4. at the end of the for-in loop return finalArray

```js
if (!Object.customValues) {
  Object.customValues = function (obj) {
    if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) {
      throw new TypeError('Object.customValues called on non-object');
    }

    var values = [];
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        values.push(obj[prop]);
      }
    }
    return values;
  };
}

var obj = {
  a: 1,
  b: 2,
  c: 3,
};

var customValues = Object.customValues(obj);
console.log(customValues); // expected output: [1, 2, 3]
```
