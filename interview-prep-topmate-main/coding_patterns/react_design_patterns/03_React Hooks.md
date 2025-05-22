**CUSTOM HOOKS**

- Helps us to achieve code re-usability

```js
//App.js
import ChatPage from './ChatPage';
import './styles.css';

export default function App() {
  return <ChatPage />;
}
```

```js
//ChatPage.jsx
import useOnline from './useOnline';

export default function ChatPage() {
  const isOnline = useOnline();

  return (
    <div>
      {isOnline ? 'User available for chat' : 'User not available for chat'}
    </div>
  );
}
```

```js
//HomePage.jsx
import useOnline from './useOnline';

export default function HomePage() {
  const isOnline = useOnline();

  return <div>{isOnline ? 'I am online' : 'Not Online'}</div>;
}
```

```js
//useOnline.jsx
import { useEffect, useState } from 'react';

export default function useOnline() {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnline(true);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return isOnline;
}
```
