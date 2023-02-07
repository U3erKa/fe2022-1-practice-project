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
  NotFound,
  Payment,
  RegistrationPage,
  StartContestPage,
  UserProfile,
} from 'pages';

import { Private, OnlyNotAuthorizedUser } from 'hocs';
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
            component={OnlyNotAuthorizedUser(LoginPage)}
          />
          <Route
            exact
            path="/registration"
            component={OnlyNotAuthorizedUser(RegistrationPage)}
          />
          <Route exact path="/payment" component={Private(Payment)} />
          <Route
            exact
            path="/startContest"
            component={Private(StartContestPage)}
          />
          <Route
            exact
            path="/startContest/nameContest"
            component={Private(ContestCreationPage, {
              contestType: NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={Private(ContestCreationPage, {
              contestType: TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/startContest/logoContest"
            component={Private(ContestCreationPage, {
              contestType: LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route exact path="/dashboard" component={Private(Dashboard)} />
          <Route
            exact
            path="/contest/:id"
            component={Private(ContestPage)}
          />
          <Route exact path="/account" component={Private(UserProfile)} />
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
