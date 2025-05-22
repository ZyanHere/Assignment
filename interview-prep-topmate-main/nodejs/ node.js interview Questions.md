1. Difference between Javascript & node js?
2. 
3. Is node js single-threaded? if yes How?
4. If node js is single-threaded then how it can handle so many requests at one time?🛑
5.  What is the architecture of node js? (Synchronous or Asynchronous)
6.  What is buffer in node js?
    -  Buffer is a **built-in global class** that **provides a way to work with binary data directly**. 
    -  It represents a chunk of memory allocated outside of the V8 JavaScript engine but can be interacted with via a JavaScript interface. 
    -  Buffers are particularly useful because JavaScript initially did not have a mechanism for dealing with binary data, which is **essential for tasks such as interacting with file systems, network communications, or handling binary protocols**.

### Key Characteristics of Buffers:
- **Fixed Size**: The size of a Buffer is established when it is created and cannot be resized.
- **Binary Data**: Buffers store raw binary data. Each element in a Buffer is a byte (8 bits) and is represented as a number from 0 to 255 (inclusive), or 0x00 to 0xFF in hexadecimal.
- **Encoding/Decoding**: Although Buffers are meant for binary data, <ins>**they can encode and decode data to and from different formats (e.g., UTF-8, Base64) when necessary, at the point of reading from or writing to them**</ins>.

#### Creating Buffers:

- Node.js provides several methods to create buffers:

#### 1. Buffer.from(): Creates a new Buffer containing the given JavaScript string or a byte array.

```js
const bufFromString = Buffer.from("Hello World", "utf-8");
const bufFromArray = Buffer.from([72, 101, 108, 108, 111]);
```

#### 2. Buffer.alloc(size): Creates a new Buffer of the specified size, filled with 0x00.

```js
const buf = Buffer.alloc(10); // Create a buffer of 10 bytes.
```

#### 3. Buffer.allocUnsafe(size):
-  Creates a new Buffer of the specified size without initializing the memory. It is **faster than Buffer.alloc but the returned Buffer instance might contain old data** because of the lack of initialization.

```js
const unsafeBuf = Buffer.allocUnsafe(10);
```



7.  What is fork method in node js?
8.  Tell me the name of node js core modules?
9.  How can we make node js multi-threaded?
10. What is .env file? What is the use of it?
    - A `.env` file is a simple text file containing environment variables key-value pairs. 
    - It's commonly used in software development **to store configuration options and sensitive information, such as database passwords, API keys, or application settings, that shouldn't be hard-coded into the application's source code for security and flexibility reasons**.






11. What is the main file in an express project?
12. How to create a connection between the project and the Database? (MySQL, PostgreSQL, Mongo.DB)
13. How to Authenticate the user?🔴

```js
//1
npm install express jsonwebtoken bcrypt
```

```js
//2
const express = require('express');
const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

```js
//3
const bcrypt = require('bcrypt');

// Example user store and registration endpoint
let users = []; // This should be a database in production

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        users.push(user);
        res.status(201).send('User registered');
    } catch {
        res.status(500).send();
    }
});
```



```js
//4
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

```

```js
//5
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
```


```js
//6
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "You're authorized to access this route" });
});

```

14. How to secure our Rest API’s?🔥
    1. Use HTTPS
    2. Authentication and Authorization
    3. API Keys
    4. Rate Limiting
    5. Input Validation
    - 6. CORS (Cross-Origin Resource Sharing)
    7. Use Web Application Firewalls (WAF)
    8. Keep Software and Dependencies Up-to-date
    9. Logging and Monitoring
    10. Secure Token Storage
    11. Implement Content Security Policy (CSP)
    12. Security Headers: Use HTTP security headers like `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, and others to add another layer of security.

-----

