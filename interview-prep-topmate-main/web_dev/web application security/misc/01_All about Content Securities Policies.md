### Q) What is CSP?
- The Content Security Policy (CSP) is a security standard introduced to prevent `cross-site scripting (XSS)`, `clickjacking`, and other `code injection` attacks resulting from the execution of malicious content in the trusted web page context.
---

### Q) How does CSP enhance web security?

- by defining and enforcing rules that dictate which resources (scripts, styles, images, etc.) a browser is allowed to load and execute on a page.
- This helps mitigate the risk of XSS and related attacks.

---

### Q) What types of attacks does `Content-Security-Policy` help mitigate?

- Cross Site Scripting (XSS) attacks — **refers to client-side code injection** where the attacker injects malicious scripts into a legitimate website or web application.

<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*bEBO2LgAzaknFVbn7uOqtQ.png">


- The term `"space-delimited"` in the context of CSP directives means that within the directive, individual values (in this case, the sources from which content like scripts can be loaded) are separated by spaces. 


<ins>**For example:**</ins>

```js
Content-Security-Policy: script-src 'self' https://www.example.com;
```

- `script-src` is the name of the directive.
- `'self'` `https://www.example.com` are the sources listed for this directive.
- The space between `'self'` and `https://www.example.com` delimits or separates these two sources.
- This particular directive is <ins>***telling the browser that it can only execute scripts that come from the same origin as the document ('self')***</ins> or from `https://www.example.com`. Each source in the list is separated by a space, which is what `"space-delimited"` refers to.

---



### Q) Explain the main directives in CSP.

- <ins>**_Directives are rules in CSP_** that define **_what types of content are allowed_**</ins>.
- `default-src`, `script-src`, `style-src`, etc.
- default-src: (sets the default source for content),
- style-src: defines valid sources for styles

### Q) How do you implement CSP in a web application?

- CSP **_can be implemented using meta tags in the HTML <head> section, HTTP headers, or JavaScript_**.
- Meta tags and HTTP headers are commonly used to set the policy at the server level, while javascript can be used to set policies dynamically

#### Dynamic Policy setting using Javascript (HTTP headers)

```js
// Example: Set a Content Security Policy header dynamically based on some condition
if (someCondition) {
  const policyValue =
    "default-src 'self'; script-src 'self' https://trusted-scripts.com;";
  const cspHeader = `Content-Security-Policy: ${policyValue}`;

  // Set the CSP header dynamically
  document.setHeader(cspHeader);
}
```

#### Dynamic Policy Setting Using JavaScript (Meta Tag Injection):

```js
// Example: Inject a meta tag with Content Security Policy dynamically
if (someCondition) {
  const policyValue =
    "default-src 'self'; script-src 'self' https://trusted-scripts.com;";

  // Create a new meta tag
  const metaTag = document.createElement('meta');
  metaTag.httpEquiv = 'Content-Security-Policy';
  metaTag.content = policyValue;

  // Append the meta tag to the document's head
  document.head.appendChild(metaTag);
}
```

or

```js
<meta
  http-equiv='Content-Security-Policy'
  content="default-src 'self' 'unsafe-eval'; 
  style-src 'self' 'unsafe-inline'; 
  script-src 'self' https://maps.googleapis.com 'unsafe-inline' 'unsafe-eval';"
/>
```

### Breakdown of the CSP Policy
`default-src` `'self'` `'unsafe-eval';`:  **Only allow resources (such as fonts, scripts, etc.) from the same origin** as your site, and allow the use of eval() for JavaScript..

`style-src` `'self'` `'unsafe-inline'`;: This **allows the use of inline styles and stylesheets loaded from the same origin**. This is necessary for dynamically generated styles or for styles injected by React components.

`script-src` `'self'`` https://maps.googleapis.com` `'unsafe-inline'` `'unsafe-eval';`: This directive specifies that <ins>***scripts can be loaded from the same origin, from the Google Maps API, and allows for inline scripts and usage of eval()***</ins>. The inclusion of Google Maps is essential for your map-based features to function correctly.

#### NOTE that <ins>dynamic policies might have implications on the security of your application</ins>, and careful consideration should be given to avoid unintentionally weakening security.

---

### Q) What are the valid CSP Headers?

- `default-src`: This is a catchall header which **indicates where items can come from**
  - It only applies for attributes where you don’t set a specific value
  - Often, you want to set this to ‘self’ .
  - This setting prohibits loading items from external sources unless you specifically allow them with other headers.
- `script-src`: The **list of acceptable source locations to load client-side scripts**.
- `img-src`: The **list of acceptable source locations for images**.
- `media-src`: A **list of acceptable source locations for rich media like video and audio**.
- `object-src`: A **list of acceptable source locations for plugins**
  - Unless your website is specifically designed to use legacy applets like those for Internet Explorer 6, this should be set to ‘none’ .
