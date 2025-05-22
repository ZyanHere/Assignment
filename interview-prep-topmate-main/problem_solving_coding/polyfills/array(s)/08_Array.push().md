## Array.push()

**Definition**: Adds the specified elements at the end of the array and returns the new length of the array.

```js
//syntax:
push(element1, element2, .......elementN);
```

<strong>Approach Taken:</strong>

1. we have two different lengths here, one is elements.length, and second is array.length (ex: this.length)
2. iterate using basic for loop with the help of elements.length and update the last element in the array with the first element in the params array (ex: array[array.length] = elements[iterationVaraible])
3. then increment the length property (ex: let length = this.length, so length+=1)
4. at the end of the for loop, mutate the array.length to the new length property (ex: this.length = length) and return the length

```js
Array.prototype.myPush = function (...elements) {
  //checking array is null
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }

  let length = Math.max(0, this.length);
  const addLength = elements.length;

  //if the length you want to add + the length you already have in the array is more than SAFE
  if (length + addLength > Number.MAX_SAFE_INTEGER) {
    throw new TypeError('The number of array is over the MAX_SAFE_INTEGER');
  }

  //basic for loop
  for (let i = 0; i < addLength; i++) {
    // this[length++] = elements[i]
    this[length] = elements[i];
    length += 1;
  }

  //updating array length with the new length
  this.length = length;

  return length; //push returns the length at the end
};

// Test cases
const fruits = ['apple', 'banana', 'mango'];
const newLength = fruits.myPush('pineapple', 'grape');
console.log(newLength); // Expected output: 5
console.log(fruits); // Expected output: ["apple", "banana", "mango", "pineapple", "grape"]

// The following line
this[length++] = elements[i];

// Is equivalent to
this[3] = 'pineapple'; // Add 'pineapple' to the 3rd index of the array
length = 4; // Now increment the length for the next iteration
```
