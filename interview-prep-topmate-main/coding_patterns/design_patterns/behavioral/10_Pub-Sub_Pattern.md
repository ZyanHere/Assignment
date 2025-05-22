# Pub-Sub Pattern

The Publish-Subscribe (Pub-Sub) Pattern is a messaging design pattern (is a **`behavioral`** design pattern)
- that decouples the sender (publisher) from the receiver (subscriber) of a message. 
- In this pattern, **`publishers` <ins>broadcast messages</ins> to a central event channel**, 
- while **`subscribers` <ins>listen to specific events**</ins> they are interested in. 
> Publishers don’t know who the subscribers are, and subscribers don’t need to know the source of the messages, enabling loose coupling between components.

### **Pub-Sub Pattern Overview**

-	**Purpose**: To enable a many-to-many relationship between components, where multiple subscribers can listen to multiple publishers’ events.
-	**Decoupling**: Publishers and subscribers are unaware of each other, only interacting through an event manager or channel.
> **Real-World Example**: News websites, where users can subscribe to different news categories, like sports or politics. Articles (publishers) are published to specific categories, and all users subscribed to that category receive the update.


**Explanation**:

-	**EventChannel (Pub-Sub Manager)**: Manages the event subscriptions and broadcasts. It maintains a registry of events and listeners, allowing subscribers to register or unsubscribe from specific events.
-	**sportsNewsListener** and **techNewsListener** (Subscribers): These functions subscribe to different topics and receive messages whenever the corresponding event is published.

```js
// Traditional way

// EventChannel as the Pub-Sub Manager
function EventChannel() {
  this.events = {}; // Store events and their subscribers
}

// Subscribe method for subscribers to register with events
EventChannel.prototype.subscribe = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = []; // Initialize event array if it doesn't exist
  }
  this.events[event].push(listener); // Add the listener to the event
};

// Publish method for publishers to broadcast events
EventChannel.prototype.publish = function(event, data) {
  if (!this.events[event] || this.events[event].length === 0) return; // Exit if no subscribers
  this.events[event].forEach(listener => listener(data)); // Notify all subscribers
};

// Unsubscribe method to remove a listener from an event
EventChannel.prototype.unsubscribe = function(event, listenerToRemove) {
  if (!this.events[event]) return; // Exit if event doesn't exist
  this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
};

// Usage example
const newsChannel = new EventChannel();

function sportsNewsListener(news) {
  console.log(`Sports News: ${news}`);
}

function techNewsListener(news) {
  console.log(`Tech News: ${news}`);
}

// Subscribers register to events
newsChannel.subscribe("sports", sportsNewsListener);
newsChannel.subscribe("tech", techNewsListener);

// Publish news events
newsChannel.publish("sports", "Football World Cup starts next week!");
// Output: Sports News: Football World Cup starts next week!

newsChannel.publish("tech", "New smartphone released today!");
// Output: Tech News: New smartphone released today!

// Unsubscribe from sports news
newsChannel.unsubscribe("sports", sportsNewsListener);
newsChannel.publish("sports", "Basketball season postponed."); // No output, as there are no subscribers for "sports" event
```

---


### **Explanation**:

-	**EventChannel (Pub-Sub Manager)**: Manages subscriptions and publishes events. It provides methods for subscribers to register, unregister, and receive updates.
-	**sportsNewsListener** and **techNewsListener** (Subscribers): These functions receive and display news updates based on the subscribed topic.


```js
// ES6 implementation

// EventChannel class as the Pub-Sub Manager
class EventChannel {
  constructor() {
    this.events = {}; // Initialize an empty object to store events and listeners
  }

  // Subscribe method for listeners to register with events
  subscribe(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []; // Initialize event array if it doesn't exist
    }
    this.events[event].push(listener); // Add the listener to the event
  }

  // Publish method for broadcasting events to subscribers
  publish(event, data) {
    if (!this.events[event] || this.events[event].length === 0) return; // Exit if no subscribers
    this.events[event].forEach(listener => listener(data)); // Notify all subscribers
  }

  // Unsubscribe method to remove a listener from an event
  unsubscribe(event, listenerToRemove) {
    if (!this.events[event]) return; // Exit if event doesn't exist
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }
}

// Usage example
const newsChannel = new EventChannel();

const sportsNewsListener = (news) => console.log(`Sports News: ${news}`);
const techNewsListener = (news) => console.log(`Tech News: ${news}`);

// Subscribers register to events
newsChannel.subscribe("sports", sportsNewsListener);
newsChannel.subscribe("tech", techNewsListener);

// Publish news events
newsChannel.publish("sports", "Football World Cup starts next week!");
// Output: Sports News: Football World Cup starts next week!

newsChannel.publish("tech", "New smartphone released today!");
// Output: Tech News: New smartphone released today!

// Unsubscribe from sports news
newsChannel.unsubscribe("sports", sportsNewsListener);
newsChannel.publish("sports", "Basketball season postponed."); // No output, as there are no subscribers for "sports" event
```

----

### Real-World Scenarios for the Pub-Sub Pattern

#### 1.	Event Notifications in UI Components:
-	A UI application may have multiple components that need to react to specific events (e.g., button clicks, form submissions, network responses).
-	The Pub-Sub pattern allows components to subscribe to these events independently, updating themselves when the event is published without tightly coupling to each other.
#### 2.	Logging and Monitoring Systems:
-	In a logging system, various events (e.g., errors, warnings, informational messages) can be published, and different subscribers (e.g., logging to a console, saving to a file, sending alerts) can handle these events.
-	Each subscriber can listen to specific types of log events, and the publisher does not need to know the details of each subscriber.
#### 3.	Chat Applications:
-	In a chat app, users may subscribe to channels or chat rooms. When a user posts a message in a room, only the subscribers of that room receive it.
-	The Pub-Sub pattern enables this communication, where each room is an event, and each user listening to it is a subscriber.

### Edge Cases in the Pub-Sub Pattern

#### 1.	No Subscribers for an Event:
-	If an event is published without any subscribers, there may be no actions or listeners to handle the message, resulting in a “silent” message.
-	To handle this, consider adding a check to log or display a message if no subscribers are found for an event.
#### 2.	Subscriber Memory Leaks:
-	If subscribers aren’t removed from the event channel (especially in web applications), it can lead to memory leaks.
-	Implement a method to ensure subscribers are removed when they no longer need to listen (e.g., when a component is unmounted in a web app).
#### 3.	Large Number of Events or Listeners:
-	In cases where there are many events or subscribers, performance can be impacted as each event broadcasts to all registered listeners.
-	To optimize this, consider using throttling or debouncing strategies for frequently triggered events, or categorize events to limit the number of listeners per event.

----