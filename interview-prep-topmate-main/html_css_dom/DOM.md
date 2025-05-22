## 1. What is the DOM, and how does it relate to HTML?

#### DOM

- The DOM, or Document Object Model, is a programming interface for web documents.
- It **_<u>represents the page so that programs can change the document structure, style, and content</u>_**.
- The **_<u>DOM provides a representation of the document as a structured group of nodes and objects that have properties and methods</u>_**.

#### HTML

- describes the structure of web pages using markup
- **When a web page is loaded, <u>the browser creates a DOM of the page</u>**.
- The **_<u>HTML document serves as the blueprint for the DOM</u>_**.
- **Once the HTML code is parsed by the browser**, **_<u>it is converted into a DOM</u>_**
- This process allows dynamic access and manipulation of the content, structure, and style of the document.

##### In summary, while <u>HTML provides the raw material (markup) for the page</u>, the <u>_DOM is what browsers actually use to render the page and enable dynamic interaction and manipulation_</u> through scripting languages like JavaScript.

---

## 2. How can you access elements in the DOM using JavaScript?

Following are the most commonly used methods to access and manipulate elements in the DOM:

```js
//getElementById(id):
// Selects a single element by its ID. This is one of the most efficient ways to select an element.
var element = document.getElementById('myElementId');
```

```js
//Returns a live HTMLCollection of all elements with the specified class name.
var elements = document.getElementsByClassName('myClassName');
```

```js
//Returns a live HTMLCollection of elements with the given tag name.
var elements = document.getElementsByTagName('div');
```

```js
// Returns the first element that matches a specified CSS selector(s) in the document.
var element = document.querySelector('.myClassName');
```

```js
//Returns a static NodeList containing all elements that match a specified CSS selector(s) in the document.
var elements = document.querySelectorAll('p.myClassName');
```

```js
//Returns a NodeList of all elements with a specified name attribute.
var elements = document.getElementsByName('myElementName');
```

For example, once you have selected an element, you can change its properties, apply styles, add event listeners, or even remove it from the document. Here's a simple example of how you might change the text content of an element:

```js
document.getElementById('myElementId').textContent = 'New text content!';
```

---

## 3. How can you dynamically create HTML elements using JavaScript?

#### 1. Create the Element

```js
var newDiv = document.createElement('div');
newDiv.id = 'myNewDiv';
newDiv.className = 'my-div-class';
newDiv.setAttribute('data-custom', 'value');
newDiv.textContent = 'Hello, world!';
// OR
newDiv.innerHTML = '<strong>Hello, world!</strong>';
```

#### 2. Append the Element to the DOM

```js
document.body.appendChild(newDiv);
// OR
var parentDiv = document.getElementById('parentDiv');
parentDiv.appendChild(newDiv);
```

---

## 4. How can you modify CSS properties of an element in the DOM using JavaScript?

- Using the style Property

```js
var element = document.getElementById('myElement');
element.style.color = 'blue';
element.style.fontSize = '20px';
```

- Using setProperty

```js
var element = document.getElementById('myElement');
element.style.setProperty('--my-custom-color', 'green');
element.style.setProperty('background-color', 'yellow');
```

- Modify CSS classes

```js
// Modify classes
element.classList.add('new-class');
element.classList.remove('old-class');
```

---

## 5. Explain the purpose of the setAttribute and getAttribute methods in DOM manipulation.

#### setAttribute

- is used to **_<u>set or update the value of an existing attribute on the specified element</u>_** on a specified element

```js
//syntax
element.setAttribute(attributeName, value);
```

```js
var button = document.getElementById('myButton');
button.setAttribute('type', 'button');
button.setAttribute('disabled', '');
```

#### getAttribute

- The getAttribute method is used to retrieve the value of a specified attribute on an element.
- If the element does not have the specified attribute, null is returned.

```js
var buttonType = button.getAttribute('type');
console.log(buttonType); // Outputs: button
```

---

