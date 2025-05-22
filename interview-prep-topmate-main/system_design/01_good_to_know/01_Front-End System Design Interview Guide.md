## FE System Design Interview Guide

For front-end interviews, there will be two types of on-site interviews. 

### Type 1:
   1. There won’t be system design questions focused on the entire architecture. 
   2. Instead, one type will cover smaller system design tasks. 
   3. You’ll be asked to work on a specific feature of a product, such as building an autocomplete (type-ahead) or a progress bar. 
   4. You won’t need to worry about the entire product or its tech stack; just focus on implementing a particular feature. 
   5. This type of problem is mostly about JavaScript and the DOM, like building a small part of a larger application.

### Type 2:

1. The second type of interview is more about product design. 
2. For example, you might be asked to design something like Instagram and explain how you would organize the front-end tech stack. 
3. This type of question is more open-ended and requires considering many factors.


### So, in summary, there are two types of front-end interviews: 
   1. one focused on implementing specific features, 
   2. and the other on high-level product design.

----

## 1. Understand What it is:

- So, whenever we're given a problem, the first step is to make sure we fully understand it. 
- We need to confirm with the interviewer that we’re clear on what they’re asking for. 
- For example, if they ask us to design Instagram, we might say, "As far as I know, Instagram is a service where people can upload images, share them, and follow each other to see updates."
- This way, we check if we’re on the same page.

```js
- Once we understand the basic problem—whether it’s something like creating a specific feature like autocomplete
```
- We can move on to 
  - discussing the UI, 
  - user interactions, 
  - and other details. 

But it all starts with fully understanding the problem.

----

## 2. Decide the scope:

- The next step is to decide on the scope of what we’re going to design. 
- We can't create a perfect system in just 45 minutes, 
- so we need to focus on the parts that best showcase our skills. 
- I’d suggest choosing features we’re confident in and avoiding areas we’re less familiar with.
- To keep things manageable, limit the scope to two main features. 
  - Define both what you’ll work on (the "to-do" list) 
  - and what you won’t cover (the "not-to-do" list) 

```js
- so the interviewer sees that you’re aware of other aspects but are prioritizing because of the time limit.
``` 
- This shows you’ve thought through the whole problem but are focusing on the core parts due to constraints.

> **This step is crucial.** We should confirm our approach with the interviewer by asking, “Is it okay if I proceed in this direction?” If they have other suggestions, they might give us a hint, and we can adjust accordingly.

---

## System Design Guide

When designing a feature, here’s a step-by-step guide to follow.

### 1. Define the Basic Goal of the Feature
   - **Ask yourself:** What is the primary purpose of this feature?
   - Example: For a type-ahead feature, the goal is to assist the user by suggesting text as they type.

### 2. Define Non-Functional Goals
   - **Non-functional goals** are about improving the quality and experience of the feature.
   - Consider elements like:
     - **Instant response:** Should it feel fast and smooth?
     - **User experience enhancements:** Add animations to make it engaging.
     - **Resilience:** For server-side, ensure stability, though this may be less relevant on the front end.

### 3. Determine the Data Flow and User Flow
   - **Data Flow:** Identify all necessary APIs for this feature.
     - Example: For type-ahead, you might need an API that provides search suggestions.
   - **User Flow:** Map out the typical user interactions.
     - **Example steps:** Where will the user click? What happens after each interaction?

### 4. Define the MVP (Minimum Viable Product)
   - **MVP** is the essential version of the feature with only core functionality.
   - List the primary components:
     - Key APIs
     - Basic user interactions
     - Essential UI elements

### 5. Define the UI Component’s State
   - Think of the different states of the UI component.
     - Example for a progress bar:
       - **Idle** (no progress)
       - **In Progress**
       - **Complete**
   - Having a clear state definition allows you to manage UI changes effectively.

### 6. Separate UI and Logic
   - **Divide the feature into layers:** Separate the user interface (UI), data, and logic.
     - Use frameworks like React or TypeScript to define states and manage them effectively.
   - **Sync the UI with the state:** Ensure that changes in data automatically reflect in the UI.

