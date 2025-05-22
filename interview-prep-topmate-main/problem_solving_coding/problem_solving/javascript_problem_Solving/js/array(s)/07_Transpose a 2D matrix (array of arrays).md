## Transpose a 2D matrix (array of arrays)

```js
function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  //transposed will look like below (refer screenshot)
  const transposed = Array.from({ length: cols }).map(() =>
    Array(rows).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }

  return transposed;
}

// Example usage:
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const transposedMatrix = transpose(matrix);
console.log(transposedMatrix);
```
<img src="./imagesUsed/Transpose-matrix.png">
