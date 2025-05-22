### Q1)
#### 1. XSS vulnerability. 
- Interviewers are especially looking out for this whenever you need to render user input. 
- You almost never need to use **`.innerHTML`**. 
- There's **`.textContent`** and **`$.text()`**. 
- If you do have to render raw HTML, make sure you escape the contents first.

#### 2. User input 
  - that is being displayed in the URL **has to be encoded** first as well, or else there's also a potential for mischief <ins>where users **can** add additional query parameters</ins>.

---
### Q2)

### Cross Site Scripting (XSS):

- Cross-Site Scripting is a security vulnerability that **_allows an   attacker to inject malicious scripts_**
- These **_scripts then execute in the context of the victim’s browser_**, potentially `stealing sensitive information`, `hijacking user sessions`, or `performing other malicious actions`.

**There are three main types of XSS attacks:**

- **Stored XSS**:

  - The malicious script is <u>**_stored on the web server_**</u> and served to users who visit a particular page or view a specific message. For example, <u>**an attacker could inject a script into a blog post’s comments section**</u> that executes when other users view the comments.
    <br>

- **Reflected XSS**:
  - The **malicious script is embedded in a URL or another input field** and the victim is tricked into clicking on a crafted link. The script is then executed in the context of the victim’s session.
    <br>
- **DOM-based XSS**:
  - The attack occurs entirely on the client side, manipulating the Document Object Model (DOM) of a web page.
  - **Attackers exploit client-side scripts that use unsanitized** user input to modify the DOM and execute malicious code.
    <br>

**Points to remember**

- To prevent XSS attacks, developers <u>**_should validate and sanitize user inputs_**</u>, **_use output encoding_**, and **_implement security headers_** like **_Content Security Policy (CSP) to restrict the sources_** of executable scripts.
- `Content-Security-Policy` is the name of a HTTP response header that modern browsers use to enhance the security of the document (or web page)

---
### Q3)

### Here’s how to prevent each type of XSS attack:

### a. Preventing Stored XSS:

- **Overview:** Stored XSS attacks occur when an attacker injects a malicious script into a web application’s data, such as comments or messages, which is then served to other users who view that data.

##### To prevent stored XSS attacks:

#### 1. Input Validation and Sanitization:

- Always validate and sanitize user-generated content before storing it in your database or rendering it to other users.

#### 2. Content Security Policy (CSP):

- Implement CSP headers to restrict the sources from which scripts can be executed on your website.
- This can help to mitigate the impact of XSS attacks by disallowing the execution of unauthorized scripts.
- To enable CSP, you need to <u>**configure your web server to return the Content-Security-Policy HTTP header**.</u> We **can also apply** it via a meta tag.

#### 3. Output Encoding:

- When rendering user-generated content, **ensure it is properly encoded** to prevent browsers from interpreting it as executable code. Use encoding libraries or built-in functions for this purpose.

#### 4. Contextual Output Encoding:

- Be aware of the context in which data is being used (e.g., in HTML, JavaScript, or as part of an attribute) and **apply the appropriate encoding technique**.

#### 5. Session Management:

- Implement strong session management and authentication mechanisms to prevent attackers from gaining access to authenticated user sessions and exploiting them for XSS attacks.

---

### b. Preventing Reflected XSS:

**Overview:** Reflected XSS attacks occur when an **_attacker tricks a user into <u>clicking on a crafted link</u>_** containing a malicious script.

##### To prevent reflected XSS attacks:

#### 1. Input Validation

- Validate and sanitize all user inputs, especially those that are used in generating dynamic content.
- Reject or sanitize inputs that contain potentially malicious code.

#### 2. Output Encoding:

- When rendering dynamic content, **_ensure that it is properly encoded_** to prevent script execution
- The encoding must be context-specific, considering the target output (e.g., HTML, JavaScript, or URL).

#### 3. Contextual Output Encoding:

- As with stored XSS prevention, apply encoding techniques according to the context in which the data is used.

#### 4. Content Security Policy (CSP):

- Implement CSP headers **_to limit script execution sources_** and reduce the impact of any potential reflected XSS vulnerabilities.

#### 5. Use Secure Cookies:

- **_Set the “HttpOnly” flag on cookies_** to prevent JavaScript from accessing them, reducing the risk of cookie theft in case of a successful XSS attack.

---

### c. Preventing DOM-based XSS:

**Overview:** DOM-based XSS attacks occur **when malicious code manipulates the Document Object Model (DOM)** of a web page on the client side.

