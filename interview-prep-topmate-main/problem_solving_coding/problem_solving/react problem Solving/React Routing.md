
## Handle routing in your React application.

This example uses `react-router-dom`:

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={HomeComponent} />
        <Route path='/about' component={AboutComponent} />
        <Route path='/contact' component={ContactComponent} />
        <Route render={() => <h1>404: Page Not Found</h1>} />
      </Switch>
    </Router>
  )
}
```
