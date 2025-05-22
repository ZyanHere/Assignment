## 1.  What is Redux?
   
- Redux **is a predictable state container** for JavaScript applications. *(Yes, it can be used with any other JavaScript framework or library)*. 
- It ***helps you write applications that <ins>behave consistently</ins>, run in different environments*** (client, server, and native), and are easy to test.
-  With Redux, **<ins>the entire state of your application is kept in a store</ins>**, **and <ins>each component can access any state *without having to send down props* from one component to another</ins> that it needs from this store**.

- ##### There are `three` building parts: `actions`, `store`, and `reducers`.

#### Benefits and limitations of Redux:

**1. <ins>State transfer**</ins>

- State is stored together in a single place called the ‘store.’ 
- While you do not need to store all the state variables in the ‘store,’ it is especially important to when state is being shared by multiple components or in a more complex architecture. 
- It also allows you to call state data from any component easily.

**2. <ins>Predictability**</ins>

- Redux is **predictable state container for Javascript apps.**
- Because reducers are pure functions, the same result will always be produced when a same state and action are passed in.

**3. <ins>Maintainability**</ins>

- Redux provides a strict structure for how the code and state should be managed, which makes the architecture easy to replicate and scale for somebody who has previous experience with Redux.

**4. <ins>Ease of testing and debugging**</ins>

Redux makes it easy to test and debug your code since it offers powerful tools such as Redux DevTools in which you can time travel to debug, track your changes, and much more to streamline your development process.


-----

## 2. Explain pros and cons of Redux?

### Pros using redux:
- Central store (any component can access any state from the store)
- Store **<ins>persists the state of a component</ins> *even after the component has unmounted***.
- ***Prevents unnecessary re-renders***, as when the state changes <ins>**it returns new state which uses shallow copy.**</ins>
- Testing will be easy as UI and data management are separated.
- **History of state is maintained** which helps in implementing features like undo very easily.


### Cons using redux:
- No encapsulation. Any component can access the data which can cause security issues.
- Boilerplate code. Restricted design.
- ***As state is immutable in redux, the reducer updates the state by returning a new state every time*** which can cause excessive use of memory.

-----

## 3. Explain the concept of a `thunk` in Redux.
- Redux Thunk is a middleware that **lets you call action creators <ins>that return a function instead of an action object</ins>**. 
- The `primary` use of Redux Thunk is to ***handle asynchronous operations*** within the Redux ecosystem
- It **provides a way to delay the dispatch of an action, or to dispatch only if a certain condition is met**. 
- This capability is particularly useful for complex synchronous logic, such as conditional dispatching of actions, or for asynchronous processes like API calls.

<br/>

- <ins>**Asynchronous Actions**</ins>: In standard Redux, action creators return an action object, and these actions are immediately dispatched by the store.** Redux Thunk extends this model by allowing action creators to return a function**. This function can perform asynchronous operations (e.g., API requests) and dispatch actions based on the outcome of those operations.
<br/>

- <ins>**Conditional Dispatching**</ins>: Redux Thunk **allows for conditional dispatching of actions within its returned function**. This is useful when you want to dispatch actions only if certain conditions are met, avoiding unnecessary updates to the state or API calls.
<br/>

- <ins>**Complex Synchronous Logic**</ins>: Beyond asynchronous actions, **Thunks can be used to encapsulate complex synchronous logic that needs access to the dispatch method or the current state of the store**. <ins>This keeps the logic outside of components, making them cleaner and focusing them on the UI</ins> rather than on how the state is managed or updated.
<br/>

- <ins>**Access to `Dispatch` and `GetState`**</ins>: The functions returned by thunk action creators **receive the store's dispatch and getState methods as arguments**. This allows the action creators to dispatch other actions or access the current state of the Redux store as needed during asynchronous operations or complex logic.

-----

## 4. Example of a Redux Thunk Action Creator

```js
function fetchUserData(userId) {
  // This function is the thunk and gets dispatch and getState as arguments
  return async (dispatch, getState) => {
    dispatch({ type: 'USER_FETCH_REQUEST', userId });

    try {
      const response = await fetch(`https://api.example.com/user/${userId}`);
      const data = await response.json();
      dispatch({ type: 'USER_FETCH_SUCCESS', userId, data });
    } catch (error) {
      dispatch({ type: 'USER_FETCH_FAILURE', userId, error });
    }
  };
}

```

```js
npm install redux react-redux redux-thunk
```
```js
// Import the required libraries
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Import your root reducer
import AppContent from './AppContent'; // This is your application's main component

// Create the Redux store, applying the thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

```
------

## 5. What are redux core concepts?
   


<img src="./images_used/redux-components.jpg">



### **1. <ins>Actions in Redux**</ins>
- Actions **are plain JavaScript objects** that represent the payloads of information that send data from your application to your store.
- They are the **only source of information for the store**
- Actions must have a `type` property that indicates the <ins>type of action being performed</ins>. `Types` should typically be **defined as string constants**. 
- Once an action is created, it is dispatched to the store to trigger updates to the state.

##### Key concepts related to actions in Redux:

1. <ins>**Action Creators**</ins>: 
   - These are **functions that create or return an action**. <ins>Instead of directly dispatching an action object, you often use action creators to encapsulate the process of creating an action</ins>.
<br/>
1. <ins>**Action Types**</ins>: 
   - These are usually **defined as string constants** and help identify the action that needs to be performed. Defining them as constants helps avoid typos and provides an easy way to manage all actions in larger applications.
<br/>

1. <ins>**Dispatching an Action**</ins>: 
   - This is the <ins>**process of sending an action to the Redux store to invoke state changes**</ins>. The store's dispatch function is used for this purpose.
<br/>

```js
const ADD_TODO = 'ADD_TODO';

// Action Creator
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// Dispatching an Action (dispatch function is then used to send this action to the Redux store)
dispatch(addTodo('Learn Redux'));
```

### **2. <ins>Reducers**:</ins> 

- Reducers in Redux are **pure functions** that take the `current state` of an application and an `action` as arguments, and ***return a new state***. 
- The term "reducer" comes from the concept of a reducing function in functional programming, which is used to reduce a collection of values down to a single value

#### The key principles of reducers in Redux are:

1. <ins>**Pure Functions**:</ins> 
   - Reducers **must** be pure functions. 
   - This means they **should not produce side effects**, such as API calls or routing transitions, and they should not modify the state passed to them. 
   - Instead, **they should return a new object if any changes are made**.
<br/>

2. <ins>**State Shape**:</ins> 
   - The state shape (structure) is determined by the reducers. 
   - You can have multiple reducers, each managing its own part of the global state. 
   - The Redux <ins>**combineReducers helper function can be used to combine them into a single root reducer**</ins>.
<br/>

3. <ins>**Handling Actions**:</ins> 
   - Reducers **specify how the application's state changes in response to actions**. 
   - <ins>**They use the action's type**</ins> to determine how to transform the current state into a new state.
<br/>

4. <ins>**Immutability**:</ins> 
   - When changing the state, reducers must return a new object or array rather than modifying the existing state. 
   - This immutability principle ensures that Redux can efficiently track changes and update the UI.
<br/>

5. <ins>**Initialization and Resetting:**</ins>
   -  Reducers can set up the initial state and handle actions that reset the state back to the initial state.


```js
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.text]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo !== action.text)
      };
    default:
      return state;
  }
}
```

### **3. <ins>Store in Redux**</ins>

- A Store ***is an object that holds the whole state tree of your application***. 
- Whenever the `store` is updated, <ins>it will update the React components subscribed to it.</ins> 
- The store has the responsibility of `storing`, `reading`, and `updating state`.

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(rootReducer)
 render (
   <Provider store="{store}">
     <App>
   </App></Provider>,
   document.getElementById('root')
 )
```

