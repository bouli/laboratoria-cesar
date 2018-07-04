import React, { Component } from 'react';
import Feed from './Feed';
import Landing from './Landing';
import {firebase} from '../firebase';

//App general
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(authUser => {
        this.setState(() => ({ authUser }))
    });
  }


render() {
    return (
          <div>
          {
            this.state.authUser
            ? <Feed />
            : <Landing />
          }
        </div>
    );
  }
}

export default App;
