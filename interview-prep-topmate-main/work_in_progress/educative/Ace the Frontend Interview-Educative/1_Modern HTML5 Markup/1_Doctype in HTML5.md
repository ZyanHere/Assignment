### DOCTYPE in HTML5

```js
// Syntax to define Doctype in HTML5 is
<!DOCTYPE html>
```

- This declaration <u>**_is considered as an information to the browser_**</u> <u>about what document type to expect</u>, it is not considered as an HTML tag.

The following are the **_three modes_** that are <u>**_defined by layout engines in web browsers_**</u>

- Quirks Mode,
- Almost standards mode,
- Full standards mode
  <br/>
- **_Quirks mode_** refers to a strategy used by some web browsers <u>**_to preserve backward compatibility with web pages built for old web browsers_**</u>, rather than solely complying with standard W3C and IETF requirements in the standards mode.
  <br/>

- **_Almost standards mode_** rendering matches “full standards” mode in all details <u>**_except the image layout inside table cells is treated in the same way that “quirks” mode works_**</u>. This means that sliced image-in-table layouts are less likely to collapse in browsers in either “quirks” or “almost normal” mode than in “full standards” mode.
  <br/>

- **_Full standards mode_** In this mode, the behavior described is the same as described by HTML and CSS specifications. <u>**_Most of the modern browsers use full standard mode_**.</u>

  <br/>

#### Points to remember:

- With DOCTYPE <u>**_placed at the start of the HTML markup_**</u>, `Full standards mode` is enabled in web browsers.
  <br/>

- <u>adding any non-executing code</u>, **e.g. comments, XML declaration** <u>**_before the DOCTYPE declaration will trigger quirks mode in Internet Explorer 9 and older_**</u>.

  <br/>

- The HTML5 doctype, `<!DOCTYPE html>`, <u>**_triggers Full Standards mode in every browser_**</u> (including IE6).

  <br/>

- The main issue that arises <u>_if we don’t define DOCTYPE at the beginning of our HTML_</u> code is <u>**_it activates the Quirks mode._**</u>

  <br/>

<u>**For example:**</u>

- **_new features & tags in HTML5_** such as `article`, `footer`, `header`, `nav`, `section` **may not be supported** <u>if the `<!DOCTYPE>` is not declared.</u>
