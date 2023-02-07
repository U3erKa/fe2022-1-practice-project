import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { connect } from 'react-redux';
import { refresh } from 'store/slices/userSlice';
import {
  ContestCreationPage,
  ContestPage,
  Dashboard,
  Home,
  LoginPage,
  Payment,
  RegistrationPage,
  StartContestPage,
  UserProfile,
} from 'pages';

import { PrivateHoc, NotFound, OnlyNotAuthorizedUserHoc } from 'components';
import { ChatContainer } from 'components/Chat';
import browserHistory from 'browserHistory';

import {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  REFRESH_TOKEN,
} from 'constants/general';

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path="/registration"
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route exact path="/payment" component={PrivateHoc(Payment)} />
          <Route
            exact
            path="/startContest"
            component={PrivateHoc(StartContestPage)}
          />
          <Route
            exact
            path="/startContest/nameContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/startContest/logoContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route exact path="/dashboard" component={PrivateHoc(Dashboard)} />
          <Route
            exact
            path="/contest/:id"
            component={PrivateHoc(ContestPage)}
          />
          <Route exact path="/account" component={PrivateHoc(UserProfile)} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  refresh: (refreshToken) => dispatch(refresh(refreshToken)),
});

export default connect(null, mapDispatchToProps)(App);
