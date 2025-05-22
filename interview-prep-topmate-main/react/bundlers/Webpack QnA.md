
#### Q) What is a bundle in webpack?

- Bundle <u>**_is a output file generated_**</u> by webpack.
- It contains all of the modules which are used in application.
- Bundles **generation process is regulated by** <u>**_webpack config file_**</u>.

---

#### Q) What is a dependency graph and how does webpack build it?

- Any time one when file depends on another, webpack treats this as a dependency.

- <u>_Starting from entry point(s), webpack recursively builds a dependency graph_ that includes every module your application needs</u>, using import and require statements, <u>**_then packages all of those modules into bundle(s)_**</u>

---

#### Q) What is tree shaking?

- Tree shaking is a term used in the JavaScript world to describe **_the process of removing unused code from your final bundle_**.
- This <u>_can be done with a tool like Webpack_</u>, which will analyze your code and remove any unused pieces, <u>resulting in a smaller bundle size</u>.

---

#### Q) What is Hot-Modules-Replacement?

- is webpack feature which <u>allows to update modules in application **without page reload**</u>.

---

#### Q) Difference between NPM vs. Bower vs. Browserify vs. Gulp vs. Grunt vs. Webpack?

- `npm` and `bower` are package managers. **_They just download_** the dependencies and don't know how to build projects on their own.
  <br/>
- <u>They will call webpack/gulp/grunt **_after fetching all the dependencies_**.</u>
  <br/>

- <u>**_Bower builds flattened dependencies trees_**</u> (unlike `npm` which do it <u>**_recursively_**</u>).
  <br/>

- npm fetches the dependencies for each dependency (may fetch the same a few times) while <u>**_bower expects you to manually include sub-dependencies_**</u>.
  <br/>

- `grunt` and `gulp` <u>**_are task runners to automate everything_**</u> that can be automated (i.e compile CSS/Sass, optimize images, make a bundle and minify/transpile it)

  <br/>

- `webpack` (webpack-dev-server): Webpack <u>**_is a build tool that pulls all of your assets, including javascript, images, fonts and CSS in a dependency graph_**</u>

  <br/>

- `browserify` <u>**_allows packaging node modules_**</u> for browsers.

<u>**Points to remember:**</u>

- Sometimes `bower` and `npm` are used together in front end and back-end respectively (since each megabyte might matter on front-end)

  <br/>

- `Grunt` is <u>**_based on configuring separate independent tasks_**</u>, each task opens/handles/closes file.

  <br/>

- `Gulp` <u>**_requires less amount of code and is based on Node streams_**</u>, which allows it to build pipe chains (w/o reopening the same file) and makes it faster.

  <br/>

- `npm/bower` + plugins may replace task runners. Their abilities often intersect so there are different implications if you need to use gulp/grunt over npm + plugins.

- **_<u>Task runners are definitely better for complex tasks</u>_** (on each build create bundle, transpile from ES6 to ES5, run it all browsers emulators, make screenshots and deploy to dropbox through ftp)

- `browserify vs node's require` is actually `AMD vs CommonJS`.

---

### Loaders: <br />

#### Q) What is a loader in webpack?

- Loaders <u>**_are transformations that are applied_**</u> on the <u>source code of a module</u>.

  <br/>

- Loaders <u>**_describe to webpack on how to process non-javascript modules_**</u> and include these dependencies into your bundles

- A loader can refer to a preprocessor such as Sass, or a transpiler such as Babel.
- On NPM, they’re usually named `*-loader` such as `sass-loader` or `babel-loader`.

  <br/>

- <u>**_Webpack supports modules written in a variety of languages and pre-processors_**</u>, via loaders

---

#### Q) Where should loaders be defined?

- in the config's object's rules property

---

#### Q) Explain this code

```js
{
   test: /\.scss$/,
   loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap', 'postcss-loader'],
   exclude: /node_modules/
}

```

- This code is intended **<u>to transform and load SASS files as webpack modules</u>**.
- This config tells to webpack to search for all files <b><u>which have .scss extension from right to left order</u></b>

1. `postcss-loader`- transforms postcss to sass code.
2. `sass-loader` - transforms sass to plain css.
3. `css-loader`- reads css file, resolves import and url(...) statements.
4. `style-loader` - creates `style` tags in the page's `head` element containing css returned by css-loader.

