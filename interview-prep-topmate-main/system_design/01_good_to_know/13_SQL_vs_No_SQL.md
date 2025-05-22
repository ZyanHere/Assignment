# SQL vs. NoSQL Explained (in 4 Minutes)

[Watch on YouTube](https://www.youtube.com/watch?v=_Ss42Vb1SU4)

---


Let's talk about **how to choose a database in a system design interview**. In these interviews, you will often have to decide what database to use, and these databases are split into two types:

- **SQL**
- **NoSQL**

Each type has its own strengths and weaknesses and should be chosen based on the use case.  

#### Definitions:
- **SQL (Structured Query Language)**: Databases are table-based.  
- **NoSQL**: Databases can be document, key-value, graph, or wide column stores.  

- **SQL databases**: Vertically scalable.  
- **NoSQL databases**: Horizontally scalable.

---


#### Strengths of SQL Databases:

1. **Relational Databases**:
   - Allow easy querying of relationships between data across multiple tables.
   - Important for effectively organizing and structuring diverse data.

2. **Well-Structured Data**:
   - Requires a defined schema, reducing the room for potential errors.
   - The data model and format must be known before storing data.

3. **ACID Compliance**:
   - Ensures transactions are:
     - **Atomic**: All or nothing execution.
     - **Consistent**: Data remains consistent after transactions.
     - **Isolated**: Transactions don't interfere with each other.
     - **Durable**: Changes persist even after failures.

- SQL transactions execute all statements together or not at all if one fails.

---


#### Weaknesses of SQL Databases:

1. **Rigid Structure**:
   - Requires columns and tables to be created ahead of time.
   - Takes more time to set up compared to NoSQL databases.

2. **Scaling Challenges**:
   - Difficult to scale horizontally due to their relational nature.
   - For read-heavy systems, multiple read-only replicas can be provisioned.
   - For write-heavy systems, vertical scaling (adding more resources to a single server) is the main option, which is generally expensive.

---


#### Benefits of NoSQL Databases:

1. **Flexibility**:
   - Simpler and faster to set up.
   - No support for table relationships.
   - Data stored in documents or as key-value pairs.

2. **Unstructured Data**:
   - Better for handling unstructured data.
   - Can shard data across multiple data stores, enabling distributed databases.
   - Horizontal scaling becomes easier, and large amounts of data can be stored without purchasing a single expensive server.

---


#### Weaknesses of NoSQL Databases:

1. **Eventual Consistency**:
   - Designed for distributed use cases.
   - Write-heavy systems can use **peer-to-peer replication**, which involves multiple write shards for the same data partition.
   - Trade-off: A small delay (eventual consistency) before updates propagate across replicas.

2. **Stale Data Risk**:
   - During the propagation delay, reading from a replica might return stale data.
   - **Eventual Consistency**: The data becomes up-to-date over time, but not immediately.

> Note: Eventual consistency is a challenge for distributed databases in general, not just NoSQL.

- A **single shard NoSQL database** can be strongly consistent, but the scalability benefits of NoSQL rely on setting up a distributed cluster.

---

