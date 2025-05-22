### 11. this keyword:

- `this` <ins>**_is the object that the function is a property of_**</ins>

##### <u>Example 1:</u>

```js
function a() {
  console.log(this); // Window
}
a();
```

##### <u>Example 2:</u>

```js
function b() {
  'use strict';
  console.log(this); // undefined
}
b();
```

- **_Inside an object, if there is any function property_**, then <ins>**this keyword refers to its object**</ins>.

<img src="./images_used/compressed_Images/this_keyword-1.png">

- anotherFunc is invoked inside sing() method property, and when we log `this` it logs <ins>**_Window object_**</ins>

- this keyword is **_dynamically scoped_**. It doesn't matter where it's written, **_it matters on how the function is called_**.

##### <u>Arrow functions solve the problem here:</u>

- **_Arrow functions has a lexical `this` behavior_** unlike normal functions (so it lexically bind this)
- In our below case (whatever the object is surrounding this while the main object is)

<img src="./images_used/compressed_Images/this_keyword-2.png">


##### <u>Before ES6, by applying `bind`, we can change the context of `this`:</u>

- **_return the anotherFunc and bind to this_**
- as we are returning this piece of code outside the functional expression code, `this keyword mentioned in the bind` refers to the object

<img src="./images_used/compressed_Images/this_keyword-3.png">


##### <u>Before ES6, using reference variable:</u>

- outside to the function expression itself, we will create a reference
- e.g. `var self = this;`
- At the time the above code is ran, **_self start maintaining that reference to the object_** so that **we can use self** going forward **_(instead of this)_**

<img src="./images_used/compressed_Images/this_keyword-4.png">


---

```js
function CreateCustomer(name, accountBalance, branch) {
  this.name = name;
  this.accountBalance = accountBalance;
  this.branch = branch;
}

CreateCustomer.prototype.addMoney = function () {
  this.accountBalance++;
};

CreateCustomer.prototype.fetchBalance = function () {
  console.log('The balance is ' + this.accountBalance); //The balance is 101
};

const customer1 = new CreateCustomer('Alex', 100, 'XYZ');

customer1.addMoney();
customer1.fetchBalance();
```

##### CreateCustomer function + Object bundle has the Prototype object and in this we have two functions

<img width="446" alt="image" src="https://user-images.githubusercontent.com/42731246/215960873-75740955-0829-4e2b-a188-af5042fb77b4.png">

##### new keyword empties this object

<img width="474" alt="image" src="https://user-images.githubusercontent.com/42731246/215961482-1b9a6729-7632-476f-834e-4540840bca56.png">

<img width="581" alt="image" src="https://user-images.githubusercontent.com/42731246/215961571-a08406f4-d779-42e3-ae49-239ae043e0fd.png">

##### we are declaring properties name and assigning them to the parameters

<img width="488" alt="image" src="https://user-images.githubusercontent.com/42731246/215961846-856d9e70-3ff4-41b4-b8c2-fb2724ed4d9c.png">

##### new keyword automates javascript and it adds the proto property to <i>this</i> object and this proto property references to the Prototype of the CreateCustomer Function

<img width="584" alt="image" src="https://user-images.githubusercontent.com/42731246/215962298-d80133c8-c7af-46fb-8fad-dbb6c7f15696.png">

##### new keyword automates to return the <i>this</i> object

<img width="479" alt="image" src="https://user-images.githubusercontent.com/42731246/215962686-50a8ae07-a852-49f8-8487-5441479afb93.png">

##### Next we are calling customer1.addMoney()

- So javascript looks for the **customer1 in the global memory**, it finds one
- we are looking for addMoney (javascript doesn't finds it inside the customer1 object)
- It goes to the **proto** property of **customer1** object
- **proto** property takes the javascript up to the **Prototype** of the **createCustomer** Function and here in the Prototype **_we find the addMoney_** it execute it.

##### Next we are executing the addMoney()

- It finds out that this.accountBalance++ is written
- So inside the addMoney() function, `this` keyword is pointing to **customer1**

<img width="164" alt="image" src="https://user-images.githubusercontent.com/42731246/215963594-24fd019a-becf-42a6-a682-81f217ce45eb.png">

- So over here this.accountBalance++ is similar to customer1.accountBalance++ (so the output is 101)

- So now the customer1 object's property of accountBalance is updated to 101
- so when you call the this.fetchBalance() it would return 101

<img width="235" alt="image" src="https://user-images.githubusercontent.com/42731246/215964007-da8f1ed4-39a7-4cfb-b71c-d9082c26720e.png">
