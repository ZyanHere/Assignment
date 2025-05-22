### How do you define HTML5?

- HTML5 is the most **recent rendition** of the **Hypertext Markup Language**
- also referred to as the WWW (World Wide Web)'s fundamental language.
- This markup language augments a text file with bits of code, <u>and this code which we call markup</u>, **describes the structure of the document**.

##### HTML5 introduces some new features including:

- Adding **_new parsing rules_** to enhance flexibility.
- Adding **_new attributes_**.
- **_Allow offline editing_**.
- **_Support (Web SQL)_**
- Support **Protocol** and **MIME handler registration**.

These features can be <u>**_used to change the way of user interaction with documents_**.</u>

---

### `Advantages` of using HTML5

- HTML5 <u>**_allows the creation of easier and more interactive websites by embedding video, audio, and graphics_**</u> on the web page.

- HTML5 **_supports <u>multimedia technology and graphical content</u> to the web_** <u>without using any third-party plugins.</u>

**<u>Some of the most important features added by HTML5 include:</u>**

- **Geo-location**
- **Offline Application Cache**
- **Client-side database**
- **Error handling**
- **New Structure and new multimedia elements**
- **Browser Support and compatibility**

##### Supports Some New Application Programming Interface (API) like:

- Browser History management
- Drag and Drop
- 2D drawing on a web app
- Time media playback

##### Supported Applications include:

- Web Workers - javascript
- Local File access
- Local data storage

---

#### What are `W3C` and `WHATWG`?

- The **_World Wide Web Consortium (W3C)_** is a community of developers <u>**working towards setting global standards for development**</u>.

<br/>

- WHATWG is short for <u>**_Web Hypertext Application Technology Working Group_**</u>. It was created during a W3C workshop by Apple, Mozilla and Opera Software in 2004. WHATWG is a community of developers focused on setting HTML standards to improve on user needs.

---

### What are `tags` in HTML?

An <u>**_HTML tag tells the browser on how to render the HTML web page in a certain defined format_**</u>.

- HTML uses angular brackets, < and >, to enclose the tags, the symbol / for closing the tag, and is used for many reasons like:

- changing the appearance of text,
- showing a graphic,
- linking to another web page.

##### For example:

```js
<title> Educative - Interactive Learning </title>
```

---

### What is an `attribute` in HTML?

- Provides <u>**_additional information about an element_**</u>, defining its properties or behavior.

- Attributes are placed directly after the name of a tag(Ex: a tag, img tag), inside the two angled brackets.

- Attributes only appear in opening tags or in self-closing tags. They can not be used within closing tags.

- Attributes usually come in <u>**_name/value pairs, like name="value"_**</u>

##### For example:

- HTML links are specified with the `<a>` tag. The link address is specified in the **_href attribute_**:

```js
<a href='https://www.educative.io'>This is a link</a>
```

<br/>

- HTML images also have **width and height attributes**, which specify the width and height of the image respectively:

```js
 <img src="img.jpg" width="250" height="100">
```

<br/>

- The <u>**_alt_**</u> attribute <u>**_details an alternative text to be used_**</u> if an image cannot be displayed.

<br/>

- **_<u>Screen readers can interpret the value of the alt attribute</u>. This allows users, e.g. those with visual impairments, to “listen” to the webpage and hear its value_**.

```js
<img src="img.jpg" alt="e-learning">
```

---

### Please name the `media element tags` introduced by HTML5.

##### `<audio>`

- Used for multimedia like sounds, audio streams, or music, embed audio content without any additional plug-in requirement like the flash player.

##### `<video>`

- Used for video content like video streams or movie clips, embed video content, etc.

##### `<source>`

- Used for multiple media resources in media elements, such as audio, video, picture, etc.

##### `<embed>`

- Used for external applications or embedded content (a plug-in).

##### `<track>`

- Used for adding subtitles or other files containing text in video or audio elements as the respective media play on a web page.

---

### How many types of `headings` can an HTML document support?

HTML documents can <u>**_support 6 levels of headings_**</u> from level 1 to level 6 .

```js
<h1></h1> to <h6></h6>
```

---

### What does the HTML anchor tag `<a>` define?

