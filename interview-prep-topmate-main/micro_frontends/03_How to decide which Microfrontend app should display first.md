## How to decide which Microfrontend app should display first ?


<img src="./imagesUsed/containerApproach.png">



### In, MFE
<img src="./imagesUsed/designApproach.png">

## **Solution:**

- To coordinate where to show each of these different micro frontends on the screen and when to show each of them, <ins>**we very frequently end up creating a third micro frontend app**</ins>, that we usually refer to as the **`container`**. 
- The **`container`** is what <ins>**decides when and where to show all the different micro frontends that we have**</ins>.

<img src="./imagesUsed/containerApproach-1.png">


--- 

## SUMMARY:

- So to build up this little fake e-commerce store, **we're gonna end up making `three` small projects**. 
- We're gonna make this container app. 
- We're gonna make **micro frontend number one** to show a listing of products 
- and **micro frontend number two** to show the cart. 
- We're going to decide when and where to show each of these micro frontends by **`adding`** in a little bit of <ins>**logic to this container application**.</ins>
