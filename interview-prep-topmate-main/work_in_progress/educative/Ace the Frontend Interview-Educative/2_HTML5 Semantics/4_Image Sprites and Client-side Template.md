##### What are image sprites ?

- Sprites are 2-D images.
- A sprite is a big image that consists of a mixture of several smaller images into a larger one.
- It is defined by X and Y coordinates. CSS background-position property is used to determine the exact position that is to be displayed.

---

##### In HTTP 1.1, image sprites help improve a web's page performance. How ?

- Using Sprite Images will boost the dashboard’s overall efficiency by <strong>reducing the number of HTTP requests.</strong>

- HTTP requests are typically made in sequence on a server, meaning that one request does not start before the preceding one is done. In addition, opening a connection is costly for making a request. By restricting the number of requests made on the server, you increase the loading speed of the components.

- If you have images that are only a few bytes in size, each one is giving your web server unnecessary work to do by sending an HTTP request. Each request contains a portion of overhead information that uses valuable site bandwidth.

- Using CSS sprites can reduce the number of HTTP requests and make the web page seem more responsive <strong>because all interface elements are already downloaded before the user handles them.</strong>

- This technique can be very effective in improving site performance, especially in situations where many small images are being used, such as menu icons.

- <strong>However, things have changed a little in HTTP/2 which introduces multiplexing where multiple requests can be sent without having to wait for any response. Therefore, using multiple small requests in HTTP/2 would prove to be more bandwidth-friendly than using image sprites.</strong>

---

##### For using image sprite we should try to round up to nearly 10 pixels

- Especially when working with Photoshop. We should also use simpler figures so that it will be easy to use ‘snap-to’ grids in photoshop, in addition to keeping things organized.

---

##### The .content property is a read-only property i.e a DocumentFragment that contains guts of the template.

---

##### <strong>template </strong> does not include <strong> src</strong> attribute

```js
- <template> only includes global attributes.
- id, hidden, lang, onsubmit, ontoggle, onwaiting, onplay, onmousemove, onmousedown, onblur, oncancel,
oncanplay, onabort, title, etc. are some of the global attributes.
```

---

##### On a desktop, the <strong>template</strong> element is supported by most of the browsers like Chrome, Edge, Opera, Safari, Firefox.

- <strong>Internet Explorer does not support this element.</strong>
- On mobile, it is supported by Edge mobile, Firefox for Android, and iOS Safari.

---

##### <strong>The render() process creates the end result</strong> by putting actual data in the template.

- This means that the placeholders are replaced with the actual data;
- <strong>compile()</strong> is used for translating and compiling a template into a JavaScript function.

---

##### templates can not be placed inside <strong>form</strong> element

```js
- Templates can be placed inside <body>, <head>, <frameset>.
- A template can contain any type of element.
- A template can be used as a child of <select> and <table> elements.
```
