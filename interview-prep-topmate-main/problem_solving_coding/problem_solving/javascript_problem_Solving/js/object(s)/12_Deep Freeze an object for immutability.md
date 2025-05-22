```js
function deepFreeze(myObject) {
  for (let [key, value] of Object.entries(myObject)) {
    if (typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(myObject);
}

// Example usage
const myObject = {
  property1: 'value1',
  nestedObject: {
    property2: 'value2',
    innerNestedObject: {
      property3: 'value3',
    },
  },
};

console.log('Frozen', deepFreeze(myObject));

myObject.property1 = 'new value';
myObject.nestedObject.property2 = 'new value';
myObject.nestedObject.innerNestedObject.property3 = 'new value';
console.log('After mutating', myObject);

/*
Output:
Frozen
{
  property1: 'value1',
  nestedObject: { property2: 'value2', innerNestedObject: { property3: 'value3' } }
}
After mutating
 {
  property1: 'value1',
  nestedObject: { property2: 'value2', innerNestedObject: { property3: 'value3' } }
}
*/
```
