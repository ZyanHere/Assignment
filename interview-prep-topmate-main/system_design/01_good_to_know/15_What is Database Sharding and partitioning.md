# The Basics of Database Sharding and Partitioning in System Design

**Video Source:** [The Basics of Database Sharding and Partitioning in System Design - YouTube](https://www.youtube.com/watch?v=be6PLMKKSto)

---


**What is Database Sharding?**

- Traditionally, data has been stored in an **RDBMS (Relational Database Management System)**.
- Data is stored in tables as rows and columns.
- For data with 1-to-N or N-to-N relationships, **normalization** stores data in separate tables joined by **foreign keys**:
  - Ensures that data in these tables remains in sync.
  - Allows for a complete view of the data when joined.

However, as data size increases, traditional databases face bottlenecks:

- **CPU, memory, or disk usage limitations**.
- Require increasingly high-end and expensive hardware to maintain performance.
- Even with the best hardware, modern application data requirements often exceed the capacity of a traditional RDBMS.

---

**What is Sharding?**

- Some data structures allow tables to be broken up and spread across multiple servers.
- **Sharding**:
  - Breaking large tables into **horizontal data partitions**.
  - Each partition contains a subset of the table and is placed on a separate database server.
- Each partition is called a **shard**.

---

#### **Sharding Techniques**

1. **Geo-Based Sharding**:
   - Data is partitioned based on user location (e.g., continent or region such as "East US" or "West US").
   - A static location, such as the user's location during account creation, is often used.
   - **Advantages**:
     - Routes users to the closest node, reducing latency.
   - **Disadvantages**:
     - Uneven distribution of users across geographical areas.

2. **Range-Based Sharding**:
   - Divides data based on key-value ranges.
   - Example: Using the first letter of the user's first name as the shard key (A-Z = 26 buckets).
   - **Advantages**:
     - Simple partition computation.
   - **Disadvantages**:
     - Uneven splits across data partitions.

3. **Hash-Based Sharding**:
   - Uses a hashing algorithm to generate a hash based on the key value, then computes the partition.
   - **Advantages**:
     - Distributes data evenly across partitions, reducing hotspots.
   - **Disadvantages**:
     - Related rows may end up in different partitions, limiting performance enhancements like preloading future queries.

---

#### **Manual vs. Automatic Sharding**

- **Automatic Sharding**:
  - Some database systems manage data partitioning dynamically.
  - Automatically repartitions data when detecting uneven distribution of data or queries.
  - Improves scalability and performance.

- **Manual Sharding**:
  - Necessary for monolithic databases that lack automatic sharding.
  - **Challenges**:
    - Increased development complexity.
    - Requires:
      - Choosing the appropriate sharding technique.
      - Deciding the number of shards based on projected data trends.
    - Adjusting to changing assumptions involves rebalancing data partitions at runtime.
    - Determining which shard contains specific data and how to access it.

- **Potential Downsides**:
  - Uneven data distribution among shards as data trends change.
  - **Hotspots**: Uneven distribution causing performance issues or server crashes.
  - Repartitioning is required if the initial number of shards is insufficient, which can be complex without downtime.

---

#### **Operational Challenges**

- Schema Changes:
  - Hard to implement in a sharded environment.
  - Schema changes must be backward-compatible.
  - Ensuring all shards have the same schema and correctly migrating data can be difficult.

#### **Advantages of Sharding**

1. **Scalability**:
   - Allows the system to scale out as data size increases.
   - Can handle larger data sizes than traditional RDBMS.

2. **Smaller Data Sets per Shard**:
   - Smaller indexes = faster query performance.

3. **Fault Tolerance**:
   - If a shard experiences an outage, the rest of the system remains operational.

4. **Cost Efficiency**:
   - Smaller shards can run on commodity hardware instead of expensive, high-end machines.

---

#### **Disadvantages of Sharding**

1. **Data Limitations**:
   - Not all data is amenable to sharding.
   - **Foreign key relationships** can only exist within a single shard.

2. **Complexity**:
   - Manual sharding introduces significant complexity.
   - Uneven data distribution can result in hotspots.

3. **Cross-Shard Queries**:
   - Expensive or impossible to perform operations like table joins across shards.

4. **Irreversibility**:
   - Once sharding is implemented, undoing it or changing the shard key is challenging.

5. **Operational Costs**:
   - Each shard is a live production database, requiring high availability (e.g., replication).
   - Increases overall operational costs compared to a single RDBMS.

---

### Conclusion

Sharding provides scalability and performance benefits for large datasets but comes with significant challenges in setup, maintenance, and operational complexity.  


