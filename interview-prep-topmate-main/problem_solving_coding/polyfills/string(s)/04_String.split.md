## String.split()

**Definition**: takes a pattern and divides the string into an ordered list of substrings and puts these substrings into an array and returns the array

```js
//syntax:
split(separator, limit);
```

<strong>Approach Taken:</strong>

1. maintain an result array to store the splitted items
2. initialize the startIndex as 0
3. let's assume comma is the separator, you can get the index of comma with the help of String.indexOf(commaSeparator).. so assume this as separatorIndex
4. now perform a while loop until separatorIndex is not equal to -1
5. first condition is to check if limit is also defined, if yes check with the result.length === limit, if true then break
6. our first main logic of split is simple (String.substring(startIndex, separatorIndex)). wrap up this in result.push so that first element splitted is pushed to the result array.
7. Now the second main logic is to update both the startIndex and separatorIndex
8. startIndex should be updated with the separatorIndex + separator.length (which is 1)
9. separatorIndex should be updated with the help of finding nextComma starting with updated startIndex (ex: String.indexOf(',',updatedStartIndex))which results the next comma in that specified string
10. if it fails to find the nextComma, separatorIndex will be treated as -1 and it exits from while loop and we are writing another condition to simply add the rest of the string with the help of same logic. (ex: this.substring(startIndex))

```js
if (!String.prototype.customSplit) {
  String.prototype.customSplit = function (separator, limit) {
    // Edge case: if separator is not provided or empty, return the whole string in an array
    if (separator === undefined || separator === '') {
      return [this.toString()];
    }

    const result = [];
    let startIndex = 0;

    //separatorIndex logs the index of first comma/separator in the string, ex: for 'Hello,World' it will log as 5
    let separatorIndex = this.indexOf(separator);

    // While the separator is found in the string
    while (separatorIndex !== -1) {
      // If a limit is set and we reached it, break
      if (limit !== undefined && result.length === limit) {
        break;
      }

      //result is an array and we are pushing the first splitted string into this array, ex: ['Hello']
      result.push(this.substring(startIndex, separatorIndex));

      //we are updating startIndex from 0(default) to the (separatorIndex) + (separator.length i.e; (',').length which will be 1 in this case)
      startIndex = separatorIndex + separator.length;

      //updating separatorIndex with newStartIndex ex: logs 11 (reason is second comma after first split)
      separatorIndex = this.indexOf(separator, startIndex);
    }

    // when it fails to find the nextComma, we have a condition that is written outside the while loop
    if (limit === undefined || result.length < limit) {
      //below line usually adds the final words after the last comma (ex: Test) in our case
      result.push(this.substring(startIndex));
    }

    return result;
  };
}

// Test
const testString = 'Hello,World,This,Is,Test';
// console.log(testString.customSplit(',', 2)); // ["Hello", "World", "This", "Is", "Test"]
console.log(testString.customSplit(',')); // ["Hello", "World", "This", "Is", "Test"]
```
