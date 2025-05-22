## Configure in Typescript

- to specify how TypeScript code should be compiled into JavaScript

### What is a tsconfig.json file?
- **Definition**: 
  - It’s a JSON file that specifies the compiler options, files to include or exclude, and other settings for a TypeScript project.
- **Location**: 
  - Usually placed at the root directory of a project to affect all .ts and .tsx files in the project.

#### Key Reasons to Use tsconfig.json
- **Compiler Settings**: 
  - Configure various compiler options like targeting a specific ECMAScript version, generating source maps, enabling strict type checking, etc.
- **Project Organization:**
  - **Includes and Excludes**: 
    - Specify which files to include or exclude from the project.
- **Paths Aliases:** 
  - Configure module resolution for custom paths using path aliases.
- **Strictness Levels**:
  - **Strict Mode**: 
    - Enable strict checking modes for better type safety and early detection of potential bugs.
  - **No Implicit Returns**: 
    - Prevent implicit returns for better code clarity.
- **Module Resolution**:
  - **Type Definitions**: 
    - Specify how the compiler should resolve types and which modules to load types from.
  - **Module Output**: 
    - Define how the compiled JavaScript should handle module imports/exports.














### 1. Install TypeScript
```js
npm install --save-dev typescript
```

### 2. Initialize a TypeScript Project
- After installing TypeScript, **you need to initialize a new TypeScript project by generating a `tsconfig.json` file**, which is the TypeScript configuration file. 
- This file <ins>***specifies the root files and the compiler options***</ins> required to compile the project.

```js
// This command creates a tsconfig.json file with default settings, which you can customize for your project.
npx tsc --init
```

### 3. Configure tsconfig.json

- ##### The tsconfig.json file controls how TypeScript compiles your code. Here are some common configurations you might adjust:

```ts
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

- **target**: Set the ECMAScript target version (e.g., es5, es6, es2017).
- **module**: Specify the module code generation method (e.g., commonjs, es6, umd).
- **strict**: Enable all strict type-checking options.
- **outDir**: Specify an output directory for all emitted files.
- **rootDir**: Specify the root directory of input files. Use to control the output directory structure with outDir.
- **noImplicitAny**: Raise an error on expressions and declarations with an implied any type.
- **moduleResolution**: Determine how modules get resolved. Can be node for Node.js-style resolution, or classic.

### 4. Scripts (if webpack already installed in your project)

```js
{
  "scripts": {
    "start": "webpack serve --port 3000",
    "build": "set NODE_ENV=production && webpack"
  }
  ...
}
```

**More details**: https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph
