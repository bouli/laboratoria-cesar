import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

//Navigationbar para usuario logado
class NavigationBar extends Component {
  render(){
    return (
      <Navbar>
          <Nav className="navbar-right">
            <NavItem >
                <LogoutButton />
            </NavItem>
          </Nav>
      </Navbar>
    )
  }
}
export default NavigationBar;
