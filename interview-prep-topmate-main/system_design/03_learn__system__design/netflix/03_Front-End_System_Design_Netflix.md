# Front-End System Design - Netflix

[Watch on Youtube](https://www.youtube.com/watch?v=GZM73-meP6c)

---

### Introduction

- **Topic:** Front-end system design for Netflix.
- Covers:
  - Functional and non-functional requirements.
  - Data flow, components, interfaces.
  - Accessibility and performance.

---

## Functional Requirements

### Key Features

1. **Video Playback:**
   - Supports fast-forward, pause, and rewind functionalities.
   - Includes support for HD, Full HD, and Ultra HD.
2. **Automatic Quality Adjustment:**
   - Adapts video quality based on internet speed.
3. **Search Functionality:**
   - Filters include genre, actors, and release date.
4. **Recommendations:**
   - Tailored to user preferences and viewing history.
5. **Multiple Audio Tracks:**
   - Available in different languages.
6. **Social Sharing and Ratings:**
   - Share watched content and rate it.

---

## Non-Functional Requirements

### Key Features

1. **Performance:**
   - Smooth and fast video streaming experience.
2. **Accessibility:**
   - Inclusive for users with disabilities.
3. **Internationalization:**
   - Support for multiple languages and regions.
4. **Scalability:**
   - Handle large audiences and growing content libraries.

---

## Data Flow

### Basic Flow

1. **Client Device:**
   - User interacts via browser, mobile app, or smart TV.
2. **API Gateway:**
   - Handles video data requests, user authentication, and video streaming.
3. **Transcoding Service:**
   - Converts video into multiple formats for different devices and network speeds.
4. **Storage Service:**
   - Stores multiple video formats (e.g., AWS S3).
5. **Content Delivery Network (CDN):**
   - Caches video files for quick access from the closest server.
6. **Client Playback:**
   - Video streamed to the client via the CDN, reducing latency.

---

## Cost Analysis Example

### Example Breakdown

- **Video File:** 1 GB, streamed to 100 users.
- **Costs:**
  - Transcoding: $4.02 (transcode 1 hour of video into 3 formats).
  - Storage: $0.04/month (store 1 GB video on S3).
  - Streaming: $9.00/month (AWS data transfer).
  - CDN Delivery: $8.50/month (deliver via CDN).
- **Total:** $224/month for uploading, storing, transcoding, and streaming.

---

## Pages and Components

### Pages

1. **Sign In/Sign Up Page:**
   - SEO-friendly with user authentication options.
2. **Main Page:**
   - Organized into genre-based groups.
   - Includes trailers on hover.
3. **Search Results Page:**
   - Displays filtered results based on user input.
4. **Video Playback Page:**
   - Provides video streaming with rating options.

### Components

1. **User Interface:**
   - Includes fields like ID, name, and preferences.
2. **Movie Grouping:**
   - Organized by genre, each with trailers and images.
3. **Pagination:**
   - Uses offset-based or cursor-based pagination for performance.
4. **GraphQL Integration:**
   - Fetch data flexibly to avoid over-fetching or under-fetching.
5. **Video Component:**
   - Generates signed URLs for secure video playback.

---

## Video Streaming

### Secure Links

1. **Simple URL with REST API:**
   - Temporary pre-signed URL for non-adaptive streaming.
2. **HLS and DASH Protocols:**
   - Break video into chunks with adaptive bitrate streaming.
   - **HLS:** Best for Apple devices and DRM.
   - **DASH:** Best for broader device support and advanced streaming features.

---

## Accessibility

### Key Features

1. **Screen Reader Support:**
   - Includes audio descriptions and subtitles.
2. **Customization Options:**
   - Supports font resizing, high contrast, and playback speed adjustments.
3. **Keyboard Navigation:**
   - Fully operable without a mouse.

---

## Performance Optimizations

### Techniques

1. **Virtual Scrolling and Lazy Loading:**
   - Load only visible content for efficiency.
2. **Adaptive Bitrate Streaming:**
   - Use HLS or DASH to optimize playback for varying network speeds.

---
