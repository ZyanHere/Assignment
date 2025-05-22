##### Metadata stores information aboud the web page that is not not necessarily visible to the end-users. (Meta tags store information about the web page --- known as metadata that is not necessarily visible to end-users unless the page source code is revealed).

---

##### In the head tag part of the HTML markup we do place the metadata of a web page.

---

##### Which of the following choices is NOT a function of the robots meta tag ?

a) noindex
b) nofollow
c) norepeat
d) noarchive
e) index

##### Ans: c (norepeat)

```js
<!DOCTYPE html>
<html><head>
<meta name="robots" content="ABOVE_OPTIONS" />
(…)
</head>
<body>(…)</body>
</html>
```

##### The robots tag makes it possible to control how a single page should be indexed and served in the Google Search results or hidden to the search engine crawlers. This tag is placed in the head section of the webpage. It has no function by the name repeat

---

##### Which of the following metadata attributes is NOT supported in HTML5?

a) scheme
b) content
c) http-equiv
d) name

##### Ans: a (schme)

##### The scheme attribute is supported in HTML but not in HTML5. The rest of the attributes like content, http-equiv and name are supported in both HTML as well as HTML5. The scheme element is deprecated from HTML5

---

##### Which of the following prevents search engines from following links on a web page?

a) noarchive
b) nofollow
c) noindex
d) novalue

##### Ans: b (nofollow)

##### nofollow attribute instructs search engine that a hyperlink should not influence the link target's ranking in search engine.

##### noindex attribute prevents the page from being indexed.

##### To prevent a page from being cracked, noarchive attribute can be used. If you want to block search engines from following a link on your website, you can add the tag to your HTML code.

##### This is useful if you want to have links on your page to external sources. nofollow tags can be added in one of two places:

##### The head of the page (to nofollow all links on the page)

```js
<meta name="robots" content="nofollow" />
```

##### The link code (to nofollow an individual link)

```js
<a href="http://www.externalsite.com" rel="nofollow">
  External site
</a>
```

##### By doing this, your visitors will be able to use the link, but the search engines will not "follow" it.

---

##### The time interval in seconds before the browser performs a refresh action is represented by the value of the "content" attribute

- The information/value of the content is provided by http-equiv through HTTP header.
- Some values associated with http-equiv and name attributes are given by the content attribute
- A scheme to be used to interpret the value of the content is specified by the scheme tag.
- The name attribute specifies the name of the input element and thus provides information/value of it.

---

##### noarchive attribute prevents search engines from showing a cached link for a web page

---

##### Define the usage of the viewport meta tag in HTML5?

- HTML5 specified a way to let web developers take control over the viewport, through the meta tag
- The viewport is the area of a web page that is visible to a user. It varies depending on the device; the viewport will be smaller on a mobile phone than on a computer screen.

- You should include the following meta viewport element in all your web pages.

```js
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- A meta viewport element gives the browser instructions on how to control the pages' dimensions and scaling.

- The width=device-width part defines the width of the page to follow the screen-width of the device. screen-width will vary depending on the device the user is on.

- The initial-scale=1.0 part sets the inital zoom level when the page is first loaded by the browser.

---

##### Attributes supported by the meta tag

- charset - Specifies the character encoding for the HTML document.
- content - Gives the value associated with http-equiv or name attribute.
- http-equiv - Provides an HTTP header for the information/value of the content attribute.
- name - Defines a name for the metadata.
- scheme - Specifies the scheme to interpret the value of the content attribute. Not supported in HTML5.

---

##### How is metadata in HTML5 different from HTML 4.0.1?

- The scheme attribute is not supported in HTML5
- HTML5 introduces a new attribute called charset, which defines the character encoding for the HTML document.

HTML 4.0.1:

```js
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

HTML5:

```js
<meta charset="UTF-8">
```
