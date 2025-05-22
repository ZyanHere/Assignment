### 8. Scope Chain:

- Each context has a link to its outside world or a link to his parent and the outer environment depends on where the function sits.
- **_Lexical means where the function is written_**

##### <u>Below Example:</u>

- All of these functions has access to the global scope (**_in our case it is var x='x'_** which is declared on the global scope)

<img src="./images_used/compressed_Images/Scope_Chain-1.png">


- `eval` and `width` are **not** a **good** idea to optimize our code because **you can change how scope works internally** with these two things which makes difficult.

- any variable that is **declared inside the function**, it will be **accessed inside any function scope** which are <ins>**_defined inside_**</ins>.

<br/>

- any variable that is <ins>**declared inside the curly brackets with let and const**</ins> can be accessed <ins>**_only in the block scope_**</ins>, _<ins>**whereas in this case var acts like a function scope**</ins>_

<img src="./images_used/compressed_Images/Scope_Chain-2.png">

- if `var` is replaced with `let`, <ins>**_then it acts as a block scope_**</ins> and we will get reference error.

<img src="./images_used/compressed_Images/Scope_Chain-3.png">