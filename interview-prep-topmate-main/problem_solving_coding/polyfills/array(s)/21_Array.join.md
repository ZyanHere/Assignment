## Array.join()

**Definition**: creates and returns a new string by concatenating all of the elements in this array, `separated by commas or a specified string`.

- If the array has only one item then it will be returned without using the operator.

```js
//syntax:
join(separator);
```

<strong>Approach Taken:</strong>

1. by default the param `separator` is comma (ex: separator = ',')
2. maintain an result which returns in the String format
3. By default we are storing result with the first element in an array.
   Ex: `String(this[0])`
4. perform a basic for loop starting with i=1 and i<this.length
5. core logic is : result = result + String(separator) + String(this[i])
6. at the end return result post exit from for loop

```js
if (!Array.prototype.customJoin) {
  Array.prototype.customJoin = function (separator = ',') {
    // If the array is empty, return an empty string
    if (this.length === 0) {
      return '';
    }

    // Start with the first element as it won't be prefixed with the separator
    let result = String(this[0]); //ex: "apple"

    // Loop through the array starting from the second element (ex: iteration starts from i=1)
    for (let i = 1; i < this.length; i++) {
      result += String(separator) + String(this[i]);
    }

    return result;
  };
}

// Tests
const arr1 = ['apple', 'banana', 'cherry'];
console.log(arr1.customJoin()); // "apple,banana,cherry"
console.log(arr1.customJoin('-')); // "apple-banana-cherry"
console.log(arr1.customJoin(' and ')); // "apple and banana and cherry"
const arr2 = [];
console.log(arr2.customJoin()); // ""
const arr3 = [2, 4, 6, 8];
console.log(arr3.customJoin(':')); // "2:4:6:8"
```
