import React from 'react';
import {firebase} from '../firebase';
import {Button} from 'react-bootstrap';

//Botón para hacer Logout
const LogoutButton = () =>
  <Button
    onClick={() => firebase.auth().signOut()}
    >
    Logout
  </Button>

export default LogoutButton;
