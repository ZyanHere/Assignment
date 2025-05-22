# CAP Theorem for System Design Interviews

[Watch on Youtube](https://www.youtube.com/watch?v=BTKBS_GdSms)

---


We're going to talk about the **CAP theorem**. 

- **Presenter:** Kevin Way
- **CAP Theorem Overview:**
  - Stands for **Consistency, Availability, and Partition Tolerance**.
  - **Consistency:** All users see the same data at the same time.
  - **Availability:** The system is always available for reads or writes, even with node failures.
  - **Partition Tolerance:** The system continues to function even if communication between nodes fails.
- **Key Insight:** Only two of the three properties can be ensured in a distributed system.

---

#### **Important Note**

Before diving deeper:
- Like, subscribe, and hit the notification bell for weekly videos.
- It helps the algorithm and supports content creation.

#### **System Design Assumption**

- **Network Partitions Will Happen**: To offer reliable service, **Partition Tolerance** is necessary.
- This means we must trade-off between **Consistency** and **Availability**.

---


#### **Consistency in CAP Theorem**

- **Definition:** After a write is sent to the database, all read requests sent to any node return the updated data.
- **Example:** During a network partition:
  - Both **Node A** and **Node B** reject write requests to ensure identical data states.
  - Otherwise, Node A would have updated data, and Node B would have stale data.

- **Strong Consistency:**
  - Ensures data is updated immediately and reflects instantly on all nodes.
  - However, in distributed systems, **instantaneous communication** is impossible due to physical separation and time required for data transfer.

---


- **Real-World Consistency:**
  - Databases prioritizing consistency are often **eventually consistent**.
  - This means a very short, usually unnoticeable, lag time between nodes.

#### **Summary:**

- Consistency ensures all users see the same data at the same time, even in distributed systems.

---


#### **Availability in CAP Theorem**

- **Definition:**
  - Availability allows nodes to successfully complete requests, even if data across nodes is inconsistent.
  - **Example:** One node may contain stale data while another has the updated data.

- **Eventual Consistency:**
  - After a network partition is resolved, all nodes eventually sync to the same updated data.

#### **Scenario:**

- **Node A** updates first.
- **Node B** updates after some time.

---


#### **Consistency vs. Availability:**

- **When to prioritize consistency:**
  - For data that **must be up-to-date**.
- **When to prioritize availability:**
  - When **slightly outdated data** is acceptable.

#### **Example 1:**

- **App:** Amazon
- **Scenario:** Shoppers browsing and purchasing products.
- **Requirement:** Consistency.
  - Ensure products in stock to avoid refunding unavailable items.
  - Avoid multiple shoppers purchasing the same product when only one is available.

---


#### **Example 2:**

- **Scenario:** PM decides it is more cost-effective to refund shoppers than show products as out-of-stock during a network failure.
- **Requirement:** Availability.
  - Allow purchases during network failure.
  - Refund orders as necessary.

---


#### **Key Points About Writes and Reads:**

- **Writes:**
  - Discussed in-depth because they affect data state.
  - Writes require re-syncing between nodes during network partitions.

- **Reads:**
  - Do not affect data state.
  - Handled consistently across both consistent and available databases.

---


#### **Conclusion:**

- Understanding CAP theorem helps you make informed trade-offs in system design.

---
