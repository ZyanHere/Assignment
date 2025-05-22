
# Front-End System Design Interview - Design YouTube
[Watch here in Youtube](https://www.youtube.com/watch?v=x9NgcwwFp7s)

---

## **Introduction**
We are going to do a system design interview focusing on the front-end, with the task to **design YouTube**. YouTube is a platform where:  
- Users can **upload videos**.  
- Users can **search and watch videos**.  
- Users can **like, dislike, or comment** on videos.  


---

## **Functional Requirements**
1. **Users can upload videos**.  
2. **Users can search for videos** (based on the title).  
3. **Users can view search results**.  
4. **Users can watch a specific video**.  
5. **Users can like/dislike videos**.  
6. Optional: **Users can comment on videos**.

---

## **Non-Functional Requirements**
1. The system should be **fast** and provide a **good user experience**.  
2. The application should support a **wide range of devices** (desktop, tablet, mobile-first).  
3. The website should be **localized**.  
4. **User behavior and stats** should be gathered to monitor performance and engagement.

---

## **High-Level Architecture**

### **Pages**
1. **Upload Video Page**
   - **Components**:
     - Input field or drop zone for uploading files (one file at a time).  
     - Metadata input field (e.g., title).  
     - Upload button.  

2. **Search Page**
   - **Components**:
     - Search bar (input field with placeholder).  
     - Search button (supports keyboard navigation).  
     - Results grid with video thumbnails.  

   - **Thumbnail Details**:
     - Video title.  
     - Video length.  
     - Like and dislike counts.  

3. **Video Viewing Page**  
   - **Components**:
     - Video player.  
     - Toolbar (play button, progress bar, settings).  
     - Video metadata (title, upload date).  
     - Like/dislike buttons.  
     - Comment section (flat structure for simplicity).  

---

## **Data Entities**

### **Video**
```typescript
type Video = {
  id: string; // Unique identifier
  title: string;
  length: number; // In seconds
  thumbnailUrl: string;
  likes: number;
  dislikes: number;
  statusForCurrentUser?: 'liked' | 'disliked'; // Optional
  uploadedBy: User; // Reference to user
  quality: Quality[]; // Array of quality objects
  subtitles: Subtitle[]; // Array of subtitles
  timestamp: Date; // Upload time
};
```

### **Quality**
```typescript
type Quality = {
  resolution: string; // e.g., "1080p"
  streamUrl: string; // URL for video stream
};
```

### **Comment**
```typescript
type Comment = {
  user: User; // User who left the comment
  text: string; // Comment text
  timestamp: Date; // When the comment was made
};
```

### **Subtitle**
```typescript
type Subtitle = {
  language: string; // Language of subtitles
  url: string; // URL to subtitle file
  video: Video; // Associated video
};
```

### **User**
```typescript
type User = {
  id: string; // Unique identifier
  name: string; // Username
  avatarUrl: string; // URL for avatar image
};
```

---

## **APIs**

### **Video APIs**
1. **Upload Video**
   - Endpoint: `POST /api/video`  
   - Body:  
     ```json
     {
       "file": "multipart-form-data",
       "title": "string"
     }
     ```
   - Authenticated: Yes (JWT or cookies).  

2. **Check Upload Status**
   - Endpoint: `GET /api/video/status/:id`  
   - Response:  
     ```json
     {
       "status": "processing | ready",
       "id": "video-id"
     }
     ```

3. **Watch Video**
   - Endpoint: `GET /api/video/:id`  
   - Response: Returns video metadata and stream URL.  

4. **Like/Dislike Video**
   - Like: `POST /api/video/:id/like`  
   - Dislike: `POST /api/video/:id/dislike`  

### **Search API**
- Endpoint: `GET /api/search`  
- Query Parameters:  
  ```json
  {
    "q": "string",
    "offset": "number",
    "pageSize": "number"
  }
  ```

- Response:  
  ```json
  {
    "term": "search-term",
    "videos": ["array of videos"],
    "totalResults": "number"
  }
  ```

### **Comment APIs**
1. **Post Comment**
   - Endpoint: `POST /api/video/:id/comment`  
   - Body:  
     ```json
     {
       "text": "string"
     }
     ```

2. **Get Comments**
   - Endpoint: `GET /api/video/:id/comments`  

---

## **Optimizations**

1. **Performance Enhancements**:
   - Serve **compressed assets** (Gzip or Brotli).  
   - Use **HTTP/2** for multiplexing.  
   - Apply **caching policies** with `ETag` and `Cache-Control` headers.  
   - Minify **JavaScript** and **CSS**.  
   - Use **bundle splitting** for vendor and polyfills.  

2. **Streaming Enhancements**:
   - Utilize **adaptive streaming** (e.g., HLS).  
   - Serve video content via **CDN** for faster delivery.  

3. **Lazy Loading**:
   - Load comments and other secondary data asynchronously.  

---

## **Accessibility**

1. **Localization**:
   - Translate text into the user’s language.  
   - Format dates and numbers based on the user’s locale.  

2. **Screen Reader Compatibility**:
   - Add `aria` attributes and `alt` text.  

3. **Keyboard Navigation**:
   - Ensure the interface is navigable using the keyboard.  

4. **Contrast and Themes**:
   - Provide high-contrast themes for visually impaired users.  

---
