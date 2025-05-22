- Placing "use strict" at the top of the file
- If you're using classes, you already using "use strict" mode
- by using type="module" in index.html, it automatically enters into strict mode

<!-- HERE 1 -->

<img src="./images_used/Strict_Mode-1.png">


#### Example 1

- strict mode doesn't allow us to create acciedental variables.

```js
'use strict';
let variable = 'value';
vriable = 10;

console.log(variable, window.vriable);
```

<!-- HERE 2 -->

<img src="./images_used/Strict_Mode-2.png">


---

#### Example 2

- strict mode doesn't allow us to assign the read only properties.

```js
'use strict';
undefined = 10;
NaN = 10;

console.log(window.undefined);
```

<!-- HERE 3 -->

<img src="./images_used/Strict_Mode-3.png">


#### Example 3

- strict mode doesn't allow us to assign the read only properties.

```js
'use strict';
const obj = {};
Object.defineProperty(obj, 'readOnly', { writable: false, value: 10 });
obj.readOnly = 15;
console.log(obj);
```

<!-- HERE 4 -->

<img src="./images_used/Strict_Mode-4.png">


---

#### Example 4

- accidental typo in the parameters

```js
'use strict';

function combine(a, a, c) {
  return [a, a, c];
}

console.log(combine(1, 2, 3));
```

<!-- HERE 5 -->

<img src="./images_used/Strict_Mode-5.png">

---

#### Example 5

- Octal Literals
- Without use strict, it prints out 13 on the console.

```js
'use strict';
console.log(015);
```

<!-- HERE 6 -->


<img src="./images_used/Strict_Mode-6.png">

#### Example 6

- Adding prop to Primitives (Number, String, boolean, undefined, null)

```js
'use strict';
const v = 'value';
v.prop = 10;
console.log(v.prop);
```

<!-- HERE 7 -->

<img src="./images_used/Strict_Mode-7.png">

---

#### Example 7 (Without "use strict")

```js
function sum(a, b) {
  console.log(this); // prints Window object
  return a + b;
}

console.log(this); // prints Window object
sum(1, 2);
```

---

#### Example 8 (With "use strict")

- Only inside of a function, this value is undefined

```js
'use strict';
function sum(a, b) {
  console.log(this); // prints undefined
  return a + b;
}

console.log(this); // prints Window object
sum(1, 2);
```

---

#### Example 9 (With "use strict" using .bind() method)

- This is a good security feature because you don't want to expose the Window object all over the place
- Sometimes you want to prevent certain things from using the window object like Chrome Extensions

```js
'use strict';
function sum(a, b) {
  console.log(this); // prints Window object
  return a + b;
}

console.log(this); // prints Window object
sum.bind(this)(1, 2);
```

---

#### Example 10 (in strict mode)

```js
'use strict';
function sum(a, b) {
  a = 10;
  return [a + b, arguments[0] + arguments[1]];
}

console.log(sum(1, 2));
```

<!-- HERE 8 -->

<img src="./images_used/Strict_Mode-8.png">
<img src="./images_used/Strict_Mode-9.png">


- In `strict mode`, this <ins>**_dynamic linkage between named parameters and the arguments object is not present_**</ins>.

---

#### Example 11 (not in strict mode)

```js
function sum(a, b) {
  a = 10;
  return [a + b, arguments[0] + arguments[1]];
}

console.log(sum(1, 2));
```

<!-- HERE 9 -->

<img src="https://user-images.githubusercontent.com/42731246/215264867-bf92a1e4-207d-4a79-a65e-fdd6361f8e86.png">


- In `non-strict mode`, the **arguments** object within a function is <ins>**dynamically linked to the named parameters**</ins> of that function.
- If you change a parameter, the corresponding index in the arguments object is also updated, and vice versa.

- For the first sum function (without 'use strict'), <ins>**_when you assign a = 10, it also updates arguments[0] to 10 because of this dynamic linkage_**</ins>.

---
