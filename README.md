# react-chloroform

## Why

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
```javascript
import React from 'react';
import {Form, TextInput, Checkbox, RadioButton, Button} from 'react-chloroform';

const YourFormComponent = () => {
  const handleSubmit = (model) => {
    console.log(model);
  };

  const initialState = {
    email: 'bla@bla.is',
    name: 'Your name',
  };

  return (
    <Form initialState={initialState} onSubmit={handleSubmit}>
      <label htmlFor="email">Email: </label>
      <TextInput name="email" id="email" label="email" />
      <div>
        <label htmlFor="name">Name: </label>
        <TextInput name="name" id="name" placeholder="name" />
      </div>
      <label htmlFor="age">Age</label>
      <Checkbox name="age" id="age" />
      <div>
        <label htmlFor="reactchloroform1">Yes</label>
        <RadioButton name="reactchloroform" id="reactchloroform1" value="true" />
      </div>
      <div>
        <label htmlFor="reactchloroform2">No</label>
        <RadioButton name="reactchloroform" id="reactchloroform2" value="false" />
      </div>
      <Button type="submit" text="Submit" />
    </Form>
   );
 };

export default YourFormComponent;
```
## API

## Contribution

## License
