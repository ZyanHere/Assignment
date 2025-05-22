## Reverse the words in the string without any inbuilt methods

**Approach Taken**

1. basic for loop, you will get the each and every character
2. maintain one variable for end result, one variable for word
3. if condition will be executed when it encounters the space, and mutates the end result (ex: result = word + emptySpace + result)
4. make sure to clear the word (ex: word = '')
5. else condition will be executed for every time, ex: word = word + str[i]
6. at the end return result.trim()

```js
function reverseWords(input) {
  let result = '';
  let word = '';
  for (let i = 0; i <= input.length; i++) {
    // if you encounter a space then simply mutate the result , (ex: result = word + emptySpace + result)
    if (input[i] === ' ' || i === input.length) {
      // here word is the complete set before/after the space is encountered (ex: I is word, am is word, SaiTeja is word), so this word is added to the result (ex: "am" + " " + "I")
      result = word + ' ' + result;
      word = '';
    } else {
      // input[i] is single character (ex: input[0] is I)
      // word is "" at first then ""+I which "I" at second, then it encounter a space and it satisfies the if condition
      word = word + input[i];
    }
  }
  return result.trim();
}

console.log(reverseWords('I am SaiTeja')); // Output: 'SaiTeja am I'
```
