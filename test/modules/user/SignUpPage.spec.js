import React from 'react';
import { shallow } from 'enzyme';

import { SignUpPage } from '../../../src/modules/user/SignUpPage';
import UserForm from '../../../src/modules/user/components/UserForm';

describe('User module', () => {
  describe('SignUpPage', () => {
    it('has heading Sign Up', () => {
      const element = shallow(<SignUpPage />);

      const heading = element.find('h1').at(0);

      expect(heading.text()).to.equal('Sign Up');
    });

    it('has UserForm with correct props', () => {
      const element = shallow(<SignUpPage />);

      const userForm = element.find(UserForm).at(0);

      expect(userForm.prop('submitText')).to.equal('Sign up');
      expect(userForm.prop('linkText')).to.equal('Log in');
      expect(userForm.prop('linkHref')).to.equal('/login');
      expect(userForm.prop('actionInProgress')).to.equal(false);
    });
  });
});
