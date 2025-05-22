### 1. What are the hooks ?

<details>

- React hooks **are functions** that let you "hook into" React state and lifecycle features from function components. 
- They were **introduced in React 16.8** <ins>**to enable state management and side-effects**</ins> in functional components, 

1. `useState`: 
   - This hook **lets you add state** to functional components. You can initialize it with a value and it returns a pair: the current state and a function that updates it.
  <br/>

2. `useEffect`: 
   - This hook **lets you perform side effects** in functional components. 
   - It's **similar** to lifecycle methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` **in class components**. 
   - <ins>You can use it to fetch data, set up a subscription, or manually change the DOM in React components.</ins>
  <br/>

3. `useContext`: 
   - This hook **<ins>lets you subscribe to React context</ins> without introducing nesting**. 
  <br/>

4. `useReducer`:
   -  An **alternative to `useState`**. 
   -  It's usually **preferable for managing state logic that <ins>involves multiple sub-values</ins>** or when the next state depends on the previous one.
  <br/>
  
5. `useCallback`: 
   - This hook **returns a memoized callback function**. 
   - This is <ins>**useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders**</ins>.
  <br/>

6. `useMemo`: 
   - <ins>**Returns a memoized value**</ins>. 
   - This hook is <ins>**used to optimize performance by memorizing expensive functions**</ins> so that they are not re-run on every render unless their dependencies change.
  <br/>

7. `useRef`:
   - This hook **returns a mutable ref object** whose current property is initialized to the passed argument. 
   - It can be **used to store a mutable value <ins>that does not cause re-rendering when updated**</ins>.
  <br/>

8. `useImperativeHandle`: 
   - This hook is <ins>**used with forwardRef to customize the instance value**</ins> that is exposed to parent components when using refs.
  <br/>

9. `useLayoutEffect`: 
   - **Similar to useEffect, but it fires synchronously after all DOM mutations**. 
   - Use this <ins>**to read layout from the DOM and re-render synchronously**</ins>.
  <br/>

10. `useDebugValue`: 
    - Can be used to display a label for custom hooks in React DevTools.


<summary>
View Answer
</summary>
</details>


---

### 2. How to improve the performance of an application ?

<details>

#### 1. HTML:
 - **Minimize DOM depth**: 
   - A **deeply nested DOM can slow down page performance** as it increases the time browsers spend to render content.
  - **Clean and semantic markup**: 
    - Use semantic HTML5 elements (`<main>`, `<article>`, `<section>`, etc.) which aid in the accessibility and can potentially optimize browser rendering processes.

#### 2. CSS
- **Optimize CSS delivery**: 
  - <ins>Use critical CSS techniques to **include only the styles necessary for the initial render** in the head of your HTML, **and defer non-critical CSS.**</ins>

- **Efficient selectors**: 
  - Complex selectors can slow down page rendering <ins>**as they require more processing</ins> to determine which elements they apply to**. 
  - Keep selectors simple and avoid overly specific ones.
- **Reduce reflows and repaints**: 
  - Minimize changes to the layout (reflows) and visual modifications (repaints) of pages, as these operations are costly. 
  - Use `transform` and `opacity` changes for animations when possible, as they can be optimized by the browser.

#### 3. JavaScript
- **Minimize and defer JavaScript loading**: 
  - Minimize the amount of JavaScript needed to render the page and defer loading scripts that are not necessary for the initial page render.
- **Use Web Workers for heavy computation**: 
  - <ins>**Offload heavy computations**</ins> to Web Workers to keep the UI thread free for rendering and interaction.
- **Optimize and debounce event listeners**: 
  - Especially for `scroll` or `resize` events, debounce your functions to limit the number of times they are called.
  
#### 4. React
- **Use PureComponent and React.memo**: 
  - These components and higher-order components **help prevent unnecessary re-renders** by doing shallow prop and state comparison.
- **Code splitting**: 
  - Use dynamic import() syntax or libraries like `React.lazy` and `Suspense` **to split your code into smaller chunks** and load them only when needed.
- **Optimize state updates**: 
  - Ensure that **state updates are batched when possible** and avoid unnecessary state changes.
- **Use the Profiler API**: 
  - This API helps in measuring the "cost" of rendering and **helps <ins>identify parts of the app that are slow**</ins>.

#### 5. Web Browsers
- **Caching**: 
  - Leverage **browser caching to store frequently accessed resources on the client-side**, reducing loading times on subsequent visits.
- **Preloading and prefetching resources**: 
  - Use `<link rel="preload">` for critical resources and `<link rel="prefetch">` for resources that <ins>**might be needed in the future**.</ins>
- **Optimize images**: 
  - Use modern, efficient image formats like `WebP`, `AVIF`, and ensure images are responsive by serving scaled images based on the device.

