### 1. How would you achieve the output ?

```js
let mixin = {
    sayHi() {
        console.log(`Hello ${this.name}`);
    },
    sayBye() {
        console.log(`Bye ${this.name}`);
    },
};

class User {
    constructor(name) {
        this.name = name;
    }
}
let user = new User("John");
user.sayHi(); // Hello John
user.sayBye(); // Bye John
```

----

### 2. Will this code work ?
```js
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

class User extends f('Hello') {}

new User().sayHi();
```
----

### 3. HOC
- High-Order Components (HOCs) are an advanced pattern in React **for `reusing` component logic**. 
- They are functions that <ins>**take a component and return a new component**</ins>, effectively "wrapping" the original component with additional functionalities or data.
- Useful in **handling** cross-cutting concerns like
  -  `logging`, 
  -  `data fetching`, or 
  -  `state management interactions`.

#### q1) Why it is required?

- **Code Reuse**: 
  - HOCs allow you to **reuse common functionalities across multiple components**, reducing duplication and keeping your code DRY (Don't Repeat Yourself).
- **Abstraction and Isolation**: 
  - They help in abstracting complex logic and state interactions **away from the component** logic. 
  - This separation of concerns makes the base component simpler and focuses primarily on presenting the UI.
- **Prop Manipulation**: 
  - HOCs can abstract and manipulate props **before passing them down to the wrapped component**, allowing for more controlled and flexible component implementations.
- **Conditional Rendering**: 
  - They can be used to **conditionally render components** based on certain conditions or permissions, which is particularly **useful in scenarios like `authentication` and `authorization`**.

---

#### q2) How to write multiples HOCs in a regular component?

```js
// withUserData.js
import React, { useState, useEffect } from 'react';

const withUserData = WrappedComponent => {
  return function(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Simulate fetching user data
      const timer = setTimeout(() => {
        setUser({ name: "John Doe", id: "1" });
      }, 1000);

      // Cleanup timeout if the component unmounts
      return () => clearTimeout(timer);
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };
};


// withLogging.js
import React, { useEffect } from 'react';

const withLogging = WrappedComponent => {
  return function(props) {
    useEffect(() => {
      console.log('Component did mount or update', props);

      // Optionally: Add return function to mimic componentWillUnmount
      return () => {
        console.log('Component will unmount', props);
      };
    }, [props]); // You can adjust dependency array based on specific prop changes if needed

    return <WrappedComponent {...props} />;
  };
};
```

```js
import MyComponent from './MyComponent';
import withUserData from './withUserData';
import withLogging from './withLogging';

// Manual composition
const EnhancedComponent = withLogging(withUserData(MyComponent));
```

----

### 4. Why do we need constructors? can we create classes without constructors

- `Yes`, <ins>**you can create** classes without constructors</ins> in JavaScript
<br/>

- In JavaScript, <ins>if a class does not have a constructor explicitly defined, **it automatically uses a default constructor**</ins>.

#### 1. JavaScript Classes Without Constructors:

```js
// MyClass does not have a constructor, 
// but it can still be instantiated, and its method can be called.
class MyClass {
    method() {
        console.log('Hello, World!');
    }
}

const myInstance = new MyClass();
myInstance.method(); // Outputs: Hello, World!
```

#### 2. React Component Classes Without Constructors:
- Similarly, in React, <ins>**you can define class components without constructors</ins>**. 
- State and props can still be managed, though it's more common to see constructors used when there is a need to initialize state or bind methods.

---

### 5. How to implement pagination?

#### The best industry-grade approach for implementing pagination typically involves:

- **Backend Pagination**: 
  - The `server` handles the bulk of pagination logic, returning only the data necessary for the current page.
  - This `reduces` the amount of data transferred over the network and improves performance.

```js
// CORE LOGIC
app.get('/items', async (req, res) => {
  try {
    // Default to first page
    const page = parseInt(req.query.page) || 1; 
    // Default to 10 items per page
    const limit = parseInt(req.query.limit) || 10; 
    // skips the number of documents calculated by (page - 1) * limit 
    // This allows you to fetch only a subset of records appropriate for the current page.
    const skipIndex = (page - 1) * limit;

    const results = await Item.find()
      .sort({ _id: 1 }) // Sort by document ID (you can customize this)
      .limit(limit)
      .skip(skipIndex)
      .exec();

    const totalCount = await Item.countDocuments(); // Total count of items

    res.status(200).json({
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      items: results
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching data", error });
  }
});
```


- **Frontend Pagination**: 
  - The React application **maintains** the state for pagination (like `current page` and `items per page`),
  - <ins>requests the appropriate data from the server **based on this state**</ins>, and renders the data and pagination controls.


```js
// PaginatedItems.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaginatedItems = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items?page=${currentPage}&limit=${itemsPerPage}`);
        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Paginated Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            style={{ margin: '5px' }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedItems;
```



----

### 6. How the DOM will get updated?

#### JavaScript:
- is used to dynamically interact and update the DOM:

- **Direct DOM Manipulation**: 
  - JavaScript can directly alter the DOM by `adding`, `removing`, or `modifying` elements. 
  - This can be done using methods like `document.createElement`, `element.appendChild`, `element.removeChild`, and setting properties like `element.innerHTML`.

#### React:
- introduces a more structured way to manage DOM updates:

- **Virtual DOM**: 
  - React uses a Virtual DOM, a lightweight copy of the actual DOM. 
  - When a component’s state changes, **React creates a new Virtual DOM**, compares it with the previous one, and calculates the most efficient way to update the real DOM.
- **Components and State**: 
  - When the state or props of a component change, **React re-renders the component and updates the DOM** where necessary.
