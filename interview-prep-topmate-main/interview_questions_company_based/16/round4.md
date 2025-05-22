### 1. List various events available in React.

<details>

#### Mouse Events
- `onClick`: Triggered when a **mouse click** is detected.
- `onDoubleClick`: Triggered when a **double click** is detected.
- `onMouseDown`: Triggered when the **mouse button is `pressed`**.
- `onMouseEnter`: Triggered when the mouse **pointer `enters` the element**.
- `onMouseLeave`: Triggered when the mouse **pointer `leaves` the element**.
- `onMouseMove`: Triggered when the mouse **pointer is `moving` over an element**.
- `onMouseOut`: Triggered when the mouse **pointer `moves` `out` of an element**.
- `onMouseOver`: Triggered when the mouse **pointer `moves` `over` an element**.
- `onMouseUp`: Triggered when a mouse button is **`released over` an element**.

---

#### Keyboard Events
- `onKeyDown`: Triggered when a **key is pressed `down`**.
- `onKeyUp`: Triggered when a **key is `released`**.

---

#### Form Events
- `onChange`: Triggered when the value of a `<input>`, `<select>`, or `<textarea>` element **has been changed**.

- `onInput`: Triggered when an `<input>` or `<textarea>` value changes.
- `onSubmit`: Triggered when a `form` is **submitted**.

--- 

#### UI Events
- `onScroll`: Triggered when an element's scrollbar **is being `scrolled`**.
- `onResize`: Triggered when a window or frame is `resized`.

----

#### Focus Events
- `onFocus`: Triggered when an element **`receives` focus**.
- `onBlur`: Triggered when an element **`loses` focus**.

-----

#### Drag Events
- `onDrag`: Triggered when an element is **being `dragged`**.
- `onDragEnd`: Triggered when a **drag operation is `completed`**.
- `onDragEnter`: Triggered when a **dragged element `enters` a valid drop target**.
- `onDragExit`: Triggered when an  **element is being dragged `leaves a valid drop` target**.
- `onDragLeave`: Triggered when a **dragged element `leaves` a drop target**.
- `onDragOver`: Triggered when an element is being `dragged over a drop` target.
- `onDragStart`: Triggered when the user **`starts` `dragging`** an element.
- `onDrop`: Triggered when a **dragged element is `dropped`** on a valid drop target.

----

#### Clipboard Events
- `onCopy`: Triggered when the **user initiates a `copy` action** through the browser's user interface.
- `onCut`: Triggered when the **user initiates a `cut` action** through the browser's user interface.
- `onPaste`: Triggered when the **user initiates a `paste`** action through the browser's user interface.

<summary>
View Answer
</summary>
</details>





--------

### 2. Local storage and session storage in the context of web browsers.

<details>

- Both are part of the Web Storage API which provides mechanisms for web applications <ins>**to store data in a web browser**</ins>.
- They allow the storage of data <ins>**in key-value pairs**</ins> and are more `intuitive` and `flexible` **than cookies**, with a `larger` `capacity`.

#### i) localStorage

- provides a way to store data on the client's computer **for <ins>long-term storage**</ins>. 
- Data stored in localStorage <ins>**has no expiration time**</ins> 
- <ins>**remains stored**</ins> on the user's browser **until `explicitly` deleted**. 
- Changes made are saved and available for all `current` and `future` visits to the site.

#### Features of localStorage:
- **Persistence**: Data persists <ins>**even when the browser is `closed` and `reopened`**</ins>.
- **Capacity**: Typically allows about **5MB** of data to be stored, though this limit can vary by browser.
- **Scope**: Available from all windows/tabs with the same origin (protocol, host, and port).
- **Use Cases**: 
  - <ins>**Storing user preferences**</ins>, 
  - <ins>**saving the state**</ins> of a complex web application, 
  - or keeping user data available for prolonged periods without expiration.  

```js
// Storing data
localStorage.setItem('username', 'JohnDoe');

// Retrieving data
const username = localStorage.getItem('username');
console.log(username);

// Removing data
localStorage.removeItem('username');

// Clearing all data
localStorage.clear();
```

#### ii) sessionStorage
- sessionStorage is **`similar`** to localStorage in its method of storage, <ins>**but it has a shorter lifetime**</ins>. 
- Data stored in sessionStorage <ins>**gets cleared when the page session ends**</ins>. 
- A page session <ins>**lasts as long as the browser is open and survives over page reloads and restores**</ins>. 
- However, **opening a page in a new tab or window <ins>will start a new session</ins>**, which differs from localStorage where data is shared across all tabs and windows.

