#### 1. Ternary Operator

```js
// noob
let hungry = true;
let eat;

if (hungry === true) {
  console.log((eat = 'yes'));
} else {
  console.log((eat = 'no'));
}
```

```js
// pro
let hungry = true;
let eat = hungry ? console.log('yes') : console.log('no');
```

---

#### 2. Number to string (or) String to Number

```js
//noob
let num = 15;
let str = num.toString(); // num to string
console.log('string', str); // string 15
console.log('typeof', typeof str); //typeof string

let num1 = Number(str); // string to Number
console.log('number', num1); // number 15
console.log('typeof', typeof num1); // typeof number
```

```js
// pro
let num = 15;
let str = num + ''; // num to string
console.log('string', str); //string 15
console.log('typeof', typeof str); //typeof string

let num1 = +str; // string to Number
console.log('number', num1); //number 15
console.log('typeof', typeof num1); // typeof number
```

---

#### 3. Populating an array

```js
// noobs

let arraySize = 5;
let filledArray = [];
for (let i = 0; i < arraySize; i++) {
  filledArray[i] = { hello: 'goodbye' };
}
console.log(filledArray);

/*
[
  ({
    hello: 'goodbye',
  },
  {
    hello: 'goodbye',
  },
  {
    hello: 'goodbye',
  },
  {
    hello: 'goodbye',
  },
  {
    hello: 'goodbye',
  })
];
*/
```

```js
// pro
let arraySize = 5;
let filledArray = new Array(arraySize)
  .fill(null)
  .map(() => ({ hello: 'goodbye' }));

console.log(filledArray);
```

---

#### 4. Dynamic properties in objects

```js
//noobs
let dynamic = 'value';
let user = {
  id: 1,
};

user[dynamic] = 'other value';
console.log(user);

/*
{
    "id": 1,
    "value": "other value"
}
*/
```

```js
//pro

let dynamic = 'value';

let user = {
  id: 1,
  [dynamic]: 'other value',
};

console.log(user);

/*
{
    "id": 1,
    "value": "other value"
}
*/
```

---

#### 5. Removing Duplicates:

```js
//noob
let array = [100, 23, 23, 23, 23, 67, 45];

let outputArray = [];

let flag = false;

for (let j = 0; j < array.length; j++) {
  for (let k = 0; k < outputArray.length; k++) {
    if (array[j] === outputArray[k]) {
      flag = true;
    }
  }
  if (flag === false) {
    outputArray.push(array[j]);
  }
  flag = false;
}

console.log(outputArray); //[100, 23, 67, 45]
```

```js
//pro
let array = [100, 23, 23, 23, 23, 67, 45];

// 1 way
let outputArray = [...new Set(array)];

// 2nd way
// let outputArray = Array.from(new Set(array));

console.log(outputArray); //[100, 23, 67, 45]
```

---

#### 6. Array to Object:

```js
//noob
let arr = ['value1', 'value2', 'value3'];

let newObj = {};

for (let i = 0; i <= arr.length; i++) {
  if (arr[i] !== undefined) {
    newObj[i] = arr[i];
  }
}
console.log(newObj);
/*
{
    "0": "value1",
    "1": "value2",
    "2": "value3"
}
*/
```

```js
// pro
let arr = ['value1', 'value2', 'value3'];

let newObj = { ...arr };
console.log(newObj);

/*
{
    "0": "value1",
    "1": "value2",
    "2": "value3"
}
*/
```

---

#### 7. Object to Array:

```js
// noob
let numbers = {
  one: 1,
  two: 2,
};

let keys = [];

for (let number in numbers) {
  if (numbers.hasOwnProperty(number)) {
    keys.push(number);
  }
}

console.log(keys); // ['one', 'two']
```

```js
// pro
let numbers = {
  one: 1,
  two: 2,
};

let keys = console.log(Object.keys(numbers)); //[ 'one', 'two' ]
let values = console.log(Object.values(numbers)); // [ 1, 2 ]
let entries = console.log(Object.entries(numbers)); // [['one' : 1], ['two' : 2]]
```

