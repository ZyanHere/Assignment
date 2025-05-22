1) Can you tell me about some of the past projects you've worked on and the key areas you focused on in those projects?
2) How do you typically implement pagination in ReactJS applications?
3) What are some common techniques or best practices you've used for optimizing ReactJS applications?
4) When implementing pagination in ReactJS, what types of API data sources have you worked with to fetch paginated data?
5) Can you share your experience with creating charts in ReactJS? Which libraries have you worked with for charting?
6) How have you implemented filtering functionality along with pagination in ReactJS applications?
### 7) Could you explain how you typically handle login functionality in ReactJS applications?

### 1. Login Form UI:
- Create a login form component with input fields for the username/email and password.
- Add form validation to verify that both fields are not empty and that the data is in the expected format.

### 2. State Management:
- Use the local component state (via useState) or a global state manager like Redux to store form data.
- Optionally, use another state variable to store error messages or status updates.

### 3. Authentication Logic:
- On form submission, send an HTTP request to the authentication endpoint of the backend API.
- This typically involves using fetch or a library like Axios to handle the request.
- Send the credentials securely using HTTPS.
- If the credentials are valid, expect a response containing user data and a token for subsequent authenticated requests.

### 4. Storing Authentication Data:
- Store the returned token in localStorage or sessionStorage for persistent or session-based storage, respectively.
- Alternatively, use cookies with the HttpOnly and Secure flags enabled.


### 5. Global Auth State:
- Update the global authentication state (Redux or Context API) to reflect that the user is authenticated.
- Store user-specific information such as role or preferences in the global state as well.


### 6. Route Protection:
- Create a Higher-Order Component (HOC) or wrapper component to handle protected routes.
- Check if the user is authenticated (based on the global state or token presence) and, if not, redirect them to the login page.
- For logged-in users, redirect them away from the login page.

### 7. Error Handling:
- Provide appropriate error messages to users if login fails (e.g., invalid credentials or server errors).
- Consider implementing rate limiting or CAPTCHA for repeated failed attempts.


### 8. Logout Functionality:
- Create a logout function that clears the authentication data (token or cookies) and updates the global auth state.


### 9. Refreshing Tokens:
- If the server provides a refresh token, store and use it to obtain a new access token when the old one expires.
Automate this process with interceptors or hooks to ensure seamless user experience

```js
// LoginForm.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from './authSlice'; // Redux action to set authentication
import './LoginForm.scss'; // Styles specific to the login form

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle form submission and authentication
    const handleLogin = async () => {
        setError(''); // Reset error state before new login attempt

        if (!username || !password) {
            setError('Username and Password cannot be empty.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Save the JWT token in localStorage or cookies
                localStorage.setItem('token', data.token);

                // Update global authentication state via Redux
                dispatch(setAuth({ username, isAuthenticated: true }));

                // Redirect the user to the dashboard or intended page
                navigate('/dashboard');
            } else {
                setError(data.message || 'Invalid login credentials.');
            }
        } catch (err) {
            setError('A network error occurred. Please try again.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default LoginForm;
```

```js
//authSlice.ts (Redux file)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    username: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    username: null,
    isAuthenticated: false,
};

// Slice containing authentication state and reducers
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ username: string; isAuthenticated: boolean }>) {
            state.username = action.payload.username;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        clearAuth(state) {
            state.username = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
```

```js
//AuthRoute.tsx (Protected Route)
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store'; // Root state of your Redux store

interface Props {
    children: ReactElement;
}

// Route guard component to protect authenticated routes
function AuthRoute({ children }: Props) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AuthRoute;
```

```js
// Logout.tsx
import { useDispatch } from 'react-redux';
import { clearAuth } from './authSlice'; // Redux action to clear authentication
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');

        // Update global auth state via Redux
        dispatch(clearAuth());

        // Redirect to the login page
        navigate('/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
```

```js
// Token Refreshing

import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/json' },
});

// Axios interceptor to handle expired tokens
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh the token
            const response = await axios.post('/api/auth/refresh', {
                token: localStorage.getItem('refreshToken'),
            });

            if (response.status === 200) {
                // Update tokens in storage
                localStorage.setItem('token', response.data.token);

                // Set the new token in the original request
                originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;

                // Retry the original request
                return axios(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
```

-----




### 8) What methods or approaches have you used for token validation in ReactJS applications, especially in the context of user authentication?

### 1. Token Expiry Check:

- We'll use the jwt-decode library to decode JWTs and check their expiration.

