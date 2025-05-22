# Front-End System Design - Uber

[Watch on Youtube](https://www.youtube.com/watch?v=ijAoqaNYO0c)

---

### Introduction

- Topic: Front-end system design for Uber or taxi services.

---

## Functional Requirements

### Key Features

1. **Map View:**
   - App fetches and displays taxis in a specific area.
   - Includes map type, address, and taxi details.
2. **Request Ride:**
   - Tap a button to request a ride.
   - Drivers are notified and decide whether to accept.
3. **Driver Response:**
   - Drivers can accept or decline rides.
   - Users wait for a driver's response.
4. **Manage Payments:**
   - Users choose payment methods (e.g., cash, card, Apple Pay).
5. **Driver Details:**
   - Displays driver's name, photo, car type, and estimated time of arrival (ETA).
6. **Driver-User Communication:**
   - In-app messaging or calling between driver and user.
7. **Real-Time Ride Progress:**
   - Displays the user’s real-time location and route on the map.
8. **Trip History and Settings:**
   - Users can view past rides and update settings (e.g., payment methods).
9. **Cancel Trip:**
   - Users can cancel a trip before it ends.
10. **Support Chat:**
    - In-app chat for customer service.
11. **Favorites:**
    - Save frequently visited locations.
12. **Scheduled Rides:**
    - Book rides up to 24 hours in advance.

---

## Non-Functional Requirements

### Key Features

1. **Performance:**
   - Map should load and update quickly.
2. **Mobile Responsiveness:**
   - App should work seamlessly on different devices.
3. **Error Handling and Feedback:**
   - Notify users of errors (e.g., lost internet connection).
4. **Accessibility:**
   - Usable by people with disabilities.
5. **Multi-language Support:**
   - App should support different languages.

---

## Assumptions

### Context

1. Users are already logged in.
2. Guided tours or tutorials (onboarding) are implemented.
3. Integration with third-party map providers (e.g., Google Maps).
4. Routes are shown using external services like Google Maps Directions API.
5. Language preferences are set in the header of requests.

---

## User Interface (UI)

### Map Elements

- **Taxis Location:**
  - Displays taxis in the vicinity.
- **User Location:**
  - Indicates the user's position.
- **Zoom Level:**
  - Map renders based on the zoom level.
- **Bounding Box:**
  - Limits map data to relevant areas.

---

## API Design

### Key Communication Methods

1. **REST API:**
   - For request-response operations.
2. **Server-Sent Events:**
   - One-way communication from server to client.
3. **WebSockets:**
   - Bi-directional, real-time communication.

### Endpoints

1. **Real-Time Taxi Locations:**
   - Endpoint: `server-events/cars`
   - Fetches taxi locations using bounding box and zoom level.
2. **Ride Status Updates:**
   - Endpoint: `server-events/request-updates`
   - Provides updates on ride requests (status, driver ID, ETA).
3. **Real-Time Ride Tracking:**
   - Endpoint: `server-events/ride-tracking`
   - Provides continuous updates on ride location and zoom level.

### WebSocket

- **Driver-User Communication:**
  - Endpoint: `websockets/user-chat/{rideID}`
  - Facilitates messaging between driver and user.

### REST Endpoints

1. **Request Ride:**
   - Endpoint: `api/ride/request`
   - Inputs: Pickup location, destination, ride type, payment type.
   - Response: Ride ID.
2. **Cancel Ride:**
   - Endpoint: `api/ride/cancel/{rideID}`
   - Response: Status and message.
3. **Complete Ride:**
   - Endpoint: `api/ride/complete/{rideID}`
   - Response: Amount, currency, status.
4. **Fetch Past Trips:**
   - Endpoint: `api/rides/{userID}`
   - Response: List of past trips.
5. **Save/Get Favorites:**
   - Endpoint: `api/favorites/{userID}`
   - Response: Array of favorite locations.
6. **Schedule Ride:**
   - Endpoint: `api/ride/schedule`
   - Inputs: Pickup location, destination, time.

---

## Optimization

### Performance Improvements

1. **Map Tile Optimization:**
   - Use vector tiles for better zooming and performance.
2. **Caching:**
   - Cache map tiles for frequently visited areas.
3. **Adjust Map Quality:**
   - Serve lower resolution tiles for poor network connections.
4. **Reduce Features:**
   - Simplify map data in areas with low connectivity.
5. **Prefetching:**
   - Load map data ahead of user navigation.
6. **Icon Clustering:**
   - Group icons as the user zooms out to reduce visual clutter.
7. **Progressive Web App (PWA):**
   - Provide offline functionality and faster load times.

---

## Accessibility

### Key Features

1. **Screen Reader Compatibility:**
   - Ensure all elements are readable by screen readers.
2. **Contrast:**
   - Sufficient contrast for text and backgrounds.
   - Include dark, light, and high-contrast themes.
3. **Touchable Areas:**
   - Increase touchable area for buttons and interactive elements.
4. **Voice Commands:**
   - Enable navigation using voice commands.
5. **Font Size Adjustability:**
   - Allow users to customize font sizes.
6. **Minimize Flashing Elements:**
   - Avoid rapidly flashing elements to prevent issues for photosensitive users.
7. **Feedback Mechanisms:**
   - Provide haptic or audio feedback for actions.
8. **Multiple Navigation Methods:**
   - Enable navigation using swipes, buttons, or voice.
9. **Error-Friendly Forms:**
   - Clear labels and error messages for form inputs.
10. **Magnification Support:**
    - Ensure UI elements remain functional when magnified.

---

## Error Handling

### Key Types of Errors

1. **Validation Errors:**
   - Issues with input (e.g., invalid email or password).
2. **Network Errors:**
   - Poor internet connection or server unavailability.
3. **Server Errors:**
   - Issues with processing requests on the server.
4. **Client-Side Errors:**
   - Browser or device-related issues.

### Feedback

1. **User Feedback:**
   - Messages to inform users about errors and guide resolutions.
2. **Developer Feedback:**
   - Logs for troubleshooting.

---

## Push Notifications

### Use Cases

1. Ride status updates (e.g., driver en route).
2. Chat messages between driver and user.
3. Ride completion notification.
4. Driver updates (e.g., new ETA).

### Features

- **Prompt Permissions:**
  - Ask users for notification permissions.
- **Badge Notifications:**
  - Visual indicators for unread notifications.

---

## Security

### Best Practices

1. **Sanitize Inputs:**
   - Prevent malicious scripts from being injected.
2. **HTTPS:**
   - Encrypt data in transit.
3. **Minimize Third-Party Libraries:**
   - Use well-maintained libraries and keep them updated.
4. **Content Security Policy (CSP):**
   - Prevent cross-site scripting attacks.
5. **Strict Transport Security (STS):**
   - Ensure only secure content is delivered.
6. **CORS Headers:**
   - Restrict unauthorized requests.
7. **Session Management:**
   - Implement expiration and re-authentication mechanisms.
8. **Anti-CSRF Tokens:**
   - Prevent cross-site request forgery.
9. **JWT Handling:**
   - Use HTTP-only cookies for storing tokens securely.
10. **Fraud Detection:**
    - Identify and prevent dishonest activities.

---