---

#### 8. Short circuit conditionals:

```js
//Noob
if (docs) {
  getDocs();
}
```

```js
//pro
docs && getDocs();
```

---

#### 9. Use ^ to check if numbers are not equal:

```js
//noob
if(a!=123)

//pro
if(a^123)
```

---

#### 10. How to loop over an object:

```js
const age = {
  Rahul: 20,
  max: 16,
};

// Solution 1
const keys = Object.keys(age);
keys.forEach((key) => age[key]++);

console.log(age); // { Rahul: 21, max: 17 }

// Solution 2:

for (let key in age) {
  age[key]++;
}

console.log(age); // { Rahul: 22, max: 18 }
```

---

#### 11. Remember that Object keys are stored in insertion order:

```js
const obj = {
  name: 'Rahul',
  age: 16,
  address: 'Earth',
  profession: 'Developer',
};

console.log(Object.keys(obj)); // name, age, address, profession
```

---

#### 12. Check if value is an array

```js
const arr = [1, 2, 3];
console.log(typeof arr); // object
console.log(Array.isArray(arr)); // true
```

---

#### 13. Initialize an array of size n and fill with default values:

```js
const size = 5;

const defaultValue = 0;

const arr = new Array(size).fill(defaultValue);

console.log(arr); // [0, 0, 0, 0, 0]
```

---

#### 14. Truthy and False values

```js
//falsy
false, 0, '', null, undefined, NaN;
```

```js
//truthy
'Values', '0', {}, [];
```

---

#### 15. Double equal vs triple equal:

```js
// Double equal - Checks if the value is matched, ignores the Datatype
console.log('0' == 0); //true

//triple equal - Checks both value and datatype
console.log('0' === 0); //false
```

---

#### 16. Better way to accept arguments

##### 1. Example with Spread Operator in Function Call

```js
function downloadData({ url, resourceId, searchText, pageNo, limit } = {}) {
  // Function implementation
}

const params = {
  resourceId: 2,
  url: '/posts',
  searchText: 'WebDev',
  pageNo: 1,
  limit: 10,
};

// Use spread operator to pass parameters
downloadData({ ...params });
```

##### 2. Direct Use of Rest Parameters in Function Definition

```js
function downloadData(...args) {
  // args is an array of arguments
}

// This loses the benefits of named parameters
downloadData('/posts', 2, 'WebDev', 1, 10);
```

#### Example 1: Collecting Extra Arguments

```js
function logData(primaryData, ...additionalData) {
  console.log('Primary Data:', primaryData);
  console.log('Additional Data:', additionalData);
}

// Invocation
logData('Core Info', 'Extra 1', 'Extra 2', 'Extra 3');
```

#### Example 2: Flexible Function Invocation with Object Properties

```js
function fetchData({ url, method, ...rest }) {
  console.log(`Fetching ${url} with method ${method}`);
  console.log('Additional options:', rest);
}

// Invocation
fetchData({
  url: 'https://example.com/data',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});
```

#### Example 3: Using Spread Operator for Invocation with Merged Parameters

```js
const baseParams = {
  url: 'https://example.com/data',
  method: 'GET',
};

const extraParams = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

// Invocation
fetchData({ ...baseParams, ...extraParams });
```

#### Example 4

```js
function createProfile(name, age, occupation) {
  console.log(`Name: ${name}, Age: ${age}, Occupation: ${occupation}`);
}

const userDetails = ['Jane Doe', 28, 'Software Developer'];

// Using spread to pass array elements as individual arguments
createProfile(...userDetails);
```

#### Example 5

```js
function updateSettings({ theme = 'light', layout = 'grid' } = {}) {
  console.log(`Theme: ${theme}, Layout: ${layout}`);
}

// Passing only one parameter, others will use default
updateSettings({ theme: 'dark' });
```

---

#### 17. null vs undefined vs not defined

- `null` is an **assigned** value
- `undefined` is <ins>**missing** **initialization**</ins>
- `not defined` is (ex: let a = 1 is in the code and you are **logging b** which is not defined)
