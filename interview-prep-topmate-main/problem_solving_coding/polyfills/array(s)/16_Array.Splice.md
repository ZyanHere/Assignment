### Array.splice

**Syntax:**

```js
splice(startIndex, deleteCount, item1, item2);

- Time complexity: O(n)
- Space complexity: O(n)
```

```js
if (!Array.prototype.customSplice) {
  Array.prototype.customSplice = function (start, deleteCount, ...itemsToAdd) {
    // if the start/index parameter is negative, then we start counting from the end of the array
    if (start < 0) {
      //So, we adjust it by adding it to the array's length
      start = this.length + start;
      // starting point doesn't fall before the beginning of the array
      if (start < 0) start = 0;
    }

    // If deleteCount is not provided or it exceeds the length after start
    if (deleteCount === undefined || start + deleteCount > this.length) {
      // we ensure to adjust the deleteCount goes up to the end of the array
      deleteCount = this.length - start;
    }

    // Separate items to delete and to remain
    const removedItems = this.slice(start, start + deleteCount);

    // Construct the updated array
    const updatedArr = [
      //Taking all elements before the start index.
      ...this.slice(0, start),
      //Adding in the new items we want.
      ...itemsToAdd,
      //Adding all elements after the elements we deleted.
      ...this.slice(start + deleteCount),
    ];

    //emptying the original array
    this.length = 0;
    for (let item of updatedArr) {
      // we are pushing items from our `updatedArr` into the originalArray to modify it in place.
      this.push(item);
    }

    return removedItems;
  };
}

// Test
let arr = [1, 2, 3, 4, 5];
let removed = arr.customSplice(2, 2, 'a', 'b', 'c');
console.log(arr); // [1, 2, 'a', 'b', 'c', 5]
console.log(removed); // [3, 4]
```