##### To prevent DOM-based XSS attacks:

#### 1. Sanitize Client-Side Input:

- Avoid using unsanitized user input directly in client-side scripts
- Ensure that **user input is sanitized and validated on the server side** before it is used in JavaScript.

#### 2. Secure Data Flow:

- Be cautious when modifying the DOM dynamically.
- Always validate and sanitize user inputs before using them to update the DOM.
- **Use safe APIs and libraries** for DOM manipulation.

#### 3. Avoid Using Dangerous Functions:

- **_Avoid using JavaScript functions <u>that can lead to DOM-based XSS</u>_**, such as `eval()` and` document.write()`

#### 4. Input Validation and Contextual Output Encoding

- Validate and encode data according to its usage context when manipulating the DOM.

#### 5. Content Security Policy (CSP)

- to restrict script execution sources and help prevent DOM-based XSS.

---
### Q4)

### Cross-Site Request Forgery(CSRF or XSRF):

- Is an attack that **_tricks a user into executing unwanted actions_** **_<u>on a different website where the user is authenticated</u>_**.
- The attacker typically sends malicious requests on behalf of the victim, exploiting the victim's active sessions on a targeted site.
- This **can lead to action like** `changing passwords`, `making purchases` or` modifying account settings` **_without the user's consent_**.

#### How Does CSRF Work?

1. A user logs into www.example.com, which uses cookies for session management
2. The user then visits a malicious website, www.malicious.com
3. This malicious website contains a link, button, or some JS that causes the user's browser to make a request to www.example.com without user's knowledge. Because the user is still authenticated with www.example.com (for instance, their session cookie is still valid), the browser also includes authentication credentials with this request.
4. www.example.com receives this request and assumes it's legitimate because the request comes with valid session credentials. It then performs whatever action the request dictates - like changing the email or password.

```js
--------------------------------------------------------------
1. User Login to Example Site:
--------------------------------------------------------------
[User]  --------------->  [www.example.com]
              Login

[User]  <---------------  [www.example.com]
            Set Authentication Cookie

--------------------------------------------------------------
2. Unknowing Visit to Malicious Site:
--------------------------------------------------------------
[User]  --------------->  [www.malicious.com]
            Innocent Visit

--------------------------------------------------------------
3. Malicious Action Triggered:
--------------------------------------------------------------
[User]  ----(Bait)---->  [www.example.com]
       Malicious Request to Example Site with Valid Session Cookie

--------------------------------------------------------------
4. Unintended Action Performed on Example Site:
--------------------------------------------------------------
[User]  <---------------  [www.example.com]
        Action Executed (e.g., Email Changed)

--------------------------------------------------------------
```

### Q5)

### How to Prevent CSRF:

#### 1. Use Anti-CSRF Tokens:

