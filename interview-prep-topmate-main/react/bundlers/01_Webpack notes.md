### Webpack:

**1. Webpack is a module bundler for javascript applications**
**2. Webpack attempts to lighten the developer by doing the following things like:**

- <u>**_part of the development process that handled dependencies on its own_**</u>
- **_we could <u>simply write code in such a way that the build process managed by itself</u> based on only what was necessary in the end?_**
- So webpack attempts to make the build process easier <u>**_by passing dependencies through JavaScript_**</u>.
- In other words: <u>**you don’t write code for webpack. You write code for your project.**</u> And webpack keeps up (with some config).

If you're struggling with any of the following:

- Loading dependencies out of order
- Including **unused** CSS or JS in production
- Accidentally **double-loading** (or triple-loading) **libraries**
- Encountering **scoping issues**—both from CSS and JavaScript
- Finding a good system for using NPM packages in your JavaScript,
- Needing **to optimize asset delivery** better but fearing you’ll break something

Then you could benefit from webpack because it handles all the above effortlessly by letting JS worry about your dependencies and load order.

### Webpack’s Core Philosophy:

Two core philosophies of Webpack are:

1.  Everything is a module- Just like JS files can be "modules", everything else (CSS, Images, HTML) can also be modules.
    i) That is, you can require(“myJSfile.js”) or require(“myCSSfile.css”).
    ii) This mean **_we can split any artifact into smaller manageable pieces, reuse them_** and so on.

<br/>

2.  Load only "what" you need and "when" you need - Typically module bundlers take all the modules and generate a large single output "bundle.js" file.

    i) But in many real world apps, this "bundle.js" could be 10MB-15MB and could take forever to load!
    ii) So Webpack has various features to **split your code** and generate multiple "bundle" files, and also **load parts of the app asynchronously** so that you just load what you need and when you need it.

---


### Production vs Development builds

```json
//package.json

"scripts": {
  ...
  "build": "webpack --config webpack.prod.js",
  "build:dev": "webpack --config webpack.dev.js",
},
```

<img src="https://www.north-47.com/wp-content/uploads/2019/02/1_WCAdMi04IFEWdngK8bkFcw.png">

### webpack v4+ will minify your code by default in “production mode”.

---

For specifying another config file that our server should use before start:

```js
npx webpack-dev-server --config webpack.common.js
```

---

### Adding HTML file into the build

- Currently, we have `index.html` file in a `/public folder`.
- How can we move it to /build folder during webpack build?
- For this task, **we will need html-webpack-plugin** :

```js
npm install --save-dev html-webpack-plugin
```

##### webpack.common.js

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*9dJrki6J0xp_GpqXYbwQYg.jpeg">

- you can see index.html in a /build folder, is the same copy of index.html in /public folder
- If we set inject:true and Run npx webpack -- config webpack.dev.js

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*mLCI3r1KAuQmNWvQIw5qoQ.jpeg">

##### will add path to our bundle.js file into our "template" — index.html file.

- Path that is injected -> is a combination of output.publicPath and output.filename props in our webpack.commom.js config file.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*s3lsfzyqPijsi6ppNoxksg.jpeg">

---

### CSS + Style Loader

- Now we would like to import a handy reset CSS file to our index.html so that at the beginning all our styles were the same for all browsers (as you know each browser uses their own default styles).

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*XbA3uk8JgCAOubx9zjKGxg.jpeg">

- Remember that **_webpack can only understand JavaScript_**, so we’ll have to install the appropriate loader:

```js
npm install --save-dev css-loader style-loader
yarn add --dev css-loader style-loader
```

##### After that, we should add new configuration to webpack.common.js file:

##### Now, let’s run a new build npx webpack — config webpack.dev.js and see at the results:

```js
//webpack.config.js or webpack.common.js
// Loaders are processed in reverse array order. That means css-loader will run before style-loader.
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // …
    ],
  },
};
```

---

### CSS bundled separately

- We can do that easily by swapping out `style-loader` with `extract-text-webpack-plugin` in our config **without having to change any code**

```js
npm install --save-dev mini-css-extract-plugin
yarn add mini-css-extract-plugin -D
```

