### Re-render the view when the browser is re-sized

```js
import React, { useLayoutEffect, useState } from 'react';

//custom hook
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return (
    <span>
      Window size: {width} x {height}
    </span>
  );
}
```

--------------
## <ins>**useLayoutEffect Hook**</ins>: 

Here are some key points about useLayoutEffect:

- **Side Effects**: 
  - Like `useEffect`, `useLayoutEffect` is used for performing side effects in function components. 
  - Side effects are operations that affect other components or cannot be done during rendering, such as directly interacting with the `DOM`, `fetching data`, or `subscribing` to events.
<br/>

- **Synchronous Execution**: 
  - The primary difference between `useLayoutEffect` and `useEffect` <ins>***is when the function passed to them is executed***</ins>. 
  - `useLayoutEffect` <ins>**fires synchronously after all DOM mutations but before the browser has a chance to paint**</ins>. 
  - This makes it <ins>***suitable for updates that need to be visually synchronized to the layout changes***</ins>.
<br/>
- Signature: Identical to useEffect.


### **When to Use useLayoutEffect**
- <ins>**Visual Updates**:</ins> 
  - Use it for ***<ins>visual updates that need to be measured or done before the browser paints</ins>*** to avoid flickering or visual inconsistencies. For example, <ins>adjusting scroll positions, getting measurements of elements, or performing animations.</ins>
- <ins>**Reading Layout**:</ins> 
  - When you need to read the layout from the DOM and then make changes based on that. 
  - Using `useLayoutEffect` <ins>ensures you're **measuring the layout after all DOM changes** have occurred but before the browser has painted those changes, **reducing the risk of layout thrashing**.</ins>

### Differences from useEffect
- **Timing**: `useEffect` **fires after paint**, making it non-blocking for visual updates and better for non-urgent updates, like fetching data. 
- `useLayoutEffect`, however, **fires right after DOM updates, before the browser paints**, <ins>making it suitable for measurements or changes that need to be reflected immediately in the next paint</ins>.

## Example Use Case

- If you're building a ***component that needs to measure an element's dimensions <ins>right after it has been updated***</ins> (but before the user sees these updates), useLayoutEffect would be the appropriate choice. It ensures that your measurements and subsequent operations based on those measurements are done in the same visual update cycle, preventing flicker or visual jumps.