- The **_<u>server sends a unique</u>, unpredictable <u>token to the client with every session</u>_**.
- For any state-changing request, the client must send back this token.
- **_If the token is missing or incorrect_**, the <u>**_server refuses the request_**</u>. (Attackers won't have access to this token)

```js
/**
Step1
When a user logs in or requests a form, the server generates a random token:
Random Token = "ABC123"


Step2
The server sets this token as a cookie and also includes it within the 
form as a hidden field.

Set-Cookie: csrf_token=ABC123; Path=/; Secure; HttpOnly

<!-- Form Data -->
<form action="/submit" method="post">
    <input type="hidden" name="csrf_token" value="ABC123">
    ...
</form>

Step3
When the user submits the form, 
the browser will automatically send the cookie 
(because that's how cookies work) and the token in the form data

POST /submit HTTP/1.1
Host: www.example.com
Cookie: csrf_token=ABC123

csrf_token=ABC123&...other_form_data...


Step4
The server then checks if the token from the cookie matches the 
token sent in the form data.

if (request.cookie["csrf_token"] === request.body["csrf_token"]) {
    // Tokens match, process the request
} else {
    // Possible CSRF attack! Deny the request.
}

**/
```

#### 2. SameSite Cookie Attribute:

- Modern browsers **support setting the SameSite attribute on cookies**.

This attribute can have two values:

- `Strict`: The cookie will only be sent in a first party context (means that <u>**it will be sent to the site from which it originates**</u> during navigation)

- `Lax`: **The cookie is withheld on cross-site sub-requests** <u>but sent when the user navigates to the URL from an external site</u>, like from their email client.

```js
Set-Cookie: session=unique_session_id; SameSite=Strict; Secure; HttpOnly;
```

#### 3. Check the Referer Header:

- **Verify the Referer header of incoming requests** to ensure that they originate from the same domain.
- <u>_While this header can be spoofed by attackers in some cases</u>_, it still provides an additional layer of security.

**Note:** All browsers consistently send the Referer header, so it should be considered an extra measure rather than the primary defense.

```js
# Get the Referer header from the incoming request.
    referer = request.headers.get("Referer")

    # Check if the Referer header is present and matches one of the trusted origins.
    if referer and any(referer.startswith(origin) for origin in trusted_origins):
        # Perform the protected action here.
        # For example, update user data, change passwords, or process payments.
        return "Action performed successfully."
    else:
        # Redirect the user to an error page or display an error message.
        return "Unauthorized request."
```

---

#### 4. Use HTTP-Only Cookies:

- This prevents JavaScript from accessing these cookies, reducing the risk of cookie theft in case of a successful CSRF attack.
- When a user logs into a web application, the server may send an authentication cookie as part of its response.
- To set this cookie as HttpOnly, the server would include the HttpOnly attribute in the Set-Cookie HTTP header:

```js
HTTP/1.1 200 OK
Set-Cookie: session_id=12345abcdef; HttpOnly; Path=/; Secure

HttpOnly means the cookie cannot be accessed by JavaScript.
Path=/ restricts the cookie to the root path.
Secure ensures the cookie is only sent over HTTPS.
```

#### 5. Require Authentication for Sensitive Actions:

- Ensure that sensitive actions or endpoints require user authentication.
- Unauthorized users should not be able to perform these actions even if a CSRF attack occurs.

#### 6. Session Timeout:

- Set session timeouts to automatically log users out after a period of inactivity to reduce the risk of an active session being exploited.

---

### Example 1: Changing Email Address

- **Scenario 1:** Alice is logged into her email account on emailservice.com.
- **Attack:** She then visits a malicious website, malicioussite.com, which <u>**_contains a hidden form that is automatically submitted by JavaScript_**.</u>
  - This form is crafted to send a POST request to emailservice.com <u>_to change her email settings (like her recovery email address)_</u>.
- **Result**: If emailservice.com <u>**_doesn't have proper CSRF protections_**</u>, it might process this request as if Alice intentionally submitted it, leading to her recovery email being changed without her knowledge.

### Example 2: Social Media PostL

- **Scenario 1:** Bob is logged into a social media platform.
- **Attack:** He clicks on a link that leads him to a malicious site.
  - This site contains a script that makes a request to the social media platform to post a message or send a message to all his contacts.
- **Result**: If the social media platform doesn’t verify the authenticity of the request, it could result in spam or malicious messages being sent from Bob’s account.

### Example 3: Changing Password

- **Scenario 1:** Dana is logged into a forum.
- **Attack:** : She receives an email with a link to an interesting article.
  - Clicking the link takes her to a website that secretly contains a form that sends a request to the forum to change her password.
- **Result**: Without CSRF protection, Dana’s password could be changed without her consent, potentially locking her out of her account.

----

### Q6) How to Send data to a server without a page refresh?

- To send data from a web page to a server without a page refresh, you can use techniques such as **AJAX** (Asynchronous JavaScript and XML) or the **more modern Fetch API**.
- These methods **allows you to communicate with the server in the background** <u>_and update the page content dynamically without requiring a full page reload_</u>.

#### Using AJAX (XMLHttpRequest)

```js
// Using AJAX (XMLHttpRequest)
var xhr = new XMLHttpRequest();
xhr.open('POST', 'your-server-endpoint', true);
xhr.setRequestHeader('Content-Type', 'application/json');

var data = {
  key1: 'value1',
  key2: 'value2',
};

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Handle the server response here
    console.log(xhr.responseText);
  }
};

xhr.send(JSON.stringify(data));
```

#### Using Fetch API

```js
// Using Fetch API
var data = {
  key1: 'value1',
  key2: 'value2',
};

fetch('your-server-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.text())
  .then((result) => {
    // Handle the server response here
    console.log(result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

---

### Q7) How do you get a return response for updating the page?

#### Using XMLHttpRequest

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    // Update the page with the response data
    document.querySelector('#someElement').textContent = response.message;
  }
};
xhr.send(JSON.stringify({ key: 'value' }));
```

#### Using Fetch API:

```js
fetch('https://example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
})
  .then((response) => response.json())
  .then((data) => {
    // Update the page with the response data
    document.querySelector('#someElement').textContent = data.message;
  })
  .catch((error) => console.error('Error:', error));
```

---

### Q8) What format would you choose?

#### 1. CORS:

- **When to use:** **<u>When you have control over the server** or API you’re accessing</u>, and you need to perform various types of HTTP requests (GET, POST, PUT, DELETE, etc.).
- **Advantages:** Supports all types of HTTP requests, widely recognized and adopted, and can be secured with appropriate headers.
- **Drawbacks:** Requires server configuration, can’t be used if you don’t have access to modify the server’s response headers.

#### 2. JSONP:

- **When to use:** When **_dealing with older APIs that support JSONP_** and <u>**_only need to make GET requests_**</u>.
- **Advantages:** Cross domain Request:
  - Can bypass same-origin policy <u>**_without requiring server modifications_**</u>. No Preflight Request.

**i) Cross-Domain:** <u>Enables cross-domain requests without CORS</u>.
**ii) No Preflight:** Avoids CORS-related preflight requests.
**iii) GET Requests:** Inherently uses GET, suitable for read-only public APIs.

