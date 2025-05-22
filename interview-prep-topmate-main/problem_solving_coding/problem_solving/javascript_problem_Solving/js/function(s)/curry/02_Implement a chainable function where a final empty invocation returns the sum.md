## Implement a chainable function where a final empty invocation returns the sum

**Approach Taken**

1. closures concept, parent function accepts the param (which is logically the first param of the example invocation)
2. return the child function and the child function param is nothing but the second invocation function (ex: curried(1)(2)) says that parent param is 1, child param is 2
3. save the first param as sum variable and keep on mutating the sum variable like sum = sum + childParam
4. core logic is returning the child function inside the child function (ex: return next)

```js
function curried(n) {
  // code starts executing from below line, curried gets the first param as 1
  let sum = n;

  function test(next) {
    if (next === undefined) {
      return sum;
    }
    sum = sum + next;
    //below line is so much important, as it helps us to keep on checking the next value
    return test;
  }

  //2nd line executes here, this will invoke the test function and the param next is 2
  return test;
}

console.log(curried(1)(2)(3)());
```
