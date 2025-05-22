## Pub-Sub Implementations

**Approach Taken**

1. maintain an object (ex: topics)
2. we have two methods inside a function, one is subscribe, another is publish
3. during subscribe we check if topics[topic] is not present create it as a array
4. for index, we are pushing the listener (which is param2) inside the topics[topic] array, and we have to do -1
5. this subscribe function returns an object which has remove method, so for remove simply delete topics[topic][index]
6. now for publish method, simple perform forEach loop and for each topic pass that info
7. finally to make these two methods to be accessed, return them (ex: return{subscribe, publish})

```js
const createPubSub = () => {
  const topics = {};

  const subscribe = (topic, listener) => {
    if (!topics[topic]) topics[topic] = [];

    // push returns 1, so index looks like 1 - 1 = 0
    const index = topics[topic].push(listener) - 1;

    return {
      remove: () => {
        delete topics[topic][index];
      },
    };
  };

  const publish = (topic, info) => {
    if (!topics[topic] || topics[topic].length < 1) return;

    // during looping, each and every item or listener is the callback function that is passed as a 2nd argument
    topics[topic].forEach((listener) =>
      listener(info !== undefined ? info : {})
    );
  };

  return {
    subscribe,
    publish,
  };
};

// Example Usage
const pubSub = createPubSub();

const subscription = pubSub.subscribe('example', (data) => {
  console.log(`Received data: ${JSON.stringify(data)}`);
});

pubSub.publish('example', { message: 'Hello, World!' });

// To unsubscribe
subscription.remove();
```

**topics[topic][index]** looks like below:
![image](https://github.com/saiteja-gatadi1996/interview_prep/assets/42731246/fcc36022-011f-48de-b6ab-a6c2efb72424)