```js
// tokenUtils.ts
import jwtDecode from 'jwt-decode';

interface DecodedToken {
    exp: number;
    roles?: string[];
}

export function isTokenExpired(token: string): boolean {
    try {
        const { exp } = jwtDecode<DecodedToken>(token);
        return Date.now() >= exp * 1000;
    } catch (e) {
        return true; // Treat tokens that cannot be decoded as expired
    }
}

export function hasRequiredRole(token: string, requiredRoles: string[]): boolean {
    try {
        const { roles } = jwtDecode<DecodedToken>(token);
        return roles ? requiredRoles.every((role) => roles.includes(role)) : false;
    } catch (e) {
        return false;
    }
}
```

### 2. Server-Side Validation:

```js
// example of Express middleware for a Node.js backend:
// authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
}

module.exports = verifyToken;
```

### 3. Refresh Tokens

```js
// refreshTokenUtils.ts

import axios from 'axios';

export async function refreshAccessToken() {
    try {
        const response = await axios.post('/api/auth/refresh', {
            token: localStorage.getItem('refreshToken'),
        });

        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            return token;
        }
    } catch (err) {
        console.error('Unable to refresh access token:', err);
    }
    return null;
}
```

### 4. Token Storage:

```js
export function storeToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}
```

### 5. Axios Interceptors
- Use Axios interceptors **to inject tokens into every request** and handle refresh automatically

```js
//apiClient.ts
import axios from 'axios';
import { isTokenExpired } from './tokenUtils';
import { refreshAccessToken } from './refreshTokenUtils';

const apiClient = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');

        // If the token is expired, try refreshing it
        if (token && isTokenExpired(token)) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Redirect to login or show a message if unauthorized
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
```




----



### 1)  Can you provide an example of how navigation is implemented in ReactJS, and the libraries or components you typically use?

```js
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

```js
// Home.js
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}

export default Home;
```

```js
// About.js
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default About;
```

```js
// NotFound.js
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

export default NotFound;
```

```js
// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

```js
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function App() {
  const isAuthenticated = useSelector("stateKey")

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
```


---

2)  What types of interactive functionality have you worked on with ReactJS?

----

### 3)  How do you determine breakpoints for CSS responsiveness in ReactJS applications, and what best practices do you follow?

- ### Need to research

----

4)  Have you worked with Adobe Experience Manager (AEM) in any of your projects? If so, can you share your experience with it?
5)  What branching strategies or version control workflows have you followed in ReactJS projects?


### 6)  Could you explain your approach to automated testing and its integration into CI/CD pipelines in software development projects?

### Automated Testing
#### 1. Test Types and Strategy:

- **Unit Testing**: 
  - Focus on testing individual components or functions in isolation. 
  - Ideal for business logic, utility functions, and atomic components.
<br/>

- **Integration Testing**: 
  - Ensure that different parts or components interact as expected. 
  - Test API endpoints, middleware, database interactions, and component compositions.
<br/>

- **End-to-End (E2E) Testing**: 
  - Simulate user behavior and workflows from start to finish. 
  - Ideal for validating overall functionality.

#### A combination of these tests provides a comprehensive safety net.

#### 2. Test Frameworks and Libraries:

- **Unit Testing**: Jest, Mocha, or Jasmine.
- **Integration Testing**: Testing Library (React Testing Library for React), Mocha + Chai.
- **E2E Testing**: Cypress, Playwright, or Selenium.

#### Best Practices:
- Maintain a good test coverage percentage but focus more on meaningful tests.
- Organize tests by functionality and ensure each test is clear and self-explanatory.
- Mock external services during testing to isolate the core functionality.

### CI/CD Integration
#### 1. Setup CI/CD Tools:
- CI Servers: Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI, or Bitbucket Pipelines.
- CD Tools: Docker (containerization), Kubernetes (deployment orchestration), AWS CodeDeploy, or Argo CD.

#### 2. Pipeline Stages:
- **Pre-commit Hooks**: 
  - Tools like **`Husky`** can enforce running **linters** and **unit tests** before committing changes.
<br/>

- **CI Pipeline**:
    - Build Stage: 
      - Check out the code, **install `dependencies`**, **compile `assets`**, and build the project.
    - Test Stage: 
      - Run **`unit`** and **`integration`** tests, calculate coverage, and publish results.
    - Static Analysis: 
      - Run **`linters`**, code style checks, and static security analysis.
<br/>

- **CD Pipeline**:
  - Staging Environment: 
    - Deploy to a staging environment and run E2E tests.
  - Approval and Promotion: 
    - Add an approval step or automated criteria for production deployment.
  - Production Deployment: 
    - Deploy to production using zero-downtime strategies like blue-green or canary releases.

#### Github Actions (CI pipeline example) - yaml file

```yaml
name: Node.js CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Dependencies
        run: npm install

      - name: Run Unit and Integration Tests
        run: npm test -- --coverage

      - name: Upload Coverage Report
        uses: actions/upload-artifact@v2
        with:
          name: coverage-report
          path: coverage

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          echo "Deploying to staging environment..."
          # Add your deployment scripts here

```

