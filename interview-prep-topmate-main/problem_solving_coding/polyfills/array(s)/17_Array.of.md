## Array.of()

**Definition**: creates a new array instance from a variable number of arguments, regardless of number or type of the arguments.

```js
//syntax:
Array.of(element1, element2, /* …, */ elementN);
```

<strong>Approach Taken:</strong>

1. no prototype chain here
2. maintain a new final array to return
3. perform a basic for loop with arguments.length
4. and inside the for loop finalArry.push(arguments[i])
5. return the finalArr outside the for loop

```js
if (!Array.of) {
  Array.of = function () {
    // Create an empty array
    const arr = [];

    // Iterate over the arguments and push them into the array
    for (let i = 0; i < arguments.length; i++) {
      arr.push(arguments[i]);
    }

    // Return the newly created array
    return arr;
  };
}

// Tests
console.log(Array.of(1)); // [1]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of('a', 'b', 'c')); // ["a", "b", "c"]
```
