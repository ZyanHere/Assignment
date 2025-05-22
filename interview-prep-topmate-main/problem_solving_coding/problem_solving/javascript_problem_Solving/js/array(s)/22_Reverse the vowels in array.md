### Reverse the vowels in the array

**_Approach Taken_**

- write down the vowels inside new Set([])
- the string param has to be split (ex: const arr = s.split('')), hello becomes ['h', 'e' , 'l' , 'l', 'o' ]
- maintain left and right variables (left is 0, right is array.length -1) as initial values
- four logics are maintained
- logic 1: while (left < right) and inside this condition we have three logics
- logic 2: while (left < right && !vowels.has(arr[left])) then left++
- logic 3: while(left < right && !vowels.has(arr[right])) then right--
- logic 4: if(left < right) then [arr[left], arr[right]] = [arr[right], arr[left]]
  and left++; right--
- don't forget to return in the string format (ex: arr.join('')) WRITE THIS OUTSIDE THE OUTER LOGIC 1 WHILE CONDITION

```js
function reverseVowels(s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const arr = s.split('');
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // ex: left < right + non vowels will satisfy the condition
    while (left < right && !vowels.has(arr[left])) {
      left++;
    }
    // ex: left < right + non vowels will satisfy the condition
    while (left < right && !vowels.has(arr[right])) {
      right--;
    }
    if (left < right) {
      //swap
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join('');
}

// Example usage
console.log(reverseVowels('hello')); // Output: "holle"
console.log(reverseVowels('leetcode')); // Output: "leotcede"
```

### Explanation of Example mechanism

- Original String: "leetcode"
- Identify the Vowels: The vowels in this string, in order, are e, e, o, and e.
- Reverse the Order of Vowels: When you reverse the order of these vowels, you get e, o, e, e.
- Place the Reversed Vowels Back in the String: (The first vowel e (originally at position 1) is swapped with the last vowel e (originally at position 7)).
- The second vowel e (originally at position 2) is swapped with the second-to-last vowel o (originally at position 4).
- Result: After these swaps, the string becomes "leotcede".
