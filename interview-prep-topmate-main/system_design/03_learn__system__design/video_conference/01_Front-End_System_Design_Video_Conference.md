# Front-End System Design - Video Conference

[Watch on Youtube](https://www.youtube.com/watch?v=xKyB7x--NKU)

---

### Introduction

- Topic: **Front-End System Design** for video conferencing.
- Example: Zoom.
- **First topic:** Functional Requirements.

### Functional Requirements

1. **One-to-One and Group Video Calls**
   - Core feature of the app.
   - Requires effort for switching between **one-to-one** and **group calls**.
2. **Recording Video**
   - Enable specific users to start/stop recordings.
   - Show a **clear recording status** to all participants.
3. **Share Screen**
   - Simple mechanism to toggle between personal video feed and shared content.
4. **Raise Hand**
   - Intuitive method to signal attention or desire to speak.
5. **Invite People**
   - Create and distribute **invite links** with permissions and security.
6. **View Participants**
   - Display updated list of participants with their status (e.g., muted, video off).
7. **User Roles**
   - Define user roles (e.g., Admin, Participant, Guest).
   - Role-specific abilities.

### Non-Functional Requirements

1. **Performance**
   - Ensure smooth video/audio playback.
   - UI should remain responsive even during high loads.
2. **Video Quality**
   - Adapt video quality based on bandwidth while maintaining **maximum clarity**.
3. **Accessibility**
   - Usable by individuals with disabilities to ensure **broad usability**.

---

## Designed Components

### Layout Overview

- **Center Portion:** Divided into four sections for video feeds.
- **Right Side Bar:**
  - List of participants with statuses (e.g., muted, video off).
  - Invite button above the list.
- **Bottom Control Bar:**
  - Action buttons: Raise Hand, Stop Audio/Video, Record, Share Screen, Leave.

### Entities and Interfaces

1. **User**
   - **Interface:** User details (ID, Full Name, Role).
   - Roles: Admin, Participant, Guest.
2. **Sidebar**
   - Participants interface showing statuses (e.g., muted, camera on/off).
   - **Invite Button:** Adds new participants.
3. **Reactions**
   - **Interface:** Reaction details (User ID, Reaction Type, Timestamp).
4. **Meeting**
   - **Interface:** Meeting details (ID, Title, Start/End Time, Participants).
   - Features: Record, Share Screen, Toggle Camera/Mute.

### Media API

1. **Approaches for Video Calls:**
   - **WebSocket:**
     - Persistent communication channel over TCP.
     - High latency for media, but versatile.
   - **WebRTC:**
     - Peer-to-peer communication using UDP.
     - Low latency and built-in encryption.
   - **Zoom Approach:**
     - Hybrid model with patented technologies and WebRTC elements.

---

## High-Level Design

### Quality Adaptation

- Users send/receive streams based on **bandwidth and device capabilities**.
- Example:
  - **User 1:** Medium quality from User 2, Low quality from User 3.
  - **User 2:** High quality from User 1, Low quality from User 3.

### Screen Sharing

- Treated as a separate stream.
- Participants receive:
  - Sharer’s screen.
  - Sharer’s video stream.

---

## Optimizations

1. **Adjust Stream Quality:** Based on bandwidth and layout (e.g., low quality for many participants).
2. **Simulcast:** Send multiple video resolutions for adaptive streaming.
3. **CDN:** Use Content Delivery Networks for distributed delivery.
4. **Virtual List:** Optimize rendering for large participant lists.

---

## Accessibility

1. **Keyboard Navigation:** Ensure full functionality via keyboard.
2. **Screen Reader Support:** Label UI components properly.
3. **Closed Captions:** Real-time captions for hearing-impaired users.
4. **Adjustable Fonts and Colors:** Enhance readability.
5. **Dynamic Announcements:** Notify changes like raised hands or participant joins.

---
