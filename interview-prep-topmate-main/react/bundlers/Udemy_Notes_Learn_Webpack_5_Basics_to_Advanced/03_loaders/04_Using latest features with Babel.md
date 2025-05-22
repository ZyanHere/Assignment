# Importing JavaScript Files and Using Modern JavaScript Features with Babel


## **Importing JavaScript Files**
- **No Additional Loader Needed:**
  - JavaScript files can be imported directly without any additional loader.
  - Example: Importing `hello-world-button.js` into `index.js` works out of the box.

---

## **Why Do We Need Additional Loaders?**
- JavaScript is based on the **Ecmascript specification**, which evolves over time.
- New Ecmascript features take time to be implemented in all major browsers.
- **Challenge:** Developers want to use new features immediately, without waiting for browser support.

### **Solution**
- Use tools to convert modern JavaScript into older versions supported by all major browsers.
- **Tool of Choice:** Babel, the most popular JavaScript compiler.

---

## **Introducing Babel**
- **What is Babel?**
  - A JavaScript compiler used in almost every modern application.
  - Converts modern JavaScript features into older versions for compatibility.

---

## **Example: Using Class Properties**
1. **Refactoring Code:**
   - Take the CSS class of the button and move it to a **class property**.
   - Example:
     ```javascript
     class HelloWorldButton {
         buttonCssClass = 'hello-world-button';

         render() {
             const button = document.createElement('button');
             button.className = this.buttonCssClass;
             document.body.appendChild(button);
         }
     }
     ```

2. **Error Without Babel:**
   - Class properties are not supported by most browsers yet.
   - Running Webpack throws an error:
     > "You may need an appropriate loader to handle this file type."

---

## **Setting Up Babel Loader**

### **Steps:**
1. **Add a Rule for JavaScript Files:**
   - Configure Webpack to apply the Babel loader to all `.js` files, except those in the `node_modules` folder.

   ```javascript
   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ['@babel/preset-env'],
                       plugins: ['@babel/plugin-proposal-class-properties']
                   }
               }
           }
       ]
   }
   ```

2. **Install Required Packages:**
   - Install Babel core and necessary plugins:
     ```bash
     npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties
     ```

3. **Preset and Plugins:**
   - **Presets:**
     - `@babel/preset-env`: Compiles modern JavaScript (ES6, ES7, etc.) down to ES5.
   - **Plugins:**
     - `@babel/plugin-proposal-class-properties`: Enables the use of class properties.
   - Additional plugins can be added for other modern JavaScript features.
> However, I would like to mention that all major browsers have already added support for class properties. 
> - Nowadays this feature works out-of-the-box, and you don't have to include **@babel/plugin-proposal-class-properties** separately in your Webpack configuration.

> However, in the case of handling any kind of **non-standard JavaScript features** (not only class properties). 
> - For example, if you want to use pipeline operator |> in your code, then you still need to configure Babel for your application as well as add a special Babel plugin named **@babel/plugin-proposal-pipeline-operator** that adds support for this feature.

---

## **Testing the Configuration**
1. **Run Webpack:**
   - Execute Webpack to build the project.

2. **Check the Browser:**
   - Open the application in the browser.
   - Verify that everything works as expected.

### **Verification Example:**
- The class property for the button works.
- No errors are thrown, and the application behaves as expected.

---

## **Conclusion**
- Learned how to use **Babel** with Webpack to:
  - Enable modern JavaScript features.
  - Ensure compatibility with all major browsers.
- **Key Takeaway:** Babel and Webpack allow developers to use the latest JavaScript features even before they are widely supported.

Congratulations on successfully integrating Babel into your Webpack workflow!

