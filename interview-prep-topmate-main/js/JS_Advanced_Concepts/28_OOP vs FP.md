### Object Oriented Programming (OOP)

- Organizing the code into units would be called as Object Oriented Programming
- An object is a box containing information and operations that are supposed to refer to the same concept.
- The **operations** that happen are called as **methods**.
- **Objects** are **_first class citizens_**
- few operations on common data.
- `this`, `self` objects are **mutated**. **_(Side effects)_**
- **_Imperative_**
- Quite good if you have many things like characters in a game with not too many operations

---

### Functional Programming (FP)

- **_Avoiding Side Effects and writing pure functions_** would be called as Functional Programming
- The code is essentially **a combination of functions**.
- Data is **immutable** which leads to writing programs with no side effects and pure functions.
- In a functional Programming paradigm, that <ins>**_function cannot change the outside world_**</ins> and the <ins>output value of a function simply depends on the given arguments.</ins>
- This allows functional programming to really have control over a program flow.
- Functions are **_first class citizens_**
- Many operations on fixed data.
- Functions are pure
- **_Declarative_**
- Is quite good at processing large data for apps (Ex: analyzing user data for machine learning model)
- **_Works really well for high performance processors because you can run it on multiple processors_**
- a few things that require a lot of operations, a lot of little functions apply to it.

---

#### Summary:

In all programs, there are two primary components

- data
- behaviors

**_OOP says <ins>bring together the data and behavior in a single location</ins> called Object or a Class_**

**_FP says that <ins>data and behavior are distinctly different things</ins> and should be kept separate for clarity_**
