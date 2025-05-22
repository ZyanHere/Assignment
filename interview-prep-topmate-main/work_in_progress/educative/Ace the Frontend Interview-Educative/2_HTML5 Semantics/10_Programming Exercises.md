1.  ##### Write code to create a list of three books, of three different genres, with unique ids using custom data attributes. Specify the author’s name using custom data. Style the list according to the genre - every data item should have a different background color.

<details>
<summary><em>Click Here to see the solution</em></summary>

```js
// html
<html>
  <head></head>
  <body>
    <li data-genre="fiction" data-identifier="10618" data-author="JK Rowling">
      Harry Potter and the Goblet of Fire
    </li>
    <li data-genre="mystery" data-identifier="10718" data-author="Enid Blyton">
      The Mystery of the Pantomime Cat
    </li>
    <li data-genre="horror" data-identifier="10718" data-author="R. L. Stine ">
      Tales to Give You Goosebumps
    </li>
  </body>
</html>
```

```js
// CSS
li[data-genre='fiction'] {
  background: #8BC34A;
}

li[data-genre='mystery'] {
  background: #3F51B5;
}

li[data-genre='horror'] {
  background: tomato;
}
```

</details>

---

2. ##### Consider the following HTML

```js
<html>
  <head></head>
  <body>
    <ul id="vegetable-seeds">
      <li id="carrots" data-spacing="10cm" data-sowing-time="March_to_June">
        Carrots
      </li>
      <li id="celery" data-spacing="30cm" data-sowing-time="February_to_March">
        Celery
      </li>
      <li
        id="radishes"
        data-spacing="3cm"
        data-sowing-time="March_to_September"
      >
        Radishes
      </li>
    </ul>
  </body>
</html>
```

<strong>Your task is to change the sowing time for carrots from March_to_June to October_to_December. For this task, you can use getAttribute() and setAttribute() in JavaScript to get and set the value of different data attributes.</strong>

<details>
<summary><em>Click Here to see the solution</em></summary>

```js
// js
var seeds = document.getElementById("carrots")
var sowing_time = seeds.getAttribute("data-sowing-time")

seeds.setAttribute("data-sowing-time", "October_to_December")
```

</details>

---

3. ##### Consider the following HTML:

```js
<html>
  <head></head>
  <body>
    <ul id="restaurantId">
      <li
        data-type="veg"
        data-distance="2miles"
        data-identifier="10318"
        data-owner-name="Richard"
      >
        Techy's Cuisine
      </li>
    </ul>
  </body>
</html>
```

<strong>You are required to change the restaurant owner’s name from Richard to Mason, using JavaScript.</strong>

<strong>Note: This task requires you to make use of the <strong>dataset property for accessing data attributes.</strong> In the dataset property, the data keyword is removed from the data attribute’s name; hyphens get replaced by camel case. So, data-owner-name will be ownerName.</strong>

<details>
<summary><em>Click Here to see the solution</em></summary>

```js
// js
var owner = document.querySelector("li")
owner.dataset.ownerName = "Mason"
```

</details>
