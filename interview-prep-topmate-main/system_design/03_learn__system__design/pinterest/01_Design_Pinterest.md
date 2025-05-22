# [Front-End System Design] - Pinterest - YouTube

**Video Link:** [Watch on YouTube](https://www.youtube.com/watch?v=3MADCVqL534)

---

### **Introduction**
- Today's problem: **Designing Pinterest**, a popular platform for sharing images.
  - **Pinterest Overview**:  
    - Application for sharing images styled as "pins."
    - Pins are displayed in a **Masonry Layout (or Mansory Grid)**.
    - Scroll down to load more pins dynamically.

---

### **Design Plan**
1. **Collect Requirements**  
   - **General Requirements**
   - **Functional Requirements**

2. **Componentize the Application**  
   - Break the application into a **component architecture**.

3. **Describe the Masonry Layout**  
   - Explain the real-world implementation of the layout.

4. **API Description**  
   - Define entities and APIs used on the front-end.

5. **Data Store and Layers**  
   - Analyze how data is stored and accessed on the front-end.

6. **Optimization and Accessibility**  
   - Focus on:
     - Performance optimization.
     - Accessibility for users with disabilities (e.g., color blindness).

---

### **Requirements**
#### **General Requirements**
- **Core Features**:
  - Pins must be displayed in a **Masonry Layout**.
  - Users can:
    - **Hover** on a pin to view details.
    - **Click** to see the full details.
  - Pins can be:
    - Images or GIFs (No video support).
  - Users can:
    - **Post comments**.
    - **Share pins**.

#### **Functional Requirements**
- **Platform Support**:
  - Support **95% of modern browsers** (excluding Internet Explorer 11).
  - Compatible with:
    - **Mobile devices** (adaptive design for phones, tablets).
    - **Desktop browsers**.
- **Progressive App Features**:
  - **Offline Mode**: Allow access to previously loaded pins.
  - **Low Bandwidth Optimization**: Optimize for poor network conditions.

---

### **Component Architecture**
#### **Overview**
- Represent the application as a hierarchy of components.
- Start with a **mockup of the Masonry Layout**.
  - **Grid Sizes**: Small (S), Medium (M), and Large (L).
  - **Components of a Pin**:
    - **Picture**.
    - **Menu** with sharing options.
    - **Dropdown** for actions.
    - **Details** box (e.g., description, comments).

#### **Hierarchy**
- **Application Root**:
  - **Router** for navigation.
  - Main pages: **Home**, **Profile**, **Pins Feed Page**.
- **Pins Feed Page**:
  - **Pins Grid**:
    - Contains **Pins**.
    - Each Pin includes:
      - **Picture**.
      - **Menu**.
      - **Details**.
      - **Comments** (list and input).

#### **Dependency Graph**
- Components are structured as a dependency graph for:
  - Efficient **data flow**.
  - Clear relationships between elements.

---

### **Masonry Layout Implementation**
#### **Key Concepts**
- **Viewport Zones**:
  - **Visible Zone**: What the user sees.
  - **Invisible Zone**: Rendered but not visible.
  - **Recycle Zone**: Placeholder for future data.

#### **Loading Data**
- **Sliding Window Technique**:
  - Add new data at the bottom.
  - Remove old data from the top to maintain performance.

#### **Absolute Positioning**
- **Benefits**:
  - Efficient rendering without reflows.
  - Positions pins using **translation values**.
- **Handling Different Heights**:
  - Pins with varying heights are aligned based on translations from previous rows.

---

### **Data Entities**
#### **Pin Entity**
- **Attributes**:
  - `id`: Unique identifier.
  - `origin`: Source of the pin (e.g., pinboard).
  - `description`: Text description.
  - `title`: Title of the pin.
  - `image_url`: URL of the pin image.
  - `author`: Creator of the pin.

#### **Comment Entity**
- **Attributes**:
  - `id`: Unique identifier.
  - `author_id`: ID of the commenter.
  - `content`: Text content of the comment.

#### **User Entity**
- **Attributes**:
  - `id`: Unique identifier.
  - `nickname`: User's display name.

---

### **API Design**
#### **Endpoints**
1. **Get Pins**:
   - **Parameters**:
     - `api_key`: API key for authentication.
     - `user_id`: ID of the user.
     - `include_comments`: Boolean flag to include comments.
     - `cursor`: Timestamp for paginated loading.
   - **Use Case**:
     - Load pins for a specific user or pinboard.

2. **Get Comments**:
   - **Parameters**:
     - `api_key`: API key for authentication.
     - `pin_id`: ID of the pin.
     - `page_size`: Number of comments to load.

---

### **Data Store and Layers**
- **Data Representation**:
  - Pins and comments are stored in memory for efficient access.
- **Access Patterns**:
  - Load data on-demand using the sliding window approach.
  - Maintain a cache to optimize performance.

---

### **Optimization and Accessibility**
#### **Optimization**
- Use **absolute positioning** for performance.
- Load and recycle data efficiently to reduce memory overhead.

#### **Accessibility**
- Ensure the application is usable by a diverse audience:
  - **Color Contrast**: Support for users with color blindness.
  - **Keyboard Navigation**: Allow non-mouse interaction.
  - **Screen Reader Compatibility**.

---

### **Data Storage and Frontend Architecture**

#### **Overview of Data Handling**

- **Schema Description**:  
  - A schema has been prepared to describe the data layers and workflows.
  - Focus on how data is fetched and passed to components.
  - Labeled schema near the date API to visualize data flow.
  
- **Fetching Points**:  
  - Fetching data from the API (`pins` field).  
  - The data is stored efficiently in the frontend.

#### **Efficient Frontend Data Storage**

- **Normalized Data Storage**:  
  - Data is stored in a **flattened format**, improving access speed.  
  - Example: Key-value pairs with entity IDs as keys.
  
- **Benefits**:  
  - Access user-specific data (e.g., user ID, comments) directly by IDs.  
  - Avoid multi-level nested structures to reduce access costs.

#### **Data Flow**

- **Process**:  
  - Access **pins feed** using all stored IDs.  
  - Retrieve data such as comments and likes efficiently.  
  - Normalization simplifies data rendering.

---

### **Performance Optimization**

#### **Key Performance Areas**

1. **Network Performance**  
2. **Rendering Performance**  
3. **JavaScript Performance**

---

#### **Network Performance**

- **Asset Optimization**:  
  - Apply zipping (e.g., gzip) to assets like CSS, JavaScript, and HTML.  
  - Use Brotli for modern browsers to achieve up to **20% additional compression**.

- **HTTP/2 Benefits**:  
  - Enables **multiplexing** for faster loading of multiple resources.  
  - Splitting the application into smaller bundles:
    - Vendor bundles for libraries (easily cached).  
    - Feature-specific bundles (e.g., pin grids, analytics).  

- **Image Optimization**:  
  - Serve images in efficient formats like WebP, with PNG fallback.  
  - Use an **image optimization service**:  
    - Encodes viewport and returns optimized images.  
    - Leverage CDN caching for faster delivery.

- **Lazy Loading**:  
  - Load images and resources only when they are visible in the viewport.

---

#### **Rendering Performance**

- **Time to First Content**:  
  - Inline **critical CSS and JS** to avoid render-blocking.  
  - Use `link rel=preconnect` for high-priority resources.  

- **CSS Optimization**:  
  - Adopt efficient CSS naming strategies to minimize selector performance overhead.  

- **Placeholders for Better UX**:  
  - Display skeletons while loading content to enhance user perception.

---

#### **JavaScript Performance**

- **Key Principles**:  
  - Minimize synchronous operations.  
  - Use **web workers** for heavy calculations in the background.  
  - Cache results of expensive operations.  

- **Offline Support**:  
  - Implement service workers to cache assets and enable offline access.

---

### **Accessibility Features**

- **Keyboard Navigation**:  
  - Add shortcuts for actions like pin navigation, sharing, and quick menu access.  

- **Color Support**:  
  - Provide alternative layouts for colorblind users.  

- **Screen Reader Enhancements**:  
  - Use ARIA live regions to announce dynamic changes.  

- **Responsive Sizing**:  
  - Use `rem` units instead of pixels for better scaling with user settings.

---

### **Conclusion**

- Covered **data storage**, **performance**, and **accessibility**.  
- Emphasized frontend efficiency and user-centric design. 

---

