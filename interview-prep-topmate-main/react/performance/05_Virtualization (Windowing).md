### React Virtualization

- Is a powerful technique **for creating high performing user interfaces <ins>that only displays the elements currently in use**</ins>.
- Whether you use a React virtualized library or build your own algorithm, the technique is <ins>***specifically designed to handle large datasets and improve UI performance***</ins>.
<br/>

- ***<ins>By selectively rendering only the elements needed at any given time, virtualization in React leads to faster load times and a smoother user experience overall</ins>***.

<br/>

**How it works**:

- Virtualization libraries, such as `react-window` or `react-virtualized`, <ins>**_create a window (a fixed height and width) within which they render only the items that are currently visible_**. </ins>
  <br/>

- As the **user scrolls**, <u>the libraries efficiently **_update the rendered items, replacing the ones that go out of the visible window_** with new ones that come into view.</u>

<br/>

- **_Consider the following example:_**

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*mSZz3jEhxmiQj1gn">

- Virtualization **can be applied to tables**, **<ins>where both rows and columns can be virtualized</ins>** to achieve significant performance improvements.
- This technique is <ins>**especially useful for components that display large amounts of data, such as tables**</ins>.
- By only rendering the rows and columns that are currently visible, virtualization in react can greatly improve the performance of these components.

- Let's illustrate at the following example

<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/0*PIzNioZgsxHVelKR">

**Note:**

- If you would like **_to implement your own virtualized tables or lists_**, I recommend this <u>**_react-window package_**</u>, which provides all the necessary tools to virtualize your components.

<u>**Benefits**:</u>

- **Reduced Memory Usage:**

  - By rendering only the visible items, <ins>**_virtualization significantly reduces the number of DOM elements in the document_**</ins>, leading to better memory management and improved performance.
<br/>

- **Faster Rendering**:
  - <ins>Rendering a **_smaller subset of items allows for faster rendering_**, as the browser spends less time processing and painting DOM elements</ins>.
<br/>

- **Smooth Scrolling**: 

    - Virtualization libraries <ins>***optimize scrolling performance***, resulting in smoother and more responsive user interactions.</ins>