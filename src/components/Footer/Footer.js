import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

class Footer extends Component {
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
      <footer className="row footer-section">
         <div className="col-md-3 col-lg-3 footer-section-left">
            @2019 Cryptocurrency Market LLC 
         </div>
         <div className="col-md-9 col-lg-9 footer-section-right">
            <ul className="menu">
              <li className="menu-item">
                  <a href="#"> About </a>
              </li>
              <li className="menu-item">
                  <a href="#"> Contacts </a>
              </li>
              <li className="menu-item">
                  <a href="#"> Privacy Policy </a>
              </li>
              <li className="menu-item">
                  <a href="#"> Term Of Service </a>
              </li>
            </ul>
         </div>
      </footer>
    );
  }
}

export default Footer;