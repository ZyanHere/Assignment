```html
<!--index3.html-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Load CSS Async</title>

    <link rel="stylesheet" href="nonCritical.css" />
    <link rel="stylesheet" href="style1.css" />
    <link rel="stylesheet" href="critical.css" />
  </head>
  <body></body>
</html>
```

**for the above code, we would see that critical.css is loaded after 20ms**
<img src="./imagesUsed/Load_CSS_Async-1.png">

---

**if we want to load critical.css at first and load other .css files asynchronously**

<u>Note:</u> By default media is all, we are providing media ="print" so that browser understands these are used for printing purpose, similarly onload we again wanted to change media as all

```html
<link
  rel="stylesheet"
  href="nonCritical.css"
  media="print"
  onload="this.media='all'"
/>
<link
  rel="stylesheet"
  href="style1.css"
  media="print"
  onload="this.media='all'"
/>
<link rel="stylesheet" href="critical.css" />
```

<img src="./imagesUsed/Load_CSS_Async-2.png">

---

### **we can also use `preload` to load css asynchronously**

```html
<!-- PRELOAD and ASYNC -->
<link
  href="style2.css"
  rel="preload"
  as="style"
  onload="this.rel='stylesheet'"
/>
```
