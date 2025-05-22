- is an online web tool that is well known for <ins>**performance** **testing**</ins>.
- It is not considered as a security penetration tool but does <strong><ins>reveal the status of HTTP security headers</ins> employed by a website and detect vulnerable JS libraries.</strong>

- This tool is one of the most popular tools in Web Performance community to provide the following things:

```js
- Page Speed Insights
- bottleneck breakdown reports
- further info on website(s) performance
```

- A relatively recent addition to WebPageTest is that <strong>it provides users with security insights as to the status of HTTP security headers</strong> and detects vulnerable JS libraries that are rendered in scanned web pages.

---

#### Running a Scan

Head over to https://webpagetest.org and enter the URL for a web page of your preference.

#### Testing the Results

- Top-page scores
- Browser performance metrics such as

```js
- First-Byte,
- First Contentful Paint,
- Total Blocking Time,
- Document Complete
- Fully Loaded
- Waterfall for all the requests. This should be similar to the browser DevTools
```

---

#### Security Score

- You will be seeing Alphabets from A to F

```js
A+ for a score equal to or higher than 95

A for a score equal to or higher than 75

B for a score equal to or higher than 60

C for a score equal to or higher than 50

D for a score equal to or higher than 29

E for a score equal to or higher than 14

F for a score equal to or higher than 0

```

<img src="./_imagesUsed/web_page_test.png">

- We can click on the low score (ex: 'E') to find out more.
- Upon click, it takes us to the synk.io website
- We can see Javascript Libraries with vulnerabilities **that are <ins>detected**</ins> and **<ins>missing HTTP security headers**</ins> in the web page's response

<img src="./_imagesUsed/synk_website.png">


- ##### To remediate the security vulnerability and low score, one would simply <ins>need to upgrade to the latest version of these libraries</ins> which include a fix for the security vulnerability

- ##### For security headers, you should add them to your website.

-----

#### Q) WebPageTest helps with


<details>

#### *Testing for performance and security issues in websites and giving insights into how to fix them*

<summary>
View Answer
</summary>
</details>

----

#### Q) What issues can I find with WebPageTest about my website security?

<details>

#### *Detect if my website is running vulnerable Javascript libraries*

#### *Detect if my website responded with secure HTTP headers*


<summary>
View Answer
</summary>
</details>