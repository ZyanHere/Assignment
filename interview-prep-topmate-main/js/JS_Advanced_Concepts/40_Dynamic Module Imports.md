```js
// user.js
export default class User {
  constructor(first, last) {
    this.first = first
    this.last = last
  }
}

export function printUser(user) {
  console.log(`${user.first}${user.last}`)
}
```

```js
// script.js

// Below are the static imports which we usually do everyday

/* This line says that it is first going to download our script.js file and then
 immediately it downloads this user.js file as soon as the page loads */

/* If you are using webpack, then user.js and script.js are going to get combined as one file which gets downloaded */

// In short terms, as soon as the page loads, files gets downloaded.

import User, { printUser } from "./user.js"

const user = new User("Kyle", "Cook")

printUser(user)
```

#### Dynamic Module Import:

- With this, we can make certain codes in our application only get loaded after our initial page loads or they get loaded at some later point or they don't even get loaded at all

```js
// script.js
import(".user.js").then(({ default: User, printUser }) => {
  const user = new User("Kyle", "Cook")
  printUser(user)
})
```

---

#### The Big difference

- This is only going to get loaded when we call this import function
- If we wrap our above code in setTimeout (page is going to load and then after 5 seconds it is going to download the above code)
- If you have a bundler in this above scenario, then instead of combining both script.js and user.js <b><i>It will only going to download script.js</i></b> and then <strong>after five seconds</strong> it is going to download all the code inside your user.js
- So this is going to lead to quicker speeds for loading the pages

---

#### First most useful Example:

<strong> Code Splitting: </strong> Splitting up the code into different bundles so you only have to download the minimal amount of code at first and then if you need extra code you'll download it as you go.

---

##### Ex: Admin code is not required to download if user itself is not an admin.

- If you normally import like this, it is going to download admin.js by the user even if you're not an admin user.

- So every single person downloads this and then only admins are actually going to run the code

- So for most of your users you're downloading all this code in admin.js which could be a huge file but most of the users are never actually using it.

```js
import { setupAdminUser } from "./admin.js"

if (user.admin) {
  setupAdminUser()
}
```

---

##### To solve the above error, Dynamic module import comes into picture

- Only if we are admin user, then we are going to download this code

```js
if (user.admin) {
  import("./admin.js").then(({ setupAdminUser }) => {
    setupAdminUser()
  })
}
```

---

##### Another Example

```js
const user = { locale: "sp" }
import(`./${user.locale}-translations.js`)
  .catch(() => import("./en-translations.js"))
  .then(({ default: translations }) => {
    console.log(translations.HI)
  })
```

---

#### Increase Code performance

##### Normal Scenario:

```js
// script.js

import renderRectangle from "./rectangle.js"
import renderTriangle from "./triangle.js"

const shapes = [
  { type: "rectangle" },
  { type: "triangle" },
  { type: "rectangle" },
]

shapes.forEach((shape) => {
  switch (shape.type) {
    case "rectangle":
      renderRectangle(shape)
      break
    case "triangle":
      renderTriangle(shape)
      break
  }
})
```

##### Using Dynamic Module Imports:

- By this approach, The best part is we only ever render the shape which is actually provided (otherwise we are not importing)

```js
const shapes = [
  { type: "rectangle" },
  { type: "triangle" },
  { type: "rectangle" },
]

shapes.forEach((shape) => {
  import(`./${shape.type}.js`).then(({ default: render }) => {
    render(shape)
  })
})
```

##### Example of Code Performance:

- Now we only have rectangle shape (so we are now only render rectangle) which is just going to save us time ,memory and space

```js
const shapes = [{ type: "rectangle" }, { type: "rectangle" }]

shapes.forEach((shape) => {
  import(`./${shape.type}.js`).then(({ default: render }) => {
    render(shape)
  })
})
```

##### Code refactored to async await:

```js
const shapes = [{ type: "rectangle" }, { type: "rectangle" }]

shapes.forEach(async (shape) => {
  const { default: render } = await import(`./${shape.type}.js`)
  render(shape)
})
```

---
