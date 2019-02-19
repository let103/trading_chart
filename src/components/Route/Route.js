import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route as ReactRoute } from 'react-router-dom';

class Route extends Component {
  render() {
    return (
      <ReactRoute {...this.props} />
    );
  }
}

export default Route;