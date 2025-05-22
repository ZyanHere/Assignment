## String.prototype.charAt()

**Definition**: returns a new string at the given index.

```js
//syntax:
charAt(index);
```

<strong>Approach Taken:</strong>

1. by default we will consider the param index = 0
2. if index is less than 0 or index is greater than or equal to length of string then `return ''`
3. core logic is : `return this[index]`

```js
if (!String.prototype.customCharAt) {
  String.prototype.customCharAt = function (index = 0) {
    if (index < 0 || index >= this.length) {
      return '';
    }
    return this[index];
  };
}

// Tests
const str = 'Hello, world!';
console.log(str.customCharAt(0)); // "H"
console.log(str.customCharAt(7)); // "w"
console.log(str.customCharAt(50)); // ""
console.log(str.customCharAt(-1)); // ""
```
