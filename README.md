# react-chloroform

---

[![NPM Version](https://img.shields.io/npm/v/react-chloroform.svg?style=flat)](https://www.npmjs.com/package/react-chloroform)
[![NPM Downloads](https://img.shields.io/npm/dt/react-chloroform.svg?style=flat)](https://npmcharts.com/compare/react-chloroform?minimal=true)
[![Build Status](https://img.shields.io/travis/darrikonn/react-chloroform.svg?style=flat)](https://travis-ci.org/darrikonn/react-chloroform)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/darrikonn/react-chloroform.svg)](https://github.com/darrikonn/react-chloroform/blob/master/LICENSE)

## Why
> "No hooking up, super lightweight, and easy to use".

## Install
To install this package, run:
```
npm install --save react-chloroform
```

`yarn` users can use:
```
yarn add react-chloroform
```

## Example
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
        <ChloroformError model="email" component={error => <p>{error}</p>} />
      </div>

      <div>
        <label htmlFor="name_1">Name: </label>
        <FormInput name="name" id="name_1" />
      </div>

      <div>
        <Button type="submit" text="Submit" />
      </div>
    </Form>
   );
 };

export default YourFormComponent;
```

## API
Check out the [api](https://github.com/darrikonn/react-chloroform/blob/master/API.md).

## Contribution
React-Chloroform is open for contributions by the community.
Read the [contributing guidelines](https://github.com/darrikonn/react-chloroform/blob/master/CONTRIBUTING.md).

## Testing
```bash
npm link react-chloroform
```

```bash
npm run build:es
```

## License
MIT
