## Fetch Data in React with Performance:

If you have a case saying like <strong>fetch once and forget</strong> then use `fetch` instead of external libraries like `axios` to call the api.

But it leads to lot of different questions like

      1. What about error handling ?
      2. What if multiple components want to fetch data from this exact endpoint ?
      3. Do I need to cache the data ? If yes, for how long?
      4. What about race conditions?
      5. What if I want to remove the component from the screen ? Should I cancel the request?
      6. What about memory leaks?

- Not even a single question is related to React but it's a general problem of fetching the data over the network.

- Libraries like `axios` will abstract some concerns like ***cancelling requests***.


#### 1. Error Handling

- Can be done using `.catch()` for promise-based approaches or `try/catch` in `async/await` syntax.

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
}
```

#### 2. Multiple Components Fetching Data
- For multiple components fetching data from the same endpoint, ***consider using a state management library like Redux or the Context API to store the fetched data***. This way, the data is fetched once and then accessed by multiple components.


```js
// Using Context API to share fetched data across components
const DataContext = React.createContext();

function DataProvider({ children }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

```


#### 3. Caching Data

```js
const cache = {};

async function fetchData() {
  const url = 'https://api.example.com/data';

  // Check if data is in cache
  if (cache[url]) {
    return cache[url]; // Return cached data
  }

  const response = await fetch(url);
  const data = await response.json();
  cache[url] = data;

  // Invalidate cache after a certain time, e.g., 5 minutes
  setTimeout(() => delete cache[url], 5 * 60 * 1000);

  return data;
}
```

#### 4. Race Conditions

- can be avoided by ensuring that only the latest request is considered.

```js
let latestToken = 0;

async function fetchData() {
  const currentToken = ++latestToken;
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  if (currentToken === latestToken) {
    console.log(data); // Handle the data
  }
}
```
#### 5. Canceling Requests
- If you're using `fetch`, it **does not** natively support request cancellation. 
- However, you can **use the AbortController** to ***cancel*** requests.

```js
const controller = new AbortController();
const signal = controller.signal;

async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data', { signal });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  }
}

// To cancel the fetch
controller.abort();
```
#### 6. Avoiding Memory Leaks
- Memory leaks can occur ***if components are unmounted before async operations complete***. 
- Using `AbortController` with ***useEffect cleanup*** can help avoid this.

```js
function MyComponent() {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => controller.abort();
  }, []);

  return <div>...</div>;
}
```

--------------

###  EVERYTHING AT ONE PLACE

```js
// EVERYTHING AT ONE PLACE
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for data sharing
const DataContext = createContext();

// Global cache object
const cache = {};
let latestToken = 0; // For handling race conditions

// DataProvider component that fetches data and provides it to the children components
export function DataProvider({ children }) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const currentToken = ++latestToken;
    const url = 'https://api.example.com/data';

    async function fetchData() {
      try {
        // Check cache first
        if (cache[url]) {
          setData(cache[url]);
          return;
        }

        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error('Network response was not ok');

        const newData = await response.json();

        // Check for race conditions
        if (currentToken === latestToken) {
          setData(newData);
          cache[url] = newData; // Update cache

          // Invalidate cache after a certain time, e.g., 5 minutes
          setTimeout(() => delete cache[url], 5 * 60 * 1000);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err.message);
          console.error('Fetch error:', err);
        }
      }
    }

    fetchData();

    // Cleanup function to avoid memory leaks and cancel fetch
    return () => controller.abort();
  }, []);

  return (
    <DataContext.Provider value={{ data, error }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use data context
export function useData() {
  return useContext(DataContext);
}

// Example usage within a component
function MyComponent() {
  const { data, error } = useData();

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {/* Render your data as needed */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

- The `<pre>` element in HTML is **used to display preformatted text**. 
- Text within a `<pre>` element is **displayed in a fixed-width font** (usually Courier), and it **preserves both spaces and line breaks**. 
- The use of `<pre>` is particularly **useful when you want to display code or formatted data** in a way that is easy for the user to read.

-----

##### Let's take a real world example

If a app is implemented in three different ways

1. **Shows a loading state until all the data is loaded** and then renders everything at a go. Assuming it takes ~3 seconds

2. **Shows a loading state until sidebar data is loaded first, renders sidebar and keeps the loading state until the data is finished** in the main part. (sidebar takes ~1 second, main part takes ~3 seconds). Total is 4 seconds

3. **Shows a loading state until main data is loaded**, renders it, keeps loading state for sidebar and comments. When sidebar loaded, renders it, whereas comments are still in loading state. 
   - Main part takes ~2 seconds, sidebar ~1 second and after that, takes another ~2 seconds for comments. Overall ~5 seconds to appear.

**We cannot conclude which is the best performant app** due to various scenarios. It always depends on the message you're trying to convey to the users.

---------------

#### When it is okay to start fetching data ?
1. <ins>**Immediately upon component mounting**</ins>: 
   - Ideal for <ins>critical data needed for the initial render</ins>

2. <ins>**On user interaction**</ins>: 
   - For <ins>data that is not critical for the initial load</ins> but is required after user action, like a button click.
3. <ins>**Lazy loading**</ins>: 
   - <ins>Fetching data</ins> for components <ins>as they become visible</ins> or are about to be visible on the screen.

----

#### What can we do while the data fetching is in the progress (Activities During Data Fetching)?

1. **Render the fetched data**: 
   - <ins>***Update the component state with the fetched data, triggering a re-render to display the data***</ins>.
2. **Handle errors**: 
   - Implement error handling to catch and display messages or fallback content if the data fetching fails.
3. **Optimize for subsequent visits**: 
   - ***Consider caching data*** either in the state, context, or using browser storage to improve performance on subsequent visits.




----

#### React Lifecycle and data fetching

The React lifecycle is crucial for understanding when to fetch data. 

- The useEffect hook is commonly used for fetching data in functional components, allowing you to perform side effects in your components.

- <ins>**Fetching on component mount**</ins> : Use the useEffect hook with an **empty dependency array** ([]) to fetch data when the component mounts. This is a common pattern for loading the initial data required by the component.
- <ins>**Fetching on dependency change**</ins>: If the data fetching depends on certain state or props, you can include these dependencies in the useEffect dependency array. React will re-run the effect when any dependency changes.