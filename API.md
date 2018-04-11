## API
All controls share the following properties:
- **model**: a required string that will determine the name of your control, e.g.
  ```jsx
  model="username"
  ```
- **validator**: an optional array of validator functions that will validate your input. Every validator must return a string when the validation fails e.g.
  ```jsx
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
- **validateOn**: an optional enum (`blur`, `focus`, `input`, `mount`) that detirmines at what point the validator starts to validate. Default is `mount`, e.g.
  ```jsx
  validateOn="blur"
  ```
- **className**: optional for class style and compatible with CSS modules, e.g.
  ```jsx
  className={styles.button}
  ```
- **style**: optional for inline style, e.g.
  ```jsx
  style={{color: 'red'}}
  ```
- **id**: optional string to attach a label to the control, e.g.
  ```jsx
  id="age_1337"
  ```
- **disabled**: optional boolean if the control should be disabled, e.g.
  ```jsx
  disabled={true}
  ```
- **onChange**: an optional function that allows you to catch the on change event, e.g.
  ```jsx
  onChange={(model, value) => console.log(model, value)}
  ```

<hr />

### Button
`import {Button} from 'react-chloroform';`

#### Attributes
- **type**: optional string descriping the button type, default `button`, e.g.
  ```jsx
  type="submit"
  ```
- **text**: required string for the button text, e.g.
```jsx
text="Submit form"
```
- **onClick**: optional event handler function to catch when the button was clicked, e.g.
  ```jsx
  onClick={() => console.log('Button was clicked')}
  ```

#### Example
  ```jsx
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
  ```jsx
  group="drinks"
  ```
  - **validation**: grouped checkboxes offer a validation. The validation must be set on the reserved `all` checkbox, e.g.
    ```jsx
    <label htmlFor="all_1">All</label>
    <Checkbox
      model="all"
      id="all_1"
      group="drinks"
      validator={[isRequired]}
      validateOn="input"
    />
    ```
#### Example
```jsx
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

### ChloroformError
`import {ChloroformError} from 'react-chloroform'`;

This component renders the errors from your control validation.

#### Attributes
- **component**: a required node/func that will render your errors, e.g.
  ```jsx
  component={({error}) => <p>{error}</p>}
  ```

#### Example
```jsx
<FormInput
  model="name"
  validator={[isRequired]}
/>
<ChloroformError
  model="name"
  component={({error}) => <p className={styles.error}>{error}</p>}
/>
```

<hr />

### DataList
`import {DataList} from 'react-chloroform';`

#### Attributes
- **options**: an array of options that will be rendered by the datalist. The option attributes are:
  - **name**: an optional string that further describes this option.
  - **value**: a required string or a number that determines the value of the option.
  - **disabled**: an optional boolean if this option should be disabled.
  ```jsx
  options={[{name: 'Name', value: 'Value'}]}
  ```
- **placeholder**: an optional placeholder for the input, e.g.
  ```jsx
  placeholder="Select gender"
  ```
#### Example
```jsx
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

### FormInput
`import {FormInput} from 'react-chloroform';`

#### Attributes
- **placeholder**: an optional placeholder for the input, e.g.
  ```jsx
  placeholder="Write something..."
  ```
- **type**: your text input type, e.g.
  ```jsx
  type="password"
  ```
#### Example
```jsx
<FormInput
  model="email"
  type="email"
  validator={[isEmail}]
/>
```

<hr />

### Form
`import {Form} from 'react-chloroform';`

This is the wrapper form needed to collect the user input.

#### Attributes
- **afterSubmitState**: an optional object that allows you to re-initialise your state with prefilled values after submit, e.g.
  ```jsx
  afterSubmitState={{email: '', jobTitle: 'developer'}}
  ```
- **initialState**: an optional object that allows you to initialise your state with prefilled values, e.g.
  ```jsx
  initialState={{email: 'react_chloroform@reactchloroform.com', jobTitle: 'developer'}}
  ```
- **onReset**: an optional function that allows you to catch the on reset event, e.g.
  ```jsx
  onReset={() => console.log('Form reset called')}
  ```