### 7. Define the Core Specifications (Core Spec)
   - Based on your MVP, list the core specs to focus on:
     - Supported actions (e.g., “When a user clicks this, it should do that”)
     - Handle edge cases (unusual or challenging scenarios)
     - Identify tricky parts that may need extra attention
   - Clearly defining these specs helps guide the feature's implementation.


> **Tip:** Always check in with the interviewer or your team about the scope and direction before diving too deep. This helps align expectations and gives you a chance to refine your approach based on their feedback.

-----

## Product Design Considerations

When designing a product, consider the following aspects:

### 1. Goal of the Web Service
   - Define the primary purpose of the web service. What problem does it solve or what value does it provide to users?

### 2. Relation to Native Apps
   - **Questions to consider:**
     - Should the web service be a replica of a native app, or a lighter version?
     - Would a Progressive Web App (PWA) be useful for better performance and offline capabilities?

### 3. Target Platform
   - Identify the main platform(s) for the service:
     - **Mobile** (optimized for smartphones and tablets)
     - **Desktop** (optimized for larger screens)

### 4. Mobile-First vs. Desktop Design
   - Decide if the service should be **mobile-first**, or if it also needs a dedicated design for desktop users.

### 5. SEO and Rendering Considerations
   - **SEO Concerns:** Determine if search engine optimization (SEO) is important for discoverability.
   - **Rendering Needs:**
     - Should you use **Server-Side Rendering (SSR)** to improve performance and SEO?
     - Is a **Single Page Application (SPA)** sufficient for the service?


### 6. Volume of the Service and Team Members

- **Service Volume**: 
  - Is the project small or large? 
  - Small projects with fewer team members allow more flexibility in design decisions. 
  - Larger projects, like those with over 150,000 lines of TypeScript code, require stricter structure and planning.
  
- **Team Structure**:
  - Consider whether the team includes in-house members, vendors, or outsourced partners.
  - For critical parts of the project, it’s ideal to keep them in-house to maintain quality and security.
  - Less crucial tasks, such as customer support pages, can be outsourced to save time and resources.

### 7. Minimum Viable Product (MVP) and Core Features

- **Defining the MVP**:
  - Identify and list the core features essential to launching the product.
  - Choose features that highlight your strengths, making it easier to discuss them confidently in interviews.

- **Preparation for Interviews**:
  - Be ready with specific design patterns or solutions that match your strengths.
  - Prepare examples or scenarios to help guide discussions with the interviewer.

### 8. Shining Points of the Service and Developer Experience (DX)

- **Service Highlights**:
  - Focus on product-oriented enhancements that add value for users, such as interactions or animations.
  
- **Developer Experience (DX)**:
  - Aim to integrate new technologies or methods that improve both the product and your learning experience.
  - Ensure that working on the project is not only productive but also an opportunity for personal growth.

### 9. Future Roadmap

- **Future Enhancements**:
  - List features to be developed in the future, as well as features to leave out for now (like “to-do” and “not-to-do” lists).
  
- **Example**:
  - For a product like Instagram, consider adding a real-time “like” counter that updates dynamically, similar to Twitter’s real-time engagement metrics.

---

## Product Design Considerations

Before diving into the design details, it's essential to make some key assumptions about the expected usage and performance requirements. These assumptions guide us in estimating the necessary capacity and performance benchmarks.

#### 1. Daily Active Users (DAU) / Monthly Active Users (MAU)
- **Estimating DAU/MAU**:
  - Determine how many users will engage with the service daily and monthly.
  - This is critical for both **error tracking** and **resource allocation**.
  - Based on past experience, we assume that around **0.5% of page views may result in errors** (e.g., network issues).
  - Tools like **Sentry** can help us track these errors, but we need to account for the expected error rate and apply for adequate storage based on usage.

#### 2. Daily Interactions
- **Estimating User Interactions**:
  - Estimate how many interactions (clicks, views, likes) occur each day.
  - Example:
    - Assume each user spends **1 hour per day** on the service.
    - They might visit 6 detail pages and interact (e.g., like or comment) about **20 times**.
  - This estimation helps us prepare for the volume of tracking events sent to services like **Google Analytics**.

#### 3. Performance and Tolerable Asset Size
- **Asset Size**:
  - Assume that **300 KB** is an acceptable size for assets (JavaScript, CSS, images, etc.).
  - Keeping assets within this limit helps ensure smooth performance, especially on mobile networks.
  