```js
const ExtractTextPlugin = require('mini-css-extract-plugin');
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
          ],
        }),
      },

      // …
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
  ],
};
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZGvo1ZDenB6ztTKLBREccg.jpeg">

##### Rerun npx webpack — config webpack.prod.js :

- And our final touch would be CSS file minimizing.

```js
npm install --save-dev optimize-css-assets-webpack-plugin
// or
yarn add optimize-css-assets-webpack-plugin -D
```

Rerun `npx webpack — config webpack.prod.js`

---

### Adding assets to the build

```js
npm install --save-dev file-loader
```

And after that, we will need to add a new configuration object to module.rules webpack config:

#### Rerun npx webpack — config webpack.prod.js

```js
"scripts": {
  ...
  "eject": "react-scripts eject"
},

// If you will run it, you will see the whole webpack.config.js file that is used.
```

---

### CSS Modules

- typically works best only if you’re building the DOM with JavaScript, but in essence, it magically scopes your CSS classes to the JavaScript file that loaded it

- If you plan on using it, CSS Modules comes packaged with css-loader

```js
yarn add --dev css-loader
```

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
      // …
    ],
  },
};
```

---

### Sass

```js
yarn add --dev sass-loader node-sass
```

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'], //the order of use is backward, so we’re loading Sass first, followed by our CSS parser, and finally Style loader to load our parsed CSS into the <head> of our page.
      },
      // …
    ],
  },
};
```

---

---

### Working with Multiple Files:

- You can specify any number of entry/output points you wish by modifying only the entry object.

```js
// Multiple files, bundled together
const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./home.js', './events.js', './vendor.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', //all bundled together as one dist/app.bundle.js file, in array order.
  },
};
```

```js
// Multiple files, multiple outputs
// Alternately, you may choose to bundle multiple JS files to break up parts of your app.
// This will be bundled as 3 files: dist/home.bundle.js, dist/events.bundle.js, and dist/contact.bundle.js.

const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    home: './home.js',
    events: './events.js',
    contact: './contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};
```

#### Vendor Caching:

- If you want to separate your vendor libraries into their own bundle so that users don’t have to re-download your third-party dependencies every time you make a minor app update,
- You can easily do that thanks to webpack’s built-in Commons Chunk Plugin:

```js
const webpack = require('webpack');
module.exports = {
  entry: {
    index: './index.js',
    vendor: ['react', 'react-dom'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', //make sure vendor in CommonsChunkPlugin matches the 'vendor' entry name above, it can be anything as long as it matches an entry key.
      minChunks: Infinity,
    }),
  ],
};
```

- In this, you’re explicitly telling webpack to **use your vendor bundle as a commons chunk** containing your react and react-dom Node Modules for the entire app.
- In larger applications where optimization is key, this can yield better results if you limited your vendor bundle like this.

**Note**:

- By doing this, <u>**you should load vendor before app in your template**</u>. webpack will often emit something like this:

---

### Thinking in Modules

- In order to get the most out of webpack, you’ll have to **think in modules**—small, reusable, self-contained processes that do one thing and one thing well.

```js
└── js/
    └── application.js   // 300KB of spaghetti code
```

```js
└── js/
    ├── components/
    │   ├── button.js
    │   ├── calendar.js
    │   ├── comment.js
    │   ├── modal.js
    │   ├── tab.js
    │   ├── timer.js
    │   ├── video.js
    │   └── wysiwyg.js
    │
    └── index.js  // ~ 1KB of code; imports from ./components/

```

- The result is clean, reusable code.
- Each individual component depends on import-ing its own dependencies, and export-ing what it wants to make public to other modules.
- Pair this with Babel + ES6, and you can utilize JavaScript Classes for great modularity, and don’t-think-about-it scoping that just works.

---


#### Q) webpack CLI Vs webpack-dev-server

- Webpack provides two interfaces

1. Webpack CLI tool - the default interface (installed as part of the Webpack itself)
2. webpack-dev-server tool - we need to install it separately

### Webpack CLI tool (Good for Production Builds)

- This tool **_takes options via CLI and also via a config file_** (default: webpack.config.js) and gives it to the Webpack for bundling.

```js
//Install it locally & add it to package.json
npm install webpack --save
//Add it to package.json's script
“scripts”: {
 “build”: “webpack --config webpack.config.prod.js -p”,
 ...
 }
//Use it by running the following:
"npm run build"
```

### Webpack-dev-server (Good for Development Builds)

- This is an Express node.js server that runs at port 8080. This server internally calls Webpack.
- The benefit of this is that it provides additional capabilities like **reloading the browser** i.e. “Live Reloading” and/or replacing just the changed module i.e “Hot Module Replacement” (HMR).

```js
// Add it to package.json's script

“scripts”: {
 “start”: “webpack-dev-server --inline --hot”,
 ...
 }
