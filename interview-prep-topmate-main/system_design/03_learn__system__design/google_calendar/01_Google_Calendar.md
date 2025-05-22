# [Front-End System Design] - Google Calendar

[Watch on Youtube](https://www.youtube.com/watch?v=leo1FZ6vu1I)

---

### **Introduction**

- **Topic**: Designing Google Calendar.

---

### **High-Level Overview**

- **Google Calendar Features**:
  - Create and schedule events.
  - Invite users to events.
  - Multiple views:
    - Year
    - Month
    - Day
  - Example:
    - Created an event for Friday, July 1st: _"Record the video."_
  - Navigate between views to see events at different granularities.

---

### **General Requirements**

1. **Support Different Views**:
   - Year, Month, and Day views.
2. **Multi-User Support**:
   - Create events for others.
   - Invite users.
3. **Live Updates**:
   - Real-time online calendar.
4. **Event View**:
   - Open event details.
5. **Conflict Detection**:
   - Spot conflicting events (e.g., overlapping time slots).
6. **Export/Import Events**:
   - Offline use.
7. **Push Notifications**:
   - Reminders for desktop, mobile, etc.

---

### **Functional Requirements**

1. **Mobile-First Design**:
   - Optimized for on-the-go usage.
2. **Offline Support**:
   - Functionality when not connected to the internet.
3. **Efficient Data Model**:
   - Minimize unnecessary server calls.
4. **Native Capabilities**:
   - Trigger native alarms or notifications from the web.
5. **Seamless Animations**:
   - Smooth transitions between views (year/month/day).
6. **Accessibility**:
   - Keyboard navigation and other enhancements for inclusivity.

---

### **Action Plan**

1. **Layout Overview**:
   - Year, Month, and Day views.
   - Component structure and data flow.
2. **Data Model & API Design**:
   - Efficient, universal data representation.
3. **Data Transfer**:
   - Protocol for fetching and syncing data.
4. **Rendering Optimization**:
   - Ensure smooth user interactions.
5. **Accessibility**:
   - Semantic HTML, ARIA roles, and other techniques.
6. **Notifications**:
   - Push reminders and alerts.
7. **Mobile Optimization**:
   - Integration with native device capabilities.

---

### **Layout Design**

#### **Views**

1. **Year View**:
   - Displays 12 months as grids with dates.
   - Clicking a date shows event details.
2. **Month View**:
   - Similar to Year View but larger and more detailed.
   - Clicking a date opens event details.
3. **Day View**:
   - List of events scheduled for a single day.

---

### **Component Architecture**

1. **App Root**:
   - Parent component.
2. **Calendar Controls**:
   - Manage event creation, search, themes, and language settings.
3. **Calendar View**:
   - Three main implementations:
     - **Year View**: Displays months.
     - **Month View**: Displays days.
     - **Day View**: Displays event details.
4. **Shared Components**:
   - **Cells**:
     - Year View → Month Cells.
     - Month View → Day Cells.
     - Day View → Event Cells.
   - **Event View**:
     - Generic component for displaying event details.

---

### **Data Model**

#### **Requirements**

1. **Universal Entities**:
   - Avoid duplicate definitions across views.
2. **Serialization/Deserialization**:
   - Enable export and import of calendar data (JSON-friendly).
3. **Efficient Mutations**:
   - Avoid overwriting the entire store when modifying data.
4. **Ease of Access**:
   - Minimal processing to retrieve or modify event data.
5. **Server-Client Alignment**:
   - Similar data structures for easy transformations.
6. **Conflict Detection**:
   - Detect and handle overlapping events.

#### **Structure**

- **Global Store**:

  - **Events Map**:
    - Key: Event ID
    - Value: Event object
  - **Client State**:
    - View type: Year, Month, or Day.
    - Configuration: Language, timezone, etc.

- **Event Object**:
  - `id`: Unique identifier.
  - `participants`: List of users (email, name, etc.).
  - `startTimestamp` and `endTimestamp`: Time range.
  - `title`: Event title.
  - `description`: Rich text format.
  - `conflictingEvents`: Linked list of conflicting event IDs.

---

### **Conflict Detection with Interval Tree**

#### **Challenges**

- Events spanning multiple dates may overlap:
  - Example:
    - Event 1: June 11, 2022 – July 11, 2022
    - Event 2: June 25, 2022 – July 11, 2022
  - Detect conflicts on June 30, 2022.

#### **Interval Tree**

1. **Binary Search Tree for Intervals**:
   - Nodes store start and end timestamps.
   - Each node keeps track of its **maximum end time**.
2. **Operations**:
   - Efficient insertion, deletion, and search (`O(log n)`).
3. **Conflict Detection**:
   - Traverse nodes to find overlapping intervals.

#### **Example Construction**:

1. Insert intervals into the tree based on start date.
2. For each node, compute the maximum end time of its subtree.
3. Search for conflicts:
   - Compare target date with node's maximum end time.
   - Traverse left or right branches as needed.

#### **Advantages**:

- Faster than linear search (`O(n)` for conflicts).
- Avoids data duplication.

---

### **API Design**

#### **Protocol Options**

1. **Long Polling**:
   - Periodic server requests with timeouts.
   - High latency but suitable for calendars.
2. **WebSockets**:
   - Real-time, bidirectional communication.
   - Overkill for calendar use cases.
3. **Server-Sent Events (SSE)**:
   - Lightweight, text-based updates over HTTP/2.
   - Energy-efficient for mobile devices.

#### **GraphQL Integration**

- **Methods**:
  1. `subscribeEvent`: Receive updates for a given time range.
  2. `getEventInfo`: Fetch event details on demand.
  3. `createEvent`, `updateEvent`, `deleteEvent`: Manage events.
- **Advantages**:
  - Flexibility: Fetch only required data.
  - Single endpoint for all operations.

---

### **Rendering Optimization**

1. **Pre-Rendering**:
   - Render adjacent views (previous/next year/month).
   - Use CSS transforms for smooth transitions.
2. **Soft Writes**:
   - Update only changed fields instead of replacing entire nodes.

---

### **Accessibility**

1. **Responsive Design**:
   - Avoid pixel-based units; use `rem` for scalability.
2. **Keyboard Navigation**:
   - Shortcuts for switching periods and searching events.
3. **Color Schemes**:
   - Support for users with color blindness.
4. **Semantic Markup**:
   - Use ARIA roles (e.g., `role="grid"`).

---

### **Conclusion**

- **Summary**:
  - Designed Google Calendar focusing on:
    - Layout and architecture.
    - Efficient data model and conflict detection.
    - Optimized rendering and accessibility.

---
