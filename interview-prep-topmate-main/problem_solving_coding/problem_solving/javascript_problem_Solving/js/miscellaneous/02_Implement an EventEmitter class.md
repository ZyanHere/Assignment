## Implement an EventEmitter class

<strong>Approach Taken:</strong>

1. this.events is an object inside constructor function
2. on, off receives eventName and callback as arguments and we check eventName is present or not in the this.events object ex: this.events[eventName]
3. for `on` method, if there is no eventName then create an array ex: this.events[eventName] = [] and push the callback (2nd arg) inside array
4. off is to filter inside, emit is to loop inside

```js
class EventEmitter {
  constructor() {
    // Object to manage events and callbacks
    this.events = {};
  }

  // Register an event with a callback
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // Trigger an event
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // Remove a specific callback for an event
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  // Remove all callbacks for an event
  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }
}

// Example usage:
const emitter = new EventEmitter();

// Define a couple of callback functions
function onDataReceived(data) {
  console.log('onDataReceived:', data);
}

function onAnotherDataReceived(data) {
  console.log('onAnotherDataReceived:', data);
}

// Register the callbacks for the 'data' event
emitter.on('data', onDataReceived);
emitter.on('data', onAnotherDataReceived);

// Emit the 'data' event
console.log('First emit:');
emitter.emit('data', { id: 1, message: 'Hello World' });
// Both onDataReceived and onAnotherDataReceived will be called

// Remove onDataReceived callback for the 'data' event
emitter.off('data', onDataReceived);

// Emit the 'data' event again
console.log('Second emit after removing onDataReceived:');
emitter.emit('data', { id: 2, message: 'Goodbye World' });
// Only onAnotherDataReceived will be called this time

/*
Output: If emitter.off line is `not commented`
First emit:
onDataReceived: { id: 1, message: 'Hello World' }
onAnotherDataReceived: { id: 1, message: 'Hello World' }  
Second emit after removing onDataReceived:
onAnotherDataReceived: { id: 2, message: 'Goodbye World' }
*/

/*
Output: If emitter.off line is `commented`
First emit:
onDataReceived: { id: 1, message: 'Hello World' }
onAnotherDataReceived: { id: 1, message: 'Hello World' }  
Second emit after removing onDataReceived:
onDataReceived: { id: 2, message: 'Goodbye World' }       
onAnotherDataReceived: { id: 2, message: 'Goodbye World' }
*/
```
