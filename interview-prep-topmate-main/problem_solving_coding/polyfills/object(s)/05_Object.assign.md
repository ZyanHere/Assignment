## Object.assign()

**Definition**: copies from one or more source objects to a target object. It returns the modified target object

```js
//syntax:
Object.assign(target, source1, source2, /* …, */ sourceN);
```

<strong>Approach Taken:</strong>

- objectAssign function takes two arguments, one is target and the object that user declares
- while passing as params we would do some manipulating like we use spread operator for user provided object so that we can use for looping
- just convert your target which is {} into Object(target) ex: target = Object(target)
-  Use the `forEach` method to iterate over each source object. If the source is null or undefined, skip to the next source.
-  Use Object.keys(source) to get an array of property keys from the current source object.
-  For each key, assign the value from the source object to the target object.
-   In addition to string keys, retrieve and merge properties identified by symbols using `Object.getOwnPropertySymbols(source)`.

```js
function objectAssign(target, ...sources) {
    // Check if the target is valid (not null or undefined)
    if (target == null) {
        throw new Error('Target cannot be null or undefined');
    }
  
    // Convert the target to an object
    target = Object(target);

    // Iterate through each source object provided as arguments
    sources.forEach(source => {
        // If the source is null or undefined, skip to the next source
        if (source == null) return;

        // Merge own properties from the source into the target
        mergeProperties(Object.keys(source), source);
        mergeProperties(Object.getOwnPropertySymbols(source), source);
    });

    function mergeProperties(keys, currSource) {
        keys.forEach(key => {
            // Assign the value from the current source to the target object using the key
            target[key] = currSource[key];

            // Check if the assignment was successful; if not, throw an error
            if (target[key] !== currSource[key]) {
                throw new Error(`Failed to assign value for key: ${String(key)}`);
            }
        });
    }

    // Return the updated target object
    return target;
}

// Example usage
const target = { a: 1 };
const source1 = { b: 2, c: 3 };
const source2 = { d: 4, [Symbol('symKey')]: 5 };

// Merging properties from source1 and source2 into target
const result = objectAssign(target, source1, source2);
console.log(result); // { a: 1, b: 2, c: 3, d: 4, [Symbol('symKey')]: 5 }

// Example with null source
const resultWithNullSource = objectAssign({}, { x: 10 }, null, { y: 20 });
console.log(resultWithNullSource); // { x: 10, y: 20 }

// Example with an invalid target
try {
    objectAssign(null, { a: 1 });
} catch (error) {
    console.error(error.message); // "Target cannot be null or undefined"
}

// Example of error when property value doesn't match
const sourceWithConflict = { z: 3 };
const conflictingTarget = { z: 1 };

try {
    objectAssign(conflictingTarget, sourceWithConflict);
    console.log(conflictingTarget); // This line won't execute because of the error
} catch (error) {
    console.error(error.message); // "Failed to assign value for key: z"
}
```
