import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch as ReactSwitching } from 'react-router-dom';
import Route from '../Route/Route';

class AppRoute extends Component {
  render() {
    const { routes } = this.props;
    return (
      <ReactSwitching>
        { routes.map((route) => {
          return <Route path={route.path} component={route.component} />;
        }) }
      </ReactSwitching>
    );
  }
}

AppRoute.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default AppRoute;