# Database Caching for System Design Interviews

---

[Watch on YouTube](https://www.youtube.com/watch?v=6GY1akbxyEo)

---

**What is Caching?**
- **Definition**: 
  - Caching is a data storage technique essential for scalable internet applications.
  - A cache is any data store that can quickly store and retrieve data for future use.
- **Benefits**:
  - Faster response times.
  - Decreased load on other system components.
- **Necessity**:
  - Without caching, systems would be slow due to data retrieval times.
  - Caches leverage **locality** to store data closer to where it is needed.
- **Broader Definition**:
  - Includes storing **pre-computed data** for complex tasks (e.g., personalized news feeds, analytics).

---

### **How Does Caching Work?**
1. **In-memory Application Cache**:
   - Stores data directly in the application's memory.
   - **Advantages**:
     - Fast and straightforward.
   - **Challenges**:
     - Each server maintains its cache.
     - Increases memory demands and system cost.

2. **Distributed In-memory Cache**:
   - Example: **Memcache** or **Redis**.
   - Centralized caching server.
   - Multiple servers read and write from the same cache.

3. **File System Cache**:
   - Stores commonly accessed files.
   - Example: **Content Delivery Networks (CDNs)** leverage geographic locality.

---

### **Caching Policies**
- **Why not cache everything?**:
  - **Cost**:
    - Caching uses expensive and less resilient hardware.
  - **Accuracy**:
    - Caches are smaller and temporary, requiring selective data storage.

- **Caching Policies**:
  1. **First In, First Out (FIFO)**:
     - Evicts the oldest item.
  2. **Least Recently Used (LRU)**:
     - Tracks last accessed time and evicts the least recently accessed item.
  3. **Least Frequently Used (LFU)**:
     - Tracks usage frequency and evicts the least frequently accessed item.

---

### **Cache Coherence**
- **Write-through Cache**:
  - Updates cache and main memory **simultaneously**.
  - Ensures consistency.

- **Write-behind Cache**:
  - Updates main memory **asynchronously**.
  - Increases speed but risks inconsistency.

- **Cache-aside / Lazy Loading**:
  - **Process**:
    1. Application checks cache for requested data.
    2. If absent, fetch data from the store and update the cache.
  - Keeps cached data relevant with appropriate eviction policies and TTL.

---

### **Key Design Decisions**
1. **Cache Size**:
   - Determine optimal size for your needs.
2. **Eviction Policy**:
   - Choose a strategy (e.g., LRU, LFU).
3. **Expiration Policy**:
   - Match access patterns to TTL and eviction settings.

---

### **Conclusion**
- Caching is critical for system performance and scalability.
- Understand the trade-offs of different caching strategies.

---
