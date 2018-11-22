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
  constructor(props) {
    super(props);
    this.state = {
      numberOfAges: 5,
      show: true,
    };
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  handleSubmit = async model => {
    await this.sleep(500);
    console.log(model);
  };

  addAge = () => {
    this.setState({
      numberOfAges: this.state.numberOfAges + 1,
    });
  };

  decAge = () => {
    this.setState({
      numberOfAges: this.state.numberOfAges - 1,
    });
  };

  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const initialState = {
      email: 'bla@bla.is',
      name: 'darri',
      darrmundur: 'true',
      'drinks.*': true,
      rickandmorty: 'konn',
      'human.ages.3': true,
      'human.ages.2': true,
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
        val
      ) || `"${val}" is not a valid email`;

    const {numberOfAges, show} = this.state;

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
              />
              <ChloroformError
                model="name"
                component={({error}) => <p className={styles.error}>{error}</p>}
              />
            </div>
            <div>
              {show && (
                <div>
                  <label htmlFor="street">Street: </label>
                  <FormInput
                    model="address.street"
                    id="street"
                    placeholder="street"
                    className={styles.textInput}
                    validateOn="input"
                    validator={[isRequired]}
                  />
                  <ChloroformError
                    model="address.street"
                    component={({error}) => <p className={styles.error}>{error}</p>}
                  />
                </div>
              )}
              <div onClick={this.toggle}>toggle</div>
              <div>
                <label htmlFor="zip">Zip: </label>
                <FormInput
                  model="address.zip"
                  id="zip"
                  type="number"
                  placeholder="zip"
                  className={styles.textInput}
                  validateOn="focus"
                />
                <ChloroformError
                  model="address.zip"
                  component={({error}) => (error ? <p className={styles.error}>{error}</p> : null)}
                />
              </div>
              <div>
                <label htmlFor="country">Country: </label>
                <FormInput
                  model="address.country"
                  id="country"
                  placeholder="country"
                  className={styles.textInput}
                  validateOn="focus"
                />
                <ChloroformError
                  model="address.country"
                  component={({error}) => <p className={styles.error}>{error}</p>}
                />
              </div>
            </div>

            <div>
              {[...Array(numberOfAges)].map((_, i) => {
                if (i === 0) {
                  return (<div key={`age${i}`}><label htmlFor="all.humans">All</label>
                <Checkbox
                  model="human.ages.*"
                  id="all.humans"
                  validateOn="input"
                  validator={[v => v.includes('human.ages.1') || 'prump']}
                /></div>);
                }
                if ((i === 2 && show) || i !== 2) {
                  return (<div key={`age${i}`}>
                  <label htmlFor={`age${i}`}>Age {i}: </label>
                  <Checkbox
                    model={`human.ages.${i-1}`}
                    id={`age${i}`}
                    parseValue={x => `human.ages.${i-1}`}
                  />
                </div>);
                }
                return null;
              })}
              <ChloroformError
                model="human.ages.*"
                component={({error}) => <p className={styles.error}>{error}</p>}
              />
            </div>
            <div onClick={this.addAge}>+</div>
            {numberOfAges > 0 && <div onClick={this.decAge}>-</div>}

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
                <Checkbox
                  model="drinks.*"
                  id="all"
                />
              </div>
              <div>
                <label htmlFor="cocacola">Coca Cola</label>
                <Checkbox model="drinks.0" id="cocacola" parseValue={x => "cocacola"} />
              </div>
              <div>
                <label htmlFor="pepsi">Pepsi</label>
                <Checkbox model="drinks.1" id="pepsi" parseValue={x => "pepsi"} />
              </div>
              <ChloroformError
                model="drinks.*"
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
                placeholder="Choose your option"
              />
            </div>
            <div>
              <Select model="rickandmorty" options={selectOptions} />
            </div>
            <div>
              <TextArea model="mynameisjeff" placeholder="Whuaa?" />
            </div>

            <MyInput model="custominput" />

            <Button
              type="submit"
              text="Submit"
              className={classNames(styles.root, styles.button)}
            />
            <Button type="reset" text="Reset" className={classNames(styles.root, styles.button)} />
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