- The **HTML anchor tag** `<a>` defines <u>**_a hyperlink that links one page to another page_**. </u>
- The **href attribute** is the most important attribute of the HTML anchor tag that <u>**_determines the link’s destination_**</u>.

- Search engines use the anchor tag to decide the subject matter of the destination URL.

```js
<a href='https://google.com'> Google Link </a>
```

---

### What are `semantic elements` in HTML5?

- Semantic HTML **_provides meaning to the web page_** as opposed to just presentation.
- A `<p>` tag, for example, **_indicates that the enclosed text is a paragraph_**.
- This is both semantic and presentational as we as humans know what paragraphs are, and the browsers know how to display them.

- On the other hand, tags such as `<b>` and `<i>` **are not semantic markup**.
- They only tell the browser how the text should look (bold or italic), **_and do not add meaning to the markup_**.

- In semantic HTML, **_these are replaced by `<strong>` for strong text and `<em>` for emphasized text respectively_**.

---

### Some common types of lists in HTML5 that are used when designing a page?

#### <u><i>The most commonly used list tags in HTML5 are given below:</i></u>

<u>**Definition list**:</u> **_Offers a list within it_** and takes a definition term and a detailed definition

```js
<dt> </dt>
```

```js
<dd> </dd>
```

<u>**Ordered list**</u>: Provides the user the required **list in a numbered or alphabetical format**.

```js
<ol>{listItems.map(listItem)}</ol>
```

<u>**Unordered list**</u>: Offers the user the required **list in a bullet format**.

```js
<ul>{listItems.map(listItem)}</ul>
```

---

### The minimum number of HTML5 tags that are required to create a web page.

- A <u>**_minimum of three HTML5 tags are therefore intuitively required_**</u> to create a web page, namely

```js
<head> </head>
```

```js
<body> </body>
```

```js
<html> </html>
```

---

### How would you define the purpose of style sheets?

- Style sheets **allow the building of transportable well-defined, and consistent style templates**.

- These templates can be linked to several web pages, making it easy to maintain and change all the web pages look and feel within the website.

---

### What are the aspects to consider when developing multilingual sites?

##### Basic things include like:

- setting the **_default language_**,
- using **_Unicode encoding_**,
- being **_aware of standard font sizes and text direction_**,
- using the <b>`lang` attribute</b>,
- and being **_aware of language word length_** (which may affect layout).

---

### What is the purpose of <!Doctype html>?

Doctype declaration is <u>**_only needed to enable a standard mode for documents that are written with the HTML5 syntax_**</u>

There are three types of DOCTYPES, as mentioned below:

- Strict Doctype
- Frameset Doctype
- Transitional Doctype

```js
<!DOCTYPE html>
```

```js
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
```

```js
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

```js
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

---

### List out the page structure elements of HTML5?

```js
<header> - Used to define header for a document or a section
<nav> - Used to define container for navigation links
<section> - Used to define a section insided a document
<article> - Used to tag an independent self-contained article
<aside> - Defines the content separately (just like a sidebar)
<footer> - Used for tagging a footer inside a document or a section
<details> - Used to define any additional details
<summary>- Used to define a heading inside the <details> element
```

---

### Given a certain website, what are the ways you could optimize its assets and reduce page load time?

As a basic optimization rule, **_we can decrease the download size of our web page contents_** and **_make fewer HTTP requests_**.

To optimize website assets, we can follow the below techniques:

- File compression
- File concatenation
- Offloading assets
- Re-organizing & Refining code
- Properly naming all assets
- Using CSS Sprites for Images
- Disabling e-tags
- using internal and external style sheets and **_minimizing inline CSS_**
- Using a CDN (content delivery network) for media files and hosting
- Hosting our website's assets on different domains while also reducing DNS lookups
- Using a domain that is cookie-free to place the assets and splitting them among different domains

---

### What is an API? List the APIs available in HTML5.?

In HTML5 API (Application Programming Interface) is a means of creating numerous application using pre-constructed components. Developers can incorporate the functionality related to current APIs into their new websites.

The APIs in HTML5 are:

- Media API
- Data Transfer API
- Application Cache API
- User Interaction
- History API
- Constraint Validaton API
- Command API
- Text Track API
- HTML Web Workers
- HTML Drag and Drop
- HTML Application Cache
- HTML Local Storage
- HTML Geolocaton

