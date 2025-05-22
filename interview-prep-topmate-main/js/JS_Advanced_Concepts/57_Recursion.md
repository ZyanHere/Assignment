#### In computer science, recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.

#### In Programming, recursion occurs when a function calls itself.

#### Any iterator function (function with a loop) can be recurisve instead

#### Example 1 (Iterator function)

```js
const countToTen = (num = 1) => {
  while (num <= 10) {
    console.log(num) // logs 1 to 10
    num++
  }
}

countToTen()
```

---

#### Example 2 (recursive function)

- Recursive function has two parts:
  a) the recursive call to the function
  b) at least one condition to exit

```js
const recurToTen = (num = 1) => {
  if (num > 10) return //exits at no. 11
  console.log(num)
  num++
  recurToTen(num)
}

recurToTen()
```

---

##### Reasons to use Recursion:

- Less code
- Elegant code (Pleasing to look at)
- Increased readability

---

##### Reasons to NOT use Recursion:

- Performance (loop is more performant)
- More difficult to debug

---

#### The Standard Example: The Fibonacci Sequence

```js
// 0,1,1,2,3,5,8,13,21,34.....

// Without Recursion:

const fibonacci = (num, array=[0,1])=>{
while(num > =2){
 const[nextToLast, last] = array.slice(-2);
 array.push(nextToLast+last);
 num-=1
}
return array
}

console.log(fibonacci(12))


// With Recursion

const fibo = (num, array=[0,1])=>{
 if(num<=2) return array;
const[nextToLast, last] = array.slice(-2);
return fibo(num-1, [...array, nextToLast+ last])
}

console.log(fibo(12))
```

---

#### What number is in the nth position of the Fibonacci Sequence ?

```js
// Without Recursion

const fibonacciPos = (pos)=>{
 if(pos <=1) return pos;
 const seq = [0,1]
 for(let i=2; i<=pos, i++){
  const[nextToLast, last] = seq.slice(-2)
  seq.push(nextToLast+ last)
 }
 return seq[pos]
}
console.log(fibonacciPos(8))
```

```js
//With Recursion

const fibPos = (pos) => {
  if (pos < 2) return pos
  return fibPos(pos - 1) + fibPos(pos - 2)
}

console.log(fibPos(8))
```

```js
//Single Liner
const fibPos = (pos) => (pos < 2 ? pos : fibPos(pos - 1) + fibPos(pos - 2))

console.log(fibPos(8))
```

#### Real life Example

- Continuation Token from an API

```js
const getAWSProductIdImages = async () => {
  // get the data with await fetch request

  if (data.IsTruncated) {
    //recursive
    return await getAWSProductIdImages(
      productId,
      s3, // connection to s3
      resultArray, // accumulator
      data.NextContinuationToke
    )
  }
  return resultArray
}
```

---

#### 2) A Parser:

// a company directory
// a file directory
// the DOM - a web crawler
// An XML or JSON data export

// Export from your streaming service like Spotify, YT Music, etc.

```js
const artistsByGenre = {
  jazz: ["Miles Davis", "John Coltrane"],
  rock: {
    classic: ["Bob Seger", "The Eagles"],
    hair: ["Def Leppard", "Whitesnake", "Poison"],
    alt: {
      classic: ["Pearl Jam", "The Killers"],
      current: ["Joywave", "Sir Sly"],
    },
  },
  unclassified: {
    new: ["Caamp", "Neil Young"],
    classic: ["Seal", "Morcheeba", "Chris Stapleton"],
  },
}
```

```js
const getArtistNames = (dataObj, arr = []) => {
  Object.keys(dataObj).forEach((key) => {
    if (Array.isArray(dataObj[key])) {
      return dataObj[key].forEach((artist) => {
        arr.push(artist)
      })
    }
    getArtistNames(dataObj[key], arr)
  })
  return arr
}
console.log(getArtistNames(artistsByGenre))
```

![image](https://user-images.githubusercontent.com/42731246/217074495-2a52704a-f358-4923-9db9-f105f58cd9fe.png)
