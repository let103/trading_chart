import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LoadingView extends PureComponent {
  static defaultProps = {
    content: 'Data is loading !',
    icon: <div type="loading" />,
    classLoading: 'red'
  }

  static propTypes = {
    icon: PropTypes.element,
    content: PropTypes.string,
    classLoading: PropTypes.string,
  }

  render() {
    const {
      content, icon, classLoading,
    } = this.props;
    return (
      <div className={classLoading}>
        { icon }
        {content}
      </div>
    );
  }
}

export default LoadingView;