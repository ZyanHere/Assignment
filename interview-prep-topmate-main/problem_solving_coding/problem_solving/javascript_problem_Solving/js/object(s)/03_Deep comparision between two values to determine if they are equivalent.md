<strong>Approach Taken:</strong>

1. if obj1 === obj2 return true
2. if obj1 or obj2 are null or not an object return false
3. We need keys of the object and object always changes due to recursion
   ex: Object.keys(obj1) returns an array
4. now do `for of` loop of keys array
5. Each and every key will be passed inside the recursive function ex: obj1(key)

```js
function deepEqual(obj1, obj2) {
  // If both are the exact same value (strict equality), they are equal
  if (obj1 === obj2) return true;

  // If either of them is null or not an object, they aren't deep equal
  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object'
  ) {
    return false;
  }

  // Get the keys of both objects
  let keysA = Object.keys(obj1),
    keysB = Object.keys(obj2);

  // If they have a different number of keys, they are not deep equal
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check if every key-value pair in `a` matches that in `b`
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

const obj1 = { a: 1, b: [1, 2, 3], c: { d: 4, e: { f: 5, g: 6, h: 7 } } };
const obj2 = { a: 1, b: [1, 2, 3], c: { d: 4, e: { f: 5, g: 6, h: 7 } } };

console.log(deepEqual(obj1, obj2)); //true
```
