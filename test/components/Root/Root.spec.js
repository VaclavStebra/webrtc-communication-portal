import React from 'react';
import { shallow } from 'enzyme';
import AppBar from 'material-ui/AppBar';

import Root from '../../../src/components/Root';

describe('Root', () => {
  it('contains AppBar', () => {
    const element = shallow(<Root />);

    const appBar = element.find(AppBar);

    expect(appBar).to.have.length(1, 'Root component does not have AppBar');
  });

  it('does not have menu icon', () => {
    const element = shallow(<Root />);

    const appBarList = element.find(AppBar);
    const appBar = appBarList.at(0);

    expect(appBar.prop('showMenuIconButton')).to.equal(false, 'AppBar has menu icon');
  });
});
