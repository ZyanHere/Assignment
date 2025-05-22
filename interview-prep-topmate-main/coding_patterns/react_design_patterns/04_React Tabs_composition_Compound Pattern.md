**React Compound Pattern**

- Multiple components come together to serve a common functionality
- This pattern **makes use of React's composition model** to let **_<u>components share an implicit state and logic while still allowing the user to assemble them in various configurations</u>_**.
- Ex: Select tag where select and option jointly help us create dropdowns.
- React Context APIs plays an important role in Compound pattern
- Use cases like: select, dropdown components, menu items

```js
//App.jsx
import { useState } from 'react';
import Tab from './components/Tab';
export default function App() {
  const [currentIndex, setIndex] = useState(0);

  const handleChange = (newIndex) => {
    setIndex(newIndex);
  };
  return (
    <div className='App'>
      <Tab value={currentIndex} onChange={handleChange}>
        <Tab.Heads>
          <Tab.Item label={'Tab1'} index={0} />
          <Tab.Item label={'Tab2'} index={1} />
          <Tab.Item label={'Tab3'} index={2} />
        </Tab.Heads>
        <Tab.ContentWrapper>
          <Tab.Content index={0}>
            <h1>I am content 1</h1>
          </Tab.Content>
          <Tab.Content index={1}>
            <h1>I am content 2</h1>
          </Tab.Content>
          <Tab.Content index={2}>
            <h1>I am content 3</h1>
          </Tab.Content>
        </Tab.ContentWrapper>
      </Tab>
    </div>
  );
}
```

```js
//Tab.jsx
import { createContext, useContext } from 'react';
const TabContext = createContext();

export default function Tab({ children, value, onChange }) {
  return (
    <div>
      <TabContext.Provider value={{ value, onChange }}>
        {children}
      </TabContext.Provider>
    </div>
  );
}
Tab.Heads = ({ children }) => {
  return <div className='heads'>{children}</div>;
};

Tab.ContentWrapper = ({ children }) => {
  return <div className='contentWraper'>{children}</div>;
};

Tab.Item = ({ label, index }) => {
  const { value, onChange } = useContext(TabContext);
  return (
    <div
      onClick={() => onChange(index)}
      className={`item ${index === value ? 'active' : null}`}
    >
      {label}
    </div>
  );
};

Tab.Content = ({ children, index }) => {
  const { value } = useContext(TabContext);
  return value === index ? <div>{children}</div> : null;
};
```

```js
.heads {
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.item {
  background-color: red;
  color: white;
  padding: 10px;
  width: 100%;
  cursor: pointer;
}

.item.active {
  background-color: brown;
}

.contentWraper {
  background-color: grey;
  margin: 0;
  padding: 10px;
}
```
