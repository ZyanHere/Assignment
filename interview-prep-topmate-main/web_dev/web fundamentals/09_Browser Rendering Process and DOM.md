### Browser Rendering Process

**1. Parsing HTML**:

- The browser parses our HTML and <u>**_stores it in memory as a tree structure of a document which is also known as DOM(Document Object Model) or Real DOM_**.</u>
- It is a web API used to build websites.
- DOM methods allows programmatic access to the tree.
- With them, you can change the document's structure style or content

**2. Parsing CSS**:

- The browser parses our CSS and **_<u>stores it in memory as CSSOM (CSS Object Model)</u>_**
- It is a web API used to manipulate the CSS of our website

**3. Creating Render Tree**:

- The <u>**_browser uses DOM and CSSOM_**</u> to create a render tree.
- Render tree <u>**_represents everything that will be rendered on the browser_**</u> (HTML nodes with their styles)

**4. Layout Render Tree**:

- **_Browser calculates the geometry of all elements_** (sizes and positioning) and <u>accordingly starts placing them</u>

**5. Painting**:

- Now <u>**it will start painting all individual nodes**</u> according to their styles
