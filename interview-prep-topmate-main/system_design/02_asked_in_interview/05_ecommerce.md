## E-Commerce Website System Design
This can be a typical interview question you may encounter when interviewing for frontend engineer positions.
### Question Overview
**Design an e-commerce website that allows users to browse products and purchase them.**  
To approach this, let’s understand the functional and non-functional requirements.
---
### Functional Requirements
- **Able to browse products**
- **Adding products to cart**
- **Being able to checkout**
### Required Pages
- **Product List Page**
- **Product Details Page**
- **Cart Page**
- **Checkout Page**
---
### Non-Functional Requirements
- **Loading should take less than 2 seconds per page.** Interaction with the application should happen relatively quickly.
Since we are focused on the frontend portion of things, we won’t worry too much about designing the services behind the scenes. Rather, let’s focus on the components available:
- **Server**: This server will be focused on modifying product data, adding products to the cart, and submitting the list of products into a purchase order. How this is designed will be discussed in a future article about system design.
- **Controller**: Handle data flow between the application and server.
- **Client Store**: Some form of persistent storage needs to be maintained to allow data to be shared across the application.
---
### Rendering Approaches
To render this application, we have two routes to consider: **Server-Side Rendering (SSR)** or **Client-Side Rendering (CSR)**.
- **Server-Side Rendering (SSR)**: The rendering of the HTML for the application is handled on the server side. The completed HTML is sent to the client, which focuses on rendering the HTML.
  
- **Client-Side Rendering (CSR)**: The server sends an initial HTML template to the browser, which finishes the setup of HTML and renders it to the screen.
#### Pros and Cons of Each Approach
**Pros of Client-Side Rendering:**
- **Reduced Server Load**: The server does not need to handle the rendering work of the HTML since that is handled by the client.
- **Improved Interaction**: It’s easier for the application to make dynamic updates since HTML rendering is done on the client side, allowing for smoother user experiences without full-page reloads.
**Cons of Client-Side Rendering:**
- **Slower Initial Page Load**: The application requires extra time to download JavaScript and browser files before rendering the application, leading to a poorer user experience on devices with poor connections.
- **SEO Challenges**: CSR is less SEO-friendly, making it harder for search engine crawlers to prioritize an application that heavily relies on JavaScript rendering.
**Pros of Server-Side Rendering:**
- **Better Initial Load Time**: The client application does not need to dynamically inject data into the application and render it; all the work is handled by the server.
- **Better SEO**: Server-rendered HTML is easier to optimize for search engines, which is crucial for e-commerce applications to attract customers.
- **Better Security**: Sensitive data can be handled server-side, reducing exposure to client-side vulnerabilities.
**Cons of Server-Side Rendering:**
- **Increased Server Load**: The server has to perform more heavy lifting to handle business logic and render HTML.
- **Slower Navigation**: Navigating between different pages will be slower because each navigation requires a full re-rendering of the application.
---
### Data Models
- **productList**: An array of products, possibly with pagination support (offset and limit).
- **Product**: Contains name, description, image_url, quantity, etc.
- **CartItem**: Represents selected product and quantity.
- **Cart**: List of cart items.
---
### APIs Supported
**Product APIs:**
- Fetch list of products
- Fetch product detail by ID
**Cart APIs:**
- Add item to cart
- Change quantity of an item in cart
- Delete an item from the cart
- API to complete a cart order
---
### Optimization Techniques
To optimize the basic e-commerce application setup, consider the following techniques:
- **Code-Splitting**: Load certain JavaScript bundles only when users interact with specific components to reduce the size of initial loads.
  
- **Lazy-Loading**: Generate JavaScript bundles only for products currently displayed (e.g., if displaying 5 products per page, load only those 5).
  
- **Defer Loading of Non-Critical JavaScript**: Load only the JavaScript files essential for rendering the application first, avoiding non-critical components initially.
- **Pre-fetch Data**: Prefetch certain information, such as the product list or the next page of products, based on user behavior (e.g., hovering over a product).
---
### Measuring Performance
**Core Web Vitals:**
- **LCP (Largest Contentful Paint)**: Measures the time it takes to render the largest component of the viewport. Keeping it under 2.5 seconds is considered good by Google standards.
  
- **First Input Delay**: Measures the time taken for the browser to respond after a user interacts with an element (e.g., clicking a button). A response time of less than 100 milliseconds is ideal.
---
### SEO Improvement Techniques
- **Server-Side Rendering**: Helps search engines index your application effectively.
  
- **Implement Meta Tags**: Include important tags like title and meta description to enhance search engine visibility.
- **sitemap.xml**: Create a sitemap to inform search engines of URLs to crawl.
- **Semantic Markup**: Use semantic HTML elements (e.g., `<header>`, `<section>`, `<main>`, `<footer>`) to improve accessibility and SEO.
- **CDN for Images**: Host images on a CDN for efficient delivery, using adaptive loading to cater to various network conditions.
---
That’s it for the frontend portion of the system design for an e-commerce application.