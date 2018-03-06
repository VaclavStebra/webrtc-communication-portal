import React from 'react';
import { shallow } from 'enzyme';

import { Root } from '../../../src/modules/root/Root';
import ApplicationBar from '../../../src/modules/applicationBar/ApplicationBar';

describe('Root', () => {
  it('has ApplicationBar', () => {
    const element = shallow(<Root />);

    const appBar = element.find(ApplicationBar);

    expect(appBar).to.have.length(1, 'Root component does not have ApplicationBar');
  });
});
