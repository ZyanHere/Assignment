# completeAssign

### Implement a completeAssign() which have the same parameters as Object.assign() but fully copies the data descriptors and accessor descriptors?

In case you are not familiar with the descriptors, this page from MDN might help.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

```js
function completeAssign(target, ...sources) {
    if (target == null) throw Error('target cannot be null or undefined');
    target = Object(target);
  
    sources.forEach(source => {
        // If the source is null or undefined, skip to the next source
        if (source == null) return;
        // Use Object.defineProperties to copy all own property descriptors from the source to the target
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        
        // Loop through each symbol property of the current source using forEach
        Object.getOwnPropertySymbols(source).forEach(symb => {
            // Assign symbol properties from the source to the target
            target[symb] = source[symb];
        });
    });
    // Return the updated target object
    return target;
}
// Example usage:
// Example 1: Basic object assignment
const target1 = { a: 1 };
const source1 = { b: 2, c: 3 };

// Merging properties from source1 into target1
const result1 = completeAssign(target1, source1);
console.log(result1); // Output: { a: 1, b: 2, c: 3 }

// Example 2: Including symbol properties
const symKey = Symbol('symbolKey');
const source2 = { d: 4, [symKey]: 5 };

// Merging properties from source2 into target1
const result2 = completeAssign(target1, source2);
console.log(result2); // Output: { a: 1, b: 2, c: 3, d: 4, [Symbol('symbolKey')]: 5 }

// Example 3: Handling null sources
const resultWithNullSource = completeAssign({}, { x: 10 }, null, { y: 20 });
console.log(resultWithNullSource); // Output: { x: 10, y: 20 }


// Example 4: Error handling for invalid target
try {
    completeAssign(null, { a: 1 });
} catch (error) {
    console.error(error.message); // Output: "target cannot be null or undefined"
}

// Example 5: Copying properties from multiple sources
const source3 = { z: 6 };
const source4 = { w: 7, [Symbol('anotherSymbol')]: 8 };
// Merging properties from source3 and source4 into a new target
const multiSourceResult = completeAssign({}, source3, source4);
console.log(multiSourceResult); // Output: { z: 6, w: 7, [Symbol('anotherSymbol')]: 8 }
```