## Describe a situation where you would use `useMemo`

Here's an example using `useMemo` to compute a filtered list only when the source list or filter criteria change:

```jsx
import React, { useState, useMemo } from 'react'

function FilteredList({ list }) {
  const [filter, setFilter] = useState('')

  const filteredList = useMemo(() => {
    return list.filter((item) => item.includes(filter))
  }, [list, filter])

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}
```