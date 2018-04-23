const {
  Form,
  Button,
  ChloroformError,
  Checkbox,
  withReactChloroform,
} = ReactChloroform;

const isRequired = val => (val && val.length > 0) || "You must have a favourite pet!";

class SubmitButton extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
    	success: false,
      failure: false,
      text: 'Submit',
    };
  }
	componentDidUpdate(oldProps) {
    if (this.props.chloroformStatus && oldProps.chloroformStatus !== this.props.chloroformStatus) {
      this.onFormSubmit(this.props.chloroformStatus);
    }
  }
  
  onFormSubmit = result => {
    this.setState({
      success: result === 'submitted',
      failure: result === 'failed',
      text: this.renderText(),
    });
    setTimeout(() => {
      this.setState({
        success: false,
        failure: false,
        text: 'Submit',
      });
    }, 2000);
  };
  
  renderText = () => {
  	const {chloroformStatus} = this.props;
    if (chloroformStatus === 'submitted') {
    	return 'Submitted';
    } else if (chloroformStatus === 'failed') {
    	return 'Failed';
    } else if (chloroformStatus === 'submitting') {
    	return <div className="loading" />;
    }
    return 'Submit';
  };
  
  getClassName = () => {
    const {success, failure} = this.state;
    let buttonClass = 'btn-primary';
    if (success) {
    	buttonClass = 'btn-success';
    } else if (failure) {
    	buttonClass = 'btn-danger';
    }
  	
    return `btn btn-block ${buttonClass} submitButton`;
  };
  
	render() {
  	const {chloroformStatus} = this.props;

    return (
      <button
        type="submit"
        className={this.getClassName()}
        disabled={['hasErrors', 'submitting'].includes(chloroformStatus)}
      >
        {this.state.text}
      </button>
    );
  }
}

const CustomSubmitButton = withReactChloroform(SubmitButton);

class App extends React.Component {
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  handleSubmit = model => 
  	Promise.resolve()
    .then(() => this.sleep(2000))
    .then(() => console.log(model));

  render() {
    const initialState = {
      dog: true,
    };

    return (
      <div className="container col-md-12" style={{ marginTop: "20px" }}>
        <h3>What are your favourite pets?</h3>
        <Form
          initialState={initialState}
          onSubmit={this.handleSubmit}
          className="form-horizontal"
        >
          <div className="container">
            <div className="form-group">
              <div>
                <label htmlFor="all">All</label>
                {/* `all` is a reserved model keyword */}
                <Checkbox
                  className="checkbox-inline"
                  model="all"
                  id="all"
                  group="pets"
                  validator={[isRequired]}
                  validateOn="input"
                />
              </div>
              <div>
                <label htmlFor="dog">Dog</label>
                <Checkbox
                  model="dog"
                  id="dog"
                  group="pets"
                />
              </div>
              <div>
                <label htmlFor="cat">Cat</label>
                <Checkbox
                  model="cat"
                  id="cat"
                  group="pets"
                />
              </div>
              <div>
                <label htmlFor="elephant">Elephant</label>
                <Checkbox
                  model="elephant"
                  id="elephant"
                  group="pets"
                />
              </div>
              
              <ChloroformError
                model="pets"
                component={({ error }) => <p className="fieldError">{error}</p>}
                />
              </div>
            </div>

            <div className="form-group col-sm-10" style={{ marginBottom: "5px" }}>
              <CustomSubmitButton />
            </div>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