1.  What are JWT tokens? How does it work?
2.  Name Package to upload files?
3.  Tell me the basic structure(Folder structure) of the backend application you created?
4.  What are Templates in express js?
5.  Tell me the name of some template engines?
6.  Have you used any ORM(Object Relational Model)?
7.  What is sequelize?
8.  How to connect sequelize to the database?
9.  What is indexing in database?
10. What are joins in relational database. Write a query to join two tables?🔴



𝟏-𝟏𝟎: 𝐁𝐚𝐬𝐢𝐜𝐬 𝐨𝐟 𝐍𝐨𝐝𝐞𝐣𝐬

## 1. What is Node.js?
- Node.js is an open-source, cross-platform, **JavaScript runtime environment** <ins>that executes JavaScript code outside a web browser</ins>. 
- It allows developers to use JavaScript to write command-line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. 
- Node.js **operates on a non-blocking, event-driven I/O model**, making it efficient and suitable for real-time applications that run across distributed devices. 
- It uses the **Google V8 JavaScript engine to execute code**, and a large percentage of the basic modules are written in JavaScript. 
- Node.js has an event-driven architecture **capable of asynchronous I/O**. 
- These design choices aim to optimize throughput and scalability in web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).

---

## 2. Explain the concept of event-driven programming in Node.js.
- Event-driven programming is a programming paradigm in which the <ins>***flow of the program is determined by events</ins>*** such as user actions (mouse clicks, key presses), sensor outputs, or message passing from other programs or threads. 
- In the context of Node.js, event-driven programming is fundamental, as <ins>***it leverages JavaScript's event-driven nature to perform non-blocking operations***</ins>, allowing Node.js to handle a large number of concurrent connections efficiently.

##### Here's a breakdown of how event-driven programming works in Node.js:

1. **Event Loop**: At the heart of Node.js's event-driven architecture is the event loop. 
   - This is what allows Node.js to perform non-blocking I/O operations—despite the fact that JavaScript is single-threaded—by offloading operations to the system kernel whenever possible.
   -  The event loop **continuously checks for and dispatches events or messages** in a program.
<br/>

2. **Events and Event Emitters**: 
   - In Node.js, **events are actions or occurrences** that happen in the system you're programming, which the system tells you about so you can respond to them in some way if desired. 
   - The ***objects that emit events are instances of the EventEmitter class***. 
   - These objects expose an on method that allows one or more functions to listen for or subscribe to a specific event, designated by a string label. These listeners are called every time the specified event is triggered.
<br/>

3. **Non-blocking I/O Operations**: 
   - Unlike traditional request/response paradigms, **non-blocking I/O operations allow Node.js to continue executing other pieces of code without waiting for the outcome of these operations**. - For instance, when a file read operation is initiated, Node.js can process other tasks while waiting for the file to be read. Once the read operation is completed, an event is emitted, which triggers the corresponding event handler to execute.
<br/>

4. **Callbacks**: 
   - In event-driven programming with Node.js, callbacks are frequently used. 
   - A callback is a function passed as an argument to another function. 
   - A callback function can run after an asynchronous operation completes, and the event loop will ensure that the callback is executed at the correct time.
<br/>

5. **Real-time Applications**: 
   - The event-driven model is particularly well-suited for real-time applications that require constant data updates, such as online gaming, chat applications, and live streaming services. 
   - These applications benefit from Node.js's ability to manage multiple connections simultaneously in a non-blocking manner.



----


## 3. How does Node.js handle asynchronous operations?
- Node.js handles asynchronous operations **through its event-driven architecture**, utilizing a few key mechanisms and patterns, such as `callbacks`, `promises`, and `async/await`, all within the context of its non-blocking I/O model. 
- These mechanisms allow Node.js to perform efficiently in I/O-intensive applications, such as web servers, by ensuring that the JavaScript thread is not blocked by long-running operations. Here's an overview of how each mechanism works:
----