- **API Response Time**:
  - Target an **average API response time of 100 milliseconds**.
  - Fast response times improve the user experience and make the app feel more responsive.
  - While this metric might be influenced by backend services, it’s critical for frontend engineers to design with this goal in mind, optimizing loading and interaction speeds.

---

## Big Picture

When designing a system, it's essential to start with the "big picture" to ensure that all stakeholders, especially the interviewer, understand the overall architecture and user interaction flow. For more complex products, a diagram can be invaluable in conveying these ideas.

### 1. Diagram or Outline
- **Draw a Diagram**:
  - For larger or complex applications, it's beneficial to draw a diagram representing the architecture.
  - A visual representation helps to clearly communicate the structure, data flow, and key components.
- **List an Outline (if diagram is unnecessary)**:
  - For simpler features, a well-structured outline that describes the system’s main components and flows might be sufficient.
  - Describe the purpose of each component briefly, and explain how they connect to achieve the feature.

### 2. Define Data Flow / User Interaction Flow
- **Data Flow**:
  - Describe how data moves through the system—from client to server and back.
  - Specify any APIs involved and the sequence of interactions.
- **User Interaction Flow**:
  - Detail how users will interact with the feature, step by step.
  - Outline each possible user action and the system’s corresponding response.

### 3. Check with Interviewer
- **Validate Understanding**:
  - Once the big picture is clear, check with the interviewer to ensure your approach aligns with their expectations.
  - A quick confirmation can reveal any misunderstandings early, allowing adjustments before delving into further details.
- **Clarify Expectations**:
  - The interviewer may have additional suggestions or modifications that can guide your design in a better direction.
  - Use this opportunity to align your solution with any specific requirements or constraints.

> **Tip:** By establishing a clear big picture through diagrams, outlines, and continuous check-ins with the interviewer, you create a strong foundation for more detailed system design discussions.

----

## Key Challenges and Bottlenecks

In system design, especially for the front end, it's crucial to identify and address specific **challenges** and **bottlenecks**. This is where you can really showcase your expertise. For front-end systems, two critical areas to focus on are **Smoothness** and **Speed**.

---

### Smoothness (Jank-Free Experience)

Smoothness is about creating a seamless, "jank-free" experience that feels natural and intuitive. This isn’t just about speed; it’s about maintaining an uninterrupted flow for the user. Here are some key considerations to achieve smoothness:

#### 1. Instant Go Back
   - **Issue**: In many Single Page Applications (SPAs), going back can be problematic, especially if the system fails to restore the scroll position.
   - **Solutions**:
     - **Page Stack**: Use a page stack to save states for faster navigation and consistent UI.
     - **Global State**: Store data in global state (like Redux) to avoid redundant API requests when going back.
     - **API Caching**: Cache APIs for specific intervals to avoid unnecessary fetches.
     - **Scroll Position Management**: Manage both vertical and horizontal scroll positions to avoid jarring reflows.

#### 2. Instant Go Forward
   - **Issue**: Delays when navigating forward, especially due to data fetching.
   - **Solutions**:
     - **Skeleton Screen**: Show a skeleton screen to provide a visual placeholder while the content loads.
     - **Loading Indicator**: Use loading spinners or other indicators to show progress.
     - **Above-the-Fold Rendering**: Prioritize rendering above-the-fold content first for faster perceived load times.

#### 3. Instant Interaction Response
   - **Goal**: Ensure every user interaction feels immediate.
   - **Best Practices**:
     - **Accessibility (A11y)**: Provide visual feedback (like hover states) and ensure compliance with accessibility standards.
     - **Passive Listeners**: Use passive event listeners to avoid blocking the main thread during user interactions.
     - **Design Guidelines**: Follow established design guidelines for consistent button sizes, pop-ups, and animations.

#### 4. Native-Like Animations, Transitions, and Gestures
   - **Goal**: Make the web app feel as smooth as a native app.
   - **Implementation**:
     - **Lottie Animations**: Use Lottie animations for richer, lightweight animations.
     - **Page Transitions**: Implement smooth page transitions (e.g., slide or pop-up animations) to mimic native navigation.
     - **Gesture Support**: Add gesture support, like swipe-back, for more intuitive navigation.

