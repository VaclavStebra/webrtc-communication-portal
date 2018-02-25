import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';

import TestPage from '../../../src/components/TestPage/TestPage';

describe('TestPage', () => {
  it('has text /test route', () => {
    const element = shallow(<TestPage />);

    const headings = element.find('h1');

    expect(headings).to.have.length(1);
    expect(headings.at(0).text()).to.equal('/test route');
  });

  it('has link button to /', () => {
    const element = shallow(<TestPage />);

    const links = element.find(Link);
    expect(links).to.have.length(1);

    const link = links.at(0);
    expect(link.prop('to')).to.equal('/');

    const buttons = link.find(RaisedButton);
    expect(buttons).to.have.length(1);

    const button = buttons.at(0);
    expect(button.prop('label')).to.equal('Root');
    expect(button.prop('secondary')).to.equal(true);
  });
});
