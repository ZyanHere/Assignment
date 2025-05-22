## uncompress string

```js
//Example
uncompress('3(ab)'); // 'ababab'
uncompress('3(ab2(c))'); // 'abccabccabcc'
```

**Approach Taken**:

1. while loop based on i<s.length `ex: s is the param string`
2. `condition 1` to match the 0 to 9 (ex: s[i].match(/[0-9]/)), if yes then get that number you want to be repeated (ex: num = num \* 10 + parseInt(s[i]))
3. `condition 2` to check if it is open bracket, if yes i++ and call the helper function again and store it in a variable
4. store result in order to add to the existing result + storedVariable.repeat(repeatNumVariable)
5. mutate num = 0 , so num is always 0 from start
6. `condition 3` to check if it is closed bracket, if yes i++ and return result
7. `else condition 4`, to just keep on adding to the result = result + s[i]
8. outside the while loop, return the result
9. return helper() is the core logic here, because we are forming a closure by writing an inner function called helper, so we have to return the helper() function

```js
function uncompress(s) {
  let i = 0;

  function helper() {
    let result = '';
    let num = 0;

    while (i < s.length) {
      //match for numbers
      if (s[i].match(/[0-9]/)) {
        num = num * 10 + parseInt(s[i]);
        i++;
      } else if (s[i] === '(') {
        //check if it is open bracket
        i++; // Move past '('

        //call the helper function, this substring variable will hold the values of inside the brackets (ex: c in one case as it is inside 2(c), abcc in one case as it is inside 3(ab2(c)))
        const substring = helper();

        //this below repeat line will be called at last after executing everything inside the brackets
        result += substring.repeat(num);

        num = 0; // Reset num for next sequence
      } else if (s[i] === ')') {
        i++; // Move past ')'
        // end of the bracket means it got the substring in the 2nd else if condition, after this result is returned, it will start executing the substring.repeat(num) line
        return result;
      } else {
        // simply keep on adding (ex: '' to 'a', 'a' to 'ab')
        result += s[i];
        i++;
      }
    }

    //this will be our final result (Code stops here...)
    return result;
  }

  //this will be our first execution (Code starts here...)
  return helper();
}

// Test
console.log(uncompress('3(ab)')); // 'ababab'
console.log(uncompress('3(ab2(c))')); // 'abccabccabcc'
console.log(uncompress('5(5(ab)2(c)))')); // 'abababababccabababababccabababababccabababababccabababababcc'
```
