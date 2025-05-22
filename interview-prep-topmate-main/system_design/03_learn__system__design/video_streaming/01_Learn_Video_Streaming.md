# **Learn Video Streaming in Depth (System Design)**

### [Watch on Youtube](https://www.youtube.com/watch?v=X8Qhe3PyAyc)

---

**Introduction to Video Streaming**

- Video streaming is a critical concept, especially if:
  - You work in **EdTech**, video hosting, or any website with videos.
- Understanding video streaming helps you learn:
  - **How videos are sent** from server to client.
  - **How they are processed** and displayed progressively.

#### **Why Video Streaming?**

- Video streaming ensures a better **user experience**.
- It allows videos to load progressively instead of sending the **entire video file** upfront.

---

## **Why Do We Need Video Streaming?**

### **Without Video Streaming**:

1. **Scenario**:
   - Server directly sends the video to the client.
   - Video file sizes are huge (e.g., 200MB, 500MB).
2. **Drawback**:
   - The client must **download the entire video** before viewing it.
   - Causes delays based on internet speed.
   - Poor user experience.
3. **Bandwidth Issue**:
   - Server sends the entire 500MB file at once.
   - High cost for both client and server.

### **With Video Streaming**:

1. **Progressive Loading**:
   - Videos are sent **in chunks** (e.g., 10-second parts).
   - Client can start watching while additional chunks load.
2. **Benefits**:
   - Client doesn't wait for the entire file.
   - Faster and smoother experience.
3. **Bandwidth Savings**:
   - Only necessary chunks are sent.
   - If a user skips or exits early, unused parts aren't sent.

---

## **How Video Streaming Works?**

1. **Client and Server Interaction**:
   - **Client**: User/browser uploads or requests the video.
   - **Server**: Processes the video.
2. **Video Chunking**:
   - Video is sent **progressively** in parts.
   - Allows users to stream videos in real-time.

#### **Example**:

- **Netflix**:
  - Sends the first chunk (e.g., 10 seconds).
  - When you watch the first 5 seconds, it prepares the next chunk.
- **Bandwidth Saving**:
  - If a user exits after 1 minute, only the relevant chunks (e.g., 1:15 minutes) are sent.

---

## **Behind the Scenes: Video Streaming Process**

### **Step-by-Step**:

1. **Video Upload**:
   - Client uploads the video to the server.
2. **Compression**:
   - Server processes the video through an **encoder**.
   - Encoder compresses the video to reduce size while maintaining quality.

### **What is an Encoder?**

- **Encoder**:
  - Compresses or decompresses video files.
  - Reduces file size for storage and streaming.

#### **Post-Compression Storage**:

- Video files are stored in:
  - **Cloud storage** (e.g., AWS, GCP).
  - **In-house servers** (based on preference).

---

## **Compression and File Versions**

### **How Compression Works**:

1. Encoder generates **multiple versions** of the video:

   - **High quality**: High resolution, high bit rate.
   - **Medium quality**: Medium resolution, medium bit rate.
   - **Low quality**: Low resolution, low bit rate.

2. **Bit Rate and Resolution**:

   - **Bit Rate**:
     - Amount of video data sent per second.
     - Higher bit rate = Better quality.
   - **Resolution**:
     - Video clarity (e.g., 1080p, 720p, 480p).

3. **Why Multiple Versions?**
   - Allows **dynamic selection** of quality based on network speed.

#### **Storage**:

- Different versions are stored as **manifest files**.
  - High: High bit rate and resolution.
  - Medium: Medium bit rate and resolution.
  - Low: Low bit rate and resolution.

---

## **Dynamic Adaptive Streaming (DASH)**

### **What is DASH?**

- **DASH**: Dynamic Adaptive Streaming over HTTP.
- **Process**:
  - Server streams video chunks to the client.
  - Based on **network conditions**, the server adjusts:
    - Video quality (resolution).
    - Bit rate.

#### **How it Works**:

1. Server starts streaming **high-quality** chunks if the internet is fast.
2. If the network slows down:
   - Switches to **medium** or **low** quality chunks.
3. **User Experience**:
   - Video quality adapts dynamically.
   - Prevents buffering.

#### **Real-Life Example**:

- **YouTube Auto Quality**:
  - Video starts in high quality.
  - Switches to lower quality if the internet slows.

---

## **Codecs: Compression on the Client Side**

### **What is a Codec?**

- **Codec**:
  - Compresses and decompresses digital media files (audio/video).
- **Purpose**:
  - Server sends compressed video files.
  - Client uses **codecs** to decompress them for playback.

#### **Common Codecs**:

- **Video**:
  - H.264
  - H.265
- **Audio**:
  - MP3

#### **How it Works**:

1. Server compresses video into smaller chunks.
2. Client's media player decompresses chunks using codecs.
3. Final video is displayed to the user based on network quality.

---

## **DASH vs HLS**

### **Streaming Protocols**:

1. **DASH (Dynamic Adaptive Streaming over HTTP):**
   - Used for **pre-recorded videos** (e.g., YouTube, Netflix).
2. **HLS (HTTP Live Streaming):**
   - Used for **live streaming** (e.g., live sports, news).

#### **Similarities**:

- Both adjust video quality dynamically based on network speed.

---

## **Key Takeaways**

1. **Client-Server Communication**:
   - Client uploads the video.
   - Server compresses and stores the video.
2. **Encoder**:
   - Generates multiple manifest files for different resolutions and bit rates.
3. **Bit Rate and Resolution**:
   - Higher bit rate = Better quality.
4. **Storage**:
   - Video files stored in cloud/in-house servers.
5. **Streaming Protocols**:
   - **DASH** for pre-recorded videos.
   - **HLS** for live streaming.
6. **Codecs**:
   - Decompress videos on the client side for playback.

---

**Conclusion**

- Video streaming ensures:
  - **Optimized user experience**.
  - **Cost savings** by reducing bandwidth.
- Understanding video streaming involves:
  - **Encoders**
  - **Dynamic Adaptive Streaming (DASH)**
  - **Codecs**
- Protocols like **DASH** and **HLS** make video delivery efficient.
