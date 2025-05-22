### Cancel API requests using Axios in Javascript

- API call cancellation involves <u>**_aborting an ongoing HTTP request before it completes._**</u>
- This becomes important <u>**_in scenarios where the user navigates away from a page_**</u>, switches components, or perform other actions that render the previous request obsolete.
- **_By cancelling the request_**, <u>_we can prevent unnecessary processing on the server_</u> and free up resources.
- Additionally <u>**_setting a timeout allows us to automatically cancel the requests that take too long to complete_**</u>, preventing them from adversely affecting the user experience.

### Scenario 1: API Request has become obsolete(means no longer used)

<h4>Step 1: <u>Create a Cancel Token</u></h4>

- To enable cancellation, you need to <u>**_create a cancel token using the CancelToken constructor_**</u> provided by `Axios`.

```js
const source = axios.CancelToken.source();
```

<h4>Step 2: <u>Send the API request</u></h4>

- Make the API call using Axios and pass the `cancelToken` option with the created cancel token

```js
axios
  .get(YOUR_URL, {
    cancelToken: source.token,
  })
  .then((res) => {
    //setData(res)
  })
  .catch((err) => {
    if (axios.isCancel(error)) {
      console.log('Request Cancelled', error.message);
    } else {
      console.log('Error', error.message);
    }
  });
```

<h4>Step 2: <u>Cancel the API request</u></h4>

- **_To cancel the ongoing API request_**, call the `cancel` function on <u>the source object</u>

```js
source.cancel('Request cancelled due to user action');
```

##### By calling `source.call()`, <u>the ongoing request will be aborted</u>, and the <i><u>corresponding catch block will handle the cancellation</u></i> with axios.isCancel(error)

### Scenario 2: API Request took too much time to respond

- Include a `timeout option in your API request`
- `API call will get cancelled automatically` once the timeout expires (only in-case the API hasn’t responded till then).

```js
axios.get(URL,{
    cancelToken: source.token,
    timeout: 2000 //in ms
}).then((res)=>{
//setData(res)
}).catch((err))=>{
if(axios.isCancel(err)){
    //log err.message saying Request is cancelled
}else if(err.code === 'ECONNABORTED'){
    // timed out
}else{
// log the err.message
}
}
```
