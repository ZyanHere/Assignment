```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <div class="grandparent">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </body>
</html>
```

<img src="./images_used/Event_Listeners-1.png">


```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

//Syntax of eventListeners: type, callback,
grandparent.addEventListener("click", (e) => {
  console.log(e)
})
```

<img src="./images_used/Event_Listeners-2.png">

---

#### Event Bubbling

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent 1")
})

parent.addEventListener("click", (e) => {
  console.log("Parent 1")
})

child.addEventListener("click", (e) => {
  console.log("Child 1")
})
```

- Now if you click on the grandparent(red box), it will print <strong>Grandparent 1</strong>
- When you click on the parent(blue box), it will print <strong>Parent 1 and Grandparent 1</strong>
- When you click on the child(green box), it will print <strong>Child 1, Parent 1 and Grandparent 1</strong>

- ##### This process of going from the closest element to farthest away from the element is something called Event Bubbling

---

#### Event Capturing

- This can be achieved by adding options parameter called {capture: true}

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener(
  "click",
  (e) => {
    console.log("Grandparent 1")
  },
  { capture: true }
)

parent.addEventListener("click", (e) => {
  console.log("Parent 1")
})

child.addEventListener("click", (e) => {
  console.log("Child 1")
})
```

- If you click on the child box (green) then it would print
  <strong>Grandparent 1</strong>
  <strong>Child 1</strong>
  <strong>Parent 1</strong>
  <strong>Document 1</strong>

<strong>Reason:</strong>

- Our Grandparent 1 is in the capture phase (we setup the capture event), so this prints outs first

- Then we do capture for our parent (there is no capture event) so it skip printing

- Then it do the capture for our child and again there is no capture event so it would skip printing

- Then it does the Event Bubbling, and it starts printing the Child 1
- Then it does the bubble for Parent and it prints out the Parent 1
- Then it does the bubble for grandParent (as there is already the capture phase ) so it skips the bubbling
- Then it does the bubble for the document and prints the Document 1

---

#### Another Example

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener(
  "click",
  (e) => {
    console.log("Grandparent Capture")
  },
  { capture: true }
)

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble")
})

parent.addEventListener(
  "click",
  (e) => {
    console.log("Parent Capture")
  },
  { capture: true }
)

parent.addEventListener("click", (e) => {
  console.log("Parent Bubble")
})

child.addEventListener(
  "click",
  (e) => {
    console.log("Child Capture")
  },
  { capture: true }
)

child.addEventListener("click", (e) => {
  console.log("Child Bubble")
})

document.addEventListener(
  "click",
  (e) => {
    console.log("Document Capture")
  },
  { capture: true }
)

document.addEventListener("click", (e) => {
  console.log("Document Bubble")
})
```

<details>

<summary> Order of Execution </summary>

```js
Document Capture
Grandparent Capture
Parent Capture
Child Capture
Child Bubble
Parent Bubble
Grandparent Bubble
Document Bubble
```

</details>

---

#### Example 2 (Suppose if we want to stop propagation after Parent)

- In this case, we need to add e.stopPropagation(), so that it would stop the entire (Capturing and Bubble phases)

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener(
  "click",
  (e) => {
    console.log("Grandparent Capture")
  },
  { capture: true }
)

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble")
})

parent.addEventListener(
  "click",
  (e) => {
    e.stopPropagation() // Added this line
    console.log("Parent Capture")
  },
  { capture: true }
)

parent.addEventListener("click", (e) => {
  console.log("Parent Bubble")
})

child.addEventListener(
  "click",
  (e) => {
    console.log("Child Capture")
  },
  { capture: true }
)

child.addEventListener("click", (e) => {
  console.log("Child Bubble")
})

document.addEventListener(
  "click",
  (e) => {
    console.log("Document Capture")
  },
  { capture: true }
)

document.addEventListener("click", (e) => {
  console.log("Document Bubble")
})
```

<details>

<summary> Order of Execution </summary>

```js
Document Capture
Grandparent Capture
Parent Capture
```

</details>

---

#### Example-3 (Run event only once)

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble")
})

parent.addEventListener(
  "click",
  (e) => {
    console.log("Parent Bubble")
  },
  { once: true }
)

child.addEventListener("click", (e) => {
  console.log("Child Bubble")
})
```

<details>

<summary> Order of Execution for the  <strong>first</strong> time click on green box </summary>

```js
Child Bubble
Parent Bubble
Grandparent Bubble
```

</details>

<details>

<summary> Order of Execution for the <strong>second</strong> time click on green box </summary>

```js
Child Bubble
Grandparent Bubble
```

<strong>Reason: </strong> Because Parent was selected to run only one time

</details>

---

#### Example-4 (Stop running events after a specific time)

- Use removeEventListener
- Always use separate function

```js
const grandparent = document.querySelector(".grandparent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")

grandparent.addEventListener("click", (e) => {
  console.log("Grandparent Bubble")
})

parent.addEventListener("click", printHi)

setTimeout(() => {
  parent.removeEventListener("click", printHi)
}, 2000)

child.addEventListener("click", (e) => {
  console.log("Child Bubble")
})

function printHi() {
  console.log("Hi")
}
```

<details>

<summary> Order of Execution for the  <strong>first</strong> time click on green box </summary>

```js
Child Bubble
Hi
Grandparent Bubble
```

</details>

<details>

<summary> Order of Execution for the <strong>second</strong> time click on green box (after waiting for 2 seconds)</summary>

```js
Child Bubble
Grandparent Bubble
```

<strong>Reason: </strong> Because Parent was selected to run only one time

</details>

---

#### Event Delegation

```js
const divs = document.querySelectorAll(".div")

addGlobalEventListener("click", "div", (e) => {
  console.log("hi")
})

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e)
    }
  })
}

// Event Delegation works for following code because we are using document.addEventListener in the function

const newDiv = document.createElement("div")
newDiv.style.width = "200px"
newDiv.style.height = "200px"
newDiv.style.backgroundColor = "purple"
document.body.append(newDiv)
```

---
