## Senior Engineers build react apps by following some best practices like:


**1. One-Way Data Flow**: Ensures a predictable and manageable data flow, making the application easier to debug.
**2. Component-Based Architecture**: Promotes the development of reusable and modular components, enhancing flexibility and maintainability.
**3. Separation of Concerns:** Divides code into distinct layers (data, presentation, container), ensuring that each piece of logic resides in its appropriate place, thereby simplifying the codebase and making it more maintainable.
**4. Code Reuse:** Encourages the creation of reusable components and the extraction of common functionality into utilities, reducing duplication and improving efficiency.
**5. Scalable Folder Structure:** Organizes files and components into a clear structure, facilitating easier navigation and management of the codebase.
**6. Utilities:** Maintains constants and internationalization strings in separate files, enhancing maintainability and scalability.
**7. Performance Optimization Tools and Techniques:** Utilizes server-side rendering, code splitting, memoization, and performance profiling to enhance app performance and user experience.
**8. Automated Testing:** Ensures application reliability and performance through testing frameworks like Jest.
**9. State Management with Redux:** Manages application state in a predictable manner, especially beneficial for large-scale applications.
**10. Navigation with React Router:** Enables dynamic routing, allowing for a seamless user experience as they navigate through the application.






















------

## **In Detail:**

<ins><strong>One way data flow:</strong></ins> Data in React flows uni-directionally from parent to child components.

- This structure leads to predictable data flow, making your code easier to manage and debug.

```js
const ParentComponent = () => {
  const data = "State data from parent component";
  return (
    <>
      <ChildComponent data={data} />
    </>
  );
};

const ChildComponent = ({ data }) => {
  return <>{data}</>;
};
```

---

<ins><strong>Component based architecture:</strong></ins> By structuring applications into self-contained, reusable components, each designed to do a specific task, <ins>senior engineers maintain a flexible codebase.</ins>

Ex:

```js
// A simple reusable Button Component

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

---

<ins><strong>Separation of concerns:</strong></ins> Code is divided into distinct layers, each dealing with its specific responsibility.

- Separation can be across **data layer** (handling data fetching and manipulation)
- Separation can be across **presentational layer** (handling UI rendering)
  -Separation can be across **container layer** (managing the interaction between both of the above)

This leads to maintainable codebase as every piece of logic is only found where it's required.

---

<ins><strong>Code reuse:</strong></ins> Reducing duplication and improving the overall efficiency of your codebase is possible through code reuse.

- This includes creating reusable components and extracting common functionality into utility functions or libraries.

---

<ins><strong>Scalable Folder structure:</strong></ins> Senior engineers prefer organizing related components into separate directories and adopting a naming convention that simplifies finding specific files or components.

<ins>Here is an example of typical folder structure:</ins>

<!-- <img src=""> -->

```js
src/
|--components/
|  |--Button/
|  |  |--index.jsx
|  |--Form/
|  |  |--index.jsx
|--containers/
|  |--HomePage/
|  |  |--index.jsx
|--pages/
|  |--Login/
|  |  |--index.jsx
|--App.js
|--index.js

```

---

<ins><strong>Utilites:</strong></ins>

Senior engineers also maintain application constants and internationalization strings in separate files like constants.js and i18n.js for enhancing maintainability and scalability.

```js
//constants.js
export const API_KEY = "your_api_key";
export const API_URL = "https://api.example.com";
```

```js
//i18n.js
export const STRINGS = {
  en: {
    welcome: "Welcome",
  },
  es: {
    welcome: "Bienvenidos",
  },
};
```

---

<ins><strong>Performance Optimization Tools and Techniques:</strong></ins>

Senior engineers use specific tools and techniques to enhance the performance and scalability of their React apps

<strong>Server Side Rendering(SSR)</strong>: This technique <ins>improves the app's initial load time by pre-rendering the initial HTML on the server.</ins>

```js
// pages/index.js in a Next.js project
function HomePage({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default HomePage;
```

---

<ins><strong>Code Splitting:</strong></ins>

- It is the feature to split the code into smaller bundles (chunks) which can then be loaded on demand or in parallel.
- It can be used to achieve smaller bundles and control resource load prioritization. If it is used correctly it can reduce loading time.

Webpack provides three general approaches to perform code splitting:

- <ins>Entry Points</ins>: Manually split the code using entry configuration
- <ins>Prevent duplication</ins>: Use the SplitChunksPlugin to split chunks
- <ins>Dynamic import</ins>:Split code via inline import()

<ins>Additional resources to read:</ins> https://betterprogramming.pub/dynamic-import-code-splitting-lazy-loading-and-error-boundaries-fff57e63f6c4

```js
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

return (
  <>
    <Suspense fallback={<div>Loading....</div>}>
      <OtherComponent />
    </Suspense>
  </>
);
```

---

<ins><strong>Memoization:</strong></ins>

- This technique is used to <strong>cache the results of expensive computations and reusing them when the same input is provided again, <ins>preventing unnecessary re-renders or updates.</ins></strong>

- The useMemo and React.memo hooks are commonly used for this in React.

```js
import React, { useMemo } from "react";

const ExpensiveFunction = ({ list }) => {
  const sortedList = useMemo(() => {
    list.sort();
  }, [list]);
};
```

---

<ins><strong>Performance Profiling:</strong></ins>

Performance profiling tools like React Profiler can help identify performance bottlenecks in the app.

```js
import React, { Profiler } from "react";

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  console.log(id, phase, actualDuration, commitTime);
}

<Profiler id="my-component" onRender={onRenderCallback}>
  <MyComponent {...props} />
</Profiler>;
```

---

<ins><strong>Automated Testing:</strong></ins>:

It ensures that React app performs as expected. Jest is a popular tool for testing in React.

```js
import { screen, render } from "@testing-library/react";

test("renders learn react link", () => {
  render(<App />);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

---

<ins><strong>Redux for state management:</strong></ins>

- Often used in larger applications for managing state.
- It ensures predictable state updates by enforcing that they <ins>occur in a strict one-way flow.</ins>
- It also allows for a single store that all components can access, which makes managing large states easier.

```js
import { createStore } from "redux";

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
```

---

<ins><strong>React Router for Navigation:</strong></ins>

- often used for navigation in React apps.
- Allows components to be rendered at different routes, giving users the perception of navigating through different pages of the application.

```js
import { Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/about"> About</Link>
            </li> <li>
              <Link to="/users"> Users</Link>
            </li>
          </ul>
        </nav>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/users" component={UsersPage} />
      </div>
    </Router>
  );
};

export default App;
```