#### 6. General Best Practices
- **Performance Monitoring Tools**: 
  - Utilize tools like `Google Lighthouse`, `WebPageTest`, and `Chrome DevTools` to analyze and monitor performance.
- **HTTP/2**: 
  - Where possible, use `HTTP/2` as it supports multiplexing and server push, which can improve the loading times of web pages.
- **SSL/TLS Optimization**: 
  - Use SSL/TLS efficiently as the handshake can be costly. 
  - <ins>**Session resumption can help reduce the time needed to establish secure connections**</ins>.
<summary>
View Answer
</summary>
</details>

----

### 3. Write HTML to display cards side by side ?

<details>

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Side by Side Cards</title>
<style>
  .card-container {
    display: flex;          
    justify-content: space-around;
    align-items: stretch;   
    padding: 20px;          
  }
  .card {
    width: 30%;            
    padding: 20px;         
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
    background: white;     
    margin: 10px;          
  }
</style>
</head>
<body>

<div class="card-container">
  <div class="card">
    <h3>Card 1</h3>
    <p>This is the first card. It contains some example text to demonstrate the card layout.</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>This is the second card. It continues to provide content similar to what might be seen in a standard card layout.</p>
  </div>
  <div class="card">
    <h3>Card 3</h3>
    <p>This is the third card. Each card has the same width and padding, aligning neatly in a row.</p>
  </div>
</div>
</body>
</html>

```
<img src="./imagesUsed/displayCards.png">

<summary>
View Answer
</summary>
</details>

------

### 4. useMemo vs. useCallback ?

<details>

-  both `useMemo` and `useCallback` are hooks that **help you <ins>optimize the performance of your components**</ins> by memorizing expensive calculations or functions. 

#### `useMemo`:
- is used to <ins>**memorize the results of an expensive calculation**</ins>. 
- If the <ins>*dependencies of this calculation have not changed*, **React will skip executing it again** and reuse the last returned value</ins>. 
- This can be helpful in avoiding costly recalculations each time the component re-renders, which is particularly useful if the calculation is dependent on props or state that doesn't change frequently.

```js
import React, { useMemo, useState } from 'react';

