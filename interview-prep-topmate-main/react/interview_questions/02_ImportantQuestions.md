1. What does this script do ?
```js
lint-staged":{
"./src/**/*.{js,ts,tsx}": "eslint --fix” }
```

- defines a configuration entry for lint-staged, 
- which is a tool that runs linters or other code-quality tools only on files that are staged (modified and added to Git's index). 
- This approach makes it more efficient because only files that are being committed are checked.

### Breakdown of the Code
#### 1. Key "lint-staged":
- This is a configuration entry specifically for the lint-staged tool. 
- You typically include this configuration inside your project's **`package.json`**.

#### 2. Pattern "./src/**/*.{js,ts,tsx}":
- This pattern means that any .js, .ts, or .tsx files inside the src directory and all its subdirectories **will be checked**.
- The glob pattern **/* ensures that all subdirectories are searched recursively.

#### 3. Command "eslint --fix":
- This command uses **`eslint`** to lint the files, 
- and --fix automatically fixes problems that can be fixed (e.g., formatting errors) without manual intervention.
- The eslint --fix command will be run on each staged file that matches the pattern.

### Putting It All Together
- This configuration will automatically lint only the staged files (with extensions .js, .ts, and .tsx in the src folder) whenever you attempt to commit changes. 
- Any fixable errors will be fixed automatically, and if there are any remaining errors, they will be displayed to you.


### Example Usage with husky
You typically use lint-staged with a pre-commit hook manager like husky. For example, a common setup in package.json:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "./src/**/*.{js,ts,tsx}": "eslint --fix"
  }
}
```
#### With this configuration:

- husky will **trigger the lint-staged** command before each commit.
- lint-staged **will run eslint --fix** only on the files staged for the commit.

----

### 2. Redux Saga takeEvery vs takeLatest

#### 1. takeEvery

- used to **handle every action of a specific type dispatched to the store**.
- It's non-blocking and **allows multiple instances of the same saga** to run concurrently. 
- This means that if the action is dispatched multiple times before the first saga completes, takeEvery will still trigger the saga for each action.

```js
function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload);
    yield put({type: "FETCH_SUCCEEDED", data});
  } catch (error) {
    yield put({type: "FETCH_FAILED", error});
  }
}

function* watchFetchData() {
  yield takeEvery("FETCH_REQUESTED", fetchData);
}
```


#### 2. takeLatest

- only **allows one instance of the saga** to run at a time. 
- It automatically **cancels** any previously started saga task if a new action is dispatched. 
- This is useful when you only care about the response of the latest request.


```js
function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload);
    yield put({type: "FETCH_SUCCEEDED", data});
  } catch (error) {
    yield put({type: "FETCH_FAILED", error});
  }
}

function* watchFetchData() {
  yield takeLatest("FETCH_REQUESTED", fetchData);
}
```

### Choosing the Right Effect
- **`takeEvery`**: Use when every dispatched action needs to be handled independently.
- **`takeLatest`**: Use when only the result of the latest dispatched action matters.

-----

### 3. Write an axios intercept for a request to check if the Authorization header is present or else add the headers and send it with the request

#### 1. Create an Axios Instance

```js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 10000, // Adjust the timeout as per your requirements
});
```

#### 2. Add a Request Interceptor

- modify the headers before the request is sent. 
- In this case, we'll check if the Authorization header is present. If it's not, we'll add it.

```js
// Add a request interceptor to the Axios instance
apiClient.interceptors.request.use(
  (config) => {
    // Check if the Authorization header is already set
    if (!config.headers['Authorization']) {
      // Retrieve the token from localStorage (or another secure location)
      const token = localStorage.getItem('token');

      // Add the Authorization header if the token exists
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Return the modified configuration
    return config;
  },
  (error) => {
    // Handle the error before it is passed to the request
    return Promise.reject(error);
  }
);
```

----

### 4. Can we use an axios interceptor for response and what is the usage for intercepting the response

- Response interceptors are powerful because they **enable you to centralize error handling** 
- and implement other response processing logic **globally**. 

```js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000, // Adjust timeout as required
});

// Add a response interceptor
apiClient.interceptors.response.use(
  // Handle the successful response
  (response) => {
    // You can modify the response or process it here if needed
    // For instance, unwrap data if the API response always has the same structure
    return response.data; // Modify as necessary based on API response structure
  },
  // Handle the error response
  (error) => {
    // If the error response status is 401 (Unauthorized), we might need to refresh the token or log the user out
    if (error.response && error.response.status === 401) {
      // Handle token expiration or authentication failure here
      // E.g., redirect to the login page or refresh token
      console.warn("Unauthorized access - redirecting to login.");
    }

    // Optionally handle other HTTP status codes here
    if (error.response && error.response.status === 500) {
      console.error("Server error encountered. Please try again later.");
    }

    // Reject the promise so the error can be handled where the request is made
    return Promise.reject(error);
  }
);
```

### 5. how to handle an error for a functional component.to be specific answered inside the api call and also about the ErrorBoundary


```js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught in Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

```js
// Usage
import React from 'react';
import ErrorBoundary from './ErrorBoundary'; // Assume this is the ErrorBoundary class from above

const SomeComponent = () => {
  return (
    <ErrorBoundary>
      <ComponentThatMightThrow />
    </ErrorBoundary>
  );
}

export default SomeComponent;
```

### 6. 