- `manifest-src`: A **list of acceptable source locations** for web manifests.
  - Web manifests are used by users of Progressive Web Applications to download websites and run them like native mobile apps.
- `frame-ancestors`: A **_list of acceptable URL locations which this website can load in an iFrame_**.
- `form-action`: A **_list of acceptable URL target locations where the website can send form data_**.
  - It’s most likely that you want this value set to ‘self’ as most websites only submit their form data locally.
  - This property is not covered by default-src above, so make sure you set it.
- `plugin-types`: The **_list of plugin types that can be loaded from the locations in object-src_**. Likely that **_you also want to set this to ‘none’_**
- `base-uri`: The **_list of URLs that can be used in HTML base tags_** on your site.

---

### CSP Directive Examples,

- **default-src** - defines the default policy for fetching resources such as JavaScript, Images, CSS, Fonts, AJAX requests, Frames, HTML5 Media.
- **script-src** - ‘self’ js.example.com; — valid sources of JavaScript
- **style-src** - ‘self’ css.example.com; — valid sources of stylesheets or CSS
- **img-src** - ‘self’ img.example.com; — valid sources of images
- **font-src** - font.example.com; — valid sources of font resources

---

### What is the `nonce` attribute in CSP, and how is it used?

- **is used to associate a cryptographic nonce** (number used once) **with a specific inline script or style**.
- It **_allows the execution of inline content that matches the provided nonce_**, adding a level of security to inline scripts/styles.

---

### What is the purpose of the `strict-dynamic` directive in CSP?

- **_allows dynamic script execution <ins>while still preventing inline script execution_</ins>**.
- It enables trusted scripts to be executed dynamically,
- providing a way to include scripts from trusted sources **without resorting to unsafe inline scripts**.

---

### How do you handle external resources in CSP?

- External resources are handled **by specifying valid sources for each type of content**.
- For example, `script-src` can have values like 'self' (same origin)
  - 'unsafe-inline' (allow inline scripts), and specific domains or nonces for external scripts.

---

### What is the difference between self and 'unsafe-inline' in CSP?

- `self` refers to the same origin (domain and protocol)
- `'unsafe-inline'` allows the use of inline scripts/styles.
- Using `'self'` <ins>_is more secure than allowing 'unsafe-inline'_</ins>, but it restricts inline code.

---

### How can you report CSP violations?

- CSP violations can be reported using the `report-uri` **directive** or the `report-to` **header**.
- These mechanisms allow the browser to send violation reports to a specified endpoint,
- helping developers identify and address potential security issues.

---

### What is the impact of CSP on inline event handlers?

- CSP **restricts the use of inline event handlers** like onclick and onload
- It <ins>**_encourages developers to move event handling logic to external scripts_**</ins> rather than embedding it directly in HTML.

---

### How does CSP impact the use of eval and new Function in JavaScript?

- CSP discourages the use of `eval` and `new Function` as they are **_considered unsafe practices_**.
- Policies restricting `'unsafe-eval'` <ins>can prevent the execution of dynamically generated code using these methods</ins>.

---

### How can you test and debug CSP policies?

- Tools like the `CSP Evaluator`, the `CSP Playground`, and `browser developer tools` can help test and debug CSP policies.
- It’s essential to use these tools during development to ensure that the policies are effective without breaking functionality.

---

### What are the security implications of not implementing CSP in a web application?

- Without CSP, a web application is more vulnerable to XSS attacks, data exfiltration, and other security threats.
- CSP provides an additional layer of defense by restricting the types of content that can be executed on a page.

---

## SUMMARY

1. **CSP Importance:** Web security, mitigates attacks, controls resource loading, enhances safety.
2. **HTTP Header Purpose:** Defines security rules, sent with response, guards against web threats
3. **CSP Threat Mitigation:** Guards against XSS, data injection, enhances web application security.
4. **Directives in CSP:** Define content rules, guide browser behavior, enforce security policies.
5. `default-src`: Default source for content without specific directives, foundational in CSP
6. `script-src`: Controls allowed script sources, mitigates script-related security risks.
7. `self`: Restricts content to the same origin, enhances security.
8. **Risks** of `'unsafe-inline'` and `'unsafe-eval'`: Allows potentially insecure script execution, increasing vulnerability to attacks.
9. `nonce`: Random value for script/style tags, enhances security, ensures trust.
10. `report-uri/report-to`: <ins>**_Reports policy violations to specified endpoint_**</ins>, aids security monitoring.
11. `CSP Violation Report Significance:` Provides insights into policy breaches, aids security improvements.
12. `Challenges in CSP Implementation`: Balancing security with functionality, addressing potential issues, optimizing performance.
13. `CSP for XSS Prevention`: Restricts script sources, mitigates cross-site scripting risks, strengthens security.
14. `CSP Impact on Performance:` Balancing security and speed, optimizing directives for efficiency.
15. `Example of Well-Structured CSP Header:` Specifies trusted sources, defines content security rules for hypothetical website.
