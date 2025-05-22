```js
<html>
  <head>
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-1.12.0.js"
    ></script>
  </head>
  <body>
    <header>
      <hgroup>
        <h1>Learning Web Development</h1>
        <h2>
          A site dedicated to learning how to develop applications for the web.
        </h2>
      </hgroup>
      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About This Site</a>
          </li>
          <li>
            <a href="">Contact Information</a>
          </li>
        </ul>
      </nav>
    </header>
    <article>
      <hgroup>
        <h1>Using Semantic HTML Elements</h1>
        <h2>
          A complete guide on indicating meaning for your web page's content
        </h2>
        <h3>
          <time datetime="2019-06-10">June 10, 2019</time>
        </h3>
      </hgroup>

      <section>
        <h4>
          <code>header</code>
        </h4>
        <p>
          Use header elements for content that is consistent across your web
          page.
        </p>
        <p>Headers may also contain your site's navigation components.</p>
      </section>

      <section>
        <h4>
          <code>footer</code>
        </h4>
        <p>
          Use footer elements to store "footer" content, like author/copyright
          info.
        </p>
      </section>

      <section>
        <h4>
          <code>nav</code>
        </h4>
        <p>
          Use nav elements to store elements associated with site navigation.
        </p>
        <p>
          Navigational <code>anchor</code> tags are often wrapped in an
          unordered list element.
        </p>
      </section>
    </article>
    <footer>
      <p>&copy; Educative.io 2020</p>
    </footer>
  </body>
</html>
```

#### Helpful Info:

```js
The following information on semantic tags may prove useful for this purpose:

<article> This element defines an independent, self-contained content like a blog
entry, a newspaper article, a forum post, a CV, an author biography, a story, etc. –
anything that you think of as an article.

<aside> This element defines content that is separate from the other (surrounding)
content of the page, aside from the content it is placed in. It is frequently used
to create sidebars related to an article.

<figure> This element represents a figure that is a self-contained content, such as
an illustration, diagram, photo, etc. The <figure> element is a wrapper for this
content, including the <img> for the figure, as well as the caption nested into a
<figcaption> element. The aim is to indicate the relation between the image and its
associated caption.

<figcaption> This element defines a caption for the <figure> element.

<footer> This element defines a footer for a document or section, so this element
should contain information about its container element. It can be a set of important
links, a copyright notice, terms of use, contact information, etc.

<header> This element represents an enhanced heading for a document or a section. It
should be a container for introductory content, and it may contain logo, byline, set
of navigational links, etc.

<hgroup> This element defines an enhanced heading that groups two or more heading
elements without any additional content. Its purpose is to make a title and a
subtitle (or subtitles) stand together.

<nav> This element defines a major block of links on a page. These links may point
to topics on the current page, or to other pages on the website. Not all links of a
document must be in a <nav> element. A page may have multiple <nav> sections.

<section> This element defines logical sections in a document. These sections can be
headers, footers, chapters, sections of chapters, etc. Use <section> only if other
semantic elements do not apply. As a rule of thumb, the content <section> holds
always should begin with a heading (<h1>, ..., <h6>).

```
