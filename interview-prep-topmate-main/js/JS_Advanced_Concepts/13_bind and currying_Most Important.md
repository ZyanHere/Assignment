### 13. bind and currying

- we **can** reuse the function and pass any second parameter (Ex: 4 in the first case, 10 in the second case)

<img src="./images_used/compressed_Images/bind_&_currying-1.png">

<img src="./images_used/compressed_Images/bind_&_currying-2.png">


---

#### Examples

**_Explanation_**:

- `var b` is an object with a property name and a method say.
- The say method is a function that logs this to the console.
- In this case, `this` refers to the **object b itself** when say is called directly from b.

```js
var b = {
  name: 'jay',
  say() {
    console.log(this);
  },
};

b.say(); // {"name": "jay", say: f}
```

---

- `var c` is another object similar to b, but its say method returns a regular function that logs `this`.
- When `this` returned function is called, it does not retain the context of c because it is a regular function and not an arrow function.
- In `non-strict mode`, this defaults to the global object, which is window in a browser environment.
- When `c.say()` is executed, it returns the inner function (the one logging this). When this returned function is called immediately using `c.say()()`, it is actually a regular function call, not a method call, and the context this is not the c object but the global object window.

```js
var c = {
  name: 'jay',
  say() {
    return function () {
      console.log(this);
    };
  },
};

c.say()(); //Logs Window Object
```

- `var d` is an object with a method say that returns an arrow function. Arrow functions **do not have their own this context**; <u>**_they inherit this from the parent scope_**</u> at the time they are defined.

```js
var d = {
  name: 'jay',
  say() {
    return () => console.log(this);
  },
};

d.say()(); // {"name": "jay", say: f}
```

```js
// Both syntaxes does the same job,
say: function() { console.log(this) }
say() { console.log(this) }  ////introduced in ES6 (ECMAScript 2015).
```

---

#### Tricky Examples

##### 1.

**i)**

```js
var b = {
  name: 'jay',
  say: () => console.log(this),
};

b.say(); // Window Object
```

**ii)**

```js
var b = {
  name: 'jay',
  say: function () {
    console.log(this);
  },
};

b.say(); // Logs { name: 'jay' , say: f}
```

---

##### 2.

**i)**

```js
var c = {
  name: 'jay',
  say: function () {
    return function () {
      console.log(this);
    }.bind(window);
  },
};

c.say()(); // Window Object
```

**ii)**

```js
var c = {
  name: 'jay',
  say: function () {
    return function () {
      console.log(this);
    }.bind(this);
  },
};

c.say()(); // Logs { name: 'jay', say: f}
```

**iii)**

```js
var c = {
  name: 'jay',
  say: function () {
    return function () {
      console.log(this);
    };
  },
};

c.say()(); // Window Object
```

---

##### 3.

```js
var d = {
  name: 'jay',
  say: function () {
    return () => console.log(this);
  },
};

d.say()(); // {"name": "jay"}
```

---

##### 4.

```js
var d = {
  name: 'jay',
  say: function () {
    return () => console.log(this);
  },
};

var sayFunc = d.say.bind(window); // Binding `this` to `window`
sayFunc()(); // This will log the window object
```

---
