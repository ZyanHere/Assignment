#### What is semantic markup in web design?

- Semantic markup is a method of writing and formatting the HTML (Hypertext Markup Language) <strong>to emphasize the semantic meaning, or purpose of the content</strong>, as opposed to its appearance.

- Semantics and accessibility are part of HTML by architecture but are not useful unless properly implemented. “Semantic markup-ing” means <strong>understanding the hierarchy of your web page’s content and how it will be read by both users and machines</strong>.

```js
when you write a heading,
mark it with a heading tag (<h1>, <h2>, etc.),

when you write a paragraph
mark it with a paragraph tag (<p>).
```

```js
Semantic markup means that HTML tags are never selected based on how they appear
in a web browser, they are selected based on the content’s importance and structure.
```

```js
// While HTML has included semantic markup from the beginning, HTML5 brought even more semantic tags such as

<section>, <article>, <footer>, <nav>, and <aside>.
```

```js
Developers can use semantic markup not only to be clearer about the overall content of their web page,
but also to write it in a manner that computers can comprehend.
```

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/42731246/209484742-18b57797-27fb-42d6-989a-41fe5ac3034a.png">

---

#### Why is it important?

##### SEO

- Understanding and using semantic markup helps ensure that <strong>we hit our target market with relevant content</strong>.
- Search engines assess the value of keywords <strong>by placing them in the HTML hierarchy</strong>.

```js
For example, keywords enclosed in an <h1> tag are given more importance than those enclosed in a <p> tag.
```

```js
Through putting the most important keywords higher in the list, we are telling search engines what our
website is about and why people interested in those particular keywords should be looking at our content.
```

---

##### Accessibility

- Since semantic HTML uses elements <strong>for a defined intent, reading and interpreting</strong> it becomes better for both humans and computers.

- Making applications accessible provides equal access <strong>for people with disabilities while also helping people without disabilities</strong> by empowering them to customize and tailor their experiences.

```js
Having a consistent hierarchy for the website allows other resources and software to deliver the content correctly.
```

---

##### Maintenance

- Semantic markup means simplified coding. Clear coding is easy to manage. This also ensures that <strong>any developer may come along and work on the code without ambiguity</strong> because the code is clearly ordered.

- Another time-saving advantage of writing semantic HTML is that <strong> the web page’s presentation is easier to modify and edit</strong>.

- Since the content is completely separated from the presentation, <strong> without altering the data, you can change the styles or apply styles to multiple data types</strong>.

---

##### Summary

- Choosing the right HTML isn’t just an intellectual exercise, and it’s always worth exploring <strong>whether there’s an HTML feature you might use to represent parts of your content and add meaning to it</strong> .

```js
When designing components that concern banners and logos, for example, consider wrapping them in
<header> rather than <div>.

If your styling relies upon class names, <header class= ”header”> will work just as well as
<div class= ”header”>.
```

- Semantic HTML can offer other users accessibility advantages, allow your work to be future proof, theoretically improve your search engine rankings, and allow people with disabilities to access your content on the web.
