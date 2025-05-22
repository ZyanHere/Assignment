- All elements in HTML5 are labeled by their <strong>tagName</strong> and are marked-up using either start tags and end tags or self-closing tags. (The attribute name describes the <strong>name</strong> of the input element. The tagName property returns the tag name of the element. In HTML, the returned value of the tagName property is always in UPPPERCASE. The name of class is returned by class name.)

---

- The World Wide Web's markup language has always been <strong>HTML</strong> (HTML was primarily designed as a language for semantically describing scientific documents, although its general design and adaptations over the years have enabled it to be used to describe a number of other types of documents.)

---

- The <strong>strong</strong> element specifies the importance of the text.

---

- The <strong>mark</strong> element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context.

---

- An enclosed text which flashes, later on, is created by the <strong>blink</strong> element (deprecated in HTML5)

---

- The <strong>nav</strong> element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.

```js
<!DOCTYPE html>
<html>
   <head>
      <title>nav tag</title>

   </head>
   <body>
      <div class = "ed">Educative</div>
      <div class = "nav_tag">Interactive Courses for Software Developers</div>
      <div class = "nav_tag">Nav Tag Example</div>
      <nav>
         <a href = "https://www.educative.io/explore">Explore</a> |
         <a href = "https://www.educative.io/tracks">Tracks</a> |
         <a href = "https://www.educative.io/track/beginning-front-end-developer">Beginning Front-end Development</a> |
         <a href = "https://www.educative.io/track/python-for-programmers">Python for Programmers</a> |
         <a href = "https://www.educative.io/track/ace-js-coding-interview">JS Interview</a>
      </nav>
   </body>
</html>
```

---

- The <strong>track</strong> element enables supplementary media tracks such as subtitle tracks and caption tracks to be specified for audio and video elements.

```js
<video width="510" height="174" controls>
  <source src="hello_world.mp4" type="video/mp4">
  <source src="hello_world.ogg" type="video/ogg">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
</video>
```

---

##### List the benefits of using HTML5 as opposed to the earlier versions of HTML.

- HTML5 has made <strong>direct</strong> functionalities and provides access for a lot of things that in the past could only be used with <strong>third party plugins</strong> or separate programs.

- New semantic element that are purposefully made for their name use like header for header section, footer for footer section and other nav, article, section for their respective usages and so on.

- Improved Javascript API for geolocation, drag-and-drop and media APIs

- Support for audio with audio tag, video with video tag and canvas tag for embedding graphics directly into HTML5.

- Enhanced support for multi-platform accessibility.

- New form elements (time, url) and validation process.

---

##### Usage of data-attributes in HTML5.

- Data attributes in HTML5 are used to embed custom data to an element which are quite helpful in developing Single Page Application in modern web development.

```js
<!DOCTYPE html>
<html>
<head>
    <script>
        function showDetails(course) {
            var course_author = course.getAttribute("data-course-author");
            alert(course.innerHTML + " is written by "
                                    + course_author  + ".");
        }
    </script>
</head>

<body>
    <h1>Educative</h1>
    <h2>Trending Courses and Authors</h2>
    <p>Click on the course name to know the author's name :</p>

    <ul>

        <div class="btn-group">
        <button onclick="showDetails(this)" id="html_interview"
                data-course-author="Educative">HTML5 - An Interview Refresher</button>
        <button onclick="showDetails(this)" id="HTML5_CSS_JS"
                data-course-author="Istvan Novak"> Unravelling HTML5, CSS and JS</button>
        <button onclick="showDetails(this)" id="react"
                data-course-author="Robin Wieruch">The Road to React: The one with Hooks</button>
        <button onclick="showDetails(this)" id="ts"
                data-course-author="Carl Rippon">Using TypeScript with React</button>
        </div>

    </ul>
</body>
</html>
```

---

##### Usage of datalist element in HTML5.

- The HTML5 datalist element provides an <strong>auto-complete capability</strong>.
- The datalist tag <strong>specifies a list of pre-defined options for an input element</strong>.

- Users will see a dropdown list of pre-defined options as they input data.

- The <strong>datalist element's id attribute must be equal to the input element's list attribute</strong> (this binds them together)

