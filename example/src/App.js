import React, {Component} from 'react';
import classNames from 'classnames';

import {Form, TextInput, RadioButton, Checkbox, Button, Select} from 'react-chloroform';
import styles from './app.module.css';

class App extends Component {
  handleSubmit = model => {
    console.log(model);
  };

  render() {
    const initalState = {
      email: 'bla@bla.is',
      name: 'darri',
    };

    const options = [
      {
        name: 'Darri',
        value: 'darri',
      },
      {
        name: 'Steinn',
        value: 'steinn',
      },
      {
        name: 'Konn',
        value: 'konn',
      },
      {
        name: 'Konradsson',
        value: 'konradsson',
      },
    ];

    console.log(options);

    return (
      <div>
        <h1>React Chloroform</h1>
        <div>
          <Form initialState={initalState} onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <TextInput name="email" id="email" label="email" />
            <div>
              <label htmlFor="name">Name: </label>
              <TextInput name="name" id="name" placeholder="name" />
            </div>
            <label htmlFor="age">Age</label>
            <Checkbox name="age" id="age" />
            <div>
              <label htmlFor="darrmundur1">Yes</label>
              <RadioButton name="darrmundur" id="darrmundur1" value="true" />
            </div>
            <div>
              <label htmlFor="darrmundur2">No</label>
              <RadioButton name="darrmundur" id="darrmundur2" value="false" />
            </div>
            <div>
              <Select
                name="wabbalabbadubdub"
                options={options}
                placeholder="Choose your option"
              />
            </div>
            <div>
              <Select
                name="rickandmorty"
                options={options}
                initialValue="darri"
              />
            </div>
            <Button type="submit" text="Submit" className={classNames(styles.root, styles.button)} />
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
