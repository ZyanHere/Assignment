## Iterator Pattern

- The Iterator Pattern is a **`behavioral`** design pattern

### Iterator Pattern Overview

- **Purpose**: To provide a standard **way to `access` elements in a collection `sequentially` `without` <ins>exposing the internal structure**</ins>.
- **Encapsulation**: The collection’s structure is hidden from the client; <ins>**only the iterator knows how to navigate the elements**</ins>.
- It **`abstracts`** the traversal process, making it easier to iterate over different types of collections in a uniform way.
 
> - **Real-World Example**: Think of a remote control that allows you to move sequentially through channels on a TV without knowing the internal configuration of those channels.

---

### Explanation:

- **Collection**: Represents a collection of items with an **`add`** method to add items to the collection.
- **Iterator**: Provides methods **`next()`** and **`hasNext()`** to sequentially access the elements without exposing the underlying collection structure.

```js
// Traditional Way

// Collection constructor function to represent a list of items
function Collection(items = []) {
  this.items = items; // The items in the collection
}

// Add item to the collection
Collection.prototype.add = function (item) {
  this.items.push(item);
};

// Iterator constructor function to provide sequential access to the collection
function Iterator(collection) {
  this.collection = collection; // Reference to the collection being iterated
  this.index = 0; // Starting index for iteration
}

// Method to get the next item in the collection
Iterator.prototype.next = function () {
  if (this.hasNext()) {
    return this.collection.items[this.index++];
  }
  return null;
};

// Method to check if there are more items to iterate over
Iterator.prototype.hasNext = function () {
  return this.index < this.collection.items.length;
};

// Usage example
const myCollection = new Collection();
myCollection.add('Apple');
myCollection.add('Banana');
myCollection.add('Cherry');

const iterator = new Iterator(myCollection);
while (iterator.hasNext()) {
  console.log(iterator.next());
}

// Output:
// Apple
// Banana
// Cherry
```

---

```js
// ES6 Implementation

// Collection class with iterable protocol
class Collection {
  constructor(items = []) {
    this.items = items;
  }

  // Method to add items to the collection
  add(item) {
    this.items.push(item);
  }

  // Define the iterator protocol for the Collection
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

// Usage example
const myCollection = new Collection();
myCollection.add('Dog');
myCollection.add('Cat');
myCollection.add('Bird');

// Using for...of loop to iterate over Collection
for (const item of myCollection) {
  console.log(item);
}

// Output:
// Dog
// Cat
// Bird
```

---

**Explanation**:

- **[Symbol.iterator]**: By implementing the Symbol.iterator method, we make the Collection object compatible with **for of loops** and other iterable operations, following JavaScript’s iterable protocol.
- In the return we are mentioning an object that implements the **`next()`** method, which **`returns { value, done }`** each time it’s called, making it compatible with ES6 iteration standards.

---

### Real-World Scenarios for Iterator Pattern

#### 1. Data Processing Pipelines:

> - For processing data chunks from a large dataset, an iterator can efficiently handle streaming data one piece at a time.
> - This is particularly useful for lazy evaluation, where data is only processed when needed, conserving memory.

#### 2. Tree Traversals in UI Components:

> - UI components like file explorers often need to traverse hierarchical data (e.g., folders and files).
> - An iterator can provide traversal over the tree structure without exposing how it’s structured, enabling in-order, pre-order, or post-order traversals.

#### 3. Pagination in Web Applications:

> - For paginated data (like a product catalog or search results), an iterator can fetch data in “pages,” allowing users to navigate through content without overloading the client with all data at once.
> - The iterator pattern here helps handle data retrieval seamlessly while maintaining a smooth user experience.

---

### Edge Cases in Iterator Pattern

#### 1. Empty Collections:

> - If the collection is empty, the iterator’s **`next()`** method should immediately **return { done: true }**.
> - Handling this case prevents errors in loops that expect some content.

#### 2. Modifying the Collection during Iteration:

> - Modifying the collection while iterating (e.g., adding or removing items) can lead to unexpected behavior.
> - To handle this, either create a “snapshot” of the collection at the start of the iteration or track changes to reset the iterator.

#### 3. Infinite Iterators:

> - Some iterators may not have a natural stopping point (e.g., generating random numbers indefinitely).
> - For these cases, include a stopping condition in the iterator or use additional code to control when to stop iteration.
