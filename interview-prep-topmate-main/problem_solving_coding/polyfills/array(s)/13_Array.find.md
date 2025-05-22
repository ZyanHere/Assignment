## Array.find()

**Definition**: returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function then `undefined` is returned.

```js
//syntax:
find(callbackFn, thisArg);
```

<strong>Approach Taken:</strong>

1. basic for loop
2. as find returns the first element that satisfies the testing function, you can get the element using array[iterationVariable] inside for loop
3. if(callback.call(thisArg, arrayElement, iterationVar, array)) is true then return the element
4. outside the for loop return undefined.

```js
if (!Array.prototype.customFind) {
  Array.prototype.customFind = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        'Array.prototype.customFind called on null or undefined'
      );
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    // is used to convert the this value into an object.
    const array = Object(this);
    const length = array.length >>> 0;

    for (let i = 0; i < length; i++) {
      if (i in array) {
        const element = array[i];
        if (callback.call(thisArg, element, i, array)) {
          //This if statement checks if the callback function returns a truthy value for the current element. If it does, it means that the current element satisfies the testing function, and it should be returned as the found element.
          return element;
        }
      }
    }

    return undefined;
  };
}

// Example usage:
const array = [5, 12, 8, 130, 44];
const found = array.customFind((element) => element > 120);
console.log(found); // Output: 130
```
