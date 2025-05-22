## Generics in Typescript

-  Are a tool that allows you to create `reusable` and flexible `functions`, `classes`, `interfaces`, and `types`. 
-  ***They work by allowing you to parameterize types***, similar to how you might parameterize values in a function. 
-  `Generics` <ins>provide a way to work with any data type and ensure that the consistency of that data type is maintained</ins> throughout the function or class.
-  The power of generics comes from the <ins>***ability to work with any type while maintaining the relationship between the input and output types***</ins>, the types of properties, etc., without giving up type safety.

-----


### Generic Functions
- A generic function can work on any data type or ensure that two inputs are of the same type without specifying the data types in advance. 

```js
function identity<T>(arg: T): T {
    return arg;
}
```

- In this function, `<T>` is a type variable that **captures the type the user provides** (e.g., number, string), so that we can use that type later in the function argument and return type. 
- When the function is called, TypeScript infers the type for `T` based on the argument passed to the function.

```js
let output1 = identity<string>("myString");
let output2 = identity<number>(100);
```

```js
//Generic Interfaces
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```
-----

### Generic Interface for an `add` function

```js
interface AddOperation<T> {
    (a: T, b: T): T;
}
```

### Implementing the Interface for Numbers

```js
const addNumbers: AddOperation<number> = (a, b) => {
    return a + b;
};

console.log(addNumbers(5, 10)); // Output: 15
```


### Implementing the Interface for Strings

```js
const addStrings: AddOperation<string> = (a, b) => {
    return a + b;
};

console.log(addStrings("Hello, ", "world!")); // Output: "Hello, world!"
```
-----

###  Generic Classes

```js
// Generic Classes
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

```js
class Adder<T> {
    // Method to perform the addition
    add: (a: T, b: T) => T;

    constructor(addFunction: (a: T, b: T) => T) {
        this.add = addFunction;
    }
}
```

### Implementing the Class for Numbers

```js
const numberAdder = new Adder<number>((a, b) => a + b);
console.log(numberAdder.add(5, 10)); // Output: 15
```

### Implementing the Class for Strings
```js
const stringAdder = new Adder<string>((a, b) => a + b);
console.log(stringAdder.add("Hello, ", "world!")); // Output: "Hello, world!"
```

### Summary:
- Generics are particularly ***useful in large-scale applications <ins>where a type might not be known until runtime***</ins>, or when you want to create reusable components. By using generics, you can ensure type safety without sacrificing flexibility, allowing you to catch errors early in the development process.