#### Features of sessionStorage:
- **Lifetime**: Data is **`cleared`** when the tab is closed.
- **Capacity**: Similar to localStorage, around `5MB` of data.
- **Scope**: Data is available **only within the `same` tab**/window that created it.
- **Use Cases**: 
  - Sensitive data that should not persist beyond the session, 
  - such as **form data entries** or 
  - single session-based games.

```js
// Storing data
sessionStorage.setItem('sessionName', 'SessionData');

// Retrieving data
const sessionData = sessionStorage.getItem('sessionName');
console.log(sessionData);

// Removing data
sessionStorage.removeItem('sessionName');

// Clearing all data within the session
sessionStorage.clear();
```
**Security**: 
  - Both are subject to the `same-origin` policy for security 
  - but do not transmit data with every server request like cookies, reducing the risk of interception by malicious actors.

<summary>
View Answer
</summary>
</details>


----

### 3. Difference between using cookies and local storage as we can achieve the same stuff with local storage/ session storage as well?


<details>

#### 1. Storage Capacity
**Cookies**: Limited to about 4KB per cookie.
#### 2. Lifetime
**Cookies**: 
- Have expiration dates and can be set to persist past browser sessions until a specific expiration date. 
- They can also be made `session-only`, which expires when the browser session ends.
including page reloads and restores).

#### 3. Data Accessibility Across Sessions and Tabs
**Cookies**: 
- Data is sent automatically with every HTTP request made to the server, which can be used to maintain session state between the server and client.

#### 4. Security
**Cookies**: 
- Because **cookies are sent with every HTTP request**,
- they are **`vulnerable`** to cross-site request forgery (CSRF) attacks 
- and potentially to cross-site scripting (XSS) **if not properly secured with flags like `HttpOnly`**.


**localStorage/sessionStorage**: 
  - Generally more secure from interception, as the data is never transferred to the server unless explicitly done so by the client-side script. 
  - However, they are **still susceptible to XSS attacks** which can <ins>**allow an attacker to access storage through malicious scripts**</ins>.


#### 5. Use Cases
**Cookies**:
- Managing user sessions.
- Tracking user behavior for analytics.
- Personalization (storing user preferences and themes).


#### 6. Server Accessibility
**Cookies**: 
  - **Automatically sent to the server with every HTTP request**, which can be used to handle server-side read/write.

**localStorage/sessionStorage**: 
  - **Not accessible to the server** directly; 
  - data stored must be sent explicitly via AJAX or other HTTP methods if needed on the server.

<summary>
View Answer
</summary>
</details>

----

### 4. Explain techniques for handling authentication and OAuth tokens on a web application's front-end.

<details>

#### 1. Secure Token Storage
- **Avoid Local Storage**: 
  - Storing tokens in local storage or session storage is
    -  **`vulnerable` to cross-site scripting (XSS) attacks**. 
  - Instead, <ins>use secure, **HttpOnly cookies**</ins> that are not accessible via JavaScript.
<br/>

- **Use Secure Cookies**: 
  - Set cookies with the <ins>**Secure flag**</ins> 
    - to ensure they are transmitted only over `HTTPS`. 
  - Also, use the `HttpOnly` flag 
    - **to prevent `client-side scripts` from accessing the cookie data, `reducing` `XSS` `risks`**.


#### 2. Token Refresh Handling
  - **Refresh Tokens**: 
    - Implement refresh tokens 
      - **to renew access tokens** <ins>without **requiring** the user to **re-authenticate** frequently</ins>. 
    - **<ins>Store refresh tokens securely</ins> on the `server` or in a `HttpOnly` cookie**.
<br/>

- **Silent Refresh**: 
  - Use `iframe-based` silent refreshes or background fetches 
    - to renew access tokens automatically without interrupting the user experience.

#### 3. Use Secure Transmission
- **HTTPS**: 
  - Always use HTTPS <ins>**to *encrypt* communications between the *client* and the *server***</ins>. 
  - This **`protects`** your tokens from being intercepted by attackers during transmission.
<br/>

