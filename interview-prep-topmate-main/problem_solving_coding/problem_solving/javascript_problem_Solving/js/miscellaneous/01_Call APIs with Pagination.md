### Call APIs with Pagination

```js
// Have you ever met some APIs with pagination, and needed to recursively fetch them based on response of previous request ?

// Suppose we have a /list API, which returns an array items.

// fetchList is provided for you
const fetchList = (since?: number) =>
  Promise<{items: Array<{id: number}>}>

// for initial request, we just fetch fetchList. and get the last item id from response.
// for next page, we need to call fetchList(lastItemId).
// repeat above process.
// The /list API only gives us 5 items at a time, with server-side filtering, it might be less than 5. But if none returned, it means nothing to fetch any more and we should stop.
// You are asked to create a function that could return arbitrary amount of items.
```

```js
const fetchListWithAmount = async (amount = 5) => {
  const result = [];

  while (result.length <= amount) {
    const lastItem = result[result.length - 1];
    //If it's the first iteration and there's no lastItem, it fetches from the beginning.
    const { items } = await fetchList(lastItem?.id);
    result.push(...items);
    if (!items.length) {
      break;
    }
  }

  return result.slice(0, amount);
};
```
