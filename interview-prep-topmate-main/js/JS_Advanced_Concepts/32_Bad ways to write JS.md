#### 1. Implicit type conversion:

Converting the datatype from one to another at runtime. For example concatenation two strings using + will result into a string datatype

So the problem is something looks like below with this Implicit type conversion:

```js
let result = "3" + 4 + 5; // '345'
let result2 = 3 + 4 + "5"; // '75'
```

---

#### 2. Using var keyword

It has scope problems, so better use the ES6 let, const for declaring variables

```js
function myVar1() {
  var ans = "baz";
  if (true) {
    var ans = "ball";
    console.log(ans); // ball
  }
  console.log(ans); //ball
}
myVar1();
```

```js
function myVar2() {
  let ans = "baz";
  if (true) {
    let ans = "ball";
    console.log(ans); // ball
  }
  console.log(ans); //baz
}
myVar2();
```

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// output 5, 5, 5, 5, 5
```

---

#### 3. Frequent manipulation of DOM

- Doing so causes page to re-render repeatedly which reduces the performance and user experience.
- Solution for this is Virtual DOM technology

```js
// not recommended DOM manipulation
// re-queries the DOM and updates it every time the button is clicked
document.getElementById("my-button").addEventlistener("click", function () {
  document.getElementById("my-text").innerText = "Hello World!";
});
```

```js
// recommended
// queries the DOM once, and then updates the element's text content
const myText = document.getElementById("my-text");
document.getElementById("my-button").addEventlistener("click", function () {
  myText.innerText = "Hello World!";
});
```

---

#### 4. Modifying the prototype object

```js
// this code works fine but we need to avoid modifying the prototype object

Array.prototype.sum = function () {
  return this.reduce(function (a, b) {
    return a + b;
  }, 0);

  var arr = [1, 2, 3];
  console.log(arr.sum()); //6
};
```

---

#### 5. Using global variables

- They can cause naming conflicts.

---

#### 6. Ignoring semi-colons

---

#### 7. Using a for-in loop

- This not only traverses the properties of the object but also traverses from the prototype chain (which may lead to unexpected results)

```js
const person = {
  name: "Alice",
  age: 30,
  gender: "female",
};

// not recommended
for (const key in person) {
  console.log(person[key]);
}

// recommended
Object.keys(person).forEach((key) => console.log(person[key]));
```

---

#### 8. Comparing NaN

- NaN is not equal to any value, so it is necessary to use a function to judge when comparing isNan()

```js
// not recommende
if (x == NaN) {
  return true;
}

//recommended
if (isNaN(x)) {
  return true;
}
```

---

#### 9. Using eval

- Is a way to execute string code,
- But it tends to cause security issues and performance issues

---

#### 10. Ignore Error Handling

```js
try {
  // write async code
} catch (e) {
  // handle error here
}
```

---

#### 11. Forgot to bind this keyword when passing function as parameter

- When passing a function as a parameter, you need to bind this keyword.

```js
const obj = {
  name: "Alice",
  greet: function () {
    console.log("Hello, my name is" + this.name);
  },
};

setTimeout(obj.greet, 1000); // Hello, my name is undefined
```

```js
const obj = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};
setTimeout(obj.greet.bind(obj), 1000); // Hello , Alice
```

---

#### Checkout the medium article

https://medium.com/@Choco23/11-bad-ways-to-write-javascript-fec3869632eb
