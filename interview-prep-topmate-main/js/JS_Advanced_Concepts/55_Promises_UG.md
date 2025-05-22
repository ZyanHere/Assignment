### Promise is an object representing the eventual completion or failure of an asynchronous operation.

- pending : initial state, neither fulfilled or rejected
- fulfilled: operation completed successfully
- rejected: operation failed

---

### Create a simple Promise

<details>
<summary>Solution</summary>

```js
const promise1 = Promise.resolve("Welcome to the World ");
promise1.then((data) => {
  console.log("Promise success" + data);
}).catch(error){
    console.log('Promise failed' + error)
}
```

</details>

---

### Create a simple Promise that resolves after 3 seconds

<details>
<summary>Solution</summary>

```js
const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('Welcome to Jumanji')
    },3000)
})
promise.then((data) => {
  console.log("Promise success" + data);
}).catch(error){
    console.log('Promise failed' + error)
}
```

</details>

---


### Guess in which order the logs are executed

```js
console.log('Before Promise starts')
const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('Welcome to Jumanji')
    },3000)
})
console.log('After Promise starts')
promise.then((data) => {
  console.log("Promise success" + data);
}).catch(error){
    console.log('Promise failed' + error)
}
console.log('After Promise ends')
```

<details>
<summary>Solution</summary>

```js
Before Promise Starts
After Promise starts
After Promise ends
Welcome to Jumanji

```

<strong>Note:</strong> Even if you change the timer value to 0 instead of 3000ms (you won't see the change in order of execution, this is because of Event Loop/Js Engine execution)

</details>

---

### Promise chaining in real-time scenario Example:

```js
function one() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
  return promise1
}

function two() {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })
  return promise2
}

function three() {
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
  return promise3
}

async function test() {
  try {
    // Sequentially calling api one after the other
    const resp1 = await one()
    const resp2 = await two()
    const resp3 = await three()
    const output = resp1 + resp2 + resp3
    console.log("Response is" + output)

    // Calling api's in parallel
    const output1 = await Promise.allSettled([one(), two(), three()])
    console.log("Response is" + JSON.stringify(output1))
  } catch (error) {
    console.log("Error is" + error)
  }
}

test()
```

---

### Guess the console.log order of exectuion

```js
async function testPromise1() {
  return Promise.resolve(1)
}
async function testPromise2() {
  return Promise.resolve(2)
}
async function testPromise3() {
  return Promise.resolve(3)
}

async function test() {
  console.log("Before async await")

  const num1 = await testPromise1()
  const num2 = await testPromise2()
  const num3 = await testPromise3()
  console.log(num1 + num2 + num3)
  console.log("After async await")
}
console.log("Before calling test")
test()
console.log("After calling test")
```

<details>
<summary>Solution</summary>
Before calling test

Before async await
After calling test
6
After async await

</details>

---

What are promises ?

<details>

- `Promises` are a fundamental concept in `asynchronous` programming, 
- A `Promise` represents a placeholder for the eventual result of an asynchronous operation. 
- Essentially, <ins>**it's an object that encapsulates the state of an operation that will complete at some point in the future, either `successfully` or with an `error`**</ins>.

#### Key Features of Promises:
- `States`: A promise can be in one of three states:
- `Pending`: The **initial state** of the promise. The operation has not completed yet.
- `Fulfilled`: The operation **completed** successfully, and the promise now holds the resulting value.
- `Rejected`: The operation **failed**, and the promise holds the reason for the failure.
- `Immutability`: Once a promise resolves to either a fulfilled or rejected state, **it cannot change its state again**. 
  - The value or the rejection reason it holds becomes immutable, and all further attempts to `resolve` or `reject` it are ineffective.

#### Creating a Promise:
```js
let promise = new Promise((resolve, reject) => {
    // Asynchronous operation code
    setTimeout(() => {
        if ("operation_successful") {
            resolve("Data retrieved");
        } else {
            reject("Error occurred");
        }
    }, 2000);
});
```
```js
//USAGE OF PROMISES (DON'T FORGET THIS😁)

promise.then((data) => {
    console.log(data);  // Handle success
}).catch((error) => {
    console.error(error);  // Handle error
});
```
<summary>
View Answer
</summary>
</details>
