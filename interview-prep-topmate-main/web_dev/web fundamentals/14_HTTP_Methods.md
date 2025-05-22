## Post vs put

#### i) POST Method
- **Purpose**: 
  - The POST method is **used to <ins>create a new resource on the server**</ins>.
- **Idempotence**: 
  - POST is a non-idempotent method. This means that multiple identical POST requests <ins>**can result in different outcomes**</ins> or the creation of multiple entries.
- **Usage**: 
  - You would use POST **when you want <ins>to add a new entry to a database**</ins>. 

- *For example*, 
  - <ins>adding a new user to an application</ins>, 
  - <ins>submitting a form</ins>, 
  - <ins>or uploading a file</ins>.
- **Data Handling**: 
  - Data sent via POST is typically <ins>**included in the body of the request**</ins>. 
  - This can be in various formats such as `JSON`, `FormData`, `XML`, etc.

```js
// EXAMPLE OF POST REQUEST (fetch and promises)

fetch('https://api.example.com/items', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'New Item',
        description: 'Detailed description here'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```


```js
// EXAMPLE OF POST REQUEST (axios and async-await)

// Import axios
import axios from 'axios';

async function createNewItem() {
    try {
        const response = await axios.post('https://api.example.com/items', {
            name: 'New Item',
            description: 'Detailed description here'
        });
        console.log('Created Item:', response.data);
    } catch (error) {
        console.error('Error creating item:', error);
    }
}

// Call the function to execute the POST request
createNewItem();
```

----

#### ii) PUT Method
- **Purpose**: 
  - The `PUT` method is used <ins>**to update an existing resource or create a new resource if it does not exist**</ins>, at a specific URL.
- **Idempotence**: 
  - `PUT` <ins>is an `idempotent` method</ins>. 
  - This means that **making multiple identical PUT requests will <ins>always result in the same state of the resource</ins>** after the requests are made, essentially updating the resource.
- **Usage**: 
  - Use `PUT` <ins>**when you are updating an entire resource or replacing it entirely**</ins>. 
  - For example, 
    - <ins>updating a user's profile information</ins> 
    - <ins>or replacing the contents of a file</ins>. 
- **Data Handling**: 
  - Like POST, <ins>the data for PUT requests is also typically **included in the body of the request**</ins>.

```js
fetch('https://api.example.com/items/123', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Updated Item',
        description: 'Updated description here'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```


```js
// EXAMPLE OF POST REQUEST (axios and async-await)

// Import axios
import axios from 'axios';

async function updateItem() {
    try {
        const response = await axios.put('https://api.example.com/items/123', {
            name: 'Updated Item',
            description: 'Updated description here'
        });
        console.log('Updated Item:', response.data);
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

// Call the function to execute the PUT request
updateItem();
```