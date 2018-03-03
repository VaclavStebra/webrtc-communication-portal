import React from 'react';
import { shallow } from 'enzyme';

import AppBar from 'material-ui/AppBar';

import ApplicationBar from '../../../src/components/ApplicationBar';

describe('ApplicationBar', () => {
  it('does not have menu icon', () => {
    const element = shallow(<ApplicationBar />);

    const appBarList = element.find(AppBar);
    const appBar = appBarList.at(0);

    expect(appBar.prop('showMenuIconButton')).to.equal(false, 'AppBar has menu icon');
  });

  it('has login button on right side when nobody is logged in', () => {
    const element = shallow(<ApplicationBar />);

    const appBarList = element.find(AppBar);
    const appBar = appBarList.at(0);

    const rightIcon = appBar.prop('iconElementRight');

    expect(rightIcon).to.have.property('type');
    expect(rightIcon.type.name).to.equal(
      'FlatButton',
      'AppBar does not have flat button button'
    );
    expect(rightIcon.props.label).to.equal('Login', 'AppBar does not have login button');
  });
});
