import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  static defaultProps = {
    classLeftComp: '',
    classRightComp: '',
  };

  static propTypes = {
    classLeftComp: PropTypes.string,
    classRightComp: PropTypes.string,
  }


  render() {

    return (
      <header>
       <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand"> Coin Market </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <Link to={{ pathname: `/user` }} style={{color: '#9d9d9d'}}> User </Link>
              </NavItem>
              <NavItem>
                <Link to={{ pathname: `/signup` }} style={{color: '#9d9d9d'}}> Sign up </Link>
              </NavItem>
              <NavItem>
                <Link to={{ pathname: `/signin` }} style={{color: '#9d9d9d'}}> Sign in </Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;