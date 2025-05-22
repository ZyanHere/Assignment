### A `prop in a component` which is a `function and that returns JSX`

**Uses**:

#### For sharing <u>**_code between React components using a prop whose value is a function_**</u>.

```js
//App.jsx
import React, { useState } from 'react';
import DataFetcher from './components/DataFetcher';

export default function App() {
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  return (
    <div>
      <h2>Dynamic Data Fetching Example</h2>
      {/* Disable the button while loading */}
      <button
        onClick={() => setFetchSuccess(!fetchSuccess)}
        disabled={isLoading}
      >
        {fetchSuccess ? 'Click Here to Fail the Data' : 'Click Here to Succeed'}
      </button>
      <DataFetcher
        shouldSucceed={fetchSuccess}
        onLoadingChange={setIsLoading} // Pass setIsLoading to DataFetcher
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={(data) => <div>Success: {data}</div>}
        renderError={(error) => <div>Error: {error.message}</div>}
      />
    </div>
  );
}
```

```js
// DataFetcher.jsx

// Import useEffect and useState from 'react'
import { useEffect, useState } from 'react';

const DataFetcher = ({
  shouldSucceed,
  renderLoading,
  renderSuccess,
  renderError,
  onLoadingChange, // New prop to communicate loading state changes
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    onLoadingChange(true); // Notify parent component that loading has started
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          resolve('Data loaded successfully');
        } else {
          reject(new Error('Failed to load data'));
        }
      }, 2000);
    })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
        onLoadingChange(false); // Notify parent component that loading has ended
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        onLoadingChange(false); // Notify parent component that loading has ended
      });
  }, [shouldSucceed, onLoadingChange]);

  if (loading) return renderLoading();
  if (error) return renderError(error);
  return renderSuccess(data);
};

export default DataFetcher;
```