### **4. <ins>Dispatching Actions</ins>** 

- ##### This dispatch call sends an action to the store,

```js
store.dispatch({
  type: 'ADD_TODO',
  text: 'Learn Redux'
});

```

### **5. <ins>Subscribing to changes:</ins>**
- used to subscribe data/state from the Store.

```js
store.subscribe()
```

### **6. <ins>Middleware**</ins>

- Middlewares are **used to dispatch async functions**. 
- We configure Middleware's while creating a store.


```js
const store = createStore(reducers, initialState, middleware);
```

----


## 6.  What do you understand by "Single source of truth" in Redux?
  
- refers to the principle that the <ins>***state of your whole application is stored in an object tree within a single store***</ins>. 

- This means that instead of having multiple, possibly inconsistent sources of state scattered throughout your application, there is one central place where the state is managed and stored. 
  
1. <ins>**Predictability**</ins>: 
   - Because there is only one place where the state is stored, it becomes much easier to track changes, debug, and understand how state changes over time
   - This predictability is crucial for large applications, making them easier to maintain.
   <br/>

2. <ins>**Maintainability**</ins>:
   - With all state changes flowing through a centralized store, it's easier to impose rules on how state can be updated, ensuring consistency across the application. 
   - This centralized control aids in maintaining and scaling the application.
   <br/>

3. <ins>**Debugging**:</ins> 
   - The single state tree makes it possible to implement powerful debugging tools, such as logging every state change, traveling back and forth in time to understand how state mutations lead to bugs, and even rehydrating state from a previous session.
   <br/>

4. <ins>**Serialization**:</ins> 
   - Having the entire application state in one place **makes it possible to serialize the state (e.g., to localStorage) and deserialize it later**, potentially enabling features like undo/redo or saving the state of the application to be resumed later.
   <br/>

5. <ins>**Simplifies Data Flow**:</ins> 
   - The single source of truth simplifies data flow in the application by **adhering to unidirectional data flow**, <ins>*where state flows down from the store to the UI components*</ins>, and actions flow up from the components to update the state.

   <br/>

------

## 7. What are the features of Workflow in Redux?


- When using Redux with React, **states will no longer need to be lifted up**. Everything is handled by Redux. 
- Redux offers a solution for **storing all your application state in one place**, called a store.
- Components then **dispatch state changes to the store**, not directly to other components.
- The components **that need to be aware of state changes can subscribe to the store**.
- The store can be thought of as a "middleman" for all state changes in the application.
- With Redux involved, <ins>components don't communicate directly with each other</ins>. **Rather, all state changes must go through the single source of truth**, the store.

-----

## 8. Redux has three core principles:

1. <ins>**Single Source of Truth**:</ins> 
   -    The state of your whole application is stored in an object tree within a single store.

2. <ins>**State Is Read-Only**:</ins> 
   - The only way to change the state is to dispatch an action, an object describing what happened.
3. <ins>**Changes Are Made With Pure Functions**:</ins> 
   - To specify how the state tree is transformed by actions, you write pure reducers.


### The following are details of how Redux works:
- When UI Event triggers (OnClick, OnChange, etc) it can dispatch Actions based on the event.
- Reducers process Actions and return a new state as an Object.
- The new state of the whole application goes into a single Store.
- Components can easily subscribe to the Store.

-------

## 9.  What is difference between presentational component and container component in react redux?
    
- ***Represent a <ins>pattern for organizing code</ins>*** that helps in managing complexity, particularly in large applications. 
- This pattern helps in separating the concerns between how things look (UI) and how things work (logic and state management). 

##### Here's a breakdown of the differences:


###<ins>**Container Components**:</ins> 
   
- **Purpose**: 
  - Container components are **concerned with how things work**. They provide the `data` and `behavior` to presentational or other container components.
<br/>

- **State**: 
  - They are **more likely to maintain state and handle state updates**. They connect to the Redux store and dispatch actions to update the store based on user interactions.
<br/>

- **Redux**: 
  - They use Redux-specific functions like `connect` (in React-Redux bindings) to read from a Redux store and dispatch actions. With the introduction of hooks in React, container components might also use hooks like `useSelector` and `useDispatch` for a similar purpose.
<br/>

- **Reusability**: 
  - They are **less reusable since they are tightly coupled** with the business logic and data fetching mechanisms.

<ins>**Example**</ins>: A TodoListContainer component that fetches todo items from the Redux store and passes them to a TodoList presentational component to render.






### <ins>**Presentational Components**:</ins> 

- **Purpose**: 
  - Are primarily **concerned with how things look**. They render the UI based on the props passed to them.
<br/>

- **State**: 
  - They **usually don't manage state** (except for local UI state) and **receive data and callbacks exclusively via `props`**.
<br/>

- **Redux**: 
  - They are unaware of Redux. **They don't dispatch actions or directly interact with the Redux store**.
<br/>

- **Reusability**: 
  -  Since they focus on the UI without embedding business logic, they tend to be more reusable across different parts of the application or even in different applications..

<ins>**Example**</ins>: Button component that receives a label and an onClick callback as props.


- #### It's worth noting that with the advent of React Hooks (useState, useEffect, useContext, useReducer, and custom hooks), the distinction between presentational and container components <ins>*has become less clear and less necessary*</ins>.

----
## 10.  How to split the reducers?

- In Redux, splitting reducers is a common practice to manage the complexity of handling a large state object. 
- This process is known as `"reducer composition"` and is **facilitated by the combineReducers utility function provided by Redux**. 
- The <ins>***idea is to create multiple smaller reducer functions, each managing its own slice of the state, and then combine them into one root reducer</ins>***. Each of these smaller reducers is responsible for updating a specific piece of state based on the action dispatched.

#### Here's a step-by-step guide on how to split reducers:

### 1. <ins>Create Individual Reducers</ins>

```js
// todosReducer.js
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    // Add other cases as needed
    default:
      return state;
  }
}

// visibilityFilterReducer.js
function visibilityFilterReducer(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.payload;
    // Add other cases as needed
    default:
      return state;
  }
}
```
### 2. <ins>Combine Reducers</ins>



```js
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import visibilityFilterReducer from './visibilityFilterReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
});

export default rootReducer;

```

### 3. <ins>Create the Redux Store</ins>

```js
import { createStore } from 'redux';
import rootReducer from './reducers'; // The combined reducers

const store = createStore(rootReducer);
```

----

## 11. How to create action creators with redux?

