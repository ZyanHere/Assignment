## Guess the Output


### 1.
```js
function test1(arr, cb) {
const a = [...arr];
a.push(100);
cb();
}
var arr = [1, 2, 3, 4, 5];
test1(arr, function () {
console.log('array', arr);
});

```

### 2.

```js
for(var i=0;i<5;i++){
   setTimeout(() => console.log(i), 0);
}
```

### 3.

```js
var x=1;
function demo() {
console.log(x);
var x =3;
}
demo();
```

----

## Given the data, expecting the following output, write a recursive function 

```js
const comments = [
  {
    id: 1,
    text: 'Example comment here.',
    children: [
      {
        id: 2,
        text: 'Another example comment text.',
        children: [
          {
            id: 3,
            text: 'Another example comment text.',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: 'Example comment here 2.',
    children: [],
  },
];

// Expected output: 
// Example comment here.
// Another example comment text.
// Another example comment text.
// Example comment here 2

```

## Given the problem, I would expect the following output for the given input

```js
// Input: nums = [2,7,11,15], 
// target = 9

// Output: [0,1]

// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

```

**Verdict**: Selected
