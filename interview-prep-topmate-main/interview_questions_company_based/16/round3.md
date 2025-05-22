### 1. Types of functions in JS(Regular, function expressions, arrow functions)


<details>

#### i) Regular Functions
- Regular functions are declared using the `function` keyword. 
- They have their own this context and <ins>**are hoisted**</ins>, meaning they <ins>**can be called before they are defined**</ins> in the code.

```js
add(1,2) //works

function add(a,b){
  return a+b
}

add(1,2) //works
```
#### ii) Function Expressions
- defining a function as part of an expression, usually by assigning it to a variable. 
- These are <ins>**not hoisted**</ins>, so they <ins>**must be defined before**</ins> they are used.

```js
//IIFE (Immediately Invoked Function Expression)
var app = (function() {
    var privateVar = 'secret';

    function init() {
        console.log('Application started with access to:', privateVar);
    }

    return {
        start: init
    };
})();

app.start(); // Outputs: Application started with access to: secret
```

#### iii) Arrow Functions
- introduced in ES6. 
- They <ins>**do not have**</ins> their own `this` context, inheriting it <ins>***from the parent scope***</ins>

```js
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data fetched:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

fetchData('https://api.example.com/data');
```
<summary>
View Answer
</summary>
</details>

----

### 2. Arrow functions this keyword context with example

<details>

#### i) Arrow Function Inside a Parent Function
- it captures the `this` value <ins>**of the parent function**</ins> at the time it is created. 
- This is particularly useful in scenarios where you need to <ins>**preserve the context of this from the parent function**</ins>, such as in `event handlers` or `asynchronous` operations.


```js
function User(name) {
  this.name = name;
  this.activities = [];

  this.addActivity = function (activity) {
    // the arrow function inside setTimeout uses the `this` from `addActivity`
    setTimeout(() => {
      this.activities.push(activity);
      // this refers to the User instance.
      // Alice added activity: running
      console.log(`${this.name} added activity: ${activity}`); 
    }, 1000);
  };
}

const user = new User('Alice');
user.addActivity('running');
```
-----

#### ii) Arrow Functions as Parent Functions
- When arrow functions are used as parent functions, **they <ins>do not create their own this context**</ins>. 
- Instead, `this` refers to the <ins>**outer lexical context**</ins>.

```js
const profile = {
    name: 'John',
    activities: ['hiking', 'cycling'],
    // "this" inside the arrow function printActivities does not refer to profile object
    printActivities: () => {
      //"this" inside nested arrow function does not refer to the profile object,
        this.activities.forEach((activity) => {
            console.log(`${this.name} enjoys ${activity}`);
        });
    }
};

profile.printActivities(); // Output is unpredictable; `this` does not refer to `profile`
```

----

```js
// SOLUTION for above problem is to make printActivities as regular function
const profile = {
  name: 'John',
  activities: ['hiking', 'cycling'],
  printActivities: function () { // CHANGED THIS
    (() => {
      this.activities.forEach((activity) => {
        console.log(`${this.name} enjoys ${activity}`);
      });
    }).call(this); // Immediately invoked function expression (IIFE) that is called with 'this' bound to 'profile'
  },
};

profile.printActivities(); // Correct output: "John enjoys hiking" and "John enjoys cycling"
```
<summary>
View Answer
</summary>
</details>



----

### 3. Why do we use React over other frameworks(explain about virtual dom and other advantages)


<details>

#### i) Virtual DOM
- React uses a concept called the Virtual DOM, which is one of its standout features. 
- The Virtual DOM is a lightweight copy of the real DOM (Document Object Model) in memory
- React **creates a virtual DOM whenever a component’s state changes**, <ins>**then it compares the new virtual DOM with the previous version**</ins>. 
- React calculates the most efficient way to update the real DOM by making only the necessary changes. 
- This `diffing` algorithm **minimizes the number of expensive DOM manipulations**, which are typically slow and performance-intensive.

React <ins>**batches multiple updates to the virtual DOM and reconciles them in a single update pass to the real DOM**</ins>. 

#### ii) Component Based Architecture:

- **Re-usability**: 
  - `Components` are the building blocks of a React application. 
  - They are self-contained and can be reused throughout the application, which helps in reducing the codebase and increasing the consistency and maintainability of the code.
- **Encapsulation**: 
  - Components encapsulate their own `state` and logic, 
  - which simplifies the management of complex user interfaces 
  - by breaking them down into **smaller**, **manageable** pieces.

