### Pure Component

<ins>**React.PureComponent**:</ins> 
- Indeed, React.PureComponent being its implementation of `shouldComponentUpdate` with **shallow props and state comparison**. 
- This means it <ins>***only re-renders when there is a change detected in its state or props through shallow comparison***</ins>.

<ins>**Shallow Comparison:**</ins> 
- The shallow comparison **checks if the primitive values are the same and if the references to objects are the same**. 
- It <ins>**does not deeply compare object contents**</ins>, which means if an object's property changes but the object reference remains the same, the component will not re-render.

<ins>**Use in Class Components**: </ins>
- **React.PureComponent** is specifically **designed for class components**. 
- It ***provides a way to optimize performance by avoiding unnecessary re-renders*** when the data structures are immutable or when changes do not actually impact the rendered output.

<ins>**When Not to Use PureComponent:**</ins> 
- If a **component involves children that depend on global state** or if the props passed to the component are likely to have different objects or arrays with the same content, using PureComponent might prevent necessary re-renders. 
- In such cases, careful consideration or alternative optimization strategies like **React.memo** with custom comparison functions for function components, or **explicitly implementing shouldComponentUpdate** for class components, might be more appropriate.


```js
import React, { Component } from 'react';

class RegularComponent extends Component {
    render() {
        console.log('RegularComponent render');
        return <div>Regular Count: {this.props.count}</div>;
    }
}
```

```js
import React, { PureComponent } from 'react';

class PureComp extends PureComponent {
    render() {
        console.log('PureComponent render');
        return <div>Pure Count: {this.props.count}</div>;
    }
}
```