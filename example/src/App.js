import React, { Component } from 'react';

import {Form, TextInput, RadioButton, Checkbox, Button} from 'react-chloroform';

class App extends Component {
  handleSubmit = (model) => {
    console.log(model);
  };

  render() {
    const initalState = {
      email: 'bla@bla.is',
      name: 'darri',
    };

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
            <Button type="submit" text="Submit" />
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