#### iii) Non-opinionated:
- Unlike frameworks like Angular, 
  - React **does not enforce** strict project structures or patterns. 
  - This flexibility **allows** developers to choose the **best tools** and **libraries** that suit their needs for state management, routing, and API interactions.

#### iv) Server Side Rendering:

- React can be rendered on the server side, which is beneficial for SEO and improves the initial load time of web pages. Frameworks like Next.js facilitate this and provide a powerful platform for building full-fledged React applications with server-side rendering.

<summary>
View Answer
</summary>
</details>



-----------

### 4. What is props drilling, how to overcome the issue (context with example), why do we use it and syntax for creating and using context

<details>
- is a common pattern in React where data is passed from a parent component down to deeply nested child components through props, even if the intermediate components do not need the data.

- This can lead to a `cluttered` and `less` `maintainable` codebase, as every component in the chain needs to explicitly pass the props down to its children.

- To overcome these issues, you can use **React's Context API**. 
- Context **provides a way to share values** like these between components <ins>**without having to explicitly pass a prop through every level of the tree**</ins>.

```js
//Creating the Context
import React from 'react';

const ThemeContext = React.createContext();
export default ThemeContext;
```


```js
// Providing Context Value:
import ThemeContext from './ThemeContext';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}
```

```js
// Consuming Context:
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function Navbar() {
  const theme = useContext(ThemeContext);  // Accessing the context value
  return <div style={{ background: theme === 'dark' ? 'black' : 'white' }}>Navbar</div>;
}
```
<summary>
View Answer
</summary>
</details>

----


### 5.  How do you handle list rendering in React while using JSX?

<details>

```js
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Smartphone' },
  { id: 3, name: 'Tablet' }
];

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```
<summary>
View Answer
</summary>
</details>

----

### 6.  If a parent component have two children, how to re-render only 1 children

<details>

- When the state of a parent component changes, typically all its children will re-render unless specific measures are taken

```js
import React, { useState } from 'react';

// ChildOne component wrapped with React.memo
const ChildOne = React.memo(({ prop1 }) => {
  console.log('Rendering ChildOne');
  return <div>{prop1}</div>;
});

// ChildTwo component without memoization
function ChildTwo({ prop2 }) {
  console.log('Rendering ChildTwo');
  return <div>{prop2}</div>;
}

// Parent component that manages state
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <h1>Parent Component</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* onClick of button both ChildOne and ChildTwo gets re-rendered`` */}
      <ChildOne prop1={count} />
      {/* onChange of input only ChildTwo gets re-rendered`` */}
      <ChildTwo prop2={text} />
    </div>
  );
}

export default Parent;
```
<summary>
View Answer
</summary>
</details>

---


### 7.  What are real dom and shadow dom

<details>

- The Real DOM `refers` to the **Document Object Model (DOM)**, which is a programming interface for HTML and XML documents. 
- The DOM represents **the document as a tree of `nodes` and `objects`**; 
- programming languages can interact with the page through the DOM.

#### Shadow DOM:
- Shadow DOM **allows hidden DOM trees to be attached** to elements in the regular DOM tree — **this hidden DOM tree is called the "shadow DOM"**. 
- The shadow DOM **has its own separate scope and does not interfere with the main document's DOM**, enabling better `encapsulation` and `isolation` of component structure, `style`, and `behavior`.

#### Differences and Usage:
- **Usage**: 
  - The `Real DOM` is <ins>**used for general web page manipulation**</ins> and is what you interact with by default when using JavaScript and CSS in a browser.
  - `Shadow DOM` is used <ins>**specifically for creating encapsulated custom elements**</ins>, part of the larger Web Components architecture.
<br/>

- **Performance**: 
  - Frequent changes in the Real DOM can be `inefficient` due to the potential for extensive re-renders. 
  - Shadow DOM minimizes this overhead <ins>**by isolating changes to a smaller, contained DOM**</ins>.
<br/>

- **Complexity and Compatibility**: 
  - Real DOM is straightforward and supported everywhere, 
  - while Shadow DOM might **introduce additional complexit**y and requires modern browser support.

<summary>
View Answer
</summary>
</details>

----

### 8. How to manage state globally without using redux (useContext and useReducer)

<details>

#### Step 1: Define Your Context
```js
import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  count: 0,
};

// Create context
const GlobalContext = createContext(initialState);

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Context Provider component
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
```