### 10. API call

- Add a text field, 
- as soon as you type some text make a Rest API(Post call) 
- and pass current text and current time as json {"text":"enteredText","currentDate": currentTime} as payload, 
- and write logic to handle errors 
- and assume you will get response as list of strings 
- write logic to process

```js
// ImmediatePost.js
import React, { useState, useCallback } from 'react';
import axios from 'axios';

const ImmediatePost = () => {
  const [inputText, setInputText] = useState('');
  const [responseList, setResponseList] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = useCallback(async (event) => {
    const enteredText = event.target.value;
    setInputText(enteredText);

    // Prepare the payload
    const payload = {
      text: enteredText,
      currentDate: new Date().toISOString(),
    };

    try {
      // Send the POST request
      const response = await axios.post('/api/your-endpoint', payload);

      // Assume response contains a list of strings
      if (response.status === 200 && Array.isArray(response.data)) {
        setResponseList(response.data);
        setError('');
      } else {
        setError('Unexpected response format or status');
      }
    } catch (err) {
      // Error handling
      setError('An error occurred while sending the request');
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h2>Immediate Text API Call</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={inputText}
        onChange={handleInputChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {responseList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImmediatePost;
```


----

### 11. how do you configure different Url for production, testing and development

### 1. Environment Variables

```js
// .env.development
REACT_APP_API_URL=http://localhost:5000/api
```

```js
// .env.test
REACT_APP_API_URL=https://test.example.com/api
```

```js
// .env.production
REACT_APP_API_URL=https://example.com/api
```

### 2. Build-Time Configuration:

```js
npm install --save-dev webpack webpack-cli cross-env
```

#### Simple Example
```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // Other webpack config...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.REACT_APP_API_URL)
    })
  ]
};
```

#### Complex Example
- maintain all the .env files for all the required environments

```js
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
  // Load environment variables from .env files based on the build env
  // You can pass the environment variable using `--env environment=production` etc.
  const fileEnv = dotenv.config({ path: `.env.${env.environment}` }).parsed;
  
  // Reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    // Other webpack configurations
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
```

### npm scripts
- To easily manage building for different environments, 
- adjust your package.json scripts by adding cross-env to set the NODE_ENV and pass the custom environment variable:

```js
"scripts": {
  "build:dev": "cross-env NODE_ENV=development webpack --env environment=development",
  "build:test": "cross-env NODE_ENV=test webpack --env environment=test",
  "build:stage": "cross-env NODE_ENV=stage webpack --env environment=stage",
  "build:prod": "cross-env NODE_ENV=production webpack --env environment=production"
}
```
----

### 12. Why do we need additional configuration for babel, babelrc file

- A **.`babelrc`** (or any Babel configuration file) is needed because 
- it allows you to **`customize`** and **`control`** how Babel transpiles your JavaScript code. 
- Babel is a popular JavaScript compiler that converts modern JavaScript code into a backward-compatible version that can run in older environments. 

### 1. Specify Presets
- **`Presets`** are Babel plugins grouped together to provide pre-configured transformations. 

#### For instance:

- **`@babel/preset-env`**: Transpiles modern JavaScript based on the target environment. You can specify browser versions or Node.js versions.
- **`@babel/preset-react`**: Enables JSX and other React-specific transformations.
- **`@babel/preset-typescript`**: Allows Babel to handle TypeScript files.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### 2. Add Plugins
- Plugins in Babel **`enable`** specific transformations. 
- They can handle new language features or custom transformations. Examples include:

- **`@babel/plugin-transform-runtime`**: Reduces code duplication from helper functions.
- **`@babel/plugin-proposal-class-properties`**: Enables class properties syntax.
- **`@babel/plugin-syntax-dynamic-import`**: Supports dynamic imports in the code.

```json
{
  "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
}
```

### 3. Customize for Different Environments

- In production, you may minimize the output or include polyfills for better compatibility.
- In development, you might include debugging features.

```json
{
  "presets": ["@babel/preset-env"],
  "env": {
    "development": {
      "plugins": ["react-refresh/babel"]
    },
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

----

### 13. How do we change the PortNumber on the application for suppose we need local host 5000 instead of 3000

#### 1. React (Create React App)

```bash
# On macOS or Linux
PORT=5000 npm start

# On Windows Command Prompt
set PORT=5000 && npm start

# On Windows PowerShell
$env:PORT = 5000; npm start
```

#### 2. Using .env Files:
- You can also create a **.env** file in your project root (if it doesn't already exist) and add the following line:

```js
PORT=5000
```

#### 3. Webpack

```js
const path = require('path');

module.exports = {
  // Other configuration...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5000,  // Set the port number here
    open: true  // Opens the browser after the server successfully starts
  }
};
```