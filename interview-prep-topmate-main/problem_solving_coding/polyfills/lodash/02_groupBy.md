## Lodash groupBy

**Definition**: creates an object composed of keys generated from the results of running each element of collection through the iterate function. The order of the grouped values is determined by the order they occur in the collection.

```js
//sytnax:
groupBy(collection, [iterate]);
```

<strong>Approach Taken:</strong>

1. Object.customGroupBy is a function that accepts 2 params (array, callback)
2. create a finalObject to store
3. perform a forEach loop on your arr and for each item, pass it to the callback (ex: array.forEach(item)=>{
   const group = callback(item)
   })
4. if there is no group found in the groups Object, then create it as an empty array (ex: if(!groups[group])) groups[group] =[]
5. and push the iteration item of forEach (groups[group].push(item))

```js
Object.customGroupBy = function (array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  const groups = {};

  array.forEach((item) => {
    //this is the result of (product)=>product.category ex: in simpler terms it is the specific category here (Fruit or Vegetable)
    const group = callback(item);
    if (!groups[group]) {
      // if the groups object doesn't have that group (ex: Fruit as key) then it should create {Fruit: []}
      groups[group] = [];
    }
    groups[group].push(item); //{Fruit: []}.push(item) will be {Fruit: [ { name: 'Apple', category: 'Fruit' }]} for the first iteration
  });

  return groups; //is an object which has keys like Fruit, Vegetable
};

// Test the Object.customGroupBy function
const products = [
  { name: 'Apple', category: 'Fruit' },
  { name: 'Banana', category: 'Fruit' },
  { name: 'Carrot', category: 'Vegetable' },
  { name: 'Spinach', category: 'Vegetable' },
];

const groupedByCategory = Object.customGroupBy(
  products,
  (product) => product.category
);

console.log(groupedByCategory);

//Output:
/*{
    "Fruit": [
        {
            "name": "Apple",
            "category": "Fruit"
        },
        {
            "name": "Banana",
            "category": "Fruit"
        }
    ],
    "Vegetable": [
        {
            "name": "Carrot",
            "category": "Vegetable"
        },
        {
            "name": "Spinach",
            "category": "Vegetable"
        }
    ]
}*/
```
