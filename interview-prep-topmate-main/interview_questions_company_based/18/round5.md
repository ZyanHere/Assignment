### 1. Event bus communication in react

- An Event Bus is a design pattern that **allows PubSub-style communication between components** while the components remain loosely coupled.
- A **component can send a message to an Event Bus** without knowing where the message is sent to. 
- On the other hand, **a component can listen to a message on an Event Bus** and decide what to do with the message without knowing where the message comes from. 
- With this design, independent components can communicate without knowing each other.

  <img src="./imagesUsed/eventBus.png">


- **Event**: The message being sent and received on an Event Bus.
- **Publisher**: The sender that emits an event.
- **Subscriber**: The receiver that listens to an event.
<br/>

- This pattern can be useful in React applications, particularly in scenarios **<ins>where props drilling or context API might be too cumbersome**</ins> or 
- when **components need to communicate across different parts of the application tree** `without` <ins>a direct ancestor-descendant relationship</ins>.


```js
// CREATING
// EventBus.js
import { EventEmitter } from 'events';

const EventBus = new EventEmitter();

export default EventBus;
```

```js
// USING
import React from 'react';
import EventBus from './EventBus';

function ComponentA() {
  const handleClick = () => {
    EventBus.emit('message', 'Hello from Component A!');
  };

  return (
    <button onClick={handleClick}>Send Message</button>
  );
}

export default ComponentA;
```

```js
import React, { useEffect, useState } from 'react';
import EventBus from './EventBus';

function ComponentB() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      setMessage(msg);
    };

    EventBus.on('message', handleReceiveMessage);

    return () => {
      EventBus.removeListener('message', handleReceiveMessage);
    };
  }, []);

  return (
    <div>Message received: {message}</div>
  );
}

export default ComponentB;
```
### Considerations:
- **Decoupling**: 
  - While event buses **can reduce coupling between components**, 
  - they can also **make the flow of data <ins>less transparent and harder to trace**</ins>. 
  - This might introduce challenges in debugging and maintaining the code.

#### Alternatives
- While an event bus can be useful, **other state management techniques might be more appropriate** depending on the specific requirements of your application:

- **Context API**: 
  - For simpler applications or when sharing state between many components, the React Context API provides a more React-centric way of managing state.
- **State Management Libraries**: 
  - For complex state logic or large-scale applications, libraries like `Redux` or `MobX` **provide more structured ways to manage state** with robust debugging tools and community support.

-----


### 2. ReduxToolKit Query vs ReactQuery

- tools **designed to simplify `data fetching`, `caching`, and `state management`** in web applications, particularly those built with React. 

#### Redux Toolkit Query (RTK Query)
- designed to `reduce` the amount of boilerplate code needed **to manage server-state** in a Redux app. 
- It is built on top of Redux and <ins>**provides a powerful data fetching and caching solution**</ins>.
- automatically caches data and **provides mechanisms** for `cache invalidation`, `refetching`, and `polling`.
- Data is **stored in a normalized form** which can help in managing data consistency across the app.

#### Best Suited For
- Applications that are already using Redux and need **to handle `server` state alongside `client` state**.


#### React Query

- not tied to Redux and serves as a powerful tool for `fetching`, `caching`, `synchronizing`, and `updating` **server-state** in React applications.
- Comes with **built-in devtools** to visualize and manage `queries` and `cache`
- Automatically `refetches` data in the background <ins>**when window focus is regained** or **network status changes**</ins>.
- Provides features like `query retries`, `pagination`, `lazy loading queries`, and more.
- You have full control over when data should be refetched or cache should be invalidated.

#### Best Suited For

- Projects that require a **robust solution for data fetching and caching** without the overhead of managing a global state store like Redux.
- Projects that need to manage server-state effectively without integrating with a larger state management system.

----

 
### 3. Webpack config for both development and Production

```js
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react css-loader style-loader sass-loader mini-css-extract-plugin clean-webpack-plugin terser-webpack-plugin css-minimizer-webpack-plugin
```
#### Directory Structure

```js
/your-project
|-- /src
|   |-- index.js
|   |-- App.js
|-- /public
|   |-- index.html
|-- /dist
|-- webpack.config.js
|-- package.json
|-- .babelrc
```

