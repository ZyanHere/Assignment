# Front-End Product Design: Netflix - YouTube

**[Watch on Youtube](https://www.youtube.com/watch?v=Tu-hZ6lqNtY)**

---

### **Introduction**

- **Key Difference**:
  - **System Design**: Focuses on systems' architecture.
  - **Product Design**: Focuses on **features** and holistic application design.

---

### **Understanding Product Design**

- Product design interviews evaluate the ability to focus on **key features** and deliver a **holistic view**.
- Compared to system design:
  - Facebook News Feed: Infinite scroll and layout focus.
  - Netflix: No single "unique" feature; a complete application view is needed.

---

### **The Challenge**

- No **one correct answer** in product design.
- Opinionated features are acceptable if **well-justified**.
- Approach:
  1. Understand **what Netflix is**.
  2. Break down the application.

---

### **Netflix Overview**

- Netflix allows:
  - **Movie Search**:
    - By _Actor_: e.g., Jackie Chan.
    - By _Genre_: e.g., Comedy, Drama.
    - By _Name_: e.g., _Sex Education_.
- **Key Features**:
  - **Header**:
    - Genres (default + most common).
    - **Profile Actions** (Account and Help Center).
  - **Promo Movie**:
    - Large preview with play and **more info** options.
  - **Hover on Movie Cards**:
    - Small previews.
    - Detailed Information (for TV Series: episodes).

---

### **General Plan**

1. **General Requirements**
2. **Functional Requirements**
3. **Application Architecture**
4. **Data Entities**
5. **Data API**
6. **Data Store**
7. **Optimization and Accessibility**

---

## **General Requirements**

- **Key Features**:
  - **Search**:
    - By **Actor**, **Genre**, and **Name**.
  - **Short Previews**: Hover for previews.
  - **Watch Movies**: Streaming functionality.

---

## **Functional Requirements**

- **Multi-Platform Support**:
  - TV, Tablets, Smartphones, Desktops.
- **Adaptability**:
  - **Network Bandwidth**: Optimize videos for low connections.
  - **Images/Promos**: Adjust quality to viewport/network.

---

## **Application Architecture**

### **Design System**:

- **Typography**: Fonts and styles.
- **UI Primitives**: Buttons, selects, grid systems.
- **Components**: Reusable building blocks.

### **Key Pages**:

1. **Main Page**: Core focus for Netflix experience.
   - **Promo Movie**: Weekly featured movie.
   - **Dashboard**: Movies categorized by tags (e.g., _My List_, _TV Shows_).
   - **Hover Cards**: Detailed previews.
2. **Sign-Up Page**:
   - Optimized for **fast load times**.
3. **Profile Management Page**:
   - Basic design for account settings.

---

## **Data Entities**

### **Movie**:

- **ID**
- **Preview URL**
- **Title**
- **Description** _(optional)_
- **Episodes** _(for series)_
- **Rating**
- **Cast**: List of actors.
- **Tags**: Genres or attributes.

### **Episode**:

- **ID**
- **Preview URL**
- **Title**
- **Movie ID** _(Parent reference)_
- **Streaming URLs**: Adjusted per network.

### **Actor**:

- **Name**
- **Profile URL**

---

## **Data API**

1. **GET Dashboard**:

   - Parameters:
     - **API Key**, **User ID**.
   - Returns:
     - **Dashboard Map** (_Key_: Tag, _Value_: Movies List).

2. **Search Movies**:
   - Parameters:
     - **API Key**, **User ID**, **Query**, **Tags**, **Page Size**.
   - Returns:
     - **Filtered Movie Cards**.

---

## **Data Store**

- **Stores**:
  1. **Movie Store**: Movies by **ID**.
  2. **Episode Store**: Episodes grouped by **Movie ID**.
  3. **Dashboard Store**: Tags and corresponding **Movie Lists**.
  4. **Search Store**: Search results.

### **Fetching Points**:

- **Main Page**: Requests the dashboard.
- **Movie Card**: Fetches full movie details on demand.

---

## **Optimization**

### **Network Performance**:

- **Minimize Requests**:
  - Bundle splitting: **Vendor**, **Player**, **Dashboard**, **Profile**.
- **Optimized Resources**:
  - Modern formats: **WebP** for images, **GIFs** for previews.
- **HTTP/2**: Multiplexing for parallel resource streaming.
- **Lazy Fetching**: Load details **only** when needed.

### **JavaScript Performance**:

- **Minimize Execution**:
  - Use **Web Workers** for heavy tasks.
- **Bundle Optimization**: Split and minimize code.

### **Rendering Performance**:

- **Server-Side Rendering (SSR)**:
  - Fast **Sign-Up Page** load times.
- **Inlined Critical JS/CSS**: Prioritize rendering.
- **Placeholders**: Preload movie cards for feedback.
- **Efficient Animations**: Use **transform** for paint-level updates.

---

## **Accessibility**

- **Subtitles**: Screen-reader compatible.
- **Hotkeys**: Navigation for search, open descriptions, and help.
- **Color Schemes**: Support for **color blindness**.
- **Responsive Design**: Use **REM units** for browser zoom compatibility.
- **ARIA Live Attributes**: Announce input fields dynamically.

---

## **Conclusion**

- Designed a **holistic product design** for Netflix.
- Focused on:
  - Features, architecture, data entities, and optimization.

---
