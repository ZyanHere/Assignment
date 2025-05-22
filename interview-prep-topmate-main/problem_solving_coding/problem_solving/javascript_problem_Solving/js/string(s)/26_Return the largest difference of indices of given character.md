## Return the largest difference of indices of given character if there is a duplicate else return -1

```javascript
function largestIndexDifference(s, char) {
    let minIndex = null;
    let maxIndex = null;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === char) {
            if (minIndex === null) {
                minIndex = i;
            }
            maxIndex = i;
        }
    }

    if (minIndex !== null && maxIndex !== null && minIndex !== maxIndex) {
        return maxIndex - minIndex;
    }

    return -1;
}

// Example usage:
const str = "hello there";
const char = "e";
console.log(largestIndexDifference(str, char)); // This would return 9
```