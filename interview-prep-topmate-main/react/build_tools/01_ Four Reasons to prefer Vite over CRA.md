- CRA was go-to-tool for a long time but we see <ins>**increased build time when the project size increases**</ins>.
- This slow feedback loop affects dev's productivity and happiness.

- <strong>Unlike CRA, `Vite` <ins>_doesn't build your entire application before serving, instead it builds the application on demand_</ins>.
- `Vite` leverages the <ins>power of native ES Modules, `esbuild` and `Rollup` to improve the dev and build time</ins></strong>

#### 1. Why is CRA slow?

- CRA uses Webpack under the hood.
- <strong>The webpack bundles the entire application code before it can be served.</strong>
- With a large codebase, it takes more time to spin up the dev server and reflecting the changes takes a long time
- <ins>All the **_code must be bundled_** in order to start a bundle-based dev server.</ins>

#### 2. Features of Vite?

**1. <ins>Fast Cold Start:**</ins>

- Vite significantly **_reduces the startup time_** for development servers <ins>**_by using esbuild for pre-bundling dependencies_**. </ins>

**2. <ins> Hot Module Replacement (HMR):**</ins>

- It features an efficient Hot Module Replacement (HMR) system that updates the code in the browser as developers make changes to the files, **_without needing a full reload_**.

**3. <ins> Built-in TypeScript Support:**</ins>

- Vite **_provides out-of-the-box support for TypeScript_**, allowing developers to use TypeScript in their projects without the need for additional setup or plugins.

**4. <ins> Modern JavaScript Support:**</ins>

- It is **_designed to take full advantage of native ES modules in the browser_**, enabling developers to work with the latest JavaScript features without compatibility concerns.

**5. <ins> Optimized Production Builds:**</ins>

- For **production builds**, <ins>**_Vite uses Rollup_**</ins>, a powerful module bundler, <ins>to generate highly optimized static assets</ins>.
- This results in efficient, production-ready applications with smaller bundle sizes and faster load times.

**6. <ins> Plugin System:**</ins>

- Vite has a rich plugin ecosystem, supporting a wide range of plugins that extend its functionality, from integrating CSS pre-processors like Sass and LESS to enabling advanced features like image optimization and SVG handling.

---
