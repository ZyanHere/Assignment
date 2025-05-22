### Portals in React

- Portals provide a quick and seamless <ins>way to render children into a DOM node</ins> <ins>**_that exists outside the DOM hierarchy of the parent component_**</ins>
- ***Offer a powerful and unique way to <ins>manage child components</ins>***, particularly when you need to break out of the typical DOM hierarchy for modal dialogs, pop-ups, or tooltips.
<br/>

- A portal in React is a first-class <ins>***way to render children into a DOM node that does not follow the parent-child relationship</ins> in the DOM hierarchy***. 
<br/>

- This means <ins>***you can render a child component into a completely different part of the DOM as if it were a direct child of the parent component</ins>***.

```js
ReactDOM.createPortal(child, container);

// child is the React element, JSX, or component you want to render.
// container is the DOM element to which the child will be appended.
```

**Features**:
- **Seamless Integration**: Even though the child is rendered to a different part of the DOM, **it behaves as if it's part of the React tree of the parent component**. This means it can still manage state and lifecycle methods as usual.
- **Event Bubbling**: <ins>***Events fired from inside a portal will bubble up through the React parent***</ins>, even though the portal might be placed at a different location in the DOM tree.

**Advanced Features**:
- **Targeting a Specific DOM Element**: Instead of appending the portal's children to the document body by default, you can specify any DOM element as the target container.
<br/>
- **Support for Server-Side Rendering**: Portals support server-side rendering. The content of the portal can be rendered on the server along with the rest of your app.
<br/>

- **Returning Arrays**: With React 16 and above, you can return arrays of elements from a component's render method, eliminating the need for extra wrapper divs. This feature is particularly useful when working with portals, as it allows for more flexible DOM structure.
<br/>

**When to use**:

- Modals
- Tooltips
- Floating menus
- Widgets

**Conclusion**


- React Portals provide an efficient and flexible way to render components outside the regular DOM hierarchy, maintaining the component's behavior and lifecycle.
<br/>

- This feature is particularly useful for UI patterns that require elements to break out of the normal document flow, such as modals, tooltips, and notifications. 
<br/>

- By leveraging portals, developers can maintain a clean and logical structure in their React applications, even ***when the UI demands complex positioning and layering***.

---

```js
//Example
import React from 'react';
import ReactDOM from 'react-dom';

// Modal component as a functional component
const Modal = ({ children }) => {
  // Use ReactDOM.createPortal to render the children into a different part of the DOM
  return ReactDOM.createPortal(
    // The children passed to Modal
    children,
    // Target container in the DOM
    document.getElementById('portal-root')
  );
};

// App component as a functional component
const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      <Modal>
        <div className="modal">
          <p>This is rendered in a portal</p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
```

---

Now, open the index.html file **and add a element to access the child component outside the root node**.

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App using Portal</title>
  </head>
  <body>
    <noscript>It is required to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="portal-root"></div>
  </body>
</html>
```
