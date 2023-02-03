import React from 'react';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';

const ChatContainer = props => {
  const { data } = props;
  return <>{data ? <Chat /> : null}</>;
};

const mapStateToProps = state => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(ChatContainer);
