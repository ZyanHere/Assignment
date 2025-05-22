#### User Component (user.js)

```js
// default export
export default class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

// named export
export function printName(user) {
  console.log(`User's name is ${user.name}`)
}

// named export
export function printAge(user) {
  console.log(`User is ${user.age} years old`)
}
```

#### In order to import this above User Component to another Component make sure "<i>type is provided as module</i>"

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Modules</title>
    <script type="module" defer src="main.js"></script>
</head>
<body>
</body>
</html>
```

#### 2nd Component (main.js)

```js
import User from "/user.js"

const user = new User("Bob", 23)
console.log(user) // {name: "Bob", age: 23}
```

<strong>Note:</strong>

- As we have exported User class component as default, while we are importing <strong>we can use any name</strong> (ex: U, User, UserComponent)
- If we are using the named exports <strong>then we need to import as per the exact name</strong> provided (in the curly brackets)

##### Example to import the named exports

```js
import { printName, printAge } from "/user.js"
```

---

#### If we want to change the import name as per our convenience then below is the format

```js

// Syntax: import {actualModuleName as desiredModuleName}
import {printName as printUserName}

```

---

#### Suggestion:

###### Babel makes us using modules so much easier and it is straight forward as it automatically do the conversion for us.