## 4. What is npm? How do you use it in Node.js projects?
- npm stands for **Node Package Manager**, and it is the default package manager for the JavaScript runtime environment Node.js. 
- npm is **used to manage dependencies for an application**, allows you to install, share, and control packages of JavaScript code with other developers worldwide, facilitating the discovery and reuse of code with others in the Node.js community.
- **npm Scripts**: The `package.json` file can also contain scripts that you can run with npm. This is a powerful feature that allows you to automate tasks like starting your application, running tests, and more. For example, you could define a start script that runs your application with node app.js. You can run this script with npm start.


## 5. What is the role of the 'require' function in Node.js?
- In Node.js, the `require` function plays a crucial role in including modules (a set of functions or properties) **that exist in separate files**. 
- The concept of modules is fundamental in Node.js, allowing developers to organize their code into separate, reusable pieces. 
  

## 6. How does Node.js handle concurrency?
- Node.js handles concurrency through an event-driven, non-blocking I/O model using something called the "event loop."

#### Phases of the Event Loop


- **Timers**: Executes callbacks scheduled by setTimeout() and setInterval().
- **I/O Callbacks**: Executes most I/O callbacks, such as those related to networking, file operations, etc.
- **Idle, Prepare**: Used internally only.
- **Poll**: Retrieves new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
- **Check**: setImmediate() callbacks are invoked here.
- **Close Callbacks**: E.g., socket.on('close', ...).

Despite its single-threaded nature, **Node.js can utilize multiple cores of a CPU <ins>through the Worker Threads</ins>** module.

----

## 7.  Explain the concept of streams in Node.js.
- Streams in Node.js are a **powerful way of working with data in a continuous fashion**.
- Streams are particularly **useful for handling large volumes of data or data that comes from an external source incrementally**, rather than all at once. This makes streams an efficient choice for reading from or writing to files, network communications, or any kind of end-to-end data flows in an application.

There are four main types of streams in Node.js:

- **Readable Streams**: These are streams from which data can be read. For example, fs.createReadStream() creates a readable stream to read data from a file.

- **Writable Streams**: These are streams to which data can be written. For example, fs.createWriteStream() creates a writable stream to write data to a file.

- **Duplex Streams**: These are streams that are both Readable and Writable. For example, a TCP socket is a duplex stream because data can be both read from and written to it.

- **Transform Streams**: These are a special type of Duplex stream where the output is in some way computed from the input. For example, a zlib stream compresses input data and makes it available as output.


## 8.  What is the purpose of the 'exports' object in Node.js?
- is a way to define what a module "exports" or makes available for other modules to use.
- It is part of the module system and is used to make functions, objects, or primitives available to other modules in the application. 

```js
// myModule.js
module.exports = function() {
    console.log('Exported as a single entity');
};
```

## 9.  How can you prevent blocking the event loop in Node.js?
1. Use Asynchronous APIs
2. Break Up Heavy Processing
3. Offload Tasks to Worker Threads
4. Leverage Child Processes
5. Avoid Blocking the Event Loop with Synchronous Calls
6. Use Non-blocking Algorithms

-----


𝟏𝟏-𝟐𝟎: 𝐌𝐨𝐝𝐮𝐥𝐞𝐬 𝐚𝐧𝐝 𝐏𝐚𝐭𝐭𝐞𝐫𝐧𝐬

## 11. What is middleware in Express.js?

- Middleware in Express.js refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
-  These functions can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function in the stack.

### Types of Middleware:
- **Application-level Middleware**: <ins>***Attached to an instance of express, using app.use() or app.METHOD(), where METHOD is an HTTP request method***</ins>, like get, put, post, etc. It’s useful for executing code for specific routes or globally across all routes.

- **Router-level Middleware**: Similar to application-level middleware but **bound to an instance of express.Router()**. It’s useful for defining middleware to run on a specific subset of paths.

- **Error-handling Middleware**: Defined by **having four arguments** instead of three **(err, req, res, next)**. It's used to handle errors across the application.

- **Built-in Middleware**: Express has several built-in middleware functions like **express.static** to serve static files, **express.json** to parse JSON payloads, and **express.urlencoded** to parse URL-encoded payloads.

