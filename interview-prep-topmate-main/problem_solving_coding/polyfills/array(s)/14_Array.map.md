## Array.map()

**Definition**: creates a new array with the results of calling a provided function on every element in the calling array.

```js
//syntax:
map(callbackFn, thisArg);
```

<strong>Approach Taken:</strong>

1. maintain an new result array to return in the final.
2. perform a basic for loop, with this.length
3. `main logic is` : resultArr.push(callbackFn(arrayElement, iterationVariable, arrayItself))
4. outside the for loop return the array

```js
Array.prototype.myMap = function (callbackFn, thisArg) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callbackFn.call(thisArg, this[i], i, this));
  }
  return arr;
};

const arr = [2, 3, 4, 5, 6];

const myMapArr = arr.myMap((item) => item * 5);
console.log('myMapArr', myMapArr); //[10, 15, 20, 25, 30]

```