**Drawbacks:** <u>Limited to GET requests, potential security vulnerabilities, not as popular in modern applications</u>.

#### 3. Proxy Server:

- **When to use:** When you **don’t have control over the target server to set CORS headers** ( or when you <u>**_want to hide the target server’s actual endpoint from the client_**</u>.)
- **Advantages:** Can be implemented to handle all types of HTTP requests, hides the real server endpoint.
- **Drawbacks:** Adds an additional layer (potential latency), requires maintaining an additional server component, can introduce a single point of failure.

#### 4. WebSockets:

- **When to use:** When **_you need real-time bi-directional communication between the client and server_**.
- **Advantages:** Real-time communication, not restricted by the same-origin policy.
- **Drawbacks**: Overkill for simple request-response scenarios, requires a specific server setup to support WebSockets.

---

### Q9) What is the Same-Origin Policy (SOP)?

- The Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.
- The Same-Origin Policy (SOP) is a security mechanism implemented in web browsers **to prevent potentially malicious interactions between documents (or scripts) of different origins**.
- The primary reason for SOP is security.

---

### Q10) What three components of a URL must match for two documents to be considered as having the same origin?

- An origin is determined by the combination of

  1. Protocol (e.g. http: or https:)
  2. Domain (or hostname)
  3. Port

For two pages to have same origin, all three of these parts must match. If any one of these components differs, the two pages do not have the "same origin"

**Examples:**

1.  A script on https://example.com:443 wants to make an XMLHttpRequest to https://example.com:443/api/data. This is allowed under SOP since the protocol, domain, and port are the same.
2.  A script on http://example.com wants to access an element from a page on https://example.com. This is **_disallowed under SOP_** because the **_protocols (http vs. https) are different_**, even though the domain is the same.
3.  A script on https://example.com wants to read the DOM of an iframe with a page from https://sub.example.com. This is disallowed under SOP because the subdomains are different, making them distinct origins.

---

### Q11) What are some exceptions or bypasses to the Same-Origin Policy that browsers permit?

#### Cross-Origin Resource Sharing (CORS):

- A mechanism allowing servers to specify who can access its assets.
- **By setting specific HTTP headers (Access-Control-Allow-Origin and related headers)**, a server can allow certain cross-origin requests.

#### JSONP (JSON with Padding):

- A technique to overcome the SOP by using `<script>` tags to fetch JSON data wrapped in a callback function.
- This is possible because `<script>` tags can load resources cross-origin.
- It's less secure and is being replaced by CORS in modern web applications.

#### Document.domain Property:

- **If two windows/frames have the same parent domain but different subdomains**, they can communicate **_if they both set their document.domain to the parent domain_**.
- However, **they can't reset it back to the original value <u>once changed</u>**.

#### Window.postMessage():

- **_Allows safe cross-origin communication between Window objects_** (e.g., between a page and its iframe or between two tabs).

---

### Q12) How to receive the window postMessage in JavaScript?

1. window. postMessage() — to send the message.
2. window. addEventListener(“message”,callback) — to receive and process the message.

#### Embeddable Elements:

- Some elements like `<img>`, `<script>`, `<link>`, `<video/>` can load resources from different origins.
- The Websocket protocol isn't restricted by the SOP, though the initial handshake is.
- Servers must explicitly agree( using the Sec-WebSocket-Origin header) to establish a connection.

