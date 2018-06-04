import React, { Component } from 'react';

import { firebase } from '../firebase';
import {Form,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap';

//Formulario de Login
class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;



    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({
          email: '',
          password: '',
          error: null,
        }));
      })
      .catch(error => {
        this.setState({'error': error});
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;
    return (
      <Form className="signin-form">
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            value={email}
            onChange={event => this.setState({'email' : event.target.value})}
            type="email"
            placeholder="Email"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={event => this.setState({'password' : event.target.value})}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        { error && <span>{error.message}</span> }
        <Button bsStyle="primary" block disabled={(this.state.password === '' || this.state.email === '')} onClick={this.onSubmit}>
          Login
        </Button>


      </Form>
    );
  }
}

export default SignInForm ;
