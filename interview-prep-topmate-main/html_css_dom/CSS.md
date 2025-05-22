## 1. DIV and SPAN

<img src="https://user-images.githubusercontent.com/42731246/142733551-fc0aeaf2-91b4-48c7-8ea8-53e7a5d380b1.png">

## 2. Inheritance in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733561-815fb9d9-d023-4514-809c-21c6c8119624.png">

## 3. CSS Specificity

<img src="https://user-images.githubusercontent.com/42731246/142733573-96c4add1-fef6-4774-a344-3fe4df1dc0ad.png">
<img src="https://user-images.githubusercontent.com/42731246/142733659-51908f7b-0f0d-486a-9c68-68dedaddd318.png">

## 4. RGB means:

<img src="https://user-images.githubusercontent.com/42731246/142733665-b227e858-e1e6-4fd4-a65d-dbdad3c2f108.png">

## 5. RGBA (what is A):

<img src="https://user-images.githubusercontent.com/42731246/142733674-610db881-ffde-473f-9aa9-7a3fd7d3a29b.png">
<img src="https://user-images.githubusercontent.com/42731246/142733679-fd051132-d046-4a6a-9cca-44468d6a08d1.png">

## 6. HEX Values in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733689-1ab85c7a-bfb1-4c29-b44c-061e17a6ce2d.png">
<img src="https://user-images.githubusercontent.com/42731246/142733694-8887e58e-9fc3-46d0-a7a0-1fac74c3eb84.png">

## 7. Pixels, Font-Size, Width, Height in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733702-d16b9ab2-48ed-4728-9ca0-ebc6d2783ae5.png">

## 8. Percent in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733706-53b6cc8d-27bb-4924-aa3d-847a5b11fc76.png">

## 9. Em units in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733713-52492351-69b0-4d88-95f1-1b7b5b341546.png">

## 10. Rem in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733717-771535a6-c2d0-4666-a73b-466ea2505a58.png">

## 11. ViewPort Units in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733725-a61bc826-acbe-4754-8540-85eb87257e16.png">

## 12. Calc in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733773-0a7a0eff-ae6d-4fcc-b2d4-7bcc1e274467.png">

## 13. Min height in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733783-42582d11-e605-4696-a6e9-59060acffb06.png">

## 14. Max height in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733788-e205bac0-b0ad-466f-9329-cdc7bff467e7.png">

## 15. Font-Stack Generic Fonts

<img src="https://user-images.githubusercontent.com/42731246/142733791-12aa07b5-5b3c-454f-95a2-196f4ffaaecb.png">

Instead of one option, we supply multiple. And you can think of it as a fallback system. If none of the five families we passed in are supported by the user browser at the end of the stack we can pass in generic Fonts family and the browser is going to use generic font family to get similar looking fonts.

<img src="https://user-images.githubusercontent.com/42731246/142733795-36130bd4-a433-421d-8c13-c2b483dbeba9.png">

## 16. Font-weight, Font Style

<img src="https://user-images.githubusercontent.com/42731246/142733823-2637d6e2-e135-48fc-a240-07a7f767bd23.png">

## 17. Text Indent in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733828-29818aef-4e5e-4975-834c-1cd561ccec9b.png">

```js
<div class='a'>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam
    at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus
    diam, consequat gravida libero rhoncus ut.
  </p>
</div>
```

```css
div.a {
  text-indent: 50px;
}
```

<img src="/html_css_dom/images_used/text-indent.png">

## 18. Other Text Properties

<img src="https://user-images.githubusercontent.com/42731246/142733834-a9b525ea-c681-4f12-b196-7ed88e242e9e.png">

## 19. CSS Box Model

<img src="https://user-images.githubusercontent.com/42731246/142733839-947f5d14-da02-43cc-8214-af0d5f7bd2fd.png">

## 20. Display Property in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733842-82c1bfc7-e0dd-4cd9-82cf-a67d5abea88e.png">

<img src="https://user-images.githubusercontent.com/42731246/142733843-098d468e-e2df-4b0b-aef1-5ffd8fa9b87c.png">

```js
<div><span class="a">Aliquam</span> <span class="a">venenatis</span></div>
<div><span class="b">Aliquam</span> <span class="b">venenatis</span></div>
<div><span class="c">Aliquam</span> <span class="c">venenatis</span></div>
```

```css
/* for class 'a', browser doesn't increase width and height because display:inline doesn't respect width and height */
span.a {
  display: inline; /* the default for span */
  width: 100px;
  height: 100px;
  padding: 5px;
  border: 1px solid blue;
  background-color: yellow;
}
/* display inline-block doesn't starts in a new line but respects width and height, whereas not applying doesn't take the full width (I mean by default it acts like inline + doesn't span full width) */
span.b {
  display: inline-block;
  padding: 5px;
  border: 1px solid blue;
  background-color: yellow;
}

/* display block starts in a new line and takes full width by default and respects width and height*/
span.c {
  display: block;
  padding: 5px;
  border: 1px solid blue;
  background-color: yellow;
}
```

<img src="./images_used/display_inline_vs_block_vs_inline-block.png">

#### display inline-block doesn't starts in a new line but respects width and height

<img src="./images_used/display_inline-block_respects_width_and_height.png">

## 21. Box-sizing

<img src="https://user-images.githubusercontent.com/42731246/142733850-d2f32840-f6d1-4206-9a84-262a94b8e513.png">

<img src="https://user-images.githubusercontent.com/42731246/142733851-8d5cae5e-ce6c-469e-86ab-4e8d648f7920.png">

## 22. Display inline-block

<img src="https://user-images.githubusercontent.com/42731246/142733857-beeacd3b-cc63-44ab-a63c-ddabe200c0ba.png">

## 23. Background attachment in css

<img src="https://user-images.githubusercontent.com/42731246/142733868-de59690a-28cc-493e-85f0-eb7f9933a4be.png">

## 24. Display vs opacity vs visibility in CSS

<img src="https://user-images.githubusercontent.com/42731246/142733891-689b876d-380c-44e0-b5da-f4cb36334231.png">

#### <u>Use Cases of `display:none`</u>:

- Completely removing an element from the layout, especially **_in responsive designs where certain elements should not be shown at specific screen sizes_**.
- Used in JavaScript-driven interactions to hide or show elements dynamically (e.g., dropdown menus, modal dialogs).

### opacity:

- The opacity property **_controls the transparency level of an element_**.
- An element with opacity: 0; is fully transparent **_<u>but still occupies space in the layout and remains interactive</u>_** (e.g., clickable).

#### <u>Use Cases of `opacity:0`</u>:

- Creating fade-in/fade-out animations where an element gradually appears or disappears but should still occupy space during the transition.

### visibility:

- The visibility property determines whether an element is visible or not.
- Setting visibility: hidden; makes an element invisible, but unlike `display: none;`, the element still takes up space in the layout.
- It's invisible but still affects layout and document flow.

#### <u>Use Cases of `visibility:hidden`</u>:

- Temporarily hiding elements **_without disrupting the layout_**.
- Useful in cases **_where you might want to show the element again without having to recalculate the layout_** or where the sudden appearance/disappearance of elements could cause a jarring shift in the layout.
- Creating tool tips or dropdown menus that appear in the same spot without affecting the surrounding elements position.

**<u>When to Use Each:**</u>

- Use `display: none`; when you need to remove an element entirely from the layout and document flow. This is **_<u>useful for responsive designs or when replacing an element with another</u>_**.
  <br/>
- Use `opacity: 0`; **_<u>for creating visual effects where the element transitions from invisible to visible or vice versa, especially in animations</u>_**. This property is best when you want an element to remain part of the layout and document flow, even when it's not visibly seen.
  <br/>
- Use `visibility: hidden`; when you want to hide an element but maintain its space in the layout. This is **_<u>ideal for UI elements that toggle between being shown and hidden, where maintaining the layout's stability is crucial</u>_**.

---

## 25. Float and Clear in CSS

- The `float` and `clear` properties in CSS are tools **for controlling the layout** of elements on a webpage, **_<u>particularly how elements align horizontally</u>_** and how they interact with each other in terms of flow and positioning.

