import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchInput from '../Search/Search';

class HeaderCenter extends Component {
    static propTypes = {
      classList: PropTypes.string.isRequired,
    };


    render() {
      const { classList } = this.props;

      const classHeaderCenter = classnames(Styles.center, classList);

      return (
        <div className={classHeaderCenter}>
          <div className={Styles.search}>
            <SearchInput />
          </div>
        </div>
      );
    }
}

export default HeaderCenter;