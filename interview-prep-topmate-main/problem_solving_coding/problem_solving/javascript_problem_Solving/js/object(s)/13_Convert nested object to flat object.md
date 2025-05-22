### Input:

```js
{
   "user":{
      "name":"John",
      "tech":"Frontend",
      "address":{
         "home":{
            "add_1":"home_dummy_add_1",
            "add_2":"home_dummy_add_2"
         },
         "office":{
            "add_1":"off_dummy_add_1",
            "add_2":"off_dummy_add_2"
         }
      }
   }
}
```

### Expected Output:

```js
{
  user_name: 'John';
  user_tech: 'frontend';
  user_address_home_add_1: 'home_dummy_add_1';
  user_address_home_add_2: 'home_dummy_add_2';
  user_address_office_add_1: 'off_dummy_add_1';
  user_address_office_add_2: 'off_dummy_add_2';
}
```

---------

```js
/**
 * Function to flatten a nested object.
 * @param {Object} obj - The object to be flattened.
 * @param {String} parentKey - The base key to prefix (used during recursion).
 * @param {Object} result - The resulting flat object (accumulated during recursion).
 * @returns {Object} - The flattened object.
 */

// ACTUAL SOLUTION
function flattenObject(obj, parentKey = '', result = {}) {
  // Iterate over each key-value pair in the input object
  for (const [key, value] of Object.entries(obj)) {
    // Construct the new key with the parent key prefix
    const newKey = parentKey ? `${parentKey}_${key}` : key;

    // Check if the value is an object (and not null or an array)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively flatten the nested object
      flattenObject(value, newKey, result);
    } else {
      // Assign the value to the flattened object with the new key
      result[newKey] = value;
    }
  }
  return result; // Return the accumulated result
}

// Example input object
const input = {
  user: {
    name: 'John',
    tech: 'Frontend',
    address: {
      home: {
        add_1: 'home_dummy_add_1',
        add_2: 'home_dummy_add_2',
      },
      office: {
        add_1: 'off_dummy_add_1',
        add_2: 'off_dummy_add_2',
      },
    },
  },
};

// Flatten the input object
const flattened = flattenObject(input);

// Format the flattened keys to snake_case
const formatted = Object.keys(flattened).reduce((acc, key) => {
  // Replace camelCase with snake_case and convert to lowercase
  acc[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = flattened[key];
  return acc;
}, {});

console.log(formatted);
```

### Output explanation:
  - The `formatted` object is created by transforming the keys of the `flattened` object:
  - Each camelCase key is converted to snake_case and lowercased.