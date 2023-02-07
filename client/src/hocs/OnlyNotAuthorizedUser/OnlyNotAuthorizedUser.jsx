import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from 'components';

const OnlyNotAuthorizedUserHoc = (Component) => {
  class HocForLoginSignUp extends React.Component {
    render() {
      if (this.props.isFetching) {
        return <Spinner />;
      }
      if (!this.props.data) {
        return <Component history={this.props.history} />;
      }
      return null;
    }
  }

  const mapStateToProps = (state) => state.userStore;

  return connect(mapStateToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