function SortedList({ items }) {
  // Use useMemo to only re-sort the items when the 'items' array changes
  // to ensure that the sorting computation is not unnecessarily repeated on every render.
  const sortedItems = useMemo(() => {
    console.log("Sorting items");
    return [...items].sort();
  }, [items]);

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// Usage in another component
function App() {
  const [items, setItems] = useState(['orange', 'apple', 'banana']);

  // Function to shuffle the items array
  // calculates a sorted list based on an input list that only changes when a user performs a specific action
  const shuffleItems = () => {
    setItems(items => {
      const result = [...items];
      result.sort(() => Math.random() - 0.5);
      return result;
    });
  };

  return (
    <div>
      <button onClick={shuffleItems}>Shuffle Items</button>
      <SortedList items={items} />
    </div>
  );
}

export default App;
```

- Use `useMemo` <ins>**when you need to memorize the result of a computation or derive new data from props or state.**</ins>

----

#### `useCallback`:

- The `useCallback` hook is used <ins>**to memorize a function instance**</ins>. 
- This is <ins>**useful when passing callback functions to optimized child components that rely on reference equality to avoid unnecessary renders**</ins>. 
- If the function’s dependencies don’t change, **React reuses the same function instance** between renders.

```js
import React, { useCallback, useState, memo } from 'react';

const ExpensiveButton = memo(({ onCalculate }) => {
  console.log('Button rendered');
  return <button onClick={onCalculate}>Calculate</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleCalculate = useCallback(() => {
    console.log('Calculation performed');
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveButton onCalculate={handleCalculate} />
    </div>
  );
}

export default App;
```

- Use `useCallback` <ins>**when you need to memorize a callback function to pass it as a prop to child components**</ins>, especially when these children are optimized to avoid unnecessary re-renders.
<summary>
View Answer
</summary>
</details>

-----

### 5. About React.lazy?

<details>

- `React.lazy` **is a function** in React that <ins>**allows you to load components lazily through code splitting**</ins>. 
- This means that the component will only be loaded when it is needed, rather than loading it up front with the rest of the bundle.
- This can significantly improve the performance of your application <ins>**by reducing the initial load time**</ins>.
- `React.lazy` **works with dynamic imports**, a feature that <ins>**allows you to import modules asynchronously**</ins>. 
- Used in conjunction with the `Suspense` component which allows you to specify a loading indicator while the lazy component is being loaded.

```js
import React, { Suspense } from 'react';

// Lazily import the ChartComponent
const LazyChartComponent = React.lazy(() => import('./ChartComponent'));

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Suspense fallback={<div>Loading Chart...</div>}>
        <LazyChartComponent />
      </Suspense>
    </div>
  );
}

export default App;
```
```js
import React from 'react';

const ChartComponent = () => {
  return (
    <div>
      <h2>Chart Data</h2>
      {/* Chart rendering logic here */}
      <p>This is a complex chart component with significant JS size.</p>
    </div>
  );
};

export default ChartComponent;
```
<summary>
View Answer
</summary>
</details>

---

### 6. Next.js basic concepts ?

<details>

- a popular framework built on top of React **that enables functionality such as `server-side rendering` and `static site generation`**, which are beneficial for performance and SEO. 


- #### Static Site Generation (SSG): 
    - Next.js supports generating a full static website using `getStaticProps` and `getStaticPaths`
    - These functions **allow you to <ins>fetch data at build time</ins>** and <ins>**render your HTML pages ahead of time**</ins>, which can be served directly from a CDN.


- #### Server-Side Rendering (SSR)
  - You can **render pages on the server** on a per-request basis using `getServerSideProps`. 
  - This is useful for fetching data per request and **doing operations that require server-side computation** or access to secure environments not suitable for the client-side.

- #### Image Optimization
  - The `Image` component from **next/image** is an extension of the HTML `<img>` element **designed for automatic image optimization**. 


<summary>
View Answer
</summary>
</details>

-----

### 7. About common components ?

<details>

- Referred to `shared` or `re-usable` components
- Promoting `DRY` (Don't Repeat Yourself) principles and improving code maintainability and scalability.

```js
// RE-USABLE BUTTON COMPONENT
import React from 'react';

// Button component with customizable properties
const Button = ({ text, onClick, type = 'primary' }) => {
  const buttonStyle = type === 'primary' ? 'button-primary' : 'button-secondary';
  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
```

```js
//App.js
import React from 'react';
import Button from './Button';

const App = () => {
  return (
    <div>
      <Button text="Click Me" onClick={() => alert('Clicked!')} type="primary" />
      <Button text="Submit" onClick={() => alert('Submitted!')} type="secondary" />
    </div>
  );
};

export default App;
```
#### Benefits of Common Components:

- **Consistency**: 
  - Using the same components throughout an application ensures UI/UX consistency, which is crucial for user navigation and satisfaction.
- **Maintainability**: 
  - Updates or changes made in a common component propagate throughout the application wherever it is used. This makes maintenance easier and reduces the risk of bugs.
- **Scalability**: 
  - As applications grow, having a library of common components **can greatly simplify the process of scaling up**. 
  - New pages and features can be built more quickly by leveraging existing components.

<summary>
View Answer
</summary>
</details>

----

### 8.  HOC and custom hooks implementation?

<details>

#### i) HOC:
- Higher-Order Components (HOCs) are a **pattern used in React to share common functionality between components without repeating code**. 
- An HOC is a function that takes a component and returns a new component.

```js
import React from 'react';

// This is the HOC
function withLoading(Component) {
  //The reason for naming the function EnhancedComponent when using a 
  // higher-order component (HOC) in React is primarily for clarity and better debugging. 
  // However, it's not strictly necessary to give the function a name, 
  // and you can indeed return an anonymous function.
  return function EnhancedComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Example usage of the HOC
function MyComponent({ data }) {
  return <div>Data: {data}</div>;
}

// EnhancedComponent will show a loading spinner when isLoading is true
const MyComponentWithLoading = withLoading(MyComponent);

export default MyComponentWithLoading;
```
```js
// in App.jsx
import React from 'react';
import MyComponentWithLoading from './MyComponentWithLoading'; // Assuming the export is set up

function App() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setData("Here's some data!");
      setLoading(false);
    }, 2000); // Simulate fetching data
  }, []);

  return (
    <div>
      <MyComponentWithLoading isLoading={loading} data={data} />
    </div>
  );
}

export default App;
```

----

#### ii) CUSTOM HOOKS:

```js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, [url]); // Only re-run the effect if url changes

  return { data, loading, error };
}

export default useFetch;
```

```js
// using the custom hook

import React from 'react';
import useFetch from './useFetch'; // Assuming useFetch is in a file named useFetch.js

