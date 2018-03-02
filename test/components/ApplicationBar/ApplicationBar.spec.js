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

  it('has link to code on the right side of AppBar', () => {
    const element = shallow(<ApplicationBar />);

    const appBarList = element.find(AppBar);
    const appBar = appBarList.at(0);

    const githubIcon = appBar.prop('iconElementRight');

    expect(githubIcon).to.have.property('type');
    expect(githubIcon.type).to.have.property('muiName');
    expect(githubIcon.type.muiName).to.equal('IconButton');
  });
});
