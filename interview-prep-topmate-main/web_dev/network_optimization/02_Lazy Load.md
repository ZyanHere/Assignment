## Lazy Loading

- `loading="lazy"` is the attribute you need to provide to lazily load the images.

- What it does when it encounters the loading attribute with the lazy value, so if that particular image is `not in the viewport` of the user, then it is **not downloaded**.
- The moment you are `about to arrive` on that image then only the `network call happens` and the `image gets downloaded`.

- **Real Time scenario**: Infinite scrolling, ex: as the user scrolls the network api gets called to download that image

```js
//syntax:
<head>
<title>Lazy Load Images</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body>
<img src="https://image.png" loading="lazy" width="401" height="401" alt="image1">
</body>
```

---

**loading = "eager"**

```js
//Prompt an early download of an asset
// For critical images

<img loading ="eager">
<iframe loading ="eager">
```

---

**fetchpriority="low"**

```js
<img src="less-important.svg" fetchpriority="low">

```

---

### Using Intersection Observer:

- Considering we have so many images like Flipkart and so much content to be loaded or so many visit that need to be loaded.
- In such cases, ***we can actually add some element at the end of certain (div container) which acts as a sentinel element***
- So basically if we are scrolling and we encounter that particular element we can take a decision to load other items as well.
- So whenever your browser basically scroll intersect with that particular sentinel, you will get a callback and based on that callback you can take some certain decision

<img src="./imagesUsed/Lazy_Load_of_Images-1.png">



- From the above image it is clear that, we don't want to load all the images right ?
- We just want to load first two images or three images and once you basically have these three images in your viewport and you want to load more images let's say..
- Then ***we can achieve this by adding a sentinel element after these two images (in your DOM)***
- Once after scrolling, your sentinel elements come into the viewport, you will get a callback.
- Using that callback you can take a decision to make another set of a API call and get the images and add those images in your image list.

```js
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

function callbackFunction(entries) {
  entries.forEach((entry) => {
    //logic for each entry
  });
}

let observer = new IntersectionObserver(callbackFunction, options);
observer.observe(TARGET_ELEMENT);
```
----

### Content Visibility
- Anything that is not visible in my viewport, I will lazy rendering of that particular thing. 
- By just adding `content-visibility: auto`, rendering time has been reduced significantly


<img src="./imagesUsed/Lazy_Load_of_Images-2.png">




```js
.story{
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /*size of the content which is going to be loaded*/
}
```

-----

### Serving Critical CSS

- Only the CSS that is critical that we should load and rest we can load afterwards.


#### Load Critical CSS synchronously

```js
// block your rendering until it is downloaded, your web page is not going to render
<link rel="stylesheet" href="critical.css"/>
```

#### Load Critical CSS asynchronously with low priority


- media type `"print"` says that this is not critical, load this once your web page is loaded, your JS is ready to execute just on load in that particular case.
- `all` means available for everyone or for all the use cases in the CSS, it is going to download and make it available for your next rendering and next set of things which are available below the fold

```js
// 
<link rel="stylesheet" href="full.css" media='print' onload="this.media='all'"/>
```