5. `?.sourceMap`- source maps for all .scss files will be created.

---

#### Q) Do loaders work in a synchronous or an asynchronous way?

- **Both**.
- Loaders can work synchronous or asynchronous.

---

#### Q) Is it possible to use multiple loaders in the rules single object?

- Yes, its possible to chain loaders.

---

#### Q) Name loaders you think are very important and helpful

- raw-loader
- url-loader
- html-loader
- file-loader
- style-loader
- css-loader
- script-loader
- babel-loader
- loaders for typescript, coffeescript, less, sass, pug, markdown etc

---

### Plugins: <br />

#### Q) Describe a plugin in webpack

- Plugins used **_to customize webpack’s build process_** in a variety of ways.
- A webpack plugin **_is a JavaScript object that has an apply property_**.
- This **_<u>apply property is called by the webpack compiler</u>_**, giving access to the entire compilation lifecycle.
- Webpack comes with a multiple built-in plugins available under webpack.[plugin-name]

---

#### Q) What is the difference between loader and plugin

<u>**Loader:**</u>

- Loaders do the <u>**pre-processing transformation of virtually any file format**</u> when you use the sth like `require("my-loader!./my-awesome-module")`
- Exposes only one single function to webpack
- not able to influence the actual build process

<u>**Plugins:**</u>

- <u>**_Can deeply integrate into webpack because they can register hooks within webpack build system_**</u> and access and modify the compiler and how it works as well as the compilation.

- Therefore they are powerful but also harder to maintain

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*0pkzmVEIVpVjSnwARB-cwA.png">

---

#### Q) Name some plugins you think are very important and helpful

- **CommonsChunkPlugin**:

  - <u>**_Creates a separate file_**</u> (known as chunk), <u>consisting of common modules shared between multiple entry points.</u>

  <br />

- **DefinePlugin**:
  - <u>allows you to create global constants which can be configured at compile time</u>

<br/>

- **HtmlWebpackPlugin**:

  - <u>**_simplifies creation of HTML files_**</u> to serve your webpack bundles

    <br/>

- **ExtractTextWebpackPlugin**:
  - <u>Extract text from a bundle(s) into a separate file.</u>

<br/>

- **CompressionWebpackPlugin**:
  - <u>Prepare **_compressed versions of assets to serve them with Content-Encoding_**.</u>

---

#### Q) What is the advantage of CompressionPlugin?

- CompressionPlugin builds gzip-ed version of bundles.
- It's possible to simply add server side compression e.g using nginx or express compression plugin.
- Server-side compression is not recommended because it adds load on CPU and increases response time.

---

#### Q) How to move some data (e.g css code) from a bundle to a separate file in webpack?

- using ExtractTextWebpackPlugin.
- It moves all the required \*.css modules in entry chunks into a separate CSS file.
- So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css).
- If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.

#### Q) Is it possible to write your own plugin?

- Yes, its possible to write your own plugin and use plugins written by community.

#### Q) What are some advantages of using webpack-dev-server over simple http server or nginx?

- webpack-dev-server simplifies development process
- Due to **_integrated fast in-memory access to the webpack assets and hot-modules-replacement_** features.

#### Q) How to enable source maps in webpack bundles?

- Using devtool: `‘source-map’`

---

### Optimization

#### Q) Briefly describe long-term caching and how to achieve it using webpack?

- Browsers should cache static assets to save traffic and users time.
- But after each change or bugfix, browser have to download newer version of files.
- The most easy way to achieve this is changing file name.
- It could be buildId or unique hash in the end of file’s name like

```js
app.js?build=1
    app.js?build=2
```

or

```js
app.js.2a6c1fee4b5b0d2c9285.js
  app.js.70b594fe8b07bcedaa98.js
```

##### To achieve this using webpack simple configuration should be done

```js
module.exports = {
    ...
    output: {
     filename: "[name].[hash].js"
    }
    ...
   }

```

#### Q) Which built-in plugin should be used for code minification?

- UglifyJS plugin.

---

#### Q) How to remove unused selectors from css using webpack?

- purifycss-webpack plugin

---