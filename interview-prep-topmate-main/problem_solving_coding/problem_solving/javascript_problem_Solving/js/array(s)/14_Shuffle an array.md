## Shuffle the array

#### Simple Solution, which returns only one of the shuffled array

```js
function shuffle(arr) {
  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // Generate a random index between the current index (i) and the last index (arr.length - 1)
    const j = i + Math.floor(Math.random() * (arr.length - i));

    // Swap the elements at index i and index j using array destructuring
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const arr = [1, 2, 3, 4];

// Invoke the shuffle function
shuffle(arr);

// Log the shuffled array
console.log(arr);
```

---

#### Simple Solution, which returns all the permutations of shuffled array

```js
function generatePermutations(
  inputArr,
  n = inputArr.length,
  currentArr = [],
  resultArr = []
) {
  // logic 1, based on one condition we need to push to resultArr
  if (currentArr.length === n) {
    resultArr.push([...currentArr]);
    return;
  }

  for (let i = 0; i < inputArr.length; i++) {
    // logic 2, based on one condition we need to push to currentArr
    if (!currentArr.includes(inputArr[i])) {
      currentArr.push(inputArr[i]);
      //core logic is recursion
      generatePermutations(inputArr, n, currentArr, resultArr);
      //logic 3, currentArr.pop()
      currentArr.pop();
    }
  }

  // never forget to return something in your functions
  return resultArr;
}

// Example usage:
const myArray = [1, 2, 3, 4];
const permutations = generatePermutations(myArray);
console.log('Total Permutations for [1,2,3,4] are ', permutations.length);
permutations.forEach((permutation) => console.log(permutation));
```
