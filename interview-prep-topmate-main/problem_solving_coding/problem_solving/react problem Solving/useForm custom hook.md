
## Implement a custom hook that handles form inputs and validation.

```jsx
import { useState } from 'react'

function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return { values, errors, handleChange }
}
```
