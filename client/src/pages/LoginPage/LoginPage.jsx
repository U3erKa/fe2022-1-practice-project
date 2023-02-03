import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import CONSTANTS from '../../constants';

const LoginPage = props => (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt='logo' />
        <div className={styles.linkLoginContainer}>
          <Link to='/registration' style={{ textDecoration: 'none' }}>
            <span>Signup</span>
          </Link>
        </div>
      </div>
      <div className={styles.loginFormContainer}>
        <LoginForm history={props.history} />
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