- Float is a CSS positioning property **_primarily used for wrapping text around images_** or (for creating layouts where block-level elements are aligned side by side)
- **_Floated elements remain a part of the flow of the page, and will affect the positioning of other elements_** (e.g. text will flow around floated elements), unlike `position: absolute` elements, which is used to position an element completely out of the normal document flow.
- The CSS `clear` property can be used to positioned below `left/right/both` floated elements
- If parent element contains nothing but floated elements, its height will be collapsed to nothing which can be fixed by clearing the float after the floated elements in the container but before the close of the container.
- **_Floats <u>don't provide vertical alignment_</u>**.

#### Float:

- is used to <u>place an element to the left or right side of its container</u>, allowing other content to wrap around it
- The values for float can be `left`, `right`, or `none`

##### <u>Use Cases:</u>

- Text wrapping around images: Making text wrap around an image by floating the image to the left or right.
  <img src="https://user-images.githubusercontent.com/42731246/142733900-6bf11547-d3c4-4859-8644-93ba0f33adfd.png">
  <img src="https://user-images.githubusercontent.com/42731246/142733904-f91f36e8-a73a-4eb3-b224-a6d0a412c2d4.png">
  <img src="https://user-images.githubusercontent.com/42731246/142733910-c1b773eb-d273-4eab-b405-1a06ecf7adc0.png">

#### Clear:

- The clear property is used to prevent elements from floating alongside or wrapping around an element.
- It can clear floats to the left, right, or both sides of an element, **_<u>ensuring that the element appears below floated elements previously defined in the markup</u>_**.

##### <u>Use Cases:</u>

- **Stopping text wrap:** **_<u>Forcing text or other elements to appear below</u>_** a floated element instead of wrapping around it.
- **Creating separation**: **_<u>Ensuring that a section of content starts on a new line</u>_**, clear of any floated elements that precede it.

---

## 26. Position Static vs Position relative
<img src="https://user-images.githubusercontent.com/42731246/142733917-778ee809-00e5-4f84-9245-2564a89c1893.png">


## 27. Position Absolute vs Position Fixed

<img src="https://user-images.githubusercontent.com/42731246/142733925-f5c37232-391e-4a92-bc80-dae8c5591142.png">


## 28. Position sticky:

Ex:
position:sticky;
top:0;

<img src="https://user-images.githubusercontent.com/42731246/142733933-929db7f7-d8c6-46ea-978b-c15e70a41282.png">

**<u>More details are provided in this website**</u>:
https://dillionmegida.com/p/static-relative-absolute-fixed-sticky-positions/

---

## 29. Z-index

- z-index `controls the vertical stacking order of elements` that overlap each other.
- z-index only affects `positioned elements` (elements which have a position value which is not `static`) and its descendants or flex items
- Can be of Positive or negative whole numbers, determining the elements layer within its stacking context.
- if provided auto, the element inherits its stacking order from its parent.
- Higher z-index values mean the element will be closer to the front, overlaying elements with lower values.
- If two elements have the same z-index, the one that appears later in the HTML will be on top.
- Negative values are allowed which can place elements behind their parent stacking context.

**Stacking context**:

- is an element that contains a set of layers.
- within a local stacking context, the z-index values of its children are set relative to that element rather than to the document root.

<img src="https://user-images.githubusercontent.com/42731246/142733941-e25688fc-ac79-4a70-8159-c28d08057ca9.png">

**Use cases:**

- For complex web designs where **_<u>elements like modals, dropdowns, tooltips, and overlays must float above other content</u>_**.

---

## 30. Before and after pseudo-elements
<img src="https://user-images.githubusercontent.com/42731246/142733950-0f2aa177-b640-4517-8cb1-e7f9ce68a51c.png">
<img src="https://user-images.githubusercontent.com/42731246/142733952-dc0041e8-cccf-47d0-9782-2d7277d7b914.png">


---

## 31. Descendant and Child selectors

<img src="https://user-images.githubusercontent.com/42731246/142733967-2a410644-49e6-432b-b6f2-77dd080615e3.png">
<img src="https://user-images.githubusercontent.com/42731246/142733970-6a960f57-0da9-4084-88f9-6975baaec2be.png">


**Overview:**

- `.header h1`: This is a `descendant` selector. It **_<u>selects any h1 element that is inside a .header element, regardless of the level of nesting</u>_**. Both h1 elements within the header class are targeted by this selector. The color green is applied to these h1 elements.
  <br/>
- `.header > h1`: This is a `child` selector. It **_selects h1 elements that are direct children of .header_**.
- This means **_<u>it will only apply to h1 elements that are immediately wrapped by a div with the class header, but not h1 elements that are nested further within other elements</u>_** (like inside the ul within the header class). The color purple is assigned to these h1 elements.
  <br/>
- `div h1`: This is another descendant selector, **_but it is less specific than the first one_**
  <br/>
- `div > h1`: This is another child selector, similar to the second rule, but it applies to h1 elements that are direct children of any div, **_not just ones with the class header_**.

---

## 32. `first-line` and `first-selector`
<img src="https://user-images.githubusercontent.com/42731246/142734011-dac6468c-72e8-4537-9689-5c953c249e59.png">


## 33.
<img src="https://user-images.githubusercontent.com/42731246/142734015-03851fcf-56ec-45be-9037-fab64caf1740.png">


## 34. root element

- #### A `:root` selector defines the base font size as 10px.
<img src="https://user-images.githubusercontent.com/42731246/142734021-cec7dd92-0d3a-40fc-966f-65da86870c5b.png">
<img src="https://user-images.githubusercontent.com/42731246/142734027-5c957f87-b682-475e-a3e5-bb8c7c23e420.png">

works in rem as multiply operation
<img src="https://user-images.githubusercontent.com/42731246/142734030-26d0dcf2-da1f-4893-be90-6d85eac5c6a3.png">

- Elements with the class .absolute will have a font size of 24px. (No change here because this is not relative to the root font size. )
- Elements with the class .relative will have a font size of 15px, **_because 1.5rem is multiplied by the root font size of 10px_**.

---

## 35. Transition in CSS

<img src="https://user-images.githubusercontent.com/42731246/142734036-896cb717-7068-4b49-9bce-62c248f5d22a.png">

---

## 36. Animation
<img src="https://user-images.githubusercontent.com/42731246/142734043-5e73ab89-cb27-48df-b42e-d3117b5f27eb.png">
<img src="https://user-images.githubusercontent.com/42731246/142734047-c2cf61ba-0702-4330-bffa-04aa98f891f7.png">
<img src="https://user-images.githubusercontent.com/42731246/142734049-7837027a-563e-4205-8a8b-c77419cf94cf.png">
<img src="https://user-images.githubusercontent.com/42731246/142734051-f3c454cb-1755-4c47-aba6-ef7bcc62ac97.png">


- The animation-fill-mode property in CSS **_<u>specifies how a CSS animation should apply styles to its target before and after its execution_</u>**.
  <br/>

- **none**: The default value. The **<u>_animation will not apply any styles to the target before or after it is executing_</u>**.
  <br/>
- **forwards**: **<u>_After the animation completes (i.e., it finishes playing), the target will retain the style values that were set by the last keyframe of the animation_</u>** (the keyframe that is applied when the animation ends). This is often used when you want the state of the animation to be preserved after it finishes.
  <br/>
- **backwards**: The **_<u>target will apply the style values defined in the first keyframe, and these values will be applied as soon as the animation is applied to the target_</u>** (even before the animation starts). This is useful if you want the initial state of the animation to take effect during the period defined by animation-delay.
  <br/>

  both: The target **_<u>will follow the rules for both forwards and backwards</u>_**. It will get the style values from the first keyframe when the animation is applied, and retain the style values from the last keyframe after the animation completes.

---

## 37. CSS Variables
<img src="https://user-images.githubusercontent.com/42731246/142734059-5362e041-a75b-48b9-bc61-546cf057c8a5.png">


---

