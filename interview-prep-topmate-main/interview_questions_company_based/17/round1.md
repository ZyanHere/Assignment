1. what is call, apply bind
2. explain the concept of currying and write the example of currying mul(1)(2)(3)
3. what is closure 
4. o/p 3+2+"7"
5. o/p []==[]
 
6. find the duplicates from the below array
```js
let books = [
{ title: "C++", author: "Bjarne" },
{ title: "Java", author: "James" },
{ title: "Python", author: "Guido" },
{ title: "Java", author: "James" },
];
```
7. write the polyfill for map and multiply the array elements with 2
8. what is Box Model
9. what is diff between display none & hidden
10. what is class and functional comp and difference between them
11. what is state in a component
14. how to use map method inside react jsx importance of key property?

------

## 15. Optimization techniques used in your project (HTML, CSS, JS, React, Browser)?

<details>

### HTML Optimization
#### 1. Minification:
   - **Minify HTML files** to reduce their size 
     - by removing unnecessary characters, 
       - such as spaces, 
       - line breaks, 
       - comments.

#### 2. Lazy Loading:
- **`Implement`** lazy loading for **`images`** and **`iframes`** to improve initial load time.

#### 3. Semantic HTML: 
- Use semantic HTML tags to **`improve`** **`accessibility`** and **`SEO`**.

----

### CSS Optimization

#### 1. Minification and Compression: 
   - Minify CSS files and use compression to reduce file size.

#### 2. Critical CSS: 
   - Extract and inline critical CSS to **`ensure`** that above-the-fold content is **styled `immediately`**.
#### 3. CSS Preprocessors: 
   - Use pre-processors like SCSS to organize and optimize CSS code.
#### 4. Remove Unused CSS: 
   - Use tools like **`PurgeCSS`** to remove unused CSS.
#### 5. CSS Modules: 
   - Implement CSS Modules to scope CSS to components, **`avoiding` global namespace pollution**.

----

### JavaScript Optimization

#### 1. Minification and Compression: 
  - Minify JavaScript files and use compression to reduce file size.
#### 2. Code Splitting: 
  - Use code splitting **<ins>to load only the JavaScript needed for the current page**</ins>.

#### 3. Tree Shaking: 
- **Remove `unused` code** with tree shaking, especially when using ES6 modules.

#### 4. Defer and Async Loading: 
- Use **`defer`** and **`async`** attributes for script tags to load JavaScript without blocking rendering.

#### 5. Caching: 
- Implement caching strategies to **`reduce`** the need for re-downloading unchanged files.

#### 6. Avoid Inline JavaScript: 
- Keep JavaScript in external files to enable caching and reduce HTML size.

----

### React Optimization
#### 1. React.memo: 
- Use React.memo to **prevent `unnecessary` re-renders** of functional components.

#### 2. PureComponent: 
- Extend from React.PureComponent for class components to avoid re-renders when props and state haven't changed.

#### 3. useCallback and useMemo: 
- to memoize functions and values.

#### 4. Dynamic Import: 
- Use dynamic imports for components to enable code splitting.

#### 5. Virtualize Long Lists: 
- Use libraries like **React Virtualized** or **React Window** for rendering long lists efficiently.

#### 6. Optimizing Reconciliation: 
- **`Avoid`** creating new objects and arrays inside render methods to minimize reconciliation efforts.

----

### Browser Optimization
#### 1. Browser Caching: 
- Use caching headers like **`Cache-Control`** and **`ETag`** to leverage browser caching.

#### 2. Service Workers: 
- Implement service workers **to cache assets** and **enable `offline`** functionality.

#### 3. CDN: 
- Use Content Delivery Networks (CDN) **to `serve` static assets** from locations closer to the user.

#### 4. HTTP/2: 
- Enable HTTP/2 to take advantage of **`multiplexing`** and **`server push`** for <ins>**faster asset delivery**</ins>.

#### 5. Preload and Prefetch: 
- hints to <ins>**load critical resources</ins> `faster`**.

#### 6. Reducing HTTP Requests: 
- Combine files and reduce the number of HTTP requests.

---

### General Best Practices
#### 1. Responsive Design: 
- Ensure the application is responsive and performs well on all devices.

#### 2. Image Optimization: 
- Optimize images using appropriate formats (e.g., WebP), compression, and responsive images.

#### 3. Font Optimization: 
- Use efficient web fonts and consider font loading strategies (e.g., font-display).

#### 4. Monitoring and Analytics: 
- Implement performance monitoring tools like 
  - Lighthouse, 
  - New Relic,
  - Google Analytics to track performance and identify bottlenecks.

#### 5. Testing: 
- Regularly test performance and functionality using tools like Jest and React Testing Library (RTL).
<summary>
View Answer
</summary>
</details>

------

1.  fetch the data from the https://jsonplaceholder.typicode.com/users using React
2.  Difference between Local storage, session storage, cookies 
3.  Difference between null and undefined
4.  Center the div using CSS
5.  Code for merging two arrays and sorting
6.  Code for Custom hook to fetch the data in React JS
7.  Code for the creating Chessboard using React JS