#### Webpack Configuration
- Create a `webpack.config.js` file in your project root. 
- This configuration will determine how to treat development and production builds:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Defines the entry point of your application 
    entry: './src/index.js',
    //output file names, using content hashes in production for caching purposes.
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    // Production gets a "source-map" for the best quality source maps, 
    // while development uses "inline-source-map" for faster rebuilds.
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', //to transpile JSX and ES6,
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [
            // conditionally uses `MiniCss` in production for CSS extraction
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader', //css-loader to bundle CSS
            'sass-loader' // for SCSS,
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(), // to clean the dist folder before each build

      // to inject scripts into your HTML file
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),

      //to extract CSS into separate files in production 
      // for better caching and performance.
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css'
      })
    ],

    // Minifies "JavaScript" and "CSS" in production using TerserPlugin and CssMinimizerPlugin
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],

      //used to split vendor code from application code
      splitChunks: {
        chunks: 'all',
      }
    },

    //Configures the Webpack Dev Server for development, 
    // enabling features like live reloading.
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      port: 3000,
      open: true
    }
  };
};
```

#### Usage
- In your package.json, define scripts to run development and build tasks:

```js
{
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production"
  }
}
```
----

### 4. environment variables in react

- If you're **using Create React App** (CRA), it **has built-in support** for environment variables:

#### 1. **Create Environment Files**: 
   - Create files in the root of your project for each environment:

```js
.env
.env.local
.env.development, 
.env.test, 
.env.production
.env.development.local, 
.env.test.local, 
.env.production.local
```

#### 2. **Define Environment Variables**: 
   - In these files, define your variables starting with REACT_APP_ to ensure they are embedded into the build by Webpack. 

#### For example:

```js
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=xyz123
```


#### 3. Accessing Environment Variables in React:
```js
console.log(process.env.REACT_APP_API_URL); // Outputs: https://api.example.com
```

### Custom Webpack Setup:
- If you are not using CRA and have a custom Webpack setup, you can manage environment variables **using the `dotenv` package and Webpack's `DefinePlugin`**.

```js
npm install dotenv
```
```js
API_URL=https://api.example.com
ANALYTICS_ID=xyz123
```
- In your `webpack.config.js`, you can set up `dotenv` and use `DefinePlugin` to inject environment variables into your application.

```js
require('dotenv').config();

const webpack = require('webpack');

module.exports = {
   // Other Webpack config...
   plugins: [
      new webpack.DefinePlugin({
         'process.env.API_URL': JSON.stringify(process.env.API_URL),
         'process.env.ANALYTICS_ID': JSON.stringify(process.env.ANALYTICS_ID)
      })
   ]
};
```

-----

### 5. What is Micro-frontend

- A Microfrontend architecture is a design approach in web development where a **frontend application is decomposed** into `individual`, `semi-independent` "microapps" <ins>working loosely together.</ins> 

- Each microapp is responsible for a distinct feature of the product
- This approach **allows teams to scale and update different parts of a frontend application independently** of one another, often leading to better scalability, faster development cycles, and more resilient systems.

#### Key Concepts of Microfrontends
- **Decomposition**: 
  - The main idea is to break down the frontend into `smaller`, `manageable` parts that can be `developed`, `tested`, and `deployed` independently.
- **Autonomy**: 
  - Each microfrontend is **developed by a different team**, allowing them to `choose` their technology stack, release cycles, and manage their part of the application <ins>**without needing to coordinate**</ins> closely with other teams.
- **Aggregation**: 
  - While each team manages its microfrontend, all microfrontends are eventually combined into a single cohesive application, typically orchestrated through a container application or framework.
- **Isolation**: 
  - Microfrontends **should be isolated from each other** to prevent conflicts in styles, state management, and JavaScript. 
  - <ins>They communicate via well-defined APIs or event systems.</ins>

#### Implementation Strategies
- There are **several ways to implement** a microfrontend architecture:

- **Build Time Integration**: 
  - Microfrontends are **built separately** <ins>**and combined into a single bundle during a build process**</ins>, **often <ins>managed by a module bundler like Webpack</ins>**.
<br/>

- **Run Time Integration via Web Components**: 
  - Microfrontends are implemented as Web Components, which encapsulate their functionality and styling. 
  - The main application then uses these components, ensuring style and script isolation.
<br/>

- **Server-Side Integration**: 
  - Different microfrontends are assembled on the server-side, <ins>**and the final HTML is sent to the client**.</ins> 
  - This approach can be managed by backend templating or server-side includes.
<br/>

- **Client-Side Integration (SPA approach)**: 
  - <ins>**Each microfrontend is a SPA itself**</ins>, and a "shell" or "container" SPA dynamically loads the required microfrontends on demand.

----

### Advantages of Microfrontends
- **Independent Deployment**: 
  - Teams can deploy their services independently which can increase development velocity and reduce coordination overhead.
<br/>

- **Scalability**: 
  - Teams can scale their resources independently based on the feature's specific needs.
<br/>

- **Resilience**: 
  - Failure in one microfrontend does not necessarily crash the entire application.
Technological Freedom: Teams can choose their technology stack, allowing them to pick the best tool for their specific needs or experiment with new frameworks without affecting others.

----

### 6.  explain how routing works in react
   - Routing in React is managed primarily **through a library called React Router**, which <ins>**enables the implementation of dynamic routing**</ins> in a web app
  - This routing approach allows users to navigate through components in the application as pages <ins>**without the need to reload the webpage**</ins> providing a smoother user experience and faster performance.

- **Component-Based**: 
  - Routes are defined using components, **making it easy to split code by routes** and bundle routes components separately.
- **Declarative**: 
  - React Router uses a declarative approach for defining routes, 
  - meaning you specify "what" should happen, not "how".

----

### 7.  react routing code example

```js
npm install react-router-dom
```

```js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import User from './User';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user/john">User John</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```
-----

