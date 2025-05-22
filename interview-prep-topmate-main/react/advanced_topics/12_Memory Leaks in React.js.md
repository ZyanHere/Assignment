- A memory leak is an **unintentional form of memory consumption** whereby the <ins>***developer fails to free an allocated block of memory when no longer required***</ins>. 
<br/>
- <ins>Overtime, this can lead to increased memory usage and degraded performance.</ins>
<br/>

- A memory leak can usually occur <ins><strong>when we have objects or data that is no longer required but which are still being referenced by the application</strong></ins>, preventing them from garbage collected.
<br/>

- In React you will see the error in the console when there is a memory leak in your project

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*oJ7DWMN_L6MHbjiNu2VLuw.png">

<strong> Below are the few common causes of memory leaks in React.js:</strong>


##### 1. Event listeners:

- If you attach event listeners to elements within your React components, <ins>*but fail to remove them when the component unmounts, it can lead to memory leaks*.</ins>
<br/>

- **Make sure to write the cleanup functions such as in the useEffect hook** or in class componentWillUnmount lifecycle method.

```js
// cleanup Function
useEffect(() => {
  document.addEventListener("click", handleClick);
  return () => {
    document.removeEventListener("click", handleClick);
  };
}, []);
```
<br/>

##### 2. Subscription based API's:

- Example such as Websocket connections
- <ins>It is crucial to unsubscribe or close these subscriptions when they're no longer needed.</ins>
- Failing to unsubscribe can keep references active and cause memory leaks

```js
useEffect(() => {
  const subscription = new Subscription();
  subscription.subscribe((data) => {
    console.log("Received data", data);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
```
<br/>

##### 3. Improper closure usage:

- If unintentionally retain references to objects which should be garbage collected could lead to Memory Leaks.
<br/>

- Example, **if you use closure inside event handlers and capture variables from the component's scope**, <ins>those captured variables can keep the entire component and its associated objects in memory</ins>.
<br/>

- Make sure to have a look at the variables that are captured in closures and consider using the <strong>useCallback</strong> hook to memoize function properly.

<br/>

##### 4. Large data sets or Large state:

- If data is not cleaned up properly then <ins>it is not a good idea to store unnecessary large data</ins>

```js
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(URL);
    setData(response); //useState hook
  };
  fetchData();

  return () => {
    setData([]); //setting the empty res
  };
}, []);
```

##### 5. Third-party libraries:

- Ensure to follow the proper documentation and best practises to prevent memory leaks especially when it comes to cleanup and resource disposal.

---

#### Realtime coding scenario examples:

##### Scenario 1: Issue with the async api call

- What if the user has slow internet or if user want to leave the current page and decides to go to the new page before the data is rendered on the screen.

- As in this case, the request for API would have already been made <ins>as on page mount the useEffect runs the code and the browser expecting the response which when received would lead us to call setState on a component that's no longer mounted</ins>

- If this process is repeated several times can lead to serious issues as useless data is preserved in our memory.

<strong><ins>Solution</ins></strong>: Boolean Flag approach

```js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let isMounted = true;
    const URL = "https://google.com";
    const response = await axios.get(URL);
    if (isMounted) {
      setData(response); // setting the api response
    }
  };

  useEffect(() => {
    fetchData();

    //cleanup
    return () => {
      isMounted = false;
      setData([]);
    };
  }, []);
  return (
    <>
      <pre>{data}</pre>
      <Link to="/page">Go to New Page</Link>
    </>
  );
};
```

###### In the above code, when isMounted is true the state is updated and the function is returned. Else if the action is unmounted before completion, then the cleanup function will be returned. <ins>This ensures that when a new effect is to be executed the previous effect will be first taken care of </ins>

---

##### Scenario 2: Using abort controller

- We have to cancel the api request the moment our component unmounts, ensuring we don't get any data from the API.

<ins>AbortController represents a controller object <strong>that allows you to abort one or more Web requests as and when desired</strong></ins>

```js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Example = function() {
  let abortController = newAbortController()
  const [ data, setData ] = useState(null);

  useEffect(() => {
    (async () {
      const { response } = await  axios.get(https://… );
      setData(data);
    })();
    return () => abortController.cancel()
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
      <Link to = '/page'>Go To New Page</Link>
    </>
  )
 }

```

##### Now when our user navigates to a new page, our AbortController cancels the request and we don't have to worry about having data leaks.

---

##### Scenario 3: Too many re-renders error:

- This happens after you have reached an infinite render loop, <ins>typically caused by the code that in a useEffect hook unconditionally calls state setters</ins>.

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*QBRmcIJXO_JF9-O5-BUnlg.png">

#### Some of the causes of this problem are listed below:

##### 1. Wrong way of a function call on onClick events:

```js
import React, { useState } from "react";

const Example = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <button onClick={setCounter(counter + 1)}>Increment</button>
      <h1>Counter: {counter}</h1>
    </>
  );
};
```

##### Issue is immediately calling the setCounter function in the onClick event handler. <ins>The function is invoked immediately on page load and not when the event is triggered</ins>

```js
// Solution to above problem

import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <h1>Count: {counter}</h1>
    </div>
  );
}
```

---

##### Scenario 4: Setting the component state without any event handler:

```js
// here setCounter gets invoked when the component render
// updates the state which causes a re-render and does that infinitely

import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  setCounter(counter + 1); // never write like this

  return (
    <div>
      <h1>Count: {counter}</h1>
    </div>
  );
}
```

---

##### Scenario 5: Wrong use of useEffect by not passing the dependency array:

```js
useEffect(() => {
  setCounter(counter + 1);
}); //   forgot to pass dependency array
```

---

##### Scenario 6: Putting changeable value as a dependency

- Make sure the dependency value should not be the state that we change inside useEffect

```js
import { useEffect, useMemo, useState } from "react";

export default function App() {
  const [nums, setNums] = useState(1);

  useEffect(() => {
    setNums(2);
    console.log("useEffect called");
  }, [nums]);

  return <div>{nums[0]}</div>;
}
```
