## Convert camelCase to snake_case

**Approach Taken**

1.  The g at the end stands for "global," which means the `regex will be applied to all matches in the string`, not just the first one.
2.  write for first group and second group
3.  `([a-z0-9]|(?=[A-Z]))`: This is the first capturing group. It matches:

- `[a-z0-9]`: Any lowercase letter (a to z) or digit (0 to 9).
- |: This is the logical OR operator in regex.
- `(?=[A-Z])`: This is a lookahead assertion. It checks if the next character is an uppercase letter (A to Z) but does not consume it (i.e., it's not part of the match).

4. `([A-Z])`: This is the second capturing group. It matches any uppercase letter (A to Z).
5. The `$1 and $2` in the replacement string of the replace function are references to the contents of the `first and second capturing groups`in the regular expression.

```js
function camelToSnakeCase(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toLowerCase();
}

const camelCaseStr = 'otherArrayIsDuplicate';
const snakeCaseStr = camelToSnakeCase(camelCaseStr);
console.log(snakeCaseStr); //other_array_is_duplicate
```
