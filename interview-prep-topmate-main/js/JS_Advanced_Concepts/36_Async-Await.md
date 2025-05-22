### With .then() and .catch()

```js
function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`Making Request to ${location}`)
    if (location === "Google") {
      resolve("Google says hi")
    } else {
      reject("We can only talk to Google")
    }
  })
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log("Processing response")
    resolve(`Extra Information + ${response}`)
  })
}

makeRequest("Google")
  .then((data) => {
    console.log("Response Received")
    return processRequest(data)
  })
  .catch((error) => {
    console.log(error)
  })
```

```js
// Below is printed on console
Making Request to Google
Response Received
Processing response
Extra Information + Google says hi

```

---

##### Q) Why "Google says hi" was not printed on console after "Making request to Google" is printed on console?

<details>
<summary>Solution</summary>

- Execution happens from this line <strong>makeRequest("Google").then()</strong>
- "Google" is passed as a parameter to the makeRequest function.
- Let's say if condition is successful and now it holds the resolve value
- This means <strong>makeRequest("Google").then()</strong> is successful and now it holds the value of if condition resolve ("Google says hi")
- From here we are calling processRequest function and resolving it.
- resolve inside processRequest function is considered as final because <strong>we are not doing processRequest.then()</strong> anywhere.

</details>

---

##### Q2) Guess the Print Order if we pass the param something else apart from "Google"(ex: "Facebook")

<details>
<summary>Solution</summary>

- Making Request to Facebook
- We can only talk to Google

<strong>Reason for above print order: </strong>

- Execution happens from this line <strong>makeRequest("Facebook").then()</strong>
- "Facebook" is passed as a parameter to the makeRequest function.
- if condition is failed now it holds the reject value
- This means <strong>makeRequest("Google").then()</strong> is failed and now it holds the value of else condition reject ("We can only talk to Google")
- So it goes to the catch condition and we are calling console.log(error);
- error value is reject value of else conditon

</details>

---

### With async/await

```js
function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`Making Request to ${location}`)
    if (location === "Google") {
      resolve("Google says hi")
    } else {
      reject("We can only talk to Google")
    }
  })
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log("Processing response")
    resolve(`Extra Information + ${response}`)
  })
}

async function doWork() {
  try {
    const response = await makeRequest("Google")
    console.log("Response Received")
    const processedResponse = await processRequest(response) // passing the response received as a parameter (if condition resolve value)
    console.log(processedResponse) // logging out the resolve of processRequest function ('Extra Information')
  } catch (error) {
    console.log(error)
  }
}

doWork()
```
