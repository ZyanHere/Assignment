# How Does Encryption Work?

[Watch on Youtube](https://www.youtube.com/watch?v=sPJmIeHpWd4&list=PLrtCHHeadkHp92TyPt1Fj452_VGLipJnL&index=40)

---

- Cryptography is the study of encrypting and decrypting information for secure transmission between two people.
- **Two steps in cryptography:**
  1. **Encryption:** Converting plain text into code or ciphertext.
  2. **Decryption:** Converting ciphertext back to plain text.

- **Why encryption matters:**
  - Businesses have three powerful tools to secure data:
    - **Encryption**
    - **Authentication**
    - **Authorization**
  - Encryption is a non-intrusive security measure.

---

- **How encryption works:**
  - An encryption algorithm encodes plain text into ciphertext.
  - It becomes unreadable without the decryption key.

- **Symmetric Encryption:**
  - Uses the same key for both encryption and decryption.
  - **Advantages:**
    - Fast and easy if the key remains secret.
  - **Key strength depends on:**
    - Length.
    - Entropy (randomness).
    - Difficulty to deconstruct.

- **Symmetric Algorithms:**
  - **Block ciphers:** Encrypt data in blocks.
  - **Stream ciphers:** Encrypt data one bit at a time.

- **Example:**
  - **AES (Advanced Encryption Standard):**
    - Block cipher used widely.
    - Key lengths: 128 to 256 bits.
    - AES with 256-bit key is considered unbreakable.

---

- **Asymmetric Encryption:**
  - Uses two different keys:
    - **Public Key:** Visible to everyone for encryption.
    - **Private Key:** Remains secret for decryption.
  - **Advantages:**
    - More secure but slower.

- **Comparison:**
  - Symmetric encryption:
    - Faster.
    - Less secure.
  - Asymmetric encryption:
    - Slower.
    - More secure.

- **Usage:**
  - These methods work together to secure networks.
  - Used in protocols like **SSL/TLS**:
    - **SSL (Secure Sockets Layer):** Older version.
    - **TLS (Transport Layer Security):** Protocol on the internet application layer.

---

- **TLS Handshake Process:**
  - Client requests a secure connection:
    - Through **Port 443** for HTTPS traffic.
    - Requests the server to switch to TLS.
  - Server agrees and initiates a handshake.
  - **Process:**
    - Asymmetric cipher generates a session-specific shared key.
    - Further communication is encrypted symmetrically.

- **Key Features:**
  - Connection secured using asymmetric cipher.
  - Symmetric encryption protects data efficiently.

---

- **Password Protection with bcrypt:**
  - **Data in transit:**
    - Considered safe under TLS.
  - **Data in storage:**
    - Requires hashing and salting for protection.

- **Hashing:**
  - Scrambles data mathematically.
  - Difficult to reverse engineer.

- **Salting:**
  - Adds a unique value to passwords before hashing.
  - Increases entropy and prevents brute force attacks.

- **bcrypt:**
  - Hashes and salts passwords.
  - Slows brute force attacks as computing power increases.
  - Industry-grade algorithm, widely used.

---

- **Encryption Best Practices:**
  - Encrypt both **in transit** and **at rest.**
  - **Encryption in transit:**
    - Use HTTPS (TLS protocols).
  - **Encryption at rest:**
    - Protect data in storage (e.g., AES 256-bit encryption).

- **Additional Security Measures:**
  - Encrypt while processing data (e.g., in fintech).
  - Use end-to-end encryption in messaging apps like **iMessage, WhatsApp, Signal**:
    - Messages are encrypted from one user to another.
    - Unencrypted messages stored only on the user's device.

---