```js
<!DOCTYPE html>
<html>
    <head>
        <title>Datalist Tag</title>
    </head>
    <body>
        <h1>Educative</h1>
        <form action="">
            <label>Tracks on Educative:  </label>
            <input list="Tracks" id="tracksInput">
            <datalist id="Tracks">
                <option value="Machine Learning"/>
                <option value="Web Development"/>
                <option value="Interview Prep"/>
                <option value="Data Science"/>
                <option value="Algorithms"/>
                <option value="Data Structures"/>
            </datalist>
            <button onclick="datalistcall()" type="button">
                Click Here</button>
        </form>
        <p id="output"></p>
                <!-- Will display the selelct option -->
        <script type="text/javascript">
            function datalistcall(){
                  var o1 = document.getElementById("tracksInput").value;
                  document.getElementById("output").innerHTML = "You selected the "
                    + o1 + " track";
            }
        </script>
    </body>
</html>
```

---

##### Add links to images in HTML5.

- Linking image with webpage is done by <strong>placing the img tag inside the a and closing the tags accordingly within</strong> . The source of the image is defined with the src attribute.

```js
<html>
 <head>
 </head>
 <body>
    <h1>Educative - Interactive courses for software developers</h1>
     <p>Click on the image links below to redirect to your course of choice:</p>
   <div class="row">
  <div class="column">
    <a href="https://www.educative.io/courses/web-development-unraveling-html-css-js">
         <img src="https://lh3.googleusercontent.com/X_nmVnbN_DvvyXsx7PAOf0O4szQYN03tt6gxtx8GfreiSfQiCmbn7SNItVU64LVjEgV2fWrdO_buYQ1h1Sb68s4jgwBscqU=s620"
          width="130" height="85">
      </a>
  </div>

</div>
 </body>
</html>
```

---

##### What are web workers?

- HTML5 introduces a new techonology called web workers that are <strong>specifically designed to do background work independently of other user-interface scripts, without affecting the performance of the page</strong>.

- Unlike normal javascript operations, <strong>a web worker doesn't interrupt the user </strong>and the web page remains responsive because they are running the tasks in the background .

---

##### Create new elements in HTML5?

- It is possible to create new elements in HTML5 with the help of <strong>Javascript</strong>
- Custom elements are created using <strong>document.registerElement()</strong>

```js
var myElem = document.registerElement("my-elem")
document.body.appendChild(new myElem())
```

- The first argument to document.registerElement() is the element’s tag name. The name must contain a dash (-)

---

##### Please identify a few tags that are NOT supported in HTML5.

https://www.tutorialmines.net/list-of-tags-not-supported-in-html5/

---

##### With the arrival of HTML5, are there any changes in the APIs used for web development?

Yes there are quite a few changes with API integration with the arrival of HTML5.

- High-Resolution Time API,
- Media API
- Text Track API
- User timing API
- Data Transfer API
- Command API
- History API

---

- The default browser font size specified by HTML5 is <strong>16px</strong>.

---

##### What is HTML5 Boilerplate?

- HTML5 Boilerplate is a professional <strong>front-end template</strong> that is used to create fast, robust, and adaptable HTML5 sites with cross-browser compatiblity.

---

##### In HTML5, can we make use of percentages to define font sizes?

- Yes but only if we use them with a specific set e.g. if the website is set with the default size of 16px then we can use values like <strong>em</strong> to scale them with our choices i.e <strong>1.25\% em</strong>

---

##### Is it always required to close HTML tags while making layouts?

- Yes, one must close all the tags, as they might have individual properties for inline or block elements. However, there are single elements that can survice without closing like <strong> hr </strong>tag, <strong>br </strong>tag

---

##### With the advent of HTML5, which tag has replaced most of the properties of Flash?

- The canvas tag has a lot of properties similar to Flash, and can be integrated into HTML5 with access for drawing boxes, paths, circles, text and graphic images

---

##### While designing web layouts, can we use multiple header and footer tags ?

- Yes, every section can have its own header tag and footer tag to mark its own identity in HTML.

- Use these wisely though as the search engines recognize these tags.

- This is due to the fact that header and footer elements have semantic importance

---

##### Demonstrate how we can pre-load content via HTML5.

We’ll use the preload rel value, which will transform the link tag into a preloader for any resource we want to preload. We can also specify:

The type of resource in the as attribute.

- The path in the href attribute pointing towards the resource.
  Preload is a declarative fetch, that allows you to make the browser request for a resource without blocking the document’s onload event.

- preload only loads or that is to say, fetches the resource requested; it does not, however, apply it. Instead, it keeps it in memory and is up to the developer to decide when to load it.

```js
<html>
 <head>
  <title>Preloading content in HTML Markup</title>

  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="index.js" as="script">
  <link rel="stylesheet" href="style.css">

</head>

<body>
  <h1>Preloading JS and CSS files in HTML Markup</h1>
  <script src="index.js" defer></script>
</body>
</html>
```
