## 1. Search key-value pairs in the nested Object with recursions
## 2. Create a functional component & display the list. They provided the array like ["Ava", "Anthony", "Baddon", "Baen", "Caley", "Caellum"]. I had to display those data as per image attached The implementation is similar to phone book. (Ex: Letter A and then sorted array elements in that, similarly for B and sorted B elements)
## 3. Write a wrapper component which counts number of times its child is clicked in React.

```js
// Need to check whether this code works
import React, { useState } from 'react';
 
const ClickCounterWrapper = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);
 
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };
 
  return (
<div>
<p>Number of clicks: {clickCount}</p>
<div onClick={handleClick}>{children}</div>
</div>
  );
};
 
export default ClickCounterWrapper;
```