### 8.  how many ways the Component communication in react

#### 1. Props
- **Parent to Child Communication**:

```js
function Parent() {
    const message = "Hello from Parent";
    return <Child message={message} />;
}

function Child({ message }) {
    return <p>{message}</p>;
}
```
#### 2. Callback Functions
- **Child to Parent Communication**:

```js
function Parent() {
    const [message, setMessage] = useState('');

    function handleMessageChange(newMessage) {
        setMessage(newMessage);
    }

    //Parents can pass callback functions as props to child components.
    return <Child onMessageChange={handleMessageChange} />;
}

function Child({ onMessageChange }) {
    const message = "Hello from Child";
    // These callbacks can then be invoked by the child to communicate back to the parent, typically to update state.
    return <button onClick={() => onMessageChange(message)}>Send Message</button>;
}
```


#### 3. Context API

- **Global Communication:**
```js
const MessageContext = createContext(null);

function Parent() {
    const message = "Shared message";

    return (
        <MessageContext.Provider value={message}>
            <Child />
        </MessageContext.Provider>
    );
}

function Child() {
    const message = useContext(MessageContext);
    return <p>{message}</p>;
}
```

#### 4. Lifting State up
- **Sibling Communication**: 



```js

function Parent() {
    // Siblings can communicate by lifting state up to their closest common ancestor. 
    const [data, setData] = useState('');

    // The ancestor component then passes it down to the siblings via props.
    return (
        <>
            <ChildA data={data} setData={setData} />
            <ChildB data={data} setData={setData} />
        </>
    );
}

function ChildA({ data, setData }) {
    return <input value={data} onChange={e => setData(e.target.value)} />;
}

function ChildB({ data }) {
    return <p>{data}</p>;
}
```

#### 5. Event Bus

- For cases **where components are far apart in the component tree**, or when using third-party component libraries that don't support prop drilling, Context, or lifting state up, <ins>**an event bus or a similar pub-sub system can be used**</ins>. 
- However, this method is less common and should be used sparingly as it **can make** the data flow in your **application harder to `predict` and `manage`**.

-----

### 8.  CORS related questions

  - `Cross-Origin Resource Sharing` (CORS) is a crucial concept in web development,
  - particularly when dealing with `APIs` and `client-side JavaScript` frameworks like React

#### 1. What is CORS and Why is it Important in Web Development?
- is a security feature **implemented `by web browsers`**<ins>**to prevent malicious websites from accessing resources and data from other websites without permission**</ins>. 
-  it <ins>**allows servers to specify who can access**</ins> their `assets` and under what conditions.


#### 2. How Does CORS Work?
- CORS works <ins>**by adding HTTP headers to cross-origin requests and responses**</ins>. 
- When a browser makes a cross-origin request (e.g., when a React app hosted on one domain makes a request to an API on a different domain), the browser automatically adds an Origin header to the request, indicating the domain from which the request was initiated. 
- The server can then decide whether to `allow` or `deny` the request **based on the origin specified**. 
- If the server **allows** the request, <ins>**it responds with appropriate CORS headers (like Access-Control-Allow-Origin)**</ins> specifying which origins are permitted to access the resources.

