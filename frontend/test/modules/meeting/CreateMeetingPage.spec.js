import React from 'react';
import { shallow } from 'enzyme';

import { CreateMeetingPage } from '../../../src/modules/meeting/CreateMeetingPage';
import CreateMeetingForm from '../../../src/modules/meeting/components/CreateMeetingForm';

function renderCreateMeetingPage() {
  return shallow(<CreateMeetingPage />);
}

describe('Meeting module', () => {
  it('has heading Create meeting', () => {
    const element = renderCreateMeetingPage();

    const heading = element.find('h1').at(0);

    expect(heading.text()).to.equal('Create meeting');
  });

  it('has CreateMeetingForm', () => {
    const element = renderCreateMeetingPage();

    const createMeetingForm = element.find(CreateMeetingForm);

    expect(createMeetingForm).to.have.length(1);
  });
});
