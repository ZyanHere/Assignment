## Number of Days between the Dates

<strong>Approach Taken:</strong>

- spread the dates and map them and destructuring array as per required. (ex: const[time1, time2])
- pass them in the new Date(date1)
- do the .getTime() for them to achieve in milliseconds (ex: new Date('2023-10-08').getTime())
- Use Math.abs( difference of two times ) (ex: Math.abs(time2 -time 1)) for precision
- use this precision value to divide with ms*s*min*hours pattern (ex: 1000*60*60*24)

```js
function daysBetweenDates(...dates) {
  const [time1, time2] = dates.map((date) => new Date(date).getTime());
  const differenceInMilliseconds = Math.abs(time1 - time2);
  return differenceInMilliseconds / (1000 * 60 * 60 * 24);
}

// Test the function with two dates
const numberOfDays = daysBetweenDates('2023-10-01', '2023-10-09');
console.log('Number of days between the two dates:', numberOfDays);
```
