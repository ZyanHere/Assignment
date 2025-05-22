# How to Ace Front End System Design at MANNG


[Watch on YouTube](https://www.youtube.com/watch?v=4_DcDjPK6R8)

---

  > To receive good feedback, you need to understand the **qualities companies look for** in a candidate.

### **Qualities Interviewers Look For**

1. **Ability to Deal with Ambiguity:**
   - Initial system design questions are often broad, e.g., "Design a travel search website like Kayak."
   - Ask **clarifying questions** to:
     - Understand the problem space.
     - Identify supported and unsupported use cases.
     - Scope down requirements and build consensus.
   - Goal: Produce artifacts that include functional and non-functional requirements.

2. **Completeness:**
   - Provide a design that meets basic requirements and is a reasonable solution.
   - **Things to cover:**
     - Functional areas.
     - Trade-offs.
     - Limitations.

3. **Trade-offs and Bottleneck Identification:**
   - System design is all about trade-offs.
   - Example scenarios:
     - For large data lists: Use **paginated tables** or **infinite scroll**.
     - For chat applications: Compare **WebSockets**, **server-sent events**, and **long polling**.
     - For newspaper designs: Discuss **client-side rendering**, **static-site generation**, and **server-side rendering**.
   - **Pro tip:** Proactively mention trade-offs and mitigation strategies if interviewing for mid-to-senior-level positions.

---

### **System Design Interview Breakdown**

#### **Timeline:**
1. **Introduction and Warmup Questions:**
   - The interviewer presents the problem.

2. **Use Case Exploration (5–10 minutes):**
   - Explore use cases and gather requirements.
   - Scope down to an MVP version.
   - Discuss future feature additions.
   - Confirm with the interviewer.

3. **Design Phase (15–20 minutes):**
   - Areas to cover:
     - **Tech Stack:**
       - Briefly discuss pros and cons of your choice.
       - Mention focus areas (frontend stack, middle-tier assumptions).
     - **APIs:**
       - List needed APIs.
       - Discuss request and response data formats.
       - Illustrate data flow (e.g., preloading data for initial routing).
       - Define data polling frequency and scalability considerations.
     - **Component Architecture:**
       - Discuss component hierarchy and composition.
       - Draw diagrams showing state and props flow.
       - Describe state management and data caching.
     - **Failure Modes:**
       - Plan for error handling and graceful degradation.

4. **Deep Dive:**
   - Address specific areas of interest.
   - Respond to probing questions.
   - Adapt designs based on interviewer hints.

---

### **Dos and Don'ts**

#### **Dos:**
- Be honest about knowledge gaps.
- Focus on strengths and navigate the conversation to areas you are confident in.
- Collaborate with the interviewer.
- Follow a structured framework to cover discussion points.

#### **Don'ts:**
- **Jumping to solutions without clarifying requirements:**
  - This is a red flag.
- **Ignoring interviewer feedback:**
  - Interviewers often provide hints to guide you.
- **Defensiveness during questioning:**
  - This makes you look uncoachable.

---

### **Clarifying Questions**

#### **General Questions:**
1. **Who are the users?**
   - Developers? (e.g., GCP, AWS)
   - System admins? (e.g., CMS admin portal)
   - General users? (e.g., video streaming service)
2. **How are they using the system?**
   - Mobile, desktop, or tablet?
   - Accessibility support? (e.g., screen readers, slow networks, offline usage)
3. **What do they use the system for?**
   - Define top features to support.
4. **Scale considerations:**
   - How many users?
   - Data set size?
5. **Failure scenarios:**
   - Plan for error handling, testing strategies, observability, and metrics.

---

### **Types of System Design Questions**

1. **High-Level Design (Product Design):**
   - Example: Design YouTube or a chat application.
2. **Low-Level Design (Component Design):**
   - Example: Frontend components.
   - Check related videos for deeper dives.

---

