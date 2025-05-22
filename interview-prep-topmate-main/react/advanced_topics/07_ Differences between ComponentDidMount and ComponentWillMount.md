### componentDidMount():

- is **_executed after the first render_** <u>only on the client side</u>.
- This method is also used for functions with delayed execution (like API integration and also) such as setTimeout() or setInterval().

```js
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Alex Belfort',
    };
  }

  getData() {
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: 'Hello Alex',
      });
    }, 1000);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

export default App;
```

### componentWillMount():

- is **_executed before rendering, on both the server and the client side_**.
- This is the least used lifecycle method and called before any HTML element is rendered.
- Useful **_when we want to do something programmatically right before the component mounts_**

```js
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Alex Belfort',
    };
  }
  componentWillMount() {
    console.log('First this called');
  }

  getData() {
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: 'Hello Alex',
      });
    }, 1000);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

export default App;
```
