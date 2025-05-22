# Front-End System Design - Star Widget

[Watch on Youtube](https://www.youtube.com/watch?v=IBm1vsK0vXE)

---

### Introduction

- **Topic:** Front-end system design for a **Star Rating Widget**.
- **Visualize Design:** Requirements and behavior defined as we move forward.

---

## Functional Requirements

### Key Features

1. **Widget Title:**
   - Displays the widget’s title to clarify the purpose.
2. **Reviewed Product or Service:**
   - Shows the specific product or service under review (e.g., book, movie, software).
3. **Number of Ratings:**
   - Displays the total ratings submitted.
4. **Average Rating:**
   - Shows the average rating, rounded to one decimal point.
5. **User Ratings:**
   - Allows users to submit ratings using stars (1–5).
6. **Rating Breakdown:**
   - Provides a breakdown of ratings.
7. **Feedback Messages:**
   - Success or error feedback after rating submission.
8. **Hover Tooltips:**
   - Displays descriptions when hovering over stars (e.g., “Very Good” for 4 stars).
9. **Read-Only Mode:**
   - For loaded or archived items, displays ratings without allowing new submissions.

---

## Non-Functional Requirements

### Key Features

1. **Performance:**
   - Fast load times and instant feedback.
2. **SEO-Friendly:**
   - Implementations must not negatively impact SEO.
3. **Localization:**
   - Adapt to multiple languages and text directions (e.g., RTL support).
4. **Testability:**
   - Support manual and automated testing (unit, integration, end-to-end).
5. **Browser Compatibility:**
   - Function seamlessly across browsers (e.g., Chrome, Firefox, Safari).
6. **Responsive Design:**
   - Works well on all screen sizes, starting at 320px.
7. **Error Handling:**
   - Handle rendering errors at the component level and API errors at the application level.

---

## Interface

### Widget Interface

- **Required Fields:**
  - `id`: Identifier for the product or service.
  - `averageRating`: Current average rating.
  - `totalRatings`: Total number of ratings submitted.
  - `title`: Name or title of the item being rated.
  - `type`: Category of the product or service (e.g., book, movie).
  - `onRatingSubmit`: Function executed when a user submits a rating.
- **Optional Fields:**
  - `tooltipEnabled`: Enable or disable tooltips on hover.
  - `errorRenderEnabled`: Handle error states within the widget.
  - `maxRating`: Maximum possible rating (default: 5).
  - `minRating`: Minimum possible rating (default: 1).
  - `isDisabled`: Prevents new rating submissions.
  - `validateRating`: Function to validate user input and set a new value.
  - `ariaLabels`: Array for accessibility (e.g., star title, number).

---

## Assumptions

### Application Responsibilities

1. **Language Provider:**
   - Recognizes user-preferred language and direction (RTL/LTR).
2. **Theme Management:**
   - Adapts to themes (e.g., dark, light, contrast).
3. **HTTP Interceptors:**
   - Manages tokens, timeouts, and server-related errors.
4. **Loading States:**
   - Displays loading animations or skeletons when components are initializing.

---

## API Design

### Endpoints

1. **Get Star Rating:**
   - Endpoint: `GET /star-rating`
   - Params: `productID`, `Accept-Language`.
   - Response: `averageRating`, `totalRatings`, `title`, `type`.
2. **Set Star Rating:**
   - Endpoint: `POST /star-rating`
   - Params: `productID`.
   - Body: `value` (number of stars).
   - Response: Updated `averageRating` and `totalRatings`.

---

## Testing

### Approach

1. **Unit and Integration Tests:**
   - Directly test component behavior.
2. **End-to-End Tests:**
   - Cover the entire application flow (app → widget → modal).
3. **Accessibility Testing:**
   - Semantic text, ARIA attributes, and roles for screen readers.
4. **Cross-Browser Testing:**
   - Ensure compatibility across browsers.

---

## Accessibility

### Key Features

1. **Semantic Text:** Improve clarity for screen readers.
2. **ARIA Attributes:** Enhance usability for assistive technologies.
3. **High Contrast Modes:** Improve readability for visually impaired users.
4. **Mobile-Friendly Design:** Ensure accessibility on all devices.
5. **Localization:** Support multiple languages and text directions.

---

## Optimization

### Techniques

1. **Caching:** Save common data for faster responses.
2. **Minification:** Reduce file size (HTML, CSS, JavaScript, images).
3. **Optimistic Updates:** Improve responsiveness with immediate UI changes.
4. **WebP Format:** Use optimized image formats or HTML emojis for star icons.
5. **Re-Rendering Prevention:** Use memoization techniques to avoid unnecessary re-renders.

---
