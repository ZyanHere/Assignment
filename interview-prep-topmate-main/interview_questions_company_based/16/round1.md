### 1. Strengths and weakness as a developer

<details>

#### Strengths:
   - Expertise in Modern Frameworks:
   - Proficiency in Performance Optimization:
   - Responsive and Adaptive Design Skills
   - Cross-Browser Development:
   - Version Control and Team Collaboration

#### Weaknesses:
- Keeping Up with Rapid Changes
- Overemphasis on Code Perfection
- Balancing User Experience with Aesthetic Design
- Performance Debugging
<summary>
View Answer
</summary>
</details>

-----

### 2. Ecommerce site that has different components(header/footer/left nav/ right content) developed in different frameworks(react/angular/vue)
   - How will you design/develop
   - How can you communicate between the components
   - How can you use a common components(like a button) across different frameworks

<details>

### Design/Development:

1. **Micro Frontend Approach**: 
   - Utilize the micro frontend architecture, where each main component (header, footer, navigation, content) is developed and deployed as an independent application. 
   - This allows teams to work on each section using the most suitable framework for that component's needs.

2. **Web Components**: 
   - Implement Web Components for parts of the UI that are framework-agnostic. 
   - This encapsulates the styling and functionality, making them reusable across different frameworks.


3. **Module Federation or Iframes**: 
   - Tools like <ins>***Webpack's Module Federation can be used***</ins> to dynamically load separate components, even if they are built with different frameworks. 
   - Iframes can also be used as a last resort, but they are less favored due to performance and design limitations.

### Communication Between Components:

   1. **Custom Events**: 
      - For communication between components, custom events can be a viable option. When an action occurs in one component, it can dispatch an event that other components can listen for and react to.
   2. **Shared Global Store**: 
      - Implementing a global state management system like Redux , or even the Context API in React, can provide a centralized store that is accessible to components regardless of the framework.
   3. **URL and Query Parameters:**
      - For simple state synchronization between components, URL and query parameters can be utilized, especially for navigation and content components that may rely on URL changes.


### Common Components Across Frameworks:

   1. **Build as Web Components**: 
      - Creating common UI elements like buttons as Web Components is one of the most effective methods to ensure compatibility across different frameworks. 
      - Web Components are based on web standards and can be integrated into React, Angular, Vue, or any other framework.
   2. **Use a Design System**: 
      - Implement a design system with a set of standards for design and code that includes common components. 
      - Tools like Storybook can be utilized to maintain this system and ensure that components have a consistent look and feel, as well as similar APIs across different frameworks.
   3. **CSS-in-JS Libraries**: 
      - Use CSS-in-JS libraries to style components. This can help in keeping a consistent style across components regardless of the framework, although it requires agreement on the library to be used across teams.
<summary>
View Answer
</summary>
</details>


----
   
### 3. What are the different module systems

<details>

-  in JavaScript, a module system is a <ins>***mechanism that allows you to split your code into separate units, or modules, each with its own scope***</ins>, and then include them as needed. 
-  This approach enhances code organization, maintainability, and reusability. 

<ins>**CommonJS (CJS)**:</ins> 
   - Used mainly in Node.js for server-side development. 
   - It ***allows for synchronous loading*** of modules. 
   - Modules are **loaded using `require()`** and **exported using `module.exports`**.
   - It is also used for `browser-side` JavaScript, **but that code must be packaged with a transpiler** since browsers don't support CommonJS
   - Not ideally suitable for browsers due to the reason that browsers perform multiple asynchronous operations and introducing synchronous would block the thread execution.

```js
// myModule.js
function sayHello(name) {
    return `Hello, ${name}!`;
}

module.exports = sayHello;
```

```js
// app.js
const sayHello = require('./myModule');
console.log(sayHello('Alice'));  // Outputs: Hello, Alice!
```

<ins>**Asynchronous Module Definition (AMD):**</ins>

   - Used for ***asynchronous module loading***, suitable for browsers. 
   - It's implemented by libraries like `RequireJS`. 
   - Modules are defined using `define()` and dependencies are loaded asynchronously.


<ins>**Universal Module Definition (UMD):**</ins>

- Aims to provide compatibility with both `CommonJS` and `AMD` as well as with the traditional global variable method. 
- It checks the environment and adapts accordingly, allowing the module to be used in different contexts.

<ins>**ES Modules (ESM):**</ins>
  -  The standard module system in modern JavaScript, introduced with ES6 (ECMAScript 2015). 
  -  It supports static analysis and tree-shaking for more efficient bundling. 
  -  Modules are imported using the `import` keyword and exported using `export`.

<summary>
View Answer
</summary>
</details>



----

### 4. Unit testing - difference between mock/stub/spy

<details>

#### Mock:
- A mock is used to <ins>***verify interactions between methods***</ins> and ***integrates rules about how they are supposed to be called***. 
- <ins>**It can be set up with expectations**:</ins> methods that should be called, the order of calls, the parameters they are called with, etc. 
- If the expectations are **not** met, the mock will typically cause the test to **fail**.
- Useful in scenarios <ins>***where the interaction itself is what needs to be tested***</ins>, not just the output.


