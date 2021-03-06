import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createRoutes from './routes';
import AppRoute from '../../../components/AppRoute/AppRoute';

class DetailContainer extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
      };  

    render() {
        const { match: { url } } = this.props;

        return (
            <AppRoute routes={createRoutes(url)} />
        );
    }
}

DetailContainer.propTypes = {

};

export default DetailContainer;