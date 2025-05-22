## Proxy Pattern

- The Proxy Pattern is a fundamental design pattern that <ins>***provides a placeholder for another object to control access to it***</ins>. 
- This pattern is especially useful in situations where you want ***<ins>to add a layer of protection, logging, lazy initialization, or access control to the actual object without changing its code.***</ins>

```js
// Target object
function NetworkFetch(url) {
  this.url = url;
}

NetworkFetch.prototype.fetchData = function () {
  console.log(`Fetching data from ${this.url}...`);
  // Imagine an actual network request here
};

// Proxy object
function NetworkFetchProxy(url) {
  this.networkFetch = new NetworkFetch(url);
}

NetworkFetchProxy.prototype.fetchData = function () {
  console.log('Proxy: Checking access before fetching data.');
  // Perform additional actions or checks before the actual operation
  this.networkFetch.fetchData();
  // Perform additional actions or checks after the actual operation
  console.log('Proxy: Logging the time of request.');
};

// Usage
const proxy = new NetworkFetchProxy('http://example.com');
proxy.fetchData();


// Output:
// Proxy: Checking access before fetching data.
// Fetching data from http://example.com...
// Proxy: Logging the time of request.
```
----

### ES6 Proxy Version


```js
// Target object
function NetworkFetch(url) {
    this.url = url;
}

NetworkFetch.prototype.fetchData = function() {
    console.log(`Fetching data from ${this.url}...`);
    // Imagine an actual network request here
};

// Proxy handler
const handler = {
    get(target, prop, receiver) {
        const originalMethod = target[prop];
        if (typeof originalMethod === 'function') {
            return function(...args) {
                console.log('Proxy: Checking access before fetching data.');
                // Perform additional actions or checks before the actual operation
                const result = originalMethod.apply(target, args);
                // Perform additional actions or checks after the actual operation
                console.log('Proxy: Logging the time of request.');
                return result;
            };
        }
        return originalMethod;
    }
};

// Creating a proxy
const networkFetch = new NetworkFetch('http://example.com');
const proxy = new Proxy(networkFetch, handler);

// Usage
proxy.fetchData();

// Output:
// Proxy: Checking access before fetching data.
// Fetching data from http://example.com...
// Proxy: Logging the time of request.
```

- In the ES6 version, we use the Proxy constructor to create a proxy around the NetworkFetch instance. 
- The handler object defines traps for interactions with the proxy. 
- Here, the get trap intercepts method calls and allows us to inject additional behavior before and after the method invocation. This approach is more dynamic and can easily be applied to various objects without creating specific proxy classes for each.

----

### Real-time Example: Secure File Access System

- Imagine a system where sensitive files are accessed by various parts of an  application. Direct access to these files can lead to security vulnerabilities, un-logged access, or unchecked resource consumption. By applying the Proxy Pattern, we can create a protective layer that controls and monitors access to these files.

```js
//Traditional

// The actual file access implementation
function SecureFileAccess(fileName) {
  this.fileName = fileName;
}

SecureFileAccess.prototype.readFile = function() {
  console.log(`Reading file: ${this.fileName}`);
  // Imagine code here to read the file content
};

// Proxy to add security checks and logging
function FileAccessProxy(fileName) {
  this.fileAccess = new SecureFileAccess(fileName);
}

FileAccessProxy.prototype.readFile = function(user) {
  if (this.hasReadAccess(user)) {
    console.log(`${user} is reading ${this.fileAccess.fileName}`);
    this.fileAccess.readFile();
    this.logAccess(user);
  } else {
    console.log(`${user} is not allowed to read ${this.fileAccess.fileName}`);
  }
};

FileAccessProxy.prototype.hasReadAccess = function(user) {
  // Imagine complex access control logic here
  return user === "admin";
};

FileAccessProxy.prototype.logAccess = function(user) {
  console.log(`Read access logged for ${user}`);
};

// Usage
const secureFile = new FileAccessProxy("sensitiveData.txt");
secureFile.readFile("admin"); // Allowed
secureFile.readFile("guest"); // Denied

//Output:

// admin is reading sensitiveData.txt
// Reading file: sensitiveData.txt
// Read access logged for admin
// guest is not allowed to read sensitiveData.txt
```

---

```js
// ES6
// we use JavaScript's native Proxy to intercept calls to readFile

// The actual file access implementation
// The actual file access implementation
function SecureFileAccess(fileName) {
  this.fileName = fileName;
}

// Define the readFile method
SecureFileAccess.prototype.readFile = function () {
  console.log(`Reading file: ${this.fileName}`);
  // Imagine code here to read the file content
};

const fileAccessHandler = {
  get: function (target, prop, receiver) {
    if (prop === 'readFile') {
      return function (user) {
        if (user === 'admin') {
          console.log(`${user} is reading ${target.fileName}`);
          // Correctly invoke the readFile method using Reflect.apply
          Reflect.apply(target[prop], target, []);
          console.log(`Read access logged for ${user}`);
        } else {
          console.log(`${user} is not allowed to read ${target.fileName}`);
        }
      };
    }
    // Use Reflect.get to default any other property access to its normal behavior
    return Reflect.get(...arguments);
  },
};

const secureFile = new Proxy(
  new SecureFileAccess('sensitiveData.txt'),
  fileAccessHandler
);

secureFile.readFile('admin'); // Allowed
secureFile.readFile('guest'); // Denied

//Output:

// admin is reading sensitiveData.txt
// Reading file: sensitiveData.txt
// Read access logged for admin
// guest is not allowed to read sensitiveData.txt
```