```js
// COMPONENT TO TEST
import React from 'react';

function ButtonComponent({ onClick }) {
  return (
    <button onClick={onClick}>Click me</button>
  );
}

export default ButtonComponent;

```

```js
// TEST USING A MOCK:
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonComponent from './ButtonComponent';

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();  // Creating a mock function
  render(<ButtonComponent onClick={handleClick} />);
  
  // Simulating a button click
  fireEvent.click(screen.getByText('Click me'));

  // Checking if the mock function was called exactly once
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```
----

#### Stub:
- Stubs primarily ***serve to provide <ins>predefined responses to function calls***</ins> that are necessary for the unit test to run. 
- They typically <ins>***don't record information about calls***</ins>.
- Useful in scenarios where you just need <ins>***to make sure that a piece of code can handle the input and produce the correct output***</ins> without really caring about the interaction with the dependency
  
```js
//DataFetcher Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
}

export default DataFetcher;
```

```js
// TEST USING A STUB
// user.test.js
import { getUser } from './user';

// Jest allows us to mock functions in this way
jest.mock('node-fetch', () => jest.fn());

const fetch = require('node-fetch');

test('should return user data', async () => {
  const fakeUser = { id: 1, name: 'Saiteja Gatadi' };
  fetch.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(fakeUser)
  }));

  const userData = await getUser(1);
  expect(userData).toEqual(fakeUser);
});
```
```js
// TEST CASES for DataFetcher Component
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DataFetcher from './DataFetcher';
import axios from 'axios';

jest.mock('axios');

test('loads and displays data', async () => {
  // Setup the mock
  axios.get.mockResolvedValue({ data: 'Hello World' });

  render(<DataFetcher />);

  // We use waitFor because the component updates state asynchronously
  await waitFor(() => {
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});

test('handles loading state', async () => {
  // Delay the response to test the loading state
  axios.get.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ data: 'Delayed Hello' }), 500)));

  render(<DataFetcher />);
  expect(screen.getByText('Loading...')).toBeInTheDocument(); // Initial state should be loading

  await waitFor(() => {
    expect(screen.getByText('Delayed Hello')).toBeInTheDocument();
  });
});
```
----

#### Spy:
- A spy <ins>***records some information based on how its methods were called***</ins>.
- This can <ins>***include tracking how many times methods were called, with what arguments they were called***</ins>, and so forth. 
- Unlike mocks, spies generally **do not allow you to set expectations before the code runs**; they record information about interactions to be asserted later.

```js
// ButtonClicker.js
import React from 'react';

function ButtonClicker({ onButtonClick }) {
  return (
    <button onClick={onButtonClick}>Click me</button>
  );
}

export default ButtonClicker;
```

```js
// TEST USING A SPY:
// ButtonClicker.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonClicker from './ButtonClicker';
import * as Utils from './utils';  // Assuming Utils has a method used inside ButtonClicker

test('calls utility method when the button is clicked', () => {
  const spy = jest.spyOn(Utils, 'utilityMethod');  // Spy on the utilityMethod
  render(<ButtonClicker />);
  fireEvent.click(screen.getByText('Click me'));
  // Checking if the spied function was called
  expect(spy).toHaveBeenCalled();
  // Restore the original function  
  spy.mockRestore();  
});
```
----

### Summary
- **Stub**: Provides ***predefined responses***, doesn’t record anything.
- **Mock**: <ins>***Set up with expectations beforehand***</ins>, and the test fails if the expectations aren't met.
- **Spy**: Similar to a stub but also ***records information about how it was called***, which can be checked after the test execution.

<summary>
View Answer
</summary>
</details>

----

### 5. State management 

<details>

- React has its **built-in** state management capabilities, but as applications grow in complexity, developers often turn to **external libraries** to simplify and enhance the process.

#### 1. Local State Management (useState):

```js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
---

#### 2. Lifting state up:

- When **multiple** components need to share and modify the **same state**, you can lift the state up to their **closest common ancestor**.

```js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildComponent count={count} setCount={setCount} />
      <AnotherChild count={count} />
    </>
  );
}

function ChildComponent({ count, setCount }) {
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  );
}

function AnotherChild({ count }) {
  return <p>Count: {count}</p>;
}
```
----

#### 3. Context API:

- For more global state needs, React **provides** the Context API, which allows you to share values across the entire component tree **without having to explicitly pass props** at every level.

```js
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = { count, setCount };
  
  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  );
}

function App() {
  return (
    <CounterProvider>
      <ChildComponent />
      <AnotherChild />
    </CounterProvider>
  );
}

function ChildComponent() {
  const { count, setCount } = useContext(CountContext);
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  );
}

