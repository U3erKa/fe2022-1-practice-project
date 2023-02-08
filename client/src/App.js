import { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import { refresh } from 'store/slices/userSlice';
import { RouterProvider } from './components';
import { ChatContainer } from 'components/Chat';
import browserHistory from 'browserHistory';

import { REFRESH_TOKEN } from 'constants/general';
import { router } from 'constants/router';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { refresh } = this.props;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      refresh(refreshToken);
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <RouterProvider router={router} />
        <ChatContainer />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  refresh: (refreshToken) => dispatch(refresh(refreshToken)),
});

export default connect(null, mapDispatchToProps)(App);
