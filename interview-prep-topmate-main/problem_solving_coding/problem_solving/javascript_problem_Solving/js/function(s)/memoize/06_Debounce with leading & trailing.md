## Implement a enhanced throttle() which accepts third parameter, option: 

```js
{leading: boolean, trailing: boolean}

```

1. leading: whether to invoke right away
2. trailing: whether to invoke after the delay.

----

### Approach Taken:

1. The function returns a new debounced function that takes any number of arguments. 
   - This returned function manages the invocation logic based on the presence of an active timer and the options provided.
   - Within the returned function, it checks 
   - if there is no active timer 
   - and if the leading option is set to true. 
   - If both conditions are met, it immediately invokes the provided function with the given arguments and marks it as invoked.
2. Regardless of the invocation status, 
   - the existing timer is cleared, 
   - and a new timer is set for the specified wait time. 
   - This ensures the function is invoked after the debounce period if the trailing option is true and
   - the function has not been invoked already.
3. The timer callback checks if the trailing option is true and if the function has not been invoked. 
   - If both conditions are satisfied, 
   - it invokes the function with the stored arguments.
   - Finally, it clears the timer to reset the debounce state.

----

### Usage Scenarios with Different Options:

**Scenario 1**: 
- With both leading and trailing set to **true**, 
  - The function is invoked at the start and end of the debounce period.

**Scenario 2:** 
- With leading set to **false** and trailing set to **true**,
  - The function is invoked only at the end of the debounce period. 


**Scenario 3:** 
- With leading set to **true** and trailing set to **false**
  - The function is invoked only at the start of the debounce period. 

**Scenario 4:** 
- With both leading and trailing set to **false**
    - The function is never invoked.
----

```js
// ACTUAL CODE STARTS

// Debounce function to limit the rate at which a function is invoked
function debounce(func, wait, option = { leading: false, trailing: true }) {
  // Variable to store the timer ID
  let timer = null;

  //destructuring
  let {leading, trailing} = option;

  // Return a new debounced function
  return function (...args) {
    // Variable to check if the function has been invoked
    let isInvoked = false;

    // If there is no active timer and leading is true, call the function immediately
    if (timer === null && leading) {
      func.call(this, ...args);
      // Mark the function as invoked
      isInvoked = true;
    }

    // Clear any existing timer
    window.clearTimeout(timer);

    // Set a new timer to handle the trailing invocation
    timer = window.setTimeout(() => {
      // If trailing is true and the function hasn't been invoked, call the function
      if (trailing && !isInvoked) {
        func.call(this, ...args);
      }
      // Clear the timer after the trailing invocation
      timer = null;
    }, wait);
  };
}

// Example usage scenarios:

// Scenario 1: With { leading: false, trailing: true }
// This will only invoke the function at the end of the debounce period
const debouncedFunc1 = debounce(
  (arg) => console.log(`Leading and Trailing only: ${arg}`),
  2000,
  { leading: true, trailing: true }
);
debouncedFunc1('AAA'); // Will log immediately
setTimeout(() => debouncedFunc1('BBB'), 1000); // Will not log
setTimeout(() => debouncedFunc1('CCC'), 3000); // Will log after delay

// Scenario 2: With { leading: true, trailing: true }
// This will invoke the function at the start and end of the debounce period
const debouncedFunc2 = debounce(
  (arg) => console.log(`Leading only: ${arg}`),
  2000,
  { leading: true, trailing: false }
);
debouncedFunc2('DDD'); // Leading call, will log immediately
setTimeout(() => debouncedFunc2('EEE'), 1000); // Will not log
setTimeout(() => debouncedFunc2('FFF'), 3000); // Will not log

// Scenario 3: With { leading: true, trailing: false }
// This will only invoke the function at the start of the debounce period
const debouncedFunc3 = debounce(
  (arg) => console.log(`Trailing only: ${arg}`),
  2000,
  { leading: false, trailing: true }
);
debouncedFunc3('GGG'); // Will not log
setTimeout(() => debouncedFunc3('HHH'), 1000); // Will not log
setTimeout(() => debouncedFunc3('III'), 3000); // Will log after delay

// Scenario 4: With { leading: false, trailing: false }
// This will never invoke the function
const debouncedFunc4 = debounce(
  (arg) => console.log(`Neither leading nor trailing: ${arg}`),
  2000,
  { leading: false, trailing: false }
);
debouncedFunc4('JJJ'); // Will not log
setTimeout(() => debouncedFunc4('KKK'), 1000); // Will not log
setTimeout(() => debouncedFunc4('LLL'), 3000); // Will not log

// Logging sequence:
// Leading and Trailing only: AAA
// Leading only: DDD
// Leading and Trailing only: CCC
// Trailing only: III
```