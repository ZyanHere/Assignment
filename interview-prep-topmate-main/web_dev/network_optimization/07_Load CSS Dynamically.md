## How would you load CSS dynamically ?

#### 1. Create a Link element:

- Create a new link element in Javascript. This element is used for linking CSS files

```js
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
```

#### 2. Set the href attribute:

- Set the href attribute of the link element to the URL of the CSS file you want to load dynamically.

```js
link.href = 'path/to/your/cssfile.css';
```

#### 3. Append to the Head:

- Append the link element to the <head> of your document. This will cause the browser to load and apply the CSS.

```js
document.head.appendChild(link);
```

#### 4. Handling Cross-Browser Compatibility:

- Ensure that your script is compatible with multiple browsers. Most modern browsers support the above method, but for older browsers, you might need to include polyfills or fallbacks.

#### 5. Event Listeners for Load and Error:

- Optionally, add event listeners for load and error events to handle the CSS loading success or failure.

```js
link.onload = function () {
  console.log('CSS Loaded Successfully');
};
link.onerror = function () {
  console.log('Error Loading CSS');
};
```

#### 6. Use of Promises for Asynchronous Loading:

-You can also wrap the loading process in a Promise to manage asynchronous loading of CSS. This is useful when you need to ensure that the CSS is fully loaded before executing certain parts of your JavaScript code.

```js
function loadCSS(url) {
  return new Promise((resolve, reject) => {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject();
    document.head.appendChild(link);
  });
}
```

#### 7. Caching Considerations:

Be aware of browser caching. If the CSS file changes frequently, you might need to use **_cache-busting_** techniques, <u>**_such as appending a query string to the CSS file URL_**.</u>

#### 8. Performance Considerations:

- Dynamically loading CSS might have performance implications. Ensure that it does not lead to unnecessary repaints or reflows, and consider its impact on the Critical Rendering Path.

#### 9. Security Considerations

- When loading CSS from external sources, consider the security implications. Ensure that the sources are trusted to avoid security risks like CSS Injection.

#### Example Code:

```js
// cssLoader.js:
// Utility function to load CSS dynamically
export function loadCSS(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`CSS failed to load at: ${url}`));

    document.head.appendChild(link);
  });
}
```

```js
//app.js

import { loadCSS } from './cssLoader.js';

// Assuming this is your application's entry point
function initApp() {
  loadCSS('path/to/your/cssfile.css')
    .then(() => {
      console.log('CSS loaded successfully');
      // Proceed with application initialization
      renderApp();
    })
    .catch((error) => {
      console.error('Error loading CSS:', error);
      // Handle the error appropriately
    });
}

function renderApp() {
  // Application rendering logic
}

initApp();
```

```js
// cssLoader.test.js:
import { loadCSS } from './cssLoader.js';

describe('CSS Loader', () => {
  it('should load a CSS file successfully', async () => {
    document.head.innerHTML = ''; // Reset head
    await expect(loadCSS('path/to/valid.css')).resolves.toBeUndefined();
    // Additional checks can be made here, e.g., verifying the link element is added to the head
  });

  it('should fail to load a non-existent CSS file', async () => {
    document.head.innerHTML = ''; // Reset head
    await expect(loadCSS('path/to/invalid.css')).rejects.toThrow();
  });
});
```