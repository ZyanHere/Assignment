## Implement a enhanced throttle() which accepts third parameter, option: 

```js
{leading: boolean, trailing: boolean}

```

1. leading: whether to invoke right away
2. trailing: whether to invoke after the delay.

----

### Approach Taken:

1. A helper function **`setTimer`** is defined to handle the trailing invocation of the throttled function.
2. Inside **`setTimer`**, 
   - it checks if **lastArgs is not null and trailing is true**. 
3. If both conditions are met, 
   - it calls the throttled function with the last arguments, 
   - clears **`lastArgs`**, 
   - and sets a new timer for the trailing invocation.
4. If the conditions are **not** met, 
   - it **clears** the timer by setting timer to **`null`**.
5. The **`main`** function <ins>**returns a new function**</ins> that acts as the throttled version of the original function.
   - This returned function **takes any number of arguments** and handles the invocation logic based on the presence of an active timer.
   - Within the returned function, it first checks if there is **no active timer**.
   - If leading is **true**, it immediately calls the original function with the provided arguments.
6.  It sets the timer to invoke the setTimer function after the specified wait time.
7.  If there is an active timer, it **stores the arguments in lastArgs** to handle the trailing invocation.

----

### Usage Scenarios with Different Options:

**Scenario 1**: 
- With both leading and trailing set to **true**, 
  - the function is invoked at the start and end of the throttle period.

**Scenario 2:** 
- With leading set to **false** and trailing set to **true**,
  - the function is invoked only at the end of the throttle period.

**Scenario 3:** 
- With leading set to **true** and trailing set to **false**, the function is invoked only at the start of the throttle period.

**Scenario 4:** 
- With both leading and trailing set to **false**, the function is **`never`** invoked.

----

```js
// ACTUAL CODE STARTS
function throttle(func, wait, option = { leading: true, trailing: true }) {
  // Destructure leading and trailing options from the option object
  var { leading, trailing } = option;

  // Variable to store the last arguments passed to the function
  var lastArgs = null;

  // Variable to store the timer ID
  var timer = null;

  // Helper function to handle the trailing invocation
  const setTimer = () => {
    // If there are last arguments and trailing is true, call the function
    if (lastArgs && trailing) {
      func.apply(this, lastArgs);
      // Clear the last arguments after calling the function
      lastArgs = null;
      // Set a new timer for the trailing invocation
      timer = setTimeout(setTimer, wait);
    } else {
      // Clear the timer if no trailing invocation is needed
      timer = null;
    }
  };

  // Return the throttled function
  return function (...args) {
    // If there is no active timer
    if (!timer) {
      // If leading is true, call the function immediately
      if (leading) {
        func.apply(this, args);
      }
      // Set a timer for the trailing invocation
      timer = setTimeout(setTimer, wait);
    } else {
      // If there is an active timer, store the arguments for the trailing invocation
      lastArgs = args;
    }
  };
}

// Example usage scenarios:

// Scenario 1: With { leading: true, trailing: true }
// This will invoke the function at the start and end of the throttle period
const throttledFunc1 = throttle(
  (arg) => console.log(`Leading and Trailing: ${arg}`),
  3000,
  { leading: true, trailing: true }
);
throttledFunc1('AAA'); // Leading call, will log immediately
setTimeout(() => throttledFunc1('BBB'), 1000); // Will log
setTimeout(() => throttledFunc1('CCC'), 4000); // Trailing call, will log after 3 seconds

// Scenario 2: With { leading: false, trailing: true }
// This will only invoke the function at the end of the throttle period
const throttledFunc2 = throttle(
  (arg) => console.log(`Trailing only: ${arg}`),
  3000,
  { leading: false, trailing: true }
);
throttledFunc2('DDD'); // Will not log because leading is false
setTimeout(() => throttledFunc2('EEE'), 1000); // Will log
setTimeout(() => throttledFunc2('FFF'), 4000); // Trailing call, will log after 3 seconds

// Scenario 3: With { leading: true, trailing: false }
// This will only invoke the function at the start of the throttle period
const throttledFunc3 = throttle(
  (arg) => console.log(`Leading only: ${arg}`),
  3000,
  { leading: true, trailing: false }
);
throttledFunc3('GGG'); // Leading call, will log immediately
setTimeout(() => throttledFunc3('HHH'), 1000); // Will not log because of throttling
setTimeout(() => throttledFunc3('III'), 4000); // Will log because it's a new throttle period

// Scenario 4: With { leading: false, trailing: false }
// This will never invoke the function
const throttledFunc4 = throttle(
  (arg) => console.log(`Neither leading nor trailing: ${arg}`),
  3000,
  { leading: false, trailing: false }
);
throttledFunc4('JJJ'); // Will not log
setTimeout(() => throttledFunc4('KKK'), 1000); // Will not log
setTimeout(() => throttledFunc4('LLL'), 4000); // Will not log

//LOGGING SEQUENCE:
// Leading and Trailing: AAA
// Leading only: GGG
// Leading and Trailing: BBB
// Trailing only: EEE
// Leading only: III
// Leading and Trailing: CCC
// Trailing only: FFF
```