#### 5. Native-Like UI Components
   - **Goal**: Achieve a familiar, app-like feel with native-inspired components.
   - **Examples**:
     - **Action Sheets**: Implement action sheets for a native feel, especially for menus and options.
     - **Toasts**: Use toast notifications at the bottom for feedback on actions (e.g., success, error).

---

## Speed/Performance Optimization

Speed is a core component of performance optimization. There are numerous techniques to improve loading times, rendering speed, and overall responsiveness. Here’s an outline of essential approaches:

---

### 1. Preload and Prefetch

   - **Preload**: Load resources that will likely be needed soon. For example, preload assets for a page if the user hovers over a link, as they might navigate to that page next.
   - **Prefetch**: Prefetch resources for likely future actions. For example, if users frequently visit certain pages after the current one, prefetch these assets in the background to reduce wait times.

---

### 2. Code Splitting

   - **Purpose**: Avoid loading all code at once by splitting it into smaller, manageable chunks.
   - **Approach**: Bundle core routes and load additional routes lazily. For non-critical paths, load code only when required.
   - **Skeleton Screens**: Instead of a blank loading screen, display a skeleton layout to indicate the page structure while content is still loading.

---

### 3. Caching and CDN

   - **Caching**: Cache static resources, such as images, JavaScript, and CSS files, with a long cache duration (e.g., one month) using unique content hashes for versioning.
   - **CDN**: Distribute resources globally using a Content Delivery Network (CDN) to reduce latency and load times for users in different locations.

---

### 4. Service Worker and Offline Support

   - **Service Worker**: Implement service workers to manage caching policies and enable offline capabilities.
   - **Refined Caching Control**: Use service workers to cache specific API responses or assets, improving load times and ensuring offline access.

---

### 5. Lazy Loading

   - **Images and Components**: Load images, components, and other non-critical elements only when they come into view. This can reduce initial load times significantly.
   - **On-Demand Initialization**: Initialize components only when they enter the viewport, especially on long pages.

---

### 6. Auto Pager

   - **For Feeds and Timelines**: Automatically load more content when the user scrolls close to the bottom of the page. This approach creates the illusion of infinite scrolling.
   - **Dynamic Paging**: Fetch new data and append it to the existing list when users scroll near the end of the content.

---

### 7. Infinite Scroll

   - **Sliding Window Technique**: Remove off-screen DOM elements as the user scrolls deeper into the content to avoid memory bloat.
   - **DOM Management**: Keep only a small number of DOM elements in view by erasing elements that have scrolled past and dynamically loading new ones within the viewport.

---

### 8. Server-Side Rendering (SSR) and Initial Data Feed

   - **SSR**: Pre-render HTML on the server for faster initial paint, especially useful for SPAs. Use frameworks like Next.js to simplify SSR.
   - **Initial Data Feed**: Embed initial data within the HTML response to reduce the need for immediate API calls. This allows content to render faster on the client side.

---

### 9. Viewport-Based Updates

   - **Targeted Data Fetching**: For dynamic data updates, fetch only the data within the visible viewport. This reduces API payloads and minimizes re-rendering costs.
   - **Use Case Examples**: Stock price updates, chat messages, or live notifications that only update items visible on the screen, improving both speed and efficiency.

---

## Image Optimization Strategies

Optimizing images is crucial for a visually engaging platform like Instagram, where images are a key component of the user experience. Here are effective strategies to enhance image loading performance and quality:


### 1. Compress Images

   - **Purpose**: Reducing image file sizes without sacrificing too much quality is essential for faster loading times.
   - **Approach**: Use image compression techniques to find a balance between quality and file size. Tools like TinyPNG or ImageOptim can help achieve optimal compression while preserving visual clarity.

---

### 2. Lazy Load with Placeholders

   - **Lazy Loading**: Chrome and other browsers now support native lazy loading, which helps delay loading off-screen images until they're needed, saving bandwidth and reducing load times.
   - **Placeholders**: To avoid page layout shifts, use placeholders with predefined image dimensions. This ensures that the page layout remains stable, even while images are loading in the background.

---

