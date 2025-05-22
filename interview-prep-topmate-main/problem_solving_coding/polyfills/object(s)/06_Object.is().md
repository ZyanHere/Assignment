## Object.is()

**Definition**: sorts the elements of an array in place and returns the reference to the same array, now sorted. The default sort order is ascending

```js
//syntax:
sort(compareFn)
```

<strong>Approach Taken:</strong>

1. two if conditions
2. one is for NaN (x!==x && y!==y)
3. second if is for +0 and -0 (1/x === 1/y)
4. return x === y

```js
if (!Object.customIs) {
  Object.customIs = function (x, y) {
    // Handle the special case of NaN
    if (x !== x && y !== y) {
      return true;
    }

    // Handle the special case of +0 and -0
    if (x === 0 && y === 0) {
      return 1 / x === 1 / y;
    }

    // For all other cases, use ===
    return x === y;
  };
}

// Tests
console.log(Object.customIs(42, 42)); // true
console.log(Object.customIs('foo', 'foo')); // true
console.log(Object.customIs(false, false)); // true
console.log(Object.customIs(NaN, NaN)); // true
console.log(Object.customIs(+0, -0)); // false
console.log(Object.customIs(-0, -0)); // true
console.log(Object.customIs('foo', 'bar')); // false
console.log(Object.customIs([], [])); // false (different references)
```

```js
//Demo cases
// Object.is() is similar to === except following cases

---> Object.is(0, -0); // false
---> 0 === -0; // true

----> Object.is(NaN, NaN); // true
----> NaN === NaN; // false
```
