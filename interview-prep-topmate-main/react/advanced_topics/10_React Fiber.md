### React Fiber:

- A fiber **_is a Javascript Object_**, a unit of work.
- It **_<u>represents a node of the DOM tree</u>_**, <u>or a React element</u>, and <u>_contains data about a component, its I/P and O/P_</u>.
- A fiber is **_<u>both an instance of a component as well as frame in the call stack_**</u>.
- Fibers <u>_have both types and keys_</u> just like React Elements.
- When a fiber is created from an element, these two fields are copied over directly.
- React uses internal objects called fibers, **_<u>to hold additional information about the component tree_**</u>.
- The type of a fiber describes the component that it corresponds to.
- For **composite components** the **_<u>type is the function or class component</u>_** itself.
- For **host components (div, span etc)** the **_<u>type is a string_**</u>.
- A fiber created from a React element inherits that element's type and key.
- The **main use for types and keys in a fiber** **_<u>is for reconciliation to determine whether or not it's possible for the fiber to be reused</u>_**.

#### Key benefits and features of React Fiber:

#### 1. Incremental Rendering:

- Old Behavior: Prior to Fiber, React’s reconciliation process **could be blocking**, meaning **_<u>it would recursively process components and changes all at once</u>_**, potentially leading to performance issues for large updates.
  <br/>
- **<u>With Fiber</u>**: React **_can now split the work into smaller chunks_** and _<u>spread it out over multiple frames</u>_, allowing for smoother animations and interactions.

#### 2. Concurrency:

- Fiber **allows React to perform multiple tasks at the same time** (concurrent mode), **_<u>such as rendering multiple component trees independently</u>_**.

#### 3. Task Prioritization:

- With Fiber, **React can prioritize certain updates over others**.
- For example, **_<u>user interactions_** (like clicks or key presses) **_are given higher priority than less critical updates</u>_** which leads to a more responsive user interface, as high-priority updates can interrupt and preempt low-priority ones.

#### 4. Time Slicing:

- Time slicing is a technique where **_<u>React, with the help of Fiber, can break down work into small time slices</u>_** and <u>yield control back to the browser event loop intermittently</u> which ensures that the UI remains responsive even while heavy computations are being done in the background.

#### 5. Error Boundaries:

- Fiber **_introduced a more robust mechanism for handling errors_** in the application.
- Error boundaries are components that can catch javascript errors anywhere in a component tree and log those errors, display a fallback UI or take other actions
- Prior to Fiber, <u>_unhandled errors could corrupt the internal state of React_</u> and cause the entire application to crash.

-----

- Implementing React Fiber in a project doesn't require any explicit actions from developers to take advantage of its benefits **because Fiber is an internal re-architecture of React's reconciliation algorithm**. 
- It's <ins>***part of React's core, starting from version 16 onwards</ins>***. This means if you're using React version 16 or higher, you're already using Fiber under the hood. However, to effectively leverage the benefits and features that Fiber provides, such as incremental rendering, concurrency, task prioritization, time slicing, and error boundaries, you can follow these guidelines: