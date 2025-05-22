## Array.filter()

**Definition**: filtered the given array based on the logic, if the logic is true it simply filters it out.

```js
//syntax:
filter(callbackFn, thisArg);
```

<strong>Approach Taken:</strong>

1. maintain an new result array to return in the final.
2. perform a basic for loop, with this.length
3. `main logic is` : if this condition is true `callbackFn.call(array, iterationVariable, arrayItself)` then finalArr.push(arrayElement)
4. outside the for loop return the array

```js
Array.prototype.myFilter = function (callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (callbackFn.call(this, this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};

const arr = [2, 3, 4, 5, 6];

const filteredArr = arr.myFilter((item) => item > 5);
console.log('filteredArr', filteredArr);
```
