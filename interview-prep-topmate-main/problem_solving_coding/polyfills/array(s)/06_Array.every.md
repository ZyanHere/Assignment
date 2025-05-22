## Array.prototype.every

**Definition**: whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

**Approach Taken**:

1. Object(this) is array and so as its length (ex: var len = array.length)
2. basic for loop with the help of arrayLength
3. if condition has the following, if the iterationVariable (Ex: for(var i=0)) of the for loop is in the array && !callback.call(thisArg, arrayElement, iterationVariable, originalArrayItself) (ex: thisArg, arr[i], i, arr )
4. So if both are true then return false else outside the for loop return true. (ex: check from negative point of view, if at least one element is not in array then return false).
5. you can achieve this 4th point with the help of (!callback.call(thisArg, arr[i], i , arr))

```js
if (!Array.prototype.customEvery) {
  Array.prototype.customEvery = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        'Array.prototype.customEvery called on null or undefined'
      );
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    var array = Object(this); // Ex: ["apple", "banana", "mango", "orange"]
    var len = Math.floor(Math.abs(array?.length)); // to make sure the length is positive and rounded instead of decimals

    for (var i = 0; i < len; i++) {
      // if the mango fruit index(i) is not in array, return false and exit
      if (i in array && !callback.call(thisArg, array[i], i, array)) {
        return false;
      }
    }

    return true;
  };
}

// Example:
var fruits = ['mango', 'mango', 'mango', 'mango'];

var containsMango = fruits.customEvery(function (fruit) {
  return fruit === 'mango';
});

console.log(containsMango); // Should log `true` because "mango" is in the array
```
