## Excel Sheet Numbering

```js
function toColumnName(num) {
    // Initialize an empty string to build the column name.
    let columnName = "";  
    // Continue the loop until num is 0. This happens after converting the entire number.
    while (num > 0) {  
        // Find the remainder when num is decremented by 1 and divided by 26.
        // Example for num = 28: (28-1) % 26 = 1, corresponding to 'B'
        let remainder = (num - 1) % 26;
          
        // Convert the remainder to a character. 'A' is 65 in ASCII, so adding the remainder gives the correct character.
        // Continuing the example: String.fromCharCode(65 + 1) = 'B'
        columnName = String.fromCharCode(65 + remainder) + columnName;

        // Reduce num by dividing it by 26 and taking the integer part. This step effectively "shifts" the number down in base-26.
        // Continuing the example: Math.floor((28-1)/26) = 1
        num = Math.floor((num - 1) / 26);  
    }
    return columnName;  // Return the fully constructed column name.
}

// Example tests to show how the function works
console.log(toColumnName(26));  // Outputs: Z, (26-1) % 26 = 25, which is 'Z'
console.log(toColumnName(51));  // Outputs: AY, First cycle: (51-1) % 26 = 24 ('Y'), then (51-1)/26 = 1, next cycle: (1-1) % 26 = 0 ('A')
console.log(toColumnName(52));  // Outputs: AZ, First cycle: (52-1) % 26 = 25 ('Z'), then (52-1)/26 = 1, next cycle: (1-1) % 26 = 0 ('A')
console.log(toColumnName(80));  // Outputs: CB, First cycle: (80-1) % 26 = 3 ('C'), then (80-1)/26 = 3, next cycle: (3-1) % 26 = 2 ('B')
console.log(toColumnName(676)); // Outputs: YZ, Follows similar calculations as above with more iterations
console.log(toColumnName(702)); // Outputs: ZZ, Follows similar calculations as above with more iterations
console.log(toColumnName(705)); // Outputs: AAC, Needs three cycles, similar calculations as above
```