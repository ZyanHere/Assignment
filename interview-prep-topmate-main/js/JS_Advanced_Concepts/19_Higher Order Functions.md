### 19. Higher Order Functions:

- Higher order functions are simply <ins>**_a function that can take a function as a argument or a function that returns another function_**</ins>

```js
const giveAccessTo = (name) => {
  console.log('Access granted to ' + name); //Access granted to Tim
};

function authenticate(verify) {
  let array = [];
  for (let i = 0; i < verify; i++) {
    array.push(i);
  }
  return true;
}

function letPerson(person, fn) {
  if (person.level === 'admin') {
    fn(500000);
  } else if (person.level === 'user') {
    fn(500);
  }
  //function returns another function
  return giveAccessTo(person.name);
}
//function takes a function as a argument
letPerson({ level: 'user', name: 'Tim' }, authenticate);
```

```js
//Example 2

const multiplyBy = (num1) => (num2) => num1 * num2;
console.log(multiplyBy(4)(6)); //24
```

<ins>**_Summary_**</ins>:

- Keeping our code more generic and following the idea of DRY (Don't Repeat Yourself) by breaking the code into small functionalities