- **CORS Policy**: 
  - Configure Cross-Origin Resource Sharing (CORS) properly 
    - **to ensure that <ins>only trusted domains can make requests to your API**</ins>, thus protecting against **`CSRF`** attacks.

#### 4. OAuth 2.0 Flows
- **Authorization Code Flow with PKCE**: 
  - Prefer the Authorization Code Flow with Proof Key for Code Exchange (PKCE) for single-page applications (SPAs). 
  - **`PKCE`** **adds an additional layer of security** by ensuring that <ins>**the application that requested the authorization code is the one exchanging it for an access token**</ins>.
<br/>

- **Token Validation**: 
  - Ensure that the **tokens received from the authentication server are `validated`, including checking the `signature` and the `claims` of JWT tokens**.

#### 5. Minimize Token Lifespan
- **Short-lived Access Tokens**: 
  - Use short-lived access tokens to limit the damage if a token is compromised. 
  - Typically, access tokens might last anywhere from a few minutes to a few hours.
- **Longer-lived Refresh Tokens**: 
  - If using refresh tokens, they can be longer-lived but must be stored and managed securely, **ideally on the server-side**.


#### 6. Handling Sensitive Data
- **Avoid Storing Sensitive Data**: 
  - Do not store sensitive data in the token or anywhere in the front-end. 
  - Keep sensitive data on the server-side and fetch it securely when needed.
- **Token Scoping**: 
  - Limit the scope of what each token can do. 
  - For example, **restrict access tokens to specific actions or resources**.

#### 7. Monitoring and Revocation
- **Token Revocation**: 
  - Implement mechanisms to revoke tokens when they are no longer needed or if suspicious activity is detected.
- **Audit and Monitoring**: 
  - Regularly monitor access patterns and audit logs for suspicious activity.
  - Implement anomaly detection to identify unusual access patterns or token usage.

<summary>
View Answer
</summary>
</details>




---

### 5. Component composition in React.

<details>

- Component composition is a fundamental concept in React. 
- It allows you to **build complex UIs from simple, `isolated` pieces called `components`**. 
- Components can be <ins>**composed into other components</ins>**, similar to how you might compose functions or classes.

```js
// Simple React Component
import React from 'react';

// A simple functional component called Greeting
function Greeting() {
  // It returns a JSX element displaying a greeting message
  return <h1>Hello, React!</h1>;
}

// This line makes the Greeting component available for import in other files
export default Greeting; 
```

#### Component Composition Example

```js
import React from 'react';
import Greeting from './Greeting';

function App() {
  // This component uses the Greeting component inside
  // and adds some additional elements
  return (
    <div>
      <Greeting /> {/* The Greeting component is used here */}
      <p>This is an example of component composition in React.</p>
    </div>
  );
}

export default App; 
```

<summary>
View Answer
</summary>
</details>


-----

### 6. Describe your strategies which you have followed in your past for enhancing the performance of React applications


<details>

- Strategies focus on 
  - **`optimizing`** rendering, 
  - managing state **`efficiently`**,
  - making better use of React's **`built-in`** capabilities. 


#### 1. Minimizing Component Re-renders
- Reducing **unnecessary** **`re-renders`** is crucial for enhancing performance:

- **`ShouldComponentUpdate`** and **`React.memo`**: 
  - For **class** components, implement <ins>**shouldComponentUpdate**</ins> to prevent unnecessary re-renders by comparing props or state. 
  - For **functional** components, <ins>**wrap them with React.memo**</ins> to achieve a similar effect.

```js
// Using React.memo for a functional component
const MyComponent = React.memo(({ props }) => {
  // Component logic
  return <div>{props.children}</div>;
});
```

- **PureComponent**: 
  - Extending **`React.PureComponent`** in class components **automatically implements** `shouldComponentUpdate` with a <ins>**shallow `prop` and `state` comparison**</ins>.

-----

#### 2. Optimizing Heavy Computations

- **Memoization**: 
  - Use memoization to cache heavy function outputs. 
  - Libraries like **`lodash.memoize`** or **`reselect`** for Redux are useful here.

```js
import { useMemo } from 'react';

const expensiveFunction = (param) => {
  // Perform heavy calculations
  return param;
};

function MyComponent({ param }) {
  const memoizedValue = useMemo(() => expensiveFunction(param), [param]);
  return <div>{memoizedValue}</div>;
}
```
----

#### 3. Using Lazy Loading

