import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { Error } from 'components';
import {
  AgreeTermOfServiceInput,
  FormInput,
  RoleInput,
} from 'components/InputComponents';

import Schems from 'utils/validators/validationSchems';
import { AUTH_MODE, CUSTOMER, CREATOR } from '../../../constants';
import styles from './RegistrationForm.module.sass';

class RegistrationForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.register({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        role: values.role,
      },
      history: this.props.history,
    });
  };

  render() {
    const { submitting, auth, authClear } = this.props;
    const { error } = auth;
    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };
    return (
      <div className={styles.signUpFormContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <div className={styles.headerFormContainer}>
          <h2>CREATE AN ACCOUNT</h2>
          <h4>We always keep your name and email address private.</h4>
        </div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: CUSTOMER,
            agreeOfTerms: false,
          }}
          onSubmit={this.clicked}
          validationSchema={Schems.RegistrationSchem}
        >
          <Form>
            <div className={styles.row}>
              <FormInput
                name="firstName"
                classes={formInputClasses}
                type="text"
                label="First name"
              />
              <FormInput
                name="lastName"
                classes={formInputClasses}
                type="text"
                label="Last name"
              />
            </div>
            <div className={styles.row}>
              <FormInput
                name="displayName"
                classes={formInputClasses}
                type="text"
                label="Display Name"
              />
              <FormInput
                name="email"
                classes={formInputClasses}
                type="text"
                label="Email Address"
              />
            </div>
            <div className={styles.row}>
              <FormInput
                name="password"
                classes={formInputClasses}
                type="password"
                label="Password"
              />
              <FormInput
                name="confirmPassword"
                classes={formInputClasses}
                type="password"
                label="Password confirmation"
              />
            </div>
            <div className={styles.choseRoleContainer}>
              <Field
                name="role"
                type="radio"
                value={CUSTOMER}
                strRole="Join As a Buyer"
                infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
                component={RoleInput}
                id={CUSTOMER}
              />
              <Field
                name="role"
                type="radio"
                value={CREATOR}
                strRole="Join As a Creative"
                infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
                component={RoleInput}
                id={CREATOR}
              />
            </div>
            <div className={styles.termsOfService}>
              <AgreeTermOfServiceInput
                name="agreeOfTerms"
                classes={{
                  container: styles.termsOfService,
                  warning: styles.fieldWarning,
                }}
                id="termsOfService"
                type="checkbox"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitContainer}
            >
              <span className={styles.inscription}>Create Account</span>
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  initialValues: {
    role: CUSTOMER,
  },
});

const mapDispatchToProps = (dispatch) => ({
  register: ({ data, history }) =>
    dispatch(checkAuth({ data, history, authMode: AUTH_MODE.REGISTER })),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
