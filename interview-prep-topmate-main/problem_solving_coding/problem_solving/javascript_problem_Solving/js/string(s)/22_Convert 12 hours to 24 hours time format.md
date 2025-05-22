### 12 hours to 24hours time conversion

**_In summary, code should processes the input time string by removing the 'AM' or 'PM' part and then splitting the remaining string into hours and minutes for further processing in the function._**

- **_.replace(/AM|PM/i, '')_** is a method call on the time string. It uses a regular expression (/AM|PM/i) to find occurrences of 'AM' or 'PM' in the time string. The i at the end of the regular expression makes the search case-insensitive, so it will match 'am', 'Am', 'pM', etc., as well.
- This method call replaces the found 'AM' or 'PM' with an empty string (''), effectively removing it from time. So, **_if time was "1:00 PM"_**, after this call, **_it would be "1:00 "_**.
- For the example **_"1:00 "_**, the **_split operation would result in an array ["1", "00 "]_**.

```js
function convertTo24HourFormat(time) {
  // Check if the time is in 12-hour format
  const isPM = time.indexOf('PM') !== -1;
  const isAM = time.indexOf('AM') !== -1;

  //Uses array destructuring to assign the first element of the array to a variable named hours and the second element to a variable named minutes.
  let [hours, minutes] = time.replace(/AM|PM/i, '').split(':');

  // Convert hours to 24-hour format if necessary
  if (isPM && hours !== '12') {
    //The second argument 10 is the radix or base for the numerical system used. Here, it specifies that the string should be parsed as a base-10 number, which is the standard decimal system. This ensures that the function interprets the string correctly as a decimal number.
    hours = parseInt(hours, 10) + 12;
  } else if (isAM && hours === '12') {
    hours = '00';
  }

  // Return the converted time
  return `${hours}:${minutes}`;
}

// Example usage
console.log(convertTo24HourFormat('12:00 PM')); // Outputs: 12:00
console.log(convertTo24HourFormat('1:00 PM')); // Outputs: 13:00
console.log(convertTo24HourFormat('12:00 AM')); // Outputs: 00:00
console.log(convertTo24HourFormat('1:00 AM')); // Outputs: 01:00
```