function AnotherChild() {
  const { count } = useContext(CountContext);
  return <p>Count: {count}</p>;
}
```
----


#### 4. External State Management Libraries

- **Redux**: 
  - provides a predictable state container for JavaScript apps. 
  - It helps you manage state globally and keep changes predictable and traceable

- **MobX**:
  - offers a more **flexible approach** to state management based on observable state objects. 
  - It is particularly useful for **complex states with many interdependencies**.

- **Recoil**:
   - developed by Facebook that provides several capabilities similar to Redux but with a simpler API and better integration with React's own capabilities.

- **Zustand**:
   - A minimalistic state management solution that uses hooks to provide a straightforward and intuitive way to manage global state across your app

<summary>
View Answer
</summary>
</details>

-----

### 6. Explain Redux flow, 
   - how to handle async actions, 
   - code example with 2 parents one child, 
   - how store updates the values, 
   - redux middleware

<details>


#### The Redux flow follows a strict unidirectional pattern:

1. **Action**: 
      - Actions are `payloads` of information that **send data from your application to your Redux store**. 
      - They are the <ins>***only source of information for the store***.</ins> 
      - You send them to the store using `store.dispatch()`.
<br/>

2. **Reducer**: 
   - Reducers specify <ins>***how the application's state changes in response to actions sent to the store***</ins>. 
   - Remember that reducers **are pure functions** that take the previous state and an action, and return the next state.
<br/>

3. **Store**: The `store` brings actions and reducers together. The store has the following responsibilities:

   - Holds application state;
   - Allows access to state via getState();
   - Allows state to be updated via dispatch(action);
   - Registers listeners via subscribe(listener);
   - Handles un-registering of listeners via the function returned by subscribe(listener).
<br/>

#### <ins>Handling Async Actions:</ins>

Redux by itself handles only synchronous actions. To work with asynchronous operations (like API requests), you need to use middleware such as redux-thunk or redux-saga.


- `Redux-Thunk` allows you to write <ins>**action creators that return a function**</ins> instead of an `action`. 
  - The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.


#### Example with Redux-Thunk:
- a simple example involving **two parent** components and **one child** component, using `Redux` for state management and `Redux-Thunk` for asynchronous actions.

<ins>**Setup**:</ins>

- Parent1 and Parent2 both display data.
- Child updates the data asynchronously.

```js
// actions.js
export const fetchDataSuccess = data => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: data
});