---

### What are the different types of storage in HTML5? Explain.?

In HTML5 , data can be stored in two ways: session storage, local storage

<u>**Session Storage**:</u> the data or details from only the users's current browsing session are stored. Once the users clsoes the browser, the storage data gets removed automatically.

<u>**Local Storage**</u>: The data stays safe and does not get cleared automaticallly when the user closes the browser. The data instead needs to be deleted manually to remove it from storage.

---

### What are server-sent events?

- A server-sent event is <u>**_when a web page automatically receives updates from a server_**</u>.
- This functionality used to be available earlier as well, except that is was not automated because the web page would have to check if there were any changes.
- **_The updates immediately arrive with server-sent events_**.

---

### What is the difference between `server-sent events` and `Web sockets` in HTML5?

- Web sockets connections can **_<u>provide both ship statistics to the browser</u> and <u>acquire information from the browser_</u>**.
- A **real-life example** of an application that might use Websockets is a <u>**chat application**</u>.

<br/>

<u>**Server-sent events**</u> or (SSE) connections can **_solely push statistics to the browser_**.

- Online inventory prices or <u>**Twitter's updating timeline or feed**</u> are excellent examples of a utility that ought to benefit from SSE

---

#### What is an `<iframe>`, and what is it used for?

- This tag is used to <u>specify a browsing context that is nested, or, in other words, an inline frame</u>.

- This tag **<u>allows outside documents to be inserted in the main HTML with great ease</u>**.

- A common **_example usage of inline frames is <u>online advertising</u>_**, where the contents of the iframe can be an ad from a third party.

<u>**Point to be remembered:**</u>

- iframe introduce security risks.
- When an **_iframe is added to a page_**, <u>**_the website becomes vulnerable to cross-site attacks_**</u>.

---

#### Why are CSS links placed in the `<head>` `</head>` tag ?

- Style sheets are linked in the head section of the HTML markup, **_allowing the <u>browser to format and render the markup</u> as it goes_**.
  <br/>

- **_If you place the style details at the bottom_** of the document, <u>**_the browser must restyle and render the whole document from the top_**</u>.
  <br/>

- First of all it takes longer if a browser needs to wait before it meets the end of a document before the style details can be added, it will probably have to render the page again, making the process slower.
  <br/>

- Secondly, it's going to look unprofessional. This scenario varies from the scripts included as the scripts can block loading until they are completed (meaning you could load them as late as possible)

---

#### List down all the building blocks that constitute HTML5.

- Semantics
- Connectivity and Communication with servers
- Offline Storage
- Multimedia
- 2D/3D graphics and effects
- Performance and intergration
- Device access
- Styling

---

### How do you serve a page with content in multiple languages?

- This is one of the **_aspects of internationalization (i18n)_**
- When an HTTP request is made to a server, <u>**_the requesting user agent usually sends information about language preferences_**</u>, such as in the `Accept-Language` header.
- The server can then use this information to return a version of the document in the appropriate language is such an alternative is available.
- The **_returned HTML document should also declare_** the `lang` attribute in the `<html>` tag such as `<html lang="en"...</html/>`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Multilingual Page</title>
  </head>
  <body></body>
</html>

