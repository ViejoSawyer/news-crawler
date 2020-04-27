import React from 'react';
import { Component } from 'react';
import logo from '../images/logo.svg';
import './styles/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className='Navbar'>
        <div className='container-fluid'>
          <img className='Navbar__brand-logo' src={logo} alt='Logo' />
        </div>
      </div>
    );
  }
}

export default Navbar;