- Action creators in Redux **are functions that create (or return) action objects**.    
- `Actions` are plain JavaScript objects that describe "what happened" in your application
- These objects must have a type property indicating the type of action being performed, **and they can optionally have a payload property or any other fields** you deem necessary to describe the action.    
    
#### Step 1: Define Action Types    
  - First, define constants for your action types to avoid typos and simplify changes later on.

```js
// actionTypes.js
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

```
#### Step 2: Create Action Creators
- Create functions that return an action object. Each function corresponds to a specific action in your application.

```js
// actions.js
import { ADD_TODO, REMOVE_TODO } from './actionTypes';

// Action creator for adding a todo
export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: { text }
  };
}

// Action creator for removing a todo
export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: { id }
  };
}
```

#### Step 3: Dispatch Actions in Components

- In your React components, use the useDispatch hook from react-redux to dispatch actions created by your action creators. This is assuming you're using functional components and the hooks API.


```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './actions';

function TodoInput() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

#### Step 4: Connect Redux State and Dispatch to Your Components
- For components that need to access the Redux state or dispatch actions, use the useSelector hook to access the state and the useDispatch hook to dispatch actions.

- If you're using class components, you would use the connect function instead to provide state and dispatch props to your components.


```js
import React from 'react';
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```



----
    
## 12.  How to set the dataflow using react with redux?
    
#### 1. Install Redux and React-Redux
```js
npm install redux react-redux
```

#### 2. Create Action Creators
```js
// actions/todoActions.js
export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    payload: todo,
  };
};

export const removeTodo = (todoId) => {
  return {
    type: 'REMOVE_TODO',
    payload: todoId,
  };
};
```

#### 3. Create Reducers
```js
// reducers/todosReducer.js
const initialState = {
  todos: [],
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, action.payload]};
    case 'REMOVE_TODO':
      return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)};
    default:
      return state;
  }
}

export default todosReducer;
```

#### 4. Combine Reducers

```js
// reducers/index.js
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
```

#### 5. Create the Redux Store

```js
// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

#### 6. Provide the Redux Store to React

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### 7. Connect React Components to the Redux Store
- Use the connect function or the useSelector and useDispatch hooks in your components to access and modify the Redux store.


```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './actions/todoActions';

function TodoApp() {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  // Render your component UI here
}
```

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions/todoActions';

class TodoApp extends Component {
  handleAddTodo = (todo) => {
    this.props.addTodo(todo);
  };