// Use it by running
$ npm start
Open browser at:
http://localhost:8080
```

#### Points to remember:

- It’s worth noting that **_some of the options like “inline” and “hot” are webpack-dev-server only_** options. Where as **_some others like “hide-modules” are CLI only_** options.

- The other thing to note is you can pass options to webpack-dev-server in two ways:

1. Through webpack.config.js’s “devServer” object.
2. Through CLI options

```js
//Via CLI
webpack-dev-server --hot --inline
//Via webpack.config.js
devServer: {
 inline: true,
 hot:true
 }
```

Most preferable is to pass options as CLI options within package.json like so:

```js
//package.json
{
scripts:
   {“start”: “webpack-dev-server --hot --inline”}
}
```

#### “hot” Vs “inline” webpack-dev-server options

- “inline” option adds “Live reloading” for the entire page.
- “hot” option enables “Hot Module Reloading” that tries to reload just the component that’s changed (instead of the entire page).
- If we pass both options, then, when the source changes, the webpack-dev-server will try to HMR first. If that doesn’t work, then it will reload the entire page.

```js
//When the source changes, all 3 options generates new bundle but,

//1. doesn't reload the browser page
$ webpack-dev-server


//2. reloads the entire browser page
$ webpack-dev-server --inline


//3. reloads just the module(HMR), or the entire page if HMR fails
$ webpack-dev-server  --inline --hot

