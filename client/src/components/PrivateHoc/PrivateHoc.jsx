import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from 'components';

const PrivateHoc = (Component, props) => {
  class Hoc extends React.Component {
    render() {
      return (
        <>
          {this.props.isFetching ? (
            <Spinner />
          ) : (
            <Component
              history={this.props.history}
              match={this.props.match}
              {...props}
            />
          )}
        </>
      );
    }
  }

  const mapStateToProps = (state) => state.userStore;

  return connect(mapStateToProps)(Hoc);
};

export default PrivateHoc;
