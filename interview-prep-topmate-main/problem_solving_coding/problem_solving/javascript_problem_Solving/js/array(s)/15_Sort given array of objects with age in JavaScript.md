## Sort given array of objects with age in JavaScript

```js
// Input

const arr = [
  { name: 'Prathi', age: 32, place: 'Pune' },
  { name: 'Raj', age: 26, place: 'Mumbai' },
  { name: 'Arun', age: 28, place: 'Delhi' },
];
//Output: [26,28,32]
```

```js
const arr = [
  { name: 'Prathi', age: 32, place: 'Pune' },
  { name: 'Raj', age: 26, place: 'Mumbai' },
  { name: 'Arun', age: 28, place: 'Delhi' },
];

// Implement a basic bubble sort
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - 1 - i; j++) {
    if (arr[j].age > arr[j + 1].age) {
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

// Extract the ages to a separate array
const sortedAges = [];
for (let i = 0; i < arr.length; i++) {
  sortedAges.push(arr[i].age);
}

console.log(sortedAges); // [26, 28, 32]
```

### Solution 2

```js
const arr = [
  { name: 'Prathi', age: 32, place: 'Pune' },
  { name: 'Raj', age: 26, place: 'Mumbai' },
  { name: 'Arun', age: 28, place: 'Delhi' },
];

// Extract ages and sort them
const sortedAges = arr.map(person => person.age).sort((a, b) => a - b);

console.log(sortedAges); // Output: [26, 28, 32]
```