- **Third-party Middleware**: Additional middleware that can be installed from npm and integrated into your app, such as body-parser (now part of Express), cors for enabling CORS, or morgan for logging.


```js
const express = require('express');
const app = express();

// An application-level middleware that logs the request method and URL
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for '${req.url}'`);
  next(); // Pass control to the next middleware
});

// A route and its handler function (middleware at the route level)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// An error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

-----

12. How do you handle errors in Express.js?
- 1. Using Middleware for Error Handling
```js
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});
```
- 2. Catching Errors in Asynchronous Code
- 3.  Defining Custom Error Handling Middleware

```js
app.use((err, req, res, next) => {
    if (err instanceof MyCustomError) {
        return res.status(400).send('Custom error message');
    }
    
    res.status(500).send('Internal Server Error');
});
```

----

13. Explain the role of routing in Express.js.
14. What is the purpose of the body-parser middleware in Express.js?
    -  used in Express.js applications **to parse the body of incoming request bodies**.

**Main Features of body-parser**
- **JSON Parsing**: It **could parse incoming requests with JSON payloads**, converting the JSON data into a JavaScript object accessible via req.body.
- **URL-Encoded Data Parsing**: It was capable of parsing incoming requests with URL-encoded payloads, useful for handling form submissions where the form data is encoded as URL parameters.
- **Text Parsing**: It provided functionality to parse plain text bodies, making the text data accessible through req.body.

**Starting with Express version 4.16.0, the functionality of the body-parser middleware was re-integrated directly into Express itself**, removing the need for a separate body-parser package for the most common use cases. This integration provided convenience methods such as express.json() and express.urlencoded(), which are essentially wrappers around the body-parser functionalities:

**express.json()**: This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
**express.urlencoded({ extended: true })**: This parses incoming requests with URL-encoded payloads. The extended option allows for the choosing between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).

```js
const express = require('express');
const app = express();

// To parse JSON bodies
app.use(express.json());

// To parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```




15. How do you set up a basic Express.js server?
16. Describe the difference between app.get() and app.post() methods in Express.js.
17. How do you handle static files in Express.js?
18. What is the purpose of the 'next' function in Express.js middleware?
19. Explain the concept of template engines in Express.js.

20. How do you handle sessions in Express.js?
- Handling sessions in Express.js typically **involves using middleware that manages session data across multiple requests by a single user**. 
- This is **essential for maintaining a user's state and data across the pages of an application**, which, by nature, does not maintain state between HTTP requests. 

##### The most common way to handle sessions in Express.js is by using the `express-session middleware`.

----



𝟐𝟏-𝟑𝟎: 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞 𝐚𝐧𝐝 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞 𝐌𝐨𝐝𝐞𝐥𝐬

21. What is MongoDB?
22. Explain the difference between NoSQL and SQL databases.
23. How do you perform CRUD operations in MongoDB?
24. What is Mongoose? How do you use it in Node.js projects?
25. Describe the difference between findOne() and find() methods in MongoDB.
26. How do you handle transactions in MongoDB?
27. What is indexing in MongoDB?
28. Explain the concept of sharding in MongoDB.
29. How do you perform aggregation in MongoDB?
30. What is the purpose of the _id field in MongoDB documents?

𝟑𝟏-𝟒𝟎: 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐚𝐧𝐝 𝐃𝐞𝐩𝐥𝐨𝐲𝐦𝐞𝐧𝐭

33. Explain the concept of test-driven development (TDD) in Node.js.
34. What is continuous integration (CI) in Node.js development?
35. How do you debug Node.js applications?
36. Describe the difference between debugging in development and production environments in Node.js.
37. What is load testing, and how do you perform it in Node.js?
38. How do you handle security vulnerabilities in Node.js applications?
39. Explain the concept of containerization in Node.js development.
40. What are some best practices for deploying Node.js applications in production environments?
#### 41. How does the Node.js event loop work, and how does it handle multiple asynchronous operations simultaneously?

