## DOM Traversal

#### getElementById

- You can only select one element because only one element can have an id.
- Add <strong>id attribute</strong> to div element or any other element in .html file.

<!-- HERE-1 -->


<img src="./images_used/DOM_Traversal-1.png">


- In the javascript file (script.js), you can access that id attribute using following code

```js
const grandParent = document.getElementById('grandparent-id'); // this should match the id attribute provided in .html file
grandParent.style.backgroundColor = '#333';
```

##### Same code in terms of re-usability

```js
const grandParent = document.getElementById('grandparent-id');

changeColor(grandParent);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

---

#### getElementsByClassName

- Since multiple elements can have classNames, it always returns a collection of elements (in our case two parent elements)

##### In .html file

<!-- HERE-2 -->

<img src="./images_used/DOM_Traversal-2.png">


##### In .js file

```js
const parents = Array.from(document.getElementsByClassName('parent'));
parents.forEach(changeColor); // changes the backgroundColor for both of the parent classes

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

---

#### QuerySelector

- To select a single element
- Uses <strong>#</strong> for id
- Uses <strong>.</strong> for class

#### Example for id traversal

```js
const grandParent = document.querySelector('#grandparent-id');
changeColor(grandParent);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

#### Example for class traversal

<!-- HERE-3 -->

<img src="./images_used/DOM_Traversal-3.png">


```js
const grandParent = document.querySelector('.grandparent');
changeColor(grandParent);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

##### In above case we only have one grandparent class (so it worked fine), what if we have two classNames with same naming (ex: below )

<!-- HERE-4 -->

<img src="./images_used/DOM_Traversal-4.png">

##### Below code only changeColor for 1st parent div

```js
const parent = document.querySelector('.parent');
changeColor(parent);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-5 -->

<img src="./images_used/DOM_Traversal-5.png">


---

#### querySelectorAll

- ##### To Solve the above problem we faced when two div elements have same classNames, we need to use this querySelectorAll

```js
const parents = document.querySelectorAll('.parent');
parents.forEach(changeColor);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-6 -->

<img src="./images_used/DOM_Traversal-6.png">

---

#### Selecting Children

- `grandparent` is the parent class in our case.
- two `parent` named classes are the `child` classes in our case.

```js
const grandParent = document.querySelector('.grandparent');
const parents = Array.from(grandParent.children); // To get the children classes

parents.forEach(changeColor);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-7 -->

<img src="./images_used/DOM_Traversal-7.png">


##### Let's say if we want to select the specific children (ex: first item)

```js
const grandParent = document.querySelector('.grandparent');
const parents = Array.from(grandParent.children);
const parentOne = parents[0];
const children = parentOne.children;

changeColor(children[0]);
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-8 -->

<img src="./images_used/DOM_Traversal-8.png">


---

#### Selecting Descendants

<!-- HERE-9 -->

<img src="./images_used/DOM_Traversal-9.png">


```js
const grandParent = document.querySelector('.grandparent');
const children = grandParent.querySelectorAll('.child');

children.forEach(changeColor);

function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-10 -->

<img src="./images_used/DOM_Traversal-10.png">


---

#### Selecting Parents

<!-- HERE-11 -->

<img src="./images_used/DOM_Traversal-11.png">




```js
const childOne = document.querySelector('#child-one');
const parent = childOne.parentElement;

changeColor(parent); // parent-div
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-12 -->
<img src="./images_used/DOM_Traversal-12.png">


##### Example 2:

```js
const childOne = document.querySelector('#child-one');
const parent = childOne.parentElement;
const grandParent = parent.parentElement;

changeColor(grandParent); // grandParent-div
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-13 -->

<img src="./images_used/DOM_Traversal-13.png">


---

#### Selecting Ancestors

- `closest` works from <ins>**_child to parent traversal_**</ins>
- We took the above code into consideration and removed the parent traversal.
- Output is same for above Example-2 and for this

##### The way how closest works (it looks from child to parent)

<!-- HERE-14 -->

<img src="./images_used/DOM_Traversal-14.png">


```js
const childOne = document.querySelector('#child-one');
const grandParent = childOne.closest('.grandparent');

changeColor(grandParent); // grandParent-div
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-15 -->

<img src="./images_used/DOM_Traversal-15.png">


---

#### nextElementSibling

- This is something like selecting the second box in our case

```js
const childOne = document.querySelector('#child-one');
const childTwo = childOne.nextElementSibling;

changeColor(childTwo);
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-16 -->

<img src="./images_used/DOM_Traversal-16.png">


#### previousElementSibling

- This is something like selecting the first box after been into second box

```js
const childOne = document.querySelector('#child-one');
const childTwo = childOne.nextElementSibling;

changeColor(childTwo.previousElementSibling);
function changeColor(element) {
  element.style.backgroundColor = '#333';
}
```

<!-- HERE-17 -->

<img src="./images_used/DOM_Traversal-17.png">

