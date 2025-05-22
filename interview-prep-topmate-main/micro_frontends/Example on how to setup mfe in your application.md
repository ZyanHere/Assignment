
### Explanation of Microfrontend Architecture

1. **Microfrontend Overview**  
   My application adopts a microfrontend architecture contain three distinct microfrontends:
   - **Main Microfrontend (Host)**: Serves as the primary container.
   - **Search Microfrontend (search-mfe)**: Responsible for search-related features.
   - **Content Microfrontend (content-mfe)**: Handles content-related functionality.

2. **Main Microfrontend (Host) Integration**  
   - The **main microfrontend** integrates the other two microfrontends (search-mfe and content-mfe) via URLs specified in a configuration file (`mfe.ts`).

```js
//mfe.ts in primary micro-frontend

// URLs of the microfrontend modules
export const MFE_CONFIG = {
  searchMFE: {
    url: 'https://search-example.dev.com/mfe_module.js',
  },
  contentMFE: {
    url: 'https://content-example.dev.com/mfe_module.js',
  },
};
```

   - These URLs point to the microfrontend module files, which are dynamically loaded into the main application.

3. **Search Microfrontend (search-mfe) Mounting**  
   - For the **search-mfe**, I use a custom mounting logic defined in the microfrontend's entry point.
   - Example:
     ```javascript
     // this code is in primary mfe (written in a SearchResults component)
     const mfeUrl = MFE_CONFIG['searchMFE'].url
     RTWebMFE.mount('search-results', mfeUrl,{

     }).then(()=>{

     });
     ```

 >Note: the first parameter you provide has to be the same in the search-mfe (ex: 'search-results')    
   - This method ensures that the search-mfe is loaded and initialized automatically upon page load.

4. **Content Microfrontend (content-mfe) Routing**  
   - For the **content-mfe**, its integration is handled through route-based logic in the `routes.ts` file using an `mfeId` identifier.
   - Example:
     ```javascript
        //routes.ts
        export const routes = [
            {
                path: '/homepage',
                exact: true,
                protected: false,
                mfeId: 'contentMFE' // responsible to load your mfe
            }
        ]
     ```
   - This ensures that the content-mfe is loaded dynamically when a route associated with it is accessed.

5. **Webpack Configuration**  
   - Both **search-mfe** and **content-mfe** have their own `webpack` configurations, where the entry point is defined as `mfe_module`.
   - Example:
     ```javascript
     // in search-mfe webpack.config.js
     // similarly you have to write for content-mfe
     entry: {
       mfe_module: './src/index.ts',
     },
     ```
   - This configuration generates the `mfe_module.js` file, which is hosted on respective URLs.

6. **Microfrontend URL Format**  
   - The microfrontends are served as JavaScript modules from dedicated URLs:

```js
// below are the URLs written in the mfe.ts file
- Search MFE: `https://search-example.dev.com/mfe_module.js`
- Content MFE: `https://content-example.dev.com/mfe_module.js`
```
   - These URLs are consumed by the main application to load the microfrontends dynamically.

---
