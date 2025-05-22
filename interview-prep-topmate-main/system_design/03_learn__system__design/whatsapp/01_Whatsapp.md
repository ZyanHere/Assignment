# WhatsApp Frontend System Design

[Watch on Youtube](https://www.youtube.com/watch?v=3mi-Cah2PtM)

---

### **Introduction:**

- **Topic**: System design for real-world chat apps like WhatsApp, Discord, Line, Hangouts, WeChat, and Facebook Messenger.

### **Login and Encryption:**

- Ability to log into WhatsApp without additional setup.
- Features include:
  - Message sent/delivered/read status.
  - "Last Seen" and "Online" indicators.
- Messages are encrypted for secure transmission.
  - Ensures no intermediate entity can read the messages.

### **Key Discussion Points:**

- One-to-one communication.
- QR-based login.
- Real-time application functionality.
- Offline support and persistence of messages.

---

### **System Design Components**

#### Requirements in System Design Interviews\*\*

- **Functional Requirements:**

  - Authentication methods:
    - OTP-based.
    - Email-based login.
    - Single Sign-On (SSO).
    - QR-based login.
  - One-to-one and group chat functionality.
  - Features:
    - Search.
    - Archive chats.
    - Video and audio calling.
    - Notifications:
      - Push notifications.
      - Message delivery/read indicators.
      - Typing status.

- **Non-Functional Requirements:**
  - Optimization:
    - Asset and network optimization.
    - Security measures:
      - Encryption and decryption.
      - Protection from script injections and DDoS attacks.
  - Real-time and offline support.
  - Progressive Web App (PWA) capabilities.
  - Localization and internationalization.

#### Functional Modules Overview\*\*

- **Authentication Features:**

  - QR-based login:
    - Used for web-based WhatsApp login.
  - OTP-based and SSO for alternative login methods.

- **Chat Functionalities:**

  - One-to-one and group communication.
  - Search for chats and messages.
  - Media support for image, audio, and video.
  - Persistent chat history.

- **Notification Features:**
  - Delivery/read receipts.
  - "Last Seen" and "Typing" indicators.

#### Non-Functional Considerations\*\*

- Device compatibility: Mobile and desktop.
- Responsiveness and speed optimization.
- Security features:
  - Encryption/decryption for secure communication.
  - Safeguards against external threats.
- Real-time communication:
  - WebSocket usage.
  - Offline data caching.
- Localization and support for diverse user bases.

---

### **Communication Protocols**

#### Key Protocols for Data Transmission\*\*

1. **Polling:**

   - Client periodically requests data from the server.
   - Drawbacks: Resource-intensive, overloading server with redundant requests.

2. **Long Polling:**

   - Client sends a request and waits until new data is available.
   - Server holds the request until an update occurs.

3. **Server-Sent Events (SSE):**

   - One-way communication from server to client.
   - Ideal for notifications but not suitable for bidirectional messaging.

4. **WebSocket:**
   - Full-duplex, bidirectional communication.
   - Establishes a persistent connection using a handshake protocol.
   - More efficient for real-time chat applications.

---

### **End-to-End Communication Flow**

#### Data Flow Between Users\*\*

- Messages sent from User A are:
  - Processed by the chat server.
  - Stored temporarily in a Key-Value (KV) store if User B is offline.
  - Delivered directly via WebSocket if User B is online.
- **Status Indicators:**
  - "Sent": Acknowledged by the server.
  - "Delivered": Received by the recipient.
  - "Read": Recipient opens the message.

---

### **QR-Based Login**

#### Working Mechanism\*\*

1. **WebSocket Connection:**

   - Browser initiates a WebSocket connection with the server.

2. **QR Code Generation:**

   - Server generates a unique identifier.
   - Encoded as a QR code displayed in the browser.

3. **Mobile App Interaction:**

   - User scans the QR code with their mobile app.
   - Mobile sends the unique identifier and authentication token to the server.

4. **Authorization:**
   - Server maps the identifier with the token.
   - Grants browser access to the user account.

---

### **Encryption and Security**

#### End-to-End Encryption (E2EE)\*\*

- **Symmetric Encryption:**

  - Single key used for both encryption and decryption.
  - Drawback: Key management challenges.

- **Asymmetric Encryption:**
  - Public and private keys used.
  - Sender encrypts data with the recipient's public key.
  - Recipient decrypts with their private key.

#### Encryption in WhatsApp\*\*

1. Users exchange public keys during initial setup.
2. Messages encrypted using:
   - Sender's private key.
   - Recipient's public key.
3. Decrypted on receipt using:
   - Sender's public key.
   - Recipient's private key.

#### Cryptographic API Overview\*\*

- **Browser Support:**
  - Uses `Crypto` API for:
    - Key generation.
    - Data encryption/decryption.
  - Example methods:
    - `generateKey` for creating public/private key pairs.
    - `exportKey` to extract keys in usable formats.
    - `importKey` to handle incoming keys.

```javascript
// Example: Key Generation
const keyPair = await crypto.subtle.generateKey(
  {
    name: 'RSA-OAEP',
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: 'SHA-256',
  },
  true,
  ['encrypt', 'decrypt']
);

const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
```

---

### **Conclusion**

- QR-based login and E2EE ensure secure and seamless communication.
- WebSocket facilitates real-time data transfer.
- Encryption/decryption processes now supported efficiently on browsers, reducing server load.

---
