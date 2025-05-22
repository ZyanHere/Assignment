# System Design Interview - Tips & Tricks

### Biggest Mistakes to Avoid

[YouTube Video](https://www.youtube.com/watch?v=4Q2fokImKfM)

---


#### **Introduction**

- **Biggest Mistakes Candidates Make:**
  - Not clarifying whether the interview requires a **low-level design** or a **high-level design**.
  - Jumping straight into class-level diagrams with classes, functions, etc., without understanding expectations.

#### **Tip 1: Clarify Requirements**

- **Example:**
  - If the interviewer asks to design Uber, avoid jumping straight into the solution.
  - Uber has multiple functionalities, and the interviewer may be interested in specific ones.
- **Action Point:**
  - Always clarify functional requirements before starting the design.
  - Non-functional requirements such as **scale**, **throughput**, and **data size** can drastically alter the design.

#### **Tip 2: Understand Scale**

- **Example:**
  - A chat application for **50 employees** is very different from a chat application like **WhatsApp** for billions of users.
  - If the interviewer expects a small-scale solution and you design for billions, it’s a disaster.
- **Action Point:**
  - Confirm the **scale** expectations: number of users, throughput, and data size.

#### **Tip 3: Manage Your Time**

- **Common Issue:**
  - Spending too much time on one component and neglecting others.
- **Solution:**
  - In a **high-level design** interview:
    - Start with the **basic building blocks** (components and their interactions).
    - Then, dive into the depth of **one or two key components**.
  - Ask the interviewer which components to focus on.

#### **Tip 4: Avoid Assumptions**

- **Action Point:**
  - Give the interviewer the opportunity to guide you.
  - Avoid pre-meditating solutions for specific functionalities.

#### **Tip 5: Acknowledge What You Don’t Know**

- **Common Mistake:**
  - Assuming you need to know everything and presenting incorrect solutions.
- **Action Point:**
  - If you don’t know something:
    - Admit it.
    - Offer a possible approach (e.g., "I don’t know how to build a rate-limiting system, but I would approach it like this...").
  - Ask for feedback or tips from the interviewer.

#### **Final Thoughts**

- These tips will help you avoid the **most common pitfalls** in a system design interview.

---
