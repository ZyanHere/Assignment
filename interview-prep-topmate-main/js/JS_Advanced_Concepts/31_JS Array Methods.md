#### Original Array:

```js
const items = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 500 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 25 },
]
```

### Following are the Javascript Methods:

#### 1. filter Method (Filter out the array)

- ##### Doesn't mutate the original array

```js
const filteredItems = items.filter((item) => {
  return item.price <= 100
})

console.log(filteredItems)
// [{name: "Bike", price: 100}, {name: "Album", price: 10}, {name: "Book", price: 5}, {name: "Keyboard", price: 25} ]
```

---

#### 2. map Method (Mapping out the array)

- ##### Doesn't mutate the original array

```js
const itemNames = items.map((item) => {
  return item.name
})

console.log(itemNames)
// ["Bike", "TV", "Album", "Book", "Phone", "Computer", "Keyboard"]
```

---

#### 3. find Method (Finds the first instance/single Object in an array and returns that)

- ##### Doesn't mutate the original array

```js
const foundItem = items.find((item) => {
  return item.name === "Book"
})

console.log(foundItem)
// {name: "Book", price: 5}
```

---

#### 4. forEach Method

- ##### Mutates the original array
- ##### Doesn't return anything

```js
items.forEach((item) => {
  console.log(item.name)
})
```

<img width="342" alt="image" src="https://user-images.githubusercontent.com/42731246/213860706-e4a7b4e8-bc2d-4e5c-9a21-207c7358b53d.png">

---

#### 5. some Method (returns boolean based on the condition)

- ##### Doesn't mutate the original array
- ##### Checks if one of them item in the array satisfies the condition

```js
const hasInExpensiveItems = items.some((item) => {
  return item.price <= 100
})
console.log(hasInExpensiveItems) // true
```

---

#### 6. every method (returns boolean based on the condition)

- ##### Doesn't mutate the original array
- ##### Checks if every item in the array satisfies the condition

```js
const hasInExpensiveItems = items.every((item) => {
  return item.price <= 100
})
console.log(hasInExpensiveItems) // false
```

---

#### 7. reduce method (sums up into single value)

- ##### Doesn't mutate the original array
- ##### 1st param is whatever the previous iteration of this array return and the second item is actually what the item in the array.

- ##### For Example the currentTotal provided default value is 0

```js
const total = items.reduce((currentTotal, item) => {
  return item.price + currentTotal
}, 0)
console.log(total) // 1840
```

---

#### 8. includes method (returns boolean)

- ##### Doesn't mutate the original array

```js
const items = [1, 4, 121, 5, 6, 2]
```

```js
const includesTwo = items.includes(2)
console.log(includesTwo) // true
```

---