- The event loop enabling Node.js to perform non-blocking, asynchronous I/O operations

- The event loop works by constantly checking and delegating tasks in its various phases to the appropriate threads.

- As soon as the I/O operation finishes, the result is returned to the event loop, which then proceeds to the next task it can execute.

Here is an overview of the event loop and their roles:

- <strong>Timers:</strong> This phase executes callbacks scheduled by setTimeout() and setInterval()

- <strong>I/O callbacks:</strong> Executes almost all callbacks including I/O events

- <strong>Idle, prepare:</strong> Internal usage only

- <strong>Poll:</strong> Retrieves new I/O events.

- <strong>Check:</strong> Execute setImmediate() callbacks

- - <strong>Close callbacks:</strong> Executes close event callbacks such as socket.on("close",)

##### Node.js is essentially single threaded but it can simultaneously handle multiple asynchronous operations by delegating them to the native system API's provided by the libuv library or the worker threads pool.

- When the event loop encounters an asynchronous operation it offloads the task and moves forward and once that task is completed it comes back to this async operation task and executes it.

---

#### 2. How does Node.js handle uncaught exceptions and what is the best practice for handling them in a production application?

- By default, Node.js handles uncaught exceptons by printing the error stack trace to the console and exiting the process.

- However it is possible to attach an unhandled exception event listener to the <strong>uncaughtException</strong> event to prevent the
  default behavior.

```js
process.on('uncaughtException', (error) => {
  // code goes on
})
```

- But the above approach is not recommended for production use because the application may be left in a unpredictable state.

- So the best practice for handling uncaught exceptions in production applications is:

- Log the error and all relevant information.
- Gracefully shutdown the process.

- Use a process manager like pm2 or container orchestration system like Kubernetes to automatically restart the application.

- Additionally improve the error handling in your application and use proper testing and monitoring to reduce the chances of unhandled exceptions.

---

#### 3. What is libuv, and how does it play a vital role in Node.js performance optimization?

##### libuv is a cross-platform I/O library written in C that plays a crucial role in the Node.js ecosystem.

##### It provides the event loop implementation, async I/O operations, and thread pooling for handling filesystem, DNS and user-defined tasks.

##### libuv abstracts the underlying OS-level mechanisms to perform these tasks, thus ensuring consistent behaviour across platforms.

##### The key benefits of libuv in Node.js performance optimization include:

- <strong>Event loop:</strong> libuv provides a fast, scalable and cross-platform event loop that is the backbone of Node.js concurrency model.

- <strong>Asynchronous I/O:</strong> libuv handles async I/O operations allowing Node.js to achieve non-blocking I/O operations and handle thousands of concurrent connections efficiently.

- <strong>Thread pool:</strong> libuv manages a thread pool to offload blocking tasks like <strong>file I/O, cryptographic operations, and user-defined operations,</strong> enabling better CPU usage in concurrent environments.

<strong>Cross-platform support:</strong> libuv provides a consistent API for different platforms, significantly contributing to Node.js cross-platform compatability.

---

#### Explain the difference between process.nextTick() and setImmediate() in Node.js and when to use each one.

Both enable deferring the execution of a function to a later time.

- <strong>process.nextTick()</strong>:fires immediately on the same phase

```js
console.log('Start')

process.nextTick(() => {
  console.log('Callback function executed')
})

console.log('End')

// Start
// End
// Callback function executed
```

- <strong>setImmediate():</strong>fires on the following iteration or 'tick' of the event loop

```js
It has higher priority than other asynchronous operations, such as timers or I/O operations.
```

##### Why use process.nextTick()?

- Allow users to handle errors, cleanup any unneeded resources or try the request again before the event loop continues.

- <strong>In summary </strong>: use process.nextTick() when you want to execute a callback function immediately after the current operation completes, but before other I/O events or timers. Use setImmediate() when you want to schedule a callback to be executed in the next event loop iteration, after any pending I/O events or process.nextTick() callbacks.

------

