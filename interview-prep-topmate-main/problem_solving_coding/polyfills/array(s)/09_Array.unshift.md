## Array.unshift()

**Definition**: Adds the specified elements at the start of the array and returns the new length of the array.

```js
//syntax:
unshift(element1, element2, .......elementN);
```

<strong>Approach Taken:</strong>

1. this.length, elements.length are the two types of lengths to be considered.
2. write a for loop to create empty spaces at the start of the array (ex: if two elements are going to be added at the start of the array, so two empty spaces should be added at the start of array).
3. for achieving the above logic, loop in reverse i.e; let i = length - 1; i>=0; i--
4. And this[iterationVariable+ elementsToBeAddedLength] = this[i]
5. now write a second basic for loop to iterate over elementsToBeAddedLength and this[i] = elements[i]
6. return the new length by adding the existingArrayLength + elementsToBeAddedLength
7. make sure to mutate the existing array length (ex: this.length = newLength)

```js
Array.prototype.myUnshift = function (...elements) {
  //checking array is null
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }

  //length specifies to the existing array
  let length = Math.max(0, this.length);

  // addLength specifies that how many you are going to add at the start of the array (ex: 2)
  const addLength = elements.length;

  if (addLength === 0) {
    return length;
  }

  // Move the existing array elements to right and leave empty spaces at the start
  for (let i = length - 1; i >= 0; i--) {
    this[i + addLength] = this[i];
  }

  // [undefined, undefined, 'apple', 'banana', 'mango'] will be the result of the this

  //basic for loop based on the new addition data
  for (let i = 0; i < addLength; i++) {
    //elements specify to the data that user want to newly add at the start (ex: 'pineapple')
    this[i] = elements[i];
  }

  const newLength = length + addLength;
  //updating array length with the new length
  this.length = newLength;

  return newLength; //push returns the length at the end
};

// Test cases
const fruits = ['apple', 'banana', 'mango'];
const newLength = fruits.myUnshift('pineapple', 'grape');
console.log(newLength); // Expected output: 5
console.log(fruits); // Expected output:['pineapple', 'grape', 'apple', 'banana', 'mango']
```