export const fetchData = () => {
  return dispatch => {
    fetch('/some-api')
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .catch(error => console.error('Fetching data failed', error));
  };
};
```


```js
// reducer.js
const initialState = {
  data: null
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default appReducer;
```

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducer';

const store = createStore(
  appReducer,
  applyMiddleware(thunk)
);

export default store;
```
```js
// Parent1.js
import React from 'react';
import { useSelector } from 'react-redux';

function Parent1() {
  const data = useSelector(state => state.data);
  return <div>Data in Parent1: {data}</div>;
}

export default Parent1;

// Parent2.js
import React from 'react';
import { useSelector } from 'react-redux';

function Parent2() {
  const data = useSelector(state => state.data);
  return <div>Data in Parent2: {data}</div>;
}

export default Parent2;

// Child.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './actions';

function Child() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(fetchData())}>
      Load Data
    </button>
  );
}

export default Child;
```

#### Redux Middleware:
  - `Middleware` in Redux is a way to **enhance the dispatch function**. 
  - Middleware can intercept every action sent to the store, then modify it, log it, delay it, ignore it, or perform other tasks before passing the action to the root reducer. 
  - This is crucial for handling side effects such as data fetching, as seen with redux-thunk.

#### Store Updates:

  - When an action is dispatched, the **Redux store's reducer calculates** the `new state` and ***replaces*** the `old state`. 
  - All listeners registered via subscribe are notified to re-render the React components based on the new state, maintaining a reactive data flow. 

<summary>
View Answer
</summary>
</details>


-----

### 7. Code example of communication between 2 parents which use the same child

<details>

- can be managed using a combination of state lifting and callbacks


### Step 1: Setup the Child Component

```js
// Child component that receives messages and callbacks from both parent components
function SharedChild({ messageFromParentOne, messageFromParentTwo, sendMessageToParentOne, sendMessageToParentTwo }) {
    return (
        <div>
            <h1>Child Component</h1>
            <p>Message from Parent One: {messageFromParentOne}</p>
            <p>Message from Parent Two: {messageFromParentTwo}</p>
            <button onClick={() => sendMessageToParentOne("Hello from Child to Parent One!")}>
                Send to Parent One
            </button>
            <button onClick={() => sendMessageToParentTwo("Hello from Child to Parent Two!")}>
                Send to Parent Two
            </button>
        </div>
    );
}
```

### Step 2: Setup the Parent Components

- Both parent components will manage their own state and pass down props to the child. 
- They'll also provide functions that the child can call:

```js
import React, { useState } from 'react';

// ParentOne component that interacts with the child and ParentTwo
function ParentOne({ sendToParentTwo }) {
    const [message, setMessage] = useState("");

    return (
        <div>
            <h1>Parent One</h1>
            <SharedChild
                messageFromParentOne="Parent One says hi!"
                messageFromParentTwo={message}
                sendMessageToParentOne={(msg) => setMessage(msg)}  // Updates state based on child interaction
                sendMessageToParentTwo={sendToParentTwo}  // Sends a message to ParentTwo
            />
        </div>
    );
}

// ParentTwo component that also interacts with the child and receives messages from ParentOne
function ParentTwo() {
    const [message, setMessage] = useState("");

    return (
        <div>
            <h1>Parent Two</h1>
            <SharedChild
                messageFromParentOne={message}
                messageFromParentTwo="Parent Two says hello!"
                sendMessageToParentOne={(msg) => setMessage(msg)}  // Updates state based on child interaction
                sendMessageToParentTwo={(msg) => setMessage(msg)}  // Reflects the message back to its own UI for demo purposes
            />
        </div>
    );
}
```

### Step 3: Main App Component

```js
// App component that manages both ParentOne and ParentTwo
function App() {
    const [parentTwoMessage, setParentTwoMessage] = useState("");

    return (
        <div>
            <ParentOne sendToParentTwo={(msg) => setParentTwoMessage(msg)} />
            <ParentTwo />
        </div>
    );
}
```
<summary>
View Answer
</summary>
</details>

----

### 8. What are semantic tags? write down sample HTML for a blog page with sidebar and list of blogs, tell some semantic tags you have worked on?

<details>

   - Semantic HTML tags <ins>**provide meaningful information about the contents of those tags**</ins> beyond just how they appear on the page
   - They help with `accessibility`, `search engine optimization`, and make the code easier to read and understand for other developers. 
   - Using semantic tags correctly can also `enhance` the user experience by making web content **more accessible to users with disabilities**.

#### Common Semantic Tags in HTML5:

`<article>`: Defines independent, self-contained content.
`<aside>`: Indicates content that's tangentially related to the content around it, often used for sidebars.
`<details>`: Specifies additional details that the user can view or hide.
`<figcaption>`: Represents a caption or legend associated with a figure.
`<figure>`: Used to encapsulate media, typically with a caption, and is referenced as a single unit.
`<footer>`: Represents the footer for its nearest sectioning content or sectioning root.
`<header>`: Represents introductory content or navigational links for its nearest sectioning content or root.
`<main>`: Specifies the main content of a document.
`<mark>`: Indicates text that is marked or highlighted for reference or notation purposes.
`<nav>`: Represents a section of a page that links to other pages or parts within the page, a section meant for navigation.
`<section>`: Represents a standalone section — which doesn't have a more specific semantic element to represent it — within a document.
`<summary>`: Specifies a visible heading for a `<details>` element; the summary can be clicked to view/hide the details.


#### Sample HTML for a Blog Page with Sidebar:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Page</title>
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <main>
            <article>
                <h2>Blog Post Title</h2>
                <p>Posted on <time datetime="2023-04-01">April 1, 2023</time></p>
                <p>This is the content of the blog post. It's full of insightful details and information...</p>
            </article>
            <article>
                <h2>Another Blog Post</h2>
                <p>Posted on <time datetime="2023-04-02">April 2, 2023</time></p>
                <p>Another fascinating post on our blog covering a different but equally interesting topic...</p>
            </article>
        </main>
        <aside>
            <h3>Related Posts</h3>
            <ul>
                <li><a href="#post3">Blog Post 3</a></li>
                <li><a href="#post4">Blog Post 4</a></li>
                <li><a href="#post5">Blog Post 5</a></li>
            </ul>
        </aside>
    </div>

    <footer>
        <p>Copyright © 2023 Blog Name</p>
    </footer>
</body>
</html>
```

<summary>
View Answer
</summary>
</details>

----

### 9.  difference between `<p>`, `<span>` and `<label>` tags when to use which tag.


<details>


  `<p>` Tag
  - is used to ***define paragraphs*** in an HTML document. 
  - It **represents a block of text** that is separated from adjacent blocks by vertical white spaces and possibly first-line indentation, which is the default styling for paragraphs in most browsers.

##### Usage: 
- Use the `<p>` tag whenever you need to structure textual content into separate paragraphs. 
- It is suitable for longer text that needs to be organized into distinct sections, such as descriptions, articles, or any form of written content.

```html
<p>This is a paragraph of text. Here, you can include several sentences that make up a complete thought or section of content.</p>
```
---

`<span>` Tag
  - is used for **grouping inline-elements** or styling a part of a text within a different element without causing a line break. 
  - It is an inline container used to **mark up a part of a text**, or a part of a document.

##### Usage: 
  - Use when you need to apply specific styling or identify a part of a text within another block or inline element. 


```html
<p>This is a paragraph with <span style="color: red;">some words in red</span> to emphasize them without altering the structural flow of the paragraph.</p>
```

---

`<label>` Tag:

  - is used to define a label for an `<input>` element. 
  - This tag **improves the usability of the form elements** by making them more **accessible to screen readers** and by allowing users to click on the label text to focus/control the associated input field.

##### Usage: 
  - whenever you define forms that include elements like text boxes, radio buttons, checkboxes, etc. The for attribute of the `<label>` should be the same as the id attribute of the input it is labeling to establish a linkage.


```html
<label for="nameInput">Name:</label>
<input type="text" id="nameInput" name="name">
```
<summary>
View Answer
</summary>
</details>

---

### 10. What are block, inline elements what are the differences

<details>

#### Block Elements:
  - Block elements **occupy the entire width** of their containing element, forming a "block." 
  - This means **they start on a new line** and any content following them also starts on a new line. 
  - Block elements **can be styled** with `width`, `height`, `margin`, and `padding` properties, which are **fully respected**. 

##### Examples of block elements include:


- `<div>`
- `<p>` (paragraphs)
- `<h1>`, `<h2>`(headings)
- `<ul>`, `<ol>` (lists)


#### Inline Elements
- Inline elements **do not start on a new line**; they appear on the same line as the content or elements adjacent to them, as long as there is space. 
- Inline elements **only occupy as much width as necessary** for their content. 
- They **cannot** have a `width` and `height` set, and the `top` and `bottom` `margins` and `padding` do not work as they do with block elements (they don't create additional space above or below the element). 

##### Examples of inline elements include:

- `<span>`
- `<a> `(links)
- `<img>`
- `<strong>,` `<em>`



#### Differences:
- **Layout**: 
  - `Block` elements **create a new line** of content, while `inline` elements **do not break the flow** of content within their line.
- **Width and height**: 
  - `Block` elements **can have width and height set**, while `inline` elements **cannot** have their width and height set explicitly (they size according to their content).
- **Margins and padding**: 
  - `Block` elements **respect all margin and padding** properties. `Inline` elements <ins>***respect left and right margin and padding but not top and bottom***</ins> for altering the box model's height.
- **Use case**: 
  - `Block` elements are typically **used for larger sections of content and layout structuring**, whereas `inline` elements are **used for smaller chunks of content** or to style portions of text <ins>***within block elements***</ins>.

<summary>
View Answer
</summary>
</details>

------

### 11. `meta` tag to achieve responsiveness with syntax



<details>

- To ensure a webpage is responsive, **meaning it adjusts to fit different screen sizes and orientations**, a commonly used HTML element is the `<meta>` tag <ins>***specifically designed for setting the viewport properties***</ins>. 
- This `meta` tag informs the browser how to control the page's dimensions and scaling based on the device's screen size.
- Crucial for ensuring that your site adapts to different screen sizes and resolutions, enhancing usability and accessibility on various devices.

```html
// This tag should be placed within the <head> section of your HTML document. 
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width` :
  - instructs the browser to set the width of the viewport to the width of the device's screen, which can vary from device to device.
- `initial-scale=1.0`:
  -  sets the initial zoom level when the page is first loaded by the browser.

<summary>
View Answer
</summary>
</details>



-----


### 12. Positions and movement of an element with each position (static, relative, absolute, fixed and sticky)

<details>

- position property is used to control the layout of an element relative to its container or the viewport

#### 1. `static`:
- Default value.
- The element is positioned according **to the normal flow** of the document.
- The `top`, `right`, `bottom`, and `left` properties ***do not affect*** elements with `position: static`.

#### 2. `relative`:
- The element is positioned relative **to its normal position** in the document flow.
- **You <ins>can</ins> use** the `top`, `right`, `bottom`, and `left` properties to move the element from its normal position.
- Other content will not adjust to fit into any gap left by the element.

#### 3. `absolute`:
- The element is **removed from the normal document flow**, and no space is created for the element in the page layout.
- It is positioned relative <ins>**to its closest positioned ancestor**</ins> (i.e., the nearest ancestor that is not static).
- You <ins>**can use**</ins> `top`, `right`, `bottom`, and `left` properties to position the element from the edges of its containing element.
- If **no** positioned ancestors exist, <ins>**it uses the document body**</ins>, and moves along with page scrolling.

#### 4. `fixed`:

- The element <ins>**is removed**</ins> from the normal document flow, and no space is created for the element in the page layout.
- It is **positioned relative to the viewport**, which means it will <ins>stay in the same place even if the page is scrolled</ins>.
- Like absolute, you <ins>**can use**</ins> top, right, bottom, and left properties to position the element from the viewport edges.

#### 5. `sticky`:

- The element is treated as relative until the viewport reaches a specified point, at which it becomes fixed.
- It essentially <ins>**switches between relative and fixed**</ins>, depending on the scroll position.
- You <ins>**must specify at least one**</ins> of `top`, `right`, `bottom`, or `left` for sticky positioning to take effect.
- It <ins>sticks to the nearest scrolling ancestor and the viewport</ins>.

<summary>
View Answer
</summary>
</details>



----

### 13. Various display properties and what is the differences between them

<details>

#### 1. `none`:
- <ins>**Completely removes**</ins> the element from the document. 
- <ins>**It does not take up any space**</ins>; the element is invisible and its space is not reserved.
- All descendant elements also disappear and are not rendered.

#### 2. `block`:

- The <ins>**element will start on a new line**</ins> and <ins>***extend the full width of its parent container***, **taking up the entire row.**</ins>
- You <ins>**can set**</ins> `width` and `height`.
- Examples include `<div>`, `<p>`, and `<section>` tags which are block-level elements by default.

#### 3. `inline`:

- The element **does not start on a new line** and <ins>***only takes up as much width***</ins> as necessary.
- `Margins` and `paddings` are <ins>**respected** `horizontally`</ins> but **not** `vertically`. 
  - `Width` and `height` <ins>**cannot**</ins> be set.
- Examples include `<span>`, `<a>`, and `<img>`tags which are inline elements by default.

#### 4. `inline-block`:
- Combines features of both inline and block: 
  - the element **does not start on a new line** <ins>but it can have a `width` and `height` set.</ins>
- `Margins` and `paddings` <ins>**are respected on all sides**.</ins>


#### 5. `flex`:

- It enables a flexible and efficient layout along the primary (main) and cross (secondary) axes, **controlled by flex-direction**.
- Great for building complex layouts that need to dynamically scale with different screen sizes.

#### 6. `grid`:
- This property allows you to design complex, responsive layouts **using a two-dimensional** grid-based layout system.
- It <ins>***provides precise placement and alignment controls***</ins> for child elements (grid items) using `columns`, `rows`, and `gaps`.

#### 7. `table`, `table-row`, `table-cell`:

- These values cause the element to behave like HTML table elements. 
- It is **useful for mimicking table behavior** with CSS, without using `<table>`, `<tr>`, `<td>`, etc.
- `table` establishes a `block-level` table, 
- `inline-table` makes it inline, 
- while `table-row` and `table-cell` simulate **rows and cells** respectively.

<summary>
View Answer
</summary>
</details>


-----
### 14. media queries for specific screens

<details>

- Media queries allowing CSS to **adapt to different conditions** such as `screen resolutions`, `orientations`, and `types`.


#### Screen-width:
```js
//Basic Syntax
@media (condition) {
}
```

```js
//Mobile Devices (typically under 600px)
@media (max-width: 599px) {
}
```

```js
//Tablets (typically 600px to 900px)
@media (min-width: 600px) and (max-width: 899px) {
}
```

```js
//desktops (typically above 900px)
@media (min-width: 900px) {
}
```
----

#### Screen Orientation (Portrait or Landscape)

```js
//portrait
@media (orientation: portrait) {
}
```

```js
//landscape
@media (orientation: landscape) {
}
```
<summary>
View Answer
</summary>
</details>


-----

### 15. Recursion and use cases with example 



<details>

- Recursion is a programming technique in which a function calls itself

```js
//basic example
function factorial(n) {
    if (n === 0) {
        return 1; // Base case: factorial of 0 is 1
    } else {
        return n * factorial(n - 1); // Recursive case
    }
}
```
<summary>
View Answer
</summary>
</details>


-------

### 16. Hoisting

<details>

- is a JavaScript mechanism where `variable` and `function` declarations **are moved to the top** of their containing scope during the compilation phase, <ins>**before the code has been executed**</ins>.

- This behavior **allows functions and variables to be used before** they are physically declared in the script

```js
console.log(myVar); // Outputs: undefined (not an error)
var myVar = 'Hello, world!';
```

```js
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 'Hello, world!';
```

```js
console.log(sayHello()); // Outputs: "Hello, world!"

function sayHello() {
    return "Hello, world!";
}
```

```js
console.log(sayHi()); // TypeError: sayHi is not a function

var sayHi = function() {
    return "Hi, world!";
};
```

```js
// EXAMPLE

function hoistingExample() {
    console.log(x); // Outputs: undefined
    console.log(y); // ReferenceError: Cannot access 'y' before initialization
    console.log(z); // ReferenceError: z is not defined

    var x = 10;
    let y = 20;
    console.log(x); // Outputs: 10
    console.log(y); // Outputs: 20
}

hoistingExample();
```
<summary>
View Answer
</summary>
</details>



---- 
### 17. difference between declaring variables with let and var

<details>


#### 1. Scope

- `var`: Declares a variable with **function scope** or **global scope** if declared outside any function. 
  - This means that a variable <ins>declared with var inside a function is only accessible within that function, but if declared outside, it's available globally.</ins>
<br/>

- `let`: Introduces **block scope** to JavaScript, **where variables are limited to the block `({})`**, statement, or expression in which they are used. 

```js
// Here, `varVariable` is accessible outside the if block because var does not have block scope, 
// whereas `letVariable` throws a ReferenceError because let is block-scoped.
function testScope() {
    if (true) {
        var varVariable = "I am var";
        let letVariable = "I am let";
    }
    console.log(varVariable); // Outputs: "I am var"
    console.log(letVariable); // ReferenceError: letVariable is not defined
}
testScope();
```

#### 2. Hoisting
- `var`: Variables declared with `var` **are hoisted to the top of their enclosing function scope or global scope and <ins>initialized with undefined</ins>**, meaning they can be referenced in code before they are declared, but will return undefined.
<br/>

- `let`: Variables declared with let **are also hoisted to the top of the block, <ins>but are not initialized</ins>**. 
  - <ins>Accessing them before the declaration **results in a ReferenceError due to the "temporal dead zone" (TDZ)**</ins>, a time during which the variable is in scope but cannot yet be accessed.

#### 3. Re-Declaration

- `var`: **Allows <ins>re-declaring the same variable</ins>** within the same scope without errors.
- `let`: <ins>**Does not allow re-declaring</ins> the same variable within the same scope**. 
  - Doing so will result in a SyntaxError.

```js
function testReDeclaration() {
    var varVariable = "I am var";
    var varVariable = "I am the new var"; // No problem here

    let letVariable = "I am let";
    let letVariable = "I am the new let"; // SyntaxError: Identifier 'letVariable' has already been declared
}
testReDeclaration();
```


<summary>
View Answer
</summary>
</details>




---- 

### 18. call, apply and bind methods


<details>


- In JavaScript, `call`, `apply`, and `bind` are methods <ins>**used to control the invocation context (this) of functions**</ins>.
- They are powerful tools that <ins>**allow you to explicitly define the value of `this` inside the called function**</ins>. 

#### 1. `call()`:
  - The `call()` method calls a function with a specified this value and <ins>**arguments provided one by one**</ins>.

```js
function introduce(language, hobby) {
    // setting `this` to refer to the user object, and passing other arguments in order.
    console.log(`Hello, I'm ${this.name}. I code in ${language} and I like ${hobby}.`);
}

const user = {
    name: 'Alice'
};

// Here, call() is used to invoke the introduce function, 
introduce.call(user, 'JavaScript', 'cycling');  // Output: "Hello, I'm Alice. I code in JavaScript and I like cycling."
```

#### 2. apply()

- Is similar to `call()`, **but it <ins>takes arguments as an array</ins>**, which is <ins>useful ***when you don't know the number of arguments*** in advance</ins>.

```js
function introduce(language, hobby) {
    console.log(`Hello, I'm ${this.name}. I code in ${language} and I like ${hobby}.`);
}

const user = {
    name: 'Bob'
};

// apply() is particularly useful when dealing with an array of arguments
introduce.apply(user, ['Python', 'reading']);  // Output: "Hello, I'm Bob. I code in Python and I like reading."
```

#### 3. bind()

- The `bind()` method **creates a new function** that, when called, has its this keyword set to the provided value, with a given sequence of arguments.
- `bind()` is **often used for event handling** and in cases where you want to preset some arguments (partial application). 
  
```js
function introduce(language) {
    console.log(`Hello, I'm ${this.name}. I code in ${language}.`);
}

const user = {
    name: 'Carol'
};

// It doesn’t immediately call the function; 
const introduceCarol = introduce.bind(user, 'C++');
// it instead returns a new function that when called, will execute 
// the original function with the bound context and arguments.
introduceCarol();  // Output: "Hello, I'm Carol. I code in C++."
```

<summary>
View Answer
</summary>
</details>





----

### 19. webComponents

<details>


- allowing you to **create reusable custom elements** — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

-  it consists of three main technologies, which can be used together to create versatile custom elements with encapsulated functionality that can be reused wherever you like without fear of code collisions.

- #### Custom elements
  - These allow developers to define their **own custom HTML tags, their APIs, and their behavior**.

- #### Shadow DOM
  - **Enables encapsulated style and markup**, meaning the styles defined inside a shadow DOM will not leak out, and styles outside will not affect the inside.. 
  - In this way, you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.

- #### HTML templates
  - The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page until called upon with JavaScript.. 
  - These can then be reused multiple times as the basis of a custom element's structure.

```js
// Define the custom element

class TooltipElement extends HTMLElement {
    constructor() {

        // Always call super first in the constructor to properly set up the element as an HTML element.
        super();

        // Declare a private variable to hold the tooltip container element. Initially undefined. 
        this._tooltipContainer; 

        // Initialize a default tooltip text, can be overwritten by attribute.
        this._tooltipText = 'Default tooltip text'; 

        // Attach a shadow root to this custom element with 'open' mode allowing access from JavaScript outside the component.
        this.attachShadow({ mode: 'open' }); 
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            // Update tooltip text if the 'text' attribute is provided.
            this._tooltipText = this.getAttribute('text'); 
        }

        // Create a span element to serve as the tooltip icon.
        const tooltipIcon = document.createElement('span');

        // Set the content of the tooltip icon to indicate it's a tooltip trigger.
        tooltipIcon.textContent = ' (?)';

        // Append the tooltip icon to the shadow DOM.
        this.shadowRoot.appendChild(tooltipIcon); 

        // Create a div element to serve as the tooltip's content container.
        this._tooltipContainer = document.createElement('div');

        // Set the tooltip's text. 
        this._tooltipContainer.textContent = this._tooltipText; 
        this._tooltipContainer.style.cssText = `
            position: absolute; 
            background-color: black; 
            color: white; 
            padding: 5px;
            z-index: 10;
            visibility: hidden;
        `;

        // Append the tooltip container to the shadow DOM.
        this.shadowRoot.appendChild(this._tooltipContainer); 

        tooltipIcon.addEventListener('mouseenter', () => {
            this._tooltipContainer.style.visibility = 'visible';
        });
        tooltipIcon.addEventListener('mouseleave', () => {
            this._tooltipContainer.style.visibility = 'hidden'; 
        });
    }
}