## 6. What is the difference between appendChild and insertBefore methods for adding elements to the DOM?

- both **_<u>used to add elements to the Document Object Model (DOM)</u>_** in web development, but they serve slightly different purposes and operate in different ways.

#### appendChild

- **_<u>Adds a new child node to the end of the list of children</u>_** of a specified parent node.
- If the given child is a reference to an existing node in the document, **appendChild moves it from its current position to the new position** (there is no requirement to remove the node from its parent node before appending it to some other node).

```js
Syntax: parentNode.appendChild(childNode);
```

**Example Use Case**: If you have a list of items `(<ul> or <ol>)`, using appendChild to add a new item `(<li>)` **_<u>will add this item to the end of the list</u>_**.

---

#### insertBefore

- **<u>Inserts a new node before the reference node as a child</u>** of a specified parent node.
- **If the reference node is null, <u>the new node is added to the end of the list of children</u>**, similar to how appendChild works.

```js
Syntax: parentNode.insertBefore(newNode, referenceNode);
```

- **Example Use Case**: **_<u>If you want to insert a new item at a specific position in a list (not necessarily at the end)</u>_**, you would use insertBefore, specifying the new item to insert and the item that should come after the new item.

<u>**Summary**</u>:

- insertBefore offers more control over the position where the new node is inserted, making it suitable for scenarios where order matters. appendChild is simpler and more straightforward when you just need to add a node to the end of a parent node's children.

---

## 7. How do you remove elements from the DOM using JavaScript?

#### Using removeChild()

- **_<u>Allows you to remove a child node from the DOM</u>_** and requires you to work from the parent node of the element you wish to remove.

```js
var parent = document.getElementById('parentElementId');
var child = document.getElementById('childElementId');
parent.removeChild(child);
```

#### Using remove()

- The `remove()` method **allows you to remove an element directly without having to reference its parent node**. This method is simpler and more direct than removeChild(), but it's not supported in Internet Explorer.

---

## 8. What is the purpose of the parentNode property in DOM manipulation?

- is crucial for **_<u>navigating and managing the hierarchical structure</u>_** of the Document Object Model (DOM).

#### 1. Hierarchical Navigation

- The parentNode property **_provides a way to access the parent element <u>of a specific node</u>_** in the DOM tree.

#### 2. DOM Manipulation

- It is often used in conjunction with methods like `appendChild()`, `removeChild()`, and `replaceChild()` to manipulate the DOM.

```js
var childElement = document.getElementById('childElement');
var parentElement = childElement.parentNode; // Access the parent node
parentElement.removeChild(childElement); // Remove the child element
```

---

## 9. Explain how to clone an element in the DOM using JavaScript.

- can be achieved with the `cloneNode()` method

**Syntax:**
The cloneNode() method **<u>comes with a single boolean parameter</u>**:

- If you pass `true`, the method **performs a <u>deep clone</u>**, meaning **<u>it clones the node and all of its descendants</u>**.
- If you pass `false`, or use no parameter, it performs a **<u>shallow clone</u>**, meaning it **<u>clones only the node itself without any of its children</u>**.

```js
// SHALLOW CLONE:
// Select the element to clone
var originalElement = document.getElementById('originalElement');

// Clone the element without its children
var clonedElement = originalElement.cloneNode(false);

// Optionally, append the cloned element to the document to make it visible
document.body.appendChild(clonedElement);
```

```js
// Select the element to clone
var originalElement = document.getElementById('originalElement');

// Clone the element along with its children
var clonedElement = originalElement.cloneNode(true);

// Optionally, append the cloned element to the document to make it visible
document.body.appendChild(clonedElement);
```

#### Considerations:

