- Let's creat a plain object that stores ages of some students

```js
let ages = {
  Boris: 28,
  John: 29,
};
```

```js
console.log(ages.Boris); // 28

console.log("John" in ages); // true
console.log("toString" in ages); // true
```

<strong> As you have noticed that "toString" returns true, it is because of the prototypical inheritance. Object first checks for the property name and then if it is not found it checks in the prototype object </strong>

- This is one of the reason to avoid using plain objects.

---

<strong><u>Map class in Javascript</u></strong>:

- Js has an in-built Map class.

```js
//This will create an instance of Map
let ages = new Map();
```

```js
//set the value
ages.set("Boris", 28);
ages.set("John", 29);
```

```js
//get the value
ages.get("Boris"); //28
ages.get("John"); //29
```

```js
//has method

ages.has("toString"); //false
```

<u><strong>Conclusion:</strong></u>
If you choose Plain Object over Map class then make sure to use <u>Object.hasOwnProperty("key")</u> property of the Object

<strong>MDN Blog for Map: </strong> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
