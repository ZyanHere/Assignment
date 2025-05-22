### 18. Functions are first class citizens:

**_1. Functions <ins>can be assigned to variables</ins> and properties of objects_**

```js
//1
var func = function () {};
```

**_2. We can also <ins>pass functions as arguments</ins> into a function._**

```js
//2
function a(fn) {
  fn();
}

a(function () {
  console.log('hi');
});
```

**_3. You can <ins>return functions as values</ins> from other functions_**

```js
//3
function b() {
  return function c() {
    console.log('bye');
  };
}

var d = b();
d();
```