- **Attributes**: Both shallow and deep clones include the original node's attributes. However, some properties (like event listeners) are not copied with the clone. If you need the cloned element to have the same event listeners as the original, **<u>you must add them to the clone explicitly after cloning</u>**.
- **IDs**: If the original element has an id attribute, remember that id values must be unique within a document. If you append a cloned element with the same id as the original to the document, **_<u>you should either remove the id attribute from the clone or change it to a new value</u>_**.
- **Appending the Clone**: <u>Cloning an element does not automatically insert the clone into the DOM</u>. <u>You need to **append the cloned node to the document** using methods like `appendChild()` or `insertBefore()` to make it part of the document's structure</u>.

---

### 10. How do you check if an element exists in the DOM using JavaScript?

```js
if (document.getElementById('myElementId')) {
  console.log('Element exists in the DOM.');
} else {
  console.log('Element does not exist in the DOM.');
}
```

```js
if (document.querySelector('.myClass')) {
  console.log('Element exists in the DOM.');
} else {
  console.log('Element does not exist in the DOM.');
}
```

```js
if (document.querySelectorAll('.myClass').length > 0) {
  console.log('One or more elements exist in the DOM.');
} else {
  console.log('No elements exist in the DOM.');
}
```

---

## 11. What is the purpose of the classList property, and how can you use it to manipulate classes?

- is a **read-only property** that **_<u>returns a live DOMTokenList collection of the class attributes of an element</u>_**
- This property provides a convenient means to **<u>access and manipulate the list of classes currently assigned to an element</u>** in the DOM.

#### Purpose of classList

- Simplify Class Manipulation: **Before classList**, adding or removing classes from an element **<u>required manipulating the class attribute directly</u>**, often involving string operations. classList simplifies this process with straightforward methods.
- It **<u>allows developers to easily change an element's appearance or behavior</u>** based on user interactions, conditions, or events **<u>by adding or removing classes that are linked to specific CSS styles or JavaScript functionality</u>**.

```js
//Adds one or more classes to an element.
element.classList.add('my-class');
```

```js
//Removes one or more classes from an element.
element.classList.remove('my-class');
```

```js
element.classList.toggle('my-class'); // Toggles the presence of 'my-class'
element.classList.toggle('my-class', condition); // Adds or removes 'my-class' based on the truthiness of 'condition'
```

```js
//Checks if an element contains a certain class, returning true if it does and false otherwise.
if (element.classList.contains('my-class')) {
  console.log('Element has the class.');
} else {
  console.log('Element does not have the class.');
}
```

```js
//Replaces an existing class with a new class. If the old class does not exist, it will not add the new class.
element.classList.replace('old-class', 'new-class');
```

---

## 12. How can you traverse the DOM tree using JavaScript?

### 1. Parent Node Traversal

- Returns the parent node of the specified node. If the node has no parent, it returns null.

### 2. Child Nodes Traversal

- `childNodes`: **Returns a live NodeList** containing all the child nodes of a node.
- `firstChild`: **Returns the first child node** of a node, or null if the node has no children.
- `lastChild`: **Returns the last child node of a node**, or null if the node has no children.
- `children`: **Returns a live HTMLCollection of the child elements** (ignores text nodes and comments).
- `firstElementChild`: **Returns the first child element** of a node, or null if the node has no child elements.
- `lastElementChild`: **Returns the last child element** of a node, or null if the node has no child elements.

---

13. What are data attributes (data-\*), and how can you use them in DOM manipulation?

- provide a way to store extra information on HTML elements **_<u>without using any non-standard attributes</u>_** or **additional DOM properties**.

#### Purpose of Data Attributes:

- Store additional information directly within HTML elements in a structured way, **_<u>without the need for external storage</u>_** (like JavaScript variables).
- **<u>Keep the data closely associated with the element it describes</u>**, enhancing readability and maintainability.
- Use in CSS to style elements based on their data attribute values.
- Easily access and manipulate using JavaScript, which is particularly useful for dynamic HTML and web applications.

```js
// data-*, * can be anything except Uppercase letters
 For example, data-id, data-name, and data-value are all valid data attribute names.
```

```js
// HTML element: <div id="example" data-user-id="12345"></div>

var element = document.getElementById('example');
var userId = element.dataset.userId; // Accesses data-user-id
console.log(userId); // Outputs: 12345
```

