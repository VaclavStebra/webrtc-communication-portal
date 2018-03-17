import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import UserForm from '../../../src/modules/user/components/UserForm';
import { LoginPage } from '../../../src/modules/user/LoginPage';

const renderLoginPage = (
  loginFailure = false,
  loginInProgress = false,
  isUserLoggedIn = false
) => {
  const props = {
    loginFailure,
    loginInProgress,
    isUserLoggedIn
  };

  return shallow(<LoginPage
    {...props}
    onLogin={() => {}}
  />);
};

describe('User module', () => {
  describe('LoginPage', () => {
    it('has heading Login', () => {
      const element = renderLoginPage();

      const heading = element.find('h1').at(0);

      expect(heading.text()).to.equal('Login', 'Login page has wrong heading');
    });

    it('has UserForm with correct props', () => {
      const element = renderLoginPage();

      const userForm = element.find(UserForm).at(0);

      expect(userForm.prop('submitText')).to.equal('Log in');
      expect(userForm.prop('linkText')).to.equal('Sign up');
      expect(userForm.prop('linkHref')).to.equal('/signup');
      expect(userForm.prop('actionInProgress')).to.equal(false);
    });

    it('has closed Snackbar for invalid login info', () => {
      const element = renderLoginPage();

      const snackbar = element.find(Snackbar).at(0);

      expect(snackbar.prop('message')).to.equal('Invalid email or password');
      expect(snackbar.prop('open')).to.equal(false);
    });

    it('has opened Snackbar for invalid login info when loginFailure is set', () => {
      const element = renderLoginPage(true);

      const snackbar = element.find(Snackbar).at(0);

      expect(snackbar.prop('message')).to.equal('Invalid email or password');
      expect(snackbar.prop('open')).to.equal(true);
    });

    it('has CircularProgress when login is in progress', () => {
      const element = renderLoginPage(true, true);

      const circularProgresses = element.find(CircularProgress);

      expect(circularProgresses).to.have.length(1);
    });

    it('does not have CircularProgress when login is not in progress', () => {
      const element = renderLoginPage(true, false);

      const circularProgresses = element.find(CircularProgress);

      expect(circularProgresses).to.have.length(0);
    });

    it('does not redirect when nobody is logged in', () => {
      const element = renderLoginPage();

      const redirects = element.find(Redirect);

      expect(redirects).to.have.length(0);
    });
  });
});
