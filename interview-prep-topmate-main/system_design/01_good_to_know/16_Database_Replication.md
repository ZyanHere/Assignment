# Database Replication Explained (in 5 Minutes)

[Watch on  YouTube](https://www.youtube.com/watch?v=bI8Ry6GhMSE)

---

**Introduction**:

- **Topic**: Database replication for system design interviews.
- **Definition**:
  - Copying data from one data source to another, replicating it across multiple locations.
- **Reasons for Replication**:
  - **Data Protection**: Prevent data loss during system failures.
  - **Traffic Management**: Handle increased traffic.
  - **Improved Latency**: Enable regional strategies for faster access.
  - **Scaling**: Help applications scale efficiently.

**Modern Context**:

- Data in modern distributed systems is spread across multiple nodes.
- Networks are **notoriously unreliable**.
- **Replication Importance**:
  - Storing data in multiple locations is essential to prevent data loss.

**Replication Challenges**:

- Replication is straightforward when data doesn’t change much.
- Modern systems require strategies for handling:
  - **Write Requests**:
    - Propagating across multiple identical databases.
    - Ensuring **timeliness** and **consistency**.

- **Trade-Offs**:
  - Different replication strategies have pros and cons.

### **Leader-Follower Strategy**

- **Also Known As**: Primary-Replica.
- **Process**:
  - Writes are directed to a single **leader**.
  - The leader replicates data to its **followers**.

- **Synchronous Replication**:
  - Both leader and followers commit before a write is successful.
  - Ensures follower data is up-to-date.
  - **Cons**:
    - Slow.
    - Failures (e.g., a follower goes down) increase latency.

- **Asynchronous Replication**:
  - The leader sends writes to followers but doesn’t wait for acknowledgment.
  - **Pros**:
    - Faster than synchronous replication.
  - **Cons**:
    - Inconsistencies between leader and followers.
    - Risk of data loss if the leader fails.

### **Leader Failure**

- **Failover**:
  - When the leader fails, a replica is promoted to leader.
  - **Challenges**:
    - Losing write capabilities during failover.
    - **Asynchronous Replication Issues**:
      - Potential data loss during leader failure.
    - **Synchronous Replication Issues**:
      - High latency during failover.

### **Multi-Leader Strategy**

- **Process**:
  - More than one database can handle writes.
  - Mitigates leader failure.

- **Leader Election**:
  - Consensus algorithms like **Paxos** are used to elect a leader.

- **Cons**:
  - Slight lag due to replication between leaders.
  - Complexity in resolving discrepancies between leaders.

- **Pros**:
  - Enhanced durability and availability.

### **Leaderless Replication**

- **Why Avoid Leaders?**:
  - Leader election and conflict resolution are complex.

- **Popularized By**:
  - Amazon DynamoDB.

- **Methods to Handle Chaos**:
  - **Read Repair**:
    - Detect inconsistencies when nodes return different values.
    - Fix errors by sending write requests to inconsistent nodes.


**Choosing a Replication Strategy**:

- **When to Use Replication**:
  - Include replicas for any system beyond a basic server-database setup.

- **Key**:
  - Match the replication strategy to the system’s requirements.

---