- Lazy loading **helps in <ins>loading only the components needed at the moment**</ins> rather than loading all components upfront:

- **`React.lazy`** and **`Suspense`**: 
  - Use **`React.lazy`** <ins>**for dynamic imports of components</ins> that are not immediately required**. 
  - **`Suspense`** <ins>**allows you to specify a loading state</ins> while waiting for the lazy-loaded component**.

```js
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

#### 4. Web Workers
- **`Offload`** heavy computations to a web worker, keeping the UI thread free from heavy lifting:

```js
// In a web worker file
self.onmessage = (e) => {
  // Move complex calculations to a web worker.
  const result = performHeavyCalculation(e.data);
  self.postMessage(result);
};
```
----

#### 5. Optimizing Images and Media

**Image Optimization**: 
- Use image formats like 
    - **`WebP`**, 
    - Implement techniques like <ins>**lazy loading images**</ins>, 
    - using **`thumbnails`**,
    - **defining image sizes** to reduce layout shifts and loading times.

----

#### 6. Code Splitting

- **Splitting code <ins>into smaller bundles**</ins> *reduces* <ins>the initial load time:</ins>

```js
// Using dynamic imports
// to split your JavaScript code into smaller chunks which can be loaded on demand.
import('./MyModule.js').then((MyModule) => {
  // Use MyModule
});
```
---

#### 7. Efficient Data Fetching
- To reduce wait times and unnecessary updates:

  - Implement debouncing or throttling **for `API` calls <ins>that do not need to be made on every user input change**</ins>. 
  - This reduces the number of calls made under rapid input conditions.

----

#### 8. Using the Virtual DOM Efficiently
- Use the **`key`** prop effectively especially in **`lists`** 
- to allow React to re-use DOM nodes correctly, rather than re-creating them unnecessarily.

<summary>
View Answer
</summary>
</details>



----

### 7. different stages of react app

<details>

- These stages can be categorized into the 
  - **`mounting`** phase, 
  - **`updating`** phase, 
  - **`unmounting`** phase. 


### <ins>PART 1: Class Components LifeCycle Methods</ins>
#### 1. Mounting Phase
- This is the initial phase of the component lifecycle when an **instance of a component is being `created` and `inserted` into the DOM**:
<br/>

- **i) `constructor(props)`**: 
  - This method is called **`before` the component is mounted**. 
  - It is a good place to **`initialize` state** or **`bind` event handlers**.

```js
constructor(props) {
  super(props);
  this.state = { count: 0 };
}
```
- **ii) `static getDerivedStateFromProps(props, state)`**: 
  - This method is <ins>**called right before rendering**</ins>, in both the **`mounting`** and **`updating`** phases. 
  - It is **used <ins>to update the state based on the props</ins>**.
<br/>

- **iii) `render()`**: 
  - The only required method in a class component. 
  - This method **`examines`** **`this.props`** and **`this.state`** and returns one of the following types: 
    - React elements, 
    - Arrays and fragments, 
    - Portals, 
    - String and numbers, 
    - Booleans or null.

```js
render() {
  return <h1>Hello, {this.props.name}</h1>;
}
```

- **iv) `componentDidMount`()**: 
  - This method is **called after the <ins>component is mounted on the DOM</ins>**. 
  - It is used for 
    - DOM manipulation, 
    - fetching data, 
    - setting up subscriptions (e.g., timers, network requests).

```js
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```
---

#### 2. Updating Phase
- This phase <ins>**starts when a component is being re-rendered as a result of changes to either its `props` or `state`</ins>**
<br/>

- **`static getDerivedStateFromProps(props, state)`**: 
  - Same as in the mounting phase, 
  - it is **called `before` <ins>the render method</ins> when new props are being received**. 
  - Here, it's **used to adjust the state** based on the incoming props before rendering.
<br/>

- **`shouldComponentUpdate(nextProps, nextState)`**: 
  - If a component’s output is not affected by the current change in state or props.
  - It returns **`true`** or **`false`** to instruct React whether to continue with rendering or not.

```js
shouldComponentUpdate(nextProps, nextState) {
  return this.props.value !== nextProps.value;
}
```

- **render()**: 
  - Called again to **`re-render` the UI** with the **`new` `props`** and/or **`state`**.
<br/>

- **`getSnapshotBeforeUpdate(prevProps, prevState)`**: 
  - This method is <ins>**called right before**</ins> the most recently rendered output is committed to the DOM. 
  - It **`captures`** some **information <ins>from the DOM</ins> that might change `after` the update**.
<br/>

- **componentDidUpdate(prevProps, prevState, snapshot)**: 
  - This method is **called immediately `after` updating** occurs. 
  - It is not called for the initial render. 
  - Suitable for DOM operations and network calls based on the **`previous`** and **`current`** **`state`**.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    console.log("Count has changed.");
  }
}
```