#### Step 2: Create a Component to Use the Global State
```js
import React, { useContext } from 'react';
import { GlobalContext } from './GlobalState';

const Counter = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

#### Step 3: Set Up Your App Component
```js
import React from 'react';
import { GlobalProvider } from './GlobalState';
import Counter from './Counter';

function App() {
  return (
    <GlobalProvider>
      <div>
        <h1>Welcome to the Counter App</h1>
        <Counter />
      </div>
    </GlobalProvider>
  );
}

export default App;
```
<summary>
View Answer
</summary>
</details>


-----

### 9. As redux is third party library which will take time to load compared to context(as it is built in). why you choose redux why not context

<details>

#### 1. Performance and Optimization
- **Redux**: 
  - `Optimized` for frequent updates and complex state interactions across large applications. 
  - Redux **uses a single immutable state tree**, which can be more efficient at scale because components subscribe only to the parts of the state they need. 
  - This <ins>**minimizes unnecessary re-renders**</ins>.
<br/>

- **Context API**: 
  - Suitable **for simpler or medium-scale applications**, but it can lead to performance bottlenecks in larger apps. 
  - When a context value changes, **<ins>all components consuming that context will re-render, regardless of whether the change affects them**</ins>.


#### 2. Middleware and Enhancements
- **Redux**: 
  - Supports middleware, allowing for features like `logging`, `crash reporting`, performing asynchronous tasks, and more. 
  - Middleware like `Redux Thunk` and `Redux Saga` can <ins>**handle side effects</ins> in a more manageable way**.
<br/>

- **Context API**: 
   - `Lacks` built-in middleware support, **making it less suitable for complex** asynchronous logic or other middleware-driven enhancements unless supplemented by additional libraries or custom code.
#### 3. Developer Tools and Ecosystem
- **Redux**: 
  - Has a robust set of tools, most notably the **Redux DevTools**, which allow developers 
  - to track every state change, 
  - travel through time by inspecting each action, 
  - and re-evaluate state. 
<br/>

- **Context API**: 
  - While it's simpler and integrated directly into React, it **doesn’t** have a comparable set of tools **for debugging** and `lacks` the extensive ecosystem of libraries and plugins available for Redux.

#### 4. Community and Resources
- **Redux**: 
  - Benefits from a large community and a wealth of resources, including tutorials, best practice guides, and third-party libraries. 
  - This can accelerate development and troubleshooting.
<br/>

- **Context API**:  
  - Although well-documented in the React docs, the patterns and practices around Context **are less standardized than Redux**, which can lead to inconsistent implementations across different projects.

#### 5. Predictability and Structure
- **Redux**: 
   - Enforces strict patterns and workflows, such as defining reducers and actions, which can help in maintaining a large codebase at scale. 
   - It **provides** a <ins>more predictable state management model</ins> through controlled updates.
<br/>
  
- **Context API**:  
   - Offers more flexibility, but without the enforced structure of Redux, which can lead to varied implementations and **potentially less predictable code.**
  
#### 6. Scalability
- **Redux**: 
   - Its architecture and ecosystem are <ins>**designed to scale smoothly as the application grows**</ins>. 
   - This makes it a <ins>**preferred choice</ins> for enterprise-level applications**.
<br/>
  
- **Context API**:  
   - **Best for smaller applications** or specific areas within an app where global state is overkill. Scaling can introduce performance issues as the number of context consumers grows.

#### Conclusion
- For `small` to `medium-sized` applications, especially those built as part of learning projects or **where the state is relatively straightforward**, ***React's Context API*** might be <ins>**more than sufficient**</ins> and easier to integrate. 
- However, for **`large-scale` applications with `complex state` interactions**, frequent updates, and a need for fine-grained performance optimizations, `Redux` or similar state management libraries <ins>**remain a strong choice**</ins> despite the initial overhead. 

<summary>
View Answer
</summary>
</details>

----
### 10. testing frameworks (asked about RTL)

<details>

- React Testing Library is a powerful tool for writing maintainable, reliable tests that ensure your components function as intended from a user's perspective

```js
//Button.js
import React from 'react';

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
```

```js
//Button.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

test('button click event', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  // Use user-centric queries to interact with the component.
  const button = screen.getByText('Click me');
  fireEvent.click(button);

  // Assert that the handler was called once.
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```
<summary>
View Answer
</summary>
</details>

----