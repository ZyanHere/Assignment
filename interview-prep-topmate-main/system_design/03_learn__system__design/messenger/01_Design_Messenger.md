## **Front-End System Design - Design Messenger App**

**Source:** [Watch on Youtube](https://youtu.be/utWopFyY5cE?si=2i2SsSGzUZtFZK8s)

---

### **Introduction**

- **Task:** Design a **messenger application**.
- **Approach:**
  - Follow the **six-step process** for system design.
  - Clarify the scope and requirements before diving into technical details.

---

### **Problem Clarification**

1. **What is the scope of the web app?**

   - A **replica of the native app**.
   - Focus on **direct messaging** and group chats.

2. **Is SEO a concern?**

   - **No**. Use **SPA (Single Page Application)** for simplicity.

3. **Is PWA support needed?**

   - **Yes**, but prioritize **desktop-first** design for this implementation.

4. **Target audience:**
   - Native apps for mobile.
   - Web app primarily for desktop.

---

### **MVP Requirements**

1. **Core Features:**

   - Support **1:1 chats** and **group chats**.
   - Send **text messages**, **images**, and **template messages**.

2. **UI Layout:**

   - **Left Panel:** Contact list.
   - **Right Panel:** Chat box with message history.

3. **Real-Time Features:**

   - **Online:** Receive real-time messages with sound effects.
   - **Offline:** Push notifications and message persistence.

4. **Excluded Features:**
   - Advanced encryption (e.g., **E2E encryption**).

---

### **Non-Functional Goals**

- **Real-Time Communication:**
  - Messages should be **instant**.
  - Leverage **WebSocket protocol** for low latency.

---

### **UI Overview**

- **Layout Design:**
  - **Contacts Section:** Displays active and inactive contacts.
  - **Chat Box:**
    - Message history display.
    - Input area for typing messages.

---

### **Backend Data Flow**

1. **WebSocket Connection:**

   - Establish **WSS (WebSocket Secure)** connection when a user logs in.

2. **Message Flow:**

   - **Send Message:** WebSocket sends the payload to the chat server.
   - **Receive Message:** Fetch unread messages from storage if offline.

3. **Message Format:**
   - Contains fields like `from`, `to`, `type`, and `payload`.
   - **Types:** Text, images, or other supported formats.

---

### **Front-End Data Structure**

- **Contacts:**

  - Attributes: Avatar, name, message count.

- **Messages:**
  - Grouped by contact.
  - Types: Text, image, etc.

---

### **Real-Time Messaging**

1. **Sending Messages:**

   - WebSocket payload includes `type` (`send_message`), `to`, and `payload`.

2. **Receiving Messages:**
   - Play a sound.
   - Update the unread message count.
   - If the current contact is active, append the message to the chat box.

---

### **Offline Features**

- **Push Notifications:**
  - Use services like **Google FCM** or **Apple APN**.
  - Register the notification service during login.

---

### **Heartbeats for Connection Stability**

- Regularly send a **heartbeat** signal to prevent WebSocket disconnection.

---

### **Group Chats**

1. **Implementation:**

   - Use a **group ID** to manage members.
   - Broadcast messages to all connected members using a shared WebSocket.

2. **Optimization:**
   - Avoid dispatching messages individually for large groups.
   - Use **broadcasting servers** for scalability.

---

### **Performance Challenges**

1. **Message Throttling:**

   - Buffer incoming messages to prevent UI overload.
   - Process messages in intervals (e.g., every 500ms).

2. **Infinite Scroll for Chat History:**
   - Use an API to fetch older messages on demand.
   - Avoid overloading the client with large payloads.

---

### **Extensions and Future Features**

1. **Chat Extensions:**

   - Expose APIs for third-party integrations.
   - Example: **Mini-apps** or embedded games.

2. **Super App Features:**
   - Make the messenger a platform for diverse use cases beyond chat.

---

### **Conclusion**

- The design ensures **real-time messaging**, **offline support**, and **scalability**.
- Future improvements include:

  - Advanced encryption.
  - Mini-programs for third-party integrations.

- **Time Consideration:** Achievable within a typical interview timeframe (~30 minutes).

---
