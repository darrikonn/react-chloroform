import React from 'react';
import {
  Button,
  Checkbox,
  DataList,
  Form,
  Input,
  RadioButton,
  Select,
  TextArea,
} from 'react-chloroform';

function DataStructureTest() {
  const attachCypressOrConsoleLog = model => {
    if (window.Cypress) {
      window.model = model;
    } else {
      console.log(model);
    }
  };

  return (
    <div>
      <Form
        id="data-structure-test"
        initialState={{
          'drinks.0.type': true,
          'dog': 'barfoo',
          'human.*.interests.*': 'ALL',
          'human.*.gender': 'male',
        }}
        onSubmit={attachCypressOrConsoleLog}
      >
        {/* list of checkboxes */}
        <div>
          <Checkbox model="drinks.*" />
          <Checkbox model="drinks.0.type" />
          <Checkbox model="drinks.1.type" />
          <Checkbox model="drinks.2.type" />
          <Checkbox model="drinks.3.type" />
          <Checkbox model="drinks.0.foo" />
          <Checkbox model="drinks.*.type" />
        </div>

        {/* list of list of input objects */}
        <div>
          <div>
            <Input model="human.0.interests.0" />
            <Input model="human.0.interests.1" />
          </div>
          <div>
            <Input model="human.1.interests.0" />
            <Input model="human.1.interests.1" />
          </div>
        </div>

        {/* radio button objects */}
        <div>
          <RadioButton model="human.*.gender" value="female" />
          <RadioButton model="human.*.gender" value="male" />
        </div>

        {/* complex input objects */}
        <div>
          <Input model="vehicle.car.tesla" />
          <Input model="vehicle.car.porsche" />
        </div>

        {/* rest of scalars */}
        <div>
          <DataList model="cat" options={[{name: 'foo', value: 'foo'}, {name: 'bar', value: 'bar'}]} />
          <Select   model="dog" options={[{name: 'foobar', value: 'foobar'}, {name: 'barfoo', value: 'barfoo'}]} />
          <TextArea model="ape" />
        </div>

        {/* submit / reset */}
        <div>
          <Button type="submit" text="Submit" />
          <Button type="reset" text="Reset" />
        </div>
      </Form>
    </div>
  );
}

export default DataStructureTest;
