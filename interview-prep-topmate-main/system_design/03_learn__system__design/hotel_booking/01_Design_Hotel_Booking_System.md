# Design a Hotel Booking System

[Watch on YouTube](https://www.youtube.com/watch?v=q2wV1UkQ5aU)

---


## Topics:
  1. Functional and non-functional requirements.
  2. Overall system design and data flow.
  3. APIs for hotel onboarding, search, and booking services.
  4. Data schema.
  5. Tips for frontend optimizations.
- We'll also cover:
  - Avoiding overbooking.
  - Holding reservations temporarily.

---

### **Functional Requirements**

#### **Hotel Owners' Perspective:**
- Onboard hotels onto the platform.
- Add new hotels.
- Update inventory, descriptions, pricing, and images.
- Manage bookings:
  - View bookings for each hotel.
  - Track revenue numbers.

#### **Users' Perspective:**
- Search for hotels:
  - By location.
  - For specific dates and number of people.
- Filter hotels by:
  - Rating (e.g., 5-star, 4-star).
  - Price range.
  - Tags (e.g., hotels higher than 4.5 stars).
- Book hotels.
- Check booking status and receive notifications.
- Update or cancel bookings.

#### **System Operability:**
- Room for **analytics**:
  - Define key metrics for each sub-service.

---

### **Non-Functional Requirements**

- **Low latency** platform.
- **High availability**.
- Features:
  - Avoid overbooking.
  - Hold reservations for a specified time.

---

### **Overall System Design**

#### **Subservices:**
1. **Hotel Onboarding Service:**
   - Handles onboarding, room updates, and revenue tracking.
2. **Search Service:**
   - Routes search requests and matches hotels based on criteria.
3. **Booking Service:**
   - Manages booking requests.
4. **Booking Management Service:**
   - Read-heavy service that shows bookings for users and hotels.

#### **Microservice Architecture:**
- Each service:
  - Has its own database.
  - Is decoupled from others.
- Message queue ensures:
  - Data synchronization.
  - Scalability.
  - Better CICD capability.
  - Service-specific tech stack.

#### **Database Choices:**
- **Hotel Onboarding Service:**
  - Relational DB (e.g., MySQL cluster) with high availability.
  - Images stored via **CDN** for faster access.
- **Search Service:**
  - Uses **Elasticsearch** for fuzzy search (handles typos in search queries).
  - Synced with MySQL DB using a message queue.
- **Booking Service:**
  - Separate MySQL DB cluster.
  - Integrates with payment services (in-house or third-party).

---

### **Handling Bookings**

- Feature: Hold rooms for 15 minutes before payment.
- Active bookings:
  - Stored in MySQL.
  - Terminal bookings (paid/canceled): Moved to NoSQL (e.g., DynamoDB, Cassandra).
- Data sync via message queue:
  - Search results updated to hide booked rooms.
- Read optimization:
  - Add **Redis** as a write-through cache.

---

### **Booking Management Service**

- Handles read requests for:
  - Active bookings (MySQL).
  - Archived bookings (NoSQL).
- Redis improves read speeds:
  - Syncs with MySQL for active bookings.

#### **Message Queue:**
- Options:
  - Kafka or cloud-based (e.g., AWS SQS).
  - Use **dead-letter queue** for failed deliveries.

---

### **Notifications and Analytics**

- Notifications for:
  - Consumers and hotels on booking status changes.
  - Use **AWS SNS** with SQS for scalability.
- Analytics setup:
  - Data pipeline from message queue to Elastic and Kibana.
  - Alternatives: CloudWatch (familiar setup).

---

### **Conclusion**

- This video covers:
  - Overall system design.
  - Data flow.
- Future content:
  - Detailed APIs for each service.
  - Data schema.
  - Frontend optimizations.
  - Avoiding overbooking and holding reservations.
