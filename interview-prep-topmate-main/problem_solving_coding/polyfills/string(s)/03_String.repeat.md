## String.prototype.repeat

**Definition**: Constructs and returns a new string which contains the specified number of copies of this string, concatenated together.

```js
//syntax:
repeat(count);
```

<strong>Approach Taken:</strong>

1. you have string that you pass (ex: this.valueOf())
2. you know the count number which is passed as param
3. now you check this count number is greater than 0 in the while loop
4. condition 1: if count is odd number then result = result + pattern (pov: result is an empty string)
5. Now half the count (ex: count = Math.floor(count / 2))
6. after that condition you `again` check if the count is greater than 0, if it is yes then pattern = pattern + pattern (Ex: pattern is nothing but let pattern = this.valueOf()).
7. outside the while loop, return result

```js
String.prototype.customRepeat = function (count) {
  if (typeof count !== 'number' || count < 0 || count === Infinity) {
    throw new RangeError('Invalid count value');
  }

  // we always want count to be in integers ex: 1.3 to 1
  count = Math.floor(count);

  let result = '';
  // pattern is nothing but at first it prints whatever you want to repeat (ex: 'Hello')
  //"Hello".valueOf() prints "Hello", or whatever you provided
  let pattern = this.valueOf();

  while (count > 0) {
    // ex: if count is 1,3,5 or any odd number, then result will be stored with the provided value (ex: "Hello")
    if (count % 2 === 1) {
      result = result + pattern;
    }

    //if count is 1, the 1/2 results to 0.5, and we want to consider as 0, that is the reason for Math.floor here
    count = Math.floor(count / 2);

    //only if it is greater than zero, then double the Pattern
    //for the very first time, it simply doubles what you have asked to repeat (ex: "Hello" + "Hello")
    if (count > 0) {
      pattern = pattern + pattern;
    }
  }

  //when count is not greater than 0, it should returns this result (which is outside of while loop)
  return result;
};

// Example Usage
console.log('Hello'.customRepeat(4)); // "HelloHelloHelloHello"
```
