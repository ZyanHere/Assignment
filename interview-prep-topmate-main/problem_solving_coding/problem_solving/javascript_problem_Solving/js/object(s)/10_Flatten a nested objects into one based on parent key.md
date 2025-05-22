## Flatten a nested objects into one based on parent key

- you will ***pass a nested object as a param***
- apart from that we are maintain **two default parameters** (one is for ***parentKey***, and one is for ***result obj*** which we return at the end).
- simply do a ***for of loop*** based on*** Object.entries(your_deeply_nested_obj)***
- ***key, value*** pairs will be coming out of our ***for of loop***. (***Remember this***)
- store a new variable for ***newKey variable which checks if parentKey is true then parentKey.key will be our variable else key***
- core logic is to check ***if our value is of `type object`, then do recursion*** flattenFn(value, newKey, result)
- else logic is to ***simply add to our result obj, result[newKey] = value***
- return ***result***

```js
function flattenObject(obj, parentKey = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// Example Object
const response = {
  name: 'Manu',
  age: 21,
  characteristics: {
    height: '6 feet',
  },
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'Nextjs',
      version: '12',
    },
  },
};

const flattenedResponse = flattenObject(response);
console.log(flattenedResponse);

/*
Output will be:
{
    age: 21,
    characteristics.height: "6 feet",
    name: "Manu",
    techStack.framework.name: "Nextjs",
    techStack.framework.version: "12",
    techStack.language: "Javascript"
}
*/
```
