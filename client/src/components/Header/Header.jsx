import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearUserStore } from 'store/slices/userSlice';
import { Logo } from 'components';
import { LoginButtons, NavList } from 'components/Header';

import { STATIC_IMAGES_PATH, CREATOR, DUMMY_LINK } from 'constants/general';
import { HEADER_LIST } from 'constants/header';
import styles from './Header.module.sass';

class Header extends React.Component {
  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.history.replace('/login');
  };

  startContests = () => {
    this.props.history.push('/startContest');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return <LoginButtons data={this.props.data} logOut={this.logOut} />;
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <Link to={DUMMY_LINK}>Read Announcement</Link>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <a href="tel:8773553585">(877)&nbsp;355-3585</a>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Logo />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <NavList list={HEADER_LIST} />
            </div>
            {this.props.data && this.props.data.role !== CREATOR && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
