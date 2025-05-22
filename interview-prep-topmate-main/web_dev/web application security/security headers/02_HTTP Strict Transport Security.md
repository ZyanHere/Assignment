
### HTTP Strict Transport Security

- Also known as HSTS, is a protocol standard <strong>which enforces secure connections to the server via HTTP over SSL/TLS.</strong>
- In simple words, **Forces the use of HTTPS** by instructing the browser to only connect to the server over a secure, encrypted connection.
- HSTS is configured and transmitted from the server to any HTTP web client using the <strong>HTTP header Strict-Transport-Security</strong>.
  <br>
- **Implementation**:

  - **Configured via an HTTP header** to inform the browser that the **website should only be accessed over HTTPS**.
    <br>

- This specifies a time interval during which the browser should only communicate over an HTTP secured connection (HTTPS)

```js
When a Strict-Transport-Security header is sent over an insecure HTTP connection, the web browser ignores it because the connection is insecure
```

- After the header has been set it consults a preload service, like Google's to determine whether the website has opted in for HSTS.

---

### The risk

- The risk that may arise when communicating over a secure HTTPS connection is that the <strong>malicious user can perform a Man-In-The-Middle(MITM) attack. </strong>
- This type of attack <strong>downgrades future requests to the webserver </strong> to use an HTTP connection.
- Once the connection is established, the attacker can able to see and read all the data that flows through.
- <strong>A website that uses HTTPS can still create insecure HTTP requests</strong>, however End users would not suspect anything to be inappropriate, but they still exposed to MITM attacks

- We can see that the server returns an HTML file for a login page to the browser. This includes some resources that are accessible over HTTP (submit.png)
- If an attacker is able to perform MITM attack and "sit on the wire" <strong>they will be able to read the un-encrypted traffic that flows through including HTTP requests that include sensitivie data</strong>.
- An even worse scenario would involve the <strong>attacker watching where actual data is being sent and accessing HTTP resources set for POST or PUT endpoints.</strong>

![image](https://user-images.githubusercontent.com/42731246/217484434-218d9a08-79d7-46e1-ad7b-f791fbbfc09e.png)

---

### Solution:

- When a web server want to protect their web clients through a secure HTTPS connection, <strong>they need to send the Strict-Transport-Security header with a given value </strong>(which represents the duration of time in seconds that the web client should send requests with a secure HTTPS connection).

- After the duration has expired, the client no longer sends requests

```js
// For example, to instruct the browser to upgrade all requests sent to the server to HTTPS for the next hour.

Strict-Transport-Security: max-age=3600
```

---

### Helmet Implementation:

- We instruct the Express app to use the hsts middleware and respond to all the requests with <strong>Strict-Transport-Security</strong> header set

- Below is the HSTS middleware to indicate to a web client that it should only send HTTPS requests to our server for the next month.

- If for any reason the browser receives multiple HSTS header directives, it will only respect and enforce the policy based on the first one sent.

- It is common for web servers to have sub-domains to fetch assets from or to make REST API Calls. We would also of course like to protect them and enforce the HTTP requests.

```js
const helmet = require('helmet');

const reqDuration = 2629746000; // 1 month into milliseconds

app.use(
  helmet.hsts({
    maxAge: reqDuration,
  })
);
```

```js
To includeSubDomains we need to add this parameter in the hsts options object
```

```js
- If it is necessary to instruct the browser to disable the Strict-Transport Security, a server can respond with this header's max-age set to 0.
- This will result in the browser expiring the policy immediately and enable access over an HTTP connection.
```

---

#### Practical example of using HTTP Strict Transport Security (HSTS)

- Using HSTS as a browser security control to allow only HTTPS-enabled resources to be fetched from the primary domain for a website.

```js
const http = require('http');
const https = require('https');
var fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const appRoutes = require('./routes/app.routes.js');

const HTTP_PORT_NUMBER = 80;

const httpApp = express();
httpApp.engine('handlebars', expressHandlebars());
httpApp.set('view engine', 'handlebars');

httpApp.use(
  helmet.hsts({
    maxAge: 86400,
  })
);

var options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

httpApp.use(morgan('dev'));
httpApp.use('/', appRoutes);
httpApp.use(express.static('public'));

const httpServer = http.createServer(httpApp);
httpServer.listen(HTTP_PORT_NUMBER, function () {
  console.log(`Server started on port ${httpServer.address().port}`);
});
https.createServer(options, httpApp).listen(443);
```

### HSTS in a deployed HTTPS application

- The main request to the page https://localhost:443 replies back with a Strict-Transport Security header.
- The request to load this image url http://localhost/harley-davidson-zGzXsJUBQfs-unsplash.jpg gets an internal browser redirect to its HTTPS version because the HSTS version does just that - <strong>it upgrades all requests to their HTTPS counterpart to load them securely.</strong>
- The favicon from http://http.rip/favicon.ico <strong>is blocked from being loaded.</strong>

---

#### HST with expiration time

- By setting the expiration time to zero (maxAge: 0), following are the things going to happen
- It means that Strict-Transport-Security header is set but by setting to zero, it disables it
- The image which have the http url will be loaded from HTTP directly, without any redirect happening to HTTPS
- The favicon is <strong>fetched and displayed for the website</strong>

---

