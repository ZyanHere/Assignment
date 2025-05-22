### The biggest problem with these multiple scripts is that we need to remember the order
 - What if I had 100 of JavaScript files?
 - Maintaining such kind of a project would quickly become a nightmare.


### Luckily, Webpack can manage all those dependencies for us 
- and conveniently **bundle them into a single JavaScript bundle** 
- that includes all the code needed for the application.
- Now you **don't have to remember which module to include first**, which to include second, and so on.
- **Webpack will sort that out for you**, by the way, it doesn't have to be a single JavaScript bundle containing all your application code
- Webpack can generate multiple bundles depending on your needs.


----

### Let's install Webpack:

So, we will start with below steps in order to get Webpack installed

1. Generate a **`package.json`** for our application

```js
npm init -y
```
2. Now, install Webpack

```js
npm i webpack webpack-cli --save-dev 
```

----

### Please refer

https://github.com/saiteja-gatadi1996/webpack-basics-to-advanced/commit/fbb31ce89d4e44d9f84e32dc3f734be97b8d85ac