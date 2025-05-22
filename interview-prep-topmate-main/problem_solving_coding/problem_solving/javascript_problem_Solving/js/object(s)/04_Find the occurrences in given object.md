## Find the occurrences

```js
function countGender(inputArr) {
  const count = {};
  for (let genderSpecific of inputArr) {
    count[genderSpecific.gender] = (count[genderSpecific.gender] || 0) + 1;
  }
  return count;
}

const people = [
  { name: 'Mary', gender: 'girl' },
  { name: 'Paul', gender: 'boy' },
  { name: 'John', gender: 'boy' },
  { name: 'Lisa', gender: 'girl' },
  { name: 'Bill', gender: 'boy' },
  { name: 'Maklatura', gender: 'girl' },
  { name: 'Sara', gender: 'girl' },
];

const output = countGender(people);
console.log('boys:', output.boy); // Outputs: "boys: 3"
```
