import React, {Component} from 'react';
import classNames from 'classnames';
import {
  Button,
  Checkbox,
  ChloroformError,
  DataList,
  Form,
  FormInput,
  RadioButton,
  Select,
  TextArea,
} from 'react-chloroform';

import MyInput from './MyInput';

import styles from './app.module.css';

class App extends Component {
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  handleSubmit = async model => {
    await this.sleep(500);
    console.log(model);
  };

  render() {
    const initialState = {
      email: 'bla@bla.is',
      name: 'darri',
      darrmundur: 'true',
      cocacola: true,
      rickandmorty: 'konn',
    };

    const selectOptions = [
      {
        name: 'darri',
        value: 'darri',
      },
      {
        name: 'Middle names',
        group: [
          {
            name: 'steinn',
            value: 'steinn',
            disabled: true,
          },
          {
            name: 'konn',
            value: 'konn',
          },
        ],
      },
      {
        name: 'konradsson',
        value: 'konradsson',
      },
    ];
    const dataListOptions = [
      {
        name: 'darri',
        value: 'darri',
      },
      {
        name: 'steinn',
        value: 'steinn',
        disabled: true,
      },
      {
        name: 'konn',
        value: 'konn',
      },
      {
        name: 'konradsson',
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
          <Form initialState={initialState} onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <FormInput
              model="email"
              id="email"
              label="email"
              className={styles.textInput}
              validator={[isEmail, isRequired]}
            />
            <div>
              <label htmlFor="name">Name: </label>
              <FormInput
                model="name"
                id="name"
                placeholder="name"
                className={styles.textInput}
                validator={[val => val === 'darri' && `Do not rump me with "${val}"`]}
                validateOn="focus"
              />
              <ChloroformError
                model="name"
                component={({error}) => <p className={styles.error}>{error}</p>}
              />
            </div>
            <div>
              <DataList
                model="somedatalistyougotthere"
                options={dataListOptions}
                placeholder="Choose from options"
              />
            </div>
            <label htmlFor="age">Age</label>
            <Checkbox model="age" id="age" />
            <div className={styles.checkboxes}>
              <div>
                <label htmlFor="all">All</label>
                {/* `all` is a reserved model keyword */}
                <Checkbox
                  model="all"
                  id="all"
                  group="drinks"
                  validator={[val => {
                    if (val && val.length > 0) return;
                    return 'NEIIII';
                  }]}
                  validateOn="input"
                />
              </div>
              <div>
                <label htmlFor="cocacola">Coca Cola</label>
                <Checkbox model="cocacola" id="cocacola" group="drinks" />
              </div>
              <div>
                <label htmlFor="pepsi">Pepsi</label>
                <Checkbox model="pepsi" id="pepsi" group="drinks" />
              </div>
              <ChloroformError
                model="drinks"
                component={({error}) => <p className={styles.error}>{error}</p>}
              />
            </div>
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
                options={selectOptions}
                validator={[isRequired]}
                placeholder="Choose your option"
              />
            </div>
            <div>
              <Select model="rickandmorty" options={selectOptions} />
            </div>
            <div>
              <TextArea model="mynameisjeff" placeholder="Whuaa?" />
            </div>

            <MyInput model="custominput" validator={[isRequired]} />

            <Button type="submit" text="Submit" className={classNames(styles.root, styles.button)} />
            <Button type="reset" text="Reset" className={classNames(styles.root, styles.button)} />
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
