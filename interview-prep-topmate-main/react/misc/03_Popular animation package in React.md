### Popular animation package in React

##### ReactCSSTransitionGroup:

- Is a high level API based on ReactTransitionGroup and is an **_easy way to perform CSS transitions and animations when a React component enters or leaves the DOM_**.
- It <u>**_has four components that display transitions from one component state to another_**</u> using a declarative API used for mounting and unmounting of components

1. Transition
2. CSSTransition
3. SwitchTransition
4. TransitionGroup

```js
import ReactCSSTransitionGroup from 'react-transition-group';

function TodoList(props) {
  const [items, setItems] = useState(['hello', 'world', 'click', 'me']);
  const handleAdd = () => {
    const newItem = prompt('Enter some text');
    if (newItem) {
      setItems((currentItems) => [...currentItems, newItem]);
    }
  };

  const handleRemove = (i) => {
    setItems((currentItems) => currentItems.filter((_, i) => i !== index));
  };

  const itemList = items.map((item, i) => (
    <div key={item} onClick={() => handleRemove(i)}>
      {item}
    </div>
  ));

  return (
    <div>
      <button onClick={handleAdd}>Add Item</button>
      <ReactCSSTransitionGroup
        transitionName='example'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {itemList}
      </ReactCSSTransitionGroup>
    </div>
  );
}
export default TodoList;
```

**Points to remember**:

- **Group Transition Management**: Instead of managing transitions for each list item individually, <u>ReactCSSTransitionGroup handles them as a group</u>. This is especially useful for dynamic lists like the TodoList, where items are frequently added and removed.
- **CSS Based Animations:**  The animations are defined in CSS, leveraging the transitionName prop