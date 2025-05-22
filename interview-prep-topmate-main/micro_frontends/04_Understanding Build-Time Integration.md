## How and when does the Container get access to the source code in MFE #1 and #2?

### In general there are three different categories of integration
1. **Build Time** Configuration aka Compile-Time Integration
2. **Run-Time** Configuration aka Client-Side integration
3. **Server** Integration

- Whenever we hear about **build-time integration** 
  - we are saying that we are going to make sure that our container gets access to the products list source code **`before` the container is `loaded` in the browser**.
<br/>

- With **run-time** integration, 
  - container gonna get access to the products list and the cart source code **`after` the container is loaded in the browser**.


<img src="./imagesUsed/Build-Time_Integration.png">



#### We'll focussing on Build-Time and Run-Time as of now

---

### Build-Time Integration:

- Following is the one way to implement (but not the only way)
- We have one team in charge of developing the products-list application.
- At some point time they're gonna finish up their project and they proceed to deploy this project.
- So, the product lists team would publish products list as an NPM Package.
- This NPM package can be installed into another project

===

- Then the team in charge of container would install products list as a dependency (using npm install command)
- The container team then build up their application and the result of that would be a bundle that has all the source code for container and all the source code for products list.

===
- So, the bundle right there implies that we have one Javascript file that has all the source code for products list and container put together



<img src="./imagesUsed/Build-Time-Integration-1.png">

---

### Pros and Cons of Build-Time Integration



<img src="./imagesUsed/pros_cons_of_build-time-integration.png">
