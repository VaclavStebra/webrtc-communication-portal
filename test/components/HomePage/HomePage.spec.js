import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';

import HomePage from '../../../src/components/pages/home/HomePage';

describe('HomePage', () => {
  it('has text / route', () => {
    const element = shallow(<HomePage />);

    const headings = element.find('h1');

    expect(headings).to.have.length(1);
    expect(headings.at(0).text()).to.equal('/ route');
  });

  it('has link button to /test', () => {
    const element = shallow(<HomePage />);

    const links = element.find(Link);
    expect(links).to.have.length(1);

    const link = links.at(0);
    expect(link.prop('to')).to.equal('/test');

    const buttons = link.find(RaisedButton);
    expect(buttons).to.have.length(1);

    const button = buttons.at(0);
    expect(button.prop('label')).to.equal('Test');
    expect(button.prop('primary')).to.equal(true);
  });
});
