### Create an Object without Prototype property


```js
// object without prototype
const devtools = Object.create(null);

console.log(devtools.constructor); // undefined
console.log(devtools.__proto__); // undefined

// These lines will throw an error because 'devtools' doesn't have 'constructor' or 'toString' methods
try {
    console.log(devtools.constructor.prototype); // Error
} catch(e) {
    console.error('Error:', e.message); // Catches and logs the error
}

try {
    console.log(devtools.toString()); // Error
} catch(e) {
    console.error('Error:', e.message); // Catches and logs the error
}

```