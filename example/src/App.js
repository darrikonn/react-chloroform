import React, {Component} from 'react';
import classNames from 'classnames';

import {Form, TextInput, RadioButton, Checkbox, Button, Select} from 'react-chloroform';
import styles from './app.module.css';

class App extends Component {
  do = () => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  };

  handleSubmit = async model => {
    await this.do();
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

    const isRequired = val => (val && val.length > 0) || 'This field is required';

    const isEmail = val =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val,
      ) || `"${val}" is not a valid email`;

    return (
      <div>
        <h1>React Chloroform</h1>
        <div>
          <Form initialState={initalState} onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <TextInput
              model="email"
              id="email"
              label="email"
              validator={[
                isEmail,
                isRequired,
              ]}
            />
            <div>
              <label htmlFor="name">Name: </label>
              <TextInput
                model="name"
                id="name"
                placeholder="name"
                validator={[
                  val => val === 'darri' && `Do not rump me with "${val}"`,
                ]}
              />
            </div>
            <label htmlFor="age">Age</label>
            <Checkbox model="age" id="age" />
            <div>
              <label htmlFor="darrmundur1">Yes</label>
              <RadioButton model="darrmundur" id="darrmundur1" value="true" />
            </div>
            <div>
              <label htmlFor="darrmundur2">No</label>
              <RadioButton model="darrmundur" id="darrmundur2" value="false" />
            </div>
            <div>
              <Select
                model="wabbalabbadubdub"
                options={options}
                placeholder="Choose your option"
              />
            </div>
            <div>
              <Select
                model="rickandmorty"
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