  // Render your component UI here
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

const mapDispatchToProps = {
  addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

----------------

    
## 13. How can I represent "side effects" such as AJAX calls? Why do we need things like "action creators", "thunks", and "middleware" to do async behavior?    
    
- Side effects means that **code is no longer purely a function of its inputs, and the interactions with the outside world** are known as "side effects".
- Redux is inspired by functional programming, and out of the box, **has no place for side effects to be executed**. In particular, `reducer` functions **must always be pure functions** of (state, action) => newState.
- However, <ins>**Redux's middleware (eg. Redux Thunk, Redux Saga) makes it possible to intercept dispatched actions and add additional complex behavior** around them, including side effects.</ins>
  
----------------

## 14. What is the '@' (at symbol) in the Redux @connect decorator?

- `Decorators` make it possible to ***annotate and modify classes and properties <ins>at design time***</ins>.


#### Without a decorator

```js
import React from 'react'
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

class MyApp extends React.Component {
  // ...define your main app here
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApp)
```


#### With decorator
```js
import React from 'react'
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// mapStateToProps is a function that maps the state from the Redux store to the props of the component. 
function mapStateToProps(state) {
  return { todos: state.todos }
}

// mapDispatchToProps does a similar thing but for dispatching actions.
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyApp extends React.Component {
  // ...define your main app here
}
```


----

## 15. What is the difference between React State vs Redux State?

- `React state` is **stored locally within a component**. When it needs to be shared with other components, it is passed down through props. 


- When using `Redux`, **state is stored globally in the Redux store**. Any component that needs access to a value may subscribe to the store and gain access to that value.




------

## 16. What is the best way to access redux store outside a react component?

- Accessing the Redux store outside a React component is **commonly needed for dispatching actions** or **accessing the state in non-component files**, such as in middleware, services, or helpers

#### Step 1: Create and Export the Store 

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```

#### Step 2: Import and Use the Store
```js
import store from './path/to/your/store';

// Dispatching an action
store.dispatch({ type: 'ACTION_TYPE' });

// Accessing the state
const currentState = store.getState();
```

<ins>**Good To Know:**</ins>
- **Singleton Pattern**: 
  - By `exporting` and `importing` the `store`, **you're essentially using it as a singleton**. 
  - This ensures that the same store instance is used <ins>***throughout your application, maintaining consistency in your application's state management***</ins>.

----

## 17. How to add multiple middleware to redux?
- In Redux, <ins>**middleware allows you to write logic that can be inserted into the dispatch process of actions**</ins> before they reach the reducer. 
- This is useful for `logging actions`, `performing asynchronous tasks`, and more
- To add multiple middleware to Redux, <ins>**you use the applyMiddleware function from Redux in combination with the createStore function**</ins>.
  

#### Step 1: Import the Middleware and Redux Methods: 

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
```

#### Step 2: Combine Middleware: 
- Use `applyMiddleware()` to combine your middleware.
- You can pass all the middleware you want to use as arguments to this function.
- **If you have more than one middleware, <ins>just separate them with commas**</ins>

```js
const middleware = applyMiddleware(thunk, logger);
```

#### Step 3: Apply Middleware to the Store: 
- When creating the Redux store with `createStore`, **you can now apply the combined middleware**. 
- The `createStore` function takes up to three arguments: the `rootReducer`, the `initialState`, and the `enhancer` (in this case, the middleware).

```js
const store = createStore(
  rootReducer,
  initialState,
  middleware
);
```

#### Step 4: If you are using Redux DevTools Extension: 
- You might want to **compose the middleware with the dev tools extension**. 
- In that case, you would use the `compose` function from Redux like so:

```js
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);
```    
----------

## 18. What are the differences between redux-saga and redux-thunk?


- `redux-saga` and `redux-thunk` are both middleware libraries for Redux, a state management library for JavaScript applications, most commonly used with React. 
-  They are used to handle side effects in your Redux application, such as asynchronous actions like fetching data from an API or complex synchronous operations.

#### **1. Redux Thunk**
- Redux Thunk is a middleware that lets you call action creators that <ins>**return a function instead of an action object**</ins>.
- **That function receives the store's dispatch method**, <ins>which is then used to dispatch regular synchronous actions inside the body of the function once the asynchronous operations have completed.</ins>


<img src="./images_used/redux-thunk-image.jpeg">

```js
npm i --save react-redux redux redux-logger redux-saga redux-thunk
```

- `Thunk` **is a function** <ins>***which optionally takes some parameters and returns another function***</ins>, it takes `dispatch` and `getState` functions and both of these are supplied by Redux Thunk middleware.


```js
// Action Creators with redux-thunk
function fetchData() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_BEGIN' });
    return fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(json => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: json }))
      .catch(error => dispatch({ type: 'FETCH_DATA_FAILURE', error }));
  };
}

// Using the thunk in a component
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  
  return <div>Content</div>;
};
```

#### **2. redux saga**
- uses ES6 generators to make asynchronous flow easy to read, write, and test. Sagas are implemented as generator functions that yield objects to the redux-saga middleware
- In saga, we can test our asynchronous flows easily and our actions stay pure. It organized complicated asynchronous actions easily and make then very readable and the saga has many useful tools to deal with asynchronous actions.


<img src="./images_used/redux_flow.png">


```js
// Sagas
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchData(action) {
  try {
    const data = yield call(() => fetch('https://api.example.com/data').then(res => res.json()));
    yield put({type: 'FETCH_DATA_SUCCESS', payload: data});
  } catch (e) {
    yield put({type: 'FETCH_DATA_FAILURE', message: e.message});
  }
}

/*
  Starts fetchData on each dispatched `FETCH_DATA_BEGIN` action.
  Allows concurrent fetches of data.
*/
function* mySaga() {
  yield takeEvery('FETCH_DATA_BEGIN', fetchData);
}

export default mySaga;

// Setting up the Saga middleware
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);
```


#### Key Differences in Usage:
**Thunk Approach**: 
- In `redux-thunk`, the asynchronous logic is placed inside the action creator itself. 
- The **action creator returns a function that performs the async operation and then dispatches actions based on the outcome**.

**Saga Approach:** 
- In `redux-saga`, the asynchronous logic is separated from action creators. 
- Sagas listen for actions dispatched to the store and then perform side effects. 
- Sagas use yield to make asynchronous calls easy to read and write in a synchronous-like fashion.
-------

## 19. Explain Redux form with an example?

- Redux Form is a **library for managing form state in Redux**. 
- It provides a way to handle form inputs and submissions using Redux, with form validation and submission capabilities. 
- Redux Form <ins>***works by storing form state in the Redux store, allowing you to easily connect your forms to Redux***</ins>
- It utilizes `higher-order components` and `decorators` **to connect your forms to the Redux store**.


#### Step 1: Setup Redux Form

```js
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  // ...your other reducers here
  form: formReducer // <--- Mounted at 'form'
});

const store = createStore(rootReducer);
```
#### Step 2: Create a Form Component

- Use `reduxForm()` to connect your form component to Redux Form. 
- Define your form fields using the Field component and specify the validation logic.

```js
import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Validation function
const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

// Custom input component
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

// Form component
let SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username" />
      <Field name="email" type="email" component={renderField} label="Email" />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

// Connecting the form component to Redux Form
SimpleForm = reduxForm({
  form: 'simple', // a unique identifier for this form
  validate, // validation function
})(SimpleForm);

export default SimpleForm;
```

#### Step 3: Use the Form in Your Application

```js
import React from 'react';
import SimpleForm from './SimpleForm'; // Import your form component

const App = () => (
  <div>
    <h2>Simple Form Example</h2>
    <SimpleForm />
  </div>
);

export default App;
```

**Explanation**:
- **Redux Form Reducer**: The form reducer is mounted on the form key of your root reducer to manage form states.
- **Form Component**: You create a form component and decorate it with reduxForm(), passing configuration options such as the form's name and validation function.
- **Field Component:** Use the Field component to define inputs in your form, specifying the name of the field, the type of input, and the component to render the field.
- **Validation**: Validation logic is defined in a function that receives the form's values, checks for errors, and returns an object with any errors found.

--- 

## 20. How to reset state in redux?

- To reset the state in Redux, **you typically dispatch an action that tells the Redux reducer to reset the state to its initial value** or to a specific state. 

#### 1. Define a Reset Action Type:
```js
// actions/types.js
export const RESET_STATE = 'RESET_STATE';
```

#### 2. Create a Reset Action Creator:

```js
// actions/index.js
import { RESET_STATE } from './types';

export const resetState = () => ({
  type: RESET_STATE,
});
```

#### 3. Handle the Reset Action in Reducers:

```js
import { RESET_STATE } from '../actions/types';

const initialState = {
  // initial state values
};

function myReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    // handle other actions
    default:
      return state;
  }
}
```
#### 4. Dispatch the Reset Action::
- Whenever you want to reset the state, dispatch the resetState action. This can be done from anywhere in your app where you have access to the Redux store's dispatch function.


```js
import { resetState } from './actions';

// Dispatch the reset action
store.dispatch(resetState());
```

#### Global Approach for Multiple Reducers:
- If you're using multiple reducers and **want a global way to reset the state**, <ins>***you can wrap your root reducer with a higher-order reducer that handles the reset action, instead of modifying each reducer individually***</ins>.


```js
const rootReducer = combineReducers({
  // your reducers
});

const resettableRootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return rootReducer(state, action);
};
```
----

## 21. What are the differences between call and put in redux-saga?

### 1. <ins>Purposes and Functionality:</ins>

### `call`

- This effect is used to create a description object that **instructs the middleware to `call` <ins>a given function</ins> with the specified arguments**. 

- The call effect <ins>**waits for the called function to return a result or throw an error before proceeding with the saga's execution**</ins>. 
- **It's a blocking effect, <ins>*meaning the saga is paused until the call completes*</ins>**.

### `put`

-  This effect creates a description object that **instructs the middleware to `dispatch` <ins>an action</ins> to the Redux store**
- It is <ins>**used for triggering state changes or actions in response to certain events**</ins> or operations within a saga. 
- Unlike call, <ins>**put is a non-blocking effect**</ins>, meaning the saga does not wait for the action to be processed by reducers or other middleware before continuing its execution.



### 2. <ins>Usage:</ins>

### `call`
- It is **primarily used for calling asynchronous functions** (e.g., API calls, data fetching operations) **without blocking the main execution thread**. 
- <ins>**Example usage**</ins>: 
```js
// api.fetchUser is the function to call with userId as its argument.
yield call(api.fetchUser, userId)
```

### `put`
-  Used for **dispatching actions to the Redux store**, typically to update the state based on the results of an asynchronous operation or other logic within a saga. 
- <ins>**Example usage**</ins>: 
```js
// api.fetchUser is the function to call with userId as its argument.
yield put({ type: 'FETCH_USER_SUCCESS', user: userData })
```
### 3. <ins>Effect on Saga Execution:</ins>

### `call`

-  **Pauses the saga's execution until the called function resolves**, making it suitable for operations where the saga needs to wait for the completion of an asynchronous task.

### `put`
- Does not pause the saga's execution, allowing the saga to continue running after dispatching an action. This behavior is useful for scenarios where the saga does not need to wait for the effects of the dispatched action to proceed.

-----

## 22. What is the mental model of `redux-saga`?
- `Redux-Saga` uses an ES6 feature called `Generators` to make asynchronous flows easy to read, write, and test. 
- By using sagas, you essentially create separate threads in your application that are **solely responsible for side effects, while keeping the UI and the state management logic clean and separate**.
- `redux-saga` is a redux middleware, which means this thread can be `started`, `paused` and `cancelled` from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.
- Redux-Saga **provides built-in support for task cancellation**, which is a powerful feature for managing complex asynchronous flows. 
- Sagas **can <ins>spawn tasks that can be later cancelled if certain actions</ins> are dispatched to the store**. 
- This is **particularly useful <ins>for avoiding race conditions</ins>** and **managing resource cleanup**.
- By using sagas, you **centralize the logic for handling side effects in your application**
- This separation of concerns makes your application's logic more modular, easier to understand, and simpler to test, as the side effect handling is abstracted away from the UI and state management.

```js
npm install --save redux-saga
```

#### Step 1: Setup Actions

```js
// Action Types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

// Action Creators
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});
```

#### Step 2: Create the Saga

```js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, fetchUserSuccess, fetchUserFailure } from './actions';

// Simulate an API call
const fetchUserData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return await response.json();
};

// Worker Saga
function* fetchUserSaga() {
  try {
    const user = yield call(fetchUserData);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

// Watcher Saga
function* watchFetchUser() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}

export default watchFetchUser;
```

#### Step 3: Setup the Redux Store
```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Assume this is your root reducer
import watchFetchUser from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Redux store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Then run the saga
sagaMiddleware.run(watchFetchUser);

export default store;
```
-----


## 23. When would `bindActionCreators` be used in react/redux?

- `bindActionCreators` is a utility function provided by Redux that **wraps action creators with the dispatch function**, making it easier to invoke them directly without needing to call dispatch each time. 
    
```js
export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});

export const deleteUser = (userId) => ({
  type: 'DELETE_USER',
  payload: userId,
});
```

```js
//MyComponent.jsx
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';

function MyComponent({ updateUser, deleteUser }) {
  return (
    <div>
      <button onClick={() => updateUser({ id: 1, name: 'John Doe' })}>
        Update User
      </button>
      <button onClick={() => deleteUser(1)}>
        Delete User
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  //to bind all action creators from the actions.js file to the Redux dispatch function
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(MyComponent);
```
### **Conclusion**:
- **bindActionCreators** is a helpful utility in Redux for scenarios where you want to simplify the process of dispatching actions, especially in React components. 


- Without `bindActionCreators`, **you would need to manually wrap each action creator with the dispatch function in your mapDispatchToProps function** or within your components. This can lead to repetitive and cumbersome code, especially as the number of actions increases.

#### Without bindActionCreators

```js
// actions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });

// CounterComponent.js
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

function CounterComponent({ increment, decrement }) {
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

export default connect(null, mapDispatchToProps)(CounterComponent);
```

#### With bindActionCreators
```js
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

function CounterComponent({ increment, decrement }) {
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  increment,
  decrement,
}, dispatch);

export default connect(null, mapDispatchToProps)(CounterComponent);
```
----



### 24. What is `mapStateToProps` and `mapDispatchToProps`?

- `react-redux` package provides 3 functions `connect`, `mapStateToProps` and `mapDispatchToProps`. 
- `connect` is a higher order function that takes in both `mapStateToProps` and `mapDispatchToProps` **as parameters**.

#### mapStateToProps

- <ins>**pulls in the state of a specific reducer state object** from **global store**</ins> and maps it to the props of component

#### mapDispatchToProps
- mapDispatchToProps **allows to dispatch state changes** to your store.


```js
// actions.js
export const addTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo,
});
```

```js
// reducers.js
const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};

export default todoReducer;
```

```js
// TodoComponent.jsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions';

const TodoComponent = ({ todos, addTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

// EXAMPLE
const mapStateToProps = (state) => ({
  todos: state.todos,
});

// EXAMPLE
const mapDispatchToProps = {
  addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);
```
-----


## 26. What is `reselect` and how it works?
- `reselect` is a simple library <ins>***for creating memoized, composable selector functions***</ins>


#### How reselect Works?
1. **Memoization**: 
   - reselect selectors **remember their inputs** (the arguments passed to them) **and outputs** (the result of the selector's computation). 
   - If a selector is called multiple times with the same inputs, **it will return the cached output without recomputing**. 
   - This can significantly improve performance, especially for expensive calculations.
<br/>

2. **Composability**: 
   - Selectors created with reselect can be composed together. 
   - This means you can create "base" selectors that extract slices of state and then compose them into more complex selectors that perform further calculations or transformations on that data.
<br/>

3. **Encapsulation**: 
   - By encapsulating the state shape and logic for deriving data from the state, selectors make your application more maintainable. 
   - Components don't need to know about the structure of the Redux store or how data is calculated—they just use selectors to get the data they need.


```js
import { createSelector } from 'reselect';

// Assuming our Redux state has a property 'users' which is an array of user objects
const getUsers = (state) => state.users;

const getActiveUsers = createSelector(
  [getUsers], // Input selector
  (users) => users.filter(user => user.isActive) // Computation to get active users
);

const getNumberOfActiveUsers = createSelector(
  [getActiveUsers], // Input selector
  (activeUsers) => activeUsers.length // Computation to count active users
);


// Assuming our Redux state looks something like this:
const state = {
  users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
};

// This will compute the number of users
console.log(getNumberOfUsers(state)); // Output: 2

// On subsequent calls with the same state, Reselect will return the cached result
console.log(getNumberOfUsers(state)); // Output: 2 (cached result, no recomputation)
```


----

## 27. What are the different ways to dispatch actions in Redux?

#### 1. Direct Dispatch in Store

```js
store.dispatch({ type: 'INCREMENT' });
```

#### 2. `connect` Higher-Order Component with `mapDispatchToProps`

```js
import { connect } from 'react-redux';
import { increment } from './actionCreators';

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch(increment()),
  };
}

connect(null, mapDispatchToProps)(MyComponent);
```

#### Using bindActionCreators:
- If you have multiple actions, bindActionCreators can be used in mapDispatchToProps to automatically bind many action creators to dispatch.
```js
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(MyComponent);
```



#### 3. Redux Hooks
```js
import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from './actionCreators';

function MyComponent() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>Increment</button>
  );
}
```

#### 4. Middleware
```js
const asyncIncrement = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: 'INCREMENT' });
  }, 1000);
};
```

```js
function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}
```

-----
## 28. How to use Redux for Error Handling?

- Using Redux for error handling involves a structured approach to managing and responding to errors that occur in your application, especially those from **asynchronous operations like API calls**.

#### 1. Structuring Your Actions

For any asynchronous operation, you typically dispatch at least three types of actions:

- **Request Action**: Dispatched when the operation **begins**.
- **Success Action**: Dispatched when the operation **completes** successfully.
- **Failure Action**: Dispatched if the operation **fails**.


```js
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
```
### 2. Creating Action Creators
```js
const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, payload: data });
const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });
```


### 3. Handling Actions in Reducers

```js
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}
```

### 4. Dispatching Actions

- When performing an asynchronous operation, use the action creators to dispatch actions corresponding to the operation's progress and outcome. For operations that might fail, such as API calls, use a try-catch block to catch errors and dispatch a failure action with the error.

```js
const fetchData = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};
```

### 5. Connecting to React Components

```js
import React from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const { data, isLoading, error } = useSelector(state => state.data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Display data */}
    </div>
  );
};
```


------
29. Discuss the use of the `compose` function in Redux.

- The compose function in Redux is a utility that **allows you to combine multiple functions into a single function**
- It is particularly <ins>**useful for enhancing store creation with several store enhancers or middleware**</ins>, or when you need to apply multiple higher-order components (HOCs) to a React component
-  The compose function **applies from right to left**, meaning the function written last in the argument list will execute first.


```js
// basic signature
compose(f, g, h)(...args)

//which is equivalent
f(g(h(...args)))
```

### Use Case in Redux: Enhancing Store with Middleware and Enhancers

- One of the most common use cases for compose in Redux is **when you're setting up your store and you want to apply several middleware and store enhancers**. 
- Redux's `applyMiddleware` function itself **returns a store enhancer**, so <ins>***if you have multiple enhancers to apply, you can use compose to combine them***</ins>.


```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from './reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const store = createStore(rootReducer, enhancer);
```

## Use Case in React: Composing Higher-Order Components
```js
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function MyComponent(props) {
  // Component implementation
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MyComponent);
```

---

30. How would you `test` Redux-connected components?

### 1. Shallow Testing with Mock Store

```js
//Using a Mock Store with React Testing Library:
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MyConnectedComponent from './MyConnectedComponent';

const mockStore = configureMockStore();
const store = mockStore({
  // Initial state for test
});

test('renders with mocked Redux store', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MyConnectedComponent />
    </Provider>
  );

  expect(getByText(/some text based on redux state/i)).toBeInTheDocument();
});
```


### 2. Full DOM Testing

```js
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux'; //ADDED 
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Your root reducer // ADDED
import MyConnectedComponent from './MyConnectedComponent';

const store = createStore(rootReducer, /* initial test state */);

test('full DOM rendering with real Redux store', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MyConnectedComponent />
    </Provider>
  );

  // Perform assertions and interactions
});
```

### 3. Testing Dispatched Actions and State Changes

```js
import configureMockStore from 'redux-mock-store';
import someActionCreator from './actionCreators';

const mockStore = configureMockStore();
const store = mockStore({});

store.dispatch(someActionCreator('test'));

expect(store.getActions()).toContainEqual({
  type: 'SOME_ACTION_TYPE',
  payload: 'test',
});
```
---

## 31. What is the purpose of the `Redux DevTools` extension?

- powerful tool designed to enhance the development and debugging experience for applications using Redux. 

### Purpose of Redux DevTools
- **State Inspection**: The extension **allows developers to inspect the current state of the Redux store at any given time**. This is crucial for understanding how the application's state changes in response to dispatched actions.
<br/>

- **Action History**: Developers **can view a log of all actions that have been dispatched, along with the state before and after each action**. This makes it easier to trace how and when the state changes, helping to identify and debug issues.
<br/>

- **Time Travel Debugging**: One of the most powerful features of Redux DevTools <ins>***is its ability to "time travel," meaning developers can go back and forth between different states of the application by "replaying" or "undoing" actions***</ins>. This is incredibly useful for debugging and understanding complex state changes.
<br/>


### Key Features

- **Action Filtering**: Developers <ins>**can filter actions by type or by custom criteria to focus on specific parts of the application state**</ins> or specific actions.
<br/>

- **State Diffing**: The tool **can show the difference in the state before and after an action is dispatched**, <ins>**highlighting exactly what changed**</ins>. This is particularly useful for understanding how complex actions affect the state.

```js
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));
```

----


32. Discuss the principles of `normalizing state` shape in Redux.

- is a design approach that aims to organize the data in your Redux store in a way that promotes efficiency, consistency, and simplicity, especially when dealing with complex or relational data.
- This approach draws inspiration from database normalization principles, where data is structured to reduce redundancy and improve data integrity

### 1. Use of a Flat Structure

- Normalizing state means breaking down nested or hierarchical data into a flat structure **where each type of data gets its own "table" in the state**.

```js
//nested
{
  posts: {
    byId: {
      "post1": {
        id: "post1",
        title: "Introduction to Redux",
        comments: [
          { id: "comment1", content: "Great article!" },
          // More comments
        ]
      }
    }
  }
}
```

```js
{
  posts: {
    byId: {
      "post1": { id: "post1", title: "Introduction to Redux", commentIds: ["comment1"] }
    }
  },
  comments: {
    byId: {
      "comment1": { id: "comment1", content: "Great article!" }
    }
  }
}
```
### 2. IDs as References
- In a normalized state, you store the IDs of objects in arrays as references, rather than storing the actual object.
- This makes it easier to update or delete items without having to navigate a deeply nested structure.

### 3. Enable Easier Querying
- Selectors become much simpler and more efficient with normalized data. 
- Rather than writing complex logic to traverse and filter nested structures, selectors can directly access the needed piece of data using its ID and compose information as required for the UI.

---

## 33. Describe the role of the `Provider` component in React-Redux.
- It **serves as the bridge between a Redux store and a React application**, enabling React components to access the Redux store's state and dispatch actions. 

### 1. Making the Redux Store Available to React Components
- The primary role of the Provider component <ins>**is to make a Redux store available to any nested components that need to access the Redux state or dispatch actions**</ins>. 

### 2. Usage
- The Provider component is typically used at the root of your React application. You wrap your top-level component (often the App component) with Provider and pass the Redux store as a prop to it.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

----
## 34. How does the Redux store `subscribe` to changes in the state?
- The Redux store's subscribe function **allows code to listen for changes to the store's state**.
- When an action is dispatched and the store's state potentially changes as a result of the reducers processing this action, **all registered listeners (subscribers) are notified of the update**.

### Subscribing Listeners
**Registration**: 
- You can <ins>**register a listener function with the store by calling its subscribe(listener) method**</ins>. 
- The `listener` is a function that you define, which will be called every time an action is dispatched and the state has potentially changed.


```js
const listener = () => {
  console.log('The state has changed.');
};

const unsubscribe = store.subscribe(listener);
```

**Notification**: 
- After an action is dispatched and the reducers have potentially modified the state, **all registered listener functions are called in the order they were subscribed.** 
- This is a `synchronous` process, <ins>**so listeners are executed immediately after the state is updated**</ins>.



### Handling Un-subscription
**Unsubscribe**: 
- The subscribe method returns a function that can be called to unsubscribe the listener. 
- This is important for cleaning up, **especially in cases where your subscription should no longer be active** (e.g., a component unmounts in a React application).

```js
// To stop listening to state updates
unsubscribe();
```

**react-redux and Hooks:**
- With the introduction of hooks in React, you can use useSelector to read from the state and useDispatch to dispatch actions. The useSelector hook internally subscribes to the store and triggers re-renders when the selected slice of state changes.


### **Best Practices:**

**Minimize Direct Use**: 
- Direct use of subscribe in application code, especially in React components, is generally discouraged in favor of using react-redux's connect function or hooks. 
- These abstractions not only manage subscriptions for you but also optimize performance by preventing unnecessary re-renders.
-----

35. Discuss the role of `selectors` in optimizing Redux state access.

- Selectors play a crucial role in **managing and accessing the state** in Redux applications efficiently.
- They are functions that take the Redux store's state as an argument and return some data derived from that state.

### 1. Encapsulation and Reusability
- Selectors **encapsulate the state shape**, meaning that the rest of the application doesn't need to know about the exact structure of the Redux state.
- This abstraction makes it easier to change the state structure without having to refactor every component that consumes it. 
-  It also promotes reusability, as selectors can be used across multiple components.

### 2. Computation and Memoization
- Selectors can compute derived data, allowing Redux to store the minimal possible state. 
- This is particularly useful for calculations that are derived from the state but don’t need to be stored within the state itself. 
- Moreover, with the use of memoization (often through libraries like Reselect), selectors can improve the application's performance by caching the results of expensive calculations. 
- If the specific pieces of state that the selector depends on haven't changed since the last call, the selector returns the cached result instead of recalculating.

### 3. Performance Optimization
- By using memoized selectors, components only re-render when the data they depend on has actually changed. This selective rendering avoids unnecessary updates and optimizes the application's performance, especially in large-scale applications with complex state structures or frequent updates.

```js
import { createSelector } from 'reselect';

// Assuming state has a 'users' object with 'byId' and 'allIds' properties
const getUsersById = state => state.users.byId;
const getAllUserIds = state => state.users.allIds;

// This selector returns an array of user objects
const getAllUsers = createSelector(
  [getUsersById, getAllUserIds],
  (usersById, allIds) => allIds.map(id => usersById[id])
);
```

- In this example, `getAllUsers` **is a memoized selector that efficiently computes an array of user objects from the state**. 
- It only recalculates the result when users.byId or users.allIds change, enhancing the application's performance.


#### Conclusion: 
- Selectors are an essential part of state management in Redux applications. They provide a powerful mechanism for accessing, deriving, and memoizing state data, which enhances performance, maintainability, and readability of the application. By abstracting the state shape and optimizing data access, selectors contribute significantly to the scalability and efficiency of Redux-based projects.
 
----

36. How can you handle `optimistic updates` in a Redux application?

-  involves updating the UI immediately as if a certain action (e.g., a network request) has already succeeded, without waiting for the actual confirmation from the server.

#### 1. Dispatch an Action for the Optimistic Update

```js
dispatch({
  type: 'ADD_ITEM_OPTIMISTICALLY',
  payload: newItem,
});
```

#### 2. Perform the Asynchronous Operation
- After dispatching the optimistic update, perform the asynchronous operation. This could involve calling an API, for example.

```js
fetch('/api/items', {
  method: 'POST',
  body: JSON.stringify(newItem),
  headers: {
    'Content-Type': 'application/json',
  },
})
```

#### 3. Handle Success or Failure

```js
.then(response => response.json())
.then(data => {
  dispatch({
    type: 'ADD_ITEM_SUCCESS',
    payload: data,
  });
})
.catch(error => {
  dispatch({
    type: 'ADD_ITEM_REVERT',
    payload: newItem.id,
    error: error.message,
  });
});
```
---------------------------

#### Action Types

```js
const ADD_ITEM_OPTIMISTICALLY = 'ADD_ITEM_OPTIMISTICALLY';
const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
const ADD_ITEM_REVERT = 'ADD_ITEM_REVERT';
```

#### Action Creators

```js
const addItemOptimistically = (item) => ({
  type: ADD_ITEM_OPTIMISTICALLY,
  payload: item,
});

const addItemSuccess = (item) => ({
  type: ADD_ITEM_SUCCESS,
  payload: item,
});

const addItemRevert = (id, error) => ({
  type: ADD_ITEM_REVERT,
  payload: { id, error },
});
```

#### Make async call

```js
const postItem = (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5; // Randomly succeed or fail
      if (success) {
        resolve({ ...item, id: Math.random().toString() }); // Simulate returned item with server-generated ID
      } else {
        reject(new Error('Failed to add item'));
      }
    }, 1000);
  });
};
```

```js
//reducer
const initialState = {
  items: [],
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_OPTIMISTICALLY:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map(item =>
          item.tempId === action.payload.tempId ? action.payload : item
        ),
      };
    case ADD_ITEM_REVERT:
      return {
        ...state,
        items: state.items.filter(item => item.tempId !== action.payload.id),
        error: action.payload.error,
      };
    default:
      return state;
  }
};
```

```js
//Dispatching actions
const store = createStore(itemsReducer);

const newItem = { tempId: "temp-123", content: "Optimistically added item" };

// Dispatch optimistic update
store.dispatch(addItemOptimistically(newItem));

// Perform asynchronous operation
postItem(newItem).then(
  (item) => {
    // Handle success
    store.dispatch(addItemSuccess(item));
  },
  (error) => {
    // Handle failure
    store.dispatch(addItemRevert(newItem.tempId, error.message));
  }
);
```


---

## 37.  Explain the concept of `immutability` and its importance in Redux.
 - refers to the principle that <ins>**state objects should not be modified directly. Instead, any change to the state should produce a new state object with the desired changes, leaving the original state untouched**.</ins>  
  
#### Importance of Immutability in Redux

- **Predictability**: Since the state is not modified directly, actions that transform the **state produce predictable outcomes**. 

- **History/Time Travel**: <ins>**Redux DevTools leverages immutability to implement features like time-travel debugging**</ins>. Because each action produces a new state without altering the previous ones, it's possible to move back and forth between states to inspect the application's behavior over time.

- **Performance Optimization**: `Immutability` <ins>**enables performance optimizations such as shallow equality checks to detect state changes**</ins>.

- **Easier State Management**: Managing an immutable state <ins>**simplifies complex state changes, as changes do not have side effects on other parts of the state.**</ins> This reduces the likelihood of bugs, especially in large applications with intricate state relationships.

#### How to Maintain Immutability
- **Using Pure Functions in Reducers**: Reducers in Redux are **expected to be pure functions—functions that return the same output for the same input without side effects.** When writing reducers, you should not modify the input state or action objects. Instead, return a new object that represents the updated state.

- **Utilizing Immutable Data Structures**: While JavaScript objects and arrays are mutable by default, you can treat them immutably by creating copies when modifying them. For example, <ins>**you can use the spread operator (...) or functions like Object.assign to create a new object with modifications rather than altering the original object.**</ins>

- **Libraries for Immutability**: There are libraries designed to simplify working with immutable data structures in JavaScript, **such as Immutable.js and Immer**. 

-----

## 38.  `Compare` Redux and Context API in React for state management.

#### Redux
- Redux is a predictable state container for JavaScript apps, not limited to React. 
- It <ins>**provides a centralized store for all the state in your application, with rules ensuring that state can only be updated in a predictable fashion**</ins>.

#### Advantages:

- **Predictability**: Redux <ins>**enforces a unidirectional data flow, making state management more predictable**</ins> and easier to understand.
- **Middleware**: Redux supports middleware, <ins>**allowing for more complex operations like asynchronous actions, logging**</ins>, and more.
- **DevTools**: Redux has <ins>**powerful developer tools, including time-travel debugging and state change logging**</ins>.
- **Ecosystem**: There's a large ecosystem of tools and middleware for Redux, as well as comprehensive documentation and community support.
- **Scalability**: Redux is well-suited for large applications with complex state interactions across multiple components.

#### **Context API**
- The Context API <ins>**is a React feature that enables components to share values like state without passing props**</ins> through every level of the tree.

<ins>**Advantages**:</ins>

- **Simplicity**: The Context API is straightforward to use, especially for passing down state without prop-drilling.
- **Built-in**: Being part of React means **no additional libraries are needed, keeping bundle sizes smaller**.
- **Use Case**: Ideal for low-frequency updates and managing global themes, user authentication status, or language preferences.

#### Considerations:

- **Performance**: The <ins>**Context API can cause unnecessary re-renders if not used carefully**</ins>, especially with high-frequency state updates.
- **Scalability**: For very large applications with complex state logic, <ins>**the Context API might be less efficient than Redux, as it lacks middleware and built-in ways to handle side-effects and asynchronous actions**</ins>.

#### Comparison
- **Use Case**: 
  - <ins>**with high-frequency state updates across many components**</ins>. 
  - The <ins>**Context API is ideal for simpler applications**</ins> or for sharing global state (like themes or user authentication) across many components.
- **Complexity vs. Simplicity**: Redux offers more features out of the box, including middleware support and dev tools, but at the cost of increased complexity and boilerplate. The Context API is simpler and more integrated into React, but with fewer built-in capabilities for managing state.
- **Performance**: Redux's design and developer tools help manage and optimize performance for complex applications. The Context API, while simpler, can lead to performance bottlenecks if used extensively for high-frequency updates.


-----
        
39. How would you `integrate` Redux with React Router for navigation?

- Integrating Redux with React Router **involves syncing your application's navigation state with the Redux store**. 
- This integration allows you to dispatch actions to navigate programmatically and respond to navigation changes within your Redux logic.

#### 1. Install Necessary Packages


```js
npm install react-router-dom redux react-redux
```
-----

## 40.  Explain the purpose of the `redux-persist library` in a Redux application.

- designed to enhance a Redux application <ins>**by allowing the state to be persisted and rehydrated across browser sessions**</ins>.
- This means that the <ins>**Redux store's state is saved to a storage mechanism (like localStorage or sessionStorage in web browsers)**</ins> and can be restored when the application is reloaded or reopened, providing a seamless user experience by retaining application state between sessions

#### Purpose of redux-persist

1. **State Persistence**: The primary purpose of redux-persist **is to automatically save the Redux store's state to a persistent storage mechanism and load it back when the application starts**. This is crucial for maintaining the application's state across page reloads and restarts, ensuring that users don't lose their progress or have to redo actions.

2. **Configurable Storage**: redux-persist <ins>**allows you to configure the storage backend used for persisting the state**</ins>. While it defaults to localStorage in web environments, it supports various storage engines, making it adaptable for different environments and requirements, including sessionStorage, AsyncStorage (in React Native), and more.

3. **Selective Persistence**: It <ins>**provides the ability to selectively persist parts of the state**</ins>. This is useful for excluding sensitive or non-essential data from persistence, thereby optimizing performance and respecting user privacy.

4. **State Rehydration**: Upon application startup, <ins>**redux-persist automatically rehydrates the persisted state from storage back into the Redux store**</ins>. This process is seamless and customizable, allowing for transformations and migrations if the state shape changes over time.

5. **Integration with Redux Middleware**: redux-persist **integrates smoothly with the Redux ecosystem, functioning as middleware**. This means it works well with other middleware and enhancers, maintaining the Redux principle of unidirectional data flow.


-----

41.  How can you handle `authentication` and `authorization` in a Redux app?


### 1. Managing Authentication State

<ins>**Store User Token**</ins>: Upon successful authentication (e.g., login), <ins>**store the user's token (received from the server) in the Redux store**</ins>. This token is typically used for subsequent API requests to authenticate the user.

<ins>**Redux Reducers for Auth State**</ins>: <ins>**Create reducers to handle authentication-related actions such as LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT**</ins>, etc. These reducers update the Redux store's state with the authentication status, user token, and any user information needed by the application.

```js
// Auth reducer
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
```

### 2. Persisting Authentication State
- This library automatically saves your Redux store (or parts of it) to local storage and rehydrates it on app startup.

```js
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Specify which parts of the state should be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
```

```js
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Specify which parts of the state should be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
```

### 3. Authentication Middleware and API Calls
- Implement middleware that reads the user token from the Redux store and includes it in API request headers. This ensures that all requests are authenticated.

```js
const authMiddleware = store => next => action => {
  if (action.type === 'API_CALL') {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      action.payload.headers = {
        ...action.payload.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return next(action);
};
```

### 4. Protecting Routes

```js
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )w
      }
    />
  );
};

```


### 5. Managing Authorization

- **Role-Based Access Control (RBAC)**: <ins>**Store user roles or permissions in the Redux store upon authentication**</ins>. Use these roles to conditionally render UI elements or restrict access to certain parts of the application.

-----


### 41. Difference between Redux saga vs Redux Thunk?


<details>

- Both are `middleware` libraries **for managing side effects** in Redux-based applications, 
- but they use `different` approaches and philosophies for handling asynchronous operations. 

#### <ins>Redux Thunk:</ins>
- Allows you to <ins>**write action creators that return a function instead of an action**.</ins> 
- The function **`can`** contain asynchronous logic and can `dispatch actions` at appropriate times.

#### <ins>Key Features:</ins>
- **Simplicity**: 
  - `Thunks` are straightforward to use and easy to integrate, making them an **excellent choice for simple scenarios**.
<br/>

- **Flexibility**: 
  - You can ***include*** both `synchronous` and `asynchronous` logic **<ins>inside a single thunk**</ins>.
<br/>

- **Control**: 
  - Thunks give you **direct control over the dispatch process**, allowing you to dispatch multiple actions in response to asynchronous events.

#### <ins>Usage:</ins>
- Thunks are primarily **used for <ins>simple asynchronous operations</ins>** like API calls, 
- where you might want to <ins>**dispatch an action when a request starts and another when it completes**</ins>.

#### <ins>Redux Saga:</ins>

- Redux Saga uses ES6 generator functions to make asynchronous flows easy to read, write, and test. 
- It **handles complex scenarios more seamlessly than thunks** due to its declarative approach and powerful suite of effects.

#### <ins>Key Features:</ins>

- **Declarative Approach**: 
  - Sagas use `yield` statements to express asynchronous flows in a synchronous-like manner, which can be easier to manage and reason about.
- **Effect Creators**: 
  - These are functions provided by Redux Saga that return plain JavaScript objects describing the intended side effect, which keeps your saga logic pure.
- **Testing**: 
  - Testing sagas is generally more straightforward because you can test the generator functions by checking the yielded effects without performing the actual side effect.
- **Concurrency Management**: 
  - Sagas offer built-in ways to handle common concurrent patterns, such as starting, pausing, and cancelling tasks.

#### <ins>Usage</ins>:
- `Sagas` are **beneficial** for <ins>**handling complex sequences of asynchronous operations**</ins>. 
- and scenarios **where you <ins>need fine-grained control over side effects**</ins>, 
- **`concurrency`**, or where related asynchronous operations might overlap.
<summary>
View Answer
</summary>
</details>