// Define and register the custom element with the browser under the tag 'my-tooltip'.
customElements.define('my-tooltip', TooltipElement); 
```

```js
// use the custom element in HTML
<my-tooltip text="More info about the topic">Hover over me</my-tooltip>
```
<summary>
View Answer
</summary>
</details>


----

### 20. How to embed 2 or more component as a single component, and how to communicate between them


<details>


- #### Step 1: Create Individual Components

```js
// ComponentA.js
function ComponentA({ sendDataToParent }) {

  const handleInput = (event) => {
    // When sendDataToParent is called from ComponentA, it is actually invoking handleDataFromA in the ParentComponent with the input's current value as its parameter
    sendDataToParent(event.target.value); // Sending data to parent
  };

  return (
    <div>
      <input type="text" onChange={handleInput} placeholder="Enter data here" />
    </div>
  );
}

export default ComponentA;
```

```js
// ComponentB.js
function ComponentB({ data }) {
  return (
    <div>
      <h1>Data received: {data}</h1>
    </div>
  );
}

export default ComponentB;
```
- #### Step 2: Create the Parent Component

```js
import React, { useState } from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

function ParentComponent() {
  const [data, setData] = useState(''); // State to hold data

  const handleDataFromA = (value) => {
    //This `value` is the actual data received from ComponentA. 
    // It is dynamically determined by what the user types into the input field in ComponentA
    setData(value); // Update the state with the new value from ComponentA
  };

  return (
    <div>
      <ComponentA sendDataToParent={handleDataFromA} />
      <ComponentB data={data} />
    </div>
  );
}

