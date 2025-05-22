### Event Pooling in React

- Event pooling is an **optimization strategy used by React <ins>to reduce memory overhead**</ins>. Here's how it works:
- **Object Reuse**: 
  - <ins>***Instead of creating a new event object for each event***</ins>, <ins>*React reuses objects from a pool of SyntheticEvent objects*</ins>. 
  - After an event handler has been called, <u>***the event object is "nullified" and returned to the pool, ready to be used for the next event***</u>. 
  - This process significantly reduces the number of garbage collections and improves performance, especially in high-load or high-interaction applications.
<br/>

- **Accessing Event Properties**: 
  - Because of this pooling and reuse, ***if you want to access an event's properties in an asynchronous way*** (e.g., in a callback or a promise resolution), <ins>***you need to call event.persist() to remove the event from the pool***</ins> and allow your code to retain a reference to the event. 
  - <ins>Without calling event.persist(), **properties of the event object may be nullified or incorrect when accessed asynchronously**, since the object could have been reused for another event.</ins>
<br/>
