# Frontend System Design - Chat Application

**[Watch on Youtube](https://youtu.be/LEaiGjffLEs?si=L0Riur11vZZadZYd)**


---


### **Introduction**
- **Topic**: Chat Application Design for front-end.  
  - Focus on real-time messaging, architecture, and data handling.
- **General Plan**:
  1. General Requirements.
  2. Functional Requirements.
  3. Components Architecture.
  4. Data API and Protocol.
  5. Data Entities.
  6. Optimization and Accessibility.

---

## **General Requirements**
- **Core Features**:
  - Send and receive messages.
  - Attach media:
    - Video, Audio, Pictures, Location.
  - View contact list.
  - Share messages.

---

## **Functional Requirements**
- **Real-Time Messaging**:
  - Low latency (40-60ms acceptable delay).
- **Network Adaptability**:
  - Functionality on poor network connections.
- **Resource Efficiency**:
  - Minimize battery and resource consumption.
- **Multi-Platform Support**:
  - Compatibility with a wide range of devices.

---

## **Components Architecture**
- **Key Components**:
  1. **Contact List**:
     - Avatar and Contact Name.
     - Search functionality.
  2. **Chat View**:
     - Messages and attachments.
     - Input text box.

- **Attachments**:
  - **Types**: Video, Photo, Link, Contact, Location.
  - **Actions**:
    - Emoji, Photo Attachment, Audio Recording, Location Sharing.
- **Message Actions**:
  - Reply, Copy, Share, Delete.

---

### **Component Hierarchy**
- **Top-Level**:
  - **Chat App**:
    - Contact List.
    - Chat View.
- **Contact List**:
  - Contains Contacts.
- **Chat View**:
  - **Message List**:
    - Messages and Attachments.
  - **Controls**:
    - Input Box and Emoji Picker.

---

## **Data API and Protocol**

### **Protocol Options**:
1. **Long Polling**:
   - **Pros**:
     - Simple HTTP-based implementation.
     - Benefits from HTTP scalability and compatibility.
   - **Cons**:
     - High latency due to frequent reconnections.
     - Traffic overhead from repeated headers and tokens.

2. **WebSockets**:
   - **Pros**:
     - Full duplex communication.
     - Very low latency.
   - **Cons**:
     - Resource-intensive (persistent TCP connections).
     - Not HTTP/2 compatible.
     - Hard to load balance due to proxies and firewalls.

3. **Server-Side Events (SSE)**:
   - **Pros**:
     - Compatible with HTTP/2.
     - Resource-efficient and lightweight.
     - Easy to load balance.
   - **Cons**:
     - Unidirectional communication.
     - Limited to text data.

### **Hybrid Approach**:
- **Receiving Messages**: Server-Side Events.
- **Sending Messages**: HTTP POST requests.

---

## **API Design**
1. **Subscribe to Updates**:
   - Parameters: `API Key`, `User ID`.
   - Purpose: Receive message updates.
2. **Get Contacts**:
   - Parameters: `API Key`, `User ID`.
   - Purpose: Retrieve contact list.
3. **Attach Media**:
   - Parameters: `User ID`, `Message ID`, `Binary Data`.
   - Purpose: Upload media for messages.
4. **Send Message**:
   - Parameters: `API Key`, `User ID`, `Message Content`.
   - Purpose: Push new messages to the server.

---

## **Data Entities**
### **Contact**:
- **ID**: Unique identifier.
- **Name**: Contact name.

### **Message**:
- **ID**: Unique identifier.
- **Content**: Text message.
- **Attachments**: Optional array.
- **Author ID**: Sender's ID.
- **Receiver ID**: Recipient's ID.

### **Attachment**:
- **ID**: Unique identifier.
- **Message ID**: Parent message reference.
- **Type**: Link, Video, Audio, etc.
- **Content**: URL of the attachment.

---

## **Data Storage**
- **Fetching Data**:
  - Contacts stored in a normalized format.
  - Messages organized under each contact ID.
- **Storage Schema**:
  - **Contacts Store**: Indexed by `Contact ID`.
  - **Messages Store**: Indexed by `Contact ID`.
  - **Attachments Store**: Indexed by `Message ID`.

---

## **Optimization**

### **Network Performance**:
- **Compression**:
  - Use Brotli for modern browsers.
  - Minify resources for smaller payloads.
- **HTTP/2**:
  - Multiplexed connections for parallel resource loading.
- **Bundle Splitting**:
  - Separate vendor, chat code, and ES6 bundles for modern devices.
- **Efficient Image Formats**:
  - Use WebP with PNG as fallback.
- **Lazy Loading**:
  - Defer non-critical resources using `<link rel="preload">`.
- **Image Optimization**:
  - Serve optimized images through CDN based on device.

### **Rendering Performance**:
- **Inline Critical Resources**:
  - Load critical CSS and JS with the HTML.
- **Avoid Reflows**:
  - Use CSS animations over JavaScript.
- **Placeholders**:
  - Use skeleton screens for loading states.

### **JavaScript Performance**:
- **Code Minification**:
  - Ship optimized bundles with minimal polyfills.
- **Service Workers**:
  - Cache messages, images, and scripts for offline usage.

---

## **Accessibility**

### **Core Principles**:
1. **Responsive Design**:
   - Use `rem` units for consistent scaling.
2. **Keyboard Shortcuts**:
   - Navigate contacts, messages, and attachments using hotkeys.
3. **Color Blindness**:
   - Provide color schemas for accessibility.
4. **Live Regions**:
   - Announce dynamic updates using `aria-live`.

---

## **Conclusion**
- **Completed Overview**:
  - Components Architecture.
  - Protocol Selection (Hybrid Approach).
  - API and Data Entities.
  - Storage Structure.
  - Optimization and Accessibility.

----


