```js
class CreateCustomer {
  constructor(name, accountBalance, branch) {
    this.name = name;
    this.accoutnBalance = accountBalance;
    this.branch = branch;
  }
  addMoney() {
    this.accountBalance++;
  }
  fetchBalance() {
    console.log('The balance is ' + this.accountBalance);
  }
}

const customer1 = new CreateCustomer('Alex', 100, 'XYZ');
customer1.addMoney();
customer1.fetchBalance();
```

<img src="./images_used/Understanding_Class_and_Constructor-1.png">


#### Functions vs class Code

#### Labels Function and Object part as a class, in function part it stores the constructor, and everything else is executed same


<img src="./images_used/Understanding_Class_and_Constructor-2.png">