```js
// HTML element: <div id="example"></div>

var element = document.getElementById('example');
element.dataset.userId = '67890'; // Sets data-user-id to 67890
```

```js
// Data attributes can also be targeted in CSS for styling purposes:
/* Selects elements with a data-user-id attribute */
div[data-user-id] {
    background-color: yellow;
}

/* Selects elements with a data-user-id attribute equal to '12345' */
div[data-user-id='12345'] {
    color: red;
}
```

##### Remember that data attributes <u>are easily accessible and manipulated by users and scripts, so they should not be used to store sensitive information</u>.

---

## 14. What is the purpose of the offset properties (offsetWidth, offsetHeight, offsetLeft, offsetTop) in DOM manipulation?

- These properties are particularly useful for layout, animation, and dynamically positioning elements in response to user interactions or data changes.

1. **offsetWidth**: **_<u>Represents the width of an element in pixels</u>_**, including the element's borders, padding, and the vertical scrollbar (if present), but **<u>excluding margins</u>**.
2. **offsetHeight**: **Represents the height of an element in pixels**, including the element's borders, padding, and the horizontal scrollbar (if present), **but excluding margins**.
3. **offsetLeft**: **<u>Measures the distance from the left edge of the element to the left edge of its containing element</u>**, in pixels. This includes any horizontal scroll offset.

- Useful for determining an element's exact position within a parent container, which can be critical for positioning elements absolutely or for drag-and-drop functionality.

4. **offsetTop**

- Measures the **<u>distance from the top edge of the element to the top edge of its containing element</u>**, in pixels

#### Practical Applications

- When you need to position a `tooltip`, `dropdown`, or `modal` relative to a specific element, `offsetLeft` and `offsetTop` can help calculate the exact positioning so that the new element appears in the correct location.
- `offsetWidth` and `offsetHeight` can be **<u>used to adjust the size or layout of elements based on their current visible dimensions</u>**, making it easier to create responsive designs that adapt to content changes or window resizing.

<u>**Considerations**:</u>

- **Scroll Position**: Note that offsetTop and offsetLeft values are relative to the parent container, not necessarily the viewport.

- **Performance**: Accessing offset properties can trigger reflow or repaint operations in the browser, which can impact performance if used excessively or within loops. **It's advisable to minimize their use in performance-sensitive situations and cache values when possible**.

---

## 15. How do you handle form manipulation in the DOM using JavaScript?

```js
// Accessing a form and its elements
var form = document.getElementById('myForm');
var myInput = document.getElementById('myInput');

// Setting the value of an input
myInput.value = 'Initial value';

// Getting the value of an input on change
myInput.addEventListener('change', function () {
  console.log('Input value changed to: ', myInput.value);
});

// Handling form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting traditionally

  // Simple form validation
  var isValid = true; // Assume form is valid; implement actual validation logic here
  if (!isValid) {
    alert('Form is not valid!');
    return; // Exit the function if form is not valid
  }

  // If the form is valid, proceed with AJAX submission
  var formData = new FormData(form);
  fetch('submitFormEndpoint', {
    // Replace 'submitFormEndpoint' with your actual endpoint
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
});

// Dynamically adding a new input element to the form
var newInput = document.createElement('input');
newInput.type = 'text';
newInput.name = 'newInputName';
form.appendChild(newInput);

// Optional: Listening for form submission to dynamically remove an input (example purpose)
// Note: This is just for demonstration. Typically, you wouldn't add then immediately remove an element.
form.addEventListener('submit', function () {
  if (form.contains(newInput)) {
    form.removeChild(newInput);
  }
});
```

16. Explain the differences between innerText, textContent, and innerHTML.

#### innerText:

- Represents the **"rendered" text content** of a node and its descendants.
- This means it takes into consideration visual aspects, such as CSS styling, and does not include hidden elements. innerText is aware of the layout and changes its value based on the visibility of text.

---

