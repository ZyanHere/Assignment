```js
console.log(1 == "1")
```

<details>
<summary>Solution</summary>

- true

<strong>Reason:</strong> double equal doesn't do strict check and it converts it so that they're both the same

- In this case, string will be converted into number

</details>

---

```js
console.log(1 === "1")
```

<details>
<summary>Solution</summary>

- false

<strong>Reason:</strong> tripe equal do strict check (as it checks both dataType and numbers)

- In this case, number is not equal to a string

</details>

---

```js
console.log(0 == "")
```

<details>
<summary>Solution</summary>

- true

<strong>Reason:</strong> Converting it types

- In this case, empty string means 0

</details>

---

```js
console.log(0 === "")
```

<details>
<summary>Solution</summary>

- false

<strong>Reason:</strong> As this checks the dataType, so returns false

</details>

---

```js
console.log(0 == false)
```

<details>
<summary>Solution</summary>

- true

<strong>Reason:</strong> Converting it types

- In this case, false means 0

</details>

---

```js
console.log(0 === false)
```

<details>
<summary>Solution</summary>

- false

<strong>Reason:</strong> Converting it types

- In this case, false means 0

</details>

---

```js
console.log(null == null)
```

<details>
<summary>Solution</summary>

- true

</details>

---

```js
console.log(null === null)
```

<details>
<summary>Solution</summary>

- true

<strong>Note:</strong> This is the only time you would see the null == null and null === null (both returns true)

</details>

---

```js
console.log(null == undefined)
```

<details>
<summary>Solution</summary>

- true

<strong>Reason:</strong> Both considered same when using double equal to

</details>

---

```js
console.log(null === undefined)
```

<details>
<summary>Solution</summary>

- false

</details>

---

```js
console.log(1 != "1")
```

<details>
<summary>Solution</summary>

- false

<strong>Reason:</strong> Both considered same because it is converting the values types so it check for (1 != 1) which is false

</details>

---

```js
console.log(1 !== "1")
```

<details>
<summary>Solution</summary>

- true

<strong>Reason:</strong> DataType check will happen and Number 1 is not equal to String 1 (returns true because they are not equal)

</details>

---

```js
console.log(null != undefined)
```

<details>
<summary>Solution</summary>

- false

</details>

---

```js
console.log(null !== undefined)
```

<details>
<summary>Solution</summary>

- true

</details>

---