### Service Workers:

- Service workers can intercept network requests and respond to them.
- However **_they are still subject to SOP_** when it comes to fetching resources.
- **To fetch cross origin resources**, the **_<u>external server must support CORS</u>_**.

---

### Q13) Cross-Origin Resource Sharing (CORS):

- a security feature implemented by web browsers that controls how web pages in one origin can request and interact with resources on another origin

#### HTTP Request Headers:

1. **Origin**: Specifies the origin of the request. This is always sent for cross-origin requests
2. **Access-Control-Request-Method**: Used with pre-flight requests, specifying **_which method_** will be used in the actual request.
3. **Access-Control-Request-Headers**: Used with pre-flight requests, specifying **_which HTTP headers will be used_** in the actual request.

#### HTTP Response Headers:

1. **Access-Control-Allow-Origin**: Specifies which origin sites are allowed to access the resource.
   - It can either be a specific origin or a wildcard (for any origin)
2. **Access-Control-Allow-Methods**: Specifies which **HTTP methods** are permitted for the actual request.
3. **Access-Control-Allow-Headers**: Specifies which **HTTP headers** can be used during the actual request.
4. **Access-Control-Allow-Credentials**: Indicates **_whether the browser should include credentials_** (like Cookies or HTTP authentication) with requests

---

### Q14) HOW CORS WORKS?

**Pre-flighted Requests:** before the actual request, **_the browser sends a probe (pre-flight) using the OPTIONS method_** to see if the cross-origin request is safe to send.

- It's **_triggered with non-standard headers_** or request methods beyond the simple ones.

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*dVuIVcHUI_UIMQhQ.png">

---

### Q15) What are the roles of the `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers` headers in CORS?

#### <u>HTTP response headers</u>

#### <u>Access-Control-Allow-Origin:</u>

