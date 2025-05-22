## Array.concat()

**Definition**: instances is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

```js
//syntax:
concat(value1, value2, /* …, */ valueN);
```

<strong>Approach Taken:</strong>

1. we are passing empty parameters because we will perform operations with arguments
2. maintain an result arr so that we will return this at last
3. 1st basic for loop will be based on the this.length and result.push(this[i])
4. 2nd basic for loop will be based on the arguments.length and arguments[i] can have array formatted values or primitives also
5. So, inside the for loop write a if condition to handle Array.isArray(arguments[i]), if yes then perform another for loop based on the arguments[i] variable.length. and push the value in the result final array
6. in the else condition directly push the arguments[i]

```js
if (!Array.prototype.customConcat) {
  Array.prototype.customConcat = function () {
    // Create a new array to hold the concatenated result
    const result = [];

    // Start by pushing the current array's elements
    for (let i = 0; i < this.length; i++) {
      result.push(this[i]);
    }

    // Iterate over the arguments and append each of them to the result array (ex: arr2, 7, 8) are the arguments
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i];

      // If the argument is an array, push its individual items
      if (Array.isArray(arg)) {
        for (let j = 0; j < arg.length; j++) {
          result.push(arg[j]);
        }
      } else {
        // If it's not an array, push the argument directly
        result.push(arg);
      }
    }

    // Return the concatenated array
    return result;
  };
}

// Tests
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(arr1.customConcat(arr2, 7, 8)); // [1, 2, 3, 4, 5, 6, 7, 8]
// console.log(arr1.customConcat(9, [10, 11])); // [1, 2, 3, 9, 10, 11]
```