## 38. Box-shadow

```js
box-shadow: [horizontal offset] [vertical offset] [blur radius] [spread radius] [color];
```

```js
.element {
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
}
```

---

## 39. Flex vs Grid

The basic difference between `CSS Grid Layout` and `CSS Flexbox Layout` is that

- **_<u>flexbox was designed for layout in one dimension</u>_** - either` a row` or `a column`.

- Grid was **_designed for two-dimensional layout - rows, and columns at the same time_**

---

## 40. Position relative vs Position absolute

position: relative places an element relative to its current position without changing the layout around it, whereas position: absolute places an element relative to its parent's position and changing the layout around it.

---

## 41. What is CSS selector specificity and how does it work?

- The browser determines what styles to show on an element depending on the specificity of CSS rules.
- Four set of rules are calculated based on the following

```js
  a - is whether inline styles are being used.
  b - is ID selectors
  c - classes, attributes & pseudo classes selectors
  d - tags and pseudo-elements selectors

Ex: a, b, c, d
```

- In order to determine which has the highest specificity look from left to right (ex: 0 1 0 0) so b will override c and d in this case.
- In cases of equal specificity, the latest rule is the one that counts.
- If you have written the same rule into your stylesheet then the lower rule in your stylesheet is closer to the element to be styled.
- **It is a better practice to write CSS rules with low specificity so that they can be easily overridden if necessary without using too complicated CSS rules just for the sake of increasing specificity or resorting to !important**

---

## 42. What is the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?

- **Resetting**: Is meant to strip all default browser styling on elements. For e.g. **margins, paddings, font-size** of all the elements are reset to be the same.
  You have to redeclare styling for common typographic elements.

- **Normalizing**: **_<u>Preserves useful default styles</u>_** rather than `unstyling` everything. It also corrects bugs for common browser dependencies.

```js
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}
```

- If you want to start **_with an absolute blank slate and have strict control over every element’s styling_**, go for a `reset`.
  <br/>
- If you prefer a more hands-off approach, where common defaults are preserved and **_you only need to tweak certain elements_**, `normalization` might be better.

---

## 43. Describe BFC (Block Formatting Context) and how it works.

- `Block Formatting Context (BFC)` is a foundational concept **_in the CSS visual rendering of web pages_**.
- It's essentially **_a part of the box model that <u>deals with how block boxes are laid out and how they interact with each other</u>_**.

##### Understanding BFC is crucial for web developers and designers <u>as it affects the layout, clearing floats, and preventing margin collapse</u>. Here’s a detailed explanation of BFC and its workings:

#### What is BFC?

- A Block Formatting Context **_<u>is an area within the page layout where block boxes are placed and interact in specific ways_</u>**.
- It's **_<u>a context that defines a self-contained block that doesn't affect the outside elements</u>_** and isn't affected by them.
- **_Each BFC follows a set of rules for its internal layout_**, independent of its surroundings.

#### How BFC Works?

- When a BFC is created, it follows these principles:

#### 1. Vertical Layout:

- Elements inside a BFC **_are laid out in a vertical sequence_** according to their order in the source code.
- The vertical **_distances between these boxes are determined <u>by their margin properties</u>_**
- and in a BFC, **_<u>adjoining vertical margins of two or more boxes can combine to form a single margin_**</u>.

#### 2. Horizontal Containment:

- In a BFC, **_each box's <u>left outer edge</u> touches the <u>left edge of the containing block</u>_** (for languages that are left-to-right like English).
- This means the **_content of a box in a BFC doesn't overlap with float elements outside of that BFC_**.

#### 3. Containment of Floating Elements:

- BFCs are required to contain their floating elements. That means a BFC will expand vertically to encompass floats, preventing content from overflowing outside of its container.

#### 4. No Interaction Between BFCs:

- **_Elements outside a BFC do not affect the layout of elements inside the BFC_**. This isolation makes BFCs very useful for layout tasks, such as containing floats and avoiding unwanted margin collapse.

### 5. Block-Level Boxes:

- Within a BFC, boxes are treated as block-level on the vertical axis, even if they are inline-level elements outside of the BFC.

### Creating a BFC

#### Several CSS properties can trigger the formation of a new BFC:

- `display: flow-root`;
- `float: left;` or `float: right;` (any value other than none)
- `position: absolute`; or `position: fixed`;
- `display: inline-block;`, `display: table-cell;`, `display: table-caption;`, or other table-related values
- `overflow: hidden;`, `overflow: auto;`, or `overflow: scroll;` (any value other than visible)

### Use Cases of BFC:

- **Containing floats**: A common use of BFC is to contain floated elements within a parent element so that it doesn't collapse to a height of zero.
  <br/>
- **Preventing Margin Collapse**: Vertical margins between blocks can sometimes collapse into a single margin. Creating a BFC can prevent this from happening, maintaining the intended spacing.
  <br/>

- **Creating Self-Contained Layouts**: Since BFCs prevent elements outside from affecting the layout inside, they're great for creating components or sections of a page that need to be layout-isolated from the rest.

---

## 44. What are the various clearing techniques and which is appropriate for what context?

- In CSS, clearing techniques are **_used to ensure that elements are properly positioned and aligned in relation to floated elements within the layout_**.

1. `Clear: Both:`
   - This technique **_clears floats <u>from both sides of the element_</u>**.
   - It ensures that the **_<u>element will be displayed below any floated elements</u> that precede it in the HTML markup_**.

```js
.clearfix {
    clear: both;
}
```

2. `Clear: Left:`

   - This **_clears floats from the <u>left side of the element</u>_**.
   - It ensures that the **_element will be displayed below any floated elements to the left of it in the HTML markup_**.

```js
.clearfix {
    clear: left;
}
```

3. `Clear: Right:`
   - This <u>**clears** **_floats</u> from the <u>right side of the element</u>_**.
   - It ensures that the element will be displayed below any floated elements to the right of it in the HTML markup.

```js
.clearfix {
    clear: right;
}
```

4. `Clearfix Hack:`

- This is a popular clearfix technique **_used to contain floated elements_**.
- It involves adding a pseudo-element with `clear: both`
-

```js
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

```

5. Overflow: Auto:

   - Setting `overflow: auto` on a container element **_causes it to clear its floated children_**.
   - This technique is particularly **_useful when you want the container to expand to contain its floated children_**. Example:

```js
.container {
    overflow: auto;
}
```

**Usage:**

- `Clear: Both` is typically used **when you want an element to clear floats from both sides**. It's useful when you have floating elements on both sides of the cleared element.
- `Clear: Left` and `Clear: Right` are used when **you specifically want to clear floats from one side only**.
- `Clearfix Hack` is commonly **_<u>used to create self-clearing containers</u>_**, ensuring that the **_container wraps around its floated children_**.
- `Overflow: Auto` is useful **_<u>when you want a container to expand to contain its floated children, effectively clearing them without needing additional markup or styles.</u>_** However, be cautious with this approach as it may introduce unintended scrolling if the container's dimensions are constrained.

---

## 45. How would you approach fixing browser-specific styling issues?

#### 1. Identify the Issue

Use Browser Developer Tools: Modern browsers like Chrome, Firefox, and Safari have built-in developer tools. Use these to inspect elements and understand how different browsers are rendering your CSS differently.
**Test Across Browsers:** Use tools like BrowserStack, CrossBrowserTesting, or LambdaTest to test your website on different browsers and operating systems.

#### 2. Use a Reset or Normalize CSS

