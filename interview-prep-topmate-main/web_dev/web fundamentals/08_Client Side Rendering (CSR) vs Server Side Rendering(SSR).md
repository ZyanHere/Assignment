### Client Side Rendering(React)

- CSR is a powerful technique **_for building dynamic and interactive web pages_**.
- It can provide a <u>better user experience</u>, <u>faster page loads</u>, and <u>easier scalability</u>. However, it also has **_some drawbacks, including SEO challenges_**, performance issues and complexity.
- When deciding whether to use client-side rendering, it's important to weigh the benefits and drawbacks and choose the approach that best suits your project's needs

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*3P-9xxeiBN0SDb25.png">

### Server Side rendering(Next Js)

- In CSR, the browser gets a minimal HTML file as a response.
- Once loaded JavaScript runs, makes calls to APIs, and then dynamically generates and displays the content in the browser.

#### Let's break down this process into smaller steps to understand even better

1.**_A user requests a page_** from a server. This could be a direct request to the server or a click on a link that triggers a request. 2. **_The server sends a minimal HTML page to the client_**(usually a loader image). 3. Along with that initial HTML, the **_server sends any necessary JS and CSS files_**. 4. The client's **_browser loads the HTML_** page and **_executes the JS code_**. 5. The JS code makes a request to an API or other data source to fetch the data needed to render the page. 6. Once the data is fetched, the **JS code uses it to render the page** in the browser. 7. At this point the page is fully loaded, visible and interactable: any subsequent interactions such as clicks or form submissions trigger further JS code execution and data fetching as needed.

<img src="./imagesUsed/client-side-rendering.png">

```js
1] Browser makes a request to the server.
2] Server responds with a minimal HTML file.
3] Browser renders this minimal HTML.
4] JavaScript is loaded and executed by the browser.
5] JavaScript makes API calls.
6] Once the data is received from the APIs, the content is dynamically generated and rendered in the browser.
```

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*hg0MdadCrbQSYhcI.png">

**PROS:**

**1. Dynamic Interactivity**:

- Allows for rich, interactive web apps as views and interactions are rendered in the browser, offering a smooth user experience

**2. Improved User Experience** :

- Provides a better User experience by **_creating dynamic and interactive web pages_** <u>that respond quickly to user input.</u>

**3. Faster page loads:**

- Because the **_client only requests a minimal HTML file from the server_**, which contains the necessary JS and CSS files, <u>**_the page can load more quickly_**</u>.

**4. Easier to Scale**:

- compared to SSR, CSR is easier to scale, since the server doesn't have to generate the HTML for each page request.

**CONS:**

**1. Slower initial load**:

- <u>Initial page load might be slower as the browser needs to download, parse and execute the javascript before the content is rendered.</u>

- **Performance issues**: CSR can create performance issues, particularly on slower devices or with large amounts of data. this can result in slower load times and a less responsive user interface.

**2. SEO challenges**:: Search engine crawlers may have difficulty crawling and indexing client side rendered content, which can negatively impact SEO.

**3. Requires JS**: Client-side rendering requires JavaScript to be enabled in the browser, which can be a problem for users with older browsers or accessibility needs.

---

### Server Side Rendering (SSR):

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*DgPXg7GxhxYoG1p7.png">

#### How it works:

- With SSR, <u>the server processes the request</u>, fetches the required data, **_renders the page into HTML_** and <u>**_sends this fully rendered HTML to the client_**</u>.
<img src="./imagesUsed/server-side-rendering.png">

```js
import fetch from 'node-fetch';

function Page({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return {
    props: { data },
  };
}

export default Page;
```

---

#### PROS

**1. Faster Initial Load**:

- Users get a fully rendered page upon the initial request, often leading to a perception of faster page loads.

**2. SEO advantages**: Better for SEO, since search engine crawlers get a fully rendered page, optimizing indexation.

**3. Faster Largest Contentful Paint (LCP)**

---

#### CONS

**1. Increased Server load** since the server has to render content on every request
