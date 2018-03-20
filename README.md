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
All controls share the following properties:
- **model**: a required string that will determine the name of your control, e.g.
  ```javascript
  model="username"
  ```
- **validator**: an optional array of validator functions that will validate your input. Every validator must return a string when the validation fails e.g.
  ```javascript
  // multi line
  const isRequired = val => {
    if (val && val.length > 0) {
      return;  // can also return false
    }
    return 'This field is required';
  };
  validator={[isRequired]}

  // single line
  validator={[val => (val && val.length > 0) || 'This field is required']}
  ```
  Since the validator prop accepts an array of validators, you can have multiple validators per control.
- **className**: optional for class style and compatible with CSS modules, e.g.
  ```javascript
  className={styles.button}
  ```
- **style**: optional for inline style, e.g.
  ```javascript
  style={{color: 'red'}}
  ```
- **id**: optional string to attach a label to the control, e.g.
  ```javascript
  id="age_1337"
  ```

<hr />

### Button
`import {Button} from 'react-chloroform';`

#### Attributes
- **type**: optional string descriping the button type, default `button`, e.g.
  ```javascript
  type="submit"
  ```
- **text**: required string for the button text, e.g.
```javascript
text="Submit form"
```
- **onClick**: optional event handler function to catch when the button was clicked, e.g.
  ```javascript
  onClick={() => console.log('Button was clicked')}
  ```

#### Example
  ```javascript
  <Button
    type="submit"
    text="Submit"
    className={styles.submitButton}
  />

  <Button
    type="reset"
    text="Reset"
  />
```

<hr />

### Checkbox
`import {Checkbox} from 'react-chloroform';`

#### Attributes
- **group**: an optional string for when you want to group checkboxes together with the reserved `all` checkbox, e.g.
  ```javascript
  group="drinks"
  ```
#### Example
```javascript
<label htmlFor="cocacola_1">Coca Cola</label>
<Checkbox
  model="cocacola"
  id="cocacola_1"
  group="drinks"
/>

<label htmlFor="pepsi_1">Pepsi</label>
<Checkbox
  model="pepsi"
  id="pepsi_1"
  group="drinks"
/>
```

<hr />

### DataList
`import {DataList} from 'react-chloroform';`

#### Attributes
- **options**: an array of options that will be rendered by the datalist. The options attributes are:
  - **name**: an optional string that further describes this option.
  - **value**: a required string or a number that determines the value of the option.
  - **disabled**: an optional boolean if this option should be disabled.
  ```javascript
  options={[{name: 'Name', value: 'Value'}]}
  ```
- **placeholder**: an optional placeholder for the input, e.g.
  ```javascript
  placeholder="Select gender"
  ```
#### Example
```javascript
const options = [
  {
    name: 'React',
    value: 'react',
  },
  {
    name: 'Angular',
    value: 'angular',
    disabled: true,
  },
];

<DataList
  options={options}
  model="javascript"
  placeholder="What are you using for your front-end"
/>
```

<hr />

### Errors
#### Attributes
#### Example

<hr />

### FormInput
#### Attributes
#### Example

<hr />

### Form
#### Attributes
#### Example

<hr />

### RadioButton
#### Attributes
#### Example

<hr />

### Select
#### Attributes
#### Example

<hr />

### TextArea
#### Attributes
#### Example

<hr />

### withReactChloroform
#### Attributes
#### Example

<hr />

## Contribution
React-Chloroform is open for contributions by the community.

### Issues
Before submitting an issue, please check if the issue has been submitted before.

### Pull requests
Before you create a PR, please submit an issue with your improvements before starting your work. That way you can avoid wasting your time on a PR that won't be approved.

## Testing
```bash
npm run build:es
```
```bash
npm link react-chloroform
```

## License
MIT
