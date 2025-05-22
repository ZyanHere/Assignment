## decode a message


- #### The way to collect the message is as follows

1. start at top left
2. move diagonally down right
3. when cannot move any more, try to switch to diagonally up right
4. when cannot move any more, try switch to diagonally down right, repeat 3
5. stop when cannot neither move down right or up right. the character on the path is the message

```js
for the input above, IROCLED should be returned.
```
**note:** if no characters could be collected, return empty string


```js
function decode(message) {
  // Initialize an empty string to store the result
  let result = '';
  // Start from the top-left corner of the matrix
  let row = 0, col = 0;
  
  // Loop while there is a valid character at the current position
  while (
    // Check if the current row and column exist and if there is a valid character
    message[row]?.[col] && 
    // If the next row exists, append the current character to the result and move diagonally down-right
    (message[row + 1] !== undefined 
      ? (result += message[row++][col++]) 
      // Otherwise, append the current character to the result and move diagonally up-right
      : (result += message[row--][col++])
    )
  );

  // Return the collected message
  return result;
}

// Example usage
const matrix = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D']
];

// Decode the message from the matrix
const result = decode(matrix);

// Log the decoded message
console.log(result); // Outputs: "IROCLED"
```