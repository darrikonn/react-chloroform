# react-chloroform

---

[![NPM Version](https://img.shields.io/npm/v/react-chloroform.svg?style=flat)](https://www.npmjs.com/package/react-chloroform)
[![NPM Downloads](https://img.shields.io/npm/dt/react-chloroform.svg?style=flat)](https://npmcharts.com/compare/react-chloroform?minimal=true)
[![Build Status](https://img.shields.io/travis/darrikonn/react-chloroform.svg?style=flat)](https://travis-ci.org/darrikonn/react-chloroform)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/darrikonn/react-chloroform.svg)](https://github.com/darrikonn/react-chloroform/blob/master/LICENSE)

## Why
> "No hooking up, super lightweight, and easy to use".

A form validation library with only `react` and `prop-types` as its dependency.

## Install
To install this package, run:
```
npm install --save react-chloroform
```

`yarn` users can use:
```
yarn add react-chloroform
```

You can also use the `UMD` build:
```
<script src="path-to-react-chloroform/dist/react-chloroform.min.js"></script>
```

Or alternatively the `es5 commonjs` build:
```
<script src="path-to-react-chloroform/lib/react-chloroform.js"></script>
```

## Examples
Refer to [`/examples`](https://github.com/darrikonn/react-chloroform/tree/master/examples) for all example source code.

### Quick start
```jsx
import React from 'react';
import {Form, FormInput, Button, ChloroformError} from 'react-chloroform';

const YourFormComponent = () => {
  const handleSubmit = model => console.log(model);

  const initialState = {
    email: 'example@example.com',
    name: 'John Doe',
  };

  const isRequired = val => (val && val.length > 0) || 'This field is required';

  return (
    <Form initialState={initialState} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email_1">Email: </label>
        <FormInput model="email" id="email_1" validator={[isRequired]} />
        <ChloroformError model="email" component={({error}) => <p>{error}</p>} />
      </div>

      <div>
        <label htmlFor="name_1">Name: </label>
        <FormInput model="name" id="name_1" />
      </div>

      <div>
        <Button type="submit" text="Submit" />
      </div>
    </Form>
   );
 };

export default YourFormComponent;
```

### Fiddles
- [`Example 1`](https://jsfiddle.net/darrikonn/gshkfp9v/)
- [`Example 2`](https://jsfiddle.net/darrikonn/61z0exLq/)

## API
Check out the [`api`](https://github.com/darrikonn/react-chloroform/blob/master/API.md).

## Contribution
React-Chloroform is open for contributions by the community.
Read the [`contributing guidelines`](https://github.com/darrikonn/react-chloroform/blob/master/CONTRIBUTING.md).

## Testing
```bash
npm install
```

Link from the react-chloroform git repo:

```bash
npm link
```

And then link from your test project with:
```bash
npm link react-chloroform
```

Build es with:
```bash
npm run build:es:watch
```

## License
MIT