### 3. Progressive Images

   - **Blurry Placeholders**: Send a low-resolution, blurred version of the image as a placeholder. This gives users a preview of the image that gradually becomes clearer as the high-resolution version loads.
   - **Format Considerations**: JPEGs support progressive loading, where the image loads in layers of clarity. While PNGs also support progressive rendering, JPEGs are generally more size-efficient and load faster.

---

### 4. Use SVG for Icons

   - **Why SVG**: SVGs are scalable vector graphics, ideal for icons. They are resolution-independent, meaning they adapt perfectly to different screen sizes and device pixel ratios.
   - **Customization**: SVGs allow for easy color and size adjustments, making them highly adaptable and lightweight compared to image sprites or individual raster files.
   - **Modern Alternative**: SVGs replace traditional sprite images, which required managing complex background positions for each icon.

---

### 5. Caching and HTTP/2

   - **Browser and CDN Caching**: Cache images with appropriate headers to maximize efficiency. Use both browser caching and CDN caching to serve static images quickly, reducing load on the origin server.
   - **HTTP/2 Benefits**: HTTP/2 allows for multiplexing, meaning multiple images can be loaded in parallel over a single connection, further improving loading times for image-heavy pages.

---

## API Optimization Strategies

APIs are at the core of any application’s functionality, especially for data-driven platforms. Here are some strategies to optimize API performance and design:


### 1. Data Updates: Polling, WebSockets, and Server-Sent Events (SSE)

   - **Polling**: Polling is a straightforward approach where the client repeatedly requests updates at regular intervals. This can work well for less dynamic data but may be inefficient for highly interactive applications.
   - **WebSockets**: WebSockets enable real-time, bidirectional communication between the client and server. Ideal for applications like chat, where data needs to flow in both directions.
   - **Server-Sent Events (SSE)**: SSE is a one-way communication method where the server pushes updates to the client. Suitable for applications like stock price tracking where updates are frequent, but the client only needs to receive, not send, data.

---

### 2. BFF (Backend for Frontend)

   - **Purpose**: BFF is an API layer that aggregates multiple backend services into a single interface for frontend applications. This helps avoid complex, fragmented API calls from the frontend and enables a more tailored API design for each frontend client.
   - **Implementation**: The BFF layer can act as a proxy, batching requests to different microservices, aggregating responses, and sending a unified response to the frontend. This simplifies frontend development, reduces API complexity, and improves performance.

---

### 3. GraphQL

   - **Advantages**: GraphQL offers a flexible query language that allows the client to request only the data it needs, which reduces over-fetching. It's especially beneficial for applications with varied UI components that need different data views, like applications supporting multiple platforms (web, mobile).
   - **Considerations**: While GraphQL can be powerful for complex applications with diverse data requirements, it may be unnecessary for simpler applications with predictable data needs. For smaller projects, a traditional REST API might be sufficient and simpler to manage.

---

### 4. Caching and HTTP/2

   - **Caching**: Caching frequently requested or resource-intensive GET APIs can drastically reduce load times and server strain. Cached responses can be stored in memory, on the client, or via CDNs for quick access.
   - **HTTP/2**: HTTP/2 enhances performance by allowing multiplexed requests over a single connection. This means multiple API calls can be served simultaneously, reducing latency and improving the overall responsiveness of the application.

---

## RAIL Model for Web Performance

The RAIL (Response, Animation, Idle, Load) model, developed by Google, outlines four critical metrics for creating a fast and responsive user experience. Here’s how each component applies:


### 1. Response (Target: 100ms)

   - **Goal**: The application should respond to user interactions (like taps or clicks) within 100 milliseconds.
   - **Importance**: Immediate feedback is crucial for creating a responsive experience. A delay beyond 100ms can make the application feel sluggish, reducing user satisfaction.

---

### 2. Animation (Frame Time: 10ms)

   - **Goal**: Maintain smooth animations with frames rendering every 10 milliseconds or faster to achieve a 60fps frame rate.
   - **Importance**: Smooth, jank-free animations are essential for a high-quality user experience. Users expect seamless animations and transitions without stuttering.

---

### 3. Idle (Using Idle Time: 50ms Chunks)

   - **Goal**: Utilize idle time in 50-millisecond chunks to handle background tasks, such as preloading resources, sending analytics beacons, or caching data.
   - **Importance**: Using idle time efficiently ensures that essential tasks are completed without interrupting the main user experience. Background tasks should be deferred to idle periods to keep the app responsive.

