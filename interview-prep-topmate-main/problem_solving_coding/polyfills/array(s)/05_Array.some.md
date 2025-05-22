## Array.prototype.some:

<strong>Approach Taken:</strong>

**Definition**: at least one element in the array passes the test. Ex: returns true in the array if it finds an element for which the provided function returns true.

**Approach Taken**:

1. Object(this) is array and so as its length (ex: var len = array.length)
2. basic for loop with the help of arrayLength
3. if condition has the following, if the iterationVariable (Ex: for(var i=0)) of the for loop is in the array && callback.call(thisArg, arrayElement, iterationVariable, originalArrayItself) (ex: thisArg, arr[i], i, arr )
4. So if both are true then return true else outside the for loop return false.

```js
if (!Array.prototype.customSome) {
  Array.prototype.customSome = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        'Array.prototype.customSome called on null or undefined'
      );
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    var array = Object(this); // Ex: ["apple", "banana", "mango", "orange"]
    var len = Math.floor(Math.abs(array?.length)); // to make sure the length is positive and rounded instead of decimals

    for (var i = 0; i < len; i++) {
      // if the mango fruit index(i) is in array, return true
      if (i in array && callback.call(thisArg, array[i], i, array)) {
        return true;
      }
    }

    return false;
  };
}

// Example:
var fruits = ['apple', 'banana', 'mango', 'orange'];

var containsMango = fruits.customSome(function (fruit) {
  return fruit === 'mango';
});

console.log(containsMango); // Should log `true` because "mango" is in the array
```
