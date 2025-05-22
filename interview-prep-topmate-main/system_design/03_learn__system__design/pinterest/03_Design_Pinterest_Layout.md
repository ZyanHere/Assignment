# Pinterest Layout Design


[Watch on YouTube](https://www.youtube.com/watch?v=y92NFsEKc_M)

---

#### **Overview**
- Also called **masonry layout**.
- Essentially a grid layout that places elements in optimal positions based on available vertical space.
- Pinterest layout typically uses fixed-width columns.

#### **Example:**
- **Three columns on a 900px screen**:
  - Columns have fixed widths.
  - Images with various heights are placed based on column heights.
  - **Example:** Picture 4 is placed in the second column with the shortest height.

---

### **Requirements**

1. **Fixed-width columns for images.**
2. Preserve the **aspect ratio** of images.
3. Provide **different image sizes** for various viewports.
4. **Infinite scroll** for entertainment-type content.
5. Images should be:
   - **Responsive** across screen sizes.
   - Use **lower resolution** images for smaller screens.
   - Ensure **fast downloading** and smooth rendering.

---

### **Basic Design**

- **Positioning Images:**
  - Maintain an array of column heights.
  - Use the shortest column to place the next image.
  - **Update styles:**
    - Images are **absolute positioned** to avoid triggering reflows.

#### **Screen Resizing:**
- Recompute layout and render images on screen resize.
- Use **CSS breakpoints** to trigger callbacks for layout adjustments.

---

### **API Request and Response**

- **API Request:**
  - **GET request** with an optional `previousCursor` parameter.
  - Cursor remembers the last position from the previous request.
  - Example: The cursor is converted to Base64 (shown as raw string for demo).

- **API Response:**
  - Includes metadata:
    - **Total images** count.
    - **Fetched images** count.
    - **Page info object:**
      - Start point for the next request.
      - Number of images to fetch.
  - **Data array:**
    - Contains image and video details for display.

---

### **Image Loading and Layout Issues**

- **Images Property:**
  - For each pin, images are optimized for viewport widths.
  - Browser prioritizes loading relevant images and lazy-loads others.

#### **Layout Shift Issue:**
- Images take up zero space until loaded, causing layout shifts.
- **Solution:**
  - Define width, height, and aspect ratio for each image.
  - Example:
    ```html
    <img src="image.jpg" width="300" height="200" style="object-fit: cover;" />
    ```

---

### **Optimizations**

1. **Above-the-Fold Loading:**
   - Load images visible before scrolling.
   - For **image carousels**, prioritize the first image and lazy-load others.
2. **Media and Size Attributes:**
   - Use `<picture>` and `<source>` elements to specify media and size attributes.
3. **Lazy Loading:**
   - Use the `loading="lazy"` attribute for below-the-fold images.
   - Use libraries like **LazySizes** for development.
4. **Image Formats:**
   - Use **WebP** for better compression.
   - Use **progressive JPEG** for smoother loading transitions.
5. **Concurrent Connections:**
   - Browsers limit concurrent downloads per domain.
   - **Solution:** Create subdomains to increase connections.
   - **Alternative:** Embed images using **Base64 encoding** in HTML.

---

### **Infinite Scroll**

- **Ideal for cursor-based pagination.**
- Implementation uses:
  - **Intersection Observer:**
    - Monitors top and bottom nodes.
    - Triggers callbacks when nodes cross thresholds.
- **Benefits of Cursor-Based Pagination:**
  - Supports real-time data updates.
  - Avoids skipped or duplicated data.
  - Handles large datasets efficiently.
- **Drawbacks:**
  - Limited sorting capabilities.
  - Complexity in cursor implementation.

---

### **Edge Cases**

- **Network Issues:**
  - Retry logic to reload images.
  - Ignore errors after a set number of retries.

---

