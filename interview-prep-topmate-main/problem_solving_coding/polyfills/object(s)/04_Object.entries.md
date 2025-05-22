### Object.entries

**Definition**: returns an array of a given object's own enumerable string-keyed property `key-value pairs`.

<strong>Approach Taken:</strong>

1. for-in loop (ex: for key in passedParamObj)
2. checking if the key is of own Object (ex: Object.prototype.hasOwnProperty.call(passedParamObj, key))
3. maintain an array (ex: finalArray) and push the each iteration value inside the finalArray (ex: finalArray.push([key, passedParamObj[key]]))
4. at the end of the for-in loop return finalArray
5. Note: we are pushing an array which has key, value (ex: finalArray.push([key, value]))

```js
if (!Object.customEntries) {
  Object.customEntries = function (obj) {
    if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) {
      throw new TypeError('Object.customEntries called on non-object');
    }

    var entries = [];
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        entries.push([prop, obj[prop]]);
      }
    }
    return entries;
  };
}

var obj = {
  a: 1,
  b: 2,
  c: 3,
};

var customEntries = Object.customEntries(obj);
console.log(customEntries); // expected output: [["a", 1], ["b", 2], ["c", 3]]
```
