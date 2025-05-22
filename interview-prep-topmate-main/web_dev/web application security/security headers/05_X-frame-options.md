
#### X Frame options

- The X Frame options HTTP header was introduced <strong>to mitigate an attack called Clickjacking</strong>
- Clickjacking allows an attacker <strong>to disguise page elements such as buttons and text inputs</strong> by hiding their view behind real pages which render on the screen using iframe HTML element or similar objects.

```js
- The X-Frame options header was never standardized as part of an official specification but many popular browsers today still support it.
- It's successor is the Content-Security-Policy (CSP) header. Generally focus should be on this for newer web apps.
```

#### The risk of Clickjacking

- This is also known as UI redressing, involve misleading the user to perform a seemingly harmless operation.
- In reality, the user is clicking buttons that secretly belong to other elements or typing text into an input field that is under the attacker's control.

Some Common examples of Clickjacking attack are:

- If a bank or email account website doesn't employ X-Frame-Options HTTP header, <strong>then a malicious attacker can render them in an iframe</strong> and place the attacker's own input fields on the exact location of the bank or email website's input field. (When you enter the creds, the attacker records your creds info).
- An insecure web application for video or voice chat can be exploited by Clickjacking <strong>to let the user mistakenly assume they are just clicking around on the screen or playing a game, while in reality, the series of clicks is actually turning on your webcam.</strong>

---

#### The solution

- To mitigate the problem, a web server can respond to browser's request with an X-Frame-Options HTTP header which is to set to the one of the following possible values:

- <strong>DENY</strong>: Specifies that the website can not be rendered in an iframe, frame or object HTML elements.
- <strong>SAMEORIGIN</strong>: Specifies that the website can only be rendered if it is embedded on an iframe, frame, or object HTML element from the <strong>same domain the request originated from.</strong>
- <strong>ALLOW-FROM URI</strong>: Specifies that the <strong>website can be framed and rendered from the provided URI</strong> (You cannot specifity multiple URI values because of limitation is just one)

```js
X-Frame-Options: ALLOW-FROM http://www.mydomain.com
```

```js
X-Frame-Options: DENY
```

#### Helmet Implementation

- Instructing Express to use xframe middleware provided by helmet.
- To set the X-Frame-Options completely deny all forms of embedding.

```js
const helmet = require('helmet');

app.use(
  helmet.frameguard({
    action: 'deny',
  })
);
```

- To allow frames to occur only from the same origin by providing the following options object

```js
action: 'sameorigin';
```

- To allow frames occur from a specified host

```js
action: 'allow-from',
domain: 'https://mydomain.com'
```

---

**<ins>Note:**</ins>

- Practices evolve and **browsers rapidly adopt new standards** and mechanisms.
- Ex: **`ALLOW-FROM`** value for the **X Frame Options** header has been **`deprecated`** and is now discouraged because modern browser versions don't support it anymore
<br/>

- As a migration path, the CSP standards create a way to adapt such new standards.
- One such way is CSP's **`frame-ancestors`** directive.

```js
// Compatible with X-Frame-Options setting of DENY value.
Content-Security-Policy: frame-ancestors 'none';
```

- The above CSP <ins>**disallows**</ins> any URLs of embeddable content in **`iframe`**, **`object`** and other HTML elements which are part of frame-ancestors policy.
<br/>

- Do note, however that **older browsers may not respect** Content-Security-Policy and its directives. 
  - You **may cause** **`degraded`** security status.
<br/>

- To avoid such a problem, **employ both** old and new headers to ensure all bases are covered.