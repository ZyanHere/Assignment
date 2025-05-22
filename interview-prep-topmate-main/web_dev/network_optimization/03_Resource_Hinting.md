
<img src="./imagesUsed/ResourceHinting-1.JPG">


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PRELOAD PREFETCH PRECONNECT</title>

    <!-- PRELOADING STARTS -->
    <link rel="preload" as="script" href="script2.js" />
    <link rel="preload" as="style" href="style2.css" />
    <!-- PRELOADING ENDS -->

    <!-- PREFETCH START-->
    <link rel="prefetch" href="index3.html" />
    <link rel="prefetch" as="script" href="script3.js" />
    <!-- PREFETCH ENDS -->

    <!-- PRECONNECT START-->
    <link rel="preconnect" href="https://api.my-app.com/" />
    <!-- PRECONNECT ENDS -->

    <!-- USING STYLES -->
    <link rel="stylesheet" href="style1.css" />
    <link rel="stylesheet" href="style2.css" />
  </head>
  <body>
    <a href="index3.html">index3.html</a>
  </body>
  <!-- USING JS -->
  <script src="script1.js"></script>
  <script src="script2.js"></script>
</html>
```

---

<u>**Ex:**</u> By default (without preload, without prefetch, without preconnect), below is how the browser loads

```html
<!-- STYLES -->
<head>
  <link rel="stylesheet" href="style1.css" />
  <link rel="stylesheet" href="style2.css" />
</head>
<body>
  <a href="index3.html">index3.html</a>
</body>
<!-- JS -->
<script src="script1.js"></script>
<script src="script2.js"></script>
```
<img src="./imagesUsed/ResourceHinting-2.JPG">


---

### **preload**: 
- If you want to **load some script or css first because of the priority** (ex: I want to load script2 before script1)

<u><b>Note:</b></u> If you preload something and don't consume it, then browser hints you a warning on the console

<img src="./imagesUsed/ResourceHinting-3.JPG">

```html
<!-- PRELOADING STARTS -->
<link rel="preload" as="script" href="script2.js" />
<link rel="preload" as="style" href="style2.css" />
<!-- PRELOADING ENDS -->
```

<img src="./imagesUsed/ResourceHinting-4.JPG">


---

### **prefetch** :
- If you want to **load some html or script <ins>before you have actually been into that html file**</ins> **(ex: Loading 2nd html file in main html page itself)**

- When user actually been into the 2nd html file it shows like those files/scripts are cached

<u><b>Note:</b></u> Apply prefetch for only those when you are so much sure that this page is going to be opened.

**Ex:** Registering an user requires 3 pages, you can prefetch the 2nd page into 1st page and similarly 3rd page into 2nd page.

```html
<!-- PREFETCH START-->
<link rel="prefetch" href="index3.html" />
<link rel="prefetch" as="script" href="script3.js" />
<!-- PREFETCH ENDS -->
```

##### index3.html is loaded before the user actually navigated to index3.html
<img src="./imagesUsed/ResourceHinting-5.JPG">


##### index3.html shows the cache (once index3.html is opened)

<img src="./imagesUsed/ResourceHinting-6.JPG">


---

### **preconnect**:
- when you are actually **loading some contents from other domain** (let's say CDN).

- So when you are making a new connection with a new domain (which usually takes time)

- thereby `preconnect` helps to make this call beforehand between two different domains

- handshake happens only once per domain, so if the handshake is done already then going forward it no need to do the handshake again

```html
<!-- PRECONNECT START-->
<link rel="preconnect" href="https://api.my-app.com/" />
<!-- PRECONNECT ENDS -->
```
<img src="./imagesUsed/ResourceHinting-7.JPG">

---

### dns-prefetch

<img src="./imagesUsed/ResourceHinting-8.JPG">


- makes a handshake and it is basically supported on the old browser

-----


### pre-render
<img src="./imagesUsed/ResourceHinting-9.JPG">


- certain pages you are going to load next and you know that users are going to highly visiting.
- In that particular case you don't want user to click navigate, then start requesting then downloading
- This will create hidden tab content, it will load your page including your JS execution and it will throw the hidden tab away after a certain time 
**Ex**: Login page to dashboard page navigation 


---------------

### modulepreload

<img src="./imagesUsed/ResourceHinting-10.JPG">


- going to load your ES module and it is going to download cache and it is going to compile your JS module code as soon as possible.