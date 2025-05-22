## Array.forEach()

**Definition**: executes a provided function once for each array element

```js
//syntax:
forEach(callbackFn, thisArg);
```

<strong>Approach Taken:</strong>

1. basic for loop with array.length
2. check if iterationVariable exists in array
3. inside if callback.call(thisArg, arrayElement, iterationVar, array)

```js
Array.prototype.customForEach = function (callback, thisArg) {
  const array = this;

  if (array == null) {
    throw new TypeError(
      'Array.prototype.customForEach called on null or undefined'
    );
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      //calls the callback function with the element value, index, and the array itself as arguments. The thisArg parameter is used as the `this` value inside the callback if provided.
      callback.call(thisArg, array[i], i, array);
    }
  }
};

// Example usage
const arr = [1, 2, 3, 4, 5];
arr.customForEach((item) => {
  console.log(item);
});
```
