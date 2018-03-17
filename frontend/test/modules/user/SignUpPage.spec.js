import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import { SignUpPage } from '../../../src/modules/user/SignUpPage';
import UserForm from '../../../src/modules/user/components/UserForm';

const renderSignUpPage = (
  signupFailure = false,
  signupInProgress = false,
  isUserLoggedIn = false
) => {
  const props = {
    signupFailure,
    signupInProgress,
    isUserLoggedIn
  };

  return shallow(<SignUpPage
    {...props}
    onSignup={() => {}}
  />);
};

describe('User module', () => {
  describe('SignUpPage', () => {
    it('has heading Sign Up', () => {
      const element = renderSignUpPage();

      const heading = element.find('h1').at(0);

      expect(heading.text()).to.equal('Sign Up');
    });

    it('has UserForm with correct props', () => {
      const element = renderSignUpPage();

      const userForm = element.find(UserForm).at(0);

      expect(userForm.prop('submitText')).to.equal('Sign up');
      expect(userForm.prop('linkText')).to.equal('Log in');
      expect(userForm.prop('linkHref')).to.equal('/login');
      expect(userForm.prop('actionInProgress')).to.equal(false);
    });

    it('has closed Snackbar when signupFailure is not set', () => {
      const element = renderSignUpPage();

      const snackbar = element.find(Snackbar).at(0);

      expect(snackbar.prop('message')).to.equal('Something went wrong');
      expect(snackbar.prop('open')).to.equal(false);
    });

    it('has opened Snackbar when signupFailure is set', () => {
      const element = renderSignUpPage(true);

      const snackbar = element.find(Snackbar).at(0);

      expect(snackbar.prop('message')).to.equal('Something went wrong');
      expect(snackbar.prop('open')).to.equal(true);
    });

    it('has CircularProgress when signup is in progress', () => {
      const element = renderSignUpPage(true, true);

      const circularProgresses = element.find(CircularProgress);

      expect(circularProgresses).to.have.length(1);
    });

    it('does not have CircularProgress when signup is not in progress', () => {
      const element = renderSignUpPage(true, false);

      const circularProgresses = element.find(CircularProgress);

      expect(circularProgresses).to.have.length(0);
    });

    it('does not redirect when nobody is logged in', () => {
      const element = renderSignUpPage();

      const redirects = element.find(Redirect);

      expect(redirects).to.have.length(0);
    });
  });
});
