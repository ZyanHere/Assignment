### React Reconciliation

#### Q1) What is the reconciliation algorithm in React?

- Reconciliation is the **_<u>process through which React updates the Browser DOM</u>_**.
- React **compares the Virtual DOM with Real DOM**. It **_finds out the changed nodes and updates only the changed nodes in Real DOM_** leaving the rest nodes as it is. This process is called Reconciliation.

##### Important concepts behind the working of the Reconciliation process are: `Virtual DOM` and `Diffing Algorithm`

1. **Virtual DOM:**

   - Is a react representation of the actual DOM.
   - It is nothing but an object created to replicate the actual DOM.
   - When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one.
   - Comparison is done by **Diffing Algorithm**
   - Then it **_updates the Browser DOM with the least number of changes possible_** without rendering the entire DOM again

2. **Diffing Algorithm:**

   - React uses a heuristic algorithm called the Diffing algorithm for reconciliation based on these assumptions:

##### React <u>checks the root elements for changes</u> and the <u>updates depend on the types of the root elements</u>,

1. Two **_<u>elements of different types will produce different trees</u>_**
2. Whereas while comparing two **_<u>elements of same type</u>_**, keep the underlying node as same and **_<u>only update changes in attributes or styles</u>_**.

- This is much more efficient than destroying and recreating the node, as it minimizes the amount of DOM manipulation required.

4. The developer can hint at **_which child elements may be stable across different renders with a <u>key prop</u>_**

<img src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*OQyR8JbMneYzqVGStNYCTg.png">
