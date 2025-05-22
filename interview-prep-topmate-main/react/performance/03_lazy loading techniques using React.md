## Lazy Loading using React


- Lazy loading allows us to load <ins><strong>only the components and media that are required for the initial render</strong></ins> of a page. 
- This reduces the amount of data that needs to be transferred and processed, ***which can lead to faster page load times***.

- `Lazy Loading` can be ***applied to individual components, such as <ins>images or to entire section of a page</ins>***.
<br/>

- `React.lazy` function is in-built function in React.js that **allows us to lazy load individual components**. <ins>***This function returns a new component that can be rendered in place of the original component.***</ins>
<br/>

- When the component is loaded, it will only load the necessary data for the initial render, and then defer the loading of the remaining data until it is actually needed.

##### Example using React.lazy function

- In this example, the LazyComponent is loaded using the React.lazy function.

- The component is wrapped in a Suspense component <strong>which provides a fallback component to be displayed while the component is being loaded</strong>

```js
import React, { lazy, suspense } from "react"

const LazyComponent = () => import("./LazyComponent")

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
export default App
```

---
