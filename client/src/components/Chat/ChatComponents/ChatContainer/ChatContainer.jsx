import { connect } from 'react-redux';

import { Chat } from 'components/Chat';

const ChatContainer = (props) => {
  const { data } = props;
  return <>{data ? <Chat /> : null}</>;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(ChatContainer);
