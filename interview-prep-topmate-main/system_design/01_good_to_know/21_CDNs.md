# CDNs in High-Performance System Design

[Watch on Youtube](https://www.youtube.com/watch?v=rwBv7FqZ77g)


#### **Introduction to CDNs**
- Imagine a company hosting a website on a server in an AWS data center in California:
  - Users in the US: ~100ms load time.
  - Users in China: 3-4 seconds load time.
- Strategies to minimize request latency for global users are crucial in system design.

#### **What are CDNs?**
- **CDNs** (*Content Distribution and Delivery Networks*):
  - Modern solution for reducing request latency when fetching static assets.
  - Composed of globally distributed servers.
  - Users fetch cached copies of static assets (images, videos, HTML, CSS, JavaScript) from nearby CDN servers instead of the origin server.

- **Benefits of CDNs**:
  - Reduce latency.
  - Save network bandwidth (e.g., fetching a large HD wallpaper image).

#### **Popular CDN Providers**
- Cloudflare CDN
- AWS CloudFront
- GCP Cloud CDN
- Azure CDN
- Oracle CDN

---

#### **How Do CDNs Work?**
- CDNs are globally distributed groups of servers that cache static assets for the origin server.
- **Local Cache**: Each CDN server maintains its local cache, synchronized across the network.

##### **Push vs. Pull CDNs**
1. **Push CDNs**:
   - Developers manually push updated files to CDN caches.
   - More engineering effort to maintain cache consistency.

2. **Pull CDNs**:
   - Cache is updated lazily (on-demand):
     - If the requested asset isn’t in the cache, the CDN fetches it from the origin server.
   - Pros:
     - Less maintenance required.
   - Cons:
     - Stale cache issues (e.g., cache won’t automatically update unless explicitly fetched).
     - First request latency for non-cached assets.

---

#### **Improving Pull CDN Performance**
- **Timestamp-based Caching**:
  - Assets are cached with timestamps and usually refreshed every 24 hours.
  - Expired caches prompt the CDN to refetch updated assets from the origin server.

- **Cache Busting**:
  - Cache assets with unique hashes or E-tags for updated versions.

---

#### **When Not to Use CDNs**
- **Region-Specific Target Users**:
  - If services target a single region, hosting origin servers in that region is more efficient.

- **Dynamic or Sensitive Assets**:
  - Dynamic data (e.g., financial or government services) should not rely on CDNs to avoid serving stale information.

---

#### **Example Scenario**
- **Question**:
  - Imagine building Amazon’s product listing service to serve product metadata and images. Where would a CDN fit in this design?
  - *Answer*: Use a CDN for static assets like product images, ensuring faster load times for users worldwide.

---

