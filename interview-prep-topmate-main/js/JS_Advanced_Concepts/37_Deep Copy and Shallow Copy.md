#### Deep Copy

If `x` and `y` variables **point out to two different locations after copying** then there is <ins>**_no connection between x and y variables_**</ins>

<i>On Primitive Types, we can make Deep Copy</i>

- Number
- String
- Boolean

##### Whenever you create a variable with these three types and you copy to another variable of same type, then you are making a Deep Copy.

<strong>Definition:</strong> A deep copy means that all of the values of the new variable are copied and disconnected from the original variable.

---

#### Shallow Copy

```js
let arr1 = [2, 3, 4];
console.log(arr1);
arr2 = arr1;
arr2.push(5);
console.log(arr2);
console.log(arr1);
```

<details>
<summary>Solution</summary>

```js
[2, 3, 4];
[2, 3, 4, 5];
[2, 3, 4, 5];
```

</details>

<strong>Definition:</strong> A shallow copy means that certain (sub-values) are still connected to the original variable.

---

#### <i>Shallow refers to the same reference and that is why if one of array/object is changed, you would see both the array/object is getting changed.</i>

#### <i>Deep copy refers to that it is disconnected from original variable after copying.</i>


<img src="./images_used/Deep_Copy_and_Shallow_Copy.jpg">


---

### Question 1 - Make this a deep copy

```js
function question1() {
  const arr1 = [1, 2, 3, 4];
  const arr2 = arr1;
  arr2.push(10);
  console.log('Array 2 is ' + arr2);
  console.log('Array 1 is ' + arr1);
}

question1();
```

<details>
<summary>Solution</summary>

```js
// Change this line to look like below in the above function
const arr2 = [...arr1];
```

</details>

---

### Question 2 - Make this a deep copy

```js
function question2() {
  const user1 = {
    name: 'Vasanth',
    channel: 'uncommon_geeks',
  };
  const user2 = user1;
  user2.name = 'coolVasanth';
  console.log(user2);
  console.log(user1);
}

question2();
```

<details>
<summary>Solution</summary>

```js
// Change this line to look like below in the above function
const user2 = { ...user1 }; // Approach 1
const user2 = Object.assign({}, user1); // Approach 2
```

</details>

---

### Question 3 - Make this a deep copy

```js
function question3() {
  const user1 = {
    name: 'Vasanth',
    channel: 'uncommon_geeks',
    location: {
      city: 'Bengaluru',
      state: 'karnataka',
    },
  };
  const user2 = user1;
  user2.location.city = 'Mysuru';
  console.log(user2);
  console.log(user1);
}

question3();
```

<details>
<summary>Solution</summary>

```js
// Change this line to look like below in the above function
const user2 = JSON.parse(JSON.stringify(user1));
```

</details>

<strong><u>Note:</u></strong> If a object is nested, Object.assign or Spread operator won't make a deep copy for nested object

---

### Question 4

```js
function question4() {
  const testObject1 = {
    sampleDate: new Date(),
  };
  const testObject2 = JSON.parse(JSON.stringify(testObject1)); // Do not use this liner as it prints different dataTypes
  console.log(testObject1); // Prints date as an object
  console.log(testObject2); // Prints a String
}

question4();
```

<strong><u>Note:</u></strong> If you want to use JSON.parse(JSON.stringify(object)) in order to convert from Shallow to Deep Copy on those object which contains <strong> Date </strong>, then the Date would be converted into <strong>string</strong> (instead of keeping it as a object)

---

### Question 5

```js
function question5() {
  const testObject1 = {
    sampleFunction: console.log,
    sampleUndefined: undefined,
  };
  const testObject2 = JSON.parse(JSON.stringify(testObject1));
  console.log(testObject1); // {sampleFunction: [Function: log], sampleUndefined: undefined}
  console.log(testObject2); // {}
}

question5();
```

<strong><u>Note:</u></strong> If you want to use JSON.parse(JSON.stringify(object)) in order to convert from Shallow to Deep Copy on those object keys which contains <strong>functions</strong> or which contains <strong>undefined</strong>, then do not use JSON.parse(JSON.stringify(object))

---

### Question 6

```js
function question6() {
  const testObject1 = {
    sampleFunction: question2,
    sampleInfinity: -Infinity,
    sampleNaN: NaN,
  };
  const testObject2 = testObject1;
  console.log(testObject1); // prints {sampleFunction, [Function: question2], sampleInfinity: -Infinity, sampleNaN: NaN }
  console.log(testObject2); // prints {sampleInfinity: null, sampleNaN: null }
}

question6();
```

<strong><u>Note:</u></strong> If you want to use JSON.parse(JSON.stringify(object)) in order to convert from Shallow to Deep Copy on those object keys which contains <strong>functions</strong> or which contains <strong>Infinity</strong> or which contains <strong>NaN</strong>, then do not use JSON.parse(JSON.stringify(object))

---

### Question 7 - How to deep copy JSON un-safe values ?

<details>
<summary>Solution</summary>

```js
1. Copying all values one after another.
2. Recursive copying all the values one after another
3. Using Libraries like lodash
```

</details>

---
