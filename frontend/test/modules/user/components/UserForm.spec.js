import React from 'react';
import { shallow } from 'enzyme';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import UserForm from '../../../../src/modules/user/components/UserForm';

const renderUserForm = (actionInProgress = false) => shallow(<UserForm
  submitText="Log in"
  linkText="Sign up"
  linkHref="/signup"
  onSubmit={() => {}}
  actionInProgress={actionInProgress}
/>);

function verifyFields(textFields) {
  const emailField = textFields.at(0);
  const passwordField = textFields.at(1);

  expect(emailField.prop('hintText')).to.equal(
    'Please enter your email address',
    'Invalid hint for email field'
  );
  expect(emailField.prop('floatingLabelText')).to.equal(
    'Email',
    'Invalid floating label for email field'
  );
  expect(passwordField.prop('hintText')).to.equal(
    'Please enter your password',
    'Invalid hint for password field'
  );
  expect(passwordField.prop('floatingLabelText')).to.equal(
    'Password',
    'Invalid floating label for password field'
  );
  expect(passwordField.prop('type')).to.equal('password', 'Password field has invalid type');
}

describe('User module', () => {
  describe('UserForm', () => {
    it('has fields for email and password', () => {
      const element = renderUserForm();

      const textFields = element.find(TextField);

      expect(textFields).to.have.length(2, 'Incorrect number of TextFields in user form');
      verifyFields(textFields);
    });

    it('has submit button', () => {
      const element = renderUserForm();

      const button = element.find(RaisedButton).at(0);

      expect(button.prop('label')).to.equal('Log in', 'Log in button not present or invalid label');
      expect(button.prop('primary')).to.equal(true, 'Log in button is not primary');
    });

    it('has link button', () => {
      const element = renderUserForm();

      const button = element.find(RaisedButton).at(1);

      expect(button.prop('label')).to.equal('Sign up', 'Sign up button not present or invalid label');
      expect(button.prop('secondary')).to.equal(true, 'Sign up button is not secondary');
      expect(button.prop('containerElement').type.name).to.equal(
        'Link',
        'Sign Up button is not link'
      );
      expect(button.prop('containerElement').props.to).to.equal(
        '/signup',
        'Sign Up link points to wrong location'
      );
    });

    it('has Back button', () => {
      const element = renderUserForm();

      const button = element.find(RaisedButton).at(2);

      expect(button.prop('label')).to.equal('Back', 'Back button not present or invalid label');
      expect(button.prop('containerElement').type.name).to.equal(
        'Link',
        'Back button is not link'
      );
      expect(button.prop('containerElement').props.to).to.equal(
        '/',
        'Back link points to wrong location'
      );
    });

    it('has disabled action button when action is in progress', () => {
      const element = renderUserForm(true);

      const button = element.find(RaisedButton).at(0);

      expect(button.prop('disabled')).to.equal(true);
    });
  });
});
