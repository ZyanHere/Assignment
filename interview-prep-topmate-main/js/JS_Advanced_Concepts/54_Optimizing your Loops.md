- Optimization doesn't always translate into "more readable" code. It can sometimes harder to read and indirectly obfuscate the business logic you're optimizing.

#### 1. Keep your variable definitions outside of the loop

- Given a big loop, if you keep declaring your variables inside the loop, <u>you're forcing the runtime to create a new variable on every iteration.</u>

```js
// Don't do this

for (let i = 0; i < array.length; i++) {
  let myVar = 0;
  // rest of the logic
}
```

```js
// Simply write like this
let myVar = 0;
for (let i = 0; i < array.length; i++) {
  myVar = arr[i];
  // rest of the logic
}
```

###### The result is the same but you're saving memory and time.

---

#### 2. Breaking out of the loop

```js
const arr = [1, 2, 3, 4, 5];

for (const num in arr) {
  if (num === 3 || num === 5) {
    //do something
    break;
  }
}
```

---

#### 3. Avoid nested loops at all costs

- Nested loops can lead to significant performance bottleneck, especially dealing with large data sets.

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 4, 6, 8, 10];

for (let i = 0; i < arr1.length; i++) {
  for (let j = 0; j < arr2.length; j++) {
    if (arr1[i] === arr2[j]) {
      console.log(`${arr1[i]} is in both arrays`);
    }
  }
}
```

##### Nested loops has Time complexity of O(n²), which can be prohibitively slow for large data sets.

- Simply think of two arrays of 1k elements, you’ll have to iterate over 1 million elements! Imagine if you suddenly now need to iterate over one more array! That’d be crazy expensive!

#### Solution to avoid nested loops is we can use a <u>hashtable or a Set to keep track of the elements in one of the arrays</u>, and then loop through the other array and check if each element exists in the hash table or Set.

- This approach has a time complexity of O(n), which can be much faster than the nested loop approach.

```js
// Set example to avoid nested loops

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 4, 6, 8, 10];

const set = new Set(arr1);

for (let i = 0; i < arr2.length; i++) {
  if (set.has(arr2[i])) {
    console.log(`${arr2[i]} is in both arrays`);
  }
}
```

---

#### 4. Consider using functional methods

- Functional methods like map or find are actually more optimized internally than for or while loops <u>considering that we're not doing anything very complex with the data inside our array</u>

```js
const arr = new Array(1000000).fill(0);
const squared1 = [];
// Benchmark the for loop

console.time("for loop");
for (let i = 0; i < arr.length; i++) {
  squared1.push(arr[i] * arr[i]);
}
console.timeEnd("for loop");
```

```js
const arr = new Array(1000000).fill(0);
// Benchmark the for loop
console.time("map method");
const squared2 = arr.map((item) => item * item);

console.timeEnd("map method");
```
