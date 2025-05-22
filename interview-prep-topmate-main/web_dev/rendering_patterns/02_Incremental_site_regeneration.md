- Following outlines how to implement Incremental Static Regeneration (ISR) in a Next.js application, showcasing both the frontend component for displaying posts and the backend handler for on-demand revalidation of specific paths.
- ISR is a powerful feature in Next.js that **allows for static pages to be updated after deployment without needing to rebuild and redeploy the entire site**.
- This technique is particularly **useful for site with a large number of pages**, enabling them to enjoy the benefits of static generation (fast load times, SEO-friendly) while keeping content fresh.
- To use ISR, add the `revalidate prop` to `getStaticProps`
- I wanted to get updated data every time without manual build (next build && next export), so over here the revalidation comes into picture for ISG

```js
// ISG

export default function MyPosts(props) {
  return (
    <>
      My posts
      <ul>
        {props.myPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

//getStaticProps is an async function that fetches data at build time for static generation, however with 'revalidate' option set, Next.js will attempt to re-generate the page when a request comes in at most every 10 seconds

//This means your page will serve the statically generated page and update it in the background if it's older than 10 seconds.
export async function getStaticProps(context) {
  const promise = await fetch(
    'https://api.jsonbin.io/v3/b/6342b4f62b3499323bd881c1'
  );
  const data = await promise.json();

  return {
    props: { myPosts: data.record.posts },
    revalidate: 10, //re-validate after every 10 seconds
  };
}
```

```js
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== 'jscafe') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const body = req.body;
    if (!body) return res.status(400).json({ message: 'Body missing' });
    const pathToRevalidate = body.pathToRevalidate;
    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
```

<img src="./images_used/Incremental_Site_regeneration.png">


---

#### How it works

1. **Static Generation with Revalidation**: The site is built statically, including the posts page.

   - The revalidate prop in getStaticProps **_<u>tells Next.js to revalidate the page in the background if a request comes in after 10 seconds since the last generation</u>_**.

2. **On-demand Revalidation:**: The backend handler allows specific pages to be revalidated instantly.
   - **When content changes**, **_<u>a request can be made to this API route with the path of the page that needs updating</u>_**.
3. **Security Measures:**: The check for a secret query parameter in the API route is a simple **_<u>way to secure the revalidation process</u>_**, ensuring that only requests from known sources can trigger revalidation.
4. **Error Handling**: The handler includes basic error handling, responding appropriately if the secret is missing, the body is missing, or if revalidation fails.
