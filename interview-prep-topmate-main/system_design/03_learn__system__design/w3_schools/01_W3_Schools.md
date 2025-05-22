# Frontend System Design of W3Schools 

[Watch on Youtube](https://www.youtube.com/watch?v=JwxzDXnDBhw)


---


**Introduction:**  
- We have a special guest, SP, who is an **SDE3 at Atlassian**. We will conduct a mock interview focusing on the **high-level system design** of **W3Schools**.

---

**Overview:**
- Discuss various technologies, frameworks, and features of **W3Schools**:
  - Multi-language support.
  - Code editor with live preview.
  - Deployment strategies for libraries/frameworks.
  - Open-source contributions.
- Thought process during a system design interview:
  - Functional vs. non-functional requirements.
  - Architectural design.
  - Performance, security, and deployment considerations.

---

**Core Functionalities of W3Schools:**
1. Tutorials (static pages).
2. Code Editor with live output.
3. Quizzes for scores and certifications.
4. Sign-in and sign-up functionalities.
5. Navigation and layout management.

---

**Design Approach:**
1. Divide into two parts:
   - **UI Design**
   - **Backend Architecture**
2. Flexibility in requirements:
   - List functional requirements.
   - Decide which to prioritize.

---

**Functional Requirements:**
- Tutorials (static content like images, videos, or code).
- **Try Yourself**: Code editor + live output.
- Quizzes for scoring and certifications.
- Sign-in and sign-up functionality.
- Enhanced features:
  - **Search Functionality**.
  - Filters and sorting.
  - User roadmaps for guided study.
  - Coding challenges with leaderboard integration.
  - Like/dislike for challenges and tutorials.

---

**Additional Enhancements:**
- Features beyond **W3Schools**:
  - Clear roadmaps for users.
  - Challenges beyond basic quizzes (e.g., **coding challenges**).
  - Framework-related support (e.g., JavaScript, React).

---

**Non-Functional Requirements (NFRs):**
1. **Framework Support:**
   - Multiple frameworks and languages (HTML, CSS, JavaScript).
2. **Security:**
   - Frontend and backend security.
   - Sanitize input in live editors.
3. **Accessibility:**
   - User-friendly interface and navigation.
   - Minimal load times.
4. **Usability:**
   - Enhanced user experience.
5. **Deployment:**
   - Scalable and version-controlled updates.
6. **Future Contributions:**
   - Enable users to add challenges directly.

---

**Prioritization:**
1. High Priority:
   - Framework support.
   - Challenges and problem statements.
   - Roadmap guidance for users.
   - Live code editor.
2. Medium Priority:
   - Search, filter, and sort functionality.
   - Leaderboards.
   - Like/dislike for challenges.

---

**High-Level Architecture:**
#### Core Components:
- **Problem Statements:**
  - JSON or single file-based architecture.
- **Code Editor:**
  - Displays problem statements.
  - Shows tutorials.
- **Backend Connectivity:**
  - Handles complex functionalities like SQL execution.

---

**Multi-Framework Support:**
#### Initial Approach:
1. Start with one technology (e.g., React).
2. Extend support for additional frameworks.
   - Use iFrames for isolated integrations.
3. Challenges:
   - CSS conflicts.
   - Overlapping dependencies.

#### Preferred Approach:
- **Micro Frontend Architecture:**
  - Core acts as host (React).
  - Independent child applications (React, Vue, Angular).
- **Parent-Child Communication:**
  - Core manages interactions.
  - Avoid cross-communication between child applications.

---

**Security Considerations:**
- Frontend sanitization to prevent injection attacks.
- Backend validations for stored data.
- Strict control over third-party plugin integrations.

---

**Deployment Strategy:**
1. **Monorepo Architecture:**
   - Centralized codebase for all frameworks.
   - Simplifies deployment with tools like **NX** or **Turborepo**.
2. **Version Control:**
   - Use latest versions where possible.
   - Allow flexibility for incremental upgrades.
3. **GitHub Actions:**
   - Automate build and deployment.
   - Cache dependencies to reduce build times.

---

**Practical Implementation:**
#### Frontend Mini Challenges:
- Platform for frontend challenges.
- Features:
  - Supports JavaScript, React, Vue, Angular.
  - GitHub-based contribution.
  - Hosted on **GitHub Pages** with CI/CD pipelines.
#### Deployment Workflow:
- Install dependencies.
- Build all components (host + tech-specific).
- Merge into single deployment folder.
- Deploy to GitHub Pages/Netlify.

---

### **Code Block Example:**
```javascript
// Example GitHub Actions Workflow
name: Deploy Frontend Mini Challenges

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2

    - name: Install Dependencies
      run: npm install

    - name: Build Application
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---
