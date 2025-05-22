## Microfrontend ?

- I first want to imagine that we are building **e-commerce application**
  
<img src="./imagesUsed/ecommerceApp.png">


- Our e-commerce application has two separate pages to it, 
  - a page to <ins>**list out all the different products**</ins> we have for sale, 
  - and then <ins>**another page to show a shopping cart**</ins>.
<br/>

- Let's imagine that we are **building an application** like this <ins>**using a classic approach**</ins> where we have one single single page application. 
  - We might build this using React/Vue/Angular. 
  - As all the code for our entire application is in <ins>**one single code base**</ins> we might **`refer`** to this as a <ins>**monolithic single page application**</ins>
<br/>

<img src="./imagesUsed/monolithic.png">




- If we wanted to turn this **monolithic** into a **Micro-frontend** application we will try to **`identify`** the each distinct and major feature inside of our app (ex: Product Listing Page, Shopping Cart Page)
<br/>


<img src="./imagesUsed/distinctFeatures.png">



- After identifying each of these major features, 
  - we can then **`split`** <ins>**each of them into their own separate code base**</ins>. 
  - So we might **have all the code for our `product listing` <ins>inside of one single page application**</ins> using React, Vue, Angular, or whatever else. 
  - We might **have all the code for our `shopping cart` <ins>inside of a totally separate application**</ins>.

----

### TIME FOR DOUBTS ?

- if a user clicks on this **"Add To Cart"** button **on Feature 1**, 
  - we clearly have some kind of need to **add this product to this Shopping cart** listing page over Feature 2.

**Solution:** 

- We try to <ins>**prevent direct communication between these two distinct projects**</ins> (as much as possible)

<img src="./imagesUsed/preventDirectCommunication.png">

- We would instead have our product listing application, <ins>**make some kind of request to an API**</ins> that manages all the data inside the users shopping cart. 
  - And then whenever a user loads up the shopping cart application to see their products that they've added to their cart, 
  - the **shopping cart app would <ins>make a request that same API, and get a listing of all the products</ins> that is in their cart**.

<img src="./imagesUsed/apiCalls.png">


- You notice that we do not have any kind of direct communication between these two smaller applications.


----

## SUMMARY:

- So Microfrontends are where **we take a `monolithic` application and we `divide` it into <ins>multiple smaller applications**</ins>. 
- Each of these smaller applications **are `responsible` for <ins>one distinct major feature of our product**</ins>. 
- As much as possible, **we try to `prevent` these `different` micro applications from `communicating` <ins>with each other directly**</ins>.