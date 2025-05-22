### LocalStorage with Expiration

**_Approach Taken:_**

- maintain a timeouts object to store keys
- function returns an object, in this object we have 4 methods (getItem, setItem, removeItem, clear)
- getItem(key) simply use the window.localStorage.getItem(key), if this true then JSON.parse(item)
- removeItem(key) simply checks if timeouts[key] is true, if yes then clearTimeout(timeouts[key]) and delete timeouts[key]. also write the core logic of this (window.localStorage.removeItem(key))
- clear() method, does a loop based on the Object.keys(timeoutsObj).forEach(clearTimeout)
  timeouts = {}
  window.localStorage.clear()
- core logic is setItem

```js
const myLocalStorage = function () {
  let timeouts = {};

  const manageTimeout = (key, maxAge) => {
    if (timeouts[key]) {
      clearTimeout(timeouts[key]);
      delete timeouts[key];
    }

    if (maxAge > 0) {
      timeouts[key] = setTimeout(() => {
        window.localStorage.removeItem(key);
        delete timeouts[key];
      }, maxAge);
    } else if (maxAge === 0) {
      window.localStorage.removeItem(key);
    }
  };

  return {
    getItem(key) {
      let item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem(key, value, maxAge) {
      window.localStorage.setItem(key, JSON.stringify(value));
      //invoke a function
      manageTimeout(key, maxAge);
    },
    removeItem() {
      manageTimeout(key, maxAge);
    },
    clear() {
      Object.keys(timeouts).forEach(clearTimeout);
      timeouts = {};
      window.localStorage.clear();
    },
  };
};

window.myLocalStorage = myLocalStorage();
window.myLocalStorage.setItem('test1', 'testValue1', 5000);
window.myLocalStorage.setItem('test2', 'testValue2', 8000);
window.myLocalStorage.setItem('test3', 'testValue3', 10000);

console.log(window.myLocalStorage.getItem('test3'));
```
