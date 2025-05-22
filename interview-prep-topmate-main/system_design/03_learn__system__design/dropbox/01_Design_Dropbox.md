# Frontend System Design: File Sharing Service (Dropbox, Google Drive)

**Source:** [Watch on Youtube](https://www.youtube.com/watch?v=LVG64IiEvjw)

---

## **Introduction**

- Overview of file storage services:
  - Examples: **Dropbox**, **Google Drive**, **iCloud**.
- **Primary functionalities:**
  - Store files.
  - Access files from multiple devices.
  - Share files with others.

---

## **Step 1: Understanding the Application**

### **Key References:**

- Dropbox, Google Drive, Amazon Cloud Drive, Apple iCloud.

### **Primary Feature:**

- File storage with capabilities to:
  - **Add new files**.
  - **Browse and manage files**.

### **UI Features:**

- **Main screen:** Displays stored files and provides controls for:
  - Adding files.
  - Searching and sorting files.

### **Minimum Viable Product (MVP):**

- **Essential features from the start:**
  - **Search functionality** for effective usability, especially with >100 files.

---

## **Step 2: Clarifying Questions**

### **Q1: Scope of Design?**

- **Answer:** Focus on **frontend** and **API parts**.

### **Q2: Support for File Sharing?**

- **Answer:** Yes, with the ability to:
  - Share files with other users.
  - View files shared by others.

### **Q3: Offline Features?**

- **Answer:** Yes, including:
  - Mark files for offline availability.
  - Sync file status across devices.

### **Q4: Language Support?**

- **Answer:**
  - Initial: **English**.
  - Future: Support for multiple languages.

---

## **Step 3: Requirements Gathering**

### **Functional Requirements:**

- Users should be able to:
  - Add, browse, sort, and search files.
  - Share files with others.

### **Non-Functional Requirements:**

- **Accessibility:** Support for users with disabilities.
- **Performance:** Fast interactions.
- **Localization:** Multilingual capabilities.
- **Offline Mode:** Offline access to files.
- **Security:** Robust file protection.

---

## **Step 4: High-Level Architecture**

### **MVC Structure:**

- **Model:** Divided into:
  - **Client Store:** Holds mutable, client-specific data (e.g., sorting parameters).
  - **Responses Cache:** Stores server responses (immutable).
- **Controller:** Connects the View and Model:
  - Fetches data from Model/Server.
  - Handles **view events** and user actions.
- **View:** UI layer:
  - Displays data from Controller.
  - Sends user events back to Controller.

---

## **Step 5: Backend Components Overview**

### **Core Components:**

1. **App Server:**
   - Handles communication between frontend and backend.
   - Maintains business logic (e.g., file add/delete).
2. **Relational Database:**
   - Stores metadata (e.g., file names, descriptions, owners).
3. **File Storage:**
   - Stores binary files.
4. **CDN Servers:**
   - Speeds up file delivery by being closer to users globally.

---

## **Step 6: Component Details**

### **UI Components:**

1. **Header:**
   - Includes search, file addition, and sorting controls.
2. **Files Section:**
   - Grid representation of files in:
     - **Table view (default)**.
     - **List view**.
3. **Context Menu:**
   - Features: Rename, delete, move files/folders.

---

## **Step 7: Rendering Options**

### **Approaches:**

1. **Client-Side Rendering (CSR):**
   - Suitable for interactive SPAs (e.g., Dropbox, Google Calendar).
2. **Server-Side Rendering (SSR):**
   - Benefits: Faster initial loading for low-performance devices.
3. **Hybrid Rendering (Iteration):**
   - Combines CSR and SSR:
     - Pre-rendered pages load first.
     - Interactivity added progressively.

**Decision:** Use **iteration** for better performance on low-end devices.

---

## **Step 8: Data Model Design**

### **Entities:**

1. **File:**
   - Fields:
     - **Have Access:** List of user IDs with access.
     - **Access Requests:** Pending requests.
     - **Revision Number:** Tracks file versions.
     - **URL:** Download link.
2. **Folder:**
   - Fields:
     - **Items:** List of files/subfolders.

---

## **Step 9: Data Manipulation (Client vs. Server)**

- **Client-Side:**

  - Pros: High flexibility, quick feature additions.
  - Cons: Poor scalability for large datasets.

- **Server-Side:**
  - Pros: High scalability and performance.
  - Cons: Higher costs, requires backend coordination.

**Decision:** Perform data manipulations on the **server-side** for scalability.

---

## **Step 10: Key API Considerations**

### **Uploading Files:**

1. **Check if File Exists:**
   - Options: Replace, keep both, or cancel upload.
2. **Resumable Uploads:**
   - File ID helps resume from interrupted byte.
3. **Threshold:**
   - Implement for files >10MB in poor network areas.

### **Downloading Files:**

1. **Process:**
   - Retrieve file path from metadata in DB.
   - Fetch file from storage.

### **Sharing Files:**

1. **Endpoints:**
   - Separate for files and folders.
2. **Access Rights:**
   - Read-only for simplicity (avoid concurrency issues).
3. **API for Revoking Access:**
   - Options: Separate endpoint or unified with a revoke variable.

---

### Security

#### **File Encryption and Decryption**

- Protecting files against storage breaches:
  - **Encryption**:
    - Client sends a file to the server.
    - Server encrypts the file using a **Data Encryption Model** before storing it.
  - **Decryption**:
    - Client requests a file.
    - Encrypted file is decrypted by the server before being sent to the client.

#### **File Transfer Security**

- Concerns about file theft during transfer:
- Avoid **client-side encryption** due to:
  - Easier vulnerability to hacking.
  - Inconsistent encryption logic across platforms.
  - High resource consumption.
- Use **four security pillars**:
  - Encryption.
  - Secure transmission protocols (e.g., HTTPS).
  - Prevent unauthorized access.
  - Test for vulnerabilities.

#### **Preventing Vulnerabilities**

- Regular practices for maintaining security:
  - **Sandboxing**:
    - Isolate files during scanning to prevent malware from affecting the system.
  - **Antivirus scanning**:
    - Regularly scan the main storage for malware.
  - **User education**:
    - Provide clear guidelines on risks and security best practices.

---

### File Synchronization

#### **Methods**

- Three possible options:
  - **Visibility Change Event**:
    - Triggered when a user changes browser tabs.
    - Limitation: Ineffective for multiple devices.
  - **Polling (Short/Long)**:
    - Server checks for updates at intervals.
    - Not efficient for rare events like file updates.
  - **Server-Side Events (Recommended)**:
    - Uses HTTP protocol.
    - Efficient for infrequent updates.
    - Handles synchronization across instances effectively.

---

### Offline Mode

#### **Features**

- Offline capabilities:
  - Mark files as available offline.
  - Browse/download files without an internet connection.
  - Service Workers enable offline interface functionality.

#### **Implementation**

- Cache assets using **Service Workers** and **Cache API**:
  - Intercept and redirect failed requests to cached files.
- **IndexedDB**:
  - Stores files with high capacity and binary support.
  - For instance, Chrome allows up to 60% of disk space for storage.

---

### Localization

#### **Key Considerations**

- Supporting international users:
- Auto-detect user language via:
  - HTTP `Accept-Language` header.
  - IP-based detection.
- Manual language change option.
- Address **Right-to-Left (RTL)** languages:
  - Adjust text direction and element positioning.
  - Resize fonts for smaller, complex glyphs.

#### **Translation Formats**

- **JSON**:
  - Human-readable and widely supported.
  - Preferred over ICU for simplicity.

---

### Performance

#### **Network Performance**

- Optimization techniques:
  - Use **CDNs** for reduced latency.
  - Enable **server-side rendering** for static pages.
  - Implement caching for assets via Service Workers.

#### **UI Performance**

- Use **lazy loading** for non-essential elements like pop-ups and analytics scripts.
- **Skeleton screens** improve perceived loading times.
- **Infinite Lists**:
  - Efficient rendering for long lists of files.
  - Replace pagination with dynamic file loading.

---

### General Security Recommendations

#### **Cross-Site Scripting (XSS)**

- Mitigation strategies:
  - Sanitize user input before server transmission.
  - Avoid unsafe DOM methods (e.g., `innerHTML`).
  - Use **Content Security Policy (CSP)** and **Trusted Types**.

#### **Cross-Site Request Forgery (CSRF)**

- Prevent unauthorized actions:
  - Use `SameSite` cookie attribute.
  - Implement **CSRF tokens** for robust protection.
  - Utilize `Origin` and `Referer` headers where possible.

#### **Clickjacking**

- Prevent iframe-based attacks:
  - Set **X-Frame-Options** header to restrict iframe usage.

---

### Closing Remarks

#### Summary

- Addressed essential operations (e.g., adding, sharing, synchronizing files).
- Non-functional requirements:
  - **Accessibility**: Semantic elements and ARIA attributes.
  - **Localization**: Multi-language support, including RTL considerations.
  - **Offline Support**: IndexedDB and Service Workers.
  - **Security**: Encryption, sandboxing, and CSRF/XSS prevention.

---

## References

- Derived from Dropbox documentation and engineering blogs.

---
