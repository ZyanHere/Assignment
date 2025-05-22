### Function that takes another function `f` as an argument and returns a new function

**_Approach taken:_**

- accept f as parameter
- your main function returns function with set of args(ex: ...args)
- inside that return function we are going to write setTimeout logic
- Ex: setTimeout(()=>{f.apply(this,args), delayParam})

```js
function delayedFunction(f, delay) {
  // Return a new function
  return function (...args) {
    // Use setTimeout to call f after the specified delay
    // this refers to Window object
    setTimeout(() => f.apply(this, args), delay);
  };
}

// Example usage
const sayHello = () => console.log('Hello!');
const delayedSayHello = delayedFunction(sayHello, 2000); // Creates a new function that delays sayHello by 2 seconds

delayedSayHello(); // Calls sayHello after 2 seconds
```
