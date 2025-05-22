- ##### Prevents browsers <u>***from interpreting files as a different MIME type than declared in the Content-Type header***</u>, reducing the risk of attacks like MIME sniffing.



- When browsers fetches remote sources of content such as javascript or images then <strong>they are instructed using the Content-Type header on the type of content</strong>

<strong>Ex: </strong>PDF content is fetched by the browser, the server hints the browser by setting the following header

```js
Content-Type: application/pdf
```

```js
These content types are standardized by the IANA organization as MIME types
```

#### Risk:

- What happens when the browser is <strong>given an incorrect MIME type for a content</strong> or not given at all.

<strong>Sol:</strong> In such cases the browser will attempt to guess the content type by reading and interpreting the content data.

```js
Above action is referred as MIME sniffing.
```

- The purpose of this header is to instruct the browser to avoid guessing the web server's content type.
- The X-Content-Type-Options HTTP header is used by IE, Chrome and Opera to migitgate a MIME based attack.

```js
// Example of setting the header

X-Content-Type-Options: nosniff
```

```js
const helmet = require("helmet")
app.use(helment.noSniff())
```

---
