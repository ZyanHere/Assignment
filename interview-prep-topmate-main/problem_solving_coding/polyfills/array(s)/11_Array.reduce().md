## Array.reduce()

**Definition**: is to return the all the elements in an array as a single value.

```js
//syntax:
reduce(callbackFn, initialValue);
```

<strong>Approach Taken:</strong>

1. declare accumulator variable with the initialValue
2. this initialValue can be undefined or any provided value
3. So in the basic for loop, check if(accumulator) then callback.call(undefined, arraySpecificElement, iterationVariable, array)
4. else accumulator = arraySpecificElement
5. return the accumulator at the end of for loop

```js
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (callback, initialValue) {
    // Variable that accumulates the result
    // after performing operation one-by-one
    // on the array elements
    let accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
      // If the initialValue exists, we call
      // the callback function on the existing
      // element and store in accumulator
      if (accumulator) {
        //first argument in call sets the this context for the callback function. undefined says that it is referred to window in non-strict mode or undefined in strict mode
        accumulator = callback.call(undefined, accumulator, this[i], i, this);

        // If initialValue does not exist,
        // we assign accumulator to the
        // current element of the array
      } else {
        accumulator = this[i];
      }
    }

    // We return the overall accumulated response
    return accumulator;
  };

  // Code to calculate sum of array elements
  // using our own reduce method
  const arr = [1, 2, 3, 4];
  console.log(arr.myReduce((total, elem) => total + elem, 10)); //10

  // Code to calculate multiplication of all array elements
  console.log(arr.myReduce((prod, elem) => prod * elem)); //24
}
```
