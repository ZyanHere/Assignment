# Netflix Backend System Design - Part 2

 [Watch on Youtube](https://www.youtube.com/watch?v=IWFEZswMwc4)

---


### **Preview and Metadata**:
  - Video preview might be the same for all users, but thumbnails may differ.
  - **Hero Metadata**:
    - Includes video play seconds.
    - Pause time before starting the video.
    - Resolution examples: 1080p full HD, 360p for lower quality.
  - Challenges with streams:
    - All streams going to a CDN via a single API call.

```plaintext
API call optimization for CDN streaming is critical for performance.
```

# **Netflix Overview**:
  - Homepage functionality:
    - Movie recommendations.
    - Scrolling mechanisms.
  - Discussion focus: **Demand-side system design**, excluding supply-side systems.

### **Homepage Features**:
  - Core focus: Frontend customizability.
  - **Hidden Features**:
    - User account settings.
    - Parental controls.
    - Pricing and subscription management.

### **Functional Requirements**:
  - **Hero Section**:
    - Background image.
    - Background video player.
  - **Categories and Carousels**:
    - Strategic thumbnails with customizations.
  - Resolution adjustments:
    - Based on user internet speed and device capabilities.

---

### Key Components

#### **Dynamic Adaptive Streaming**
- Protocols:
  - **HTTP Dash**: Dynamic streaming with variable bitrates.
  - **HLS**: Apple’s adaptive streaming protocol.
- **Adaptive Strategy**:
  - Initial low-quality streams (e.g., 320px).
  - Adaptive upgrades (e.g., 720px, 1080px).

#### **Data Structures**
```json
Video {
  "total_duration": "integer",
  "watch_time": "integer",
  "preview_url": "string",
  "thumbnail": "string",
  "type": "string"
}

Section {
  "name": "string",
  "type": "string",
  "videos": "array of Video"
}
```

#### **Caching Mechanisms**
- **Client-Side Caching**:
  - Store cohort and section data locally.
  - Reduce repeated API calls.
- **CDN Utilization**:
  - Preload previews and thumbnails.
  - Ensure region-specific caching for improved performance.

### **Video Streaming**:
  - Start with low resolution; adapt dynamically.
  - Use CDNs to deliver streams with minimal latency.

### - Fetch sections and videos based on user cohort.
  - Enable pagination for sections.

```plaintext
API calls should minimize joins by denormalizing data.
```

### **Metadata Challenges**:
  - Diverse metadata types across sections.
  - Use abstracted data objects for flexibility.

---

### Backend Design Highlights

#### **Database Layout**
| Table          | Attributes                   |
|----------------|------------------------------|
| `Users`        | `id`, `cohort_id`, `history` |
| `Cohorts`      | `id`, `section_ids`          |
| `Sections`     | `id`, `type`, `video_ids`    |
| `Videos`       | `id`, `duration`, `thumbnail_url`, `preview_url` |

#### **Join Optimization**
- Denormalize section-to-video mappings.
- Cache popular sections and videos.

#### **API Layers**
1. **User APIs**:
   - Fetch cohort and history.
2. **Section APIs**:
   - Fetch sections and videos with pagination.
3. **Streaming APIs**:
   - Authenticate user streams with tokens (e.g., JWT).

#### **Authentication**
- Use **JWT tokens** for temporary stream access:
  - Include user permissions, region restrictions, and expiry times.
- Example:

```plaintext
JWT Token Structure:
{
  "user_id": "string",
  "permissions": ["stream", "download"],
  "region": "IN",
  "expiry": "timestamp"
}
```

---

### Frontend Design Considerations

#### **Hero Section Management**
- Randomized hero recommendations from a defined pool.
- Daily recalculations for personalized suggestions.

#### **Streaming UX**
- Buffer critical scenes first.
- Use thumbnail previews as placeholders.
- Hover functionality to preload video and audio snippets.

---

### Code Snippets

#### API Example: Fetch Sections
```json
GET /api/sections
{
  "user_id": "string",
  "cohort_id": "string",
  "pagination": {
    "start": 0,
    "limit": 10
  }
}
```

#### API Example: Stream Authentication
```json
POST /api/stream/auth
{
  "user_id": "string",
  "video_id": "string",
  "resolution": "720p"
}
```

---

### Final Notes
- Ensure **seamless frontend-backend communication**.
- Optimize **API calls** for minimal latency.
- Leverage **CDN** and **adaptive streaming protocols** for scalability.

