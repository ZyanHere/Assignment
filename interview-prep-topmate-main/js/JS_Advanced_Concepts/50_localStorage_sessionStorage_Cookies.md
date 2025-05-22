### Similarities:

- All three of them are stored on the user actual browser that they're using (ex: Google Chrome) whereas the information saved in one specific browser will not be available in another browser (ex: Firefox), so it is browser independent.

#### localStorage:

```js
localStorage.setItem("key", value)
localStorage.getItem("key")
localStorage.removeItem("key")
```

#### sessionStorage:

```js
sessionStorage.setItem("key", value)
sessionStorage.getItem("key")
sessionStorage.removeItem("key")
```

#### Cookies:

```js
document.cookie = "name=Sai; expires=" + new Date(9999, 0, 1).toUTCString()
document.cookie = "lastName=Teja; expires=" + new Date(9999, 0, 1).toUTCString()
```

#### To view the cookie:

```js
console.log(document.cookie)
```

<img width="833" alt="image" src="https://user-images.githubusercontent.com/42731246/213777251-b0938ab1-87c4-4c55-9baf-2a34d180105c.png">
