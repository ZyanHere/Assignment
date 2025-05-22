# [Frontend System Design] - Deep Dive into HTTP

[Watch on Youtube](https://www.youtube.com/watch?v=gxF9fLo5XQw)

---

### **Introduction**

- **Topic**: HTTP Protocol - A technology everyone uses but few understand deeply.
- **Goals**:
  - Overview of the HTTP protocol.
  - Explore deficiencies in early versions.
  - Discuss outdated performance tricks and their modern relevance.
- **Structure**:
  - **Part 1**: Overview and historical context.
  - **Part 2**: Deep dive into HTTP/2.0.

---

### **How the Web Works**

1. **Basic Request Flow**:

   - Browser requests the real address of `frontendengineer.io` from a **DNS server**.
   - DNS translates the human-friendly domain name to a machine-friendly **IP address**.
   - Browser initiates a **TCP connection** to:
     - Port **80** (HTTP) or
     - Port **443** (HTTPS).
   - If HTTPS is used, extra steps for encryption setup are involved.

2. **Page Rendering**:

   - Browser requests the **index.html** file.
   - During parsing, additional resources like **JavaScript**, **CSS**, and **images** are requested.
   - These are **critical resources** and must load before rendering the page.
   - After the initial render, background requests (e.g., **onload** or tracking requests) may occur.

3. **Repeat Process**:
   - Every new page request follows the same schema.

---

### **What is HTTP?**

- **Definition**: HTTP stands for **HyperText Transfer Protocol**.
- **Initial Purpose**:
  - Transfer **hypertext documents** (documents with links to other documents).
  - Early versions supported only text-based documents.
- **Evolution**:
  - Developers realized HTTP could transfer other resources like images, files, and binary data.
- **Dependencies**:
  - Requires a network connection.
  - Operates over **TCP/IP**.

---

### **HTTP in the OSI Model**

- HTTP operates as part of a **layered approach** described by the **OSI Model**:
  1. **Application Layer**:
     - Deals with HTTP request/response communication.
  2. **Presentation Layer**:
     - Describes file formats (e.g., **JavaScript**, **CSS**, **PNG**).
  3. **Session Layer**:
     - Ensures connection security (e.g., **HTTPS** encryption).
  4. **Transport Layer**:
     - Manages data transfer protocols (**TCP** for HTTP).
  5. **Network Layer**:
     - Handles Internet Protocol (**IP**).
  6. **Data Link Layer** and **Physical Layer**:
     - Manages signal transmission (e.g., **Wi-Fi**, **Ethernet**).

---

### **Evolution of HTTP**

#### **HTTP 0.9**

- **Features**:
  - Only supported the `GET` method.
  - Requests returned raw streams of ASCII characters.
  - No error codes or headers.
  - Stateless and idempotent (same response for identical requests).
- **Syntax**:
  ```http
  GET /index.html
  ```

#### **HTTP 1.0**

- **Major Enhancements**:
  1. **New Methods**:
     - `HEAD`: Fetch resource metadata without downloading the resource.
     - `POST`: Send data to the server (e.g., form submissions).
  2. **Versioning**:
     - HTTP version field added for backward compatibility.
  3. **Headers**:
     - Supported request and response headers.
  4. **Response Codes**:
     - Introduced **404** and other status codes.
- **Example**:
  ```http
  GET /index.html HTTP/1.0
  Host: frontendengineer.io
  Accept: text/html
  ```

---

### **HTTP 1.1**

- **Key Features**:
  1. **Mandatory Host Header**:
     - Specifies the domain for virtual hosting.
     - Example:
       ```http
       Host: www.example.com
       ```
  2. **Persistent Connections**:
     - Connections remain open for multiple requests.
     - Enabled with `Connection: keep-alive`.
  3. **Caching Mechanisms**:
     - Introduced headers for efficient browser caching (e.g., `Cache-Control`).
  4. **New Methods**:
     - Added methods like `PUT`, `OPTIONS`, `TRACE`, and `DELETE`.
  5. **Improved Status Codes**:
     - Expanded error and informational codes.
  6. **Proxy & Authentication**:
     - Supported secure and proxy-based communications.

---

### **HTTP 1.1 Limitations**

1. **No Parallel Resource Loading**:
   - Sequential resource loading caused significant delays.
2. **Large Header Size**:
   - Headers in text format increased payload sizes.
3. **Inefficient Protocol for Modern Web**:
   - Unable to handle the complexity of dynamic and interactive websites.

---

### **Performance Workarounds**

1. **Multiple Connections**:
   - Browsers open 6 connections per domain for parallel loading.
   - **Downside**: Increases resource consumption and latency.
2. **Domain Sharding**:
   - Serve assets from subdomains to bypass the connection limit.
   - **Downside**: Higher infrastructure costs and inefficiencies.
3. **Request Reduction**:
   - Techniques:
     - **Caching**: Use browser cache for static assets.
     - **Image Sprites**: Bundle multiple images into a single file.
     - **CSS/JS Bundling**: Merge files into larger bundles.
     - **Inlining Critical Resources**: Embed styles in HTML.
   - **Downside**: Increased payload size and caching complexity.

---

### **Conclusion**

- **Challenges**:
  - HTTP 1.1's limitations led to performance bottlenecks.
  - Workarounds introduced their own complexities and costs.

---
