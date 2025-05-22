# System Design Interview – Step By Step Guide

> **Video**: [System Design Interview – Step By Step Guide - YouTube](https://www.youtube.com/watch?v=bUHFg8CZFws)

- **Introduction to System Design Interviews**

  - **Key Question:** What is the most important component for a successful system design interview?
  - **Answer:** Knowledge of system design concepts and how to combine them.
  - **Goal:** Walk through all stages of a typical system design interview.

- **Problem Statement: Counting at Scale**

  - **Example Problem:** Design a system to count views for YouTube videos, likes on Instagram, or Facebook.
  - **Vague Problem:** Calculate a set of metrics (e.g., requests, errors, response time) for monitoring application performance.
  - **Generic Problem:** Analyze data in real-time.

- **Clarifying the Problem**

  - **Questions to Ask:**
    - What does data analysis mean?
    - Who sends data?
    - Who uses the results?
    - What does real-time mean?
  - **Importance of Asking Questions:**
    - **For the Interviewer:** Assess how you deal with ambiguity.
    - **For You:** Define the scope of the problem.

- **Dealing with Ambiguity**

  - **Interviewer's Goal:** Understand how you approach real-life design problems.
  - **Interviewee's Goal:** Focus on key functional pieces of the problem.

- **Importance of Requirements Clarification**

  - **Why Clarify Requirements?**
    - Multiple solutions exist for the same problem.
    - Understanding requirements helps in choosing the right technologies.

- **Example: Counting YouTube Video Views**

  - **Different Approaches:**
    - **SQL Engineer:** Use MySQL.
    - **NoSQL Engineer:** Use Apache Cassandra.
    - **Cloud Engineer:** Use public cloud services.
    - **Batch Processing Engineer:** Use Hadoop MapReduce.

- **Choosing the Right Approach**

  - **Key Consideration:** Each approach has pros and cons.
  - **Focus on Requirements:** Pick the option that best addresses the requirements.

- **Categories of Questions to Ask**

  - **Users:** Who will use the system and how?
  - **Scale:** How will the system handle growing data?
  - **Performance:** How fast must the system be?
  - **Cost:** What are the budget constraints?

- **Example: YouTube Views Counting System**

  - **User Questions:**
    - Who will use the system? (e.g., viewers, video owners, ML models)
    - How will the system be used? (e.g., marketing reports, real-time recommendations)

- **Scale Questions**

  - **Key Questions:**
    - How many read queries per second?
    - How much data is queried per request?
    - How many video views per second?
    - How to handle traffic spikes?

- **Performance Questions**

  - **Key Questions:**
    - Can views be counted hours later, or must they be real-time?
    - How fast must data be retrieved?

- **Cost Questions**

  - **Key Questions:**
    - Minimize development cost? (e.g., open-source frameworks)
    - Minimize maintenance cost? (e.g., public cloud services)

- **Interviewer's Perspective**

  - **Warning Sign:** If you don’t ask questions, it’s a red flag.
  - **Advice:** Spend time clarifying requirements and scope.

- **Functional vs. Non-Functional Requirements**

  - **Functional Requirements:** What the system will do (e.g., APIs).
  - **Non-Functional Requirements:** How the system will perform (e.g., fast, fault-tolerant, secure).

- **Defining Functional Requirements**

  - **Example:** System counts video view events.
  - **Generalization:** Count likes, shares, and other events.
  - **Advanced:** Support sum and average functions (e.g., total watch time, average view duration).

- **Defining Non-Functional Requirements**

  - **Key Requirements:** Scalability, performance, availability.
  - **Additional Requirements:** Consistency, cost minimization.

- **High-Level Architecture**

  - **Components:** Database, web service for processing, web service for querying.
  - **Goal:** Start with high-level components and refine as needed.

- **Data Model: Raw Events vs. Aggregated Data**

  - **Raw Events:** Store each individual event with all attributes.
  - **Aggregated Data:** Store pre-calculated counts (e.g., per minute, per hour).

- **Pros and Cons of Raw Events**

  - **Pros:** Fast writes, flexible queries, ability to recalculate.
  - **Cons:** Slow reads, high storage cost.

- **Pros and Cons of Aggregated Data**

  - **Pros:** Fast reads, real-time decision making.
  - **Cons:** Limited query flexibility, complex aggregation pipeline, hard to fix errors.

- **Choosing Between Raw Events and Aggregated Data**

  - **Key Factor:** Expected data delay (real-time vs. batch processing).
  - **Combination Approach:** Store both raw events and aggregated data for flexibility.

- **Database Options: SQL vs. NoSQL**

  - **SQL:** MySQL, Vitess (used by YouTube).
  - **NoSQL:** Apache Cassandra.

- **Scaling SQL Databases**

  - **Sharding:** Split data across multiple machines.
  - **Cluster Proxy:** Routes traffic to the correct shard.
  - **Configuration Service:** Monitors shard health.

- **High Availability in SQL Databases**

  - **Replication:** Master shard (leader) and read replicas (followers).
  - **Data Center Replication:** Ensure data availability across data centers.

- **Scaling NoSQL Databases (Cassandra)**

  - **Gossip Protocol:** Nodes exchange state information.
  - **Client-Side Routing:** Clients can contact any node in the cluster.

- **Consistency in NoSQL Databases**

  - **Eventual Consistency:** Temporary inconsistency is acceptable.
  - **Tunable Consistency:** Cassandra allows tuning consistency levels.

- **Data Modeling for SQL vs. NoSQL**

  - **SQL:** Normalized data, minimize duplication.
  - **NoSQL:** Denormalized data, optimize for queries.

- **Processing Service Design**

  - **Key Requirements:** Scalability, reliability, speed.
  - **Approach:** Partitioning, replication, in-memory processing.

- **Pre-Aggregation in Processing Service**

  - **Option 1:** Increment counter for each event.
  - **Option 2:** Accumulate events in memory and periodically update the database.
  - **Preferred Option:** Option 2 for large-scale systems.

- **Push vs. Pull Model**

  - **Push:** Events are sent to the processing service.
  - **Pull:** Processing service pulls events from a temporary storage.
  - **Preferred Option:** Pull model for better fault tolerance and scalability.

- **Checkpointing and Partitioning**

  - **Checkpointing:** Save progress to persistent storage for fault tolerance.
  - **Partitioning:** Split events across multiple queues for parallel processing.

- **Processing Service Components**

  - **Consumer:** Reads events from partitions.
  - **Aggregator:** Accumulates counts in memory.
  - **Database Writer:** Writes pre-aggregated counts to the database.

- **Dead Letter Queue and Data Enrichment**

  - **Dead Letter Queue:** Stores undelivered messages for later processing.
  - **Data Enrichment:** Add additional attributes (e.g., video title) from embedded databases.

- **State Management**

  - **Challenge:** Recover in-memory state after a failure.
  - **Solution:** Periodically save state to durable storage.

- **Data Ingestion Pipeline**

  - **Components:** Partitioner service, load balancer, API Gateway.
  - **Flow:** User request → API Gateway → Partitioner service → Processing service → Database.

- **Load Balancing and Service Discovery**

  - **Load Balancer:** Distributes traffic across partitioner service machines.
  - **Service Discovery:** Partitioner service discovers available partitions.

- **Replication Strategies**

  - **Single Leader Replication:** Leader and followers (used in SQL databases).
  - **Multi-Leader Replication:** Replicate across data centers.
  - **Leaderless Replication:** Used in Cassandra.

- **Message Formats**

  - **Textual Formats:** JSON, XML, CSV (human-readable).
  - **Binary Formats:** Thrift, Protocol Buffers, Avro (compact, fast parsing).

- **Data Retrieval Path**

  - **Query Service:** Retrieves total views count from the database.
  - **Time-Series Data:** Rollup data for older statistics (e.g., per hour, per day).

- **Hot Storage vs. Cold Storage**

  - **Hot Storage:** Frequently accessed data (e.g., recent statistics).
  - **Cold Storage:** Archived data (e.g., older statistics).

- **Full System Simulation**

  - **Flow:** User → API Gateway → Partitioner service → Processing service → Database → Query service → User.

- **Technology Stack**

  - **Netty:** High-performance non-blocking IO framework.
  - **Hystrix, Polly:** Implement timeouts, retries, circuit breaker.
  - **Cassandra, HBase:** NoSQL databases for time-series data.

- **Performance Testing**

  - **Load Testing:** Measure system behavior under expected load.
  - **Stress Testing:** Test beyond normal capacity to find breaking points.
  - **Soak Testing:** Test with typical load for extended periods.

- **Health Monitoring**

  - **Metrics:** Error count, processing time.
  - **Dashboards:** Summary view of core metrics.
  - **Alerts:** Notify service owners of issues.

- **Audit Systems**

  - **Weak Audit System:** Continuously running end-to-end test.
  - **Strong Audit System:** Calculate counts using a different path (e.g., Hadoop MapReduce).

- **Lambda Architecture**

  - **Batch and Stream Processing:** Send events to both systems and stitch results at query time.
  - **Advice:** Use batch processing for non-latency-sensitive tasks, stream processing for real-time.

- **Handling Popular Videos**

  - **Challenge:** Spread events for popular videos across multiple partitions.
  - **Solution:** Use consistent hashing to distribute load.

- **Summary of System Design Steps**

  - **1. Clarify Requirements:** Define APIs and scope.
  - **2. Define Non-Functional Requirements:** Scalability, availability, performance.
  - **3. High-Level Architecture:** Data flow, storage, processing.
  - **4. Detailed Design:** Focus on key components.
  - **5. Discuss Bottlenecks:** Identify and address potential issues.

- **Final Thoughts**

  - **Key to Success:** Knowledge of system design concepts.
  - **Applicability:** Ideas can be applied to other problems (e.g., likes, shares, ad impressions).
  - **Future Topics:** More system design concepts will be covered in future videos.

- **Closing Remarks**
  - **Thank You:** For watching and learning.
  - **Next Video:** More system design concepts and examples.
  - **Goodbye:** See you next time!

---

### Database Design Concepts and Implementation

## Storing Data in Clusters
- When a **store data request** is made:
  - **Cluster Proxy** sends data to a shard based on information from the Configuration Service.
  - Data is replicated either:
    - **Synchronously**, or
    - **Asynchronously** to a corresponding read replica.

- When a **retrieve data request** is made:
  - **Cluster Proxy** may retrieve data from:
    - A **master shard**, or
    - A **read replica**.

---

##  YouTube's Database Solution: Vitess
- **YouTube** uses a custom database solution called **Vitess**:
  - Scales and manages large clusters of MySQL instances.
  - Involves multiple components:
    - Proxies
    - Configuration service
    - Leader and replica instances

###  Complexity of SQL Solutions
- Managing SQL databases at scale requires:
  - Proxies
  - Configuration services
  - Multiple leader-replica setups

---

## Simplifying with NoSQL Databases
- NoSQL databases, such as **Apache Cassandra**, offer a simplified approach:
  - Data is split into **shards** (or **nodes**).
  - All shards are **equal**—no leaders or followers.
  - No need for a configuration service to monitor shard health.

### Gossip Protocol
- **Shards exchange state information** with each other in a limited scope:
  - Each shard talks to **no more than 3 other shards**.
  - Information propagates quickly across the cluster.

- This process is called the **gossip protocol**:
  - Every node knows about other nodes.
  - Eliminates the need for a **Cluster Proxy** to route requests.

---

## Request Routing in Cassandra
- Clients can call **any node** in the cluster directly.
- The node receiving the request becomes the **Coordinator Node**:
  - Uses a **consistent hashing algorithm** to identify the correct shard for data.

### Data Replication and Quorum Writes
- Coordinator node replicates data to multiple nodes for redundancy:
  - Example: Replicates to 3 nodes.
  - **Quorum writes**: Write is considered successful if 2 of 3 replication requests succeed.

---

## Quorum Reads and Stale Data
- **Quorum reads**:
  - Coordinator node sends parallel read requests to multiple replicas.
  - Uses **version numbers** to determine data staleness.

- **Consistency** in Cassandra:
  - Trades **strict consistency** for **availability**:
    - Shows **stale data** rather than no data.

---

## Eventual Consistency
- Writes propagate asynchronously to replicas:
  - Temporary **inconsistency** when replicas lag behind.
  - Over time, all replicas converge to the same state.

- Cassandra offers **tunable consistency**:
  - Users can choose the level of consistency required for their application.

---

## SQL vs. NoSQL Data Modeling
### SQL Data Modeling
- Relational databases focus on **normalization**:
  - Minimize data duplication across tables.
  - Example:
    - `video_info` table for video details.
    - `video_stats` table for views per hour.
    - `channel_info` table for channel details.

- Use **JOIN queries** to combine data:
  - Ensures a single source of truth.

### NoSQL Data Modeling
- NoSQL promotes **denormalization**:
  - Data is stored based on the **queries** the system will execute.
  - Reduces the need for complex joins.

- **Example**:
  - Instead of separate tables, all relevant video and channel data might be stored together for quick retrieval.

---

## Key Concepts Recap
- **Gossip Protocol**:
  - Nodes share state information efficiently.
- **Quorum Writes/Reads**:
  - Balance speed and consistency.
- **Tunable Consistency**:
  - Adjust consistency based on application needs.
- **Data Modeling**:
  - SQL: Normalization and JOINs.
  - NoSQL: Denormalization and query-based storage.


---

- When designing data models for relational databases:
  - Start with defining **nouns** in the system.
  - Convert nouns into **tables**.
  - Use **foreign keys** to reference related data.
- **Example**:
  - A report with:
    - Information about a video.
    - Total views per hour for the last several hours.
    - Information about the channel the video belongs to.

---

- **Input**: Video identifier.
- **Relational Database Schema**:
  - **Video Info Table**: Contains video details.
  - **Video Stats Table**: Accumulated views for each hour.
  - **Channel Info Table**: Channel details.

---

- Generate reports using **JOIN queries**.
- **Normalization** in relational databases:
  - Minimizes data duplication.
  - Example: Store video names only in the **Video Info Table** to avoid inconsistencies.

---

- **NoSQL Paradigm**:
  - Focus on **queries** rather than nouns.
  - **Denormalization** is normal and reduces fear of data duplication.
  - Example:
    - Store everything needed for a report together in a **Cassandra table**.
    - Add **columns** for each new hour instead of rows.

---

- Both **SQL** and **NoSQL** can be used for solutions.
- **NoSQL Database Types**:
  1. Column.
  2. Document.
  3. Key-Value.
  4. Graph.
- Chose **Cassandra** for its:
  - Fault tolerance.
  - Scalability.
  - Multi-datacenter replication.
  - Suitability for **time-series data**.

---

- For interviews, focus on:
  - **Advantages** and **disadvantages** of databases.
  - When to use which type.
- Cassandra has **asynchronous masterless replication**, while other NoSQL databases differ:
  - **MongoDB**: Leader-based replication.
  - **HBase**: Master-based architecture.

---

- Data Processing:
  - **Real-time Processing**: Show total view counts immediately.
  - **Hourly Counts**: For statistics display.
  - Process by:
    1. Incrementing counters in real-time.
    2. Ensuring **scalability**, **reliability**, and **speed**.

---

- **Scaling Data Processing**:
  - Use **partitioning**.
  - Replicate data to prevent loss.
  - Keep data **in memory** for speed.
- Basic Question: Pre-aggregate data in the processing service?

---

- Two options for updating counters:
  1. Increment counters for every event.
  2. Accumulate counters in-memory and periodically update the database.
- Second option is better for large-scale systems.

---

- **Push vs Pull** for processing:
  - **Pull** is better:
    - Provides fault tolerance.
    - Easier to scale.
- **Checkpointing**:
  - Use **queues** for sequential event processing.
  - Offset mechanism to resume processing after failures.

---

- **Partitioning**:
  - Distribute events across multiple queues.
  - Parallelize processing.
  - Use a **hash** based on video identifiers for queue selection.

---

- **Processing Service**:
  - Read events, count in memory, and periodically update the database.
  - Use **multi-threaded** access for speed.
  - Employ **distributed caching** to eliminate duplicates.

---

- **Dead Letter Queue**:
  - Protect against database issues by storing undelivered messages.
- **Data Enrichment**:
  - Use **embedded databases** for fast retrieval of additional attributes.

---

- **State Management**:
  - Re-process events to rebuild in-memory state after failures.
  - Periodically save in-memory data to durable storage.

---

- Finalize **Data Ingestion Pipeline**:
  - Use components like **Partitioner Service** and **Load Balancer**.
  - Route requests via **API Gateway**.

---

- **Non-Blocking I/O**:
  - Handle multiple concurrent connections efficiently.
  - Increase throughput while maintaining system stability.

---

- **Batching**:
  - Combine multiple events into single requests.
  - Benefits:
    - Saves costs.
    - Increases throughput.
  - Drawbacks:
    - Complexity in handling failures.

---

- **Timeouts** define how much time a client is willing to wait for a response from a server.
- Two types of timeouts:

  - **Connection timeout**: Time to wait for a connection to establish. Usually small, e.g., tens of milliseconds.
  - **Request timeout**: Time for request processing. Analyze latency percentiles to set this value.

- **Request timeout**:
  - Set based on latency of the slowest 1% of requests.
  - ~1% of requests will timeout.
- Failed requests:

  - Retry them as the first attempt might hit a bad server.
  - Subsequent attempts may succeed.

- Retrying:

  - Avoid **retry storm events** by using **exponential backoff** and **jitter algorithms**.
  - **Exponential backoff**: Increases waiting time between retries up to a max.
  - **Jitter**: Adds randomness to retry intervals, spreading load.

- **Circuit Breaker Pattern**:

  - Stops repeated attempts that are likely to fail.
  - Calculates recent failures and halts calls if an error threshold is exceeded.
  - Allows limited retries after some time to check recovery.

- Drawbacks of the Circuit Breaker pattern:
  - Makes testing difficult.
  - Hard to set error thresholds and timers.
- Tradeoffs exist for all concepts in distributed systems.

- **Load Balancers**:

  - Distribute traffic across servers.
  - Types:
    - **Hardware**: Network devices with high throughput.
    - **Software**: Installed on chosen hardware, often open source.

- **Traffic Types**:

  - **TCP load balancers**: Forward packets without inspecting them.
  - **HTTP load balancers**: Inspect messages and make decisions based on content.

- **Load Balancing Algorithms**:

  - **Round robin**: Distributes requests in order.
  - **Least connections**: Sends to the server with fewest active connections.
  - **Least response time**: Sends to the server with the fastest response.

- **DNS (Domain Name System)**:

  - Translates domain names to IP addresses.
  - Registers services (e.g., `partitionerservice.domain.com`) with load balancers.

- **High Availability**:

  - Primary and secondary load balancers ensure continuous service.
  - They are deployed in different data centers.

- **Partitioner Service**:

  - Routes events to partitions using strategies like hash functions.
  - Issues with large scale (e.g., hot partitions) require advanced strategies.

- **Dealing with Hot Partitions**:

  - Include event time in the partition key.
  - Split hot partitions into smaller ones.

- **Service Discovery**:

  - Patterns:
    - **Server-side discovery**: Load balancer as intermediary.
    - **Client-side discovery**: Clients query a service registry.

- **Replication**:

  - Ensures data durability.
  - Approaches:
    - **Single leader replication**: Writes and reads from the leader.
    - **Multi-leader replication**: Used across data centers.

- **Leader Roles**:

  - Followers copy events from the leader.
  - If the leader fails, a new leader is chosen.

- **Tradeoffs**:

  - Waiting for replication increases durability but also latency.

- **Message Formats**:
  - **Textual**: XML, CSV, JSON (human-readable).
  - **Binary**: Thrift, Protocol Buffers, Avro (efficient for machines).

---

### **Binary Formats vs JSON**

- **Benefits of Binary Formats:**

  - Compact and faster parsing.
  - Avoids field names, using field tags instead (e.g., Apache Thrift, Protocol Buffers).
  - Reduces total message size.

- **Role of Schemas:**
  - Producers/Consumers use schemas for serialization/deserialization.
  - Stored in shared databases, allowing schema evolution over time.

---

### **Data Aggregation and Rollups**

- **Aggregation Process:**

  - Store data in intervals (e.g., per hour, per day).
  - Roll up older data to reduce granularity over time.

- **Hot vs. Cold Storage:**
  - **Hot Storage:** For frequently accessed data.
  - **Cold Storage:** For archived, infrequently accessed data (e.g., AWS S3).

---

### **Query Service and Caching**

- **Data Federation:**

  - Combines data from multiple storages.
  - Uses caches to improve performance.

- **Stitching Results:**
  - Retrieves recent stats from databases, older data from object storage.
  - Caches query results to scale and enhance performance.

---

### **Event Partitioning and Aggregation**

- **Partitioning by Video ID:**

  - Events are batched and routed to specific partitions.
  - Processed by consumers and aggregated per minute.

- **Database Updates:**
  - Stores hourly counts and total views.

---

### **Technology Stack**

- **Key Tools:**
  - **Netty:** High-performance I/O framework.
  - **Load Balancers:** NGINX, AWS Elastic Load Balancer.
  - **Data Storage:** Apache Kafka, Cassandra, HBase, S3.
  - **Stream Processing:** Apache Spark, Flink.
  - **Monitoring:** ELK Stack, AWS CloudWatch.
  - **Message Formats:** Protobuf, Thrift, Avro.
  - **Leader Election:** Apache Zookeeper, Eureka.

---

### **Audit Systems**

- **Weak Audit Systems:**

  - Continuous end-to-end testing.
  - Validates query results with expected counts.

- **Strong Audit Systems:**
  - Parallel paths (e.g., MapReduce for recalculation).
  - Ensures high reliability via redundancy.

---

### **Performance Testing**

- **Types:**

  - **Load Testing:** Tests expected loads.
  - **Stress Testing:** Pushes systems beyond capacity.
  - **Soak Testing:** Extended testing for resource leaks.

- **Tools:** Apache JMeter for load generation.

---

### **Conclusion**

- **Applications of Design Concepts:**

  - Counting views, likes, shares, and trends.
  - Fraud detection, recommendation systems, etc.

- **Key Takeaway:**
  - The knowledge of trade-offs and proper technology choice is critical for effective system design.

---