```

#### “entry” — String Vs Array Vs Object

- `Entry` tells the Webpack where the root module or the starting point is.
- This can be a String, an Array or an Object. This could confuse you but the different types are used for different purposes.

- Entry tells the webpack where the root module or the starting point is.
- This can be a String, an Array or an Object.
- Different types are used for different purposes.

##### If you have a single starting point (like most apps), you can use any format and the result will be the same

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*OnXpfv4zjL-5zO2Ha6mXDw.png">

---

#### entry — Array

- If you want to **append multiple files that are NOT dependent on each other**, you can use the Array format.

- For example: you may need “googleAnalytics.js” in your HTML. You can tell Webpack to append it to the end of the bundle.js like so:

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xB51RRC4ik6BBP2lJ90Iuw.png">

---

#### entry — object

- Now, let’s say y**ou have true multi-page application, not a SPA** w/ multi-views, but with multiple HTML files (index.html and profile.html).
- **_You can then tell Webpack to generate multiple bundles at once_** by using <u>entry object.</u>

- The below config will generate two JS files: indexEntry.js and profileEntry.js that you can use in index.html and profile.html respectively.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xB51RRC4ik6BBP2lJ90Iuw.png">

##### Usage:

```js
//profile.html
<script src=”dist/profileEntry.js”></script>
//index.html
<script src=”dist/indexEntry.js”></script>
```

#### Note: The name of the file comes from the “entry” object’s keys.

---

#### entry — combination

- You can also use the Array type entries inside an entry object.
- For example the below config will generate 3 files: vendor.js that contains three vendor files, an index.js and a profile.js.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*yz76QY1fVzBGKJ-6X6Eleg.png">

---

### output — “path” Vs “publicPath”

- output tells the Webpack where and how to store the resulting files.
- “path” simply tells the Webpack **where it should store the result**.
- “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*63Zta4mbC_3o44QdycrD7Q.png">

- For example, in your CSS, you may have a url to load ‘./test.png’ on your localhost.
- But in production, the ‘test.png’ might actually be located at a CDN while your node.js server might be running on Heroku.
- So that means, you’ll have to manually update the URLs in all the files to point to the CDN when running in Production.
- Instead, you can use Webpack’s publicPath and use bunch of plugins that are publicPath-aware to automatically update URLs when generating production builds.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*aOM5ZF8alWLr4BC0CfZe0w.png">

---

### Loaders And Chaining Loaders

- Loaders are additional node modules that help ‘load’ or ‘import’ files of various types into browser acceptable formats like JS, Stylesheets and so on.

- Further loaders also allow importing such files into JS via “require” or “import” in ES6.
- For example: You can use babel-loader to convert JS written in ES6 to browser acceptable ES5 like so:

```js
module: {
 loaders: [{
  test: /\.js$/, ←Test for ".js" file, if it passes, use the loader
  exclude: /node_modules/, ←Exclude node_modules folder
  loader: ‘babel’ ←use babel (short for ‘babel-loader’)
 }]
```

---

### Chaining Loaders ( works right to left)

- Multiple Loaders can be chained and made to work on the same file type.
- The chaining works from right-to-left and the loader are separated by “!”.
- For example, Let’s say we have a CSS file “myCssFile.css” and we want to dump it’s content into <style>CSS content</style> tag inside our HTML. We can accomplish that using two loaders: css-loader and style-loader.

```js
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nes9iLmskmsD8Fp4Ek3u-A.png">

- Webpack searches for CSS files dependencies inside the modules. (That is Webpack checks to see if a JS file has “require(myCssFile.css)”)
- If it finds the dependency, then the Webpack gives that file first to the “css-loader”
- css-loader loads all the CSS and CSS’ own dependencies (i.e @import otherCSS) into JSON. Webpack then passes the result to “style-loader”.
- style-loader to take the JSON and add it to a style tag — `<style>CSS contents</style>` and inserts the tag into the index.html file.

---

### Loaders Themselves Can Be Configured

- Loaders themselves can be configured to work differently by passing parameters.
- In the example below, we are configuring url-loader to use DataURLs for images less than 1024 bytes and use URL for images that are larger than 1024 bytes.
- We can do this by passing “limit” parameter in the following two ways:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*-qVdcA3E8JSdtszxHqfIdA.png">

---

### The .babelrc file

babel-loader uses “presets” configuration to know how to convert ES6 to ES5 and also how to parse React’s JSX to JS.

- We can pass the configuration via “query” parameter like below:

```js
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    },
  ];
}
```

#### However in many projects babel’s configuration can become very large.

- So instead you can keep those them in babel-loader’s configuration file called .babelrc file.
- babel-loader will automatically load the .babelrc file if it exists.

##### So in many examples, you’ll see:

```js
//webpack.config.js
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }
  ]
}

//.bablerc
{
 “presets”: [“react”, “es2015”]
}
```

---

### Plugins

- Plugins are additional node modules that usually work on the resulting bundle.
- For example, `uglifyJSPlugin` takes the bundle.js and minimizes and obfuscates the contents to decrease the file size.
- Similarly `extract-text-webpack-plugin` internally uses css-loader and style-loader to gather all the CSS into one place and finally extracts the result into a separate external styles.css file and includes the link to style.css into index.html

```js
//webpack.config.js
//Take all the .css files, combine their contents and it extract them to a single "styles.css"
var ETP = require("extract-text-webpack-plugin");

module: {
 loaders: [
  {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
  ]
},
plugins: [
    new ExtractTextPlugin("styles.css") //Extract to styles.css file
  ]
}
```

- If you want to just inline CSS as a style element into HTML, you can do that without the extract-text-webpack-plugin and by just CSS and Style loaders like below:

```js
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]

```

---

### Loaders Vs Plugins

- As you might have realized, **Loaders work at the individual file level** during or before the bundle is generated.

- Where as **Plugins work at bundle or chunk level and usually work at the end of the bundle generation process**.

- And some Plugins like `commonsChunksPlugins` go even further and modify how the bundles themselves are created.

---

### Resolving File Extensions

- Many Webpack config files have a resolve extensions property that has an empty string like shown below.

- The empty string is there to help resolve imports without extensions like: require(“./myJSFile”) or import myJSFile from ‘./myJSFile’ without file extensions.

```js
{
 resolve: {
   extensions: [‘’, ‘.js’, ‘.jsx’]
 }
}
```

---

### Enable HMR Method — Via NPM Module

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZOs6q4rBU-z4Twydb3U2IA.png">

---

### A Simple React App

##### In order to enable HMR for CSS and React modules, all you need to do is to add the following loaders.

```js
npm install react-hot-loader --save-dev
npm install style-loader --save-dev
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*b1ZsT5kifDjS-8xyrv5rRA.png">

---

### “/hot/only-dev-server” Vs “/hot/dev-server”

- They both are simple JS libraries and provide HMR interface for webpack-dev-server’s client JS(part of WDS) that’s also loaded into the browser

##### You can use just one of them. The main difference is as follows:

1. only-dev-server doesn’t reload the browser upon syntax errors. This is recommended for React apps because it keeps the state.

2. dev-server tries HMR (default). If there is any issue, it reloads the entire browser.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*GFhX4gqYYNW0kJK4Rm8eDQ.png">

### A React App With Backend API calls (proxy)

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*DKdz2Fz5AkMib3vpK8t6BA.png">

### A React App With Backend Server That’s BOTH API AND Web Server

##### The solution is to proxy everything with a “\*” star.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*tfzP054lcZ_7t6E9LVsQ5g.png">

---

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*lQy2FdfWzKv9o1-HoTp6og.png">
