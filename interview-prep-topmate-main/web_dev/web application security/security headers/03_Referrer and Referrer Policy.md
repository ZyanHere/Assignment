- Use the **`Referrer-Policy`** header in a web server's response to instruct the browser to securely set a 'Referer' value when making requests off the page.
<br/>

- In other words, **`Referrer-Policy`** **instructs the browser when and how much information** to provide when setting a Referrer header as users navigate from an existing web page.

```js
- When user browse through web pages, the browser may set a request header called Referer.
```

```js
// SOME EXAMPLE VALUES
Referrer-Policy: no-referrer
Referrer-Policy: origin-when-cross-origin
Referrer-Policy: same-origin
```

- This Referer is <strong>often used by the back-end servers to track user behavior for analytics</strong> and other means.

##### This is how referer looks alike in the browser DevTools.

<img width="737" alt="image" src="https://user-images.githubusercontent.com/42731246/218412946-d08ac3b7-398c-4115-a552-7dc40966a768.png">

---
**Important Points to remember:**

- The default value set by the browser is **`no-referrer-when-downgrade`**
  - Meaning, **they <ins>do not send**</ins> the referrer header when navigating from **`HTTPS`** to **`HTTP`**.
  - This is **to prevent leakage** of potentially **`sensitive`** information via URLs.
<br/>

- However a more secure option is recommended, such as **`strict-origin-when-cross-origin`**
  - This policy ensures that **full referrer information is only sent** for requests **within** the same origin.
  - For cross-origin requests, it **sends <ins>only the origin part of the referrer**</ins> (not the full URL path) if the protocol security level remains the same (e.g. HTTPS to HTTPS)
  - and **sends no referrer information at all** if the security level **`downgrades`** (eg; HTTPS to HTTP)
<br/>

- By choosing a policy like **`strict-origin-when-cross-origin`**, 
  - web apps can **enhance user privacy and security** by limiting the amount of potentially sensitive information shared across different web domains 
  - or when downgrading from a secure to a less secure protocol.


----

<strong>Doubt 1</strong>:
What if a web page had stored sensitive information in a URL, such as an account ID as part of the URL?

<strong>Doubt 2</strong>: If a link on the web page is then visited and the browser sets the Referer header as it normally would, a leak of sensitive information could occur.

<strong>Solution</strong> This is where the <strong>Referer Policy</strong> header comes in. This header when set by a web server, <strong>instructs the browser whether to populate the Referer header </strong>when navigating out of that web page and into a new one.

---

#### An Insecure way of using a Referer header

- Because the Referer header is set on the client-side and may be abused, it shouldn't be trusted as a source of truth and its integrity should be considered minimal.

- This is why the <strong>browsers remove the Referer header when browsing from an HTTPS website to an HTTP website</strong>.

---

#### Referrer Policies

- The <strong>Referrer Policy</strong> header can set one of the following policies that instructs the browser's behaviour when navigating off the page.

- no-referrer
- no-referrer-when-downgrade
- origin
- origin-when-cross-origin
- same-origin
- strict-origin
- strict-origin-when-cross-origin
- unsafe-url


<img src="../_imagesUsed/referrer-policy-browser-compatability.png">



---

### no-referrer

- Instruct the browser to never set a <strong>Referer</strong> header for any links related to requests from this web page

### no-referrer-when-downgrade:

- If there's a security downgrade in the form of requests from an HTTPS website to an HTTP, then the browser doesn't set the <strong>Referer</strong> header

- This is the default behaviour of browsers

### origin

- Instead of sending the full URL - the origin, path and query parameters of the current page being navigated from the browser will only send the origin such as https://www.google.com and nothing beyond that in the URL.

### origin-when-cross-origin

As the name implies, <strong>only the origin is sent to any requests the browser makes to navigate off the page </strong>(when those addresses match a cross-origin). Otherwise, when requests are made to URLs of the same origin, the default behavior of setting the <strong>Referer</strong> header to the current URL is followed.

### same-origin

The current URL is set for the <strong>Referer</strong> header to any requests that are considered same-origin, otherwise it isn't set at all.

### strict-origin

When requests are kept in the same origin, only the origin is set as the Referer value.

### strict-origin-when-cross-origin

- If the request is made to an HTTPS cross-origin address, then only the origin is set for the <strong>Referer</strong> header
- If the request is made to the same origin, then the full URL is set.

### unsafe-url

This is the least secure option, <strong>which always sets a value for the Referer header</strong> and could lead to sensitive information leak.

```js
referrer is deprecated
Referrer Policy is superseded
```

```js
const helmet = require("helmet")

app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
)
```
-----