export default ParentComponent;
```
<summary>
View Answer
</summary>
</details>

-----

### 21. What is React Portal?

<details>



-  Is a feature provided by React **that enables you to <ins>render components in a DOM node that exists outside the DOM hierarchy of the parent component**</ins> .
- This is <ins>**particularly useful for when you need child components to break out of the DOM tree and be managed independently**</ins>.
- Typically **used for `modals`, `pop-ups`, and `tooltips`** <ins>**where you don't want to deal with the CSS overflow or z-index issues**</ins> that can occur with deeply nested structures.
- you can maintain the parent-child relationship in React components without being bound by the DOM structure. This is especially useful for components like:

- `Modals`: To render modals <ins>**at the end of the document body**</ins> ensures they sit on top of other UI elements.
- `Tooltips`: <ins>**To avoid being clipped**</ins> by an overflowed container.
- `Floating menus`: Allows menus <ins>**to exist outside**</ins> restrictive containers.


#### How to use:

- You can use the `ReactDOM.createPortal()` method to create a portal. This method takes two arguments:

  - `child`: the child element to render into the DOM node.
  - `container`: the DOM node to mount the child into.


```js
// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // This div is the modal content that can be styled as needed
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      backgroundColor: '#FFF',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    }}>
      {children}
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
      }}>Close</button>
    </div>,
    // Mounting the modal to the end of body of the document
    document.body
  );
};