---

### 4. Load (First Meaningful Paint: 5 seconds)

   - **Goal**: Display meaningful content to the user within 5 seconds of initial load.
   - **Note**: While 5 seconds is the maximum threshold, aiming for 2 seconds or less is ideal to ensure a good first impression.
   - **Importance**: Faster load times improve user retention, as long delays can lead to abandonment. Showing something within 2 seconds keeps users engaged and prevents frustration.

---
## Matrix

1. **DOMContentLoaded**
   - This metric indicates when the initial HTML document is fully parsed, and all synchronous scripts are executed. This signals that the DOM is ready for manipulation.

2. **Load**
   - This occurs when all the resources required by the page, including images and scripts, have fully loaded. Even asynchronously loaded resources like Google Analytics can affect the timing of this event.

3. **First Contentful Paint (FCP)**
   - This marks the first time any content (like text or images) is rendered on the screen. It signals to the user that the page is loading.

4. **First Meaningful Paint (FMP)** (deprecated)
   - FMP indicates when the primary content in the viewport is visible, meaning the main above-the-fold content is fully rendered. However, this metric is deprecated as it was often misinterpreted, especially if only a loading spinner was shown.

5. **Speed Index**
   - Speed Index represents how quickly content appears during page load. It is measured as the time between the First Contentful Paint and the First Meaningful Paint, capturing the gradual visibility of content.

6. **First CPU Idle** (ready to interact, deprecated)
   - This metric measures when the main thread is idle enough for user interaction. It indicates that basic interactivity is possible, but it does not guarantee the page is fully interactive.

7. **Time to (fully) Interactive (TTI)**
   - TTI measures when the page is fully interactive. This includes all nodes being rendered and event listeners attached, making the page fully functional and responsive to user input.

8. **First Input Delay (FID)**
   - FID represents the delay experienced by users when they first interact with the page (e.g., tapping a button) and the time it takes for the browser to respond. It highlights the responsiveness of the app’s initial load.

9. **Total Blocking Time (TBT)** (from FCP to TTI)
   - TBT is the cumulative time between FCP and TTI during which user interactions are delayed due to long tasks. It accounts for periods when the main thread is blocked, affecting responsiveness.

10. **Largest Contentful Paint (LCP)** (2.5s)
   - LCP measures when the largest content element in the viewport is rendered, such as an image or text block. It provides a more accurate representation of when the main content is visible to the user, replacing the deprecated FMP. Google introduced this to avoid scenarios where a global loading spinner would misleadingly mark content as "meaningful."

----

## Trade-off, Alternatives, TODO

- **Nothing is Perfect**
  - Every system design comes with its trade-offs, and it’s essential to recognize that achieving perfection in every aspect is nearly impossible. The goal is to make informed decisions based on the available time, resources, and priorities.

- **Possible Improvement Ideas**
  - List potential areas of improvement or optimization that could enhance the system. This could involve:
    - Trying alternative technologies like GraphQL. For example, implementing GraphQL in a small part of the application to evaluate its effectiveness and then, if successful, gradually migrating other parts.
    - Introducing optimizations, such as improving cache strategies, refining API response times, or reducing image load sizes.
    - Exploring microservice architecture or more advanced CI/CD pipelines for efficient development and deployment.

- **Additional Features with More Time**
  - Identify features or capabilities you would implement with more time. This demonstrates a forward-thinking approach and commitment to delivering a better product. Examples might include:
    - Adding a robust analytics dashboard to monitor performance and user behavior.
    - Implementing sophisticated caching layers to improve performance.
    - Enhancing accessibility and user experience through animations and responsive design improvements.
    - Building modular components that improve maintainability and scalability.
  
- **Highlighting Your Vision to Interviewers**
  - Show your understanding of the system's current limitations and the thought process behind any trade-offs made. Demonstrating a willingness to revisit and improve upon the design shows you’re adaptable and invested in creating a high-quality, long-term solution.

>**SUMMARY**: This approach allows interviewers to see that you are not only focused on delivering a solution but are also capable of iterating and enhancing it. By listing these possible improvements and ideas, you present yourself as a proactive, innovative thinker who values continuous improvement.
