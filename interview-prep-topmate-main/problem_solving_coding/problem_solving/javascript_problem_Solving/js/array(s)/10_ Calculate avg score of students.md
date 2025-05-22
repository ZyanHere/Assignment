## Calculate the `average` score of students who `scored above 90`

```js
// Input
const students = [
  { name: 'John', score: 85 },
  { name: 'Sarah', score: 92 },
  { name: 'Michael', score: 88 },
  { name: 'Emma', score: 95 },
  { name: 'Daniel', score: 90 },
];

// Expected output should be average of 95 and 92
```

<details>
<summary>View Answer</summary>

```js
const above90StudentsAverage = students
  .filter((student) => student.score > 90)
  .reduce((acc, student, i, arr) => acc + student.score / arr.length, 0);

console.log(above90StudentsAverage); // Output: 93.5 (average of 95 and 92)
```