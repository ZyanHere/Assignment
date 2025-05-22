##### HTML page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body></body>
</html>
```

---

#### append

- With append, you can append anything (including elements)

```js
// script.js
const body = document.body;
body.append('Hello World');
```

<img src="./images_used/DOM_Manipulation-1.png">


---

##### appendChild

- With appendChild, you can only append elements like div, span

```js
const body = document.body;
body.appendChild('Hello World');
```

<img src="./images_used/DOM_Manipulation-2.png">

---

##### Creating a div element and append to body

- In script.js file

```js
// script.js
const body = document.body;
const div = document.createElement();
body.append(div);
```

<img src="./images_used/DOM_Manipulation-3.png">


---

##### Adding text to a div element

```js
// script.js
const body = document.body;
const div = document.createElement();
div.innerText = 'Hello World';
// div.textContent = "Hello World"; (can be also used)
body.append(div);
```

<img src="./images_used/DOM_Manipulation-4.png">
<img src="./images_used/DOM_Manipulation-5.png">


---

#### innerText vs textContent

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span>Hello</span>
      <span style="display:none">Bye</span>
    </div>
  </body>
</html>
```

```js
const div = document.querySelector('div');
console.log(div.textContent); // prints everything like indentation
console.log(div.innerText); // just prints out the text

// innerText doesn't print the text if it is not visible
```

<img src="./images_used/DOM_Manipulation-6.png">


---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span id="hi">Hello</span>
      <span id="bye">Bye</span>
    </div>
  </body>
</html>
```

```js
//script.js
const body = document.body;
const div = document.querySelector('div');
const spanHi = document.queerySelector('#hi');
const spanBye = document.queerySelector('#bye');

spanBye.remove(); // removes the element
```

<img src="./images_used/DOM_Manipulation-7.png">



---

#### Another Example (adding title attribute):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span title="hello" id="hi">Hello</span>
      <span id="bye">Bye</span>
    </div>
  </body>
</html>
```

```js
//script.js
const body = document.body;
const div = document.querySelector('div');
const spanHi = document.querySelector('#hi');
const spanBye = document.querySelector('#bye');

console.log(spanHi.getAttribute('id')); // prints out the id which is "hi"
console.log(spanHi.getAttribute('title')); // prints out the tile which is "hello"

// We can also use below instead of getAttribute()
console.log(spanHi.id);
console.log(spanHi.title);

// Similary we can setAttribute
spanHi.setAttribute('id', 'sdfsdfsd');

// We can also use below instead of setAttribute()
spanHi.id = 'sdfsdfsd';
```

<img src="./images_used/DOM_Manipulation-8.png">



##### removeAttribute

<img src="./images_used/DOM_Manipulation-9.png">

---

#### Another Example (adding data-test attribute):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span title="hello" id="hi" data-test="this is a test">Hello</span>
      <span id="bye">Bye</span>
    </div>
  </body>
</html>
```

```js
//script.js
const body = document.body;
const div = document.querySelector('div');
const spanHi = document.querySelector('#hi');
const spanBye = document.querySelector('#bye');

console.log(spanHi.dataset);
```
<img src="./images_used/DOM_Manipulation-10.png">


---

#### Another Example (adding data-longer-name attribute):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span
        title="hello"
        id="hi"
        data-test="this is a test"
        data-longer-name="sdsdfsd"
        >Hello</span
      >
      <span id="bye">Bye</span>
    </div>
  </body>
</html>
```

```js
//script.js
const body = document.body;
const div = document.querySelector('div');
const spanHi = document.querySelector('#hi');
const spanBye = document.querySelector('#bye');

console.log(spanHi.dataset);
console.log(spanHi.dataset.longerName); // you can access from the DOM
spanHi.dataset.longerName = 'hi'; // you can modify
```

---

#### Another Example (adding class attribute):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div>
      <span title="hello" id="hi" class="hi1 hi2">Hello</span>
      <span id="bye">Bye</span>
    </div>
  </body>
</html>
```

```js
//script.js
const body = document.body;
const div = document.querySelector('div');
const spanHi = document.querySelector('#hi');
const spanBye = document.querySelector('#bye');

spanHi.classList.add('new-class'); //add
spanHi.classList.remove('hi1'); //remove

// removes hi2 if it is there, otherwise it adds hi2
spanHi.classList.toggle('hi2'); //toggle

// automatically removes if false is passed
spanHi.classList.toggle('hi2', false); //toggle

// automatically add the class if true is passed
spanHi.classList.toggle('hi2', true); //toggle
```

<img src="./images_used/DOM_Manipulation-11.png">


---
