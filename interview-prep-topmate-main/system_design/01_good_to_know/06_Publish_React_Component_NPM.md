
# Publish a React Component as NPM Package (with Typescript) 🔥🔥  
[Watch on Youtube](https://www.youtube.com/watch?v=GVN9d1rFeCo)

---

## **Table of Contents**  
- [Publish a React Component as NPM Package (with Typescript) 🔥🔥](#publish-a-react-component-as-npm-package-with-typescript-)
  - [**Table of Contents**](#table-of-contents)
  - [**Introduction**](#introduction)
    - [Features of the Toast Component:](#features-of-the-toast-component)
  - [**Setting Up the Project**](#setting-up-the-project)
  - [**Configuring TypeScript**](#configuring-typescript)
    - [**Updated `tsconfig.json`**:](#updated-tsconfigjson)
  - [**Setting Up Rollup for Bundling**](#setting-up-rollup-for-bundling)
  - [**Handling CSS Files**](#handling-css-files)
  - [**Publishing to NPM**](#publishing-to-npm)
  - [**Testing the Library**](#testing-the-library)

---

## **Introduction**  

Have you ever wondered how libraries like **Material UI** and **Tailwind CSS** are built and published? 

### Features of the Toast Component:  
- Reusable toast notification component.  
- Created using React and TypeScript.  
- Functionalities include animations, different toast types, and positions.  

**Example Output**:  
- Import:  
  ```tsx
  import useNotification from 'react-toast-popup';
  ```
- Usage:  
  ```tsx
  const { triggerNotification } = useNotification({ position: 'top-right' });
  triggerNotification({ type: 'error', message: 'Error occurred!' });
  ```

---

## **Setting Up the Project**  

1. **Create a New Folder**:  
   ```bash
   mkdir react-toast-popup && cd react-toast-popup
   npm init
   ```
2. **Fill Package Details**:  
   - Name: `react-toast-popup`  
   - Version: `0.0.1`  
   - Entry Point: `index.js`  
   - Accept all other defaults.

3. **Copy Toast Component Code**:  
   - Copy the relevant `src` folder containing:  
     - `useNotification` hook.  
     - Toast notification component.

4. **Remove Unnecessary Files**:  
   - Delete files such as `App.jsx`, `index.css`, etc., leaving only the component logic.  

5. **Create `index.ts`**:  
   ```typescript
   import useNotification from './hooks/useNotification';
   export default useNotification;
   ```

---

## **Configuring TypeScript**  

Install dependencies:  
```bash
npm install react typescript tslib --save-dev
```

Generate `tsconfig.json`:  
```bash
npx tsc --init
```

### **Updated `tsconfig.json`**:  
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "react",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

---

## **Setting Up Rollup for Bundling**  

Install Rollup and plugins:  
```bash
npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-typescript2 rollup-plugin-peer-deps-external rollup-plugin-terser rollup-plugin-dts --save-dev
```

Create `rollup.config.js`:  
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [dts()]
  }
];
```

Add `build` script to `package.json`:  
```json
"scripts": {
  "build": "rollup -c"
}
```

Run the build:  
```bash
npm run build
```

---

## **Handling CSS Files**  

Install PostCSS plugin:  
```bash
npm install rollup-plugin-postcss --save-dev
```

Update Rollup config:  
```javascript
import postcss from 'rollup-plugin-postcss';

plugins: [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
  postcss(),
  terser()
]
```

---

## **Publishing to NPM**  

1. **Log in to NPM**:  
   ```bash
   npm login
   ```

2. **Publish the Package**:  
   ```bash
   npm publish
   ```

3. Verify on NPM:  
   - Visit [NPM Packages](https://www.npmjs.com/) and check your package.

---

## **Testing the Library**  

1. Install the package in another project:  
   ```bash
   npm install react-toast-popup
   ```

2. Import and use:  
   ```tsx
   import useNotification from 'react-toast-popup';
   const { triggerNotification } = useNotification({ position: 'bottom-left' });
   ```

---