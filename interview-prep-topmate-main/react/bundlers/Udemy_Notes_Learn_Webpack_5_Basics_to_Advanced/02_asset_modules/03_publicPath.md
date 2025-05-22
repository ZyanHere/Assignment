## Public Path

- Tells the webpack on which URL to use in order to load all the generated files in the browser.


```js
- If you are using static files like images in your app, you can tell the browser 
from where there static files can be taken from using public path configuration.
```

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),

    //added below
    publicPath: 'dist/' 
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
};
```

- If your application loads assets from CDN, you can use something like below

```js
//added below
    publicPath: 'https:://some-cdn.com/' 
``