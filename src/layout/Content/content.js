import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './content.css';

class Content extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper-content">
        <div class="main-content">
            { children }
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Content;