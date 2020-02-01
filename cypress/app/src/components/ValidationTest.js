import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
} from 'react-chloroform';

// return CHCl3(true, 'foo is not a valid foo');  CHCl3(isValid: bool, errorMessage: string)
// return [true, 'foo is not a valid foo'];
class CHCl3 {
}

function ValidationTest() {
  return (
    <div>
      <Form
        initialState={{
          'human.*.interests.0': 'First item should be set',
          dog: 'barfoo',
        }}
        // onSubmit={}
        // onChange={}
        // onReset={}
        validators={{
          // validate top level validation
          'human.0.interests.*': val => [val !== 'BAR', `${val} is not a valid human interest`],
          'human.*.interests.*': val => CHCl3(val !== 'FOOBAR', 'FOOBAR is not a valid value'),
        }}
      >
        {/* list of list objects validation */}
        <div>
          <div>
            <Input
              model="human.0.interests.0"
              validator={val => [
                val !== null && val !== undefined && val !== '',
                'This field is required',
              ]} // isRequired
            />
            <Input model="human.0.interests.1" />
          </div>
          <div>
            <Input
              model="human.1.interests.0"
              validator={val => CHCl3(val !== 'FOO', `${val} is not a valid human interest`)}
            />
            <Input model="human.1.interests.1" />
          </div>
        </div>

        {/* scalar validation */}
        <div>
          <Select
            model="dog"
            options={[
              {name: 'foobar', value: 'foobar'},
              {name: 'barfoo', value: 'barfoo'},
            ]}
            validator={val => CHCl3(val !== 'barfoo', 'Value cannot be barfoo')}
          />
        </div>

        {/* no validation */}
        <div>
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

export default ValidationTest;
