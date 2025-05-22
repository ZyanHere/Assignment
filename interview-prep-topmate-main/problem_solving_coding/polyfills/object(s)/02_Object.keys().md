### Object.keys:

**Definition:** returns an array of a given object's own enumerable string-keyed property `keys`

```js
//Syntax:
Object.keys(obj);
```

<strong>Approach Taken:</strong>

1. for-in loop (ex: for key in passedParamObj)
2. checking if the key is of own Object (ex: Object.prototype.hasOwnProperty.call(passedParamObj, key))
3. maintain an array (ex: finalArray) and push the each iteration key inside the finalArray (ex: finalArray.push(key))
4. at the end of the for-in loop return finalArray

```js
if (!Object.customKeys) {
  Object.customKeys = function (obj) {
    if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) {
      throw new TypeError('Object.customKeys called on non-object');
    }

    var keys = [];
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        keys.push(prop);
      }
    }
    return keys;
  };
}

var obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 'apple',
};

var keys = Object.customKeys(obj);
console.log(keys); // expected output: ['a', 'b', 'c']
```
