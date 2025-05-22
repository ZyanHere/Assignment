##### What are custom data attributes ?

- All attributes whose name begins with data- \* are attributes of data.
- The data-\* attribute is used to <strong>store private custom data</strong> on the website or document, <strong>which helps one to add custom data attributes</strong> on all HTML elements.

The data- \* attribute consists of two parts:

1. The name of the attribute will have no uppercase characters, and must be atleast one character long after the "data-" prefix.
2. The attribute value can be any string

- The attribute data-\* forms part of the Global attributes and can be used on any HTML element.

---

##### Why can’t classes and ids be used instead of custom data attributes?

- The class HTML attribute is <strong>not intended for data-storage</strong>. Its key function is to allow developers to <strong>assign details about the style</strong> to a collection of elements.
- Any additional piece of information requires that we add a new class to our object. This makes it more difficult to decipher the data in javascript to ultimately achieve what we need.
- Should a class name begin with numbers and is later modified to style the elements in the class name based on that info, we should either have to escape the number or use the selectors in our stylesheet.

---
