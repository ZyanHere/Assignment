## How would you manage the state in a large-scale React application?

A simple example using Redux:

```javascript
// actions.js
export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
})

// reducers.js
const initialState = { items: [] }
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    default:
      return state
  }
}

// store.js
import { createStore } from 'redux'
import { itemsReducer } from './reducers'
export const store = createStore(itemsReducer)

// App component
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './actions'

function App() {
  const items = useSelector((state) => state.items)
  const dispatch = useDispatch()

  const handleAdd = (item) => {
    dispatch(addItem(item))
  }

  // Render logic here...
}
```