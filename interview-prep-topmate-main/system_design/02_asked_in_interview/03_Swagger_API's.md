## Can you explain me how would you design API's from High Level architecture point of view. Similar to Swagger api designs

----
### <ins>Example Scenario</ins>: Designing an E-commerce Platform

### 1. API Endpoints:

### i) User Authentication:
  
```js
POST /auth/register: Register a new user.
POST /auth/login: Log in a user.
```


### ii) Product Management:

```js

GET /products: Get a list of products.
GET /products/{id}: Get product details.
POST /products: Create a new product (admin).
PUT /products/{id}: Update a product (admin).
DELETE /products/{id}: Delete a product (admin).
```
### ii) Cart Management:


```js
GET /cart: Get the current user's cart.
POST /cart: Add an item to the cart.
PUT /cart/{itemId}: Update the quantity of an item in the cart.
DELETE /cart/{itemId}: Remove an item from the cart.
```

----

### 2. JSON responses:

```js
// USERS
{
  "_id": "ObjectId",
  "username": "string",
  "password": "string",
  "email": "string",
  "role": "string" // "user" or "admin"
}
```

```js
// PRODUCTS
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "stock": "number"
}
```

```js
// CARTS
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": "number"
    }
  ]
}
```

----

### 3. API Endpoints in React.js

#### i) User Registration

```js
axios.post('/auth/register', payload);
axios.post('/auth/login', payload);

// Usage
const payload = { email: 'testuser@example.com', password: 'password123' };
```

#### ii) Products

```js
axios.get('/products');
axios.get(`/products/${productId}`);
axios.post('/products', payload);
axios.put(`/products/${productId}`, payload);
axios.delete(`/products/${productId}`);

// Usage
const payload = { name: 'New Product', description: 'Product description', price: 100, category: 'Category', stock: 10 };
```

#### iii) Carts

```js
axios.get('/cart')
axios.post('/cart', payload);
axios.put(`/cart/${itemId}`, payload);
axios.delete(`/cart/${itemId}`);

// Usage
const payload = { productId: '123456', quantity: 2 };
```

----