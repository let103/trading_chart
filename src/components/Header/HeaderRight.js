import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HeaderRight extends Component {
    render() {
      return (
        <div>
                <ul >
                    <li>
                        <Link to={{ pathname: `/` }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={{ pathname: `/user` }}>
                            User
                        </Link>
                    </li>
                </ul>

        </div>
      );
    }
}

export default HeaderRight;
