import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../../../src/components/pages/LoginPage';

describe('LoginPage', () => {
  it('has heading Login Page', () => {
    const element = shallow(<LoginPage />);

    const heading = element.find('h1').at(0);

    expect(heading.text()).to.equal('Login Page', 'Login page has wrong heading');
  });
});