function DataFetchingComponent({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Data: {JSON.stringify(data)}</div>;
}

export default DataFetchingComponent;
```
<summary>
View Answer
</summary>
</details>


-----

### 9.  Login screen design authentication and authorization.

<details>

#### 1. User Interface Design
- **Form Components**: Use `controlled components` in React for inputs to handle form data securely.
- **Responsiveness**: Ensure the login page is `responsive` using CSS frameworks like Bootstrap or TailwindCSS, or by using CSS Grid and Flexbox.
- **Feedback**: <ins>***Provide immediate input validation feedback***</ins> to enhance user experience (UX). 
  - Use libraries like `Formik` or `React Hook Form` to manage form state and validation.

#### 2. Authentication Process
- **API Integration**: 
  - Discuss how you would **connect the login form to backend services using Axios** to submit user credentials.
- **JWT (JSON Web Tokens)**: 
  - Explain the use of JWT **for maintaining user sessions**. 
  - Describe how the token is stored securely in the browser <ins>(e.g., using HttpOnly cookies or localStorage with proper security measures against XSS attacks).</ins>
- **Password Handling**: 
  - Mention the importance of **hashing passwords on the server side** and never transmitting or storing plain-text passwords.
  
#### 3. Security Considerations
- **HTTPS**: 
  - using HTTPS to secure data transmission between the client and the server.
- **CORS (Cross-Origin Resource Sharing)**: 
  - handle CORS in React by configuring the **server to accept requests from specific origins**.
- **CSRF (Cross-Site Request Forgery) Protection**: 
  - one strategy is using a**nti-CSRF tokens**.

#### 4. Authorization
- **Role-Based Access Control (RBAC)**: 
  - to manage user permissions and access levels within the application.
- **Protected Routes**: 
  - Use `React Router` for navigating protected or private routes that require authentication. 
  - Discuss how to redirect users to the login page if they are not authenticated.
- **Context API or Redux**: 
  - Any state management library like Redux **to manage global authentication state across all components**.

#### 5. Session Management
- **Token Expiry and Renewal**: 
  - Discuss handling token expiry, <ins>**including automatic renewal of tokens through refresh tokens**</ins> if implemented.
- **User Logout**: 
  - Ensure proper logout functionality <ins>**that clears the session and tokens securely from the client-side storage**</ins>.



#### 6. Error Handling
- **User Feedback**: 
  - Implement and explain robust error handling that provides clear, user-friendly error messages **for issues like network errors, wrong credentials, or server downtime**.
- **Try/Catch**: 
  - Use try/catch blocks in asynchronous actions to handle exceptions and errors gracefully.


#### 7. Testing and Best Practices
- **Unit Testing**: 
  - Talk about using `Jest` and `React Testing Library` to write unit tests for components and hooks.
- **End-to-End Testing**: 
  - Mention tools like `Cypress` or `Selenium` for end-to-end testing of the authentication flow.
- **Code Quality**: 
  - Discuss the importance of coding best practices such as linting with ESLint, formatting with Prettier, and following secure coding guidelines.


```js
//api.js
import axios from 'axios';

const API_URL = 'https://your-api-url.com/api';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // This should include the JWT
  } catch (error) {
    console.error('Login error', error.response);
    throw error.response.data;
  }
};
```
```js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                // Check if token expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                } else {
                    setUser(decodedToken);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
```

```js
//Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            // Redirect or perform some action after login
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
```

```js
//PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;
```

```js
//App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';
import PrivateRoute from './PrivateRoute';  // Imported PrivateRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/admin" component={AdminPanel} roles={['admin']} />
        <Redirect from="/" to="/dashboard" />
      </Routes>
    </Router>
  );
};

export default App;
```

<summary>
View Answer
</summary>
</details>

------

### 10. Promises.

<details>

#### i) Why Promises?
- Promises in JavaScript are a powerful tool **for managing <ins>asynchronous operations</ins>**.

#### ii) What problems does Promises solve?

- Provide a **cleaner, more robust <ins>alternative**</ins> to older techniques like <ins>**callbacks and events**</ins> for handling asynchronous tasks such as network requests, file operations, or timers

#### Definition
- A Promise in JavaScript **is an object** <ins>representing the eventual ***completion (or failure)*** of an asynchronous operation</ins>. 
- It essentially <ins>**promises to give you a result at some point in the future**</ins>, either a successful result or a reason for its failure.

#### States of a Promise
- A Promise has three states:

  - **Pending**: Initial state, neither fulfilled nor rejected.
  - **Fulfilled**: The operation completed successfully.
  - **Rejected**: The operation failed.

#### Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Promise is fulfilled successfully!');
    } else {
        reject('Promise was rejected!');
    }
});
```

```js
// Consuming a Promise
// To handle the results of a promise, 
// you can use the .then() and .catch() methods.

.then()
.catch()
```

#### Chaining Promises
- Promises can be chained **to perform a sequence of asynchronous operations <ins>where each subsequent operation starts when the previous one is successful, and its result becomes the input for the next</ins>**.

```js
new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); // Simulate async operation
})
.then(result => {
    console.log(result); // 1
    return result * 2;
})
.then(result => {
    console.log(result); // 2
    return result * 2;
})
.then(result => {
    console.log(result); // 4
    return result * 2;
});
```

#### Error Handling:

```js
new Promise((resolve, reject) => {
    throw new Error('Something failed!');
})
.then(result => {
    // This won't be called
})
.catch(error => {
    console.error(error.message); // "Something failed!"
});

```
<summary>
View Answer
</summary>
</details>

----

11.  Normalization techniques in database.
  
12. About Micro-frontend and it Pros, cons, communication between MFE, sharing common component between MFE, Design Question

----------


### 13. About SOLID principles.

<details>

