# Cracking Frontend System Design Interview

**[Watch on YouTube](https://www.youtube.com/watch?v=QemIfzcEeMM)**

---


- How to crack **frontend system design interviews**.
- Topics such as:
  - **HLDs** (High-Level Designs)
  - **LLDs** (Low-Level Designs)
  - **Tech stack discussions**
  - Performance considerations
  - Functional and non-functional requirements
  - Component architecture and implementation details

**Different Types of System Designs Asked in Companies:**

- **Flipkart**: Product Sense
- **Uber**: UI Architecture
- **Google**: Design Round
- **Microsoft**: System Design Round

Each focuses on specific requirements and processes.

We will also explore:

- Tools for cracking system design interviews.
- Mantras for excelling in system design rounds.

---

### **Example: Saiteja's Tech Journey**

**Scenario:**

- Saiteja's offline business was thriving.
- Competitors started online businesses.
- Saiteja decided to develop an **app and website** for easy customer access.

**Tech Team Setup:**
- **Senior Developer**: Understands infra-level system design, scaling, performance, and security.
- **Junior Developer**: Writes code, develops features under senior guidance.

**System Design as a Key Judging Criterion:**
- Helps evaluate senior developers' skills and their ability to design systems effectively.

---

### **Understanding System Design Rounds**

**Key Rounds:**
- **Product Sense:** Product, tech, UX/UI
- **Architecture:**
  - Functional requirements
  - Tech scoping
  - Component design
  - High and low-level design
- **Machine Coding:** Primarily low-level development

**Frontend System Design Interview Components:**

1. **Requirement Gathering**:
   - Functional requirements
   - Non-functional requirements

2. **Scoping and Prioritization**:
   - Define MVP (Minimum Viable Product).

3. **Tech Choices:**
   - Libraries, frameworks, and technologies.

4. **Component Architecture:**
   - Communication between components and APIs.

5. **Common Open-Ended Questions:**
   - Build applications like **Flipkart**, **WhatsApp**, **Instagram**, etc.

---

### **Functional and Non-Functional Requirements**

**1. Functional Requirements:**

- Demand-side or supply-side considerations:
  - **B2B** (Business-to-Business)
  - **B2C** (Business-to-Consumer)

- Start with high-level modules:
  - **User Management**
  - **Help & Support**
  - **Payment Gateway**
  - **Product Listing**
  - **Cart Page**
  - **Accounts Management**

**2. Non-Functional Requirements:**

- Mobile/Desktop compatibility
- Responsive vs. Adaptive Design
- Internet speed considerations
- Accessibility for users with disabilities
- Performance metrics:
  - **FCP (First Contentful Paint)**
  - **LCP (Largest Contentful Paint)**
  - **TTI (Time to Interactive)**
- Security measures:
  - Cross-Site Scripting (XSS)
  - Content Security Policy (CSP)
- Caching strategies
- Offline support
- Logging and monitoring
- A/B testing and feature flags

---

### **Tech Choices**

**Key Aspects:**

- Libraries and frameworks (e.g., React, Angular, Vue).
- State management (e.g., Redux, Context API).
- Folder structure (e.g., Ducks model).
- Design systems:
  - Custom vs. existing (Material Design, Ant Design).
- Build tools (e.g., Webpack, Parcel).

---

### **Component Architecture**

**Key Considerations:**

- Component hierarchy and modular design.
- Routing and state management.
- Data sharing between components.
- Reusability and customization:
  - Theming
  - Layout

---

### **Data APIs and Protocols**

**Protocol Options:**

- REST vs. GraphQL
- SSE (Server-Sent Events)
- RPC (Remote Procedure Call)

**Implementation Details:**

- Pagination and infinite scroll:
  - Throttling
  - Intersection Observer
- API Design:
  - Product list retrieval
  - Add/remove items from cart

**Data Modeling:**

- Request structure (query params vs. body).
- Response structure:
  - Data handling
  - Error management

---

### **HLD vs. LLD**

**HLD (High-Level Design):**

- Requirement gathering and scoping
- Prioritization
- Tech choices

**LLD (Low-Level Design):**

- Detailed implementation:
  - Auto-complete
  - Chat applications
  - Customizable forms

---

### **Mantras for Cracking System Design Rounds**

1. Understand interviewer expectations.
2. Keep talking to showcase your thought process.
3. Don’t rush into implementation.
4. Tackle one problem at a time.
5. Practice mock interviews with tools (e.g., Draw.io, Lucidchart).

---