- **Role**: Specifies **_which origin(s) are allowed_** to access the resource.
- **Values**:
  - A specific origin (e.g., https://example.com)
  - `*` will allow any origin, but this approach is not recommended for sensitive operations
  - `null` (usually indicates that the resources can't be accessed by any website)
- **Note:** When credentials are involved (Cookies or HTTP Authentication) are involved, this header can't use the wildcard `*` value.
- It must specify an explicit origin.

---

#### <u>Access-Control-Allow-Methods:</u>

- **Role**: Indicates **_which HTTP methods are allowed_** when accessing the resource.
- **Values**:
  - A comma-separated list of methods (e.g., `GET`, `POST`, `PUT`, `DELETE`).

**Example:** <u>**_If a server only wants to allow GET and POST methods</u>_** for a specific resource, it would **_send `Access-Control-Allow-Methods`: `GET, POST`_**.

---

#### <u>Access-Control-Allow-Headers:</u>

- **Role**: <u>**_Lists the HTTP headers that can be used_**</u> during the actual request to the resource..
- **Values**:
  - A comma-separated list of HTTP header field names (e.g., `X-Custom-Header, Content-Type`).

**Example:**

- **_If a client-side application wants to send a custom header_** (X-Custom-Header) with its request, **_<u>the server must include this header's name in the Access-Control-Allow-Headers list_**</u> to validate its usage.

#### <u>Requests with credentials</u>

```js
const invocation = new XMLHttpRequest();
const url = 'https://bar.other/resources/credentialed-content/';

function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send();
  }
}
```

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*pHv5lBSurq4up5HK.png">

---

### Q16) How can server-side applications restrict which websites can access their resources using CORS?

- using CORS by setting specific CORS headers in their responses.

---

### Q17) How to include cookie in HTTP request using `fetch` or `XMLHttpRequest`?

- Using the Fetch API, you need to **_set the credentials option to `'include'`_**.

```js
fetch('https://example.com/data', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

`'include'`: <u>_Always send user credentials_</u> (cookies, HTTP authentication, and client-side SSL certificates), **_even for cross-origin calls_**.

`'same-origin'`: **_Send user credentials only if the URL is on the same origin_** as the calling script. This is the default for same-origin requests.

`'omit'`: Don’t send any credentials.

---

### Q18) How do cookies and credentials behave in cross-origin requests? And how can a server allow these to be included with CORS?

- **<u>XMLHttpRequest & Fetch API</u>**: When making AJAX requests or using the Fetch API, **you must <u>explicitly indicate that you want to send cookies</u>**.
- For `XMLHttpRequest`, you'd use `withCredentials = true`. For the `Fetch API`, you'd set the `credentials option` to `include`.

**Example Showcase:**

**Client Side:**

- For XMLHttpRequest: `xhr.withCredentials = true;`
- For Fetch API: `{ credentials: 'include' }` as an option in the request.

**Server-side:**

- The **_server must include the header_** `Access-Control-Allow-Credentials: true` in its **_response_**.

**<u>Points to remember:</u>**

- The **_server cannot use the wildcard_** (\*) for `Access-Control-Allow-Origin` when `Access-Control-Allow-Credentials` **_is true_**.
- Instead, it **_must echo back the exact origin_** or **_use a specific known origin_**.

```js
 Example: Access-Control-Allow-Origin: https://example.com.
```

- Ensure the server is configured to handle cookies appropriately (e.g set the HttpOnly flag for Cookies containing sensitive data) to protect them from potential XSS attacks.

---
### Q19)

### What are cookies?

- Cookies are **_small piece of data stored by web browsers on a user's device_** at the request of web servers.
- They serve as **_<u>a way for servers to recognize and remember specific users, and can persist across multiple visits to a website_**</u>.

#### What are cookies used for?

- **Session Management**: To track user sessions, logins, shopping carts, and other user-specific data.
- **Personalization**: To remember user preferences, themes, and other settings.
- **Tracking**: Often used by advertisers to monitor user behavior across sites.
- **Security**: To store tokens or identifiers that can be used to authenticate users.

---

### Q20) How do you send data via cookies?

- When a **_server wants_** to set a cookie, **_it includes a Set-Cookie header in its HTTP response_**.
- This header specifies the name, value, and other attributes of the cookie.

```js
// For example:
Set-Cookie: sessionId=abc123; HttpOnly; Secure; Max-Age=3600;
```

- **_On subsequent requests to the same domain_** (or matching domain, if domain attribute is set), the **_<u>browser includes the cookie data in the Cookie HTTP header</u>_**:

```js
Cookie: sessionId = abc123;
```

#### Pros of passing data through cookies:

- Persistence: **_Cookies <u>can persist across multiple user sessions</u>, making them suitable for remembering user-specific information_**.
- Server-Side Access: **_Easily accessed on the server side during HTTP requests_**.
- Built-in Expiry: Can be set to expire after a certain date or time.
- Security Features: Attributes like Secure (ensures transmission over HTTPS only) and HttpOnly (prevents access from JavaScript) add layers of security.

#### Cons and Limitations of passing data through cookies:

- Size Limit: Each <u>**_cookie is limited to about 4KB_**</u>. The number of cookies (typically 50) and total cookie storage (typically 4KB x 50 = 200KB) per domain are also limited.
- Performance: Every time an HTTP request is made to a domain, **_all cookies for that domain are included in the request, increasing the amount of data sent_**, especially if there are many or large cookies.
- Privacy Concerns: Tracking cookies can be seen as intrusive, leading many users to block or delete them.
- Cross-Site Attacks: **_Without proper security measures_**, **_<u>cookies can be vulnerable to attacks_**</u> like Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).
- Same-Origin Policy Limitation: **Cookies are bound to a specific domain and path**. They can’t be accessed or set by other domains, **_making cross-domain data storage more challenging_**.
- Expiration: **_<u>If not set, cookies can expire when the browser session ends_**</u>, which might not always be desired.

---

### Q21) What is HttpOnly flag? When to use? Limitation?

- Use it when you want to ensure that the cookie is:

1. **Inaccessible via JavaScript:** <u>**_This protects the cookie from being accessed through client-side scripts_**</u>, which can help mitigate certain types of attacks, particularly cross-site scripting (XSS) attacks. If a malicious script runs on your page, it won’t be able to read HttpOnly cookies.
2. **Only sent in HTTP/HTTPS requests:** **_The cookie will only be transmitted in the headers of HTTP/HTTPS requests made to the server_** and cannot be accessed or manipulated from the client side via scripts.

```js
// Node.js - Express Js

res.cookie('name', 'value', { httpOnly: true });
```

#### Limitations of HttpOnly:

- It **_does not protect against Cross-Site Request Forgery (CSRF) attacks_**. For this, you’d **_need other defenses like CSRF tokens_**.
- It **_does not prevent the cookie from being intercepted_** if not using a secure connection.

**<u>Bonus Point:</u>**

- **To ensure cookies are only transmitted over secure connections**, **_<u>use the Secure flag in combination with HttpOnly</u>_**.

---
