### Translate your React app with react-i18next

```js
npm install react-i18next i18next --save
```

- Create a new file **i18n.js beside your index.js** containing following content:

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'welcome.title': 'Welcome to React',
    },
  },
  nl: { // Adding Dutch translations
    translation: {
      'welcome.title': 'Welkom bij React',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language can be 'en' for English or 'nl' for Dutch
  fallbackLng: 'en', // Specifies default language to use if the current language doesn't have the translation
  keySeparator: false, // Using simple translation keys
  interpolation: {
    escapeValue: false, // Not needed for React as it escapes by default
  },
});

export default i18n;
```

we pass the i18n instance to react-i18next which will make it available for all the components via the context api.

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';

// append app to dom
ReactDOM.render(<App />, document.getElementById('root'));
```

```js
// The t function is the main function in i18next to translate content.
import React from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  return <h1>{t('welcome.title')}</h1>;
}
```

```js
function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('nl')}>Dutch</button>
    </div>
  );
}
```