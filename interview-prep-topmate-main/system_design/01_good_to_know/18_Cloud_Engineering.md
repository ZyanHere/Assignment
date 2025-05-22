# Cloud Engineering Interview Questions and Concepts

---


**Introduction**

- We’re discussing **seven Cloud engineering questions**.
- **Host**: Kevin Wei, an Enterprise Product Manager.
- Purpose: Help you **land your dream job in tech**.
- **Focus**: Refresher for **system design** concepts.

---

#### **Question 1: When should an organization use a hybrid Cloud architecture?**

- **Definition**: Hybrid Cloud helps businesses maintain **security** while decreasing **workload**.
- **Use Cases**:
  - Store **sensitive data** on private servers locally.
  - Use the **public Cloud** for resource-intensive needs.
- **Benefits**:
  - Enhanced **security** for sensitive data.
  - Flexible resource allocation based on needs.

---

#### **Question 2: What are load balancers?**

- **Definition**: Load balancers distribute traffic across servers.
- **Advantages**:
  - Improved **performance**.
  - Reduced **response time**.
  - Increased **availability**.
- **Key Functions**:
  - Distribute traffic evenly.
  - Reduce request handling time.
  - Ensure application availability even if some servers are down.

---


#### **Question 3: What’s the difference between horizontal scaling and vertical scaling?**

- **Horizontal Scaling**:
  - Adding **new servers** to handle increased traffic.
- **Vertical Scaling**:
  - Adding **more resources** (CPU, RAM) to existing servers.

---


#### **Question 4: What’s the difference between SQL and NoSQL?**

- **SQL Databases**:
  - Based on **relational models**.
  - **Features**:
    - Tabular format.
    - ACID compliance.
    - Vertical scalability.
  - Example: **Amazon RDS**.
- **NoSQL Databases**:
  - Based on **non-relational models**.
  - **Features**:
    - Dynamic schema for unstructured data.
    - Easier horizontal scaling.
    - Built-in sharding.
  - Example: **DynamoDB**.

---


#### **Question 5: What is database sharding?**

- **Definition**: Database sharding or partitioning splits a database into smaller pieces called **shards**.
- **Features**:
  - Each shard contains a **subset of data**.
  - Shards are stored on **separate servers**.
- **Advantages**:
  - Improved **performance**, **scalability**, and **availability**.
- **Implementation**:
  - Pre-built in **NoSQL databases**.
  - Requires manual implementation in **SQL databases**.

---


#### **Question 6: What’s the difference between authentication and authorization?**

- **Authentication**:
  - Verifies a user’s **identity**.
- **Authorization**:
  - Grants access to authenticated users.
- **Example**:
  1. Logging into a website (**authentication**).
  2. Checking access permissions for a page (**authorization**).

---


#### **Question 7: Can you upgrade or downgrade a system with near-zero downtime?**

- **Yes**, using:
  - **Blue-Green Deployment Strategy**:
    - Two systems: one running the **current version**, one running the **new version**.
    - Load balancer directs traffic to the new version.
    - Decommission the old version after testing.
  - **Canary Release Strategy**:
    - Roll out the new version to a **small subset** of users.
    - Test and verify functionality.
    - Roll out to all users or **rollback** changes if needed.

---


#### **Conclusion**

- These **seven questions** are essential for your Cloud engineering interview.

---

