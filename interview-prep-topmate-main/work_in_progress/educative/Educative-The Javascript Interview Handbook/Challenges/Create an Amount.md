#### Problem statement

- ##### Given an array of coins, write a function to compute the number of ways you can make that amount using those coins.

```js
Note: There is unlimited number of each coin type available
```

#### Sample Input:

```js
amount = 4
coins = [1, 2, 3]
```

#### Sample Output

```js
4
// 4 ways
// 1, 1, 1, 1
// 1, 1, 2
// 1, 3
// 2, 2
```

#### Solution Review (dynamic)

```js
function returnWays(amount, coins) {
  let numOfWays = []
  for (let i = 0; i <= amount; i++) {
    numOfWays[i] = 0
  }
  numOfWays[0] = 1

  for (let j = 0; j < coins.length; j++) {
    let coin = coins[j]
    for (let hAmount = coin; hAmount <= amount; hAmount++) {
      let change = hAmount - coin
      numOfWays[hAmount] += numOfWays[change]
    }
  }

  return numOfWays[amount]
}

let coins = [1, 2, 3]
let amount = 4
console.log(returnWays(amount, coins))
```

- computed values are stored in an array, numOfWays
- If the function is called for the same value again, the value is searched in the array; if found, it is returned directly, otherwise, further computations are done.


---

#### Solution Review (recursive)

```js
function returnWays(coins, numOfCoins, amount) {
  if (amount === 0) return 1
  if (amount < 0) return 0
  if (numOfCoins < 0 && amount > 0) return 0 //no coins

  return (
    returnWays(coins, numOfCoins, amount - coins[numOfCoins]) +
    returnWays(coins, numOfCoins - 1, amount)
  )
  let coins = [1, 2, 3]
  let amount = 4
  console.log(returnWays(coins, coins.length - 1, amount))
}
```

- We need to find a way to decrement the number of coins currently being used and the amount we need to return.
- <strong>We choose the current coin</strong>, subtract this coin's value from the amount to be returned
- <strong>We donot choose the current coin</strong>, In this case we decrease the numOfCoins value since this specific coin is not going to be used. In this case, the final amount remains unchanged.

---
