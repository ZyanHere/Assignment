
## Run-Time Integration
1. We have an engineering team that develops the ProductsList application
2. They would eventually decide that it's time to deploy their application.
3. Rather than deploying as a npm package, they would bundle up their project and deploy it to some static URL
```js
//static URL
https://my-app.com/productslist.js
```
4. So this javascript file over here (productslist.js) has all the source-code for the ProductsList application.
5. So, whenever the user navigates to my-app.com, we would load up the Container app and at that point in time, the container app would then fetch that productslist.js and executes it.

<img src="./imagesUsed/run-time-integration.png">


---

#### So notice that in this approach, the `container` only gets the access to the source code of `ProductsList.js` <ins>after the container has been loaded into the browser</ins>

---

### <ins>Pros and Cons of Run-Time Integration</ins>:

1. The big Upside is that we can independently deploy ProductsList application at any time without having to re-deploy the container.
2. Another big Upside is we can easily have different live versions of the ProductsList application.
3. So, we might be doing testing on those two versions and it is up to the container to decide which of the two versions to use.
4. The downside to the approach is that the tooling and the setup for it is way more complicated.

<img src="./imagesUsed/run-time-integration-1.png">


---

### We will be focussing on Run-Time Integration and we are going to implement this using <ins>Webpack Module Federation</ins>

----

### Why this approach ?

- This is the most performant and flexible around right now.
- We have to spend a lot of time focussing on Webpack and how it works

----

### Q1) In the context of micro-frontends, what does `integration` mean ?
<details>
<summary>Solution</summary>
Integration refers to how different parts of a microfrontend get assembled together
</details>

----

### Q2) Primary difference between `Build-Time` Integration and `Run-Time` Integration ?
<details>
<summary>Solution</summary>
- Build-Time Integration give the container access to a child app's source code before it is loaded in the browser.
- Run-Time configuration give the container access to a child app's source code after it is loaded in the browser.
</details>

---
