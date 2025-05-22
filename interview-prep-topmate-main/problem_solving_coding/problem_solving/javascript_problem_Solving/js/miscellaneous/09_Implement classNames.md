## Implement classNames

**Approach Taken**

1. accept your params as rest of args (...args)
2. core logic 1 is to flatten the args (args.flat(Infinity))
3. core logic 2 is to apply reduce loop for these flattenedArgs (ex: flattenedArgs.reduce(acc, currentValue))
4. core logic 3 is to apply a switch case with case breaks (Ex: switch(typeof item)){case 'string'}
5. points to be noted down: case 'string' and case 'number', we are simply pushing them to our accumulator default (ex; result array ===> result.push(item))
6. for case 'object' we are applying for of loop with Object.entries and pushing the `key` into the result

```js
function classNames(...args) {
  //ex: ["class1", "class2"].flat
  const flattenedArgs = args.flat(Infinity); //is useful when array has nested arrays
  console.log('args.flat', flattenedArgs);
  return flattenedArgs
    .reduce((result, item) => {
      if (item === null) return result;
      switch (typeof item) {
        case 'string':
        case 'number':
          result.push(item);
          break;
        case 'object':
          for (let [key, value] of Object.entries(item)) {
            if (!!value) {
              result.push(key);
            }
          }
          break;
      }

      return result;
    }, [])
    .join(' ');
}

// Test cases
console.log(classNames('class1', 'class2')); // "class1 class2"
console.log(classNames('class1', { class2: true, class3: false })); // "class1 class2"
console.log(classNames('class1', { class2: true, class3: false }, 'class4')); // "class1 class2 class4"
console.log(classNames(['class1', 'class2', ['class3', 'class4']])); // "class1 class2 class3 class4"
```
