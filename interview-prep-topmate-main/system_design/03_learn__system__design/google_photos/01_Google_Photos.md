# **Front-End System Design - Design Google Photos**

---

[Watch here in YouTube](https://www.youtube.com/watch?v=FUKGooQXih8)

---


### **Introduction**
- **Objective:** Design a Google Photos clone.
- **Scope:**
  - Focus on key features due to time constraints.
  - Smaller scale version of the app.
- **Key Features to Cover:**
  1. Photo Stream with infinite scroll.
  2. Photo Details (enlarged view, metadata).
  3. Albums (view, create, delete).
  4. Photo Upload functionality.
- **Excluded Features:** Sharing photos or albums.

---

## **Functional Requirements**

### **Features**
1. **Photo Stream:**
   - Display all photos with infinite scrolling.
   - Support enlarged photo details with metadata (name, location, timestamp).
2. **Albums:**
   - View, create, and delete albums.
3. **Photo Upload:**
   - Drag-and-drop functionality for uploading photos.

### **Non-Functional Requirements**
1. **Performance:**
   - Fast loading of photos.
   - Efficient rendering for thousands of photos.
2. **User Experience:**
   - Good UX, designed in collaboration with UX designers.
   - Mobile-first approach.
3. **Device Support:**
   - Compatible with desktops, tablets, and mobile devices.
4. **Logging and Analytics:**
   - Track usage patterns and errors.
5. **Accessibility:**
   - Make the app usable for people with impairments.
6. **Localization:**
   - Support multiple languages and cultural formats.

---

## **High-Level Component Design**

### **Overview**
- **Upload Component:**
  - Drag-and-drop files.
  - Progress indicators and success/error messages.
- **Photo Stream:**
  - Main page displaying all photos.
  - Uses a **Photo Grid** with virtual scrolling to handle large datasets efficiently.
- **Photo Details Overlay:**
  - Full-sized photo with metadata sidebar.
- **Albums Sidebar:**
  - List of albums with a button to create new albums.
- **Album Page:**
  - Displays a grid of photos specific to an album.

---

## **Detailed Component Design**

### **Upload Component**
- **Functionality:**
  - Drag-and-drop interface for uploading photos.
  - Context-sensitive behavior:
    - Uploads to the main photo stream by default.
    - Uploads directly to an album if in album context.
- **States:**
  1. Ready for upload.
  2. Uploading (with progress bar or spinner).
  3. Success/Error notifications.
- **React Props Example:**
  ```jsx
  <UploadComponent context="album" albumId="123" />
  ```

### **Photo Grid Component**
- **Purpose:** Displays thumbnails of photos in a grid layout.
- **Key Features:**
  - Virtual scrolling to render only visible thumbnails.
  - Handles thousands of photos efficiently.
- **Subcomponents:**
  - **Viewport Component:** Manages visible DOM nodes for the grid.
  - **Thumbnail Component:**
    - Displays individual photo thumbnails.
    - Shows a spinner/glimmer while loading.

### **Photo Details Overlay**
- **Components:**
  - **Full-Sized Photo:**
    - Displays a resized version (not full resolution).
  - **Sidebar:**
    - Displays metadata (name, date, location, etc.).
- **Security:** URLs should be signed to prevent unauthorized access.

### **Albums Sidebar**
- **Functionality:**
  - Displays a list of albums.
  - Button to create new albums.

### **Album Page**
- **Components:**
  - **Photo Grid:** Same as the main photo stream but scoped to an album.
  - **Title Component:** Displays the album name.

---

## **API Design**

### **REST API Endpoints**
1. **Photo Endpoints:**
   - `POST /api/photo`
     - Upload a new photo.
   - `GET /api/photo/{id}`
     - Fetch photo details by ID.
   - `DELETE /api/photo/{id}`
     - Delete a photo.

2. **Album Endpoints:**
   - `POST /api/album`
     - Create a new album.
   - `GET /api/album/{id}`
     - Fetch album details by ID.
   - `PUT /api/album/{id}`
     - Update album details (e.g., rename).
   - `DELETE /api/album/{id}`
     - Delete an album.

3. **List Endpoints:**
   - `GET /api/photos`
     - Fetch all photos (paginated).
   - `GET /api/albums`
     - Fetch all albums.

### **Data Structures**
- **Photo Object:**
  ```typescript
  type Photo = {
    id: string;
    fileName: string;
    dateTaken: string;
    size: { width: number; height: number };
    fileSize: number;
    location: { latitude: number; longitude: number };
    thumbnailUrl: string;
    fullSizeUrl: string;
    albumIds: string[];
  };
  ```
- **Album Object:**
  ```typescript
  type Album = {
    id: string;
    name: string;
    coverPhotoId: string;
  };
  ```

---

## **Optimization Techniques**

### **Virtualized Lists**
- Render only visible thumbnails.
- Use a viewport component to manage DOM nodes efficiently.

### **Optimized Thumbnails**
- Generate small, optimized thumbnails on the server.
- Serve thumbnails and resized photos from a CDN.

### **Responsive Images**
- Use HTML attributes like `srcset` and `sizes` to load appropriate image resolutions.

### **JavaScript & CSS Optimizations**
- Minify and bundle scripts and styles.
- Split bundles for polyfills, vendor libraries, and app code.
- Use HTTP/2 for concurrent file downloads.

---

## **Logging and Analytics**

### **Error Tracking**
- Capture JavaScript errors using `window.onerror` or `error` event listeners.
- Send errors to a monitoring service with alerts for high error rates.

### **User Behavior Tracking**
- Monitor feature usage and perform A/B testing.
- Use custom or third-party analytics solutions.

---

## **Accessibility**

### **Localization and Internationalization**
- Translate the app into multiple languages.
- Format dates and numbers based on user locale.

### **Screen Reader Support**
- Use ARIA attributes for inputs and labels.

### **Keyboard Navigation**
- Ensure full functionality with keyboard shortcuts.

### **High Contrast and Dark Mode**
- Provide adjustable contrast settings for users with visual impairments.

---

## **Conclusion**
- A comprehensive system design for Google Photos clone covering both functional and non-functional aspects.
- Fast, accessible, and user-friendly application design.
- Focus on performance optimizations and scalability.

---
