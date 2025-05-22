#### 1. What is re-render in react?

- <strong>re-render is something happens when React needs to update the application with some new data.</strong> Usually this happens as a result of a user interacting with the app (or data coming through an async request)

##### Two major stages that we need to care about when comes to React performance :

- <strong>initial-render</strong> - happens when a component first appears on the screen.

- <strong>re-render</strong> - happens when any consecutive render of a component that is already on the screen.

##### Then what are necessary and un-necessary re-render?

- <strong>Necessary re-render</strong> - re-render a <strong>Component when it directly uses the new information.</strong> For example, if a user types in an input field, the component that manages its state needs to be updated itself on every keystroke (i.e re-render)

<br/>

- <strong>Unnecessary re-render</strong> - re-render a Component that is propagated through the app via different re-renders mechanism due to mistake or inefficient app architecture. For example: If a user types in an input field and the <strong>entire page re-renders on every keystroke, the page has been re-rendered unnecessarily.</strong>

<strong><ins>Note:</ins></strong> If re-renders happen too often on very heavy components this could lead to user experience appearing "laggy", visible delays in interaction, or app becoming completely un-responsive.

---

#### 2. When React component re-renders itself?

There are four reasons why a component would re-render itself

1. state changes
2. parent (or children) re-renders
3. context changes
4. hooks changes

<strong><ins>Note:</ins></strong> re-renders doesn't happen when the component's props change.

#### i) Re-renders reason during state changes:

- When a component's state changes, it will re-render itself. Usually it happens either in a callback or in in useEffect hook.

<img src="https://www.developerway.com/assets/react-re-renders-guide/part2-state-changes-example.png">

#### ii) parent re-render reason:

- If a parent component re-renders then the component will be re-rendered.
- Or, When a component re-renders, it also re-renders all its children.
- It always goes "down" the tree

<strong><ins>Note:</ins></strong> The re-render of a child doesn't trigger the re-render of a parent.

##### Refer this below article for more details: https://www.developerway.com/posts/react-elements-children-parents

<img src="https://www.developerway.com/assets/react-re-renders-guide/part2-parent-example.png">

#### iii) context changes re-render reason:

- When the value in Context Provider changes, all components that use this Context will re-render, **even they don't use the changed portion of the data directly.**

<strong><ins>Note:</ins></strong> Those re-renders can not be prevented with memoization directly, but there a few workarounds that can simulate it.

##### see below for details: https://www.developerway.com/posts/react-re-renders-guide#part7

<img src="https://www.developerway.com/assets/react-re-renders-guide/part2-context-example.png">

#### iv) Hooks changes re-render reason:

- Everything that is happening inside a hook belongs to the component that uses it.

- The same rules regarding Context and State changes apply here:

- state change inside the hook will trigger an unpreventable re-render of the "host" component

- Same goes with Context if Context values changes it will trigger an unpreventatble re-render of the host component

<img src="https://www.developerway.com/assets/react-re-renders-guide/part2-hooks-example.png">

#### iv) re-render reason: props changes

- It doesn't matter whether the component's props change or not when talking about re-renders of not memoized components.

- In order for props to change, they need to be updated by the parent component (means the parent would have to re-render) which will trigger the re-render of the child component regardless of its props.

<strong><ins>Note:</ins></strong> Only when memoization techniques are used (React.memo, useMemo), then props change becomes important

<img src="https://www.developerway.com/assets/react-re-renders-guide/part2-props-myth.png">

---

#### 3. Preventing re-renders with composition:

<strong><ins>Note:</ins></strong> Creating components inside render function of another component is an anti-pattern that can be the biggest performance killer.

- On every re-render React will re-mount this component (destroy and re-create it from scratch) which is going to be much slower than a normal re-render.

- On top of that it leads to such bugs as:

- possible "flashes" of content during the re-renders

- state being reset in the component with every re-render

- useEffect with no dependencies triggered on every re-render

- if a component is focused, the focus will be lost.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*M1b6pFHhNy5MH8cy.png">

##### Nice to read: https://www.developerway.com/posts/how-to-write-performant-react-code

#### i) preventing re-renders with composition by moving state down :

- This pattern can be beneficial when a heavy component manages state, and this state is only used on small isolated portion of the render tree.

- Example like opening/closing the modal dialog with a button click in a complicated component (that renders a significant portion of a page)

- So, the solution would be something like moving the state to smaller component and as a result the bigger component won't re-render on those state changes.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*rnmxuiCuV4bZrFaU.png">

##### Nice to read: https://www.developerway.com/posts/react-elements-children-parents

#### ii) preventing re-renders with composition by using children as props :

- This can also be called as "wrap state around children" which is a similar pattern to "moving state down".

- The difference here is that <strong>state is used on an element that wraps a slow portion of the render tree, so it can't be extracted that easily.</strong>

- <ins>Example</ins>: onScroll or onMouseMove callbacks attached to the root element of a component.

- In this situation, <strong>state management and components that use the state can be extracted into a smaller component <ins>and the slow component can be passed to it as children</ins></strong>.

- From the smaller component perspective <ins>children are just prop, so they will not be affected by state change and therfore <strong>won't re-render</strong></ins>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*l1BBLSoOIX2J6zoY.png">