export default Modal;
```

```js
//App.js
import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Click the button below to open the modal</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <p>This is a modal! 🎉</p>
      </Modal>
    </div>
  );
}

export default App;
```

<summary>
View Answer
</summary>
</details>



----

### 22. How do you efficiently work with Forms in react?

<details>




#### 1. Controlled vs Un-controlled Components:

- ##### Controlled Components: 
  - Every state mutation **has an associated handler function**. 
  - This means React manages all the state and updates **based on user input**.

  ##### Pros:
  - Gives you more control over the form's behavior, making things like input validation, handling multiple inputs with a single function, and dynamically changing form values easier.
  ##### Cons:
    - Can lead to performance issues in large forms because each keystroke triggers a state update and potentially re-renders the component.

- ##### Un-Controlled Components: 
  - In uncontrolled components, form data is handled by the DOM itself. 
  - You use refs to retrieve the form values from the DOM when needed.

  ##### Pros: 
    - More performant for large forms as it reduces the number of re-renders because the data is only read when needed (e.g., on form submission).
  ##### Cons:
    - Less direct control over the form elements which might make validation or conditional rendering more complex.


#### 2. Using React.memo or PureComponent

- This prevents the component from re-rendering unless its props have changed, which can **significantly reduce the number of renders in a form** with many inputs.

```js
const MyInputField = React.memo(function TextField({ value, onChange }) {
  console.log("TextField rendered!");
  return <input value={value} onChange={onChange} />;
});

```

#### 3. Debouncing
- Use debouncing **to delay handling input changes** until a certain amount of inactivity occurs. This reduces the number of state updates.

```js
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

function DebouncedInput() {
  const [value, setValue] = useState('');
  const handleChange = useCallback(debounce(setValue, 300), []);

  return <input type="text" onChange={(e) => handleChange(e.target.value)} />;
}
```

#### 4. Lazy Initialization of State
- With lazy initialization, **the function you pass to useState will only run the first time the component renders.** 
- Subsequent renders **will use the state from the previous render** and will not execute the initialization function again. 
- This behavior is different from providing a direct value to useState, which would re-compute the initial state on every render, even if it's not used.
```js
const [formData, setFormData] = useState(() => {
  // Compute initial form state here
  return computeExpensiveFormState();
});
```


<summary>
View Answer
</summary>
</details>



