#### 1. Fallback values

If the defined value is <strong>null or undefined</strong> then only use the fallback values.

```js
//lengthy code

let name;
if (user?.name) {
  name = user.name;
} else {
  name = "Anonymous";
}

// the same code can be written shortly like below
const name = user?.name ?? "Anonymous";
```

---

#### 2. Alternative for Long switch cases

```js
let dayFormatted = new Date().getDay();

// lengthy
let day;

switch (dayFormatted) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

// Shortly
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// OR
const days = `Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday`.split(
  ","
);

const day = days[dateNumber];
```

---

#### 3. Calls To Functions

For example if you have two functions, you can decide to call the function based on the conditions

```js
function f1() {}

function f2() {}

condition ? f1() : f2();
```

---

#### 4. Multiple String Checks

```js
// traditional lengthy
const checkVowels = (letter) => {
  return (
    letter === "a" ||
    letter === "e" ||
    letter === "i" ||
    letter === "o" ||
    letter === "u"
  );
};

// shortly
const isVowel = (letter) => /[aieou]/i.test(letter);
```

```js
// traditional for loop for an array
const arr = [1,2,3,4,5]

for(let i=0; i<arr.length, i++){
const element = arr[i]
//
}

// shortly using for of loop

for(const element of arr){
 //
}


// traditional for loop for an object
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const keys = Object.keys(obj)
for(let i=0; i< keys.length; i++){
 const key = keys[i]
 const value = obj[key]
}


// shortly using for-in loop

for(const key in obj){
 const value = obj[key]
}
```

---

#### 6. False checks

- If you want to check if a variable is false, null, undefined, 0, blank string, NaN <strong>You can use the logical Not (!)</strong>

```js
// lengthy

const isFalsey = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === 0 ||
    value === false ||
    value === NaN ||
    value === ""
  ) {
    return true;
  }
  return false;
};

//shortly

const isFalsey = (value) => !value;
```

---

#### 7. Ternary Operator for nested if else elseif conditions

```js
let info;

if (value < minValue) {
  info = "Value is too small";
} else if (value > maxValue) {
  info = "Value is too large";
} else {
  info = "Value is in range";
}

// shortly

let info =
  value < minValue
    ? "Value is too small"
    : value > maxValue
    ? "Value is too large"
    : "Value is in range";
```
