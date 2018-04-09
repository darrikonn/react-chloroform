import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Form,
  FormInput,
  Button,
  ChloroformError,
  TextArea,
  Checkbox
} from "react-chloroform";

const isRequired = val => (val && val.length > 0) || "This field is required";

class App extends Component {
  handleSubmit = model => console.log(model);

  render() {
    const initialState = {
      email: "example@example.com",
      name: "John Doe"
    };

    return (
      <div className="container col-md-1" style={{ marginTop: "20px" }}>
        <Form
          initialState={initialState}
          onSubmit={this.handleSubmit}
          className="form-horizontal"
        >
          <div className="container">
            <div className="form-group has-error">
              <label htmlFor="email_1" className="col-sm-2 control-label">
                Email
              </label>
              <div className="col-sm-10">
                <FormInput
                  model="email"
                  id="email_1"
                  className="form-control"
                  validator={[isRequired]}
                />
                <ChloroformError
                  model="email"
                  component={({ error }) => <p className="fieldError">{error}</p>}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name_1" className="col-sm-2 control-label">
                Name
              </label>
              <div className="col-sm-10">
                <FormInput model="name" id="name_1" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="about_1" className="col-sm-2 control-label">
                About
              </label>
              <div className="col-sm-10">
                <TextArea
                  model="about"
                  id="about_1"
                  placeholder="Write something about yourself..."
                  rows={5}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group col-sm-10" style={{ marginBottom: "5px" }}>
              <Button
                type="submit"
                text="Submit"
                className="btn btn-primary btn-block"
              />
            </div>
            <div className="form-group col-sm-10">
              <Button
                type="reset"
                text="Reset"
                className="btn btn-default btn-block"
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