- The `SOLID` principles <ins>**are a set of five**</ins> design guidelines 
- This will help developers create software that is easier to `understand`, `maintain`, and `extend`.
- can be applied in JavaScript development <ins>**to improve code quality and modularity**</ins>. 

#### 1. Single Responsibility Principle (SRP)

<ins>**Principle**:</ins> 
  - A class <ins>**should have one, and only one**</ins>, reason to change.

<ins>**Problem it solves**:</ins>  
  - SRP <ins>**reduces** the complexity of code</ins>, making it easier to maintain and less susceptible to bugs because changes in one part of the system are less likely to affect other parts.

```js
// Bad practice: 
// A class that handles both user data management and JSON serialization
class UserData {
    constructor(user) {
        this.user = user;
    }

    saveUser() {
        // Save the user data to a database
    }

    serializeUser() {
        return JSON.stringify(this.user);
    }
}

// Good practice: 
// Separate classes with single responsibilities
class UserData {
    constructor(user) {
        this.user = user;
    }

    saveUser() {
        // Save the user data to a database
    }
}

class UserSerializer {
    static serialize(user) {
        return JSON.stringify(user);
    }
}
```


#### 2. Open/Closed Principle (OCP)

<ins>**Principle**:</ins> 
  - Software entities should be open for extension, but closed for modification.  

<ins>**Problem it solves**:</ins>  
  -  This principle helps in <ins>managing future changes and new functionalities in an application **without altering existing code**</ins>, thus reducing the risk of introducing bugs.

```js
// Bad practice: A function that is modified every time a new shape is added
function drawShape(shape) {
    if (shape.type === 'circle') {
        drawCircle(shape.radius);
    } else if (shape.type === 'square') {
        drawSquare(shape.side);
    }
}

// Good practice: Use polymorphism to handle different shapes
class Shape {
    draw() {}
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    draw() {
        drawCircle(this.radius);
    }
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    draw() {
        drawSquare(this.side);
    }
}

function drawShape(shape) {
    shape.draw();
}
```

#### 3. Liskov Substitution Principle (LSP)

<ins>**Principle**:</ins> 
- `Objects` in a program **should be replaceable** with `instances` of their subtypes without altering the correctness of the program.

<ins>**Problem it solves**:</ins>  

- It ensures that **<ins>a subclass can stand in for its base class without errors**</ins>, leading to enhanced reliability and modularity in code.

```js
// Bad practice: Subclass changes the behavior of the base class in a way that can lead to errors
class Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Cannot fly");
    }
}

// Good practice: Correct hierarchy
class Bird {
    // Common bird behavior
}

class FlyingBird extends Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    // Penguins cannot fly, no fly method here
}
```


#### 4. Interface Segregation Principle (ISP)
<ins>**Principle**:</ins> 
  - No client should be forced to depend on methods it does not use.

<ins>**Problem it solves**:</ins>  
- Prevents the design of "fat" interfaces **that have too many responsibilities**, which can lead to `bloated` and `confusing` implementations in classes.

```js
// Bad practice: An interface with too many responsibilities
class Worker {
    work() {}
    eat() {}
}

class HumanWorker extends Worker {
    work() {
        console.log("Working");
    }

    eat() {
        console.log("Eating lunch");
    }
}

class RobotWorker extends Worker {
    work() {
        console.log("Robot working");
    }

    eat() {
        // Robots do not eat, but must implement this method
    }
}

// Good practice: Separated interfaces
class Workable {
    work() {}
}

class Eatable {
    eat() {}
}

class HumanWorker implements Workable, Eatable {
    work() {
        console.log("Working");
    }

    eat() {
        console.log("Eating lunch");
    }
}

class RobotWorker implements Workable {
    work() {
        console.log("Robot working");
    }
}
```


#### 5. Dependency Inversion Principle (DIP)
<ins>**Principle**:</ins> 
  - High-level modules should not depend on low-level modules. Both should depend on abstractions.

<ins>**Problem it solves**:</ins>  
- DIP **helps in <ins>reducing the dependencies between the components</ins> of an application**, which simplifies `updates` and `maintenance`. 
- It `enables` high-level modules to remain unaffected by changes in low-level modules and their implementation.

```js
// BAD PRACTICE CODE

// Low-level module
class EmailService {
    sendEmail(message, recipient) {
        // Sends email to the recipient
        console.log(`Sending an email to ${recipient}: ${message}`);
    }
}

// High-level module
// In this example, high-level modules directly depend on low-level modules, 
// leading to tight coupling and reduced flexibility.
class NotificationService {
    constructor() {
        this.emailService = new EmailService();
    }

    notify(message, recipient) {
        this.emailService.sendEmail(message, recipient);
    }
}

// Usage
const notifier = new NotificationService();
notifier.notify("Hello, your order has been shipped!", "customer@example.com");
```

----

