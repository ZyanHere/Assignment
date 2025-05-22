##### Basic Approach (which we need to avoid)

```js
//Approach 1
const customer1 = {
  name: 'Alex',
  accountBalance: 100,
  branch: 'HDFC XYZ',
  addMoney: function () {
    customer1.accountBalance++
  },
}
customer1.addMoney()
console.log(customer1.accountBalance)

//Approach 2
const customer2= {}
customer2.name = "Jane"
customer2.accountBalance = 200;
customer2.branch = "ICICI XYZ";
customer2.addMoney: function (){
    customer2.accountBalance++;
}
customer2.addMoney();
console.log(customer2.accountBalance)
```

---

##### Function to create Objects

```js
function createCustomer(name, accountBalance, branch){
const customer =  {}
customer.name = name
customer.accountBalance = accountBalance
customer.branch =branch
customer.addMoney: function (){
    customer.accountBalance++;
}
return customer;

}

const customer1 = createCustomer("Alex", 100, "XYZ")
const customer2 = createCustomer("Jane", 200, "XYZ-2")

customer1.addMoney()
console.log(customer1.accountBalance)

```

<!-- HERE 1 -->

<img src="./images_used/Using_Function_to_create_objects-1.png">



<strong>return of the customer points out to the Global memory </strong>

<!-- HERE 2 -->

<img src="./images_used/Using_Function_to_create_objects-2.png">



<strong>Flaw with this approach is it creates copies of the `addMoney function` </strong>which is not a good idea if there are lakhs of customers

<!-- HERE 3 -->

<img src="./images_used/Using_Function_to_create_objects-3.png">



- Instead of having copies of addMoney function in every object <strong>if they can somehow referece to a very common source of this addMoney function</strong> so that we can avoid having multiple copies in every object and have that function in one place.

<!-- HERE 4 -->

<img src="./images_used/Using_Function_to_create_objects-4.png">



---

### Code to avoid multiple copies of addMoney function

```js
const functionsBundle = {
  addMoney: function () {
    this.accountBalance++;
  },
  fetchBalance: function () {
    console.log('The balance is ' + this.accountBalance);
  },
};

function createCustomer(name, accountBalance, branch) {
  //we are creating an empty object with the prototype of functionsBundle and that is why it references to addMoney and fetchBalance
  const customer = Object.create(functionsBundle);
  customer.name = name;
  customer.accountBalance = accountBalance;
  customer.branch = branch;
  return customer;
}

const customer1 = createCustomer('Alex', 100, 'XYZ');
customer1.addMoney();
customer1.fetchBalance();
```

#### Code walkthrough:

- Whenever we use Object.create(), it always returns the empty object. (in our case it is customer which is empty object)
- Object.create() attaches the proto of the object returned with the argument

<!-- HERE 5 -->

<img src="./images_used/Using_Function_to_create_objects-5.png">



- We are passing functionsBundle as the argument to the Object.create(), so the proto points to the functionsBundle (see below)

<!-- HERE 6 -->

<img src="./images_used/Using_Function_to_create_objects-6.png">


- Adding properties to the createCustomerObject and we are doing a return

<!-- HERE 7 -->

<img src="./images_used/Using_Function_to_create_objects-7.png">



- this return keyword says that we are returning the customer object to the customer1 and this proto referencing to the functionsBundle

<!-- HERE 8 -->

<img src="./images_used/Using_Function_to_create_objects-8.png">



---

- Whenever we do customer1.addMoney(), it checks in the customer1 object and as it doesn't find there it goes to the proto way up to the functionsBundle and here it finds the addMoney function and it executes

<!-- HERE 9 -->

<img src="./images_used/Using_Function_to_create_objects-9.png">


