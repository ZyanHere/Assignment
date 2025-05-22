### Following are the common Security Issues

- **Cross-site-scripting (XSS)**:

  - <u>Sanitize user inputs, **_use Content Security Policy headers_** and **_encode user generated content_**</u>

<br/>

- **Cross site Request Forgery (CSRF)**:

  - <u>**_Use anti-CSRF tokens_**</u>, validate and sanitize inputs on the server side.

<br/>

- **Insecure data storage**:
  - Use <u>**_secure mechanisms for storing sensitive data_**</u>, such as **HTTPs**, **secure cookies** and **encrypted databases**.

---

### Explain the Same-Origin Policy in the context of JavaScript security.

- The **Same Origin Policy (SOP)** is a security measure in web browsers that <u>**_restricts web pages from making requests to a different domain_**</u> than the one that served the web page.
- This policy <u>**_prevents malicious scripts from accessing sensitive data across different regions_**</u>.
- To work around SOP, <u>**_developers can use techniques like Cross-Origin Resource Sharing (CORS) or JSONP_**</u>

---

### What is the importance of HTTPS in securing web applications, and how does it work?

- HTTPS (Hyper Text Transfer Protocol Secure) is essential for <u>**_securing data transmission between a user's browser and a website_**.</u>

- Encrypts the data using SSL/TLS transmitted between the user’s browser and the web server, providing confidentiality and integrity.
- **To implement HTTPs**, <u>**_a website needs an SSL/TLS certificate_**</u>, which verifies the site's identity and enables secure communication.

---

### CORS(Cross-origin Resource Sharing):

- **Purpose**:

  - CORS <u>**_is a security feature implemented by web browsers to control which web domains can access resources_**</u> (like data or APIs) <u>**_on another domain_**</u>.

  <br>

- **Usage**:

  - It is primarily **_<u>used to prevent unauthorized cross-origin requests that could potentially lead to security vulnerabilities such as cross-site request forgery (CSRF) or leaking sensitive information.</u>_**

  <br>

- **Implementation**:

  - The <u>**_server specifies in its HTTP response headers which origins are allowed_**</u> to access its resources.
  - The **_browser enforces these restrictions to ensure that only allowed domains can make requests_** to the server.

<br>

- **Summary**:
  - CORS is mainly concerned with controlling **_cross-origin requests to access resources_**.
  - CSP focuses on **_mitigating risks associated with the execution of scripts_** and other resources <u>**_by specifying trusted sources for content_**</u> on a web page

---

### Two-Factor Authentication (2FA):

**Purpose:**

- Adds <u>**_an additional layer of security by requiring users to provide a second authentication factor_**</u> (e.g. a code from a mobile app) in addition to a password.

---

### Security Headers:

**Purpose**:

- Various security-related HTTP headers <u>**can be set to control browser behavior and enhance security**</u>.
- Examples include `Referrer-Policy`, `Feature-Policy`, and `Strict-Transport-Security`

---

### Input Validation and Sanitization:

**Purpose**:

- Ensures that user inputs are validated and sanitized to prevent common vulnerabilities like SQL injection, Cross Site Scripting (XSS) and other injection attacks.

---

### Session Management:

**Purpose**:

- Properly manages user sessions, including secure session storage, session timeout, and secure session handling to prevent unauthorized access.

---

### Web Application Firewalls (WAF):

- **Purpose:**

  - Monitors, filters, and **_blocks malicious HTTP traffic_** between a web application and the Internet

  <br>

- **Implementation**:

  - Can be a hardware or software solution placed between the web server and the internet.

---

### X-Frame-Options:

- **_Prevents a web page from being embedded within an iframe_**, protecting <u>**against clickjacking attacks**</u>

**Implementation**:

- Configured via an HTTP header to control whether the browser should allow the page to be framed.
