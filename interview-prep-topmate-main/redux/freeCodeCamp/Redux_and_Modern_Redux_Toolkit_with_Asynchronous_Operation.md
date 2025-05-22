## Redux and Modern Redux Toolkit with Asynchronous Operation – Full Course

[Watch on Youtube](https://www.youtube.com/watch?v=SlC8941Wwrk)

---


- Master **state management** in React applications from the ground up.
- Learn from **core Redux concepts** to advanced patterns with **real-world examples**.
- Taught by **Kaiser Conom**, this course promises to make you a **Redux Pro**.

---


- **Course Highlights**:
  - Covers **basic to advanced topics** in Redux.
  - Focuses on managing **state** and handling **asynchronous operations**.
  - Includes **practical projects** to reinforce learning.
  - Comprehensive support throughout the course.

---


- **What is Redux?**
  - Redux is a **library for managing global state**.
  - React’s components manage state locally, but sharing data across sibling components is challenging.
  - Example structure:
    - Parent component: `App`
    - Child components: `User`, `Form`
  - **Problem**: Sharing state between sibling components (`User` and `Form`) isn’t straightforward.

---


- **Lifting State Up**:
  - **Solution 1**:
    - Pass the `Form` component’s state to the parent (`App`) and then distribute it via props.
  - **Solution 2**:
    - Use a centralized **store** (Redux) to manage the entire application’s state.

- **Why Redux?**
  - Provides a **centralized store** accessible to all components.
  - Avoids the hassle of lifting state up for deeply nested components.

---


- **When to Use Redux**:
  - Redux is ideal for **large applications** with complex state-sharing requirements.
  - Alternatives include:
    - `useState`
    - `useReducer`
    - `useContext`

---


- **Redux’s Usefulness**:
  - Imagine a React app with deeply nested components.
  - Redux allows components to directly access the global state without complex prop drilling.

---


- **Illustrative Example**:
  - Nested components require the same state.
  - Without Redux, prop drilling becomes tedious and error-prone.
  - Redux’s store eliminates these issues by serving as a single source of truth.

---


- **Centralized State Management**:
  - Store the application’s entire state in a Redux store.
  - Components request data directly from the store.
  - Redux ensures **predictable state transitions** and **efficient state sharing**.

---


- **Redux’s Origin**:
  - Created by **Dan Abramov** and **Andrew Clark** in 2015.
  - Works with frameworks like React, Angular, Vue.js, and even vanilla JavaScript.

- **Key Features**:
  - Redux is a **predictable state container**.
  - Maintains a single source of truth for state transitions.

---


- **When to Choose Redux**:
  - Ideal for applications with **complex component trees**.
  - **Small projects** may not require Redux, as it adds complexity and boilerplate.

- **Learning Redux**:
  - Three categories of learners:
    1. **Confident React developers** with `useReducer` knowledge.
    2. **Struggling beginners** who understand principles but find real-world applications challenging.
    3. **Beginners overwhelmed by Redux’s complexity.**

---


- **Prerequisites for Learning Redux**:
  - Basic understanding of React.
  - Knowledge of `useReducer` is a plus.

- **Alternative Approaches**:
  - Combining `useReducer` and `useContext` can replicate Redux-like functionality for simpler use cases.

---


- **Redux vs. Context API**:
  - **Redux**:
    - Best for large, complex applications.
    - Features like **middleware** and **dev tools** make it robust.
  - **Context API**:
    - Suitable for small to medium-sized applications.
    - Limited debugging tools and scalability.

---


- **Advantages of Redux**:
  1. **Centralized State Management**:
     - Single source of truth ensures consistency.
  2. **Middleware Support**:
     - Handles async operations like API calls.
  3. **Debugging Tools**:
     - Redux DevTools for tracking state changes.

---


- **When to Use Redux**:
  - Use Redux when managing state becomes challenging with React’s native tools.

- **Conclusion**:
  - Redux is suitable for larger applications, while Context API suffices for smaller projects.

---


- **Initial Setup**:
  - Install Node.js and check version using `node -v`.
  - Initialize a new project using `npm init -y`.
  - Install Redux with `npm install redux`.

---


- **Core Redux Concepts**:
  1. **Store**: Holds the state.
  2. **Actions**: Describe what happened.
  3. **Reducers**: Specify how the state changes.

---


- **Redux Store Analogy**:
  - A pizza shop:
    - **Kitchen** = Redux store (holds state).
    - **Customer Order** = Action (describes an event).
    - **Chef** = Reducer (updates the state).

---


- **Three Core Redux Principles**:
  1. **Single Source of Truth**: One centralized store for the entire application.
  2. **State is Read-Only**: Modify state via actions only.
  3. **Changes via Pure Functions**: Reducers must be pure.

---


- **Managing Application State**
  - Application state is managed in a single object.
  - This state is stored in the **Redux Store**.

- **Example: Pizza Shop**
  - **Tracking Pizza Base:** Represent the number of pizza bases in the kitchen.
  - The object contains properties, like `PizzaBase`, indicating the count (e.g., `PizzaBase: 1000`).


- **Second Principle: State is Read-Only**
  - The only way to change the state is by **dispatching actions**.
  - **Actions:** Plain objects describing what has happened.
  - Example:
    - Action: Ordering a pizza.
    - The chef (reducer) processes the action and prepares the pizza.


- **Third Principle: Pure Functions**
  - Changes to state are made using **pure functions** called **reducers**.
  - Reducers:
    - Take the **current state** and **action** as arguments.
    - Return a new state **without mutating the original state**.


- **Example: Pizza Shop Continued**
  - A customer orders a pizza:
    - The chef reduces the count of pizza bases.
    - **Example:**
      ```javascript
      let pizzaBase = 1000;
      let action = { type: "ORDER_PIZZA" };
      pizzaBase -= 1;
      ```

---

### **Redux Core Principles**


1. **Single Source of Truth**
   - All application state is stored in the Redux store.
   - State is managed in a centralized object.

2. **State is Read-Only**
   - State can only be changed through actions.
   - Ensures predictability.

3. **Changes are Made with Pure Functions**
   - Reducers handle state updates.

---

### **Implementation Details**


- **Application and Redux Store**
  - Applications subscribe to the Redux store.
  - **Updating State Flow**:
    1. Dispatch an **action**.
    2. **Reducer** processes the action.
    3. The store returns the updated state.


- **Actions and Action Creators**
  - **Actions:** Plain JavaScript objects.
  - Example:
    ```javascript
    const action = {
      type: "ORDER_PIZZA",
      shopName: "Pizza Shop",
    };
    ```

  - **Action Creators:** Functions that return actions.
    ```javascript
    function orderPizza() {
      return {
        type: "ORDER_PIZZA",
        shopName: "Pizza Shop",
      };
    }
    ```


- **Best Practices for Actions**
  - Use constants for action types.
    ```javascript
    const ORDER_PIZZA = "ORDER_PIZZA";
    ```
  - Avoid using string literals multiple times.

---

### **Reducers**


- **What is a Reducer?**
  - A **function** that takes the **current state** and an **action**.
  - Returns the new state **without mutating the original state**.
  - Example:
    ```javascript
    const initialState = { pizzaBase: 100 };
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "ORDER_PIZZA":
          return { ...state, pizzaBase: state.pizzaBase - 1 };
        default:
          return state;
      }
    };
    ```


- **Initializing State**
  - Example:
    ```javascript
    const initialState = { pizzaBase: 100 };
    ```


- **Using Spread Operator**
  - Avoid direct mutation of state.
  - Copy the current state and update only the necessary fields.
    ```javascript
    return { ...state, pizzaBase: state.pizzaBase - 1 };
    ```

---



- **Understanding the Reducer:**
  - The reducer determines the type of action to dispatch using a `switch` statement.
  - Syntax: `switch(action.type)`.
  - The `action` object is passed to the reducer, and the `type` field is accessed.

---


- **Case: 'orderPizza':**
  - If `action.type` is `orderPizza`, the reducer executes this case.
  - Returns a new object with updated state.
  - Example: Reducing `pizzaBase` by 1.
  - Code snippet:
    ```javascript
    return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
    };
    ```

---

- **Initial State and Arguments:**
  - Reducer takes the current state and action as arguments.
  - The `initialState` is passed as the default value for `state`.
  - Action creator returns the entire action object, which is processed by the reducer.
  - **Switch Expression:** Checks the `action.type` for matching cases.

---


- **Handling Multiple Action Types:**
  - For different actions like `orderBurger`, additional cases are written.
  - If no action matches, the `default` case returns the current state unchanged.

---


- **Role of Reducers:**
  - Reducers update the application state based on dispatched actions.
  - Pure functions: Always return new updated state without mutating the original.
  - Can handle multiple properties like `toppings` in the state.

---


- **State Example with Toppings:**
  - Example `initialState`:
    ```javascript
    const initialState = {
        pizzaBase: 5,
        toppings: ['cheese', 'capsicum'],
    };
    ```
  - Updates only the `pizzaBase` while keeping `toppings` unchanged.

---


- **Using Spread Operator:**
  - Ensures the original state is not mutated.
  - Copies the state object and updates only the necessary properties.
  - Example:
    ```javascript
    return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
    };
    ```

---


- **Importance of Copying State:**
  - Prevents overriding other properties when updating the state.
  - Ensures immutability of the state.
  - Necessary for future additions to the state.

---


- **Order Pizza Example:**
  - Dispatching `orderPizza` action reduces `pizzaBase` by 1.
  - Example Reducer Implementation:
    ```javascript
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'orderPizza':
                return {
                    ...state,
                    pizzaBase: state.pizzaBase - 1,
                };
            default:
                return state;
        }
    };
    ```


-----

### **Store**


- **Responsibilities of the Store**
  1. Holds the **application state**.
  2. Provides a `getState()` method.
  3. Allows listeners via `subscribe()`.
  4. Updates state via `dispatch()`.
  5. Can unsubscribe listeners.


- **Setting Up Redux Store**
  - Using the `createStore` method from Redux.
  - Example:
    ```javascript
    const store = Redux.createStore(reducer);
    ```


- **Deprecated Methods**
  - `createStore` is now deprecated.
  - Recommended to use **Redux Toolkit**.

---

### **Summary**

#### Key Points:
- Redux simplifies state management in complex applications.
- Actions, reducers, and store form the core principles of Redux.
- Redux Toolkit is the modern, streamlined way to implement Redux.

---




- **Application State**:
  - The application state is stored in the `initialState`.
  - The reducer function is passed as a parameter because:
    - It manages the **state transition** based on actions received.
    - Parameters:
      - `state`: Holds the initial state.
      - `action`: Triggers the update of the state.

---


- **Responsibilities of the Store**:
  - Provides a method `getState` to access the current application state.
  - Example:
    - Write a log to access the state:
      ```javascript
      console.log(store.getState());
      ```
    - **Output**: Initial state with a `pizzaBase` value of `100`.

---


- **Registering Listeners via `subscribe` Method**:
  - The store allows registering listeners using the `subscribe` method.
  - This method:
    - Accepts a function as a parameter.
    - Executes whenever there’s a state change.

- Example:
  ```javascript
  store.subscribe(() => {
    console.log("Updated State:", store.getState());
  });
  ```

---


- **Dispatch Actions to Update State**:
  - Use `dispatch()` to pass actions and update the state.
  - Actions are plain JavaScript objects containing:
    - **Type**: Specifies the action.
    - **Payload**: Data for the action.

- **Action Creator**:
  - A function to simplify action dispatch:
    ```javascript
    function orderPizza() {
      return {
        type: "ORDER_PIZZA",
        payload: 90,
      };
    }
    ```

- **Reducer Function**:
  - Handles the dispatched action using a `switch` statement.
  - Updates the state accordingly.

---


- **Unsubscribing from the Store**:
  - Use the return value of the `subscribe` method to unsubscribe.
  - Example:
    ```javascript
    const unsubscribe = store.subscribe(() => {});
    unsubscribe();
    ```

---


- **Review of Responsibilities**:
  1. Access the Redux library and use `createStore`.
  2. Create a store with the reducer function to manage state transitions.
  3. Use `getState` to access the current state.
  4. Use `subscribe` to register listeners.
  5. Dispatch actions to update the state.
  6. Unsubscribe from the store when needed.

---


- **Analogy: Pizza Shop**:
  - Initial setup:
    - **State**: Number of pizza bases in the kitchen.
    - **Reducer**: The chef preparing pizzas.
  - Expanded to include burgers:
    - Separate chefs manage pizzas and burgers for scalability.

---


- **Implementing Multiple Reducers**:
  - Example:
    ```javascript
    const initialStatePizza = { pizzaBase: 100 };
    const initialStateBurger = { burgerBuns: 200 };

    function reducerPizza(state = initialStatePizza, action) {
      switch (action.type) {
        case "ORDER_PIZZA":
          return { ...state, pizzaBase: state.pizzaBase - 1 };
        default:
          return state;
      }
    }

    function reducerBurger(state = initialStateBurger, action) {
      switch (action.type) {
        case "ORDER_BURGER":
          return { ...state, burgerBuns: state.burgerBuns - 1 };
        default:
          return state;
      }
    }
    ```

---


- **Combining Reducers**:
  - Use the `combineReducers` method to manage multiple reducers.
  - Example:
    ```javascript
    import { createStore, combineReducers } from "redux";

    const rootReducer = combineReducers({
      pizza: reducerPizza,
      burger: reducerBurger,
    });

    const store = createStore(rootReducer);
    ```

---


- **Accessing Combined State**:
  - State is now a nested object with keys corresponding to reducers.
  - Example:
    - Access pizza base:
      ```javascript
      store.getState().pizza.pizzaBase;
      ```
    - Access burger buns:
      ```javascript
      store.getState().burger.burgerBuns;
      ```

---


- **Dispatching Actions**:
  - Once an action is dispatched, the reducer handles it.
  - With combined reducers in a root reducer:
    - Each reducer evaluates the action.
    - Relevant reducers act, others ignore it.
  - Separate reducers manage their own state segments.

- **Scaling the Application**:
  - Different states and reducers can be kept in separate files.
  - This ensures modularity and independence.

---

- **Understanding `useReducer` Hook**:
  - `useReducer` is an alternative to `useState` for managing complex state logic.
  - **Syntax**:
    ```javascript
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    ```
    - Accepts:
      - A reducer function.
      - An initial state.
    - Returns:
      - A destructured array (state and dispatch function).
  - **Actions**:
    - Objects containing details on state updates.
    - Standard format:
      ```javascript
      {
        type: 'ACTION_TYPE',
        payload: value
      }
      ```

---

- **Redux vs `useReducer`**:
  - In `useReducer`:
    - Actions are dispatched directly to reducers.
  - In Redux:
    - Actions are dispatched to the **store**.
    - The store:
      - Contains multiple reducers.
      - Acts as a single source of truth.

---

- **Reducers in Redux**:
  - Pure functions responsible for:
    - Calculating the next state.
    - Handling dispatched actions.
  - Example:
    - Shopping app:
      - Reducers for shopping cart, pricing, and user details.

---

- **Action Creators**:
  - Functions that return actions.
  - Benefits:
    - Centralizes action logic.
    - Reduces bugs by avoiding hardcoded strings for action types.

---

- **Redux State Management Cycle**:
  1. Call an **Action Creator** in a component.
  2. Dispatch the action returned by the creator.
  3. Reducer updates the state based on action instructions.
  4. UI re-renders with updated state.

---

- **Middleware in Redux**:
  - Extends Redux functionality (e.g., handling asynchronous operations).
  - Middleware sits between:
    - Dispatching an action.
    - Reducer processing it.

---

- **Asynchronous Logic**:
  - Not written inside reducers as they must remain pure.
  - Not written inside components to keep them clean.
  - Middleware handles such logic.

---

- **Middleware Features**:
  - Allows code execution after dispatch but before reducer.
  - Perfect for:
    - API calls.
    - Timers.
    - Logging.
    - Crash reporting.

---

- **Logger Middleware Setup**:
  - Install Redux Logger:
    ```bash
    npm install redux-logger
    ```
  - Import `createLogger`:
    ```javascript
    const { createLogger } = require('redux-logger');
    const logger = createLogger();
    ```
  - Apply Middleware:
    ```javascript
    import { applyMiddleware } from 'redux';
    const store = createStore(rootReducer, applyMiddleware(logger));
    ```

---

- **Logger Middleware Benefits**:
  - Automatically logs actions, state changes, and errors.
  - Example Logs:
    ```
    Previous State: { pizzas: 100, burgers: 200 }
    Action: { type: 'ORDER_PIZZA' }
    Next State: { pizzas: 99, burgers: 200 }
    ```

---

- **Async Actions**:
  - State for async operations includes:
    - `loading` (boolean).
    - `data` (array).
    - `error` (boolean).
  - Example State:
    ```javascript
    const initialState = {
      loading: false,
      data: [],
      error: null,
    };
    ```

---

- **Action Types**:
  ```javascript
  const FETCH_REQUEST = 'FETCH_REQUEST';
  const FETCH_SUCCESS = 'FETCH_SUCCESS';
  const FETCH_ERROR = 'FETCH_ERROR';
  ```

- **Reducers**:
  - For `FETCH_REQUEST`:
    - Set `loading: true`.
  - For `FETCH_SUCCESS`:
    - Set `loading: false`.
    - Populate `data`.
  - For `FETCH_ERROR`:
    - Set `loading: false`.
    - Set `error`.

---

- **Action Creators**:
  - Functions for creating actions:
    ```javascript
    const fetchRequest = () => ({ type: FETCH_REQUEST });
    const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, payload: data });
    const fetchError = (error) => ({ type: FETCH_ERROR, payload: error });
    ```

---



1. **Fetch Success**:
   - The data fetched from the API is stored in the `products` property.
   - Within the fetch success action, the payload containing the fetched data is passed into the products property.

2. **Reducers**:
   - Reducer function defined as:
     ```javascript
     const reducer = (state = initialState, action) => {
       switch (action.type) {
         case "FETCH_REQUEST":
           return { ...state, loading: true };
         case "FETCH_SUCCESS":
           return { ...state, loading: false, products: action.payload };
         case "FETCH_ERROR":
           return { ...state, loading: false, error: true };
         default:
           return state;
       }
     };
     ```

3. **State Copying**:
   - Copying the state is essential because React's pure functions work with immutable objects.
   - Loading state updated to `true` during the fetch request phase.

---


1. **Setting Up Redux Store**:
   - Redux package accessed using:
     ```javascript
     const { createStore } = require("redux");
     ```

2. **Redux Thunk Middleware**:
   - Redux Thunk allows asynchronous actions.
   - Actions are dispatched post-fetching API data or upon encountering errors.
   - Installation commands:
     ```bash
     npm install redux-thunk
     ```

---


1. **Integrating Middleware**:
   - Middleware like Thunk sits between dispatching actions and updating the store.
   - Applying middleware:
     ```javascript
     const { applyMiddleware } = require("redux");
     const thunk = require("redux-thunk");
     const store = createStore(reducer, applyMiddleware(thunk));
     ```

2. **Action Creators**:
   - Instead of returning an action object, they return a function with side effects (e.g., API calls).
   - Example:
     ```javascript
     const fetchProducts = () => {
       return (dispatch) => {
         dispatch({ type: "FETCH_REQUEST" });
         axios.get("https://fakestoreapi.com/products")
           .then(response => dispatch({ type: "FETCH_SUCCESS", payload: response.data }))
           .catch(error => dispatch({ type: "FETCH_ERROR" }));
       };
     };
     ```

---


1. **Handling API Requests**:
   - Axios used for making API requests:
     ```bash
     npm install axios
     ```
   - Fetching data example:
     ```javascript
     axios.get("https://fakestoreapi.com/products")
       .then(response => console.log(response.data))
       .catch(error => console.error(error));
     ```

2. **Error Handling**:
   - Catch block updates error states.
   - Fetch error dispatched if API call fails:
     ```javascript
     dispatch({ type: "FETCH_ERROR" });
     ```

---


1. **Connecting Redux to React**:
   - Using `react-redux` package for binding:
     ```bash
     npm install react-redux
     ```

2. **Final Notes**:
   - Redux is standalone and can be used with React or other frameworks.
   - React is for UI, Redux for state management.

---



- **Creating the React Application**:
  - Open the terminal and create a new React app:
    ```bash
    npx create-react-app react-redux
    ```
  - Navigate to the project folder:
    ```bash
    cd react-redux
    ```

---


- **Installing Redux and React Redux**:
  - Install Redux:
    ```bash
    npm install redux
    ```
  - Verify installation in `package.json` under dependencies.
  - Install React Redux:
    ```bash
    npm install react-redux
    ```

---


- **Cleaning the Folder Structure**:
  - Inside `public/`, retain only `index.html` and delete other files.
  - Inside `src/`, delete unnecessary files.
  - Update `App.js`:
    ```javascript
    function App() {
      return <h1>Hello World</h1>;
    }
    ```

---


- **Creating and Rendering Components**:
  - Create a `PizzaBox` component:
    ```javascript
    const PizzaBox = () => (
      <div className="container">
        <h2 className="text">Number of Pizza Bases Available: 100</h2>
        <button className="btn">Order Pizza</button>
      </div>
    );
    export default PizzaBox;
    ```
  - Import and render `PizzaBox` in `App.js`.

---


- **Folder Structure for Redux**:
  - Option 1: Features folder:
    - Create folders for each feature (e.g., `pizza`, `burger`) in `src/features/`.
    - Each folder contains:
      - Components
      - Reducers
      - Action creators
    - Store file resides in `src/`.

  - Option 2: Preferred Folder Structure:
    - Create a `components/` folder for React components.
    - Create a `redux/` folder for Redux logic with subfolders for features.

---

- **Setting Up the Redux Folder**:
  - Inside `redux/`, create the following:
    - `pizza/` folder:
      - `pizzaActions.js`
      - `pizzaTypes.js`
      - `pizzaReducer.js`
    - `store.js`.

---

- **Creating Action Creators**:
  - Define actions in `pizzaTypes.js`:
    ```javascript
    export const ORDER_PIZZA = "ORDER_PIZZA";
    ```
  - Create an action creator in `pizzaActions.js`:
    ```javascript
    import { ORDER_PIZZA } from "./pizzaTypes";
    export const orderPizza = () => ({ type: ORDER_PIZZA });
    ```

---

- **Creating Reducers**:
  - Define the initial state and reducer in `pizzaReducer.js`:
    ```javascript
    const initialState = { pizzaBase: 1000 };
    const pizzaReducer = (state = initialState, action) => {
      switch (action.type) {
        case "ORDER_PIZZA":
          return { ...state, pizzaBase: state.pizzaBase - 1 };
        default:
          return state;
      }
    };
    export default pizzaReducer;
    ```

---

- **Creating the Redux Store**:
  - In `store.js`:
    ```javascript
    import { createStore } from "redux";
    import pizzaReducer from "./pizza/pizzaReducer";

    const store = createStore(pizzaReducer);
    export default store;
    ```

---

- **Connecting Redux to React**:
  - Import `Provider` from `react-redux` in `App.js`:
    ```javascript
    import { Provider } from "react-redux";
    import store from "./redux/store";

    function App() {
      return (
        <Provider store={store}>
          <PizzaBox />
        </Provider>
      );
    }
    ```

---

- **Accessing State in Components**:
  - Use `mapStateToProps` to map Redux state to component props:
    ```javascript
    const mapStateToProps = (state) => ({
      pizzaBase: state.pizzaBase,
    });
    ```

----

- **Accessing Redux State**:
  - Access `pizzaBase` from Redux State using `mapStateToProps`.
  - Assign state property to a new property in the return object.

---

- **Accessing Dispatch Function**:
  - `mapDispatchToProps` maps action creators to component props.
  - Example:
    ```javascript
    const mapDispatchToProps = (dispatch) => ({
      orderPizza: () => dispatch(orderPizza()),
    });
    ```
  - Use `dispatch` to invoke action creators in components.

---

- **Combining Actions and Reducers**:
  - Consolidate multiple action creators into an index file.
  - Use `mapDispatchToProps` to pass actions as component props.

---

- **Connecting Redux to React**:
  - Use the `connect` function from `react-redux`:
    ```javascript
    export default connect(mapStateToProps, mapDispatchToProps)(PizzaBox);
    ```
  - This connects state and actions to the React component.

---

- **Dispatching Actions via Props**:
  - Example:
    ```javascript
    <button onClick={() => props.orderPizza()}>
      Order Pizza
    </button>
    ```
  - Props now include state and dispatch functions.

---

- **Introduction to Hooks**:
  - Introduced in 2019 with React 16.8.
  - Enable functional components to manage state and side effects.

---

- **Using `useSelector` Hook**:
  - Simplifies state access:
    ```javascript
    const pizzaBase = useSelector((state) => state.pizzaBase);
    ```
  - Replaces `mapStateToProps`.

---

- **Using `useDispatch` Hook**:
  - Simplifies dispatching actions:
    ```javascript
    const dispatch = useDispatch();
    dispatch(orderPizza());
    ```
  - Replaces `mapDispatchToProps`.

---

- **Modern Applications**:
  - Prefer `useSelector` and `useDispatch` for simplicity.
  - Older projects may still use `connect`.

---

- **Adding a New Component (BurgerBox)**:
  - Create separate folders and files for Burger-specific actions, reducers, and types.

---

- **Setting Up Redux for New Component**:
  - Example for Action Types:
    ```javascript
    export const ORDER_BURGER = 'ORDER_BURGER';
    ```

---



- **Action Creator:**
  - Created an `orderBurger` action that returns an action object with type `ORDER_BURGER`.
  - Example:
    ```javascript
    export const orderBurger = () => {
      return { type: 'ORDER_BURGER' };
    };
    ```


- **Initial State and Reducer:**
  - Initial state defined as:
    ```javascript
    const initialState = { burgerBuns: 200 };
    ```
  - Reducer logic:
    ```javascript
    const burgerReducer = (state = initialState, action) => {
      switch (action.type) {
        case 'ORDER_BURGER':
          return { ...state, burgerBuns: state.burgerBuns - 1 };
        default:
          return state;
      }
    };
    ```

---


- **Combining Reducers:**
  - Used `combineReducers` to manage multiple reducers:
    ```javascript
    import { combineReducers } from 'redux';
    const rootReducer = combineReducers({
      pizza: pizzaReducer,
      burger: burgerReducer,
    });
    ```

---


- **Accessing State Properties:**
  - Mapping `burgerBuns` from initial state to component props.
  - Example:
    ```javascript
    const mapStateToProps = (state) => ({
      burgerBuns: state.burger.burgerBuns,
    });
    ```

---


- **Installing and Using Logger Middleware:**
  - Installed `redux-logger` middleware:
    ```bash
    npm install redux-logger
    ```
  - Applied middleware:
    ```javascript
    import { createStore, applyMiddleware } from 'redux';
    import logger from 'redux-logger';
    const store = createStore(rootReducer, applyMiddleware(logger));
    ```

---


- **Redux DevTools Integration:**
  - Installed DevTools extension:
    ```bash
    npm install redux-devtools-extension
    ```
  - Integrated with the store:
    ```javascript
    import { composeWithDevTools } from 'redux-devtools-extension';
    const store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(logger))
    );
    ```

---


- **Using Redux DevTools:**
  - Explored state transitions, actions, and dispatched events in DevTools UI.
  - Example:
    - Before dispatch: `burgerBuns: 200`.
    - After `ORDER_BURGER` dispatch: `burgerBuns: 199`.

---


- **Passing Dynamic Payloads:**
  - Example:
    ```javascript
    export const orderBurger = (number) => ({
      type: 'ORDER_BURGER',
      payload: number,
    });
    ```

---


- **Controlled Component Example:**
  - Used `useState` to handle input:
    ```javascript
    const [number, setNumber] = useState(1);
    <input
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      placeholder="Enter your number"
    />;
    ```
  - Dispatching with payload:
    ```javascript
    dispatch(orderBurger(number));
    ```
  - Reducer logic:
    ```javascript
    case 'ORDER_BURGER':
      return { ...state, burgerBuns: state.burgerBuns - action.payload };
    ```

---

- **Summary:**
  - Implemented Redux with middleware (`logger`).
  - Integrated Redux DevTools for better debugging.
  - Managed dynamic payloads using controlled components.

----



- **Understanding Payload in Actions**:
  - Payload carries additional data passed with an action.
  - Example:
    - `action.payload` is used to decrease the burger buns by the customer-specified number.

---


- **Default Payload Values**:
  - If multiple components share the action and some components do not pass payload:
    - Assign a default value (e.g., `1`).

---


- **Async Actions in Redux**:
  - Structure of `state`:
    - `loading`: `false` initially, `true` during fetching.
    - `products`: Empty array initially, updated with API data.
    - `error`: `false` initially, `true` if an error occurs.
  - Three `action types`:
    - **FETCH_REQUEST**
    - **FETCH_SUCCESS**
    - **FETCH_ERROR**
  - Reducer logic:
    - For each action type, the state is updated accordingly.

---


- **Setting Up Product Reducers**:
  - Create `initialState`:
    ```javascript
    const initialState = {
      loading: false,
      products: [],
      error: false,
    };
    ```
  - Write reducer:
    ```javascript
    const productReducer = (state = initialState, action) => {
      switch (action.type) {
        case "FETCH_REQUEST":
          return { ...state, loading: true };
        case "FETCH_SUCCESS":
          return { ...state, loading: false, products: action.payload };
        case "FETCH_ERROR":
          return { ...state, loading: false, error: action.payload };
        default:
          return state;
      }
    };
    export default productReducer;
    ```

---


- **Combining Reducers**:
  - Update `store.js` to include multiple reducers:
    ```javascript
    import { combineReducers } from "redux";
    import pizzaReducer from "./pizza/pizzaReducer";
    import productReducer from "./products/productReducer";

    const rootReducer = combineReducers({
      pizza: pizzaReducer,
      product: productReducer,
    });

    const store = createStore(rootReducer, applyMiddleware(thunk));
    export default store;
    ```

---


- **Thunk Middleware Setup**:
  - Install required packages:
    ```bash
    npm install axios redux-thunk
    ```
  - Add middleware to the store:
    ```javascript
    import thunk from "redux-thunk";
    const store = createStore(rootReducer, applyMiddleware(thunk));
    ```

---


- **Writing Thunk Action Creators**:
  - Example to fetch products:
    ```javascript
    export const fetchProducts = () => async (dispatch) => {
      try {
        dispatch(fetchRequest());
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(fetchSuccess(response.data));
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
    ```

---


- **Connecting to Components**:
  - Use `connect` to link state and dispatch to props.
  - Access products in `mapStateToProps`:
    ```javascript
    const mapStateToProps = (state) => ({
      productsData: state.product,
    });
    ```
  - Dispatch `fetchProducts` in `mapDispatchToProps`:
    ```javascript
    const mapDispatchToProps = (dispatch) => ({
      fetchProducts: () => dispatch(fetchProducts()),
    });
    ```

---


- **Loading Data from API**:
  - As the application loads, `fetchProducts` action is dispatched.
  - Successfully logs the entire array of products in the console.
  - **Filtering Titles**:
    ```javascript
    products.map((product) => product.title);
    ```

---

- **Dispatching Success Action**:
  - Dispatch `fetchSuccess`:
    ```javascript
    dispatch({ type: FETCH_SUCCESS, payload: titles });
    ```
  - Update reducer state with:
    - `loading: false`
    - `error: false`
    - `products: titles`
  - Console displays updated state.

---

- **Handling Loading and Error States**:
  - **Loading Message**:
    ```javascript
    if (products.loading) return <p>Loading...</p>;
    ```
  - **Error Handling**:
    ```javascript
    if (products.error) return <p>{products.error}</p>;
    ```
  - Incorrect URL demonstrates error handling.

---

- **Rendering Products in UI**:
  - Render titles in a list using `.map()`:
    ```javascript
    products.map((title) => <p key={title}>{title}</p>);
    ```

---

- **Replacing `connect` with Hooks**:
  - Remove `connect` function and associated imports.
  - Use `useSelector` for accessing Redux state:
    ```javascript
    const products = useSelector((state) => state.products);
    ```
  - Use `useDispatch` for dispatching actions:
    ```javascript
    const dispatch = useDispatch();
    dispatch(fetchProducts());
    ```

---

- **Introducing `immer` Library**:
  - Simplifies state mutation while maintaining immutability.
  - Redux Toolkit uses `immer` internally.

---

- **Traditional State Update Challenges**:
  - Complex state updates with nested properties:
    ```javascript
    const updatedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        filling: action.payload,
      },
    };
    ```

- **Using `immer` for State Updates**:
  - Install `immer`:
    ```bash
    npm install immer
    ```
  - Use `produce` method:
    ```javascript
    const nextState = produce(state, (draft) => {
      draft.ingredients.filling = action.payload;
    });
    ```

---

- **Dispatching Actions Across Reducers**:
  - All reducers receive dispatched actions.
  - Example: `orderPizza` affects both `pizzaReducer` and `burgerReducer`.
  - Modify `burgerReducer` to respond to `orderPizza`:
    ```javascript
    case ORDER_PIZZA:
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };
    ```
  - Logs demonstrate updated states for both reducers.

---



### Mistakes in Redux Usage:

- **Mistake 1**: Not focusing on foundational knowledge
  - **Solution**: Learn React first, including the `useReducer` hook, before diving into Redux.
- **Mistake 2**: Overusing Redux for every state
  - **Solution**: Use Redux only for global or shared state; avoid it for local UI-specific states like form inputs.
- **Mistake 3**: Mutating the state in reducers
  - **Solution**: Always return a new state object using methods like the spread operator or `array.concat()`.

### Other Common Mistakes:

- **Dispatching actions without payload**
  - Ensure actions include relevant data for proper state updates.
- **Poor folder structure**
  - Organize Redux logic in modular ways, grouping related actions and reducers in folders.
- **Handling side effects in reducers**
  - Use middleware like `Redux Thunk` or `Redux Saga` to handle side effects.

---

### Debugging and Optimization:

- Utilize the **Redux DevTools** extension for debugging.
- Replace `mapStateToProps` with hooks like `useSelector` and `useDispatch` to minimize performance issues.
- Use **Redux Toolkit** for reduced boilerplate and better readability.
  - Functions like `createSlice` and `configureStore` simplify state management.

---


### Advantages of Redux Toolkit:

1. **Simplified Configuration**:
   - Includes `configureStore` with good defaults (middleware, DevTools).
2. **Built-in Best Practices**:
   - Encourages clean and maintainable code.
3. **Reduced Boilerplate**:
   - Combines actions and reducers using `createSlice`.
4. **Improved Performance**:
   - Optimized state management with tools like `immer`.

---


### Transitioning to Redux Toolkit:

- Understand Redux fundamentals first:
  - **Core concepts**: Store, state, actions, reducers.
  - **Advanced topics**: Middleware (`thunk`, `saga`), immutability, combining reducers.
- Gradually adopt Redux Toolkit in new projects while maintaining compatibility with older Redux codebases.

---


### Setting Up Redux Toolkit:

1. **Install Redux Toolkit**:
   ```bash
   npm install @reduxjs/toolkit
   ```
2. **Folder Structure**:
   - Root folder contains:
     - `index.js` for main app logic.
     - `app/` folder with `store.js` for Redux store setup.
     - `features/` folder for feature-specific slices.

---


### Example: Pizza and Burger Application

1. Create feature folders:
   - `features/pizza/`
   - `features/burger/`
2. Use `createSlice` to define reducers and actions for each feature.

---

**Note**: Redux Toolkit is backward compatible with Redux, making it easier to adopt in existing projects while ensuring cleaner and more efficient state management in modern applications.

---


- **Introduction to `createSlice`**:
  - Simplifies creating reducers and actions.
  - Automates action creators and action types generation.
  - Manages state updates with consistent logic.

---


- **Benefits of `createSlice`**:
  1. **Automatic Action Types and Creators**:
     - Example:
       ```javascript
       const slice = createSlice({ name: 'pizza', reducers: { addItem: (state) => {} } });
       // Action Type: 'pizza/addItem'
       // Action Creator: slice.actions.addItem
       ```
  2. **Cleaner and Organized Code**:
     - No switch statements required in reducers.
  3. **Simplified Reducer Logic with Immer**:
     - Directly mutate state while Immer ensures immutability.
  4. **Reduced Boilerplate Code**:
     - Combines initial state, reducers, and actions into a single slice.

---


- **Syntax of `createSlice`**:
  - Properties:
    - `name`: Name of the slice.
    - `initialState`: Default values for the state.
    - `reducers`: Functions to handle state transitions.
  - Example:
    ```javascript
    const slice = createSlice({
      name: 'pizza',
      initialState: { pizzaBase: 1000 },
      reducers: {
        orderPizza: (state) => {
          state.pizzaBase -= 1;
        },
      },
    });
    ```

---

- **Setting Up a Slice**:
  1. Import `createSlice`:
     ```javascript
     const { createSlice } = require('@reduxjs/toolkit');
     ```
  2. Define `initialState`:
     ```javascript
     const initialState = { pizzaBase: 1000 };
     ```
  3. Create the slice:
     ```javascript
     const pizzaSlice = createSlice({
       name: 'pizza',
       initialState,
       reducers: {
         orderPizza: (state) => {
           state.pizzaBase--;
         },
       },
     });
     ```
  4. Export:
     - Reducer: `pizzaSlice.reducer`
     - Actions: `pizzaSlice.actions`

---


- **Configure Store with Redux Toolkit**:
  - Import `configureStore`:
    ```javascript
    const { configureStore } = require('@reduxjs/toolkit');
    ```
  - Create store:
    ```javascript
    const store = configureStore({
      reducer: {
        pizza: pizzaSlice.reducer,
      },
    });
    ```
  - Benefits of `configureStore`:
    - Automatically combines reducers.
    - Adds middleware (e.g., thunk).
    - Sets up Redux DevTools.

---


- **Exporting and Using Store**:
  - Export the store:
    ```javascript
    module.exports = store;
    ```
  - Access initial state:
    ```javascript
    console.log('Initial State:', store.getState());
    ```
  - Subscribe to changes:
    ```javascript
    store.subscribe(() => {
      console.log('Updated State:', store.getState());
    });
    ```

---

- **Dispatching Actions**:
  - Import actions:
    ```javascript
    const pizzaActions = require('./features/pizza/pizzaSlice').actions;
    ```
  - Dispatch an action:
    ```javascript
    store.dispatch(pizzaActions.orderPizza());
    ```

---

## **Summary**:
- `createSlice` reduces boilerplate by combining state, reducers, and actions.
- `configureStore` simplifies store setup with automatic reducer combination and middleware addition.
- Redux Toolkit improves readability, reduces complexity, and enhances productivity.

---


- **Reducing Pizza Base with Redux Toolkit**:
  - Direct state mutation using `createSlice`.
  - Redux Toolkit uses `immer` under the hood.
  - Console logs show successful updates:
    - Initial state: 1000 Pizza base.
    - After dispatch: 999 Pizza base.

---

- **Simplified Store Configuration**:
  - No need for:
    - Separate reducers.
    - Combined reducers.
  - Use `configureStore` to automate setup.

---

- **Challenge: Create a Burger Slice**:
  - Repeat steps for Pizza slice to create `burgerSlice.js`.
  - Add Burger reducer to the store and dispatch actions.

---

- **Creating Burger Slice**:
  - Import `createSlice` from Redux Toolkit.
  - Define initial state:
    ```javascript
    const initialState = { burgerBuns: 200 };
    ```
  - Define reducer:
    ```javascript
    burgerOrder: (state) => {
      state.burgerBuns -= 1;
    };
    ```

---

- **Exporting Reducers and Actions**:
  - Export reducer and actions from `burgerSlice.js`:
    ```javascript
    module.exports = burgerSlice.reducer;
    module.exports.BurgerActions = burgerSlice.actions;
    ```

---

- **Adding Reducers to Store**:
  - Use `configureStore` to add multiple reducers:
    ```javascript
    const store = configureStore({
      reducer: {
        pizza: pizzaReducer,
        burger: burgerReducer,
      },
    });
    ```

---

- **Dispatching Actions**:
  - Dispatch Burger and Pizza actions:
    ```javascript
    store.dispatch(BurgerActions.burgerOrder());
    store.dispatch(PizzaActions.pizzaOrder());
    ```
  - Console output demonstrates state updates.

---

- **Adding Middleware to Redux Toolkit**:
  - Install Redux Logger:
    ```bash
    npm install redux-logger
    ```
  - Add logger middleware:
    ```javascript
    const logger = require('redux-logger').createLogger();
    const store = configureStore({
      reducer: { pizza: pizzaReducer, burger: burgerReducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });
    ```

---

- **Logger Middleware Logs**:
  - Logs previous state, action, and next state.
  - Automatically handles action types created by `createSlice`.

---

- **Extra Reducers in Redux Toolkit**:
  - Use extra reducers to handle actions across multiple slices.
  - Example: Responding to `pizzaOrder` in `burgerSlice`:
    ```javascript
    extraReducers: (builder) => {
      builder.addCase(PizzaActions.pizzaOrder, (state) => {
        state.burgerBuns -= 1;
      });
    };
    ```

---

- **Understanding Extra Reducers**:
  - Extra reducers allow multiple reducers to respond to the same action type.
  - Example Scenario:
    - Ordering Pizza reduces both pizza base and burger buns.

---

- **Asynchronous Operations with Redux Toolkit**:
  - Use `createAsyncThunk` for API requests.
  - Handles states like `pending`, `fulfilled`, and `rejected` automatically.
  - Steps:
    1. Define async thunk with `createAsyncThunk`.
    2. Handle async thunk in slice reducers.
    3. Dispatch the async thunk.

----


- **Pending**, **Fulfilled**, and **Rejected** states:
  - **Pending**: Triggered when the request is initiated.
  - **Fulfilled**: Triggered when the request is successful.
  - **Rejected**: Triggered in case of an error during data fetching.
- **Reducers**:
  - Listen to action types using a **reducer function** to perform state transitions.
  - Use **extraReducers** to handle asynchronous actions.
- **Steps Overview**:
  - Use extra reducers.
  - Implement the concept practically.

---


- Steps to perform **asynchronous action** using Redux Toolkit:
  - Follow the steps sequentially.
  - Inside the `features` folder, create a `product` folder.
  - Create `productSlice.js` file.

---


- Import `createSlice`:
  - Use `require` to include the **Redux Toolkit** package.
  - Initialize `productSlice` using `createSlice`.
- Define options for `createSlice`:
  - **Name**: `product`.
  - **Initial State**: 
    ```javascript
    const initialState = {
        loading: false,
        products: [],
        error: ''
    };
    ```

---


- **CreateAsyncThunk**:
  - Import the method from **Redux Toolkit**.
  - Define the async function to fetch data.
  - Accept **two parameters**:
    1. Action type.
    2. Callback function.

---


- Defining Action Types:
  - Action type format: `sliceName/reducerName`.
  - Example:
    ```javascript
    const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
        const response = await axios.get('API_URL');
        return response.data;
    });
    ```

---


- Fetching data logic:
  - Use `axios` to fetch data from the API.
  - Log the fetched response.
  - Handle `then` and `catch` methods (auto-handled in **createAsyncThunk**).

---


- **Extra Reducers**:
  - Handle `pending`, `fulfilled`, and `rejected` states.
  - Use `builder.addCase` for each state.

---


- Update state in reducers:
  - Example for `pending`:
    ```javascript
    builder.addCase(fetchProducts.pending, (state) => {
        state.loading = true;
    });
    ```

---


- **Fulfilled and Rejected Cases**:
  - Fulfilled:
    ```javascript
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
    });
    ```
  - Rejected:
    ```javascript
    builder.addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    ```

---


- Finalizing reducers and actions:
  - Export reducers and async actions:
    ```javascript
    module.exports = {
        reducer: productSlice.reducer,
        fetchProducts
    };
    ```
  - Include reducers in the store:
    ```javascript
    const store = configureStore({
        reducer: {
            products: productReducer
        }
    });
    ```

---


- **React Setup**:
  - Use **Vite** for project setup.
  - Command: `npm create vite@latest`.
  - Install dependencies:
    ```bash
    npm install @reduxjs/toolkit react-redux
    ```

---


- Define folder structure:
  - `app` for `store.js`.
  - `features` for slices (e.g., `pizzaSlice.js`, `burgerSlice.js`).
- Use ES6 imports for slices and actions.

---


- Use slices in components:
  - Import actions and dispatch them using `useDispatch`.
  - Access state using `useSelector`.

---

**Note**: Detailed logic is implemented step-by-step with full state updates. Follow the timestamps for an organized approach to implementing Redux Toolkit.


---

*Importing Pizza Order:*  
```javascript
import { pizzaOrder } from './pizza';
const visaOrder = pizzaOrder;
```
Explanation: Destructuring `pizzaOrder` for readability.

---

*Configuring the Store:*  
```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    pza: pzaReducer,
    burger: burgerReducer,
  },
});

export default store;
```
Explanation: Combined reducers `pzaReducer` and `burgerReducer` using ES6 syntax.

---

[...Additional timestamps and details with code blocks and highlights...]

---

## Setting Up Redux Developer Tools
Steps to install:  
1. Install the Chrome extension from the [Redux DevTools](https://chrome.google.com/webstore) page.  
2. Refresh your application and start debugging.

---

## Performing Asynchronous Operations
*Creating Product Slice:*  
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('/api/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
```

Explanation: Async operation using `createAsyncThunk`.

---


- Inside the `dependencies`, you can see the `axios` package is added.
- Import statement: `import axios from 'axios'`.
- Defined the `initialState`:
  - This will remain unchanged; you can copy and paste.
- Defined the `fetchProducts` function:
  - This uses `createAsyncThunk`.
  - Takes two arguments: action type and a callback function that returns a promise.
  - Inside the promise, API data fetching logic is written.
- Created `productSlice`:
  - Defined extra reducers for lifecycle methods (`pending`, `fulfilled`, `rejected`).
  - These methods are provided by `createAsyncThunk`.
  - Suggestion: Watch the related video to understand this better.

---

- Exporting the reducer and action creator:
  - `export default` the reducer from `productSlice`.
  - Alternatively, directly add `export` to the function.

---

- Updated `store.js`:
  - Included the `productReducer`.
  - Added a key-value pair (`product: productReducer`).
  - Imported the `productReducer` from the appropriate file.

---

- In `index.js`:
  - Dispatched actions and observed results in the console.
- Created `ProductView.jsx`:
  - Used `RFC` template to define a component.
  - Rendered the list of product titles.

---

- Updated `App.jsx`:
  - Rendered `ProductView` component.
  - Imported `ProductView` and commented out other views.

---

- In `ProductView.jsx`:
  - Dispatched `fetchProducts` using `useDispatch` hook.
  - Imported `useDispatch` from `react-redux`.

---

- Used `useEffect` hook:
  - Runs the side-effect code once (on mount).
  - Dispatched the `fetchProducts` action.

---


- Accessing state using `useSelector` hook:
  - Created a variable `product` to hold state.
  - Logged `state` to inspect properties.

---


- Accessed `state.product`:
  - Verified properties: `error`, `loading`, and `products`.
  - These match the keys in `store.js`.

---


- Rendered data in JSX:
  - Displayed a loading message (`Loading...`) when `loading` is true.
  - Logic: Hide the message once `loading` is false.

---


- Error handling:
  - If `product.error` is true, display the error message.

---


- Rendered product titles:
  - Accessed `product.products`.
  - Rendered titles in the UI.

---


- Redux DevTools debugging:
  - Observed states: `pending`, `fulfilled`.
  - Inspected dispatched actions.

---


- Redux Toolkit Interview Questions:
  - What is Redux Toolkit and how does it differ from Redux?
  - Why is Redux Toolkit suggested as the standard?
  - Purpose of `createSlice`, `createAsyncThunk`, and `configureStore`.
  - Handling immutability with Immer.
  - How Redux Toolkit reduces boilerplate.
  - Middleware customization.
  - Testing async actions and handling errors.
  - Common middlewares included by default.

---


- Final thoughts:
  - Practice building projects with Redux Toolkit.
  - Explore real-world applications.
  - Keep experimenting and coding.

---

## Code Snippets

```javascript
// Importing axios
import axios from 'axios';

// Initial State
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch Products
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

// Reducer setup
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
```

---