### Headers as Browser Security Controls

#### Security in HTTP:

- When developing web applications, your <strong>application depends upon on the communication protocols</strong> that already have a set of defined and implemented standards for how to transfer data and securely manage it.

- Browsers utilize <strong>headers sent over HTTP (securely HTTP connections) </strong>to enforce and confirm such communication standars and policies.

- Using these HTTP headers to increase security for client-side code <strong>is a quick and efficient method to mitigate security vulnerabilities </strong> and implement a defense in depth strategy.

- <strong>A defense in depth</strong> is a security concept in which <strong>multiple layers of security controls</strong> are placed in order to create a better security posture.

---

#### Security headers caveats:

- Using security headers can be a great strategy to help prevent security vulnerabilities. However, <strong>a common mistake is to rely solely on security headers to mitigate issues</strong>
- Effectively responding to the request with a security header depends on the browser to support, implement and adhere to certain specifications to enforce the header.
- You may consult the <strong>Strict Transport Security browser compatibility matrix</strong> to verify the browsers used for your web application are supported.
- <strong>Security headers should be used as a defense in depth security mechanism </strong>that helps add a security control, but they should not be the only defense against vulnerabilities like Cross-Site Scripting

---

```js
- HTTP security headers are a generic tool that can be employed by any technology at the HTTP medium.
- Which includes load balancers, API gateways, reverse proxies, and web application frameworks
```

### Helmet - a Node.js Package for HTTP Security Headers

- If you’re building Node.js web applications with the help of Express, then Helmet is the go-to npm module to use.
- Helmet is a open-source project <strong>consisting of a collection of Express middleware functions</strong> that in turn configure HTTP headers by setting the HTTP response object accordingly.

We are setting the X-Frame options using Helmet built-in <strong>frameguard</strong> method

```js
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet.frameguard({
    action: 'sameorigin',
  })
);
```

---

