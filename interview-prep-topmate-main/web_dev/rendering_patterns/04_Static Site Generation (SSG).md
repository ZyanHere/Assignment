### Static Site Generation

- Where you will build the HTML once only during the build time and you deploy that build somewhere on your server (Ex: EC2)
- So by this, We created a static HTML file once during the build time
- Once content is generated it is same for every customer on your website (Ex: blogs)

**<u>Benefits:</u>**

- **Fast Loading Times**:
  - Static sites are **_<u>incredibly fast because they serve pre-built HTML, CSS, and JavaScript files to the browser without any server-side processing</u>_**. This leads to quicker loading times compared to dynamic sites that require server-side computation or database queries to generate each page.
    <br/>
- **Optimized for Speed**:
  - **<u>Since the HTML is generated at build time</u>**, all assets can be optimized ahead of time. This includes minifying files, optimizing images, and more, further enhancing the site's speed.
    <br/>
- **Reduced Complexity**:
  - With static sites, **_<u>there's no need for a database or server-side scripting languages in the serving process</u>_**. This reduces potential points of failure and attack vectors, making the site more secure and reliable.
    <br/>
- **Cache-friendly:**

  - **_<u>Static files are ideal for caching by Content Delivery Networks (CDNs)</u>_**, which can serve your site's content from locations close to your users, further increasing speed and reducing latency.

**<u>Usage:**</u>

- Ideal for Content-heavy Sites: SSG is perfect for blogs, documentation sites, and corporate websites where content does not change frequently.

- **<u>SEO Benefits</u>**: Since the content is statically generated, search engines can easily index these sites, potentially improving search rankings.

```js
//  The injection of props into MyPosts is handled by Next.js automatically, due to the `export async function getStaticProps(context)` declaration.
export default function MyPosts(props){
    return(
        <>
        There are my Posts
        <ul>
        {props.posts.map((post)=><li key={post.id}>{post.title}</li>)}
        </ul>
        <>
    )
}

//SSG
// Following code is fetching the data on the server

export async function getStaticProps(context){
    const promise = await fetch('https://api.jsonbin.io/v3/b/6342b4f62b3499323bd881c1')
    const data = await promise.json()

    return{
        props: {
            posts: data.record.posts
        }
    }
}
```

- Below code is to generate static site on client (Fetching the data on the client instead of fetching the data on the server )

```js
import { useEffect, useState } from 'react';

export default function MyPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const promise = await fetch('URL');
      const data = await promise.json();
      setPosts(data.record.posts);
    }

    fetchData();
  }, []);

  return (
    <>
      There are my posts
      {posts.length ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        'Loading from API'
      )}
    </>
  );
}
```