17. How do you detect if an element is hidden or visible in the DOM?

**Using getComputedStyle:**

- Used when detailed information about the element's computed style is required.

```js
const element = document.getElementById('yourElementId');
const computedStyle = window.getComputedStyle(element);

// Check if the element is visible
if (
  computedStyle.display !== 'none' &&
  computedStyle.visibility !== 'hidden' &&
  computedStyle.opacity !== '0'
) {
  console.log('Element is visible');
} else {
  console.log('Element is hidden');
}
```

**Using offsetParent property:**

- used for basic visibility checks, especially when performance is a concern.

```js
function isElementVisible(element) {
  return !!element && !!element.offsetParent;
}

const element = document.getElementById('yourElementId');
if (isElementVisible(element)) {
  console.log('Element is visible');
} else {
  console.log('Element is hidden');
}
```

## 18. What are the differences between the `client` and `offset` properties in DOM manipulation?

- both are used to **_<u>obtain information about the position and size of elements</u>_** relative to the viewport or their containing elements.

#### Client Properties:

- These properties are often used **to determine the size of an element's content area** <u>within its padding</u>.

- **<u>clientWidth and clientHeight</u>**: These properties provide the **<u>inner width and height of an element, including padding</u>** but excluding the vertical scrollbar (if present).
- **<u>clientLeft and clientTop</u>**: These properties represent the <u>**width of the left and top border**</u> of an element respectively, typically in `pixels`.

#### Offset Properties:

- **<u>offsetWidth and offsetHeight</u>**: gives the `total` `width` and `height` of an element, including <u>padding, border, and scrollbar (if present)</u>.
- **<u>offsetLeft and offsetTop</u>**: indicate the <u>**distance of the current element relative to its offset parent**</u> (usually the nearest positioned ancestor), typically in pixels.

---

## 19. How can you handle scroll events in the DOM using JavaScript?

```js
<div id="scrollableElement" >
</div>

<script>
  const scrollableElement = document.getElementById('scrollableElement');

  scrollableElement.addEventListener('scroll', function() {
    console.log('Element scrolled!');
  });
</script>

```

20. Explain the differences between createDocumentFragment and createElement in DOM manipulation.

- used for creating new elements,

#### createDocumentFragment()

- creates a lightweight container that can hold DOM nodes
- it does not belong to the main document tree until it is added to another DOM node.
- This means that changes made to a document fragment do not cause page reflow (the process of recalculating element positions and geometries) or repaint, making it an efficient way to construct DOM nodes offscreen before inserting them into the document.

**<u>Use Case</u>:**

- It's particularly useful **<u>when you want to create a complex DOM structure with multiple elements and insert it into the document in one operation</u>**. Since the fragment itself never becomes part of the document, appending children to it does not cause performance issues related to reflow and repaint, unlike direct operations on the document.

```js
let fragment = document.createDocumentFragment();

for (let i = 0; i < 5; i++) {
  let el = document.createElement('li');
  el.textContent = `Item ${i + 1}`;
  fragment.appendChild(el);
}

document.getElementById('myList').appendChild(fragment);
```

#### createElement(tagName)

- creates an instance of the element for the specified tag.
- This method returns a single DOM element of the type specified by tagName, which can then be manipulated (e.g., by setting its attributes, appending children) before it is inserted into the document.

**<u>Use Case</u>:**

- It is used **<u>when you need to create a single DOM element, manipulate it (e.g., set its content, add classes or ids), and then possibly insert it into the document**</u>. Each element created is a standalone node that can be directly inserted into the document.

```js
let div = document.createElement('div');
div.textContent = 'Hello, World!';
document.body.appendChild(div);
```

##### Summary:

- `createDocumentFragment` is **<u>designed for creating a collection of nodes that you can manipulate offscreen and insert into the document as a single operation, which is more efficient for batch insertions</u>**.
- `createElement`, on the other hand, **<i>creates individual elements that can be directly inserted and manipulated within the document</i>**.
