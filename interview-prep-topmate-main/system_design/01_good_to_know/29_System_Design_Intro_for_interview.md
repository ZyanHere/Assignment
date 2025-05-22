# System Design Introduction for Interview

**Source:** [YouTube Video](https://www.youtube.com/watch?v=UzLMhqg3_Wc)

---

- **Introduction to System Design**

  - System design is a subjective topic, and the content shared here is based on the speaker's experience.
  - Key focus: preparing for system design interviews.

- **ABCDs of System Design**

  - **A: Ask good questions**
    - Define the Minimum Viable Product (MVP).
    - Determine features to prioritize under strict time constraints.
    - Understand system scaling needs (e.g., data storage, request handling, expected latency).
  - **B: Avoid buzzwords**
    - Do not use technologies or concepts without understanding them deeply.
    - Backfire risk of misusing buzzwords in interviews.
  - **C: Clear and organized thinking**
    - Define a high-level view before diving into details.
    - Draw boxes and define actors for the system.
  - **D: Drive discussions**
    - Use the 80-20 rule: talk 80% of the time, let the interviewer talk 20%.
    - Lead the discussion and anticipate problems in your solution.

- **Ways to Improve**
  1. Gain personal experience by working on high-scale systems.
  2. Practice system design problems with peers.
  3. Read blogs and watch videos for knowledge enhancement.

### **Key Features to Discuss in System Design**

- Features: Define what the interviewer cares about and exclude unnecessary ones.
- APIs: Decide which APIs to implement and their functionality.
- **Availability:**
  - Discuss availability expectations if a host or datacenter goes down.
- **Latency/Performance:**
  - Use caching for customer-facing requests to improve speed.
- **Scalability:**
  - Design systems to handle increasing users or requests.
- **Durability:**
  - Ensure data is stored securely and not lost or compromised.
- **Class Diagrams:**
  - Useful for specific design questions (e.g., parking lot or elevator systems).
- **Security and Privacy:**
  - Essential for authentication system designs.
- **Cost-effectiveness:**

  - Consider the cost implications of different solutions.

- **Concepts and Topics**
  - Vertical vs Horizontal Scaling: Add resources to a host vs adding more hosts.
  - CAP Theorem: Trade-offs between Consistency, Availability, and Partition Tolerance.
  - ACID vs BASE: Transactional properties for relational vs NoSQL databases.
  - Partitioning/Sharding: Split large datasets across multiple nodes.

### **Locking Mechanisms**

- Optimistic vs Pessimistic Locking: Transaction management strategies.
- Strong vs Eventual Consistency: Trade-offs in data accuracy vs availability.

- **Databases**

  - Relational vs NoSQL Databases: Use cases for structured and unstructured data.
  - Types of NoSQL Databases:
    - Key-Value, Wide Column, Document-based, Graph-based.

- **Caching**

  - Types: Node-specific vs Shared Cache.
  - Key considerations: Cache size, eviction policies, source of truth.

- **Infrastructure Basics**
  - Data centers, racks, and hosts.
  - Resource limitations: CPU, memory, hard drive, network bandwidth.

### **Networking and Protocols**

- HTTP vs HTTP/2 vs WebSocket.
- TCP/IP Model and Layers.
- IPv4 vs IPv6: Address differences and routing.
- TCP vs UDP: Reliable vs fast communication.
- DNS Lookup: Translating domain names to IP addresses.

- **Security Protocols**
  - TLS: Secure client-server communication.
  - Public Key Infrastructure: Manage public keys and digital certificates.
  - Symmetric vs Asymmetric Encryption: Use cases and examples.

### **Load Balancers**

- Operate at L4 (IP and port) or L7 (HTTP URI).
- Distribute client requests efficiently.

- **CDNs and Edge Computing**

  - CDN: Content Delivery Network for faster data delivery.
  - Edge: Perform processing close to the user.

- **Probabilistic Data Structures**
  - Bloom Filters: Space-efficient membership testing with false positives.
  - Count-Min Sketch: Frequency estimation for events.

### **Distributed Systems**

- Paxos: Consensus in distributed systems.
- Design Patterns: Factory methods, singletons, abstractions.

- **Virtualization and Containers**

  - Virtual Machines vs Containers: Resource management and application isolation.

- **Message Queues**

  - Pub/Sub systems for asynchronous messaging.

- **Big Data Processing**
  - MapReduce and Spark: Distributed data processing frameworks.
  - HDFS: Distributed file storage for Hadoop.

### Tools Overview

- Cassandra: Highly scalable wide-column database.
- MongoDB: Document-based NoSQL database.
- Redis: Distributed in-memory cache.
- Zookeeper: Centralized configuration management.
- Kafka: Fault-tolerant message queue.
- Nginx and HAProxy: Efficient load balancers.
- ElasticSearch: Scalable search platform.
- AWS S3: Cloud-based blob storage.
- Docker and Kubernetes: Container management platforms.

---
