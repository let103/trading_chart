
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FooterPage from '../components/Footer/Footer';
import Content from './Content/content';

class MasterLayout extends Component {
  render() {
    const { children } = this.props;


    return (
      <React.Fragment>
        <Content>
          { children }
        </Content>
        <FooterPage/>
      </React.Fragment>
    );
  }
}

MasterLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MasterLayout;