```js
// GOOD PRACTICE

// Abstraction
class MessageService {
    send(message, recipient) {}
}

// Low-level module
class EmailService extends MessageService {
    send(message, recipient) {
        // Sends email to the recipient
        console.log(`Sending an email to ${recipient}: ${message}`);
    }
}

// High-level module
class NotificationService {
    constructor(messageService) {
        this.messageService = messageService;
    }

    notify(message, recipient) {
        this.messageService.send(message, recipient);
    }
}

// Usage
const emailService = new EmailService();
const notifier = new NotificationService(emailService);
notifier.notify("Hello, your order has been shipped!", "customer@example.com");
```
<summary>
View Answer
</summary>
</details>

-----

### 14.  How to Implement offers in the E-commerce sites.

<details>

#### Key Components:
- **Offers Management**: Backend system to `create`, `store`, and `manage` offers.
- **Offers Application Logic**: Logic to determine **which offers are applicable** to the cart.
- **Frontend Display**: `Show` ***applicable*** offers to users

#### i) Backend Setup
- First, you need a backend service **that manages offers**. 
- This can be part of your e-commerce platform. 
- Offers might be stored in a database with fields like 
  - `id`, 
  - `description`, 
  - `discountType`, 
  - `discountValue`, 
  - `criteria`

```js
// EXAMPLE OF A SIMPLE OFFER
{
  "id": "OFF10",
  "description": "10% off on all electronics",
  "discountType": "percentage",
  "discountValue": 10,
  "criteria": {
    "category": "electronics"
  }
}
```

---

### ii) Frontend Implementation

- In the frontend, **you'd typically fetch these offers from the backend** and `apply` them based on the cart's contents. 


#### Step 1: Fetch and Store Offers

```js
// Assuming Context API to manage state, 
// we would fetch offers when the application loads or when the cart contents change.

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchOffers = async () => {
  const response = await axios.get('/api/offers');
  return response.data;
};

const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

useEffect(() => {
  const fetchAndSetOffers = async () => {
    const offers = await fetchOffers();
    setOffers(offers);
  };

  fetchAndSetOffers();
}, []);


  return (
    <OffersContext.Provider value={offers}>
      {children}
    </OffersContext.Provider>
  );
};
```
----

#### i) Step 2: Assuming we have a CartContext
- includes functions to 
  - `add` items to the cart, 
  - `remove` items, 
  - `clear` the cart. 

We'll also keep track of the cart items and total items count.

```js
import React, { createContext, useContext, useReducer } from 'react';

// Define the shape of the cart's state
const initialState = {
  items: [],
  totalItems: 0
};

// Create the cart context
const CartContext = createContext(initialState);

// Reducer function to handle actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Increase the quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          totalItems: state.totalItems + 1
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1
        };
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          ),
          totalItems: state.totalItems - 1
        };
      } else {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          totalItems: state.totalItems - 1
        };
      }
    case 'CLEAR_CART':
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Create a provider for components that consumes and updates the context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = item => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = id => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ items: state.items, totalItems: state.totalItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => useContext(CartContext);
```

```js
// Usage of useCart

import React from 'react';
import { useCart } from './CartContext';

const AddToCartButton = ({ product }) => {
  const { addItem } = useCart();

  return <button onClick={() => addItem(product)}>Add to Cart</button>;
};

export default AddToCartButton;
```
----

#### ii) Step 2: Apply Offers to Cart
- `Create` a function **to apply offers to the items in the cart**. 
- This function **should check each item** against the offer criteria.

```js
// function to apply offers to each item in the cart
const applyOffersToCart = (cart, offers) => {

  // map over each item in the cart to apply any applicable offers
  const newCart = cart.map(item => {

    // Filter offers to find those that match the item's category
    const applicableOffers = offers.filter(offer => offer.criteria.category === item.category);

    // Reduce the applicable offers to find the best one based on the discount value
    const bestOffer = applicableOffers.reduce((best, current) => {

      // Check if the current offer has a higher percentage discount than the best one found so far
      if (current.discountType === 'percentage' && current.discountValue > (best.discountValue || 0)) {
        return current; // Return the current offer if it's better
      }
      return best; // Otherwise, keep the best offer found so far
    }, null);

    // If there is a best offer found, apply it to the item
    if (bestOffer) {

      // Calculate the discount amount. If it's a percentage discount, calculate the discount based on the item's price
      const discount = bestOffer.discountType === 'percentage' ? 
        item.price * (bestOffer.discountValue / 100) : // Calculate percentage discount
        bestOffer.discountValue; // Or use the fixed discount value

      // Return a new item object with the adjusted price and the description of the applied offer
      return { ...item, price: item.price - discount, appliedOffer: bestOffer.description };
    }

    // If no offer is applicable, return the item unchanged
    return item;
  });

  // Return the updated cart with all applicable discounts applied
  return newCart;
};
```

----

#### Step 3: React Components

