## Introduction to Asset Modules

- A **new feature introduced** in Webpack 5.
- Allows you to easily use asset files in your JS application **without installing additional dependencies.**
- However, <ins>**you still need to make changes to your Webpack Configuration**</ins> in order to tell Webpack (on how to import those asset files)

```js
- Various kinds of images, fonts or plain text files.
- All these files can be processed by Webpack using asset modules
```

### There are 4 types of asset modules

```js
1. asset/resource
2. asset/inline
3. asset
4. asset/source
```

### 1. asset/resource
   - **`emitting` your files into the `output` directory**
   - Webpack will automatically copy them to your output directory and **return the URL to the file** in your code.
   - Can be **used to import `large` images or large font files**
  
### 2. asset/inline
- inline a file into the bundle as a data URI.
- Used when importing small asset files like SVG
- Usually SVGs are injected into the JS bundle as data URI (that is why we are using asset/inline for this)
- Doesn't generate a new file into the output directory.

### 3. asset
- Serves as a combination of the previous two asset types
- Here, Webpack will automatically choose between asset resource/asset inline 
- If the file size is less than 8 KB, then this file will be treated as inline asset module
- If it is more than 8 KB, then the file will be treated as a resource asset module.


### 4. asset/source
- Sometimes you just need to import some plaintext data as a Javascript string.
- You can use asset source module type in order to import such kind of data as asset/source
- Import the source code of the file as it is, and injects it into the Javascript bundle as a string of text.
