## How would you increase your application performance

#### It's good to have a strong understanding of CRP (Critical Rendering Path).

- **Reduce bundle size** (by minification, tree shaking, gzipping) etc;
- **async/defer js files** which are not critical for the business logic
- **lazy loading** + Suspense
- **Caching** (hash all the file names and cache them, and never cache the index.html file)
- **SSR**(Server Side rendering can vastly improve the load time, Speak about Next.js)
- **CDN** (Faster and closer CDN's can also speed up the first-time load)
- Code optimizations (**Blocking API calls** that could be made parallel)
- **Optimize Images and Media:** Large Image files can significantly slow down a website. Use **formats like Webp**, which provides superior lossless and lossy compression for images. **Use responsive images** that adjust for different screen sizes.
- **Efficient use of Web fonts:** Limit the number of font variations and use formats like WOFF2. Also consider using `font-display: swap` to ensure text is visible during font loading.
- **Reduce HTTP Requests**: Minimize the number of requests your site makes `by combining CSS and JS files`. and using `CSS sprites for images`.
- **Database optimization**: Optimizing queries, indexing and using efficient data fetching strategies can hav significant performance.
- **Service Workers for caching and offline support**: Service workers can cache content and serve it directly from the cache, reducing server load and speeding up loading times (especially for repeat visitors).
- **Monitoring & Analytics:** Use tools like **Google Lighthouse**, **GTmetrix** or **WebpageTest** to regularly monitor your website's performance and get actionable insights for improvements
- **Use of HTTP/2 or HTTP/3**- The newer version of HTTP offer performance improvements over old ones (such as latency and improved multiplexing).
- **Avoid inline css and js**: these can increase page size and hinder caching.
- **optimize server configuration:** tweaks like **setting up proper keep-alive headers**, **gzip compression**, **adjusting cache headers** can improve performance
- **Load Balancing**: if you're experiencing high traffic, implementing a load balancer can distribute traffic evenly across multiple servers, reducing the load on any single server.