- Now, integrate this logic into your React components. 

Here's an example of how you might display this in the cart component.

```js
import React, { useContext } from 'react';
import { CartContext, OffersContext } from './contexts';

import { applyOffersToCart } from './utils';  // Ensure this path is correct

const Cart = () => {
  const { items: cartItems } = useContext(CartContext);  // Destructure to get items directly
  const offers = useContext(OffersContext);

  // Now `cartItems` should be an array of items as per the CartContext's design
  const cartWithOffers = applyOffersToCart(cartItems, offers);

  return (
    <div>
      {cartWithOffers.map((item, index) => (
        <div key={index}>
          <p>{item.name}: ${item.price.toFixed(2)}</p>
          {item.appliedOffer && <p>Offer Applied: {item.appliedOffer}</p>}
        </div>
      ))}
    </div>
  );
};

export default Cart;
```
<summary>
View Answer
</summary>
</details>



------

### 15.    useEffect 
    - explain how we achieve different lifecycle
    - Behavior with different dependency array - null, [], [value]
 
<details>

#### 1. componentDidMount Equivalent
```js
useEffect(() => {
  // Code to run on component mount
}, []); // Empty dependency array, tells React to run the effect once after the initial render
```
#### 2. componentDidUpdate Equivalent

```js
useEffect(() => {
  // Code to run when dependencies update
  // Here, the effect runs after the initial render and whenever any value in the dependency array changes
}, [value]); // Dependency array with specific values
```

#### 3. componentWillUnmount Equivalent
```js
useEffect(() => {
  return () => {
    // Cleanup code here.....
    // Cleanup before the component is removed from the UI, e.g., removing event listeners, cancelling network requests.
  };
}, []); // Empty dependency array indicates this runs on unmount
```

#### 4. No Dependency Array (null):
```js
useEffect(() => {
  // The effect runs after every render of the component.
});
```
<summary>
View Answer
</summary>
</details>

----

### 16. useRef vs forwardRef

<details>

### <ins>useRef</ins>:
### Why Introduced:
- `useRef` was introduced as part of the Hooks API in React 16.8 to allow functional components <ins>**to access DOM elements** **that do not cause re-render when updated**</ins>. 

### Problems it Solves:

**i) Accessing DOM elements directly**
- Sometimes, you need to directly interact with a DOM node for 
  - `focusing`, 
  - `measuring` **the node’s dimensions**.

**ii) Storing mutable values:**
- `useRef` provides a container <ins>**for storing values that can persist through the component lifecycle `without` `triggering` `rerenders` when the data changes, unlike state**.</ins>

### When to Use:

- When you need **to manage a reference to a `DOM` node**.
- When you want to store a value that persists for the life of the component <ins>**but does not trigger a rerender when updated**.</ins>

### Example:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  
  useEffect(() => {
    // Directly access the DOM element to set focus
    inputEl.current.focus();
  },[]);

  return (
    <>
      <input ref={inputEl} type="text" />
    </>
  );
}
```
----

### <ins>forwardRef</ins>:

### Why Introduced:
- was introduced <ins>**to allow refs to be passed through components to a child component**</ins> (usually a DOM element inside the child component). 

### Problem it Solves:
<ins>**Managing focus, selection, or animations**:</ins>
   - In complex components like `modals` or `inputs`, managing `focus` or `animations` **often <ins>requires direct access to the DOM node</ins>**, and forwardRef makes this management possible.


### When to Use:
- When you <ins>**need to allow parent components to directly interact with DOM nodes in a child component**</ins>.

### Example:
```js
const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