Additional resources to read: https://www.developerway.com/posts/react-elements-children-parents

#### iii) preventing re-renders with composition by using components as props :

- Same as previous pattern, with the same behaviour: it encapsulates the <ins>state insided a smaller component</ins>, <ins><strong>and heavy components are passed to it as props.</strong></ins>

- props are not effected by the state change, so heavy components won't re-render.

<ins>Note:</ins> Can be useful when a heavy component is independent from the state, but can't be extracted as children as a group.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*WHjnrlmsU3o7ULQx.png">

Additional sources to read: https://www.developerway.com/posts/react-elements-children-parents

---

#### 4. Preventing re-renders with React.memo:

- Wrapping a component in React.memo will stop the downstream chain of re-renders (so usually when the trigger happens up the render tree it stops the downstream chain of re-renders) but <ins><strong>only until unless this component's props has changed.</strong></ins>

- Useful when rendering a heavy component that is not dependent on the source of re-renders (i.e. state, changed data)

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*-f9WqeSbIrSSOuMo.png">

#### i) React.memo : component with props

- All props that are <ins><strong>not primitive values</strong></ins> have to be memoized for React.memo to work

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*SQMGpLxH85yY_VJp.png">

#### ii) React.memo : component as props or children

- React.memo has to be <ins>applied to the elements passed as children/props</ins>.

- Memoizing the parent component <ins>will not work</ins>. When children and props are objects so they will change with every re-render.

<strong>Additional resources to read:</strong> https://www.developerway.com/posts/react-elements-children-parents

---

#### 5. Improving re-renders perfomance with useMemo/useCallback :

<ins>Note</ins>: Memoizing props (ex: using useMemo/useCallback on props) <strong>will not prevent re-renders of a child component. </strong>

- If a parent component re-renders, <ins>it will trigger re-render of a child component regardless of its props.</ins>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*USxxXcRT8eYhtJd7.png">

#### i) Necessary useMemo/useCallback

- If a <strong>child component is wrapped in React.memo, <ins>all props that are not primitive values have to be memoized</ins></strong>.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*1UZHlMEo0JGq2HNw.png">

- If a component uses non-primitive value as a dependency in hooks like useEffect, useMemo, useCallback, it should be memoized.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*Go1lwhXnFR32xRqH.png">

#### ii) useMemo for expensive calculations

- One of the main use cases for useMemo is to <strong><ins>avoid expensive calculations on every re-render.</strong></ins>

- But useMemo (consumes a bit of memory and makes initial render slightly slower), so it should not be used for every calculation.

- In React, mounting and updating components will be the most expensive calculations

- Typical use case for useMemo would be to <ins>memoize React elements</ins>. <strong><ins>Usually parts of an existing render tree or results of generated render tree, like map function that returns new elements</strong></ins>.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*mOw-pFnAJUxzVs8g.png">

#### iii) Improving re-render performance of lists

- key attribute can affect the performance of lists in React.

<ins>Note:</ins> Just providing key attribute doesn't improve lists performance.

- To prevent re-renders of list elements you need to wrap them in React.memo and follow all the best practices.

- Value in a key should be string, that is consistent between re-renders for every element in the list.

<ins>It is okay to use array's index as key if the list is static i.e elements are not added/removed/inserted/re-ordered</ins>

- Using array's index as key on dynamic lists can lead to bugs if <strong>items have state or any uncontrolled elements(like form inputs)</strong>

- degraded performance if items are wrapped in React.memo

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*CkZH5-AmdbJj4A-l.png">

<strong>Additonal resources to read:</strong> https://www.developerway.com/posts/react-key-attribute

#### iv) Randomly generated values should never be used as values in key attribute in lists.

- They will lead to React re-mounting items on every re=render.
- This will lead to very poor performance of the list
- bugs if items have state or uncontrolled elements(like form inputs)

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*tc2nrmSUnK7w1qHo.png">

---

#### 6. Preventing re-renders caused by Context:

##### i) Memoizing Provider value:

- If the Context Provider is not placed at the very root of the app (there is a possibility it can re-render itself because fo changes in its ancestors). <ins>It's value should be memoized</ins>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*tY1UXl68-axvgXLq.png">

##### ii) Splitting data and API

- If in Context there is a combination of data and API (getters and setters) they can be split into different Providers under the same component.

- So, the components that use API only <ins>won't re-render when the data changes</ins>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*qiZUtLGHm6TzokmT.png">

<strong>Additional resources</strong>: https://www.developerway.com/posts/how-to-write-performant-react-apps-with-context

##### iii) Splitting data into chunks

- If Context manages a few independent data chunks, they can be split into smaller providers under the same provider. <ins>That way only consumers of changed chunk will re-render</ins>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*DCZY6dWjNgidwAV2.png">

##### iv) Context selectors for preventing Context re-renders

<ins>There is no way to prevent a component that uses a portion of Context value from re-rendering, even if the used piece of data hasn't changed even with useMemo hook</ins>

<strong><ins>Context Selectors however could be faked with the use of higher-order components and React.memo</ins></strong>

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*n0B_Pda0XZ0kL3mdggDvZQ.png">

<strong>Additional resources to read:</strong> https://www.developerway.com/posts/higher-order-components-in-react-hooks-era
