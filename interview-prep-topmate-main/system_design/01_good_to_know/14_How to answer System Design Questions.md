# How to Answer System Design Interview Questions (Complete Guide)

[Watch on YouTube](https://www.youtube.com/watch?v=L9TfZdODuFQ)

---

#### **Introduction**
- **Purpose**: System design interviews evaluate your ability to:
  - Design a system or architecture to solve a complex, real-world problem.
  - Analyze problems, discuss solutions, and weigh pros and cons.
- **Key Points**:
  - The goal is not to create a perfect solution but to draft a workable blueprint.
  - Showcase your thought process, clarity, and systematic approach.

#### **Why Use a Framework?**
- Organizes your thoughts quickly.
- Enables logical progression and effective communication.
- Helps manage time in a 45-minute interview setting.

#### **The Framework: 5 Steps**
1. **Define the Problem Space**
2. **Design the System at a High Level**
3. **Deep Dive into the Design**
4. **Identify Bottlenecks and Scaling Opportunities**
5. **Review and Wrap Up**

---


#### **Step 1: Define the Problem Space**
- **Objective**: Narrow the problem scope from broad to specific.
- **Key Actions**:
  - Ask clarifying questions.
  - Define functional and non-functional requirements.
  - State assumptions and decisions clearly.
  - Consider system constraints like availability, consistency, speed, and cost.
- **Tips**:
  - Engage the interviewer by explaining your reasoning.
  - Focus on critical constraints based on business objectives or user experience.

#### **Estimations**
- Calculate metrics such as storage size or bandwidth requirements.
- Make assumptions about user volume and behavior (check with the interviewer).

---


#### **Step 2: Design the System at a High Level**
- **Objective**: Outline the fundamental pieces of the system and their interactions.
- **Key Actions**:
  - **Design APIs**:
    - Define request parameters, response types, and API types (REST, SOAP, GraphQL, etc.).
    - Provide justifications for your choices.
  - **Create a High-Level Design Diagram**:
    - Show data flow and control flow.
    - Highlight critical components without delving into scalability yet.

---


#### **Step 3: Deep Dive into the Design**
- **Objective**: Explore system components and relationships in detail.
- **Key Actions**:
  - Address how non-functional requirements impact design choices.
  - Present multiple design options with their pros and cons.
  - Justify preferred options based on given constraints.
- **Example Considerations**:
  - Partition databases for large data storage.
  - Use load balancers for traffic distribution.

---


#### **Step 4: Identify Bottlenecks and Scaling Opportunities**
- **Objective**: Ensure the system can handle growth and various conditions.
- **Key Questions**:
  - Are there single points of failure? How can we improve robustness?
  - Do we need data replication for reliability? How do we maintain consistency?
  - Should we deploy multi-geo data centers for global services?
  - How do we handle peak usage or hot users?
  - Can the system scale to 10x more users?
- **Scaling Techniques**:
  - Horizontal sharding.
  - CDN (Content Delivery Network).
  - Caching, rate limiting, SQL/NoSQL databases.

---


#### **Step 5: Review and Wrap Up**
- **Objective**: Summarize and validate your design.
- **Key Actions**:
  - List major decisions with justifications and trade-offs.
  - Ensure all requirements are satisfied.
  - Identify potential areas for improvement.

#### **Interview Timing**
- **45-minute structure**:
  - ~5 minutes for introductions and closing questions.
  - ~40 minutes for problem-solving and design.

---

**Good luck!**