function App() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.log("Button is mounted and can be accessed");
    }
  }, []);

  return <FancyButton ref={ref}>Click me!</FancyButton>;
}
```

### Summary:
- Use `useRef` <ins>**when you need a reference within a component**</ins> or you need to store a mutable value that doesn’t cause re-renders.
- Use `forwardRef` <ins>**when you need to forward a ref from a parent component to a child**</ins>, especially in higher-order components or libraries.

<summary>
View Answer
</summary>
</details>


----


### 17.  Typescript questions

#### 1. Explain the basic types in TypeScript.

<details>

`Boolean`: **True** or **false** value.
`Number`: Floating point values.
`String`: Textual data type.
`Array`: Collection of data either in the form Type[] or Array<Type>.
`Tuple`: An `array` with `fixed` number of elements whose types are `known`.
`Enum`: A way of giving more friendly names to sets of numeric values.
`Any`: A catch-all type **that can be anything**.
`Void`: **Absence of a type**, used in `function` returns to indicate no value is returned.
`Null` and `Undefined`: Same as in JavaScript but used with other types in a union to allow those types as well.
`Never`: Represents type for values that **never occur** (e.g., a function that throws an error).
<summary>
View Answer
</summary>
</details>

----

#### 2. What are Interfaces in TypeScript and how are they used?

<details>

   - **Define the structure of an object**, 
   - enforcing certain properties or methods to be present in the object. 
   - They are used to define custom types without creating classes. 
   - Interfaces can include properties and method definitions, and they can be extended or implemented by classes. 
   - This is particularly useful for defining contracts within your code as well as contracts with code outside of your project.
   - 
<summary>
View Answer
</summary>
</details>


----

#### 3. What is the difference between `interface` and `type` in TypeScript?

<details>
- `Interface`: 
  - An interface can be `merged` (open-ended) and `extended`. 
  - It is typically **used when defining shapes for objects**, especially when it comes to the integration with classes.
<br/>

- `Type`: 
  - The type alias **cannot be reopened to add new properties and `isn’t` extendable**. 
  - It is a definition of a type that could be a `primitive`, `union`, `intersection`, `tuple`, or any other type. 
  - type is more versatile than interface and can be used for a broader set of type definitions.
<summary>
View Answer
</summary>
</details>



-----



### 18.  What is sass and why it was introduced, what problems does it solve


<details>

- Sass (Syntactically Awesome Style Sheets) is a `preprocessor` scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). 
- It introduces a richer set of features compared to pure CSS, 
  - such as `variables`, 
  - nested rules, 
  - mixins,
  - functions. 
  
`Sass` is available in `two` syntaxes: 
  - the original syntax called "the indented syntax" 
  - and the newer "SCSS" (Sassy CSS) which uses `braces` and `semicolons`, much like CSS.

#### Why Was Sass Introduced?
- Sass was introduced <ins>**to enhance the functionality of CSS to make it more `powerful` and `manageable`**</ins>, especially for `larger`, ***more complex*** style sheets. 
<br/>

- **DRY Principle**: 
  - Sass `promotes` the DRY (Don't Repeat Yourself) principle by <ins>**allowing styles to be reused**</ins> through features like `variables` and `mixins`. 
  - This reduces repetition in CSS and makes maintenance easier.
<br/>

- **Organized Code**: 
  - Sass facilitates better organization of CSS code with features like nesting, which aligns with the visual hierarchy of HTML.
<br/>

- **Advanced Features**: It provides advanced functionalities like loops, conditionals, and arithmetic operations which are not available in plain CSS.

#### What Problems Does Sass Solve?

**1. Code Repetition and Maintenance**: 
   - Managing `colors`, 
   - `font stacks`, 
   - Sass variables allow these elements to be <ins>**defined once and reused throughout the stylesheet**</ins>, simplifying updates and ensuring consistency.
<br/>



**2. Complexity in Large Stylesheets:**
   - For large projects, `CSS` can become **cumbersome** to manage. 
   - Sass <ins>**allows splitting the code into multiple files**</ins> (partials) and then importing them into a main stylesheet, making the codebase more `modular` and `manageable`.
<br/>

### Code Example: 

```js
//variables
$primary-color: #333;
body {
  color: $primary-color;
}
```

```js
// Nesting Selectors within one another to reflect HTML structure
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li { display: inline-block; }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
<summary>
View Answer
</summary>
</details>

---

### 19.   I have service which will give data of an employee and hierarchy, we need to display that data in ui exactly like teams organization structure, how you will achieve that?


<details>

#### 1. Data Retrieval and Management
**i) Fetch the Data:**

- Use a service API to **retrieve `employee` and `hierarchy` data**. 
- You should fetch this data in a top-level component or through React context if the data needs to be accessible across multiple components.

**ii) State Management:**

- Consider using React’s built-in state management (useState, useReducer) for smaller applications or libraries like `Redux` or MobX for larger applications, especially if the data is complex and accessed in many parts of your application.
- Use React Query or SWR for data `fetching`, `caching`, and `synchronization`. 
- These libraries provide hooks that handle caching, background updates, and stale data, reducing the need to manage these concerns manually.



#### 2. Component Structure

**i) Building the Tree Structure:**

- Create a `recursive` component that can render itself and its children. 
- This is particularly **effective for hierarchical data** where each node (employee) may have sub-nodes (subordinates).
- Each employee component can be responsible for rendering its data and the data of its subordinates.

#### Example Component:
```js
const EmployeeNode = ({ employee }) => {
  return (
    <div className="employee-node">
      <div className="employee-details">
        {employee.name}
      </div>
      {employee.subordinates.length > 0 && (
        <div className="employee-subordinates">
          {employee.subordinates.map(sub => (
            <EmployeeNode key={sub.id} employee={sub} />
          ))}
        </div>
      )}
    </div>
  );
};
```

Similarly use other libraries for following:

**Styling**: 
  - Styled-components, 
  - Tailwind CSS

**Performance**: 
  - React-window, 
  - React-virtualized


**Testing**: 
  - Jest, 
  - React Testing Library, 
  - Cypress


<summary>
View Answer
</summary>
</details>

-----