To let a search engine know that the same content is available in different
languages `<link />` tags with the `rel=alternate` and `hreflang="de"`
attributes should be used Eg:
<link href="alternate" hreflang="de" href="http://de.example.com/page.html" />
```

---

### What kind of things must you be wary of when designing or developing for multilingual sites?

##### Search Engine Optimization:

- Use the `lang` attribute on the `<html>` tag
- Include the locale in the URL (eg: en_US, zh_CN etc)
- Webpages should use below to tell search engines that there is another page at the specified `href` with the same content but for another language/locale

```html
link rel="alternate" hreflang="other_locale" href="url_of_locale"
```

##### Locale vs Language:

- Locale settings <u>**_control how numbers, dates, and times_**</u> display for your region
- Languages <u>**_have different flavors in different countries_**</u>, so it's important to differentiate languages for the target country

```html
en: en-US (American English), en-GB (British English) zh: zh-CN (Chinese
(Simplified)), zh,TW (Chinese (Traditional))
```

##### Predict locale but don't restrict:

- Servers can determine the locale/language of visitors via a combination of HTTP `Accept-language` headers and IP's.
- With these visitors can automatically select the best locale for the visitor.

##### Consider differences in the length of the text in different languages:

- Some content can be longer when written in another language, So be wary of layout.

##### Language reading direction:

- Languages like English and French are written from left-to-right, top-to-bottom.
- However some languages, such as Hebrew & Arabic, are written from right-to-left. This can affect the layout of your site, and the placement of elements on the page.

##### Do not concatenate translated strings

- The date today + date, it will break in languages with different word order.
- Use a template string with parameters substitution

##### Formatting dates and currencies

- Calendar dates are sometimes presented in different ways.
- Eg: May 31, 2023 in US, 31 May 2023 in Europe

##### Do not put text in images

- Putting text in images (e.g. png, gif, jpg etc.) is not a scalable approach.
- However to support image text translation, there needs to be a separate image created for each language which is not scalable workflow for designers.

---

#### Describe the difference between script, script async and script defer.

- Scripts tags are used to include Javascript on a web page.
- The async and defer attributes are used to change how/when the loading and execution of the script happens

i) **Plain Script tag**: When these are encountered, `HTML parsing is blocked`, `the script is fetched and executed immediately`. <u>HTML parsing resumes after the script is executed.</u>
<br/>

ii) **async Script tag**: The script will be fetched in parallel to HTML parsing and executed as soon as it is available (before HTML parsing completes), and it will not necessarily be executed in order in which it appears in the HTML document.

- Use async when the script is independent of any other scripts on the page (Ex: analytics)
  <br/>

i) **Defer Script tag**: The script will be fetched in parallel to HTML parsing and executed when the document has been fully parsed, but before firing `DOMContentLoaded`.

- If there are multiple of them, each script is executed in the order they appeared in the HTML document.
- If a script relies on the fully parsed DOM, the `defer` attribute will be useful in ensuring that the HTML is fully parsed before executing.

---

### What is progressive rendering?

- Technique used to improve the performance of a webpage (perceived load time), to render content for display as quickly as possible.

**Lazy Loading of Images**: Images on the page are not loaded all at once. The image is only loaded when the user scroll.

```js
<img loading='lazy'>
```

- Is a modern way to instruct the browser to **_defer loading of images that are outside of the screen until the user scroll_** near them.
- Use JS, to watch the scroll position and load the image when the image is about to come on screen (by comparing the coordinates of the image with the scroll position)

**Prioritizing visible content**

- **_Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible_**,
- You can then use deferred scripts or listen for the `DOMContentLoaded/load` event to load in other resources and content

---

### Why you would use a srcset attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.

- When you want to serve different images to users depending on their device display width.
- Below example tells the browser to display the small, medium or large .jpg depending on client's resolution.
- The first value is the image name and the second line is the width of the image in pixels.
  Ex:

```js
<img src="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" alt="">
```

- `srcset` solve the problem whereby you want to serve smaller image files to narrow screen devices, as they don't need huge images like desktop displays do

---

#### What is the difference between canvas and svg?

#### Canvas

- uses **immediate mode graphics rendering**. Once a shape is drawn it's not remembered by canvas, <u>if you **want to change it, we need to redraw it**</u>.
  <br/>
- Better for **pixel-based**, well **suited for video games** where the scene changes for frequently.
- Less accessible as it doesn't support screen readers by default.

#### SVG(Scalar Vector Graphics):

- Uses retained mode graphics.
- SVG elements are part of the DOM.
- Each drawn shape is remembered as an object.
- If attributes of an SVG element are changed, the browser automatically rerenders the shape.
- **Better for icons, charts & diagrams**. These can scale to any size **without losing quality.**

---

#### What are empty elements in HTML?

- Empty elements are those that do not contain and do not require closing tags. They are also known as `void elements`.
- These elements typically have attributes but they do not have any text or child elements within them.

```js
<br>: Line Break
<hr>: Horizontal Rule
<img>: Image
<input>: Input field
<link>: external resource link
<meta> Metadata
```
