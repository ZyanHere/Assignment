### 16. Pass By Reference vs Pass By Value

<img src="./images_used/compressed_Images/Pass_by_Value_and_Pass_By_reference-1.png">


<ins>**Pass By Value**</ins>: `Primitives` follow this **pass by value**, which are only changed when a new value is assigned to them in memory.

e.g. If we have variables a & b (then <ins>**_they really don't know each other_**</ins>)

<img src="./images_used/compressed_Images/Pass_by_Value_and_Pass_By_reference-2.png">

**_Summary:_**

- Pass by value simply means **we copy the value** and we <ins>**_create that value somewhere else in memory_**</ins>.

<br/>

<ins>**Pass By Reference**</ins>: `Objects` follow this pass by reference.

- If you assign one of the object to another and If you change the reference of one object, then the other object also updates


<img src="./images_used/compressed_Images/Pass_by_Value_and_Pass_By_reference-3.png">


```js
//output:
{name: 'Yao', password: 'easypeasy',}
{name: 'Yao', password: 'easypeasy'}
```

<ins>**Solutions to avoid the above problem of referencing and mutation**:</ins>
**_Solution 1_**: `let clonedObj = Object.assign({}, originalObj)`
**_Solution 2_**: `let clonedObj = {...originalObj}`

<ins>**Limitations of` Object.assign` and `spread`**:</ins>

- This doesn't work for nested objects
- Because it <ins>**_does the shallow clone_**</ins>, which means it only clones first layer

```js
let obj = {
  a: 'a',
  b: 'b',
  c: { deep: 'try and copy' },
};

let clone1 = Object.assign({}, obj);
let clone2 = { ...obj };

obj.c.deep = 'hahaha';
console.log(obj); // {a: 'a', b: 'b', c: { deep: 'hahaha' }}
console.log(clone1); // {a: 'a', b: 'b', c: { deep: 'hahaha' }}
console.log(clone2); // {a: 'a', b: 'b', c: { deep: 'hahaha' }}
```

<ins>**Solution is "Deep Clone" instead of shallow clone**:</ins>

```js
let deepClone = JSON.stringify(JSON.parse(originalObj));
```

---

### Few more

### Pass By Value

- ##### Primitive Types like Number, Boolean, String, undefined, null

```js
let x = 10;
let y = 'Hi';
let x = true;
```

##### After assigning 'c' variable equal to 'a' (let c = a), <ins>_even if we change the 'c' value it doesn't effect the 'a' value because values are pointed out to separate memory location_</ins> here.

<img src="./images_used/compressed_Images/Pass_by_Value_and_Pass_By_reference-4.png">






### Pass By Reference:

- `Arrays`, `Objects`, `Classes` are passed by **reference** and thus can be modified.
- variable c is an array and it points out to the memory address.
- After assigning 'd' variable equal to 'c' (let d = c), it <ins>**_doesn't create a new memory location for variable 'd'_**</ins> (instead <ins>**_points out to the same memory_**</ins> address/location)
- after assigning (let d = c), <ins>**_if we are performing any operation on one of the variable (c or d), then it changes the values_**</ins> of both (variable c and d)

<ins> **Below is the example:**</ins>

-` variable c` and `variable d` now <ins>**prints [1,2,3]**</ins> if logged because they are pointing to same memory location.

<img width="571" alt="image" src="https://user-images.githubusercontent.com/42731246/213954630-910fa1bb-4eda-405e-8293-63fd3e342a24.png">

---

#### Example 2 (Pass By Reference)

- If we are assigning a new array to 'd' variable, it points out to new memory location
- So now if we update 'd' or 'c' they are independent to each other (doesn't change values of either 'c' if 'd' is updated or vice-versa)



---

#### Few Examples

```js
let a = 10;
let b = 'Hi';
let c = a;

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);
```

<details>
<summary>Solution</summary>
 a = 10

b = Hi
c = 10

</details>

---

```js
let a = 10;
let b = 'Hi';
let c = a;
c = c + 1; // incrementing by 1

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);
```

<details>
<summary>Solution</summary>
 a = 10

b = Hi
c = 11

</details>

---

```js
let a = 10;
let b = 'Hi';
let c = [1, 2]; // array
let d = c; // making both equal
d.push(3);

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);
console.log(`d = ${d}`);
```

<details>
<summary>Solution</summary>
 a = 10

b = Hi
c = 1,2,3
d = 1,2,3

</details>

---

```js
let a = 10;
let b = 'Hi';
let c = [1, 2]; // new array
let d = [3, 4, 5]; // assigning new array
d.push(6);

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);
console.log(`d = ${d}`);
```

<details>
<summary>Solution</summary>
 a = 10

b = Hi
c = 1,2
d = 3,4,5,6

</details>

---

```js
let c = [1, 2]; // new array
let d = c;

console.log(`c === d ${c === d}`);
console.log(`c == d ${c == d}`);
```

<details>
<summary>Solution</summary>
c === d true

c == d true

<strong>Reason:</strong> Both are pointing to same memory address

Ex:

```js
let c = [1, 2]; // 0x01
let d = c; // 0x01
```

</details>

---

```js
let c = [1, 2]; // new array
let d = [1, 2]; // new array

console.log(`c === d ${c === d}`);
console.log(`c == d ${c == d}`);
```

<details>
<summary>Solution</summary>
c === d false

c == d false

<strong>Reason:</strong> Both are pointing to different address

Ex:

```js
let c = [1, 2]; // 0x01
let c = [1, 2]; // 0x02
```

<strong>Note:</strong> Even though values are same in this case, as we are creating in a <strong>separate line, it takes new memory address</strong>

</details>

---

```js
let c = [1, 2]; // 0x01
console.log(`c = ${c}`);
add(c, 3);
console.log(`c = ${c}`);

function add(array, element) {
  array.push(element);
}
```

<details>
<summary>Solution</summary>
c = 1,2

c = 1,2,3

<strong>Reason:</strong> before invoking the function one console.log is printed and after invoking the function 'c' variable has performed the push operation (so it holds the '3' value in the array)

</details>

---

```js
const c = [1, 2]; // 0x01
c.push(3);
console.log(`c = ${c}`);
```

<details>
<summary>Solution</summary>
c = 1,2,3

</details>