- `Reset CSS`: A reset stylesheet (like Meyer's Reset) removes all the native browser styling on elements. This means you start with a clean slate.
- `Normalize CSS`: Normalizing stylesheets (like Normalize.css) aim to make built-in browser styling consistent across browsers without removing styles that are useful for making accessible websites.

#### 3. Leverage CSS Prefixes for Browser Compatibility:

- Vendor Prefixes: Some CSS properties require vendor prefixes to work in specific browsers (e.g., -webkit-, -moz-, -ms-, -o-).
- Tools like `Autoprefixer` can automatically add these prefixes to your stylesheets based on current browser popularity and support data.

#### 4. Utilize Feature Detection

- **Modernizr**: Use a feature detection library like Modernizr to check if a browser supports a particular feature. This allows you to apply fallback styles or scripts when a feature is not supported.

---

## 46. How do you serve your pages for feature-constrained browsers?

- Feature-Constrained browsers means (such as those **_<u>on older devices_</u>** or in **_<u>environments with limited JavaScript support</u>_**),

### 1. Progressive Enhancement:

- **Concept**:
  - Start with a baseline of HTML content that is functional and accessible.
  - Then, enhance the experience with CSS for styling and JavaScript for interactivity, layered on top of the basic HTML.
  - This ensures that the core content and functionality are accessible even in browsers that do not support advanced features.
- **Implementation**:
  - **Use semantic HTML5 elements**,
  - ensure that all content can be accessed **_without_** JavaScript,
  - and progressively add enhancements for browsers that support them.

### 2. Graceful Degradation:

- **Concept**:

  - Design your site for the latest browsers first, **_then add fallbacks for older browsers_**. This is the opposite approach to progressive enhancement and can be more challenging to implement effectively.

- **Implementation**:
  - **_<u>Use feature detection libraries (like Modernizr) to check for browser capabilities and provide fallbacks or alternative experiences for feature-constrained browsers_**</u>

### 3. Responsive Web Design (RWD)::

- **Concept**:
  - Ensure your website's layout adapts to the screen size and capabilities of the device it's being viewed on.
  - RWD uses a combination of flexible grids, layouts, images, and CSS media queries.
- **Implementation**:
  - Design your site's layout to be fluid and flexible, use media queries to apply different styles for different screen sizes and resolutions, and ensure images and other media are scalable.

### 4. Server-Side Adaptation:

- **Concept**:

  - **_<u>Detect the user's device and browser server-side</u>, and deliver customized HTML, CSS, and JavaScript optimized for that particular environment_**.

- **Implementation**:

  - Use **_server-side tools or libraries to detect the user agent and serve different versions of your content based on the capabilities of the browser or device_**.

### 5. Feature Detection and Polyfills:

- **Concept**:
  - Use JavaScript to detect whether a browser supports a particular feature and then implement polyfills to add missing functionality.
- **Implementation**:
  - Before using a modern web feature, check if the browser supports it. If not, load a polyfill that emulates the feature for older browsers.

---

## 47. Have you ever used a grid system, and if so, what do you prefer?

- **Grid systems** are fundamental to web design because **_<u>they provide a structured layout system that makes it easier to design responsive</u>_** and aesthetically pleasing websites.

### 1. Bootstrap Grid:

- It's **_built with flexbox_** and is fully responsive.
- uses a series of containers, rows, and columns to layout and align content.

**<u>Why Preferred:**</u>

- It's part of the larger Bootstrap framework, which includes a wide range of components and utilities, making it a comprehensive solution for building responsive websites.

### 2. CSS Grid Layout:

- A powerful layout system **_native to CSS_** that provides a **_<u>way to create complex responsive layouts directly in CSS, without needing external libraries</u>_**.

**<u>Why Preferred:**</u>

- It offers a high level of control over layout design, **_making it easier to create complex, grid-based layouts with fewer lines of code_**.
- It's directly integrated into CSS, **_<u>so there's no need to load external libraries</u>_**.

### 3. Flexbox:

- Flexbox is often used as an alternative to grid systems for layout design.

**<u>Why Preferred:**</u>

- It's great for 1-dimensional layouts (either rows or columns), and when combined with CSS Grid, it offers a robust solution for most layout challenges.

### 4. Tailwind CSS:

- Tailwind **doesn't offer a grid system** in the traditional sense **_but <u>provides utility classes for flexbox and CSS Grid</u>_**, enabling developers to build custom grids with more granularity.

**<u>Why Preferred:**</u>

- It allows for highly customizable layouts without stepping out of the design system.
- Developers **_who prefer a <u>utility-first CSS framework often choose Tailwind</u> for its flexibility and efficiency_**.

---

## 48. What are the advantages/disadvantages of using CSS pre-processors? Describe what you like and dislike about the CSS pre-processors you have used.

- CSS preprocessors like `Sass`, `LESS`, and `Stylus` have become essential tools for **_<u>extending CSS with dynamic capabilities</u>_** such as `variables`, `nested rules`, `mixins`, `functions`, and more.

#### Advantages of CSS Pre-processors

**1. Variables for Dynamic Styles:**

- Allows the use of variables for colors, font stacks, or any CSS value.
- This makes it easier to maintain and update styles.
- Reduces repetition, **making code DRY** (Don't Repeat Yourself), and simplifies changes across large projects.

**2. Nesting:**

- Makes it possible to **nest selectors within one another**, **_mirroring the HTML structure_**.
- This can make stylesheets more readable and maintainable.
- Helps in organizing styles better, but over-nesting can lead to overly specific selectors and bloated CSS.

**3. Mixins and Functions:**

- Allows the creation of **_reusable blocks of code_**, **_enhancing maintainability and reducing repetition_**.
- Great for creating themes or responsive design patterns, but can lead to confusion if overused or not documented properly.

**4. Conditionals and Loops:**

- Provides the **_ability to use logic in your CSS, enabling dynamic generation of styles based on conditions or iterations_**.

- Adds powerful capabilities for complex styling scenarios but can make stylesheets harder to read for those not familiar with the preprocessor's syntax.

**5. Better Organization:**

- Supports **_splitting CSS into multiple files_** without worrying about the performance hit from multiple HTTP requests, **_as the preprocessor compiles all the imports into a single file_**.
- Simplifies codebase management and collaboration but requires good organization to prevent confusion.

#### Disadvantages of CSS Pre-processors

**1. Compilation Time:**

- Pre-processors **_need to compile to CSS, which can introduce a delay_**, especially in large projects.
- Can be mitigated with efficient build tools and development practices, but might be frustrating during rapid development cycles.

**2. Debugging:**

- Debugging **_can be more complex because the browser's developer tools show the compiled CSS_**, not the preprocessor source code.
- **_<u>Source maps have largely mitigated this issue by mapping the compiled CSS back to the preprocessor source files</u>_**.

---

## 49. How would you implement a web design comp that uses non-standard fonts?

- The process typically involves choosing the right font format, hosting the fonts, and then using CSS to apply them to your web design.

#### 1. Obtain the Fonts

- Obtain the font in web-friendly formats.
- The **_most common formats are WOFF_** (Web Open Font Format),
- `WOFF2` (an improved version of WOFF with better compression),
- `TTF/OTF` for older browsers,
- and `EOT` for older versions of Internet Explorer.

#### 2. Host the Fonts

- **Self-Hosting**: Upload the font files to your web server. This gives you full control over the font files and their delivery.

- **Using a CDN:** Alternatively, you can use a Content Delivery Network (CDN) to host the fonts. Some font providers offer CDN hosting.

- **Using Font Services**: Services like Google Fonts, Adobe Fonts, or others provide a wide range of fonts that can be easily integrated into your web projects without needing to host the font files yourself.

#### 3. Use CSS @font-face to Define the Fonts

- The `@font-face` rule in CSS **is used to define custom fonts for use on your website**. Here’s a basic example of how to use it:

```js
@font-face {
    font-family: 'MyCustomFont';
    src: url('path/to/font-file.woff2') format('woff2'),
         url('path/to/font-file.woff') format('woff'),
         url('path/to/font-file.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: 'MyCustomFont', sans-serif;
}
```

#### 4. Test Across Browsers and Devices

- Ensure the font displays correctly across different browsers and devices.
- This might involve adjusting the @font-face rule or troubleshooting any issues with font rendering.
- **Always specify fallback fonts** (like sans-serif or serif) **_so the browser can display text even if the custom font fails to load_**.

#### 5. Accessibility Considerations

- Ensure that the use of non-standard fonts does not negatively impact the accessibility of your website.
- Text should remain readable and accessible to users with disabilities.

---

## 50. Explain how a browser determines what elements match a CSS selector.

- it follows a specific process that involves parsing the CSS and creating a structure known as the CSSOM (CSS Object Model), which is similar to the DOM (Document Object Model) but for CSS.

#### 1. Parsing CSS

- The browser first parses the CSS stylesheets, whether they are inline styles or external CSS files
- During this parsing phase, the browser converts the CSS into a form it can understand and work with, organizing the rules into a structure

#### 2. Understanding Selectors

- CSS selectors are patterns used to select the elements you want to style
- A selector can target elements by their type (e.g., div), class (e.g., .className), ID (e.g., #idname), attributes, or their relationships with other elements (e.g., parent-child relationships or siblings).

#### 3. Matching Elements

- The browser then matches these selectors against the elements in the DOM. This process is generally done right-to-left, meaning the browser first looks at the key selector (the rightmost part of the selector) and then moves leftwards through the ancestors if the selector is a descendant selector, checking each part of the selector against the DOM elements.

- For example, in the selector `.parent` `.child`, `.child` is the key selector, and `.parent` is an ancestor selector.
- The browser first finds all elements that match `.child` and then checks if these elements have an ancestor matching `.parent`.

#### 4. Specificity and Cascade

- If **_<u>multiple rules target the same element</u>_**, the browser uses specificity and the cascade to determine which styles to apply.
- **_<u>Inline styles have the highest specificity</u>_**, followed by IDs, classes/attributes/pseudo-classes, and then element tags/pseudo-elements.
  - **_If specificity <u>is equal</u>, <u>the last rule defined in the CSS is applied</u> due to the cascade_**.

---

## 51. Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.

- The CSS Box Model is a fundamental concept in web design and development, describing how elements are rendered on the screen, including their spacing, borders, and dimensions.

##### The CSS Box Model comprises four main parts, from inside out:

**1. <u>Content:**</u> The actual content of the box, where text and images appear.
**2. <u>Padding:**</u> The space between the content and the border.
**3. <u>Border:**</u> Surrounds the padding (if any) and content. It's the edge of the box that can be styled in terms of thickness, color, and style.
**4. <u>Margin:**</u> The outermost layer, representing the space between the box and adjacent elements. Unlike padding, **_margin does not include background colors; it's completely transparent_**.

#### Different Box Models:

- CSS primarily uses the standard box model, but it can also adopt an alternative model known as the `"border-box"` model.

##### The difference between these models lies in how the size of the box is calculated:

####**<u>Standard Box Model (content-box)</u>:**

- In this model, the <u>`width` and `height` properties of an element specify the size of the content area</u>.
- Padding and borders are added outside of it.
- This means that the <u>actual size of an element is the width/height plus padding plus borders plus margins</u>.

#### **<u>Alternative Box Model (border-box) </u>:**

- In this model, the `width` and `height` properties **_include the content, padding, and border_**, **_<u>but not the margin</u>_**.
- This approach **_makes it easier to size elements because the padding and border do not affect the final size of the element_**.

```js
/* Standard box model */
* {
  box-sizing: content-box;
}

/* Border-box model */
* {
  box-sizing: border-box;
}

/* Apply border-box model to everything */
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

### Practical Use:

Using the `border-box` model **can simplify layout design**, especially for responsive designs, because **_<u>it allows you to more predictably size elements without having to perform calculations to account for padding and borders</u>_**. This is particularly useful in grid and flex layouts where you want precise control over the element sizes.

- In practice, many developers globally apply the border-box model to all elements on a page to simplify box sizing and ensure consistent layout behavior:

```js
*{
  box-sizing: border-box
}
```

---

## 52. What is the difference between the "nth-of-type()" and "nth-child()" selectors?

- The CSS selectors `:nth-of-type()` and `:nth-child()` are powerful pseudo-class selectors used to select elements **_based on their position within their parent element_**, but they target elements in slightly different ways.

#### `:nth-of-type()`

- Is more specific in its matching criteria.
- It selects an element **_<u>based on its position among siblings of the same type(i.e. same tag name) within their parent element</u>_**.
- **_<u>This selector ignores siblings that do not share the same tag name as the targeted element</u>_**.

#### Example Usage:

- p:nth-of-type(2) **_selects the second <p> element among its siblings_**, regardless of what other types of elements are present among the siblings.
- If there are other elements like <div> or <span> between the first and second <p> elements, they are ignored in the count.

#### `:nth-child()`

- The :nth-child() selector **_matches elements based on their overall position among a group of siblings within their parent element_**.
- It counts all types of elements, including different tags, and selects the element that matches the specified pattern.

#### Example Usage:

- p:nth-child(2) selects the second child of its parent only if it is a <p> element. If the second child is, say, a <div>, then it won't be selected.
- :nth-child(odd) selects all odd-numbered children within their parent, regardless of the element type.

#### Key Differences

- Sibling Count Basis: :nth-child() considers all child elements regardless of type, whereas :nth-of-type() only counts siblings of the same element type.
- Use Cases:
  - Use :nth-child() when you want to style elements based on their absolute position within their parent, regardless of their type.
  - Use :nth-of-type() when you want to style elements based on their position relative to other siblings of the same type.

```js
<ul>
  <li>Item 1</li>
  <span>Not an item</span>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

- li:nth-child(2) would not select any <li> element in this list because the second child is a <span>.
- li:nth-of-type(2) would select "Item 2" because it is the second <li> element, ignoring the <span> element in the count.

#### This distinction makes `:nth-of-type()` particularly useful for styling elements in situations where the HTML structure includes mixed types of elements, allowing for precise targeting without altering the structure.

---

## 53. Is there any reason you'd want to use translate() instead of absolute positioning, or vice-versa? And why?

### <u>Using Translate for positioning:</u>

- `translate()` is a CSS function used with the `transform` property.
- It **_<u>moves an element from its current position along the x-axis (horizontal move), y-axis (vertical move), or both, without affecting the layout of other elements</u>_**.

#### Advantages of using translate():

- it can **_result in smoother animations and transitions_**, especially on mobile devices and low-power displays (Which results in better performance.)
- elements moved with translate() **_doesn't affect the document's flow_**. This means the space the element originally took up is preserved and other elements are not repositioned as a result of the move.
- <u>**_allows for_** **_sub-pixel rendering_**</u>, which can make animations appear smoother by not being restricted to the pixel grid.

#### Usage:

- **_Adjusting an element's position as part of a hover effect_** or interaction without impacting the overall layout.
- **_Layering elements over one another for effects_** like parallax scrolling.

### <u>Using Absolute for positioning:</u>

- **_<u>Removes an element from the normal document flow and positions it at specific coordinates relative to its nearest positioned ancestor</u>_** (not static).
- It's a powerful tool for layout control but **_requires careful management_**.

#### Advantages of using absolute :

- Allows elements to be **_<u>placed precisely where you want them within a container</u>_**, which is **_useful for complex layouts or overlapping elements_**.
- Since it removes the element from the document flow, **_<u>it can be used to overlay elements without affecting the positioning of other elements_**</u> around it.

#### Disadvantages of Absolute Positioning:

- Can **_lead to layouts that are harder to maintain, especially with responsive design,_** as the positioned elements might not adjust well to different screen sizes.
- Requires a positioned ancestor to work predictably, which can add complexity to your CSS.

#### Use Cases for Absolute Positioning:

- **_<u>Overlapping elements, such as a modal or tooltip, where you need the element to float above other content</u>_**.
- Precise placement of elements in a layout where the normal document flow does not achieve the desired effect.

### Choosing Between translate() and Absolute Positioning?

- **For Animations and Transitions**: Prefer translate() **_<u>for its performance benefits and smoother rendering, especially for movements or scaling</u>_**.
- **For Static Layouts:** Use absolute positioning **_when you need to place elements very specifically outside the normal document flow_**, like in a custom dropdown menu or a complex graphic layout.

---

## 54. Can you explain the difference between px, em and rem as they relate to font sizing?

- #### px (Pixels):

  - A px is a unit of measure **corresponding to <u>a single pixel</u> on a screen**.
  - Pixel values are fixed and **_<u>do not change based on the parent element's font size</u>_**. **This makes px very straightforward to use**, as 1px will always be the same size, providing consistency across different elements and layouts.
  - `px` is useful **<u>when you need precise control over element sizing, such as with borders or fixed-size elements</u>**.
  - However, because it's an absolute unit, **<u>it's less flexible when creating responsive designs or improving accessibility for users**</u> who may prefer larger text sizes.

- #### em (Relative to Parent Element)

  - An `em` is a scalable unit that is **relative to the <u>font size of its parent element</u>**.
  - If you set a font size in `em` for an element, **<u>it will be calculated relative to the font size of its direct or nearest specified parent</u>**.
  - **Ex:** For example, **<u>if a parent element has a font size of 16px, 1em in a child element would equal 16px</u>**. If the child element's font size is set to 2em, it would be 32px.
  - `em` is particularly **useful for creating scalable designs that maintain relative sizes within components**. It's beneficial for responsive typography and elements that should scale according to their parent element's font size.

- #### rem (Relative to Root Element)
  - The rem unit is similar to em, but it's relative to the root element (html) of the document, not the parent element.
  - This means that 1rem is always equal to the font size of the root element. If the root element's font size is 16px (which is the default in most browsers), then 1rem equals 16px. Changing the font size of the root element will scale all rem-based sizes throughout the document.
  - rem is excellent for establishing a consistent, scalable foundation for your site's typography and layout spacing. It's especially useful for global sizing and spacing (like margins and paddings), allowing for easy scaling and adjustments while maintaining consistency across the site.

### Summary:

- `px`: Fixed size, good for precision but less flexible for responsive designs.
- `em`: Relative to the parent's font size, great for component-specific scaling.
- `rem`: Relative to the root element's font size, ideal for global site typography and layout consistency.

---

## 55. Why don't CSS properties apply when selectors are mixed up with different cases?

- CSS selectors **_are case-sensitive_** depending on the document language. This case sensitivity affects not only selectors (e.g., IDs, classes) but also attributes when using attribute selectors. The impact of case sensitivity in CSS can lead to situations where CSS properties do not apply if selectors are mixed up with different cases.
- To avoid issues related to case sensitivity, it's a good practice to adopt a consistent naming convention for your classes, IDs, and other selectors. Many developers prefer using lowercase with dashes (e.g., .my-class) for CSS classes and IDs to maintain readability and prevent case-related issues.

---

## 56. Do padding-top or padding-bottom have an effect on inline elements?

- unlike **margin-top and margin-bottom**, which generally **have no effect on inline elements**, **_`padding-top` and `padding-bottom` applied <u>to inline elements do have an effect</u>_**, but with some nuances in how they are rendered:
- Applying `padding-top` and `padding-bottom` to inline elements **_increases the visual space around the content_** inside the element. This padding is rendered inside the element, **pushing away the element's content from its border** (if any).
- **<u>they do not affect the line height of the surrounding text</u>**. This means the extra space added by the padding may overlap with adjacent lines of text if the line height is not sufficiently large to accommodate it.
- The **_vertical padding on an inline element <u>does not change the height of the line box</u>_** itself.
- This is a **_<u>key distinction from block elements</u>_**, where **padding directly contributes to the overall height of the element**.

---

## 57. Do padding-left, padding-right, margin-left, or margin-right have an effect on inline elements?

- Yes, `padding-left`, `padding-right`, `margin-left`, and `margin-right` **_<u>do have an effect on inline elements</u>_**.
- **_These properties add space to the left and right sides of an inline element, <u>affecting its overall width but not disrupting the inline flow</u>_** of the document.

#### Padding on Inline Elements

- These properties **_increase the space inside the element_**, **_<u>between its content and its border_**</u>.
- This can visually separate the element's content from its surroundings without affecting the line height or the vertical alignment of the inline flow.

#### Margin on Inline Elements

- **_These properties add space outside the element_**, between the element and its neighboring elements.
- Margins are effective **for horizontally spacing inline elements** apart from each other.
  <br/>

- **Horizontal Spacing**: Both padding and margin properties on the left and right sides are useful for adjusting the horizontal spacing of inline elements, such as links within a text or span elements within a paragraph. This can improve readability and visual appeal.
  <br/>

- **No Disruption to Inline Flow:** Unlike block elements, where margins can collapse, the **<u>left and right margins on inline elements simply add space between adjacent inline elements without affecting the vertical flow or layout of the document**</u>.
  <br/>
- **Use for UI Components**: These properties are particularly useful for styling inline elements like buttons or links within text, allowing for subtle adjustments to spacing that improve usability and aesthetics.

- Consider a simple HTML paragraph with inline elements styled with margins and padding:

- In this example, the `<span>` element will have additional space to its right due to both the margin and padding.
- This spacing can help separate the span content from the surrounding text, making it more distinct.

```js
<p>
  This is a <span style='margin-right: 10px; padding-right: 5px;'>sample</span>
  text.
</p>
```

<u>**Conclusion:**</u>

- While the **top and bottom margins and padding** **_<u>do not affect the line height or vertical spacing of inline elements</u>_**, **the <u>left and right margins and padding effectively adjust horizontal spacing</u>**. This characteristic allows for nuanced design choices within the inline flow of text, enhancing readability and visual separation of inline elements without disrupting the overall layout.

---

## 58. If you have a `<p>` element with font-size: 10rem, will the text be responsive when the user resizes or drags the browser window?

- The responsiveness of text styled with a font-size set in rem units to browser window resizing **<u>depends on how the root font size (typically defined on the `<html>` element) is set up</u>**.
- The `rem` unit is relative to the root element's font size in CSS.
- **_If the root font size is static_** (e.g., defined in pixels), then resizing or dragging the browser window **_won't directly affect the size of the text set in rem units_**.
- However, **_<u>if the root font size is defined relative to the viewport width (vw), viewport height (vh)</u>_**, or through a responsive design technique, **_<u>then the text size can indeed respond to changes</u>_** in the browser window size.

```js
html {
  font-size: 16px; /* Static font size */
}
p {
  font-size: 10rem; /* Will not respond to window resizing */
}
```

```js
html {
  font-size: 2vw; /* Responsive font size based on viewport width */
}
p {
  font-size: 10rem; /* Will respond to window resizing */
}

```

---

## 59. The pseudo-class :checked will select inputs with type radio or checkbox, but not elements. True or False?

- True.
- The `:checked` pseudo-class in CSS **_<u>is used to select elements that are checked or selected_**</u>, such as `<input>` elements of type radio or checkbox.
- It **<u>does not apply</u> to other elements <u>that do not have a checked state</u>**. T
- This pseudo-class is particularly useful for styling custom radio buttons, checkboxes, or even for creating toggle switches by styling the appearance of these inputs when they are in their checked or selected state.

---

## 60. In an HTML document, the pseudo-class :root always refers to the element. True or False?

- True.
- In an HTML document, the `:root pseudo-class` **_<u>always refers to the root element, which is the `<html>` element_**</u>.
- The :root pseudo-class is a **_<u>useful way to declare global CSS variables</u>_** or to apply styles <u>that should affect the entire document from its root</u>.
- It's effectively equivalent to the `<html>` selector in HTML documents **_<u>but with higher specificity</u>_**, making it a powerful tool for defining styles that are intended to be universal or for setting CSS custom properties (variables) that can be used throughout the document.

---

## 61. Can the translate() function move the position of an element on the z-axis?

- Yes,
- the translate() function in CSS **_<u>can move the position of an element along the z-axis</u>_**, but this is specifically **_<u>done using the translateZ() function</u>_** or **_<u>by specifying a third value in the translate3d() function_**</u>.

```js
transform: translateZ(20px);
```

```js
transform: translate3d(10px, 20px, 30px);
```

---

## 62. Which unit of measurement would you prefer among px, em, %, or pt, and why?

#### px(pixels):

- **<u>Preferred for: Fixed layouts</u>**, and when precise control over element sizes is needed.
- preferred for desktop-centric designs or where exact dimensions are required but modern web practices increasingly favor responsive design

#### em :

- **<u>Preferred for: Scalable layouts</u>, typography, and when relative sizing to the parent element is desired**.

#### % :

- **_<u>Preferred for: Responsive layouts</u>, fluid designs, and when you want sizes to be relative to parent container dimensions_**.

#### pt(points) :

- **_<u>Preferred for: Print stylesheets, where physical dimensions are more relevant_**</u>.

---

## 63. Does overflow: hidden create a new block formatting context?

- Yes, setting overflow to hidden (as well as scroll or auto) on an element **_can create a new block formatting context (BFC)_**.
- A block formatting context **is a part of the visual CSS rendering of a web page**, **_<u>where block boxes are laid out</u>_**.
- When a new BFC is formed, **_<u>it changes how elements within that context interact with each other</u>_**, particularly in terms of layout and the containing box.

#### Block Formatting Context (BFC) and Its Impact

- Creating a BFC has several important effects on the layout:
  <br/>

**Floats**: Inside a BFC, **_<u>floating elements interact only with other elements within the same BFC</u>_**. This can be used to contain floats, avoiding the need for the clearfix hack.
<br/>

**Margins**: Vertical margins between blocks in the same BFC collapse, but **_creating a new BFC <u>prevents margin collapse between elements in separate BFCs</u>_**.

**Containment**: Setting overflow to hidden on an element **_<u>can be used to clip overflow and contain child elements layout effects within the element</u>_**, making it particularly useful for complex layouts.

#### The practical use of overflow: hidden to create a new BFC is often seen in layouts where:

- You **_<u>need to contain floated elements</u>_** without them affecting the outside layout.
- You want to **_<u>prevent outer margins from collapsing with inner margins</u>_**.
- You aim to clip all content to the element's borders if it overflows.

#### Example

Here's a simple example to demonstrate how overflow: hidden can create a BFC and contain floats:

```js
<div class='container'>
  <div class='floated'>Floated Content</div>
</div>
```

```css
.container {
  overflow: hidden; /* Creates a new BFC */
}

.floated {
  float: left;
}
```

- In this case, the .container will create a BFC, containing the floated .floated element, ensuring that the container's height adjusts to contain the floated element, which might not happen without establishing a new BFC.

---

## 64. How can you apply CSS rules specific to a media query?

- To apply CSS rules specific to a media query, you use the @media rule in CSS.
- Media queries allow you to apply styles to your document based on the condition of media features like viewport dimensions (width and height), screen resolution, orientation, and more.

```js
// screen width
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}

```

```js
// screen orientation
@media (orientation: portrait) {
  /* Styles for portrait orientation */
  body {
    background-color: lightgreen;
  }
}

@media (orientation: landscape) {
  /* Styles for landscape orientation */
  body {
    background-color: lightcoral;
  }
}

```

```js
//combined
@media (min-width: 600px) and (orientation: landscape) {
  .container {
    width: 80%;
  }
}

```

---

## 65. What is the use of the only keyword in media queries?

- The only keyword in media queries is used as a way to prevent older browsers that do not support media queries from applying the styles defined within the media query block.
- Its primary purpose is to enhance compatibility and ensure that styles intended for specific media types or conditions are not incorrectly applied by browsers that do not fully understand media queries.
- When the only keyword is used, it signals to the browser that the enclosed styles should only be applied if the browser supports the media query syntax.
- Browsers that do not recognize media queries will ignore the entire block, thus avoiding potential layout issues that could arise from partially or incorrectly applied styles.
- If the only keyword is omitted, the media query still works in modern browsers, but older browsers that recognize the media type (like screen, print, etc.) but do not support the full media query syntax might still apply the contained styles, leading to unintended consequences.

```js
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}

```

---

## 66. Does the screen keyword in media queries apply to the device's physical screen or the browser's viewport?

- The `screen` keyword in CSS media queries **_<u>refers to the type of device being used to display the content</u>_**, specifically targeting screens as opposed to other output devices like printers.
- However, it does not directly refer to the device's physical screen in terms of hardware. Instead, **_<u>it applies to the browser's viewport,</u>_** which is the area of the screen used to display web content.
- This does not necessarily correspond to the entire physical screen size **_but rather to the available display area for web content, which can be affected by the browser window size, screen resolution, and device-specific settings like zoom level_**.

```js
@media screen and (min-width: 768px) {
    /* CSS rules here */
}

```

---

## 67. Can you name some pseudo-classes you have used in CSS?

- In CSS, pseudo-classes are used to define a special state of an element.

1. **:hover** - Applies when the user hovers over an element with the mouse pointer.
2. **:focus** - Applies when an element has focus.
3. **:active** - Applies when an element is being activated by the user, typically through clicking or tapping.
4. **:visited** - Applies to links that have been visited by the user.
5. **:link** - Applies to links that have not yet been visited.
6. **:first-child** - Targets the first child element within its parent.
7. **:last-child** - Targets the last child element within its parent.
8. **:nth-child(n)** - Targets the nth child element within its parent, where n can be a number, a formula, or even keywords like 'even' or 'odd'.
9. **:nth-of-type(n)** - Similar to `:nth-child(n)` but targets the nth element of a specific type within its parent.
10. **:not(selector)** - Excludes elements that match the given selector.
11. **:checked** - Applies to input elements that are checked, like checkboxes or radio buttons.
12. **:disabled** - Targets elements that are disabled.
13. **:enabled** - Targets elements that are enabled.
14. **:focus-within** - Applies to an element if it or any of its descendants are focused.
15. **:root** - Targets the document's root element, typically `<html>`.

---

## 68. How do you vertically and horizontally align a `<p>` element to the center inside a `<div>`?

```html
<div class="div-container">
  <p>This is a paragraph.</p>
</div>
```

#### Method 1: Flexbox

```js
.div-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 200px; /* Set to desired height */
}
```

---

#### Method 2: Grid

```js
.div-container {
  display: grid;
  place-items: center; /* Center both vertically and horizontally */
  height: 200px; /* Set to desired height */
}
```

---

#### Method 3: Absolute Positioning

```js
.div-container {
  position: relative;
  height: 200px; /* Set to desired height */
}

.div-container p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Adjust for the element's own dimensions */
}

```

---

## 69. How can you optimize CSS selectors for better performance?

- Optimizing CSS selectors **_<u>can significantly impact the rendering performance of a webpage, especially on large documents or on devices with limited processing power</u>_**.

#### 1. Keep Selectors Short and Specific

#### 2. Avoid Universal Selectors

- Universal selectors (\*) are costly because they match every single element in the document. Use them sparingly and avoid complex universal selector patterns.

#### 3. Minimize the Use of Expensive Properties

- Avoid expensive properties like `:nth-child`, `:nth-of-type`, and attribute selectors ([attribute="value"]) **_<u>can be more expensive to process</u>_**.

#### 4. Use Class and ID Selectors When Possible

- These are among **_<u>the fastest selectors for browsers to process because they are directly linked to specific elements, reducing the need for complex DOM traversal</u>_**.

#### 5. Avoid JavaScript-based Selectors in CSS

- JavaScript in CSS: **Avoid using selectors that rely on JavaScript or are designed to mimic JavaScript behavior**, **_<u>such as :hover on non-link elements</u>_**.
- These can cause `re-rendering` and `performance` issues.

#### 6. Optimize Contextual Selectors

- Be cautious with descendant selectors (e.g., .parent .child) as they can cause browsers to perform extensive DOM traversal. Limit their depth and complexity.
- Prefer child selectors over descendant selectors when possible, as they are more efficient by limiting the scope of matching.

#### 7. Leverage CSS Preprocessing

- Tools like SASS or LESS can help organize and optimize selectors before compiling them into CSS, allowing for cleaner, more efficient code.

#### 8. Avoid Inline Styles

- inline styles can slow down rendering because they increase page size and force browsers to spend more time parsing and applying styles.

---

## 70. How can you load CSS resources conditionally in a web page?

#### These conditions might include <u>media queries (for responsiveness)</u>, <u>feature detection</u>, <u>browser detection</u>, <u>or loading styles dynamically</u> based on user interactions

#### 1. Media Queries

```js
// media queries -  Loading a CSS file for screens wider than 768px.
<link rel='stylesheet' media='(min-width: 768px)' href='wide-screen.css' />
```

#### 2. Feature Detection with JavaScript

- `Modernizr` is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser.
- You can use it to conditionally load CSS files based on feature support.

```js
if (Modernizr.flexbox) {
  loadCSS('flexbox.css');
}

function loadCSS(href) {
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = href;
  document.head.appendChild(cssLink);
}
```

#### 3. JavaScript Conditions

```js
if (condition) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'path/to/your/css/file.css';
  document.head.appendChild(link);
}
```

#### 4. Using CSS @import with Media Queries

#### <u>Within a CSS file, you can use the @import rule combined with media queries</u> to load additional CSS files conditionally.

```js
@import url("wide-screens.css") screen and (min-width: 1200px);
```

---

## 71. Why would you use sprites in CSS?

- Using sprites in CSS is a technique **_<u>to improve web performance and manage multiple images more efficiently</u>_**
- A sprite **_<u>is a single image file that contains multiple images_**</u>.

##### Here are the key reasons for using CSS sprites:

#### 1. Reduced HTTP Requests

- Every image on a webpage typically requires a separate HTTP request to load.
- **_<u>By combining multiple images into a single sprite, you reduce the number of HTTP requests needed to load a page</u>_**.
- This can significantly speed up page loading times, especially on websites with many small images, like icons.

#### 2. Reduced Bandwidth Usage

- Since the sprite combines multiple images into one, **_<u>it can be optimized to use less bandwidth than the total size of the individual images</u>_**.
- Efficient use of sprites **_<u>can help in reducing the overall size of web resources</u>_**, further improving load times and saving bandwidth.
- Sprites allow for precise control over the display of images. **_<u>By adjusting the background-position CSS property, you can display any part of the sprite as needed</u>_**. This ensures consistent visual presentation of images across different parts of your site.
- Sprites **_<u>can be effectively used for interactive elements like buttons or links</u>_**, where one part of the sprite is shown by default and another part is revealed on hover.

#### 3. Browser Caching

- Since the sprite is a single image file, **_<u>it can be cached by the browser after the first load</u>_**. This means that on subsequent page visits or on different pages of the site that use the same sprite, the images are loaded from the cache rather than downloaded again, further improving load times and user experience.

---

## 72. What do you know about CSS transitions?

- Specifies the CSS property or properties that the transition effect will apply to.
- You can animate properties like `opacity`, `width`, `background-color`, etc.
- **Transition Duration**: Determines how long the transition effect should last. The duration is typically defined in seconds (s) or milliseconds (ms).
- **Transition Timing Function**: <u>Controls the pacing of the transition</u>. Common values include linear, ease, ease-in, ease-out, and ease-in-out, among others defined by cubic-bezier curves.
- **Transition Delay**: Specifies a delay before the transition starts. Like the duration, it's defined in seconds (s) or milliseconds (ms).

```js
/* Shorthand */
transition: property duration timing-function delay;

/* Individual Properties */
transition-property: property;
transition-duration: duration;
transition-timing-function: timing-function;
transition-delay: delay;
```

```js
div {
  width: 100px;
  height: 100px;
  background-color: blue;
  transition: background-color 0.5s ease-in-out;
}

div:hover {
  background-color: red;
}
```

#### Use Cases

- Hover Effects: Changing colors, sizes, or other properties of elements on hover.
- Dynamic Layouts: Animating changes in layout or positioning as part of responsive design or user interactions.
- Visual Flair: Adding polish and dynamism to web pages with subtle animations.

#### Summary:

- CSS transitions offer a simple yet powerful way to add animation to web elements, enhancing user experience and interactivity without the need for complex JavaScript animations. By understanding and utilizing transitions, developers can create more engaging and visually appealing web content.

---

## 73. Name some different CSS filters you can use to modify elements.

- CSS filters provide a powerful way to visually modify HTML elements directly in the browser, applying graphical effects like blurring, brightness adjustment, and color shifts.

1. blur(): Applies a Gaussian blur to the element. The parameter defines the blur radius. For example, filter: blur(5px); adds a moderate blur.
2. brightness(): Adjusts the brightness of the element. Values over 100% increase brightness, while values under 100% decrease it. For instance, filter: brightness(50%); dims the element.
3. contrast(): Changes the contrast of the element. Values above 100% increase contrast, values below 100% decrease contrast. Example: filter: contrast(200%); significantly increases contrast.
4. drop-shadow(): Applies a shadow effect similar to box-shadow, but to the image's alpha mask. The parameters define the shadow's offset, blur radius, and color. Example: filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.5));.
5. grayscale(): Converts the element to grayscale. A value of 100% is completely grayscale, while 0% shows the original color. Example: filter: grayscale(50%); applies partial grayscale.
6. hue-rotate(): Applies a hue rotation on the image. The angle parameter defines the rotation amount. Example: filter: hue-rotate(90deg); rotates the hues by 90 degrees.
7. invert(): Inverts the colors of the element. 100% is fully inverted, while 0% is the original state. Example: filter: invert(100%); inverts all colors.
8. opacity(): Adjusts the opacity of the element. 0% is completely transparent, 100% is fully opaque. Example: filter: opacity(50%); makes the element semi-transparent.
9. saturate(): Adjusts the saturation level of the element. Values above 100% enhance saturation, while below 100% decrease it. Example: filter: saturate(200%); increases color saturation.
10. sepia(): Applies a sepia tone to the element, making it resemble an old photograph. 100% is fully sepia-toned. Example: filter: sepia(60%); applies a moderate sepia effect.

```js
filter: grayscale(50%) blur(2px);
```

---

## 74. What is the difference between layout and positioning in CSS?

- The **layout** in CSS refers to the **_<u>way in which elements are structured and organized in relation to each other within a container</u>_** or the entire web page.
- It involves the arrangement of elements in a systematic, grid-like, or flexible manner to create a coherent structure for the web content.
- Layout techniques primarily dictate how elements are sized, stretched, shrunk, and aligned with respect to their parent containers and sibling elements. Common layout models include:

**Block Layout**: The default web layout where elements are stacked vertically.
**Flexbox**: Flexbox makes it easier to design flexible and responsive layouts with items that align and distribute space within a container.
**Grid Layout**: **Provides a two-dimensional grid-based layout system**, offering more control over the placement and sizing of elements across rows and columns. It's especially useful for complex layouts and responsive designs.
**Table Layout**: Though originally intended for tabular data, table display properties can be used for layout purposes, organizing content in a row and column format.

### Positioning

- Positioning in CSS, on the other hand, **_<u>deals with the precise placement of elements at specific locations on the web page</u>_**, often **_<u>regardless of the normal document flow</u>_**. It allows for the overlapping of elements, layering, and placing elements outside their natural order in the layout. CSS offers several positioning schemes:

**Static Positioning**: The default positioning model where elements are laid out according to the normal document flow.
**Relative Positioning**: Positions an element relative to its normal position in the document flow, without removing it from the flow. It can be used to nudge elements in particular directions.
**Absolute Positioning**: Removes an element from the normal document flow, positioning it relative to its nearest positioned ancestor or the viewport if there is none. This is useful for creating overlays or complex, precise arrangements.
**Fixed Positioning**: Similar to absolute positioning, but the element is positioned relative to the viewport, meaning it stays in the same place even when the page is scrolled.
**Sticky Positioning**: A hybrid of relative and fixed positioning. An element is treated as relatively positioned until it crosses a specified point, then it is treated as fixed positioned.

**Conclusion**:
While **<u>layout focuses on the overall structure and organization of elements within a container</u>** or the entire page, `positioning` is concerned with the precise location of elements, often allowing for more creative and dynamic arrangements that **_<u>can break away from the normal flow of the document</u>_**. Both concepts are essential for creating effective, responsive, and visually appealing web designs.

---
