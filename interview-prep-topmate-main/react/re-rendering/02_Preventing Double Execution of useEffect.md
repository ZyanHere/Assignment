## Preventing Double Execution of useEffect

- It is important to be aware that React may sometimes trigger useEffect twice, which can lead to unintended behavior in your application.

- Usually when the dependencies changes the useEffect will trigger.

###### Let us see the reason why does useEffect trigger twice:

##### 1. Changing the state inside the effect

- If you change the state of your component inside the effect, React may trigger the effect again. This is because changing the state of a component causes the component to re-render which in turn triggers the effect.

```js
// noob way of setting the state

function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);

  return <div>{count}</div>;
}
```

- In the above code example it sets the state to its current value + 1, this effect will be triggered again and again causing infinite loop
- One way to fix this is functional form of setState (allows us to update the state based on its previous value)

```js
// pro way of setting the state
// functional form

function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return <div>{count}</div>;
}
```

##### 2. Using an empty dependency array

- If you pass an empty array as the second argument to useEffect, React will assume that there are no variable dependencies and should only be triggered once that is when compount is mounted.

```js
function Example() {
  useEffect(() => {
    console.log("component is mounted");
  }, []);
}
```

- However if you change the component's props or state react may still trigger the effect again, to fix this issue make sure that the dependencies array includes all the variables that the effect depends on:

```js
function Example({name}){
useEffect(()=>{
 console.log(`Hello ${name}`)
},[name])

```

##### Noob vs Pro

```js
//noob
function Example() {
  const [count, setCount] = useState(0);
  let timeoutid;

  useEffect(() => {
    timeoutId = setTimeout(() => {
      console.log(count);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count === 5) {
      clearTimeout(timeoutId);
    }
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

```js
//pro
function Example() {
  const [count, setCount] = useState(0);
  const [timeoutid, setTimeoutid] = useState(null);

  useEffect(() => {
    setTimeoutId(() => {
      console.log(count);
    }, 1000);

    // cleanup function
    return () => clearTimeout(timeoutId);
  }, [count, timeoutId]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
