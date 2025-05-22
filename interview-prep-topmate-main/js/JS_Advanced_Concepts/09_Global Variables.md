### 9. Global Variables:

- a **global variable** is one that is <ins>**_declared outside of any function or simply without the var, let, or const_**</ins> keywords, making it accessible from any part of the code, regardless of the scope.
- It's <ins>**_attached to the global object_**</ins>, which is **window** in a web browser or **global** in Node.js.
- Too many Global variables, **pollutes** the <ins>**_Global Execution Context_**</ins> which eventually <ins>**_leads to memory leaks_**</ins> and making things slower and slower until our browsers crash.
- The **issue** with Global Variables is that <ins>**_we can have variable collisions_**</ins>.

##### <u>Refer Screenshot:</u>

- **_This is because everything is on Global Execution context and they overwrite each other if there's any duplicates_**

<img src="./images_used/compressed_Images/Global_Variables.png">