- **onSubmit**: a required function that allows you to catch the on submit event, e.g.
  ```jsx
  onSubmit={model => console.log(model)}
  ```
- **onSubmitFailed**: an optional function that allows you to catch if the form submit fails, e.g.
  ```jsx
  onSubmitFailed={error => console.log(error)}
  ```
- **onChange**: an optional function that allows you to catch the on change event, e.g.
  ```jsx
  onChange={model => console.log(model)}
  ```

#### Example
```jsx
const initialState = {
  name: 'Darri',
  age: 1337,
};

const handleSubmit = model => console.log(model);

<Form
  initialState={initialState}
  onSubmit={handleSubmit}
>
  ...
</Form>
```

<hr />

### RadioButton
`import {RadioButton} from 'react-chloroform';`

All radio buttons in the same group need to share the same model name.

#### Attributes
- **value**: a required string/number representing the value of the radiobutton, e.g.
  ```jsx
  value="true"
  ```

#### Example
```jsx
<label htmlFor="pepsi_2">Pepsi</label>
<RadioButton
  id="pepsi_2"
  model="drink"
  value="pepsi"
/>

<label htmlFor="cocacola_2">Coca Cola</label>
<RadioButton
  id="cocacola_2"
  model="drink"
  value="coca cola"
/>
```

<hr />

### Select
`import {Select} from 'react-chloroform';`

#### Attributes
- **options**: an array of options that will be rendered by the select. The option attributes are:
  - **name**: a required string that further describes this option.
  - **value**: a required string or a number that determines the value of the option.
  - **disabled**: an optional boolean if this option should be disabled.
  ```jsx
  options={[{name: 'Name', value: 'Value'}]}
  ```
  - The options can also be grouped together. The following are the attributes when grouping is needed:
    - **name**: a required string that further describes this group.
    - **disabled**: an optional boolean if this group should be disabled.
    - **group**: a required array of options.
    ```jsx
    options={[{name: 'drinks', group: [{name: 'Pepsi', value: 'pepsi'}]}
    ```
- **placeholder**: an optional placeholder for the select, e.g.
  ```jsx
  placeholder="Choose your option"
  ```
#### Example
```jsx
const options = [
  {
    name: 'React',
    value: 'react',
  },
  {
    name: 'Other',
    disabled: true,
    group: [
      {
        name: 'Angular',
        value: 'angular',
      }
    ],
  },
];

<Select
  options={options}
  model="interests"
  placeholder="What do you love the most?"
/>
```

<hr />

### TextArea
`import {TextArea} from 'react-chloroform';`

#### Attributes
- **cols**: an optional number specifying the width in avg character width, default 30, e.g.
  ```jsx
  cols={10}
  ```
- **rows**: an optional number specifying the height in lines, default 10, e.g.
  ```jsx
  rows={5}
  ```
- **placeholder**: an optional placeholder for the text area, e.g.
  ```jsx
  placeholder="Write here..."
  ```

#### Example
```jsx
<TextArea
  model="details"
  placeholder="Write some details..."
  rows={300}
/>
```

<hr />

### withReactChloroform
`import {withReactChloroform} from 'react-chloroform';`

A HOC allowing you to write your own component with react-chloroform support and behaviour.

#### Attributes
- **value**: a string/number that the HOC passes down as a prop, e.g.
  ```jsx
  value={value}
  ```
- **onChange**: a function that the HOC passes down as a prop, e.g.
  ```jsx
  onChange={e => onChange(e.target.value)}
  ```
- **startValidating**: you can optionally bind the startValidating function to an event handler. By default, the validation will be done on mount, e.g.
  ```jsx
  onBlur={startValidating}
  ```

#### Example
```jsx
---
const MyInput = ({value, onChange, startValidating}) =>
  <div>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={startValidating}
    />
  </div>;
  
export default withReactChloroform(MyInput);
---

// then use your custom component
<MyInput
  model="custom"  // don't forget the required model
  validator={[isRequired]}
/>
```
