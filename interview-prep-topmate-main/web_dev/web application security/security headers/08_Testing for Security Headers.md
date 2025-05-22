#### The State of HTTP Security

<strong>Q) Why HTTPS over HTTP?</strong>

<details>
<strong>Ans:</strong> The web primarily runs on HTTP, but <strong>to ensure the security, intergrity and privacy of end-to-end connections</strong>, clients communicate over a secure HTTP known as HTTPS.

```js
An important push for HTTPS has been made by browsers themselves, such as Chrome's continuous attempts
to discourage the use of HTTP by portraying any such websites as potentially dangerous.
```

- A prime example of this push is Chrome's recent hardened policy about mixed content which actively blocks HTTP requests.

- Following are the prior actions taken to increase the importance of the security aspects of the web such as:

- Clearer indications of a website's security based on <strong>green lock icon on the address bar</strong>
- A dedicated <strong>Security panel</strong> on Chrome's Dev Tools
  <img width="575" alt="image" src="https://user-images.githubusercontent.com/42731246/218538271-9d064333-00df-41b8-a746-e5ccd019a7ce.png">

<summary>View Answer</summary>
</details>

---

## The HTTP Archive

- Tracking various aspects and traits of how web evolves over time.

Some of the well known reports that have been made public and online from the HTTP Archive are:

<strong>State of the Web</strong>:

- tracks the <strong>adoption of web technologies</strong> and growing web standards across websites.
- It reports on data points such as

```js
- Total Requests,
- Pages with Vulnerable Javascript libraries,
- and the prevalence of HTTP/2 Requestsin websites, with an aim to identify trends.
```

---

<strong>State of Javascript</strong>:

- tracks the overall impact of Javascript in a website, with data points such as

```js
- size of JS libraries in a website,
- the amount of JS requests,
- the boot-up time which indicates the amount of CPU time each script consumes on a webpage.
```

---

<strong>Accessibility Report</strong>:

- tracks an overall accessibility score as noted by Chrome's Lighthouse tool and other accessibility traits and standards such as the use of Image Alt attributes.

---

```js
The data for all the HTTP Archive reports is made available via Goolge's BigQuery for anyone to examine.
It is compiled by analyzing Alexa's top 1 million websites in bi-weekly scans using the open source project
and the online web performance tool WebPageTest
```

## HTTPS Requests

- Using the HTTP Archive as a tool, we can see the growth in trend of <strong>secure_by_default</strong> with regards to HTTPS adoption by websites

---

## Secure Hosting

- With the growth of HTTPS, static website hosting platforms have adjusted and adopted similar standards and help push towards a more secure web.

Following are the platforms for deploying and hosting your websites will serve your content over HTTPS:

- Vercel
- Netlify
- Google's Firebase
- Heroku


##### Let's Encrypt has certainly contributed a lot to secure web by making certificates affordable for free.