#### 3. Unmounting Phase
- This final phase is when **a component is being `removed` from the DOM**:
<br/>

- **`componentWillUnmount()`**: 
  - This method is **called `before` the component is `unmounted` and `destroyed`**.
  - It is a **good place to perform cleanup** 
  - e.g., clearing timers, 
  - cancelling network requests 
  - or subscriptions
  - **to `avoid` memory leaks**.

-----

### <ins>PART 2: Hooks Version LifeCycle Methods</ins>

#### 1. Mounting Phase

- In functional components, the mounting logic is handled by the **`useEffect`** hook
- with an **`empty`** **`dependency`** **`array`** [ ], 
- which ensures the <ins>**effect runs only once after the initial render**</ins>.


```js
import React, { useState, useEffect } from 'react';

function Timer() {
  
  useEffect(() => {
    // YOUR NETWORK API CALL HERE....
  }, []); // Empty array means this effect will only run once after the initial render



  return (
    <div>
      <h1>Hello SaiTeja!</h1>
    </div>
  );
}

export default Timer;
```

#### 2. Updating Phase

- To replicate the behavior of lifecycle methods **that run on `updates`**, 
- useEffect can be used **without** an empty dependency array, 
- or **with <ins>specific dependencies</ins>**.

```js
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData(id) {
      const response = await fetch(`https://api.example.com/users/${id}`);
      const userData = await response.json();
      setUser(userData);
    }

    fetchUserData(userId);
  }, [userId]); // This effect runs on initial mount and whenever userId changes

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfile;
```

#### 3. Unmounting Phase
- The cleanup or unmounting phase is **also managed by useEffect**, 
- where you return a function from within the effect. 
- This function is called when the component unmounts.

```js
useEffect(() => {
  const subscription = someSubscription();

  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

<summary>
View Answer
</summary>
</details>


----

### 8. What is JSX . Why do we need it. Does browser understands JSX directly

<details>

#### JSX (JavaScript XML) is a syntax extension for JavaScript 
- that looks similar to XML or HTML. 
- It is used with React to describe the user interface components and their structure. 
- JSX allows you to write HTML-like code directly within your JavaScript code,
- making the structure of the visual elements more readable and expressive.

<summary>
View Answer
</summary>
</details>


---
 
### 9. What is difference between access token and id token

<details>

### <ins>Access Token:</ins>
- **Purpose**: 
  - An access token is **used to grant access to a resource**. 
  - It acts as a kind of "key" that **allows the holder to access APIs or resources securely**. 
  - The primary purpose of an access token is to **authorize API requests** made on behalf of the user.
<br/>

- **Content**: 
  - Access tokens usually contain `scopes` and `grants` that specify what actions the application can perform and on what resources. 
  - They do not necessarily need to be understandable by the client or the resource owner.
<br/>

- **Format**: 
  - The format of an access token can be opaque (such as a random string) or structured (such as `JWT` - JSON Web Tokens), depending on the authorization server. 
  - In the case of `JWT`, the token can carry a payload of claims, but these are meant for authorization, not for client use.
<br/>

- **Usage**: 
  - It is **used by a client application to make authenticated requests to a server** or `API` that knows how to validate the token and check the permissions (scopes).

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZ",
  "token_type": "Bearer",
  "expires_in": 3600 //in seconds
}
```

----

### <ins>ID Token:</ins>

- ID tokens are obtained during the authentication process, such as 
  - when a user logs in to a web application **using an `OpenID Connect` (OIDC) or `OAuth 2.0` authentication** flow. 
  - The <ins>**ID token is returned**</ins> as part of the authentication response from the identity provider (such as an Authorization Server).
<br/>

- **Purpose**: 
  - An ID token is used to **`authenticate`** a user and **provide `information`** about the user.
  - It contains claims about the **user's `identity`**, such as their username, email address, and authentication method used.
  - The primary purpose of an ID token is to **`authenticate`** the user and **provide** **`information`** to the client application about the user.
<br/>

- **Content**: 
  - ID tokens contain user information claims, such as 
    - **`sub`** (subject - a unique identifier for the user), 
    - name, 
    - email, 
    - aud (audience - the intended recipient of the token), 
    - and other user-related information. 
<br/>

- **Format**: 
  - ID tokens are typically formatted as JWT (JSON Web Tokens).
<br/>

- **Usage**: 
  - It is used by the client application to **`verify`** the **`identity`** of the user and access user-related information.
  - It is often used in conjunction with an access token during the authentication process.

```json
{
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0MThlNjQyNjk0ZDY5YzE1YjI0MDE1MzRkMjNkNmY0YjFiZDk1N2UiLCJ0eXAiOiJKV1QifQ.",
  "token_type": "Bearer",
  "expires_in": 3600,
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

<summary>
View Answer
</summary>
</details>

-----

### 10. Below is a use case. How can we achieve this in react
    5 components that will call 5 different services to get data
    2 components should automatically rerender after every 30 secs
    3 components should rerender on click of a button
    - use of pure component?

<details>

### Step 1: Service Function

```js
// services.js
export const fetchData1 = async () => {
  // Fetch data from service 1
};

export const fetchData2 = async () => {
  // Fetch data from service 2
};

export const fetchData3 = async () => {
  // Fetch data from service 3
};

export const fetchData4 = async () => {
  // Fetch data from service 4
};

export const fetchData5 = async () => {
  // Fetch data from service 5
};
```


### Step 2: Creating Components + memo

```js
// AutoRerenderComponent.js
import React, { useEffect, useState, useCallback } from 'react';

const AutoRerenderComponent = ({ fetchData }) => {
  const [data, setData] = useState(null);

  const fetchDataInterval = useCallback(async () => {
    const result = await fetchData();
    setData(result);
  }, [fetchData]);

  useEffect(() => {
    fetchDataInterval();
    const intervalId = setInterval(fetchDataInterval, 30000); // 30 seconds interval

    return () => clearInterval(intervalId);
  }, [fetchDataInterval]);

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default React.memo(AutoRerenderComponent);
```

```js
// ManualRerenderComponent.js
import React, { useState, useCallback } from 'react';

const ManualRerenderComponent = ({ fetchData }) => {
  const [data, setData] = useState(null);

  const handleClick = useCallback(async () => {
    const result = await fetchData();
    setData(result);
  }, [fetchData]);

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default React.memo(ManualRerenderComponent);
```

---

### Step 3: Usage in App.jsx

```js
import React from 'react';
import AutoRerenderComponent from './AutoRerenderComponent';
import ManualRerenderComponent from './ManualRerenderComponent';
import {
  fetchData1,
  fetchData2,
  fetchData3,
  fetchData4,
  fetchData5,
} from './services';

const App = () => {
  // Array of fetch functions for auto rerender components
  const autoFetchData = [fetchData1, fetchData2];

  // Array of fetch functions for manual rerender components
  const manualFetchData = [fetchData3, fetchData4, fetchData5];

  return (
    <div>
      {autoFetchData.map((fetchData, index) => (
        <AutoRerenderComponent key={`auto-${index}`} fetchData={fetchData} />
      ))}
      {manualFetchData.map((fetchData, index) => (
        <ManualRerenderComponent key={`manual-${index}`} fetchData={fetchData} />
      ))}
    </div>
  );
};

export default App;
```

<summary>
View Answer
</summary>
</details>

----


### 11. Do we have alternate for jsx

<details>

<summary>
View Answer
</summary>
</details>



----

### 12. How can we decide right key to pass to list item

<details>

<summary>
View Answer
</summary>
</details>



----

### 13. Discuss the importance of routing in web applications and its relevance to React.


<details>

<summary>
View Answer
</summary>
</details>



----



### 14. Code review steps you do


<details>

<summary>
View Answer
</summary>
</details>


---

### 15. You have an app with so many fields in the form. How do you show to user? How do you prevent repeated clicks of button?


<details>

<summary>
View Answer
</summary>
</details>


----    

### 16. can we make database call directly from react app? is it suggestible to do if possible?


<details>

<summary>
View Answer
</summary>
</details>


----

### 17. What is synthetic event in react. Have you used in your project? What it will do?

<details>

<summary>
View Answer
</summary>
</details>



-----