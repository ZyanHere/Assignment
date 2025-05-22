
# Netflix Frontend System Design

[Watch on Youtube](https://www.youtube.com/watch?v=-Sn48geZruk)

---

### Topics:
  - Functional and Non-functional requirements.
  - How streaming works.
  - Protocols like HTTP2, HTTP3.
  - Configurable UI and performance.
  - Backend for the frontend.

### Detailed discussions:
  - Netflix's tech stack and micro frontends.
  - Importance of "backend for the frontend".

### **System Design Process:**
  - **Requirements** (Functional & Non-functional).
  - **Scoping**: Critical elements to focus on.
  - **Tech Choices**: Netflix’s strategies.
  - **Component Architecture**.

### **Requirements: Functional and Non-functional**
  - **Functional Requirements:**
    - Module and feature-level thinking.
    - Supply and demand perspectives.
  - **Supply Examples:**
    - Video uploading.
    - Analytics (watch hours, pause stats).
    - Metadata: Title, description, tags.
  - **Demand Examples:**
    - Multi-user support and parental controls.
    - Pricing, subscription, and account management.

### Netflix's critical business features:
  - TV series and movie catalogs.
  - Detail pages, watch lists, and reviews.
  - Features like likes, dislikes, and comments.

### **Feature-Level Thinking:**
  - Homepage elements.
  - Catalog features:
    - Search.
    - Card and banner previews.
  - Multi-user support (profile switching, parental control).
  - Video player controls (speed, quality, subtitles, thumbnails).

### Observations from Netflix UI:
  - Configurable UI design approach.
  - Dynamic rendering of content and features.

## **Feature Summary:**
  - Language switching.
  - Sign-in/Sign-up workflows.
  - Configurable UI components.
  - Video player functionalities.

## **Non-Functional Requirements:**
  - Mobile and desktop support.
  - Responsive and adaptive behavior.
  - Asset optimization (videos, images, CSS/JS).
  - Resource hinting (prefetch, preload).
  - SEO via Open Graph tags.
  - Deep linking and performance improvements.

## Advanced topics:
  - HTTP2 & HTTP3 protocols.
  - Caching, offline support, and PWA.
  - A/B testing and versioning.
  - Internalization & localization.

## Netflix's **Tech Stack:**
  - **Languages/Frameworks:** React, TypeScript, RxJS, RESTify.
  - **Backend:** Node.js, Python, Java.
  - **Database:** MySQL, PostgreSQL, DynamoDB, Cassandra.
  - **Tools:** Webpack, Lerna, Jenkins, Confluence.
  - **Design System:** Hawkins.

## **Streaming Protocols:**
  - HLS (HTTP Live Streaming).
  - DASH (Dynamic Adaptive Streaming over HTTP).
  - SRT (Secure Reliable Transport).
  - Quick (HTTP3).

## **TCP vs UDP:**
  - TCP: Reliable, ordered, connection-oriented.
  - UDP: Fast, connectionless, potential data loss.

## **Implementation Concepts:**
  - Component-driven design systems.
  - Data sharing across components.
  - Infinite scroll and routing logic.

## **Localization & Theming:**
  - Localized strings for dynamic content.
  - Theming configurations for consistent design.

---

### Example Code Block

```javascript
// Example of a configurable UI component
// This component dynamically renders a carousel.
// Props:
// `items`: Array of items to display.
// `config`: Configuration object for customization.

const Carousel = ({ items, config }) => {
  return (
    <div className="carousel">
      {items.map(item => (
        <div key={item.id} className="carousel-item">
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};
```

---