#### 3. Describe a Scenario Where You Might Encounter a CORS Error in a React Application. How Would You Resolve It?
- trying to **fetch data from an API** that is hosted on a `different domain`. 
- If the server hosting the API <ins>**isn't configured to accept requests from the origin where the React app is hosted**</ins>, the `browser will block` the request and log a CORS error in the console.

##### To resolve this, you have a few options:

- **Server-Side**: 
  - `Modify` the server’s CORS policy **to include the origin of your React application** in the `Access-Control-Allow-Origin` header.

- **CORS Anywhere**: 
  - Use a CORS reverse proxy server like `"CORS Anywhere"` for development, which appends the necessary CORS headers to your requests. 
  - Note that this is **not** recommended for `production` environments.

#### 4. What is a Preflight Request in CORS? When is it Triggered?

- A preflight request **is an extra request sent by the browser to the server** before the actual request, using the HTTP OPTIONS method. 
- This is done for requests that do not meet the "simple requests" criteria, such as those using HTTP methods other than GET, POST, or HEAD, or those **having headers that are not allowed by default**.

- The preflight request includes headers like `Access-Control-Request-Method` and `Access-Control-Request-Headers` that inform the server about the HTTP method and headers used in the actual request. 
- The server **must then respond with whether these are permissible**. Only if the preflight succeeds will the browser proceed with the actual request.

#### 5. Can You Modify CORS Policy from the Client-Side, such as in a React Application?

- **No**, CORS policy `cannot` be altered **from the client-side** due to security reasons. 
- CORS policies are `enforced` and `managed` **by the server**, 
- and the server **must specify** which `origins`, `HTTP methods`, and `headers` are permitted. 
- Attempting to modify CORS policy from the client-side would undermine the security model of the web, as it would allow potential malicious actors to access data they shouldn't be able to. 
- The `correct` approach **is to manage CORS settings on the server** or use appropriate server-side configurations to handle cross-origin requests legally and securely.

----

### 9. How to deploy react app in server

#### Step 1: Build Your React Application
- First, you need to create a production build of your React application. If you're using Create React App (CRA), you can build your application by running:
- This command compiles your React app into static files, typically **into a build directory inside your project**. 
- These files **include** `HTML`, `CSS`, `JavaScript`, and any `other assets` included in the project. 
- The files are **optimized for performance**: JavaScript is minified, CSS is combined and minimized, and media files are compressed.
  
```js
npm run build
```
#### Step 2: Choose a Deployment Strategy
- Static websites (Netlify, Vercel, Github Pages)


#### Step 3: Configure Environment Variables
- Ensure any environment variables used by your app are set on the server. 
- For `static` deployments on platforms like Netlify, these **can be set in the web UI**. 
- For `server` deployments, set them in your shell environment or **use a tool like dotenv** to manage them within your application.
----

### 10.  Explain use of `useQuery` and `useMutation` hooks
- Two of the most important hooks for **managing server-state** in React applications, particularly when using libraries like `React Query`or `Apollo Client` (for GraphQL), are `useQuery` and `useMutation`

#### useQuery Hook
- is used to **fetch data asynchronously from a server** 
- and **then `cache` that data `client-side`**


```js
import { useQuery } from 'react-query';

function fetchProjects() {
    return fetch('https://api.example.com/projects')
        .then(response => response.json());
}

function Projects() {
    // first parameter you provide—often called the "query key"—to uniquely identify and manage the cached data for a particular query.
    // left side ones are part of the object returned by the useQuery hook in React Query.
    const { data, error, isLoading, isError } = useQuery('projects', fetchProjects);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data.map(project => (
                <p key={project.id}>{project.name}</p>
            ))}
        </div>
    );
}
```

#### useMutation Hook

- This hook is used for **making changes to the server-side data** — such as `POST`, `PUT`, `PATCH`, or `DELETE` HTTP methods. 
- This hook is particularly useful for actions **that require server-side data modification** and when such actions are triggered by user interactions.

```js
import { useMutation, useQueryClient } from 'react-query';

function updateProject(project) {
    return fetch(`https://api.example.com/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
    }).then(res => res.json());
}

function Project({ projectId }) {
    const queryClient = useQueryClient();
    const { data: project } = useQuery(['project', projectId], fetchProjectById);
    const { mutate } = useMutation(updateProject, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['project', projectId]);
        }
    });

    return (
        <div>
            <input
                type="text"
                value={project.name}
                onChange={e => mutate({ ...project, name: e.target.value })}
            />
        </div>
    );
}
```
----
